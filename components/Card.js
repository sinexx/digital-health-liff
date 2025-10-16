import Link from "next/link";

export default function Card({ title, desc, href, icon = null, style = {} }) {
  return (
    <Link href={href} className={`card ${animate ? 'fade-in-up' : ''}`} style={{ textDecoration: 'none', color: 'inherit', ...style }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        {icon ? <div style={{ width: 44, height: 44, flex: '0 0 44px' }}>{icon}</div> : null}
        <div style={{ flex: 1 }}>
          <div className="title">{title}</div>
          {desc ? <div className="desc">{desc}</div> : null}
        </div>
      </div>
      {children ? <div style={{ marginTop: 14 }}>{children}</div> : null}
    </Link>
  );
}
