import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Layout({ children, title = "Digital Health Academy — หน้าหลัก", user = "บุคลากร", avatar = null, showHeader = true }) {
  const initials = user ? user.trim().split(" ").map(s => s[0]).slice(0,2).join("") : "บ";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window === "undefined") return;

    try {
      // Clear local/session storage
      try { localStorage.clear(); } catch (e) { /* ignore */ }
      try { sessionStorage.clear(); } catch (e) { /* ignore */ }

      // Clear Cache Storage (most PWAs use this)
      if (window.caches && typeof window.caches.keys === 'function') {
        window.caches.keys().then(keys => {
          keys.forEach(k => window.caches.delete(k));
        }).catch(() => {});
      }

      if (window.liff && window.liff.isLoggedIn && window.liff.isLoggedIn()) {
        window.liff.logout();
      }
    } catch (err) {
      console.warn('logout cleanup failed', err);
    } finally {
      // redirect to logged-out page so user can login again; add flag to show popup
      window.location.replace('/logged-out?justLoggedOut=1');
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0891b2,#0f172a)", color: "#fff" }}>
      <div className="__app_container" style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        {showHeader ? (
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
              <div style={{ opacity: 0.8 }}>กลุ่มงานสุขภาพดิจิทัล</div>
              <nav style={{ marginTop: 6, display: 'flex', gap: 12, fontSize: 14 }}>
                <Link href="/">หน้าหลัก</Link>
                <Link href="/files">ไฟล์เผยแพร่</Link>
                <Link href="/about">เกี่ยวกับ</Link>
              </nav>
            </div>
            <div className="__header_user_row" style={{ textAlign: "right", display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, opacity: 0.8 }}>ผู้ใช้</div>
                <div style={{ fontWeight: 600 }}>{user}</div>
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setMenuOpen(v => !v)} className="avatar-btn" aria-expanded={menuOpen}>
                {avatar ? (
                  <div style={{ width: 44, height: 44, borderRadius: 9999, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.12)' }}>
                    <Image src={avatar} alt="avatar" width={44} height={44} style={{ objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: 9999, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {initials}
                  </div>
                )}
              </div>

              {menuOpen ? (
                <div className="__avatar_dropdown dropdown-open" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#fff', color: '#0f172a', borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,.2)', minWidth: 180, overflow: 'hidden' }}>
                  <Link href="/profile" style={{ display: 'block', padding: 10, borderBottom: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>โปรไฟล์ของฉัน</Link>
                  <button onClick={handleLogout} style={{ display: 'block', width: '100%', padding: 10, border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer' }}>ออกจากระบบ</button>
                </div>
              ) : null}
            </div>
          </header>
        ) : null}

        <main style={{ marginTop: 16 }}>{children}</main>

        <footer style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} กลุ่มงานสุขภาพดิจิทัล · Digital Health Academy
        </footer>
      </div>
    </div>
  );
}
