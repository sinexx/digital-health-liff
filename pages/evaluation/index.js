import Link from "next/link";

export default function EvaluationIndex() {
  return (
    <>
      <h1>ประเมินผล & ใบรับรอง</h1>
      <p>เลือกเมนูย่อย</p>
      <ul style={{ marginTop: 12 }}>
        <li>
          <Link href="/evaluation/form">แบบประเมิน</Link>
        </li>
        <li>
          <Link href="/evaluation/certs">ดาวน์โหลดเกียรติบัตร</Link>
        </li>
      </ul>
    </>
  );
}
