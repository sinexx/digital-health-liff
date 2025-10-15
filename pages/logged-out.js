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
    <Layout title="ออกจากระบบแล้ว">
      <div style={{ padding: 24, color: '#fff' }}>
        <h2>คุณได้ออกจากระบบแล้ว</h2>
        <p>คลิกปุ่มด้านล่างเพื่อเข้าสู่ระบบอีกครั้ง</p>
        <div style={{ marginTop: 12 }}>
          <button onClick={handleLogin} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>เข้าสู่ระบบใหม่</button>
        </div>
      </div>
    </Layout>
  );
}
