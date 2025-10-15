import Layout from "@/components/Layout";
import { useEffect } from "react";
import liff from "@line/liff";

export default function LoggedOut() {
  useEffect(() => {
    // optionally any cleanup on mount
  }, []);

  const handleLogin = async () => {
    const liffId = process.env.NEXT_PUBLIC_LIFF_ID;
    if (!liffId) {
      alert('NEXT_PUBLIC_LIFF_ID ยังไม่ได้ตั้งค่า');
      return;
    }
    try {
      await liff.init({ liffId });
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    } catch (err) {
      console.error(err);
      alert('ไม่สามารถเริ่ม LIFF ได้');
    }
  };

  return (
    <Layout title="ออกจากระบบแล้ว" showHeader={false}>
      <div style={{ padding: 24, color: '#fff', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 6 }}>คุณได้ออกจากระบบแล้ว</h2>
          <p style={{ marginBottom: 18 }}>คลิกปุ่มด้านล่างเพื่อเข้าสู่ระบบอีกครั้ง</p>
          <div>
            <button onClick={handleLogin} style={{ padding: '12px 18px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>เข้าสู่ระบบใหม่</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
