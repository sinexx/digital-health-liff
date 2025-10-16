import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

export default function FilesPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/files/list');
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || 'error');
        setFiles(j.files || []);
      } catch (e) { setErr(e.message || String(e)); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <Layout title="เอกสาร/ไฟล์เผยแพร่">
      <h1>ไฟล์เผยแพร่</h1>
      {loading ? <div style={{ marginTop: 12 }}>กำลังโหลด...</div> : null}
      {err ? <div style={{ marginTop: 12, color: 'salmon' }}>ผิดพลาด: {err}</div> : null}
      <ul style={{ marginTop: 12 }}>
        {files.map(f => (
          <li key={f.path} style={{ marginBottom: 8 }}>
            <a href={f.url} target="_blank" rel="noreferrer" style={{ color: '#0ea5e9' }}>{f.name}</a>
          </li>
        ))}
        {(!loading && !err && files.length === 0) ? <li>ยังไม่มีไฟล์</li> : null}
      </ul>
    </Layout>
  );
}
