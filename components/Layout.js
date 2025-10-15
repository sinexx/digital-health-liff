import Link from "next/link";

export default function Layout({ children, title = "Digital Health Academy", user = "บุคลากร" }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0891b2,#0f172a)", color: "#fff" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: 20 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700 }}>{title}</div>
            <div style={{ opacity: 0.8 }}>กลุ่มงานสุขภาพดิจิทัล</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, opacity: 0.8 }}>ผู้ใช้</div>
            <div style={{ fontWeight: 600 }}>{user}</div>
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
