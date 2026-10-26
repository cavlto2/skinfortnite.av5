import Link from "next/link";

export default function Menu() {
  return <nav className="border-b border-cyan-300/20 bg-[#0b1020] px-5 py-4 text-white shadow-lg">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3">
      <Link href="/" className="mr-auto text-lg font-black italic tracking-wider"><span className="text-cyan-300">FN</span> ARSENAL</Link>
      <Link href="/skins_fortnite" className="font-semibold hover:text-cyan-300">Skins Fortnite</Link>
      <Link href="/form_login" className="rounded-lg bg-yellow-300 px-4 py-2 font-extrabold text-slate-950 hover:bg-yellow-200">Login</Link>
    </div>
  </nav>;
}
