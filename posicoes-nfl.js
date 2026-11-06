(() => {
  'use strict';
  const root = document.getElementById('nfl-posicoes');
  if (!root || root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';
  const $ = id => root.querySelector('#' + id);
  const el = {
    field:$('nflx-field'), players:$('nflx-players'), ball:$('nflx-ball'),
    trail:$('nflx-trail'), trailGlow:$('nflx-trail-glow'),trailDashes:$('nflx-trail-dashes'),trailHead:$('nflx-trail-head'),trailLegend:$('nflx-trail-legend'),
    formation:$('nflx-formation'),instruction:$('nflx-instruction'),positionPanel:$('nflx-position-panel'),simPanel:$('nflx-sim-panel'),
    posIcon:$('nflx-position-icon'),posSide:$('nflx-position-side'),posName:$('nflx-position-name'),posCode:$('nflx-position-code'),
    posFunction:$('nflx-position-function'),posDescription:$('nflx-position-description'),posTasks:$('nflx-position-tasks'),
    posMatchup:$('nflx-position-matchup'),posMatchupDesc:$('nflx-position-matchup-desc'),
    start:$('nflx-start'),progress:$('nflx-progress'),stepCount:$('nflx-step-count'),stepTitle:$('nflx-step-title'),stepDescription:$('nflx-step-description'),
    watchCode:$('nflx-watch-code'),watchName:$('nflx-watch-name'),watchSide:$('nflx-watch-side'),watchDescription:$('nflx-watch-description')
  };

  const positions = {
    QB:{name:'Quarterback',side:'ATAQUE',role:'Comandar o ataque e distribuir a bola.',description:'Recebe o snap e coordena a maioria das jogadas. Pode lançar, entregar a bola a um corredor ou correr.',tasks:['Ler a defesa antes do snap','Lançar para os recebedores','Entregar a bola ao Running Back','Ajustar a jogada'],duel:'Quarterback × Pass Rush',duelDescription:'O QB precisa tomar decisões antes de ser alcançado pela pressão defensiva.'},
    RB:{name:'Running Back',side:'ATAQUE',role:'Avançar com a bola nas corridas.',description:'Procura os espaços criados pelos bloqueadores. Também pode receber passes e proteger o QB.',tasks:['Ler os bloqueios','Correr com a bola','Receber passes','Auxiliar na proteção'],duel:'Running Back × Linebackers',duelDescription:'Os Linebackers tentam fechar os corredores para impedir o avanço.'},
    WR:{name:'Wide Receiver',side:'ATAQUE',role:'Correr rotas e receber passes.',description:'Usa velocidade, técnica e mudanças de direção para se separar da marcação e receber a bola.',tasks:['Correr rotas','Criar separação da marcação','Receber passes','Conseguir jardas após a recepção'],duel:'Wide Receiver × Cornerback',duelDescription:'O recebedor tenta se desmarcar; o Cornerback tenta impedir a recepção.'},
    TE:{name:'Tight End',side:'ATAQUE',role:'Receber passes e realizar bloqueios.',description:'Atua próximo à linha ofensiva e pode ajudar na proteção ou sair para receber passes.',tasks:['Bloquear em corridas','Ajudar a proteger o QB','Correr rotas','Receber passes'],duel:'Tight End × LB / Safety',duelDescription:'Pode enfrentar Linebackers ou Safeties dependendo da cobertura.'},
    OT:{name:'Offensive Tackle',side:'ATAQUE',role:'Proteger as extremidades da linha ofensiva.',description:'Atua nas pontas da linha, protegendo o pocket e abrindo espaço para corridas.',tasks:['Bloquear pass rushers','Proteger o QB','Bloquear nas corridas','Controlar as extremidades'],duel:'Offensive Tackle × Defensive End',duelDescription:'O Tackle precisa impedir que o DE chegue ao QB pela lateral.'},
    OG:{name:'Offensive Guard',side:'ATAQUE',role:'Proteger o interior e bloquear nas corridas.',description:'Fica entre o Center e o Tackle; protege o centro do pocket e abre corredores.',tasks:['Bloquear Defensive Tackles','Proteger contra pressão interna','Abrir corredores','Realizar bloqueios em movimento'],duel:'Offensive Guard × Defensive Tackle',duelDescription:'O Guard busca conter defensores que atacam o meio da linha.'},
    C:{name:'Center',side:'ATAQUE',role:'Iniciar a jogada com o snap.',description:'Entrega a bola ao Quarterback e participa imediatamente da proteção ou do bloqueio.',tasks:['Realizar o snap','Bloquear defensores','Identificar a pressão','Coordenar ajustes da linha'],duel:'Center × Interior defensivo',duelDescription:'Após o snap, precisa conter a pressão pelo meio.'},
    DE:{name:'Defensive End',side:'DEFESA',role:'Pressionar o QB pelas extremidades.',description:'Atua nas pontas da linha defensiva, buscando sacks e contendo corridas externas.',tasks:['Pressionar o QB','Controlar a borda da defesa','Vencer bloqueios','Conter corridas externas'],duel:'Defensive End × Offensive Tackle',duelDescription:'Tenta superar o Tackle para alcançar o QB ou o corredor.'},
    DT:{name:'Defensive Tackle',side:'DEFESA',role:'Controlar o interior da linha defensiva.',description:'Ataca o centro da linha ofensiva para impedir corridas internas e pressionar o QB.',tasks:['Parar corridas pelo centro','Ocupar bloqueadores','Pressionar o QB','Fechar espaços'],duel:'Defensive Tackle × Guard / Center',duelDescription:'Busca vencer os bloqueios no interior da linha.'},
    LB:{name:'Linebacker',side:'DEFESA',role:'Atuar contra corridas, passes e blitzes.',description:'Joga atrás da linha defensiva e reage ao tipo de jogada com tackles, cobertura ou pressão.',tasks:['Impedir corridas','Cobrir recebedores','Executar blitzes','Ler o desenvolvimento da jogada'],duel:'Linebacker × RB / TE',duelDescription:'Enfrenta corredores e Tight Ends em diferentes situações.'},
    CB:{name:'Cornerback',side:'DEFESA',role:'Marcar principalmente os Wide Receivers.',description:'Acompanha os recebedores e disputa os passes, buscando impedir a recepção.',tasks:['Marcar Wide Receivers','Desviar passes','Buscar interceptações','Ajudar contra corridas externas'],duel:'Cornerback × Wide Receiver',duelDescription:'O CB precisa acompanhar a rota e dificultar o passe.'},
    FS:{name:'Free Safety',side:'DEFESA',role:'Proteger as regiões profundas do campo.',description:'Costuma observar a jogada de mais longe e oferece ajuda na cobertura de passes longos.',tasks:['Proteger o fundo do campo','Ler os movimentos do QB','Ajudar os CBs','Buscar interceptações'],duel:'Free Safety × Jogo aéreo',duelDescription:'É uma importante última linha de proteção contra passes profundos.'},
    SS:{name:'Strong Safety',side:'DEFESA',role:'Ajudar contra corridas e passes.',description:'É versátil: pode cobrir recebedores, ajudar a defender corridas ou pressionar o QB.',tasks:['Ajudar contra corridas','Marcar Tight Ends','Realizar blitzes','Defender passes'],duel:'Strong Safety × TE / RB',duelDescription:'Frequentemente cobre Tight Ends ou apoia a defesa terrestre.'}
  };

  const offense = [
    ['o-WRL','WR','WR',10,55],['o-WRR','WR','WR',91,62],['o-SLOT','WR','WR',20,64],
    ['o-LT','LT','OT',32,55],['o-LG','LG','OG',41,55],['o-C','C','C',50,55],['o-RG','RG','OG',59,55],['o-RT','RT','OT',68,55],
    ['o-TE','TE','TE',78,55],['o-QB','QB','QB',50,65],['o-RB','RB','RB',50,78]
  ].map(([id,label,type,x,y])=>({id,label,type,x,y,side:'offense'}));
  const defense = [
    ['d-DE1','DE','DE',30,45],['d-DT1','DT','DT',43,45],['d-DT2','DT','DT',57,45],['d-DE2','DE','DE',70,45],
    ['d-LB1','LB','LB',34,33],['d-LB2','LB','LB',50,31],['d-LB3','LB','LB',66,33],
    ['d-CB1','CB','CB',10,40],['d-CB2','CB','CB',91,41],['d-FS','FS','FS',42,18],['d-SS','SS','SS',64,21]
  ].map(([id,label,type,x,y])=>({id,label,type,x,y,side:'defense'}));
  const allPlayers = [...offense,...defense];

  /* Movimentos esquemáticos: não são dados de uma partida real. */
  const plays = {
    pass:{name:'Passe',steps:[
      {name:'Snap',text:'O Center entrega a bola ao QB e a jogada começa.',moves:{'o-QB':[50,68]},ball:'o-QB',focus:['o-C','o-QB']},
      {name:'Proteção',text:'A linha ofensiva recua e forma o pocket enquanto os defensores começam o pass rush.',moves:{'o-LT':[34,59],'o-LG':[42,58],'o-C':[50,58],'o-RG':[58,58],'o-RT':[66,59],'d-DE1':[34,51],'d-DT1':[43,51],'d-DT2':[57,51],'d-DE2':[66,51]},ball:'o-QB',focus:['o-LT','o-LG','o-C','o-RG','o-RT','d-DE1','d-DE2']},
      {name:'Rotas',text:'WRs e TE correm rotas. Cornerbacks e Safeties reagem à distribuição dos recebedores.',moves:{'o-WRL':[15,24],'o-WRR':[78,29],'o-SLOT':[37,35],'o-TE':[67,36],'d-CB1':[18,27],'d-CB2':[82,31],'d-FS':[53,18],'d-SS':[69,29]},ball:'o-QB',focus:['o-WRL','o-WRR','o-SLOT','o-TE','d-CB1','d-CB2']},
      {name:'Leitura',text:'O QB observa a cobertura e procura um recebedor disponível.',moves:{'d-LB1':[39,37],'d-LB2':[50,37],'d-LB3':[62,37]},ball:'o-QB',focus:['o-QB','d-LB1','d-LB2','d-LB3']},
      {name:'Passe',text:'O QB lança a bola em direção ao WR pela direita.',moves:{'o-WRR':[75,21],'d-CB2':[80,24]},ball:'o-WRR',focus:['o-QB','o-WRR','d-CB2']},
      {name:'Recepção',text:'O recebedor completa o passe e tenta ganhar jardas antes do tackle.',moves:{'o-WRR':[69,14],'d-CB2':[74,18],'d-FS':[64,15]},ball:'o-WRR',focus:['o-WRR','d-CB2','d-FS']}
    ]},
    run:{name:'Corrida',steps:[
      {name:'Snap',text:'O Center realiza o snap e o QB recebe a bola.',moves:{},ball:'o-QB',focus:['o-C','o-QB']},
      {name:'Bloqueios',text:'A linha ofensiva tenta abrir um corredor para a corrida.',moves:{'o-LT':[32,51],'o-LG':[42,50],'o-C':[51,50],'o-RG':[60,49],'o-RT':[69,50],'d-DE1':[30,48],'d-DT1':[42,47],'d-DT2':[57,47],'d-DE2':[71,48]},ball:'o-QB',focus:['o-LT','o-LG','o-C','o-RG','o-RT']},
      {name:'Handoff',text:'O QB entrega a bola ao Running Back.',moves:{'o-QB':[54,65],'o-RB':[53,65]},ball:'o-RB',focus:['o-QB','o-RB']},
      {name:'Leitura',text:'O RB procura o espaço aberto. Os Linebackers se aproximam para contê-lo.',moves:{'o-RB':[60,52],'d-LB2':[54,41],'d-LB3':[63,42]},ball:'o-RB',focus:['o-RB','d-LB2','d-LB3']},
      {name:'Avanço',text:'O RB ultrapassa a linha de scrimmage e tenta ganhar jardas.',moves:{'o-RB':[63,36],'d-LB2':[57,36],'d-LB3':[66,35],'d-SS':[67,27]},ball:'o-RB',focus:['o-RB','d-LB2','d-LB3']},
      {name:'Tackle',text:'Os defensores alcançam o portador da bola e encerram a jogada.',moves:{'o-RB':[65,30],'d-LB3':[65,31],'d-SS':[66,30]},ball:'o-RB',focus:['o-RB','d-LB3','d-SS']}
    ]},
    blitz:{name:'Blitz',steps:[
      {name:'Snap',text:'A bola entra em jogo e o QB inicia sua leitura.',moves:{},ball:'o-QB',focus:['o-C','o-QB']},
      {name:'Blitz',text:'Dois Linebackers se somam ao pass rush para pressionar o QB.',moves:{'d-DE1':[33,50],'d-DT1':[43,50],'d-DT2':[57,50],'d-DE2':[67,50],'d-LB2':[48,48],'d-LB3':[61,48]},ball:'o-QB',focus:['d-LB2','d-LB3','d-DE1','d-DE2']},
      {name:'Proteção',text:'Linha ofensiva e RB tentam identificar e bloquear os defensores extras.',moves:{'o-LT':[34,58],'o-LG':[43,58],'o-C':[50,58],'o-RG':[57,58],'o-RT':[66,58],'o-RB':[59,62],'o-QB':[48,69]},ball:'o-QB',focus:['o-LT','o-LG','o-C','o-RG','o-RT','o-RB']},
      {name:'Passe rápido',text:'O QB procura uma rota curta antes que a pressão chegue.',moves:{'o-SLOT':[38,43],'o-WRL':[15,30],'o-WRR':[82,31],'d-CB1':[28,39]},ball:'o-QB',focus:['o-QB','o-SLOT','d-CB1']},
      {name:'Lançamento',text:'O QB libera a bola para o WR do slot sob pressão.',moves:{'d-LB2':[49,60],'d-LB3':[57,59],'o-SLOT':[42,39]},ball:'o-SLOT',focus:['o-QB','o-SLOT','d-LB2']},
      {name:'Resposta',text:'O passe curto busca explorar o espaço deixado pelos defensores que fizeram a blitz.',moves:{'o-SLOT':[46,31],'d-CB1':[40,32],'d-FS':[48,24]},ball:'o-SLOT',focus:['o-SLOT','d-CB1','d-FS']}
    ]}
  };

  const state = {mode:'offense',play:'pass',playing:false,token:0,selectedId:null,trail:[],raf:0};
  const nodes = new Map();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const interval = reducedMotion ? 280 : 1330;
  const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));

  function syncTrailViewBox(){
    // Sem viewBox, SVG pode recortar o traçado fora dos 300 × 150 px padrão.
    const bounds=el.trail.getBoundingClientRect();
    if(bounds.width>0 && bounds.height>0){
      el.trail.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
    }
  }
  function clearTrace(){
    state.trail = [];
    el.trailGlow.setAttribute('points','');
    el.trailDashes.setAttribute('points','');
    el.trailHead.style.opacity = '0';
  }
  function markerCenter(button){
    const box = button.getBoundingClientRect();
    const svg = el.trail.getBoundingClientRect();
    return {x:box.left + box.width/2 - svg.left,y:box.top + box.height/2 - svg.top};
  }
  function drawTrace(){
    if(state.mode !== 'play') return;
    const button = nodes.get(state.selectedId);
    if(!button) return;
    const point = markerCenter(button);
    if(!Number.isFinite(point.x) || !Number.isFinite(point.y)) return;
    const last = state.trail[state.trail.length-1];
    if(!last || Math.hypot(point.x-last.x,point.y-last.y) > 2.5) {
      state.trail.push(point);
      if(state.trail.length > 1100) state.trail.shift();
    }
    // Conecta também à posição intermediária do frame atual.
    const coords = [...state.trail,point].map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    el.trailGlow.setAttribute('points',coords);
    el.trailDashes.setAttribute('points',coords);
    el.trailHead.setAttribute('cx',point.x.toFixed(1));
    el.trailHead.setAttribute('cy',point.y.toFixed(1));
    el.trailHead.style.opacity = '1';
  }
  function traceLoop(){
    if(state.mode !== 'play') return;
    drawTrace();
    state.raf = requestAnimationFrame(traceLoop);
  }
  function stopTrace(){cancelAnimationFrame(state.raf);state.raf=0;clearTrace();}
  function startTrace(){cancelAnimationFrame(state.raf);state.raf=requestAnimationFrame(traceLoop);}
  function selectPlayer(id){
    const record=nodes.get(id);
    if(!record)return;
    nodes.forEach(button=>button.classList.toggle('is-selected',button===record));
    state.selectedId=id;
    const type=record.dataset.type;
    const data=positions[type];
    if(state.mode==='play'){
      el.watchCode.textContent=record.textContent;
      el.watchName.textContent=data.name;
      el.watchSide.textContent=data.side==='ATAQUE'?'Ataque':'Defesa';
      el.watchDescription.textContent=data.role;
      clearTrace();
      drawTrace();
    } else {
      el.posIcon.textContent=record.textContent;
      el.posSide.textContent=data.side;
      el.posName.textContent=data.name;
      el.posCode.textContent=record.textContent;
      el.posFunction.textContent=data.role;
      el.posDescription.textContent=data.description;
      el.posTasks.replaceChildren(...data.tasks.map(task=>{const li=document.createElement('li');li.textContent=task;return li}));
      el.posMatchup.textContent=data.duel;
      el.posMatchupDesc.textContent=data.duelDescription;
    }
  }
  function createMarker(player){
    const button=document.createElement('button');
    button.type='button';button.className=`nflx__player nflx__player--${player.side}`;
    button.style.left=`${player.x}%`;button.style.top=`${player.y}%`;
    button.textContent=player.label;button.dataset.type=player.type;button.dataset.tooltip=positions[player.type].name;
    button.setAttribute('aria-label',`${player.label} — ${positions[player.type].name} (${player.side==='offense'?'ataque':'defesa'})`);
    button.addEventListener('click',()=>selectPlayer(player.id));
    el.players.append(button);nodes.set(player.id,button);
  }
  function renderPlayers(which){
    nodes.clear();el.players.replaceChildren();
    const roster=which==='offense'?offense:which==='defense'?defense:allPlayers;
    roster.forEach(createMarker);
  }
  function cancelPlay(){state.token++;state.playing=false;el.start.disabled=false;el.start.textContent='▶ INICIAR JOGADA'}
  function resetPositions(){
    // Um jogador com percurso visível já vem selecionado em cada tipo de jogada.
    const recommended = {pass:'o-WRR',run:'o-RB',blitz:'d-LB2'}[state.play];
    const oldSelection=nodes.has(state.selectedId)?state.selectedId:recommended;
    renderPlayers('play');
    el.ball.classList.remove('is-visible');
    el.ball.style.left='50%';el.ball.style.top='55%';
    selectPlayer(oldSelection);
  }
  function buildProgress(){
    el.progress.replaceChildren(...plays[state.play].steps.map((step,i)=>{
      const item=document.createElement('div');item.className='nflx__progress-item';
      const dot=document.createElement('span');dot.className='nflx__progress-dot';dot.textContent=i+1;
      const label=document.createElement('small');label.textContent=step.name;
      item.append(dot,label);return item;
    }));
  }
  function updateProgress(index){
    [...el.progress.children].forEach((node,i)=>{
      node.classList.toggle('is-current',i===index);
      node.classList.toggle('is-done',i<index);
    });
  }
  function prepareSimulation(){
    resetPositions();
    buildProgress();
    el.stepCount.textContent='ESCOLHA UMA JOGADA';
    el.stepTitle.textContent=plays[state.play].name;
    el.stepDescription.textContent='Clique em um jogador para acompanhar sua trajetória. Depois, inicie a animação.';
    el.start.textContent='▶ INICIAR JOGADA';el.start.disabled=false;
  }
  function moveBall(id){
    const target=nodes.get(id);
    if(!target) return;
    el.ball.classList.add('is-visible');
    el.ball.style.left=target.style.left;
    el.ball.style.top=target.style.top;
  }
  function applyStep(step,index,total){
    Object.entries(step.moves || {}).forEach(([id,coord])=>{
      const button=nodes.get(id);
      if(!button)return;
      button.style.left=`${coord[0]}%`;button.style.top=`${coord[1]}%`;
    });
    nodes.forEach((button,id)=>button.classList.toggle('is-involved',(step.focus||[]).includes(id)));
    if(step.ball)moveBall(step.ball);
    updateProgress(index);
    el.stepCount.textContent=`ETAPA ${index+1} DE ${total}`;
    el.stepTitle.textContent=step.name;
    el.stepDescription.textContent=step.text;
  }
  async function startPlay(){
    if(state.playing||state.mode!=='play')return;
    cancelPlay();
    prepareSimulation();
    const token=++state.token;
    state.playing=true;
    el.start.disabled=true;el.start.textContent='JOGADA EM ANDAMENTO';
    // Mostra a bola inicialmente no Center antes do snap.
    moveBall('o-C');
    await sleep(reducedMotion ? 35 : 240);
    const steps=plays[state.play].steps;
    for(let i=0;i<steps.length;i++){
      if(token!==state.token || state.mode!=='play')return;
      applyStep(steps[i],i,steps.length);
      await sleep(interval);
    }
    if(token!==state.token || state.mode!=='play')return;
    state.playing=false;
    el.start.disabled=false;el.start.textContent='↻ REPETIR JOGADA';
    el.stepCount.textContent='JOGADA CONCLUÍDA';
    el.stepDescription.textContent='Você pode repetir, mudar a jogada ou selecionar outro jogador para acompanhar sua movimentação na próxima execução.';
  }
  function setMode(next){
    cancelPlay();stopTrace();state.mode=next;state.selectedId=null;
    root.querySelectorAll('.nflx-tab').forEach(tab=>{
      const on=tab.dataset.mode===next;tab.classList.toggle('is-active',on);tab.setAttribute('aria-selected',String(on));
    });
    const playMode=next==='play';
    el.positionPanel.hidden=playMode;el.simPanel.hidden=!playMode;el.trailLegend.hidden=!playMode;
    el.instruction.textContent=playMode?'Clique em um jogador para seguir a trajetória':'Selecione um jogador';
    if(playMode){
      el.formation.textContent='Ataque × Defesa · 22 jogadores';
      syncTrailViewBox();
      prepareSimulation();
      startTrace();
    }else{
      renderPlayers(next);
      el.ball.classList.remove('is-visible');
      el.formation.textContent=next==='offense'?'Ataque · formação ilustrativa':'Defesa · formação ilustrativa';
      selectPlayer(next==='offense'?'o-QB':'d-LB2');
    }
  }
  root.querySelectorAll('.nflx-tab').forEach(tab=>tab.addEventListener('click',()=>setMode(tab.dataset.mode)));
  root.querySelectorAll('.nflx-play-choice').forEach(button=>button.addEventListener('click',()=>{
    cancelPlay();state.play=button.dataset.play;state.selectedId=null;
    root.querySelectorAll('.nflx-play-choice').forEach(other=>{
      const active=other===button;other.classList.toggle('is-active',active);other.setAttribute('aria-pressed',String(active));
    });
    prepareSimulation();
  }));
  el.start.addEventListener('click',startPlay);
  // Ao redimensionar o campo, reinicia o traço para evitar coordenadas antigas.
  window.addEventListener('resize',()=>{syncTrailViewBox();if(state.mode==='play'){clearTrace();drawTrace();}});
  setMode('offense');
})();