import { useEffect, useState } from "react";
import liff from "@line/liff";
import Layout from "@/components/Layout";
import RichMenu from "@/components/RichMenu";

export default function Home() {
  const [name, setName] = useState("บุคลากร");
  const [avatar, setAvatar] = useState(null);
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
        setAvatar(p.pictureUrl || null);

        // upsert profile to backend
        const idToken = liff.getIDToken && liff.getIDToken();
        try {
          await fetch('/api/users/upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, profile: { userId: p.userId, displayName: p.displayName, pictureUrl: p.pictureUrl } }),
          });
        } catch (e) {
          console.warn('upsert profile failed', e);
        }
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

  // Homepage uses RichMenu component for cards

  return (
    <Layout user={name} avatar={avatar}>
      <h1 style={{ marginTop: 16, fontSize: 20, fontWeight: 700 }}>หน้าหลัก</h1>

      <RichMenu />
    </Layout>
  );
}
