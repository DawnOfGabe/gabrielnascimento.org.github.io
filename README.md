# Site Currículo Interativo - Gabriel Nascimento

Este projeto é um currículo interativo e moderno desenvolvido com HTML5, CSS3 e JavaScript puro. Ele apresenta uma navegação estilo "acordeão" horizontal, seções detalhada sobre carreira, habilidades, certificações e um visualizador de currículo em PDF/SVG.

## 🚀 Como Hospedar no GitHub Pages

O GitHub Pages é uma maneira gratuita e fácil de hospedar sites estáticos diretamente do seu repositório GitHub. Siga os passos abaixo:

### 1. Criar o Repositório
1. Acesse o [GitHub](https://github.com) e faça login.
2. Crie um **novo repositório** (ex: `site-curriculo`).
3. Não precisa marcar "Initialize with README" pois você já tem este arquivo, mas se marcar não tem problema.

### 2. Subir os Arquivos
Você pode fazer isso via terminal (Git) ou upload manual.

**Via Terminal (Recomendado):**
```bash
# Inicialize o git na pasta do projeto (se já não estiver)
git init

# Adicione os arquivos
git add .

# Faça o primeiro commit
git commit -m "Meu Site Currículo Finalizado"

# Conecte ao seu repositório remoto (troque USUARIO e REPOSITORIO pelos seus)
git remote add origin https://github.com/USUARIO/REPOSITORIO.git

# Envie para o GitHub
git push -u origin main
```

**Via Upload Manual:**
1. No seu repositório no GitHub, clique em **Add file** > **Upload files**.
2. Arraste todos os arquivos e pastas (`index.html`, `style.css`, `script.js`, pasta `public`, etc.) para a área de upload.
3. Escreva uma mensagem de commit e clique em **Commit changes**.

### 3. Ativar o GitHub Pages
1. No seu repositório no GitHub, vá em **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` (ou `master`) e a pasta `/ (root)`.
5. Clique em **Save**.

🎉 **Pronto!** Em alguns instantes, o GitHub gerará um link (ex: `https://seu-usuario.github.io/seu-repositorio/`) onde seu site estará acessível para o mundo todo.

## 🛠 Estrutura do Projeto

*   **index.html**: Estrutura principal e conteúdo do site.
*   **style.css**: Estilização completa, animações e responsividade.
*   **script.js**: Lógica das abas, modais, carrossel e interatividade.
*   **public/**: Pasta contendo imagens, ícones e arquivos PDF do currículo.

---
*Desenvolvido por Gabriel Nascimento*
