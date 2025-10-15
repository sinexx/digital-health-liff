import Layout from "@/components/Layout";
import Link from "next/link";

export default function EvaluationForm() {
  return (
    <Layout title="แบบประเมิน">
      <h1>แบบประเมิน</h1>
      <p>แบบประเมินตัวอย่างจะอยู่ที่นี่</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/evaluation">← กลับประเมินผล</Link>
      </div>
    </Layout>
  );
}
