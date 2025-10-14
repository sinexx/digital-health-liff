import Link from "next/link";

export default function Assistant() {
  return (
    <div style={{ padding: 24 }}>
      <h1>🤖 ผู้ช่วย AI เพื่อการเรียนรู้</h1>
      <p>หน้านี้จะเชื่อมต่อกับ AI Assistant ภายหลัง</p>
      <Link href="/" style={{ color: '#0ea5e9' }}>← กลับหน้าแรก</Link>
    </div>
  );
}
