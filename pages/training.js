import Link from "next/link";

export default function Training() {
  return (
    <div style={{ padding: 24 }}>
      <h1>🎓 หลักสูตร & การอบรม</h1>
      <p>หน้านี้จะแสดงตารางอบรมและการลงทะเบียนในอนาคต</p>
      <Link href="/" style={{ color: '#0ea5e9' }}>← กลับหน้าแรก</Link>
    </div>
  );
}
