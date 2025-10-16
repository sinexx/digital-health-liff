import Layout from '@/components/Layout';

export default function AboutPage() {
  return (
    <Layout title="เกี่ยวกับเรา">
      <h1>เกี่ยวกับโครงการ</h1>
      <p style={{ marginTop: 8 }}>
        เว็บย่อมๆ เพื่อเผยแพร่ข้อมูล ข่าวสาร และเอกสารของกลุ่มงานสุขภาพดิจิทัล
      </p>
      <p style={{ marginTop: 8, opacity: 0.9 }}>
        ติดต่อ: example@hospital.or.th
      </p>
    </Layout>
  );
}
