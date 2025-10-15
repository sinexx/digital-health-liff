import Link from "next/link";

export default function Card({ title, desc, href, icon = null, style = {} }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: 18,
        borderRadius: 12,
        background: "#0ea5e9",
        color: "#fff",
        textDecoration: "none",
        boxShadow: "0 6px 16px rgba(0,0,0,.15)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {icon ? <div style={{ fontSize: 20 }}>{icon}</div> : null}
        <div style={{ fontSize: 18, fontWeight: 700 }}>{title}</div>
      </div>
      <div style={{ opacity: 0.9, marginTop: 6 }}>{desc}</div>
    </Link>
  );
}
