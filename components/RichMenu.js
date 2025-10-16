import Card from "./Card";

export default function RichMenu() {
  return (
    <div style={{ marginTop: 16 }}>
      {/* Training group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>🎓 หลักสูตร & การอบรม</h3>
        <div className="__richmenu_grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card icon="🎓" title="ตารางอบรม" desc="ดูตารางและรายละเอียด" href="/training/schedule" />
          <Card icon="📝" title="ลงทะเบียน" desc="แบบฟอร์มลงทะเบียน" href="/training/register" />
        </div>
      </div>

      {/* Knowledge group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>📚 สื่อการเรียนรู้ / คลังความรู้</h3>
        <div className="__richmenu_grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card icon="📄" title="เอกสาร" desc="ดาวน์โหลดเอกสาร คู่มือ" href="/knowledge/docs" />
          <Card icon="🎬" title="วิดีโอ" desc="วิดีโอการสอน/อบรม" href="/knowledge/videos" />
        </div>
      </div>

      {/* Evaluation group */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>📈 ประเมินผล & ใบรับรอง</h3>
        <div className="__richmenu_grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card icon="📝" title="แบบประเมิน" desc="ทำแบบประเมินออนไลน์" href="/evaluation/form" />
          <Card icon="🎖️" title="ดาวน์โหลดเกียรติบัตร" desc="ดาวน์โหลดใบรับรอง/เกียรติบัตร" href="/evaluation/certs" />
        </div>
      </div>

      {/* Public Files */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: "12px 0", color: "#fff" }}>📂 ไฟล์เผยแพร่</h3>
        <div className="__richmenu_grid stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          <Card icon="📂" title="ไฟล์เผยแพร่" desc="ดาวน์โหลดเอกสารต่างๆ" href="/files" />
        </div>
      </div>
    </div>
  );
}
