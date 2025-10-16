import Link from "next/link";

export default function KnowledgeDocs() {
  return (
    <>
      <h1>เอกสาร</h1>
      <p>รายการเอกสารดาวน์โหลด</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/knowledge">← กลับคลังความรู้</Link>
      </div>
    </>
  );
}
