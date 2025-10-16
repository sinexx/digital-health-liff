import Link from "next/link";

export default function KnowledgeIndex() {
  return (
    <>
      <h1>สื่อการเรียนรู้ / คลังความรู้</h1>
      <p>เลือกเมนูย่อย</p>
      <ul style={{ marginTop: 12 }}>
        <li>
          <Link href="/knowledge/docs">เอกสาร</Link>
        </li>
        <li>
          <Link href="/knowledge/videos">วิดีโอ</Link>
        </li>
      </ul>
    </>
  );
}
