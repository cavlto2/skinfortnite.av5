'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Skin = { id: number; nome: string; raridade: string; tipo: string; temporada: string; conjunto: string; v_bucks: number; disponivel: boolean };
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SkinsFortnitePage() {
  const router = useRouter();
  const [skins, setSkins] = useState<Skin[]>([]);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const carregarSkins = useCallback(async () => {
    if (!apiUrl) { setMensagem('Configure NEXT_PUBLIC_API_URL no arquivo .env.local.'); return; }
    try {
      const resposta = await fetch(`${apiUrl}/skins-fortnite`, { cache: 'no-store' });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.detalhes || 'Não foi possível carregar as skins.');
      setSkins(dados.detalhes || []);
    } catch { setMensagem('Não foi possível conectar ao backend. Confira se ele está em execução.'); }
  }, []);

  useEffect(() => { void carregarSkins(); }, [carregarSkins]);

  async function incluirSkin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) { router.push('/form_login'); return; }
    if (!apiUrl) { setMensagem('Configure NEXT_PUBLIC_API_URL no arquivo .env.local.'); return; }
    const formulario = e.currentTarget;
    const form = new FormData(formulario);
    setCarregando(true); setMensagem('');
    try {
      const resposta = await fetch(`${apiUrl}/skin-fortnite`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nome: form.get('nome'), raridade: form.get('raridade'), tipo: form.get('tipo'), temporada: form.get('temporada'), conjunto: form.get('conjunto'), v_bucks: Number(form.get('v_bucks')), disponivel: form.get('disponivel') === 'on' })
      });
      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.detalhes || 'Falha ao cadastrar skin.');
      setMensagem('Skin adicionada ao arsenal!'); formulario.reset(); await carregarSkins();
    } catch (err) { setMensagem(err instanceof Error ? err.message : 'Erro inesperado ao cadastrar.'); }
    finally { setCarregando(false); }
  }

  return <main className="fortnite-page">
    <section className="fortnite-hero"><p className="eyebrow">BATTLE ROYALE · DATABASE</p><h1>ARSENAL <span>FORTNITE</span></h1><p>Monte sua coleção. Registre skins lendárias e confira os itens cadastrados.</p><div className="hero-stats"><div><strong>{skins.length.toString().padStart(2, '0')}</strong><span>ITENS NO ARSENAL</span></div><div><strong>100%</strong><span>VIBE VITÓRIA ROYALE</span></div></div></section>
    <div className="fortnite-grid">
      <section className="game-panel"><div className="panel-title"><span className="panel-icon">＋</span><div><p className="eyebrow">NOVO ITEM</p><h2>Cadastrar skin</h2></div></div><p className="muted">O cadastro exige login. Use <b>admin</b> / <b>admin123</b>.</p>
        <form onSubmit={incluirSkin} className="skin-form">
          <label>Nome da skin<input name="nome" placeholder="Ex.: Cavaleiro Negro" required maxLength={120}/></label>
          <div className="form-row"><label>Raridade<select name="raridade" required defaultValue=""><option value="" disabled>Selecione</option><option>Comum</option><option>Incomum</option><option>Rara</option><option>Épica</option><option>Lendária</option><option>Ícone</option></select></label><label>Tipo<select name="tipo" required defaultValue=""><option value="" disabled>Selecione</option><option>Traje</option><option>Emote</option><option>Picareta</option><option>Asa-delta</option><option>Acessório para as costas</option></select></label></div>
          <div className="form-row"><label>Temporada<input name="temporada" placeholder="Ex.: Capítulo 1 - Temporada 2" required/></label><label>Preço (V-Bucks)<input name="v_bucks" type="number" min="0" step="1" placeholder="1500" required/></label></div>
          <label>Conjunto<input name="conjunto" placeholder="Nome do conjunto" required/></label>
          <label className="check-label"><input type="checkbox" name="disponivel" defaultChecked/> Disponível na loja</label>
          <button className="fortnite-button" disabled={carregando}>{carregando ? 'SALVANDO...' : 'ADICIONAR AO ARSENAL ↗'}</button>
        </form>{mensagem && <p className="feedback" role="status">{mensagem}</p>}
      </section>
      <section className="game-panel inventory"><div className="panel-title"><span className="panel-icon">▤</span><div><p className="eyebrow">COLEÇÃO</p><h2>Skins cadastradas</h2></div><button className="refresh-button" onClick={() => void carregarSkins()} aria-label="Atualizar lista">↻</button></div>
        {skins.length === 0 ? <div className="empty-state"><span>◈</span><h3>Nenhum item encontrado</h3><p>Cadastre a primeira skin para começar sua coleção.</p></div> : <div className="skin-list">{skins.map((skin) => <article className="skin-card" key={skin.id}><div className={`rarity-mark rarity-${skin.raridade.toLowerCase().replaceAll(' ', '-')}`}>◈</div><div className="skin-info"><h3>{skin.nome}</h3><p>{skin.tipo} · {skin.conjunto}</p><div className="skin-tags"><span>{skin.raridade}</span><span>{skin.temporada}</span><span className={skin.disponivel ? 'available' : 'unavailable'}>{skin.disponivel ? 'Na loja' : 'Indisponível'}</span></div></div><strong className="price">{skin.v_bucks.toLocaleString('pt-BR')} <small>V-BUCKS</small></strong></article>)}</div>}
      </section>
    </div><footer className="fortnite-footer">⚡ DROP IN. GEAR UP. VITÓRIA ROYALE. <span>Projeto acadêmico AV5 · Fortnite</span></footer>
  </main>;
}
