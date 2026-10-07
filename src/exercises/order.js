const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);

export function renderOrder(el, ex, onAnswer) {
  const bank = shuffle(ex.palavras.map((w, i) => ({ w, i })));
  const chosen = [];
  let done = false;

  function draw() {
    el.innerHTML = `
      <h2>${ex.enunciado}</h2>
      <div class="answer">${chosen.map((c) => `<button class="chip" data-id="${c.i}" data-from="a">${c.w}</button>`).join('')}</div>
      <div class="bank">${bank.map((c) => `<button class="chip" data-id="${c.i}" data-from="b">${c.w}</button>`).join('')}</div>
      <button class="primary" id="check" ${chosen.length ? '' : 'disabled'}>Verificar</button>`;
    el.querySelectorAll('.chip').forEach((b) =>
      b.addEventListener('click', () => {
        if (done) return;
        const id = +b.dataset.id;
        const [from, to] = b.dataset.from === 'b' ? [bank, chosen] : [chosen, bank];
        to.push(from.splice(from.findIndex((c) => c.i === id), 1)[0]);
        draw();
      })
    );
    el.querySelector('#check').addEventListener('click', () => {
      done = true;
      el.querySelector('#check').disabled = true;
      const ok = chosen.map((c) => c.w).join(' ') === ex.resposta.join(' ');
      onAnswer({
        nota: ok ? 'otima' : 'cringe',
        feedback: ok ? ex.feedback_ok ?? 'Isso! Ordem certa.' : `${ex.feedback_erro ?? 'Quase.'} Certo: "${ex.resposta.join(' ')}"`,
      });
    });
  }
  draw();
}
