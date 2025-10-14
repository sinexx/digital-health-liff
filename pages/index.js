import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Home() {
  const [name, setName] = useState("บุคลากร");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const p = await liff.getProfile();
        setName(p.displayName);
      } catch (err) {
        console.error(err);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  if (!ready) return <div style={{ padding: 20 }}>กำลังโหลด...</div>;

  const Card = ({ title, desc, href }) => (
    <a
      href={href}
      style={{
        display: "block",
        padding: 16,
        borderRadius: 12,
        background: "#0ea5e9",
        color: "#fff",
        textDecoration: "none",
        boxShadow: "0 6px 16px rgba(0,0,0,.15)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      <div style={{ opacity: 0.9, marginTop: 6 }}>{desc}</div>
    </a>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0891b2,#0f172a)",
        color: "#fff",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>
              Digital Health Academy
            </div>
            <div style={{ opacity: 0.8 }}>กลุ่มงานสุขภาพดิจิทัล</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>ผู้ใช้</div>
            <div style={{ fontWeight: 600 }}>{name}</div>
          </div>
        </header>

        <h1 style={{ marginTop: 16, fontSize: 20, fontWeight: 700 }}>
          ศูนย์รวม 4 เมนู: ผู้ช่วย AI · หลักสูตร · คลังความรู้ · ประเมินผล
        </h1>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 12,
          }}
        >
          <Card
            title="🤖 ผู้ช่วย AI เพื่อการเรียนรู้"
            desc="ถาม-ตอบ สรุป แปล ร่างแนวคิดอบรม"
            href="/assistant"
          />
          <Card
            title="🎓 หลักสูตร & การอบรม"
            desc="ตารางอบรม ลงทะเบียน ดูรายละเอียด"
            href="/training"
          />
          <Card
            title="📚 สื่อการเรียนรู้ / คลังความรู้"
            desc="เอกสาร วิดีโอ คู่มือ มาตรฐาน"
            href="/knowledge"
          />
          <Card
            title="📈 ประเมินผล & ใบรับรอง"
            desc="ทำแบบประเมิน ดาวน์โหลดเกียรติบัตร"
            href="/evaluation"
          />
        </div>

        <footer style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} กลุ่มงานสุขภาพดิจิทัล · Digital Health
          Academy
        </footer>
      </div>
    </div>
  );
}
