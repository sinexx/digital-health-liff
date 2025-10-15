import Card from "./Card";

export default function RichMenu() {
  return (
    <div style={{ marginTop: 16 }}>
      {/* Training group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>🎓 หลักสูตร & การอบรม</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card title="ตารางอบรม" desc="ดูตารางและรายละเอียด" href="/training/schedule" />
          <Card title="ลงทะเบียน" desc="แบบฟอร์มลงทะเบียน" href="/training/register" />
        </div>
      </div>

      {/* Knowledge group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>📚 สื่อการเรียนรู้ / คลังความรู้</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card title="เอกสาร" desc="ดาวน์โหลดเอกสาร คู่มือ" href="/knowledge/docs" />
          <Card title="วิดีโอ" desc="วิดีโอการสอน/อบรม" href="/knowledge/videos" />
        </div>
      </div>

      {/* Evaluation group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>📈 ประเมินผล & ใบรับรอง</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card title="แบบประเมิน" desc="ทำแบบประเมินออนไลน์" href="/evaluation/form" />
          <Card title="ดาวน์โหลดเกียรติบัตร" desc="ดาวน์โหลดใบรับรอง/เกียรติบัตร" href="/evaluation/certs" />
        </div>
      </div>
    </div>
  );
}
