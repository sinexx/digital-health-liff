import Link from "next/link";
import Layout from "@/components/Layout";

export default function Evaluation() {
  return (
    <Layout title="ประเมินผล & ใบรับรอง">
      <h1>📈 ประเมินผล & ใบรับรอง</h1>
      <p>หน้านี้จะใช้ทำแบบประเมินและดาวน์โหลดเกียรติบัตร</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/" style={{ color: "#0ea5e9" }}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </Layout>
  );
}
