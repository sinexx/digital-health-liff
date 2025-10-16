import Link from "next/link";

export default function CardLink({ href, title, desc, icon }) {
  return (
    <Link
      href={href}
      className="block rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition shadow-sm"
    >
      <div className="p-5">
        <div className="flex items-center gap-2">
          {icon ?? <span className="text-slate-500">▣</span>}
          <h3 className="text-slate-900 font-semibold">{title}</h3>
        </div>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </Link>
  );
}
