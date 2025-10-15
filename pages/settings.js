import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import liff from '@line/liff';

export default function SettingsPage() {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    (async () => {
      try {
        if (!liffId) return setReady(true);
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) { liff.login(); return; }
        const p = await liff.getProfile();
        setUserId(p.userId);
        // load settings
        const r = await fetch(`/api/users/settings?userId=${encodeURIComponent(p.userId)}`);
        const data = await r.json();
        setDarkMode(Boolean(data?.settings?.darkMode));
      } catch (e) {
        console.error(e);
      } finally {
        setReady(true);
      }
    })();
  }, [liffId]);

  const save = async () => {
    if (!userId) return;
    await fetch('/api/users/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, settings: { darkMode } }),
    });
    alert('บันทึกแล้ว');
  };

  if (!ready) return <div style={{ padding: 20 }}>กำลังโหลด...</div>;

  return (
    <Layout>
      <h1 style={{ color: '#fff', marginTop: 16 }}>ตั้งค่า</h1>
      <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, color: '#fff' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          โหมดมืด (dark mode)
        </label>
        <div style={{ marginTop: 12 }}>
          <button onClick={save} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>บันทึก</button>
        </div>
      </div>
    </Layout>
  );
}
