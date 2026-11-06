/* Transformação não destrutiva: preserva textos, links e ordem das tabelas. */
document.addEventListener('DOMContentLoaded', () => {
  const jogos = document.querySelector('.Jogos');
  if (!jogos) return;
  const titulos = Array.from(jogos.querySelectorAll(':scope > .week-title'));
  if (!titulos.length) return;
  const nav = document.createElement('div');
  nav.className = 'weeks-nav';
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-label', 'Selecione a semana da NFL');
  titulos[0].before(nav);
  const paineis = [];
  titulos.forEach((titulo, indice) => {
    const tabela = titulo.nextElementSibling;
    if (!tabela || tabela.tagName !== 'TABLE') return;
    const painel = document.createElement('div');
    painel.className = 'week-panel';
    painel.id = `nfl-week-panel-${indice + 1}`;
    painel.setAttribute('role', 'tabpanel');
    titulo.id = `nfl-week-tab-${indice + 1}`;
    titulo.setAttribute('role', 'tab');
    titulo.setAttribute('tabindex', '-1');
    titulo.setAttribute('aria-controls', painel.id);
    painel.setAttribute('aria-labelledby', titulo.id);
    tabela.before(painel);
    painel.appendChild(tabela);
    nav.appendChild(titulo);
    paineis.push({ titulo, painel });
  });
  // As quebras de linha que separavam tabelas não são necessárias.
  Array.from(jogos.children).forEach(el => {
    if (el.tagName === 'BR') el.remove();
  });
  const selecionar = indice => {
    paineis.forEach(({titulo, painel}, i) => {
      const ativa = i === indice;
      titulo.classList.toggle('is-active', ativa);
      titulo.setAttribute('aria-selected', String(ativa));
      titulo.tabIndex = ativa ? 0 : -1;
      painel.hidden = !ativa;
    });
  };
  paineis.forEach(({titulo}, i) => {
    titulo.addEventListener('click', () => selecionar(i));
    titulo.addEventListener('keydown', event => {
      let proximo = i;
      if (event.key === 'ArrowRight') proximo = (i + 1) % paineis.length;
      else if (event.key === 'ArrowLeft') proximo = (i - 1 + paineis.length) % paineis.length;
      else if (event.key === 'Home') proximo = 0;
      else if (event.key === 'End') proximo = paineis.length - 1;
      else if (event.key === 'Enter' || event.key === ' ') {event.preventDefault();selecionar(i);return;}
      else return;
      event.preventDefault(); selecionar(proximo); paineis[proximo].titulo.focus();
    });
  });
  selecionar(0);
});
