import Link from "next/link";

export default function EvaluationCerts() {
  return (
    <>
      <h1>ดาวน์โหลดเกียรติบัตร</h1>
      <p>ผู้ใช้สามารถดาวน์โหลดใบเกียรติบัตรได้ที่นี่</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/evaluation">← กลับประเมินผล</Link>
      </div>
    </>
  );
}
