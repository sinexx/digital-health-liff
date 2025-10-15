import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import liff from '@line/liff';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ready, setReady] = useState(false);
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const idToken = liff.getIDToken && liff.getIDToken();
      const r = await fetch('/api/admin/users', { headers: { Authorization: `Bearer ${idToken}` } });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'unknown');
      setUsers(j.users || []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (!liffId) throw new Error('NEXT_PUBLIC_LIFF_ID not set');
        await liff.init({ liffId });
        if (!liff.isLoggedIn()) {
          liff.login();
          return; // page will reload
        }
        await fetchUsers();
      } catch (e) {
        setError(e.message || String(e));
      } finally {
        setReady(true);
      }
    })();
  }, [liffId]);

  const changeRole = async (userId, role) => {
    try {
      const idToken = liff.getIDToken && liff.getIDToken();
      const r = await fetch(`/api/admin/users/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${idToken}` }, body: JSON.stringify({ role }) });
      if (!r.ok) throw new Error('failed');
      fetchUsers();
    } catch (err) { alert('เปลี่ยนสิทธิ์ไม่สำเร็จ'); }
  };

  const deleteUser = async (userId) => {
    if (!confirm('ลบผู้ใช้จริงหรือไม่?')) return;
    try {
      const idToken = liff.getIDToken && liff.getIDToken();
      const r = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${idToken}` } });
      if (!r.ok) throw new Error('failed');
      fetchUsers();
    } catch (err) { alert('ลบไม่สำเร็จ'); }
  };

  return (
    <Layout title="ระบบจัดการผู้ใช้">
      <h1>ผู้ใช้</h1>
      {!ready ? <div>กำลังโหลด LIFF...</div> : null}
      {error ? <div style={{ color: 'salmon' }}>{error}</div> : null}
      <div style={{ marginTop: 12 }}>
        {loading ? <div>กำลังโหลด...</div> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}><th>ID</th><th>ชื่อ</th><th>สิทธิ์</th><th>จัดการ</th></tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.user_id} style={{ borderTop: '1px solid #eee' }}>
                  <td style={{ padding: 8 }}>{u.user_id}</td>
                  <td style={{ padding: 8 }}>{u.display_name}</td>
                  <td style={{ padding: 8 }}>{u.role || 'user'}</td>
                  <td style={{ padding: 8 }}>
                    <button onClick={() => changeRole(u.user_id, u.role === 'admin' ? 'user' : 'admin')} style={{ marginRight: 8 }}>{u.role === 'admin' ? 'ถอนสิทธิ์' : 'ให้สิทธิ์แอดมิน'}</button>
                    <button onClick={() => deleteUser(u.user_id)} style={{ background: 'salmon', color: '#fff' }}>ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
