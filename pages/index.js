import { useEffect, useState } from "react";
import liff from "@line/liff";
import Layout from "@/components/Layout";
import Link from "next/link";
import RichMenu from "@/components/RichMenu";

export default function Home() {
  const [name, setName] = useState("บุคลากร");
  const [avatar, setAvatar] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const ownerId = process.env.NEXT_PUBLIC_OWNER_USER_ID || '';
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    (async () => {
      try {
        if (liffId) {
          await liff.init({ liffId });
          if (liff.isLoggedIn()) {
            const p = await liff.getProfile();
            setUserId(p.userId);
            setName(p.displayName);
            setAvatar(p.pictureUrl || null);

            // upsert profile to backend (optional)
            const idToken = liff.getIDToken && liff.getIDToken();
            if (idToken) {
              try {
                await fetch('/api/users/upsert', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ idToken, profile: { userId: p.userId, displayName: p.displayName, pictureUrl: p.pictureUrl } }),
                });
              } catch (e) {
                console.warn('upsert profile failed', e);
              }
            }
          }
        }
      } catch (err) {
        console.error("LIFF init error", err);
        // Don't block public page if LIFF fails; just show default name
      } finally {
        setReady(true);
      }
    })();
  }, [liffId]);

  if (!ready) return <div style={{ padding: 20 }}>กำลังโหลด...</div>;

  // Always show public page, even if LIFF is not configured

  // Homepage uses RichMenu component for cards

  return (
    <Layout user={name} avatar={avatar}>
      <h1 style={{ marginTop: 16, fontSize: 20, fontWeight: 700 }}>หน้าหลัก</h1>

      {userId && ownerId && userId === ownerId ? (
        <RichMenu />
      ) : (
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.06)', padding: 16, borderRadius: 12, color: '#fff' }}>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>ยินดีต้อนรับ</div>
          <div style={{ opacity: 0.9 }}>สวัสดีคุณ {name}</div>
          <div style={{ marginTop: 12, opacity: 0.8 }}>
            คุณสามารถติดตามข่าวสารและดาวน์โหลดเอกสารได้จากเมนู &quot;ไฟล์เผยแพร่&quot; หรือคลิกที่นี่: <Link href="/files" style={{ color: '#0ea5e9' }}>/files</Link>
          </div>
        </div>
      )}
    </Layout>
  );
}
