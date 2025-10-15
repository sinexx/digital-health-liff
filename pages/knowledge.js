import Link from "next/link";
import Layout from "@/components/Layout";

export default function Knowledge() {
  return (
    <Layout title="สื่อการเรียนรู้ / คลังความรู้">
      <h1>📚 สื่อการเรียนรู้ / คลังความรู้</h1>
      <p>หน้านี้จะรวบรวมเอกสาร วิดีโอ คู่มือ และมาตรฐาน</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/" style={{ color: "#0ea5e9" }}>
          ← กลับหน้าแรก
        </Link>
      </div>
    </Layout>
  );
}
