import Layout from "@/components/Layout";
import Link from "next/link";

export default function TrainingSchedule() {
  return (
    <Layout title="ตารางอบรม">
      <h1>ตารางอบรม</h1>
      <p>รายการอบรมจะแสดงที่นี่ (ตัวอย่าง)</p>
      <div style={{ marginTop: 12 }}>
        <Link href="/training">← กลับหลักสูตร</Link>
      </div>
    </Layout>
  );
}
