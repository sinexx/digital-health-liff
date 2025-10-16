import { useEffect, useState } from "react";
import liff from "@line/liff";
import { useRouter } from 'next/router';

export default function LoggedOut() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { justLoggedOut } = router.query;
      if (justLoggedOut === '1' || justLoggedOut === 'true') {
        setShowPopup(true);
        // auto close after 3s but play closing animation first
        const t = setTimeout(() => {
          setClosing(true);
          // allow animation to run
          setTimeout(() => setShowPopup(false), 260);
        }, 3000);
        return () => clearTimeout(t);
      }
    }
  }, [router.isReady, router.query]);

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
    <>
      <div style={{ padding: 24, color: '#fff', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, marginBottom: 6 }}>คุณได้ออกจากระบบแล้ว</h2>
          <p style={{ marginBottom: 18 }}>คลิกปุ่มด้านล่างเพื่อเข้าสู่ระบบอีกครั้ง</p>
          <div>
            <button onClick={handleLogin} style={{ padding: '12px 18px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>เข้าสู่ระบบใหม่</button>
          </div>
        </div>
      </div>

      {showPopup ? (
        <div style={{ position: 'fixed', left: 0, right: 0, top: 20, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div className={"toast " + (closing ? 'toast--closing' : '')} style={{ background: '#0ea5e9', color: '#fff', padding: '10px 16px', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,.2)', pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div>ออกจากระบบเรียบร้อยแล้ว</div>
            <button onClick={() => { setClosing(true); setTimeout(() => setShowPopup(false), 260); }} style={{ marginLeft: 12, background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>ปิด</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
