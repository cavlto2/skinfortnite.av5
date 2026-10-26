import Link from 'next/link';

export default function Home() {
  return <main className="fortnite-page flex flex-1 items-center">
    <section className="mx-auto grid w-full max-w-6xl items-center gap-10 py-12 md:grid-cols-2">
      <div><p className="eyebrow">DROP IN · GEAR UP</p><h1 className="text-5xl font-black italic leading-tight md:text-7xl">SUA PRÓXIMA <span className="text-yellow-300">VITÓRIA</span> COMEÇA AQUI.</h1><p className="mt-6 max-w-xl leading-8 text-slate-300">Um arsenal para cadastrar e consultar skins, raridades, temporadas e preços em V-Bucks. Entre no lobby e organize sua coleção.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/skins_fortnite" className="rounded-lg bg-yellow-300 px-5 py-3 font-black text-slate-950 hover:bg-yellow-200">VER ARSENAL ↗</Link><Link href="/form_login" className="rounded-lg border border-cyan-300 px-5 py-3 font-bold text-cyan-200 hover:bg-cyan-300/10">FAZER LOGIN</Link></div></div>
      <div className="rounded-3xl border border-cyan-300/20 bg-slate-900/80 p-8 shadow-2xl"><div className="mb-5 text-6xl">✦</div><p className="eyebrow">BATTLE ROYALE DATABASE</p><h2 className="text-3xl font-black">O SEU LOOT. AS SUAS REGRAS.</h2><p className="mt-4 leading-7 text-slate-300">Cadastros protegidos por login, listagem pública e dados salvos no banco de dados.</p><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 p-4"><p className="text-xs text-cyan-200">ACESSO</p><p className="mt-1 font-bold">JWT protegido</p></div><div className="rounded-xl border border-purple-300/20 bg-purple-300/5 p-4"><p className="text-xs text-purple-200">COLEÇÃO</p><p className="mt-1 font-bold">7 atributos</p></div></div></div>
    </section>
  </main>;
}
