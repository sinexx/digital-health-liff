import Layout from "@/components/LayoutTailwind";
import CardLink from "@/components/CardLink";

export default function Home() {
  return (
    <Layout>
      <section className="mb-5">
        <h2 className="text-xl font-semibold text-slate-900">
          ศูนย์รวม 4 เมนู: ผู้ช่วย AI · หลักสูตร · คลังความรู้ · ประเมินผล
        </h2>
        <p className="text-slate-600 mt-1">
          หน้ารวมเนื้อหาฝึกอบรมและเครื่องมือสำหรับบุคลากร (Minimal · สีเทา)
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CardLink href="/assistant"  title="ผู้ช่วย AI เพื่อการเรียนรู้" desc="ถาม-ตอบ สรุป แปลเอกสาร ร่างแผนอบรม" />
        <CardLink href="/training"   title="หลักสูตร & การอบรม" desc="ตารางอบรม ลงทะเบียน ดูรายละเอียดวิทยากร" />
        <CardLink href="/knowledge"  title="สื่อการเรียนรู้ / คลังความรู้" desc="เอกสาร วิดีโอ คู่มือ มาตรฐาน และ FAQ" />
        <CardLink href="/evaluation" title="ประเมินผล & ใบรับรอง" desc="ทำแบบประเมิน ดาวน์โหลดเกียรติบัตร ดูสถิติ" />
      </section>
    </Layout>
  );
}
