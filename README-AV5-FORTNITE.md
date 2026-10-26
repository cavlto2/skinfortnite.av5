# AV5 — Fortnite Arsenal

A classe escolhida para a AV5 é **SkinFortnite**, com sete atributos de negócio: nome, raridade, tipo, temporada, conjunto, preço em V-Bucks e disponibilidade. O projeto mantém `Pessoa` e o login JWT original. A interface foi remodelada com tema Fortnite (azul, roxo, amarelo, painéis escuros e linguagem de jogo).

## Executar localmente

Pré-requisitos: Git, Python 3.12+, `uv`, Node.js LTS e npm.

### 1. Backend — terminal 1
```powershell
cd back-python
uv sync
uv run flask --app src/app run --debug
```
Abra uma vez `http://127.0.0.1:5000/criar_banco` para criar as tabelas e o usuário inicial. Login: `admin`; senha: `admin123`. O backend fica em `http://127.0.0.1:5000`.

### 2. Frontend — terminal 2
```powershell
cd front-react-next
Copy-Item .env.local.example .env.local
npm ci
npm run dev
```
No Prompt de Comando (cmd), use `copy .env.local.example .env.local` no lugar de `Copy-Item`. Acesse `http://localhost:3000`.

### 3. Testar
1. Entre em `http://localhost:3000/form_login` com `admin` / `admin123`.
2. Acesse `http://localhost:3000/skins_fortnite`.
3. Cadastre uma skin e confira a listagem na mesma página.
4. A listagem `GET /skins-fortnite` é pública; a inclusão `POST /skin-fortnite` exige token JWT.

## Prints obrigatórios

Com o navegador maximizado, capture telas reais com `Win + Shift + S` e salve os PNGs na pasta `prints/` da raiz do repositório. Sugestões: `01-home.png`, `02-login.png`, `03-cadastro-skin.png` (formulário preenchido e confirmação) e `04-listagem-skins.png` (skin visível na lista). A pasta já existe; os prints devem ser feitos após executar o sistema, não são imagens simuladas.

## Folha caprichada — comandos Git

### PARTE 1 — enviar o projeto ao repositório (clonagem até push)
Substitua `URL_DO_SEU_REPOSITORIO` pela URL real do repositório da dupla.
```bash
git clone URL_DO_SEU_REPOSITORIO
cd NOME_DA_PASTA
git status
git branch --show-current
git add .
git commit -m "Implementa AV5 Fortnite Arsenal"
git push origin main
```
Se a branch não for `main`, use o nome mostrado por `git branch --show-current`. Se o projeto já estiver clonado, não execute `git clone` novamente; confirme o remoto com `git remote -v`.

### PARTE 2 — baixar e executar em outra máquina
```bash
git clone URL_DO_SEU_REPOSITORIO
cd NOME_DA_PASTA
```
Terminal 1 — backend:
```bash
cd back-python
uv sync
uv run flask --app src/app run --debug
```
Abra `http://127.0.0.1:5000/criar_banco` uma vez.

Terminal 2 — frontend, a partir da raiz do projeto:
```bash
cd front-react-next
```
Copie `.env.local.example` para `.env.local`, depois execute:
```bash
npm ci
npm run dev
```
Abra `http://localhost:3000`.


## Escopo Fortnite
O sistema foi simplificado para ter como funcionalidade de domínio apenas o cadastro e a listagem de skins de Fortnite. As rotas e telas de Casa, Carro e CRUD de Pessoa foram removidas. O modelo e serviço Pessoa foram mantidos exclusivamente para autenticação e geração do JWT, pois o login admin/admin123 depende deles.
