import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Layout({ children, title = "Digital Health Academy — หน้าหลัก", user = "บุคลากร", avatar = null }) {
  const initials = user ? user.trim().split(" ").map(s => s[0]).slice(0,2).join("") : "บ";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined" && window.liff && window.liff.isLoggedIn && window.liff.isLoggedIn()) {
      window.liff.logout();
      // optionally redirect out of LIFF or reload
      window.location.reload();
    } else {
      // fallback: just reload
      window.location.reload();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0891b2,#0f172a)", color: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
            <div style={{ opacity: 0.8 }}>กลุ่มงานสุขภาพดิจิทัล</div>
          </div>
          <div style={{ textAlign: "right", display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>ผู้ใช้</div>
              <div style={{ fontWeight: 600 }}>{user}</div>
            </div>
            <div style={{ cursor: 'pointer' }} onClick={() => setMenuOpen(v => !v)}>
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
              <div style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', background: '#fff', color: '#0f172a', borderRadius: 8, boxShadow: '0 6px 20px rgba(0,0,0,.2)', minWidth: 180, overflow: 'hidden' }}>
                <Link href="#" style={{ display: 'block', padding: 10, borderBottom: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit' }} onClick={() => setMenuOpen(false)}>โปรไฟล์</Link>
                <button onClick={handleLogout} style={{ display: 'block', width: '100%', padding: 10, border: 0, background: 'transparent', textAlign: 'left', cursor: 'pointer' }}>ออกจากระบบ</button>
              </div>
            ) : null}
          </div>
        </header>

        <main style={{ marginTop: 16 }}>{children}</main>

        <footer style={{ marginTop: 24, fontSize: 12, opacity: 0.7 }}>
          © {new Date().getFullYear()} กลุ่มงานสุขภาพดิจิทัล · Digital Health Academy
        </footer>
      </div>
    </div>
  );
}
