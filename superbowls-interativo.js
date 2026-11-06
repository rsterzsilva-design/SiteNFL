/*
 * Filtro e modal de detalhes dos Super Bowls.
 * Não substitui nem recria seus cards. Só lê data-sb-edicao e esconde/mostra.
 * Coloque este arquivo DEPOIS de dados-superbowls.js e use defer.
 */
(() => {
  'use strict';

  const raiz = document.getElementById('super-bowls');
  if (!raiz) {
    console.warn('[Super Bowls] Coloque id="super-bowls" na seção existente.');
    return;
  }

  const dados = window.NFL_SUPERBOWLS;
  if (!Array.isArray(dados) || dados.length !== 60) {
    console.error('[Super Bowls] Carregue dados-superbowls.js antes deste arquivo.');
    return;
  }

  const cards = Array.from(raiz.querySelectorAll('[data-sb-edicao]'));
  if (!cards.length) {
    console.warn('[Super Bowls] Nenhum card possui data-sb-edicao="1" ... "60".');
    return;
  }
  const dadosPorNumero = new Map(dados.map(jogo => [jogo.numero, jogo]));
  const cardsValidos = cards.map(card => ({ card, jogo: dadosPorNumero.get(Number(card.dataset.sbEdicao)) }))
    .filter(item => item.jogo);
  const formatoNumero = new Intl.NumberFormat('pt-BR');

  const normalizar = texto => String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  function nomesAlternativos(nome) {
    const base = normalizar(nome);
    if (base.includes('raiders')) return 'las vegas raiders oakland raiders los angeles raiders';
    if (base.includes('rams')) return 'los angeles rams st louis rams';
    if (base.includes('washington')) return 'washington redskins washington commanders washington football team';
    if (base.includes('colts')) return 'baltimore colts indianapolis colts';
    if (base.includes('chargers')) return 'san diego chargers los angeles chargers';
    return '';
  }

  // Número/romano isolado = busca EXATA por edição; evita "I" retornar todas as edições.
  function corresponde(jogo, texto) {
    const consulta = normalizar(texto).replace(/^(super\s*bowl|sb|edicao)\s*/, '').trim();
    if (!consulta) return true;
    if (/^\d+$/.test(consulta)) {
      return Number(consulta) === jogo.numero || Number(consulta) === jogo.ano;
    }
    if (/^[ivxlcdm]+$/.test(consulta)) {
      return consulta.toUpperCase() === jogo.romano;
    }

    const pesquisavel = normalizar([
      jogo.campeao, jogo.vice, jogo.ano, jogo.numero, jogo.romano,
      nomesAlternativos(jogo.campeao), nomesAlternativos(jogo.vice)
    ].join(' '));
    return consulta.split(/\s+/).every(palavra => pesquisavel.includes(palavra));
  }

  const toolbar = document.createElement('div');
  toolbar.className = 'sb-filtro';
  toolbar.innerHTML = `
    <div class="sb-filtro__cabecalho">
      <div>
        <label class="sb-filtro__titulo" for="sb-pesquisa">Encontre um Super Bowl</label>
        <p class="sb-filtro__ajuda">Busque por edição (11 ou XI), ano (1977) ou franquia (Raiders).</p>
      </div>
      <span class="sb-filtro__contador" aria-live="polite"></span>
    </div>
    <div class="sb-filtro__linha">
      <span class="sb-filtro__icone" aria-hidden="true">⌕</span>
      <input id="sb-pesquisa" class="sb-filtro__campo" type="search"
             autocomplete="off" spellcheck="false"
             placeholder="Ex.: LI, 2017, Patriots, Falcons..." />
      <button type="button" class="sb-filtro__limpar" title="Limpar busca">Limpar</button>
    </div>
    <p class="sb-filtro__vazio" role="status" hidden>Nenhuma edição encontrada. Experimente outro número, ano ou equipe.</p>
  `;

  // A barra de pesquisa ocupa a largura da grade já existente; não recriamos cards.
  const primeiroCard = cardsValidos[0]?.card;
  if (!primeiroCard) return;
  primeiroCard.insertAdjacentElement('beforebegin', toolbar);

  const pesquisa = toolbar.querySelector('#sb-pesquisa');
  const limpar = toolbar.querySelector('.sb-filtro__limpar');
  const contador = toolbar.querySelector('.sb-filtro__contador');
  const vazio = toolbar.querySelector('.sb-filtro__vazio');

  function atualizarBusca() {
    let encontrados = 0;
    for (const {card, jogo} of cardsValidos) {
      const aparece = corresponde(jogo, pesquisa.value);
      card.hidden = !aparece;
      if (aparece) encontrados++;
    }
    contador.textContent = `${encontrados} de ${cardsValidos.length} edições`;
    vazio.hidden = encontrados > 0;
    limpar.hidden = !pesquisa.value;
  }
  pesquisa.addEventListener('input', atualizarBusca);
  pesquisa.addEventListener('search', atualizarBusca);
  limpar.addEventListener('click', () => {
    pesquisa.value = '';
    atualizarBusca();
    pesquisa.focus();
  });

  const dialogo = document.createElement('dialog');
  dialogo.className = 'sb-detalhes';
  dialogo.setAttribute('aria-labelledby', 'sb-detalhes-titulo');
  dialogo.innerHTML = `
    <div class="sb-detalhes__moldura">
      <button class="sb-detalhes__fechar" type="button" aria-label="Fechar detalhes">×</button>
      <div class="sb-detalhes__conteudo"></div>
    </div>
  `;
  raiz.appendChild(dialogo);

  const escapeHTML = valor => String(valor ?? '').replace(/[&<>"']/g, caractere => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[caractere]));

  function dataFormatada(iso) {
    const [ano, mes, dia] = iso.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  function quadroQuartos(jogo) {
    const cabecalhos = jogo.quartos.map((_, indice) => indice === 4 ? 'PR' : `${indice + 1}º`);
    const linha = (time, coluna, classe) => `
      <tr class="${classe}">
        <th scope="row">${escapeHTML(time)}</th>
        ${jogo.quartos.map(par => `<td>${par[coluna]}</td>`).join('')}
        <td class="sb-detalhes__total">${coluna === 0 ? jogo.pontosCampeao : jogo.pontosVice}</td>
      </tr>`;
    return `
      <div class="sb-detalhes__tabela-rolagem">
        <table class="sb-detalhes__tabela">
          <caption>Pontos marcados em cada quarto${jogo.quartos.length === 5 ? ' e na prorrogação' : ''}</caption>
          <thead><tr><th scope="col">Equipe</th>${cabecalhos.map(q => `<th scope="col">${q}</th>`).join('')}<th scope="col">Total</th></tr></thead>
          <tbody>
            ${linha(jogo.campeao, 0, 'sb-detalhes__vencedor')}
            ${linha(jogo.vice, 1, '')}
          </tbody>
        </table>
      </div>
    `;
  }

  function dadosDeJogoHTML(jogo) {
    const placar = `${jogo.pontosCampeao} × ${jogo.pontosVice}`;
    return `
      <header class="sb-detalhes__topo">
        <span class="sb-detalhes__etiqueta">${jogo.ano} · Edição ${jogo.numero}</span>
        <h2 id="sb-detalhes-titulo">${escapeHTML(jogo.nomeExibicao)}</h2>
        <div class="sb-detalhes__confronto">
          <div class="sb-detalhes__equipe"><small>CAMPEÃO</small><strong>${escapeHTML(jogo.campeao)}</strong></div>
          <span class="sb-detalhes__placar">${placar}</span>
          <div class="sb-detalhes__equipe"><small>VICE-CAMPEÃO</small><strong>${escapeHTML(jogo.vice)}</strong></div>
        </div>
      </header>
      <div class="sb-detalhes__corpo">
        <section class="sb-detalhes__secao" aria-label="Resumo da partida">
          <h3>Como foi o jogo</h3>
          <p>${escapeHTML(jogo.resumo)}</p>
        </section>
        <section class="sb-detalhes__secao" aria-label="Pontuação por período">
          <h3>Placar por quarto</h3>
          ${quadroQuartos(jogo)}
        </section>
        <section class="sb-detalhes__secao" aria-label="Ficha técnica">
          <h3>Ficha técnica</h3>
          <dl class="sb-detalhes__ficha">
            <div><dt>Data</dt><dd>${dataFormatada(jogo.data)}</dd></div>
            <div><dt>Estádio</dt><dd>${escapeHTML(jogo.estadio)}</dd></div>
            <div><dt>Público presente</dt><dd>${formatoNumero.format(jogo.publico)} pessoas</dd></div>
            <div><dt>MVP da partida</dt><dd>${escapeHTML(jogo.mvp)}</dd></div>
            <div class="sb-detalhes__item-largo"><dt>Show do intervalo</dt><dd>${escapeHTML(jogo.show)}</dd></div>
          </dl>
        </section>
        <a class="sb-detalhes__fonte" href="${escapeHTML(jogo.fonte)}" target="_blank" rel="noopener noreferrer">Consultar histórico da edição ↗</a>
      </div>
    `;
  }

  let focoAnterior = null;
  function abrirDetalhes(jogo) {
    focoAnterior = document.activeElement;
    dialogo.querySelector('.sb-detalhes__conteudo').innerHTML = dadosDeJogoHTML(jogo);
    if (!dialogo.open) dialogo.showModal();
    dialogo.querySelector('.sb-detalhes__fechar').focus();
  }

  dialogo.querySelector('.sb-detalhes__fechar').addEventListener('click', () => dialogo.close());
  dialogo.addEventListener('click', evento => {
    // Fora do conteúdo branco, fechar pela área escurecida.
    if (evento.target === dialogo) dialogo.close();
  });
  dialogo.addEventListener('close', () => {
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus();
  });

  for (const {card, jogo} of cardsValidos) {
    if (!/^(A|BUTTON)$/i.test(card.tagName)) {
      card.setAttribute('role', 'button');
      if (!card.hasAttribute('tabindex')) card.tabIndex = 0;
    }
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Abrir detalhes do ${jogo.nomeExibicao}, ${jogo.ano}`);
    card.addEventListener('click', evento => {
      // Cards com <a href> no interior passam a abrir o modal, não navegam.
      if (evento.target.closest('a')) evento.preventDefault();
      abrirDetalhes(jogo);
    });
    card.addEventListener('keydown', evento => {
      if (evento.target !== card) return;
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        abrirDetalhes(jogo);
      }
    });
  }

  atualizarBusca();
})();
