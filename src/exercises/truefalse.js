export function renderTrueFalse(el, ex, onAnswer) {
  el.innerHTML = `
    <h2>${ex.afirmacao}</h2>
    <div class="options">
      <button class="option" data-v="true">Verdadeiro</button>
      <button class="option" data-v="false">Falso</button>
    </div>`;
  const buttons = [...el.querySelectorAll('.option')];
  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const ok = (b.dataset.v === 'true') === ex.resposta;
      buttons.forEach((x) => {
        x.disabled = true;
        if ((x.dataset.v === 'true') === ex.resposta) x.classList.add('correct');
      });
      if (!ok) b.classList.add('wrong');
      onAnswer({ nota: ok ? 'otima' : 'cringe', feedback: ex.feedback });
    })
  );
}
