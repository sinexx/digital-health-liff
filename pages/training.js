import Link from "next/link";
import Layout from "@/components/Layout";

export default function Training() {
  return (
    <Layout title="หลักสูตร & การอบรม">
      <h1>🎓 หลักสูตร & การอบรม</h1>
      <p>หน้านี้จะแสดงตารางอบรมและการลงทะเบียนในอนาคต</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/" style={{ color: "#0ea5e9" }}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </Layout>
  );
}
