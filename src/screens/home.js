import { load, currentStreak, reset } from '../state.js';

export function renderHome(root, data, nav) {
  const s = load();
  const all = data.unidades.flatMap((u) => u.licoes);
  const nextId = all.find((l) => !s.completed.includes(l.id))?.id;

  root.innerHTML = `
    <header class="topbar">
      <span>🔥 ${currentStreak()}</span>
      <h1>Crushlingo 💘</h1>
      <span>⭐ ${s.xp}</span>
    </header>
    <main class="trail">
      ${data.unidades
        .map(
          (u) => `
        <section>
          <h2 class="unit">${u.titulo}</h2>
          ${u.licoes
            .map((l) => {
              const done = s.completed.includes(l.id);
              const open = done || l.id === nextId;
              return `<button class="node ${done ? 'done' : ''}" data-id="${l.id}" ${open ? '' : 'disabled'}>
                ${done ? '✅' : open ? '▶️' : '🔒'} ${l.titulo}
              </button>`;
            })
            .join('')}
        </section>`
        )
        .join('')}
      <button class="link" id="reset">Zerar progresso</button>
    </main>`;

  root.querySelectorAll('.node').forEach((b) =>
    b.addEventListener('click', () => nav.lesson(all.find((l) => l.id === b.dataset.id)))
  );
  root.querySelector('#reset').addEventListener('click', () => {
    if (confirm('Zerar XP e streak?')) {
      reset();
      nav.home();
    }
  });
}
