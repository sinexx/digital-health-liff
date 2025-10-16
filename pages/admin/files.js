import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import liff from '@line/liff';

export default function AdminFiles() {
  const [ready, setReady] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const loadFiles = async () => {
    const r = await fetch('/api/files/list');
    const j = await r.json();
    if (r.ok) setFiles(j.files || []);
  };

  useEffect(() => {
    (async () => {
      try {
        if (!liffId) throw new Error('NEXT_PUBLIC_LIFF_ID not set');
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) { liff.login(); return; }
        const t = liff.getIDToken && liff.getIDToken();
        if (!t) { liff.login(); return; }
        setIdToken(t);
        await loadFiles();
      } catch (e) { setError(e.message || String(e)); }
      finally { setReady(true); }
    })();
  }, [liffId]);

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !idToken) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      const r = await fetch('/api/files/manage', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` },
        body: JSON.stringify({ name: file.name, content: base64, contentType: file.type }),
      });
      if (!r.ok) { const j = await r.json().catch(()=>({})); alert('อัปโหลดไม่สำเร็จ: ' + (j.error || r.status)); return; }
      await loadFiles();
    };
    reader.readAsDataURL(file);
  };

  const onDelete = async (name) => {
    if (!confirm(`ลบไฟล์ ${name}?`)) return;
    const r = await fetch(`/api/files/manage?name=${encodeURIComponent(name)}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${idToken}` }
    });
    if (!r.ok) { const j = await r.json().catch(()=>({})); alert('ลบไม่สำเร็จ: ' + (j.error || r.status)); return; }
    await loadFiles();
  };

  return (
    <Layout title="จัดการไฟล์ (เจ้าของเท่านั้น)">
      {!ready ? <div>กำลังโหลด...</div> : null}
      {error ? <div style={{ color: 'salmon' }}>{error}</div> : null}

      <div style={{ marginTop: 12 }}>
        <input type="file" onChange={onUpload} />
      </div>

      <ul style={{ marginTop: 12 }}>
        {files.map(f => (
          <li key={f.path} style={{ marginBottom: 8 }}>
            <a href={f.url} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>{f.name}</a>
            <button onClick={() => onDelete(f.name)} style={{ marginLeft: 8 }}>ลบ</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
