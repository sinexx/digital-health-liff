import Layout from "@/components/Layout";
import Link from "next/link";

export default function KnowledgeDocs() {
  return (
    <Layout title="เอกสาร">
      <h1>เอกสาร</h1>
      <p>รายการเอกสารดาวน์โหลด</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/knowledge">← กลับคลังความรู้</Link>
      </div>
    </Layout>
  );
}
