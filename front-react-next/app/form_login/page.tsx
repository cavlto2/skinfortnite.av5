'use client';

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleLogin = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        setError("");

        try {
            // faz a chamada ao backend, para obter a TOKEN
            const resposta = await fetch(apiUrl+'/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, senha }),
            });

            // recebe a resposta em json
            const dados = await resposta.json();

            if (!resposta.ok) {
                throw new Error(dados.detalhes || "Algo deu errado!");
            }

            //console.log(dados.resultado);
            //console.log(dados.detalhes);

            // se chegou até aqui, armazena a 
            // token no localStorage
            localStorage.setItem("token", dados.detalhes.token);

            // encaminha a página para a "raiz" (home)
            router.push("/");
            
        } catch (err: any) {
            setError(err.message);
        }
    }

return (
    <div className="mx-auto my-12 w-full max-w-sm px-4 text-center">
      <h1
      className="mb-2 text-4xl font-black italic tracking-tight text-white"
      >ENTRAR NO LOBBY</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}
        className="flex flex-col gap-4 w-full rounded-xl border border-cyan-300/20 bg-slate-900 p-6 text-white shadow-2xl">
        <input 
          type="text" 
          placeholder="Login" 
          value={login} 
          onChange={(e) => setLogin(e.target.value)} 
          required 
          className="rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required 
          className="rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white focus:border-cyan-300 focus:outline-none"  
        />
        <button 
        type="submit" 
        className="rounded-lg bg-yellow-300 py-3 font-black text-slate-950 transition hover:bg-yellow-200 active:scale-95"
        >ENTRAR</button>
      </form>
    </div>
  );
}
