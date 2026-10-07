import { completeLesson } from '../state.js';

export function renderResult(root, { lesson, failed, xp, hits, total }, nav) {
  if (!failed) completeLesson(lesson.id, xp);
  const pct = Math.round((hits / total) * 100);
  const msg = failed
    ? 'Seu crush deu block. Tenta de novo! 💔'
    : pct === 100
    ? 'Perfeito. Pode marcar o date. 😎'
    : 'Tem potencial. Ainda dá match. 💘';
  const share = `Fiz a lição "${lesson.titulo}" no Crushlingo: ${pct}% e +${xp} XP 💘`;

  root.innerHTML = `
    <main class="result">
      <h1>${failed ? 'Sem corações 💔' : 'Lição concluída! 🎉'}</h1>
      <p class="big">${failed ? '' : `+${xp} XP`}</p>
      <p>Precisão: ${pct}%</p>
      <p class="cupid">💘 ${msg}</p>
      ${failed ? '' : '<button class="secondary" id="share">Compartilhar resultado</button>'}
      <button class="primary" id="home">Voltar à trilha</button>
    </main>`;
  root.querySelector('#home').addEventListener('click', nav.home);
  root.querySelector('#share')?.addEventListener('click', async (e) => {
    try {
      if (navigator.share) {
        await navigator.share({ text: share });
      } else {
        await navigator.clipboard.writeText(share);
        e.target.textContent = 'Copiado! ✅';
      }
    } catch (err) {
      if (err.name !== 'AbortError') prompt('Copie:', share);
    }
  });
}
