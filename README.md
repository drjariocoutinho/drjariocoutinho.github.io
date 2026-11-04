# Site Jario Coutinho | Biomédico Esteta

Landing page do consultório do Jario Coutinho, feita com HTML, CSS e JavaScript puros.

Endereço: https://drjariocoutinho.github.io

## Estrutura

```
site/                  tudo que vai para o ar
  index.html           conteúdo da página
  assets/css/style.css estilos (cores no topo do arquivo, em :root)
  assets/js/main.js    WhatsApp, menu mobile, abas e animações
  assets/img/          fotos e favicon
.github/workflows/
  deploy.yml           publica o site a cada push na main
```

## Como atualizar

1. Edite os arquivos dentro de `site/`
2. Faça commit e push na branch `main`
3. O GitHub Actions publica sozinho em cerca de 1 minuto (acompanhe na aba Actions)

## Onde trocar cada coisa

| O quê | Onde |
| --- | --- |
| Número do WhatsApp e mensagem padrão | `site/assets/js/main.js`, no topo (`WHATSAPP_NUMBER` e `DEFAULT_MESSAGE`) |
| Textos, tratamentos e perguntas frequentes | `site/index.html` |
| Cores | `site/assets/css/style.css`, variáveis em `:root` (tema claro) e no bloco `prefers-color-scheme: dark` (tema escuro) |
| Foto principal | substituir `site/assets/img/jario-recorte.webp` (recorte com fundo transparente, vertical) |
| Foto da seção Sobre | substituir `site/assets/img/jario-consultorio.webp` (vertical, 3:4) |

## Testar no computador

```bash
cd site
python3 -m http.server 8000
```

Depois abra http://localhost:8000

## Pendências para revisar com o Jario

- Textos provisórios: revisar descrições dos tratamentos e respostas das dúvidas
- Número do registro profissional (CRBM) no rodapé
- Endereço do consultório, se ele quiser divulgar
- Fotos definitivas
