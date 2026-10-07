import { renderChoice } from '../exercises/choice.js';
import { renderOrder } from '../exercises/order.js';
import { renderTrueFalse } from '../exercises/truefalse.js';

const renderers = { escolha: renderChoice, ordem: renderOrder, vf: renderTrueFalse };
const XP = { otima: 10, ok: 5, cringe: 0, desastre: 0 };
const EMOJI = { otima: '😍', ok: '🙂', cringe: '😬', desastre: '💀' };
const MAX_HEARTS = 3;

export function renderLesson(root, lesson, nav) {
  let i = 0;
  let hearts = MAX_HEARTS;
  let xp = 0;
  let hits = 0;

  function step() {
    const ex = lesson.exercicios[i];
    root.innerHTML = `
      <header class="topbar">
        <button class="link" id="quit">✕</button>
        <div class="bar"><div style="width:${(i / lesson.exercicios.length) * 100}%"></div></div>
        <span>${'❤️'.repeat(hearts)}${'🖤'.repeat(MAX_HEARTS - hearts)}</span>
      </header>
      <main class="lesson"><div id="ex"></div><div id="fb"></div></main>`;
    root.querySelector('#quit').addEventListener('click', nav.home);
    renderers[ex.tipo](root.querySelector('#ex'), ex, (r) => answered(r));
  }

  function answered({ nota, feedback }) {
    xp += XP[nota];
    if (nota === 'otima' || nota === 'ok') hits++;
    else hearts--;
    const bad = nota === 'cringe' || nota === 'desastre';
    const last = i === lesson.exercicios.length - 1;
    const dead = hearts <= 0;
    root.querySelector('#fb').innerHTML = `
      <div class="feedback ${bad ? 'bad' : 'good'}">
        <p>💘 ${EMOJI[nota]} ${feedback}</p>
        <button class="primary" id="next">${dead ? 'Fim de jogo' : last ? 'Concluir' : 'Continuar'}</button>
      </div>`;
    root.querySelector('#next').addEventListener('click', () => {
      if (dead) return nav.result({ lesson, failed: true, xp: 0, hits, total: lesson.exercicios.length });
      if (last) return nav.result({ lesson, failed: false, xp, hits, total: lesson.exercicios.length });
      i++;
      step();
    });
  }

  step();
}
