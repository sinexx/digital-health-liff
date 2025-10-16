export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Topbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-md bg-slate-100 grid place-items-center text-slate-500">◆</div>
            <div>
              <p className="text-xs text-slate-500">กลุ่มงานสุขภาพดิจิทัล</p>
              <h1 className="text-base font-semibold text-slate-900">Digital Health Academy</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-500">ผู้ใช้</p>
            <p className="font-medium">บุคลากร</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <footer className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-slate-500 border-t border-slate-200">
        © {new Date().getFullYear()} กลุ่มงานสุขภาพดิจิทัล · Digital Health Academy
      </footer>
    </div>
  );
}
