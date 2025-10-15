import Layout from "@/components/Layout";
import Link from "next/link";

export default function TrainingRegister() {
  return (
    <Layout title="ลงทะเบียนอบรม">
      <h1>ลงทะเบียนอบรม</h1>
      <p>ฟอร์มลงทะเบียนจะแสดงที่นี่ (ตัวอย่าง)</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/training">← กลับหลักสูตร</Link>
      </div>
    </Layout>
  );
}
