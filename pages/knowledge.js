import Link from "next/link";

export default function Knowledge() {
  return (
    <div style={{ padding: 24 }}>
      <h1>📚 สื่อการเรียนรู้ / คลังความรู้</h1>
      <p>หน้านี้จะรวบรวมเอกสาร วิดีโอ คู่มือ และมาตรฐาน</p>
      <Link href="/" style={{ color: '#0ea5e9' }}>← กลับหน้าแรก</Link>
    </div>
  );
}
