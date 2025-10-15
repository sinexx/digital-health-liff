import { useEffect, useState } from "react";
import liff from "@line/liff";
import Link from "next/link";
import Layout from "@/components/Layout";

export default function Home() {
  const [name, setName] = useState("บุคลากร");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    (async () => {
      if (!liffId || liffId === "YOUR_LIFF_ID_HERE") {
        setError("ยังไม่ได้ตั้งค่า NEXT_PUBLIC_LIFF_ID (.env.local)");
        setReady(true);
        return;
      }
      try {
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
          return; // หน้าจะ reload หลัง login
        }
        const p = await liff.getProfile();
        setName(p.displayName);
      } catch (err) {
        console.error("LIFF init error", err);
        setError(err?.message || "ไม่สามารถเริ่มต้น LIFF ได้");
      } finally {
        setReady(true);
      }
    })();
  }, [liffId]);

  if (!ready) return <div style={{ padding: 20 }}>กำลังโหลด...</div>;

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#fff",
          padding: 32,
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>LIFF ยังไม่พร้อม ⚠️</h1>
          <p style={{ lineHeight: 1.5 }}>
            {error}
            <br />
            เปิดไฟล์ <code>.env.local</code> และตั้งค่า
            <br />
            <code>NEXT_PUBLIC_LIFF_ID=YOUR_REAL_LIFF_ID</code>
          </p>
          <p style={{ fontSize: 12, opacity: 0.7, marginTop: 24 }}>
            หลังแก้ไขให้หยุด dev server แล้วรันใหม่: <code>npm run dev</code>
          </p>
        </div>
      </div>
    );
  }

  const Card = ({ title, desc, href }) => (
    <Link
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
    </Link>
  );

  return (
    <Layout>
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
    </Layout>
  );
}
