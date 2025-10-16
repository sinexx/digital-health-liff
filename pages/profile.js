import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import liff from '@line/liff';

export default function MyProfile() {
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ display_name: '', email: '', department: '', position: '', phone: '' });
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState('บุคลากร');
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    (async () => {
      try {
        if (!liffId) return setReady(true);
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) { liff.login(); return; }
        const p = await liff.getProfile();
        setAvatar(p.pictureUrl || null);
        setName(p.displayName || '');
        const idToken = liff.getIDToken && liff.getIDToken();
        if (!idToken) {
          // Most likely LIFF app scopes do not include "openid". Force re-login to refresh consent/session.
          alert('ยังไม่ได้รับสิทธิ์ openid สำหรับ idToken จะพาไปเข้าสู่ระบบอีกครั้ง');
          liff.login();
          return;
        }
        const r = await fetch(`/api/profile?idToken=${encodeURIComponent(idToken)}`);
        if (r.ok) {
          const d = await r.json();
          setForm({
            display_name: d.profile?.display_name || p.displayName || '',
            email: d.profile?.email || '',
            department: d.profile?.department || '',
            position: d.profile?.position || '',
            phone: d.profile?.phone || '',
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setReady(true);
      }
    })();
  }, [liffId]);

  const save = async () => {
    const idToken = liff.getIDToken && liff.getIDToken();
    if (!idToken) {
      alert('ไม่พบ idToken กรุณาเข้าสู่ระบบอีกครั้ง');
      liff.login();
      return;
    }
    const rs = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken, profile: form }),
    });
    if (rs.ok) {
      alert('บันทึกโปรไฟล์แล้ว');
    } else {
      let msg = 'บันทึกไม่สำเร็จ';
      try { const j = await rs.json(); if (j?.error) msg += `: ${j.error}`; } catch (_) {}
      alert(msg);
    }
  };

  if (!ready) return <div style={{ padding: 20 }}>กำลังโหลด...</div>;

  return (
    <Layout user={name} avatar={avatar} title="โปรไฟล์ของฉัน">
      <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, color: '#fff' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          <Field label="ชื่อที่แสดง">
            <input value={form.display_name} onChange={(e)=>setForm(s=>({ ...s, display_name: e.target.value }))} style={inputStyle} />
          </Field>
          <Field label="อีเมล">
            <input value={form.email} onChange={(e)=>setForm(s=>({ ...s, email: e.target.value }))} style={inputStyle} type="email" />
          </Field>
          <Field label="หน่วยงาน/แผนก">
            <input value={form.department} onChange={(e)=>setForm(s=>({ ...s, department: e.target.value }))} style={inputStyle} />
          </Field>
          <Field label="ตำแหน่ง">
            <input value={form.position} onChange={(e)=>setForm(s=>({ ...s, position: e.target.value }))} style={inputStyle} />
          </Field>
          <Field label="เบอร์ติดต่อ">
            <input value={form.phone} onChange={(e)=>setForm(s=>({ ...s, phone: e.target.value }))} style={inputStyle} />
          </Field>
        </div>
        <div style={{ marginTop: 16 }}>
          <button onClick={save} style={{ padding: '10px 14px', borderRadius: 8, border: 'none', background: '#0ea5e9', color: '#fff', cursor: 'pointer' }}>บันทึก</button>
        </div>
      </div>
    </Layout>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ opacity: .9 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = { padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.1)', color: '#fff' };
