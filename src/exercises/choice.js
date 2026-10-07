const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

export function renderChoice(el, ex, onAnswer) {
  const opcoes = shuffle(ex.opcoes);
  el.innerHTML = `
    <h2>${ex.situacao}</h2>
    <div class="options">
      ${opcoes.map((o, i) => `<button class="option" data-i="${i}">${o.texto}</button>`).join('')}
    </div>`;
  const buttons = [...el.querySelectorAll('.option')];
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const o = opcoes[b.dataset.i];
      buttons.forEach((x) => {
        x.disabled = true;
        if (opcoes[x.dataset.i].nota === 'otima') x.classList.add('correct');
      });
      if (o.nota !== 'otima') b.classList.add(o.nota === 'ok' ? 'almost' : 'wrong');
      onAnswer({ nota: o.nota, feedback: o.feedback });
    })
  );
}
