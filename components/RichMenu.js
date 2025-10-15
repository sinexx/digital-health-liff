import Card from "./Card";

export default function RichMenu() {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
        <Card title="🤖 ผู้ช่วย AI เพื่อการเรียนรู้" desc="ถาม-ตอบ สรุป แปล ร่างแนวคิดอบรม" href="/assistant" />
        <Card title="🎓 หลักสูตร & การอบรม" desc="ตารางอบรม ลงทะเบียน ดูรายละเอียด" href="/training" />
        <Card title="📚 สื่อการเรียนรู้ / คลังความรู้" desc="เอกสาร วิดีโอ คู่มือ มาตรฐาน" href="/knowledge" />
        <Card title="📈 ประเมินผล & ใบรับรอง" desc="ทำแบบประเมิน ดาวน์โหลดเกียรติบัตร" href="/evaluation" />
      </div>
    </div>
  );
}
