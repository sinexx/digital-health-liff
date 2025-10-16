import Link from "next/link";

export default function TrainingIndex() {
  return (
    <>
      <h1>🎓 หลักสูตร & การอบรม</h1>
      <p>เลือกเมนูย่อยเพื่อดูรายละเอียด</p>

      <ul style={{ marginTop: 12 }}>
        <li>
          <Link href="/training/schedule">ตารางอบรม</Link>
        </li>
        <li>
          <Link href="/training/register">แบบฟอร์มลงทะเบียน</Link>
        </li>
      </ul>
    </>
  );
}
