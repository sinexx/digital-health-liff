import Link from "next/link";
import { useState } from "react";
import liff from "@line/liff";

export default function Assistant() {
  const [profile, setProfile] = useState(null);
  const [busy, setBusy] = useState(false);

  const fetchProfile = async () => {
    try {
      setBusy(true);
      const p = await liff.getProfile();
      setProfile(p);
    } catch (e) {
      alert("ไม่สามารถดึงโปรไฟล์: " + (e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  const sendTestMessage = async () => {
    if (!liff.isInClient()) {
      alert("โปรดเปิดหน้านี้จากภายในแอป LINE เพื่อทดสอบการส่งข้อความ");
      return;
    }
    try {
      setBusy(true);
      await liff.sendMessages([
        { type: "text", text: "ทดสอบจาก LIFF: Digital Health Academy" },
      ]);
      alert("ส่งข้อความเรียบร้อย");
    } catch (e) {
      alert("ส่งข้อความไม่สำเร็จ: " + (e?.message || e));
    } finally {
      setBusy(false);
    }
  };

  const closeLiff = () => {
    if (liff.isInClient()) {
      liff.closeWindow();
    } else {
      alert("ปิดได้เฉพาะเมื่อเปิดในแอป LINE เท่านั้น");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>🤖 ผู้ช่วย AI เพื่อการเรียนรู้</h1>
      <p>หน้านี้จะเชื่อมต่อกับ AI Assistant ภายหลัง</p>

      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={fetchProfile} disabled={busy} style={{ padding: 8 }}>
          ดึงโปรไฟล์
        </button>
        <button onClick={sendTestMessage} disabled={busy} style={{ padding: 8 }}>
          ส่งข้อความทดสอบ
        </button>
        <button onClick={closeLiff} style={{ padding: 8 }}>
          ปิด LIFF
        </button>
        <Link href="/" style={{ color: "#0ea5e9", alignSelf: "center" }}>
          ← กลับหน้าแรก
        </Link>
      </div>

      {profile && (
        <div style={{ marginTop: 16 }}>
          <h3>ข้อมูลโปรไฟล์</h3>
          <div>ชื่อ: {profile.displayName}</div>
          <div>userId: {profile.userId}</div>
        </div>
      )}
    </div>
  );
}
