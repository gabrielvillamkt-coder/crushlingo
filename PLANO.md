# Crushlingo — Plano do MVP

Um "Duolingo da paquera": lições curtas para aprender a conversar com crushes (qualquer gênero). MVP só para brincar com amigos.

## 1. Objetivo e critérios de sucesso
- Mandar um link no grupo e qualquer pessoa jogar em menos de 1 minuto, sem cadastro.
- Uma sessão completa (1 lição) dura ~2 min.
- Os amigos riem do feedback e querem sugerir lições.

## 2. Escopo

**Dentro**
- Trilha com 4 unidades × 3 lições (12 lições, ~5 exercícios cada)
- 3 tipos de exercício: escolha da melhor resposta, ordenar palavras, verdadeiro/falso
- XP, 3 corações por lição, streak diário (localStorage)
- Mascote cupido sarcástico que comenta acertos e erros
- Linguagem neutra de gênero ("crush", "a pessoa")
- Tela de compartilhar resultado (texto copiável)

**Fora (pós-MVP)**
- Login, backend, ranking entre amigos
- IA que simula conversa com o crush
- Áudio, notificações, monetização

## 3. Unidades de conteúdo
1. **Quebrando o gelo** — primeira mensagem, reagir a stories, abordagem presencial
2. **Mantendo o papo** — perguntas abertas, humor, não virar entrevista
3. **O convite** — propor o date, lidar com "talvez", escolher o lugar
4. **Zona de perigo** — visto e não respondido, ghosting, mensagem de madrugada, ex

## 4. Mecânica da lição
- Lição = sequência de 5 exercícios
- Resposta tem nota: `otima` (+10 XP), `ok` (+5, sem perder coração), `cringe` (−1 coração), `desastre` (−1 coração + feedback especial)
- 0 corações = lição falha, recomeça
- Concluir lição do dia mantém/incrementa o streak
- Toda resposta mostra feedback curto e engraçado explicando o porquê

## 5. Stack e arquitetura
- Vite + JS/React (ou HTML/JS puro), sem backend
- Conteúdo em `data/lessons.json` (amigos podem contribuir via PR ou mandando texto)
- Estado em localStorage: `{xp, streak, lastDay, completed: [ids]}`
- Deploy: Vercel/Netlify/GitHub Pages
- Mobile-first (todo mundo vai abrir pelo WhatsApp)

```
crushlingo/
├── index.html
├── src/
│   ├── main.js
│   ├── screens/ (home, lesson, result)
│   ├── exercises/ (choice, order, truefalse)
│   ├── state.js        # xp, corações, streak, localStorage
│   └── styles.css
└── data/lessons.json
```

### Esquema do JSON
```json
{
  "unidades": [{
    "id": "u1", "titulo": "Quebrando o gelo",
    "licoes": [{
      "id": "u1-l1", "titulo": "Reagindo a stories",
      "exercicios": [
        {"tipo": "escolha", "situacao": "...", "opcoes": [{"texto": "...", "nota": "otima", "feedback": "..."}]},
        {"tipo": "ordem", "enunciado": "...", "palavras": ["..."], "resposta": ["..."]},
        {"tipo": "vf", "afirmacao": "...", "resposta": false, "feedback": "..."}
      ]
    }]
  }]
}
```

## 6. Telas
1. **Home:** trilha vertical de lições (bloqueadas/liberadas), XP, streak, corações
2. **Lição:** barra de progresso, exercício, botão "Verificar", painel de feedback com o cupido
3. **Resultado:** XP ganho, precisão, frase final do cupido, botão "Compartilhar"

## 7. Cronograma (~1 fim de semana)
| Fase | Tempo | Entrega |
|---|---|---|
| 1. Setup + telas estáticas | 1–2h | Home, lição e resultado navegáveis |
| 2. Motor de lição | 2–3h | 3 tipos de exercício, corações, XP |
| 3. Persistência | 1h | Streak e progresso no localStorage |
| 4. Conteúdo | 3h | 12 lições escritas (com os amigos) |
| 5. Polimento | 1–2h | Animações, sons opcionais, mascote |
| 6. Deploy e teste | 30min | Link no grupo, teste em celular |

## 8. Riscos
- **Conteúdo fraco:** o humor é o produto. Mitigação: sessão de brainstorm com amigos para as opções "desastre".
- **Tom ofensivo/estereotipado:** manter neutro, sem regras do tipo "homens devem / mulheres gostam".
- **Escopo crescendo:** não adicionar IA ou ranking antes de validar que ficou divertido.

## 9. Depois do MVP (se bombar)
1. Ranking/streak entre amigos (backend leve, ex.: Supabase)
2. Modo "chat com crush simulado" usando a API do Claude
3. Lições por contexto (app de namoro, balada, trabalho) e por tom (tímido, direto)
4. Criador de lições para os próprios usuários
