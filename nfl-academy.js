/* Não altera variáveis globais e não acessa outras seções. */
(() => {
  'use strict';
  const root = document.getElementById('nfl-guide');
  if (!root || root.dataset.guideReady === 'true') return;
  root.dataset.guideReady = 'true';
  const tabs = [...root.querySelectorAll('[data-guide-tab]')];
  const panels = [...root.querySelectorAll('[data-guide-panel]')];
  function selectTab(tab, focus = false) {
    tabs.forEach(t => {
      const active = t === tab;
      t.classList.toggle('is-active', active);
      t.setAttribute('aria-selected', String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach(p => { p.hidden = p.dataset.guidePanel !== tab.dataset.guideTab; });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', e => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
      e.preventDefault();
      const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length-1 : (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      selectTab(tabs[next], true);
    });
  });
  const descriptions = {
    td: '<strong>Touchdown:</strong> acontece quando a equipe marca na end zone adversária. Depois, há a oportunidade de tentar pontos adicionais.',
    fg: '<strong>Field Goal:</strong> um chute bem-sucedido entre as traves durante uma jogada vale 3 pontos.',
    safety: '<strong>Safety:</strong> ocorre quando um jogador de ataque com posse da bola é derrubado ou comete certas infrações na própria end zone; vale 2 pontos para o adversário.',
    xp: '<strong>Extra Point:</strong> após um touchdown, o chute de ponto extra bem-sucedido vale 1 ponto.',
    two: '<strong>Conversão de dois pontos:</strong> após um touchdown, a equipe pode tentar entrar novamente na end zone em uma jogada, valendo 2 pontos.'
  };
  const scores = [...root.querySelectorAll('[data-guide-score]')];
  const explanation = root.querySelector('#nfl-guide-score-explanation');
  scores.forEach(btn => btn.addEventListener('click', () => {
    scores.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    explanation.innerHTML = descriptions[btn.dataset.guideScore];
  }));
})();
