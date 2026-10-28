import hashlib
import os
import sys
from pathlib import Path

import pinecone
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pinecone import Pinecone

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
INDEX_NAME = os.getenv("PINECONE_INDEX_NAME", "ai-portfolio-index")
NAMESPACE = os.getenv("PINECONE_NAMESPACE", "__default__")

# Index dùng document schema nên bắt buộc ghi qua Documents API (phiên bản 2026-07).
API_VERSION = "2026-07"
# Tên field trong schema của index: chunk_text khai báo `embed` (llama-text-embed-v2),
# nên chỉ cần gửi text thô, Pinecone tự tạo vector phía server.
TEXT_FIELD = "chunk_text"
TITLE_FIELD = "title"


def chunk_id(chunk) -> str:
    """ID cố định theo nguồn, trang và nội dung để chạy lại ingest thì ghi đè chứ không nhân đôi."""
    raw = f"{chunk.metadata.get('source')}|{chunk.metadata.get('page')}|{chunk.page_content}"
    return hashlib.sha256(raw.encode()).hexdigest()[:32]


def load_documents():
    docs = []

    if not DATA_DIR.exists():
        print(f"Thư mục dữ liệu không tồn tại: {DATA_DIR}")
        return docs

    for path in sorted(DATA_DIR.rglob("*"), key=lambda p: str(p)):
        if path.is_dir():
            continue

        suffix = path.suffix.lower()
        try:
            if suffix == ".pdf":
                pdf_docs = PyPDFLoader(str(path)).load()
                for doc in pdf_docs:
                    doc.page_content = " ".join(doc.page_content.split())
                    docs.append(doc)
            elif suffix == ".txt":
                docs.extend(TextLoader(str(path), encoding="utf-8").load())
        except Exception as exc:
            print(f"Không thể đọc '{path}': {exc}")

    return docs


def to_pinecone_document(chunk) -> dict:
    """Chuyển một chunk thành document theo schema của index (field ngoài schema được lưu như metadata)."""
    source = chunk.metadata.get("source")
    document = {
        "_id": chunk_id(chunk),
        TEXT_FIELD: chunk.page_content,
        "source": source,
    }
    if source:
        document[TITLE_FIELD] = Path(source).name
    if chunk.metadata.get("page") is not None:
        document["page"] = chunk.metadata["page"]
    return {key: value for key, value in document.items() if value is not None}


def run_ingestion():
    # SDK < 10 không đọc được index document schema (lỗi "missing 'metric' and 'spec'") và không có Documents API.
    if int(pinecone.__version__.split(".")[0]) < 10:
        sys.exit(
            f"ingest.py cần pinecone>=10 nhưng đang chạy với {pinecone.__version__}.\n"
            "langchain-pinecone (main.py) ghim pinecone<8 nên hãy dùng venv riêng: "
            "venv-ingest/bin/python ingest.py (xem requirements-ingest.txt)"
        )

    docs = load_documents()
    if not docs:
        print("Không tìm thấy tài liệu trong backend/data/")
        return

    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = [
        c for c in splitter.split_documents(docs) if c.page_content.strip()
    ]

    # batch_upsert yêu cầu _id không trùng; đoạn lặp y hệt trong cùng trang chỉ giữ một bản (giống upsert ghi đè).
    documents = list({d["_id"]: d for d in map(to_pinecone_document, chunks)}.values())

    # Header phiên bản được truyền xuống cả control plane lẫn data plane (Index).
    pc = Pinecone(
        api_key=os.environ["PINECONE_API_KEY"],
        additional_headers={"X-Pinecone-Api-Version": API_VERSION},
    )
    index = pc.Index(name=INDEX_NAME)

    print(
        f"Đang đẩy {len(documents)} đoạn văn lên Pinecone Index '{INDEX_NAME}' "
        f"(namespace '{NAMESPACE}', API {API_VERSION})..."
    )
    # POST /namespaces/{namespace}/documents/upsert, chia lô và gửi song song.
    result = index.documents.batch_upsert(namespace=NAMESPACE, documents=documents)

    if result.has_errors:
        print(f"Thất bại {result.failed_item_count}/{result.total_item_count} đoạn văn:")
        for error in result.errors:
            print(f"  - lô {error.batch_index} (retryable={error.retryable}): {error.error_message}")
        sys.exit(1)

    print(f" Đã gửi {result.successful_item_count} đoạn văn lên Pinecone Cloud!")
    print("Pinecone xử lý bất đồng bộ, dữ liệu có thể tìm kiếm được sau khoảng 1 phút.")


if __name__ == "__main__":
    run_ingestion()
