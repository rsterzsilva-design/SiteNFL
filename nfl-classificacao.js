(() => {
  'use strict';

  const raiz = document.getElementById('nfl-classificacao');
  if (!raiz || raiz.dataset.nflInicializado === '1') return;
  raiz.dataset.nflInicializado = '1';

  const TEMPORADA = 2026; // A temporada 2026/27 é identificada como 2026 na API.
  // A variante type=by-division pode gerar HTTP 400. Consulte a tabela geral e agrupe localmente.
  const APIS = [
    `https://site.api.espn.com/apis/v2/sports/football/nfl/standings?season=${TEMPORADA}`,
    `https://cdn.espn.com/core/nfl/standings?xhr=1&season=${TEMPORADA}`
  ];
  const INTERVALO = 5 * 60 * 1000; // Consulta a cada 5 minutos com a página aberta.
  const CACHE = `nfl-standings-${TEMPORADA}-v4`;
  // O desempate completo usa a ordem divisional publicada pela ESPN; não é inferido só de V/D/E.
  const grid = raiz.querySelector('#nfl-standings-grid');
  const status = raiz.querySelector('#nfl-standings-status');
  const atualizar = raiz.querySelector('#nfl-standings-atualizar');
  const botoes = [...raiz.querySelectorAll('[data-nfl-conferencia]')];
  let conferencia = 'ALL';
  let carregando = false;
  let ultimaConsulta = 0;
  let dados = null;
  let ordemFonte = {};
  let ordemValida = {};

  // Siglas da ESPN e divisões fixas, evitando mudanças de agrupamento no retorno da API.
  const DIVISOES = [
    { nome:'AFC Leste', conf:'AFC', times:['BUF','MIA','NE','NYJ'] },
    { nome:'AFC Norte', conf:'AFC', times:['BAL','CIN','CLE','PIT'] },
    { nome:'AFC Sul', conf:'AFC', times:['HOU','IND','JAX','TEN'] },
    { nome:'AFC Oeste', conf:'AFC', times:['DEN','KC','LAC','LV'] },
    { nome:'NFC Leste', conf:'NFC', times:['DAL','NYG','PHI','WSH'] },
    { nome:'NFC Norte', conf:'NFC', times:['CHI','DET','GB','MIN'] },
    { nome:'NFC Sul', conf:'NFC', times:['ATL','CAR','NO','TB'] },
    { nome:'NFC Oeste', conf:'NFC', times:['ARI','LA','SF','SEA'] }
  ];
  const TIMES = {
    ARI:['Arizona Cardinals','ari'], ATL:['Atlanta Falcons','atl'], BAL:['Baltimore Ravens','bal'],
    BUF:['Buffalo Bills','buf'], CAR:['Carolina Panthers','car'], CHI:['Chicago Bears','chi'],
    CIN:['Cincinnati Bengals','cin'], CLE:['Cleveland Browns','cle'], DAL:['Dallas Cowboys','dal'],
    DEN:['Denver Broncos','den'], DET:['Detroit Lions','det'], GB:['Green Bay Packers','gb'],
    HOU:['Houston Texans','hou'], IND:['Indianapolis Colts','ind'], JAX:['Jacksonville Jaguars','jax'],
    KC:['Kansas City Chiefs','kc'], LAC:['Los Angeles Chargers','lac'], LA:['Los Angeles Rams','lar'],
    LV:['Las Vegas Raiders','lv'], MIA:['Miami Dolphins','mia'], MIN:['Minnesota Vikings','min'],
    NE:['New England Patriots','ne'], NO:['New Orleans Saints','no'], NYG:['New York Giants','nyg'],
    NYJ:['New York Jets','nyj'], PHI:['Philadelphia Eagles','phi'], PIT:['Pittsburgh Steelers','pit'],
    SEA:['Seattle Seahawks','sea'], SF:['San Francisco 49ers','sf'], TB:['Tampa Bay Buccaneers','tb'],
    TEN:['Tennessee Titans','ten'], WSH:['Washington Commanders','wsh']
  };
  const ALIASES = { JAC:'JAX', LAR:'LA', STL:'LA', OAK:'LV', SD:'LAC', WAS:'WSH', WSH:'WSH', ARZ:'ARI' };

  function numeroStat(stats, nome) {
    const alias = {wins:['wins','w'],losses:['losses','l'],ties:['ties','t']};
    const stat = stats.find(s => [s.name,s.abbreviation,s.displayName].some(v => alias[nome]?.includes(String(v || '').toLowerCase())));
    if (!stat) return null;
    const n = Number(stat.value ?? stat.displayValue);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  function percentual(t) {
    const jogos = t.v + t.d + t.e;
    return jogos ? (t.v + t.e / 2) / jogos : 0;
  }

  function siglaEquipe(entry) {
    const raw = String(entry?.team?.abbreviation || '').toUpperCase();
    return ALIASES[raw] || raw;
  }

  function extrair(json) {
    const mapa = new Map();
    const sequencias = [];
    const visitados = new WeakSet();
    function visitar(obj) {
      if (!obj || typeof obj !== 'object' || visitados.has(obj)) return;
      visitados.add(obj);
      // A ESPN normalmente coloca os registros em standings.entries.
      // Também aceitamos entries diretamente para tolerar mudanças de formato.
      const entradas = Array.isArray(obj.standings?.entries)
        ? obj.standings.entries
        : (Array.isArray(obj.entries) ? obj.entries : null);
      if (entradas) {
        const seq = [];
        for (const entry of entradas) {
          const sigla = siglaEquipe(entry);
          if (!TIMES[sigla] || !Array.isArray(entry.stats)) continue;
          const v = numeroStat(entry.stats, 'wins');
          const d = numeroStat(entry.stats, 'losses');
          const e = numeroStat(entry.stats, 'ties');
          if (![v,d,e].every(Number.isFinite)) continue;
          mapa.set(sigla, {v,d,e});
          seq.push(sigla);
        }
        if (seq.length) sequencias.push(seq);
      }
      if (Array.isArray(obj)) obj.forEach(visitar);
      else Object.values(obj).forEach(visitar);
    }
    visitar(json);
    if (mapa.size !== 32) throw new Error(`A fonte retornou apenas ${mapa.size} de 32 equipes.`);

    // Só aceita como classificação divisional uma lista da fonte com as quatro
    // equipes exatas da divisão. Não aproveita índices de listas gerais da liga.
    const ordem = {};
    const confiavel = {};
    for (const div of DIVISOES) {
      const candidata = sequencias.find(seq =>
        seq.length === 4 && new Set(seq).size === 4 &&
        div.times.every(sigla => seq.includes(sigla))
      );
      if (!candidata) continue;
      // Uma tabela precisa respeitar a campanha geral antes do desempate.
      // Se houver inconsistência na fonte, não declarar o ranking confiável.
      const coerente = candidata.every((sigla, i) =>
        i === 0 || percentual(mapa.get(candidata[i - 1])) >= percentual(mapa.get(sigla)) - 1e-9
      );
      if (coerente) {
        candidata.forEach((sigla, i) => { ordem[sigla] = i; });
        confiavel[div.nome] = true;
      }
    }
    return { dados:Object.fromEntries(mapa), ordem, confiavel };
  }

  function ordenar(a,b) {
    const x = dados?.[a], y = dados?.[b];
    if (!x || !y) return TIMES[a][0].localeCompare(TIMES[b][0], 'pt-BR');
    const pct = percentual(y) - percentual(x);
    if (Math.abs(pct) > 1e-9) return pct;
    // A ordem publicada pela ESPN incorpora confrontos diretos e demais
    // desempates. A API de standings não expõe dados para recalculá-los.
    if (Number.isInteger(ordemFonte[a]) && Number.isInteger(ordemFonte[b])) {
      return ordemFonte[a] - ordemFonte[b];
    }
    // Sem ordem oficial verificável, nunca inventar um desempate com saldo
    // de pontos, ordem alfabética ou menor número bruto de derrotas.
    return 0; // sort estável preserva a ordem original; marcamos empate não resolvido.
  }

  function elemento(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  function renderizar() {
    const fragmento = document.createDocumentFragment();
    for (const div of DIVISOES.filter(d => conferencia === 'ALL' || d.conf === conferencia)) {
      const card = elemento('article','nfl-standings__card');
      const cabecalho = elemento('div','nfl-standings__cabecalho');
      cabecalho.append(elemento('h3','nfl-standings__divisao',div.nome), elemento('span','nfl-standings__sigla',div.conf));
      const tabela = elemento('table','nfl-standings__tabela');
      tabela.setAttribute('aria-label',`Classificação da divisão ${div.nome}`);
      const thead = document.createElement('thead');
      const trHead = document.createElement('tr');
      [['#','nfl-standings__pos'],['Equipe','nfl-standings__time-col'],['V','nfl-standings__num'],['D','nfl-standings__num'],['E','nfl-standings__num']].forEach(([texto,classe]) => {
        const th = elemento('th', classe, texto); th.scope = 'col'; trHead.append(th);
      });
      thead.append(trHead);
      const tbody = document.createElement('tbody');
      const ordenados = [...div.times].sort(ordenar);
      for (const [pos, sigla] of ordenados.entries()) {
        const tr = document.createElement('tr');
        const posicao = elemento('td','nfl-standings__pos',String(pos+1));
        const empatePendente = !ordemValida[div.nome] && dados?.[sigla] && ordenados.some(outro => outro !== sigla && dados?.[outro] && Math.abs(percentual(dados[outro]) - percentual(dados[sigla])) < 1e-9);
        if (empatePendente) {
          posicao.textContent = '=';
          tr.title = 'Campanha empatada: a fonte não disponibilizou ordem divisional validada para aplicar o desempate.';
        }
        const equipe = elemento('td');
        const bloco = elemento('div','nfl-standings__time');
        const img = elemento('img','nfl-standings__escudo');
        img.src = `https://a.espncdn.com/i/teamlogos/nfl/500/${TIMES[sigla][1]}.png`;
        img.alt = ''; img.loading = 'lazy'; img.width = 35; img.height = 35;
        bloco.append(img, elemento('span','nfl-standings__nome',TIMES[sigla][0]));
        equipe.append(bloco);
        const recorde = dados?.[sigla];
        tr.append(posicao, equipe,
          elemento('td','nfl-standings__v',recorde ? String(recorde.v) : '—'),
          elemento('td','nfl-standings__d',recorde ? String(recorde.d) : '—'),
          elemento('td','',recorde ? String(recorde.e) : '—'));
        tbody.append(tr);
      }
      tabela.append(thead,tbody); card.append(cabecalho,tabela); fragmento.append(card);
    }
    grid.replaceChildren(fragmento);
    grid.setAttribute('aria-busy','false');
  }

  function dataHora(date) {
    return date.toLocaleString('pt-BR', {dateStyle:'short',timeStyle:'short'});
  }

  async function carregar() {
    if (carregando) return;
    carregando = true;
    atualizar.disabled = true;
    status.textContent = 'Consultando classificação...';
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let novosDados = null;
      const falhas = [];
      try {
        for (const url of APIS) {
          try {
            const resposta = await fetch(url, {signal:controller.signal, cache:'no-store'});
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            const json = await resposta.json();
            // A temporada retornada precisa corresponder ao ano solicitado.
            const anoInformado = json?.season?.year ?? json?.seasonYear ?? json?.season?.season;
            if (anoInformado != null && Number(anoInformado) !== TEMPORADA) {
              throw new Error(`Temporada inesperada: ${anoInformado}`);
            }
            novosDados = extrair(json);
            break;
          } catch (falha) {
            if (controller.signal.aborted) throw falha;
            falhas.push(`${new URL(url).hostname}: ${falha.message}`);
          }
        }
      } finally { clearTimeout(timeout); }
      if (!novosDados) throw new Error(`Fontes indisponíveis: ${falhas.join(' | ')}`);
      dados = novosDados.dados;
      ordemFonte = novosDados.ordem;
      ordemValida = novosDados.confiavel;
      const atualizadoEm = Date.now();
      ultimaConsulta = atualizadoEm;
      try { localStorage.setItem(CACHE,JSON.stringify({dados, ordemFonte, ordemValida, atualizadoEm})); } catch (_) { /* cache opcional */ }
      const divisorias = Object.keys(ordemValida).length;
      status.textContent = `Atualizado em ${dataHora(new Date(atualizadoEm))} • Ordem divisional da fonte: ${divisorias}/8 divisões`;
    } catch (erro) {
      console.warn('[NFL Classificação] Falha ao consultar a ESPN:',erro);
      status.textContent = dados
        ? 'Sem conexão com a fonte. Exibindo a última classificação salva (pode estar desatualizada).'
        : 'Classificação indisponível no momento. Tente atualizar novamente.';
    } finally {
      carregando = false;
      atualizar.disabled = false;
      renderizar();
    }
  }

  try {
    const cache = JSON.parse(localStorage.getItem(CACHE) || 'null');
    if (cache?.dados && Object.keys(cache.dados).length === 32) {
      dados = cache.dados;
      ordemFonte = cache.ordemFonte || {};
      ordemValida = cache.ordemValida || {};
      ultimaConsulta = Number(cache.atualizadoEm) || 0;
      status.textContent = `Último registro: ${dataHora(new Date(ultimaConsulta))} (salvo no navegador)`;
    }
  } catch (_) { /* cache indisponível */ }

  botoes.forEach(botao => botao.addEventListener('click',() => {
    conferencia = botao.dataset.nflConferencia;
    botoes.forEach(b => {
      const ativo = b === botao;
      b.classList.toggle('is-active',ativo);
      b.setAttribute('aria-pressed',String(ativo));
    });
    renderizar();
  }));
  atualizar.addEventListener('click',carregar);
  document.addEventListener('visibilitychange',() => {
    if (!document.hidden && Date.now() - ultimaConsulta >= INTERVALO) carregar();
  });
  setInterval(() => { if (!document.hidden && Date.now() - ultimaConsulta >= INTERVALO) carregar(); }, INTERVALO);
  renderizar();
  carregar();
})();
