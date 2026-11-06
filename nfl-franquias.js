/* NFL FRANQUIAS | JavaScript isolado na section #nfl-franquias.
 * As 32 composições de uniformes foram fornecidas pelo usuário.
 * Uma imagem completa por franquia, sem recortes; pode mostrar três ou mais combinações.
 * As imagens ficam em ./uniformes/ na versão separada.
 * Os escudos vêm da ESPN e exibem siglas se não houver conexão.
 */
(() => {
  'use strict';
  const root = document.getElementById('nfl-franquias');
  if (!root) return;

  // Cada uniforme: [nome, descrição, camisa, número, calça, capacete, detalhe].
  // O número 88 é exclusivamente decorativo.
  const teams = [
    {
      name:'Arizona Cardinals', code:'ari', league:'NFC', division:'Oeste', founded:'1898 (origem)',
      city:'Glendale, Arizona', stadium:'State Farm Stadium', primary:'#97233f',
      history:'A franquia ativa mais antiga do futebol americano profissional começou em Chicago em 1898. Passou por St. Louis antes de chegar ao Arizona em 1988. Em 2008, alcançou seu primeiro Super Bowl, liderada por Kurt Warner e Larry Fitzgerald.',
      legends:[['Larry Fitzgerald','WR'],['Kurt Warner','QB'],['Aeneas Williams','CB']],
      kits:[['Principal','Vermelho cardinal e branco','#97233f','#ffffff','#ffffff','#ffffff','#0b1626'],['Visitante','Branco e vermelho','#ffffff','#97233f','#ffffff','#ffffff','#97233f'],['Alternativo','Preto e vermelho','#14161b','#ffffff','#14161b','#14161b','#97233f']]
    },
    {
      name:'Atlanta Falcons', code:'atl', league:'NFC', division:'Sul', founded:'1966',
      city:'Atlanta, Geórgia', stadium:'Mercedes-Benz Stadium', primary:'#a71930',
      history:'Fundados em 1966, os Falcons levaram o futebol americano profissional a Atlanta. A franquia disputou os Super Bowls XXXIII e LI e viveu uma de suas fases mais produtivas com Matt Ryan e Julio Jones.',
      legends:[['Matt Ryan','QB'],['Julio Jones','WR'],['Deion Sanders','CB']],
      kits:[['Principal 2026','Vermelho e branco','#a71930','#ffffff','#ffffff','#111111','#a71930'],['Visitante 2026','Branco e preto','#ffffff','#a71930','#ffffff','#111111','#a71930'],['Alternativo','Preto tradicional','#111111','#ffffff','#111111','#111111','#a71930']]
    },
    {
      name:'Baltimore Ravens', code:'bal', league:'AFC', division:'Norte', founded:'1996',
      city:'Baltimore, Maryland', stadium:'M&T Bank Stadium', primary:'#7b39ba',
      history:'Os Ravens estrearam em 1996, trazendo a NFL de volta a Baltimore. Ganharam os Super Bowls XXXV e XLVII, consagrando a imagem de uma franquia marcada por defesas intensas e grandes jogadores como Ray Lewis e Ed Reed.',
      legends:[['Ray Lewis','LB'],['Ed Reed','S'],['Jonathan Ogden','OT']],
      kits:[['Principal','Roxo e preto','#52118b','#ffffff','#111111','#111111','#d6ae42'],['Visitante','Branco e roxo','#ffffff','#52118b','#111111','#111111','#d6ae42'],['Alternativo','Todo preto','#111111','#ffffff','#111111','#111111','#52118b']]
    },
    {
      name:'Buffalo Bills', code:'buf', league:'AFC', division:'Leste', founded:'1960',
      city:'Orchard Park, Nova York', stadium:'Highmark Stadium (novo, inaugurado em 2026)', primary:'#1464b9',
      stadiumNote:'O novo Highmark Stadium foi inaugurado em junho de 2026, substituindo a antiga arena de mesmo nome.',
      history:'Criados na AFL em 1960, os Bills conquistaram dois títulos da antiga liga e foram a quatro Super Bowls consecutivos na década de 1990. A apaixonada Bills Mafia acompanha uma franquia que inaugurou um novo estádio em 2026.',
      legends:[['Jim Kelly','QB'],['Bruce Smith','DE'],['Thurman Thomas','RB']],
      kits:[['Principal','Azul royal e branco','#125cbb','#ffffff','#ffffff','#ffffff','#ce1e37'],['Visitante','Branco com azul','#ffffff','#125cbb','#ffffff','#ffffff','#ce1e37'],['Alternativo','Vermelho color rush','#cf243b','#ffffff','#cf243b','#ffffff','#125cbb']]
    },
    {
      name:'Carolina Panthers', code:'car', league:'NFC', division:'Sul', founded:'1995',
      city:'Charlotte, Carolina do Norte', stadium:'Bank of America Stadium', primary:'#0085ca',
      history:'Os Panthers começaram a jogar em 1995 e chegaram à final da NFC logo em sua segunda temporada. A franquia esteve nos Super Bowls XXXVIII e 50, com campanhas memoráveis lideradas por Jake Delhomme e Cam Newton.',
      legends:[['Cam Newton','QB'],['Luke Kuechly','LB'],['Steve Smith Sr.','WR']],
      kits:[['Principal','Preto e azul pantera','#15181b','#ffffff','#d6dde1','#111111','#0085ca'],['Visitante','Branco com azul','#ffffff','#101d2b','#ffffff','#111111','#0085ca'],['Alternativo','Azul pantera','#0085ca','#ffffff','#111111','#111111','#101820']]
    },
    {
      name:'Chicago Bears', code:'chi', league:'NFC', division:'Norte', founded:'1920',
      city:'Chicago, Illinois', stadium:'Soldier Field', primary:'#c75024',
      history:'Uma das franquias fundadoras da NFL, surgiu como Decatur Staleys em 1920. Os Bears acumularam títulos desde os primeiros anos da liga e construíram uma das defesas mais famosas da história ao vencer o Super Bowl XX, em 1985.',
      legends:[['Walter Payton','RB'],['Dick Butkus','LB'],['Mike Singletary','LB']],
      kits:[['Principal','Azul-marinho e laranja','#0b162f','#ffffff','#ffffff','#0b162f','#c75024'],['Visitante','Branco e azul-marinho','#ffffff','#0b162f','#0b162f','#0b162f','#c75024'],['Alternativo','Laranja tradicional','#c75024','#0b162f','#ffffff','#0b162f','#ffffff']]
    },
    {
      name:'Cincinnati Bengals', code:'cin', league:'AFC', division:'Norte', founded:'1968',
      city:'Cincinnati, Ohio', stadium:'Paycor Stadium', primary:'#fb4f14',
      history:'Fundados por Paul Brown em 1968, os Bengals entraram na AFL antes da fusão com a NFL. Chegaram aos Super Bowls XVI, XXIII e LVI, tornando-se conhecidos por seus uniformes com listras de tigre e por grandes ataques.',
      legends:[['Anthony Muñoz','OT'],['Ken Anderson','QB'],['Chad Johnson','WR']],
      kits:[['Principal','Laranja e preto','#fb4f14','#111111','#ffffff','#fb4f14','#111111'],['Visitante','Branco com preto','#ffffff','#111111','#ffffff','#fb4f14','#111111'],['Alternativo','Preto com laranja','#111111','#fb4f14','#111111','#fb4f14','#fb4f14']]
    },
    {
      name:'Cleveland Browns', code:'cle', league:'AFC', division:'Norte', founded:'1946',
      city:'Cleveland, Ohio', stadium:'Huntington Bank Field', primary:'#ff6b13',
      history:'Os Browns começaram em 1946 na AAFC e dominaram seus primeiros anos, vencendo também campeonatos da NFL antes da era do Super Bowl. A equipe ficou inativa entre 1996 e 1998 e voltou em 1999, mantendo sua história e identidade em Cleveland.',
      legends:[['Jim Brown','RB'],['Otto Graham','QB'],['Joe Thomas','OT']],
      kits:[['Principal','Marrom e laranja','#311d17','#ffffff','#ffffff','#f26928','#ff6b13'],['Visitante','Branco e laranja','#ffffff','#311d17','#ffffff','#f26928','#311d17'],['Alternativo','Laranja clássico','#f26928','#311d17','#311d17','#f26928','#ffffff']]
    },
    {
      name:'Dallas Cowboys', code:'dal', league:'NFC', division:'Leste', founded:'1960',
      city:'Arlington, Texas', stadium:'AT&T Stadium', primary:'#6e9dcc',
      history:'Os Cowboys estrearam em 1960 e viraram uma das marcas esportivas mais reconhecidas do planeta. A franquia conquistou cinco Super Bowls, com dinastias lideradas por Roger Staubach nos anos 1970 e pelo trio ofensivo da década de 1990.',
      legends:[['Roger Staubach','QB'],['Emmitt Smith','RB'],['Troy Aikman','QB']],
      kits:[['Principal','Branco clássico e prata','#ffffff','#003594','#b3c2ca','#c4cbd1','#003594'],['Visitante','Azul-marinho e prata','#002b5c','#ffffff','#b0b9c7','#c4cbd1','#ffffff'],['Alternativo','Branco retrô e azul','#ffffff','#002b5c','#ffffff','#c4cbd1','#4e89c3']]
    },
    {
      name:'Denver Broncos', code:'den', league:'AFC', division:'Oeste', founded:'1960',
      city:'Denver, Colorado', stadium:'Empower Field at Mile High', primary:'#fb4f14',
      history:'Criados em 1960 na AFL, os Broncos se tornaram presença recorrente nos playoffs e alcançaram oito Super Bowls. Venceram as edições XXXII, XXXIII e 50, nas eras de John Elway e Peyton Manning.',
      legends:[['John Elway','QB'],['Terrell Davis','RB'],['Peyton Manning','QB']],
      kits:[['Principal','Laranja intenso','#fb4f14','#ffffff','#ffffff','#0a2344','#0a2344'],['Visitante','Branco e laranja','#ffffff','#0a2344','#ffffff','#0a2344','#fb4f14'],['Alternativo','Azul-marinho','#0a2344','#ffffff','#0a2344','#0a2344','#fb4f14']]
    },
    {
      name:'Detroit Lions', code:'det', league:'NFC', division:'Norte', founded:'1930',
      city:'Detroit, Michigan', stadium:'Ford Field', primary:'#2b92cf',
      history:'Originados como Portsmouth Spartans em 1930, os Lions mudaram-se para Detroit em 1934. Têm quatro títulos da NFL anteriores ao Super Bowl e viveram um novo período competitivo na década de 2020, após anos de reconstrução.',
      legends:[['Barry Sanders','RB'],['Calvin Johnson','WR'],['Bobby Layne','QB']],
      kits:[['Principal','Azul Honolulu e prata','#1f8eca','#ffffff','#c5ced5','#c5ced5','#ffffff'],['Visitante','Branco e azul','#ffffff','#1f8eca','#ffffff','#c5ced5','#1f8eca'],['Alternativo','Preto e azul','#121519','#1f8eca','#121519','#1f8eca','#c5ced5']]
    },
    {
      name:'Green Bay Packers', code:'gb', league:'NFC', division:'Norte', founded:'1919',
      city:'Green Bay, Wisconsin', stadium:'Lambeau Field', primary:'#ffb612',
      history:'Fundados em 1919 e integrantes da NFL desde 1921, os Packers são únicos por sua estrutura de propriedade comunitária. Detêm 13 títulos da liga, incluindo as vitórias nos dois primeiros Super Bowls, sob comando de Vince Lombardi.',
      legends:[['Bart Starr','QB'],['Brett Favre','QB'],['Aaron Rodgers','QB']],
      kits:[['Principal','Verde e dourado','#163b2c','#ffb612','#ffb612','#ffb612','#ffffff'],['Visitante','Branco e verde','#ffffff','#163b2c','#ffb612','#ffb612','#163b2c'],['Retrô','Verde clássico','#254734','#f0ce55','#d1ba7e','#c7ab53','#eed999']]
    },
    {
      name:'Houston Texans', code:'hou', league:'AFC', division:'Sul', founded:'2002',
      city:'Houston, Texas', stadium:'NRG Stadium', primary:'#b80e26',
      history:'A franquia mais recente da NFL começou a jogar em 2002, devolvendo o futebol americano profissional a Houston após a saída dos Oilers. Ganhou força com Andre Johnson, J.J. Watt e campanhas frequentes nos playoffs da AFC.',
      legends:[['J.J. Watt','DE'],['Andre Johnson','WR'],['Arian Foster','RB']],
      kits:[['Principal','Azul profundo e vermelho','#081b33','#ffffff','#ffffff','#081b33','#bd1e34'],['Visitante','Branco e azul','#ffffff','#081b33','#ffffff','#081b33','#bd1e34'],['Battle Red','Vermelho e azul','#bd1e34','#ffffff','#bd1e34','#bd1e34','#081b33']]
    },
    {
      name:'Indianapolis Colts', code:'ind', league:'AFC', division:'Sul', founded:'1953',
      city:'Indianápolis, Indiana', stadium:'Lucas Oil Stadium', primary:'#1968ba',
      history:'Os Colts começaram em Baltimore em 1953 e se mudaram para Indianápolis em 1984. Com grandes quarterbacks como Johnny Unitas e Peyton Manning, venceram os Super Bowls V e XLI, além de outros campeonatos históricos.',
      legends:[['Johnny Unitas','QB'],['Peyton Manning','QB'],['Marvin Harrison','WR']],
      kits:[['Principal','Azul royal e branco','#1457aa','#ffffff','#ffffff','#ffffff','#ffffff'],['Visitante','Branco e azul','#ffffff','#1457aa','#ffffff','#ffffff','#1457aa'],['Indiana Nights','Azul e preto','#134490','#ffffff','#134490','#111b2c','#131c2b']]
    },
    {
      name:'Jacksonville Jaguars', code:'jax', league:'AFC', division:'Sul', founded:'1995',
      city:'Jacksonville, Flórida', stadium:'EverBank Stadium', primary:'#00a6a6',
      stadiumNote:'Em 2027, os Jaguars jogarão temporariamente em Orlando, no Camping World Stadium, durante a reforma do EverBank Stadium. O retorno está previsto para 2028.',
      history:'Estrearam em 1995 e chegaram à final da AFC já em 1996. O clube consolidou sua identidade com o uniforme azul-petróleo e jogadores de longa trajetória. A reforma de seu estádio prevê jogos temporários fora de Jacksonville em 2027.',
      legends:[['Tony Boselli','OT'],['Fred Taylor','RB'],['Jimmy Smith','WR']],
      kits:[['Principal','Azul-petróleo e preto','#007d88','#ffffff','#ffffff','#111111','#d8a642'],['Visitante','Branco e azul-petróleo','#ffffff','#007d88','#ffffff','#111111','#007d88'],['Alternativo','Preto e dourado','#111111','#ffffff','#111111','#111111','#d8a642']]
    },
    {
      name:'Kansas City Chiefs', code:'kc', league:'AFC', division:'Oeste', founded:'1960',
      city:'Kansas City, Missouri', stadium:'GEHA Field at Arrowhead Stadium', primary:'#e31837',
      history:'Fundados em 1960 como Dallas Texans, mudaram-se para Kansas City em 1963. Depois do triunfo no Super Bowl IV, construíram uma nova dinastia com Patrick Mahomes e Andy Reid, incluindo títulos nas edições LIV, LVII e LVIII.',
      legends:[['Patrick Mahomes','QB'],['Travis Kelce','TE'],['Derrick Thomas','LB']],
      kits:[['Principal','Vermelho e branco','#e31837','#ffffff','#ffffff','#e31837','#ffb81c'],['Visitante','Branco e vermelho','#ffffff','#e31837','#e31837','#e31837','#ffb81c'],['Combinação vermelha','Vermelho sobre vermelho','#e31837','#ffffff','#e31837','#e31837','#ffb81c']]
    },
    {
      name:'Las Vegas Raiders', code:'lv', league:'AFC', division:'Oeste', founded:'1960',
      city:'Paradise, Nevada', stadium:'Allegiant Stadium', primary:'#c4c7ca',
      history:'A franquia nasceu em Oakland em 1960, passou por Los Angeles e retornou a Oakland antes da mudança para Las Vegas em 2020. Os Raiders conquistaram três Super Bowls e cultivaram uma identidade marcante em preto e prata.',
      legends:[['Ken Stabler','QB'],['Marcus Allen','RB'],['Tim Brown','WR']],
      kits:[['Principal','Preto e prata','#131313','#ffffff','#b9bfc5','#b9bfc5','#b9bfc5'],['Visitante','Branco e prata','#ffffff','#222222','#b9bfc5','#b9bfc5','#111111'],['Retrô','Branco clássico','#ffffff','#161616','#e1e1e1','#b9bfc5','#b9bfc5']]
    },
    {
      name:'Los Angeles Chargers', code:'lac', league:'AFC', division:'Oeste', founded:'1960',
      city:'Inglewood, Califórnia', stadium:'SoFi Stadium', primary:'#5abbec',
      history:'Os Chargers começaram em Los Angeles em 1960, passaram décadas em San Diego e voltaram à região metropolitana de Los Angeles em 2017. São conhecidos por seu raio, uniforme azul-claro e ataques de grande produção.',
      legends:[['LaDainian Tomlinson','RB'],['Dan Fouts','QB'],['Junior Seau','LB']],
      kits:[['Principal','Azul-claro e amarelo','#4eb9e5','#ffffff','#ffffff','#ffffff','#ffc20e'],['Visitante','Branco e azul-claro','#ffffff','#38a9da','#ffffff','#ffffff','#ffc20e'],['Alternativo','Azul-marinho','#0e2748','#ffffff','#0e2748','#0e2748','#ffc20e']]
    },
    {
      name:'Los Angeles Rams', code:'lar', league:'NFC', division:'Oeste', founded:'1936',
      city:'Inglewood, Califórnia', stadium:'SoFi Stadium', primary:'#ffd100',
      history:'Criados em Cleveland em 1936, os Rams passaram por Los Angeles e St. Louis, retornando à Califórnia em 2016. São campeões dos Super Bowls XXXIV e LVI e eternizaram tanto o Greatest Show on Turf quanto Aaron Donald.',
      legends:[['Aaron Donald','DT'],['Marshall Faulk','RB'],['Eric Dickerson','RB']],
      kits:[['Principal','Azul royal e amarelo','#003594','#ffd100','#ffd100','#003594','#ffffff'],['Visitante','Branco e azul royal','#ffffff','#003594','#003594','#003594','#ffd100'],['Classic Sol','Amarelo e branco','#ffd100','#003594','#ffffff','#003594','#003594']]
    },
    {
      name:'Miami Dolphins', code:'mia', league:'AFC', division:'Leste', founded:'1966',
      city:'Miami Gardens, Flórida', stadium:'Hard Rock Stadium', primary:'#00b8b0',
      history:'Os Dolphins estrearam em 1966 e ganharam projeção com Don Shula. A equipe de 1972 terminou a temporada invicta, feito único na era do Super Bowl, e repetiu o título na temporada seguinte.',
      legends:[['Dan Marino','QB'],['Larry Csonka','FB'],['Jason Taylor','DE']],
      kits:[['Principal','Aqua e branco','#009da0','#ffffff','#ffffff','#ffffff','#fc4c02'],['Visitante','Branco e aqua','#ffffff','#009da0','#ffffff','#ffffff','#fc4c02'],['Alternativo','Laranja e aqua','#fc4c02','#ffffff','#ffffff','#ffffff','#009da0']]
    },
    {
      name:'Minnesota Vikings', code:'min', league:'NFC', division:'Norte', founded:'1961',
      city:'Minneapolis, Minnesota', stadium:'U.S. Bank Stadium', primary:'#9b63dc',
      history:'Os Vikings entraram na NFL em 1961 e dominaram parte da NFC nos anos 1970, alcançando quatro Super Bowls. O uniforme roxo, o simbolismo nórdico e talentos como Fran Tarkenton e Randy Moss moldaram sua identidade.',
      legends:[['Fran Tarkenton','QB'],['Randy Moss','WR'],['Adrian Peterson','RB']],
      kits:[['Principal','Roxo e dourado','#54268b','#ffffff','#ffffff','#54268b','#ffc62f'],['Visitante','Branco e roxo','#ffffff','#54268b','#54268b','#54268b','#ffc62f'],['Winter Warrior','Totalmente branco','#f7f8fa','#54268b','#ffffff','#ffffff','#bdc7d3']]
    },
    {
      name:'New England Patriots', code:'ne', league:'AFC', division:'Leste', founded:'1960',
      city:'Foxborough, Massachusetts', stadium:'Gillette Stadium', primary:'#bf2a43',
      history:'A equipe começou em 1960 na AFL como Boston Patriots. Sob Bill Belichick e Tom Brady, conquistou seis Super Bowls entre as temporadas 2001 e 2018, formando uma das dinastias mais vitoriosas do esporte.',
      legends:[['Tom Brady','QB'],['Rob Gronkowski','TE'],['John Hannah','OG']],
      kits:[['Principal','Azul-marinho e vermelho','#0b2343','#ffffff','#0b2343','#c5c9cd','#c82345'],['Visitante','Branco e azul-marinho','#ffffff','#0b2343','#0b2343','#c5c9cd','#c82345'],['Retrô','Vermelho Pat Patriot','#c82345','#ffffff','#ffffff','#ffffff','#0b2343']]
    },
    {
      name:'New Orleans Saints', code:'no', league:'NFC', division:'Sul', founded:'1967',
      city:'Nova Orleans, Louisiana', stadium:'Caesars Superdome', primary:'#d3bc82',
      history:'Fundados em 1967, os Saints são símbolo cultural de Nova Orleans. A reconstrução da cidade e a ascensão do time culminaram no título do Super Bowl XLIV, liderado por Drew Brees e Sean Payton.',
      legends:[['Drew Brees','QB'],['Rickey Jackson','LB'],['Marques Colston','WR']],
      kits:[['Principal','Preto e dourado','#111111','#c6a969','#c6a969','#c6a969','#ffffff'],['Visitante','Branco e dourado','#ffffff','#111111','#111111','#c6a969','#c6a969'],['Color Rush','Branco com dourado','#ffffff','#b99d5b','#ffffff','#ffffff','#b99d5b']]
    },
    {
      name:'New York Giants', code:'nyg', league:'NFC', division:'Leste', founded:'1925',
      city:'East Rutherford, Nova Jersey', stadium:'MetLife Stadium', primary:'#3976d2',
      history:'Os Giants estão na NFL desde 1925 e integram a história das primeiras décadas da liga. Venceram quatro Super Bowls, incluindo as duas campanhas de Eli Manning com triunfos sobre os Patriots.',
      legends:[['Lawrence Taylor','LB'],['Eli Manning','QB'],['Michael Strahan','DE']],
      kits:[['Principal','Azul royal e branco','#1954a6','#ffffff','#ffffff','#1954a6','#d1323c'],['Visitante','Branco e vermelho','#ffffff','#cc2936','#b6c4cf','#1954a6','#1954a6'],['Retrô','Vermelho e azul','#bb2435','#ffffff','#ffffff','#1954a6','#1954a6']]
    },
    {
      name:'New York Jets', code:'nyj', league:'AFC', division:'Leste', founded:'1960',
      city:'East Rutherford, Nova Jersey', stadium:'MetLife Stadium', primary:'#39a66b',
      history:'A franquia estreou em 1960 como New York Titans e adotou o nome Jets em 1963. O título do Super Bowl III, após a promessa de vitória de Joe Namath, continua sendo seu momento mais emblemático.',
      legends:[['Joe Namath','QB'],['Curtis Martin','RB'],['Darrelle Revis','CB']],
      kits:[['Principal','Verde e branco','#125c3c','#ffffff','#ffffff','#125c3c','#ffffff'],['Visitante','Branco e verde','#ffffff','#125c3c','#125c3c','#125c3c','#125c3c'],['Alternativo','Preto e verde','#101514','#ffffff','#101514','#101514','#125c3c']]
    },
    {
      name:'Philadelphia Eagles', code:'phi', league:'NFC', division:'Leste', founded:'1933',
      city:'Filadélfia, Pensilvânia', stadium:'Lincoln Financial Field', primary:'#2b9d9a',
      history:'Os Eagles nasceram em 1933 e construíram uma das torcidas mais apaixonadas da NFL. Conquistaram os Super Bowls LII e LIX, somando os títulos modernos aos campeonatos da era anterior ao Super Bowl.',
      legends:[['Reggie White','DE'],['Brian Dawkins','S'],['Jason Kelce','C']],
      kits:[['Principal','Verde meia-noite e branco','#004c54','#ffffff','#ffffff','#004c54','#a5acaf'],['Visitante','Branco e verde','#ffffff','#004c54','#004c54','#004c54','#a5acaf'],['Kelly Green','Verde histórico','#14864e','#ffffff','#d1d5d9','#14864e','#ffffff']]
    },
    {
      name:'Pittsburgh Steelers', code:'pit', league:'AFC', division:'Norte', founded:'1933',
      city:'Pittsburgh, Pensilvânia', stadium:'Acrisure Stadium', primary:'#ffb612',
      history:'Fundados em 1933, os Steelers ficaram famosos pela Steel Curtain na década de 1970. Ganharam seis Super Bowls e se tornaram uma referência de estabilidade, defesa forte e tradição em preto e dourado.',
      legends:[['Joe Greene','DT'],['Terry Bradshaw','QB'],['Troy Polamalu','S']],
      kits:[['Principal','Preto e dourado','#111111','#ffb612','#ffb612','#111111','#ffffff'],['Visitante','Branco e dourado','#ffffff','#111111','#ffb612','#111111','#ffb612'],['Color Rush','Preto sobre preto','#111111','#ffb612','#111111','#111111','#ffb612']]
    },
    {
      name:'San Francisco 49ers', code:'sf', league:'NFC', division:'Oeste', founded:'1946',
      city:'Santa Clara, Califórnia', stadium:"Levi's Stadium", primary:'#ed4a4a',
      history:'Fundados em 1946 na AAFC, os 49ers entraram na NFL em 1950. Nas décadas de 1980 e 1990, Bill Walsh, Joe Montana, Jerry Rice e Steve Young conduziram a franquia a cinco títulos de Super Bowl.',
      legends:[['Joe Montana','QB'],['Jerry Rice','WR'],['Ronnie Lott','S']],
      kits:[['Principal','Vermelho e dourado','#aa132b','#ffffff','#b9a15a','#b9a15a','#ffffff'],['Visitante','Branco e vermelho','#ffffff','#aa132b','#b9a15a','#b9a15a','#aa132b'],['Retrô 1994','Vermelho e branco','#b41e2d','#ffffff','#ffffff','#b41e2d','#171717']]
    },
    {
      name:'Seattle Seahawks', code:'sea', league:'NFC', division:'Oeste', founded:'1976',
      city:'Seattle, Washington', stadium:'Lumen Field', primary:'#75d323',
      history:'Os Seahawks estrearam em 1976, primeiro na NFC e depois na AFC, retornando à NFC em 2002. Ficaram célebres pela defesa Legion of Boom, campeã do Super Bowl XLVIII, e voltaram ao topo no Super Bowl LX.',
      legends:[['Steve Largent','WR'],['Walter Jones','OT'],['Marshawn Lynch','RB']],
      kits:[['Principal','Azul-marinho e verde','#0a203f','#ffffff','#0a203f','#0a203f','#76d323'],['Visitante','Branco e azul','#ffffff','#0a203f','#ffffff','#0a203f','#76d323'],['Action Green','Verde fluorescente','#76d323','#0a203f','#76d323','#0a203f','#0a203f']]
    },
    {
      name:'Tampa Bay Buccaneers', code:'tb', league:'NFC', division:'Sul', founded:'1976',
      city:'Tampa, Flórida', stadium:'Raymond James Stadium', primary:'#dc3545',
      history:'Os Buccaneers entraram na NFL em 1976 e superaram um início difícil para conquistar os Super Bowls XXXVII e LV. O primeiro título foi sustentado por uma defesa lendária; o segundo veio com Tom Brady.',
      legends:[['Derrick Brooks','LB'],['Warren Sapp','DT'],['Mike Evans','WR']],
      kits:[['Principal','Vermelho e estanho','#d42f34','#ffffff','#707275','#707275','#111111'],['Visitante','Branco e vermelho','#ffffff','#d42f34','#707275','#707275','#111111'],['Alternativo','Estanho escuro','#51565b','#ffffff','#51565b','#51565b','#d42f34']]
    },
    {
      name:'Tennessee Titans', code:'ten', league:'AFC', division:'Sul', founded:'1960',
      city:'Nashville, Tennessee', stadium:'Nissan Stadium', primary:'#4baddb',
      history:'A franquia nasceu como Houston Oilers em 1960 e mudou-se para Tennessee em 1997, adotando o nome Titans em 1999. Disputou o Super Bowl XXXIV e, em 2026, revelou nova identidade visual inspirada na história dos Oilers.',
      legends:[['Earl Campbell','RB'],['Steve McNair','QB'],['Derrick Henry','RB']],
      kits:[['Principal 2026','Azul Titans e branco','#54b3df','#ffffff','#ffffff','#ffffff','#d71939'],['Visitante 2026','Branco e azul-claro','#ffffff','#54b3df','#54b3df','#ffffff','#d71939'],['Music City','Azul-marinho alternativo','#0d2d52','#59b4df','#0d2d52','#54b3df','#e63251']]
    },
    {
      name:'Washington Commanders', code:'wsh', league:'NFC', division:'Leste', founded:'1932',
      city:'Landover, Maryland', stadium:'Northwest Stadium', primary:'#ffb612',
      history:'Fundados em 1932 como Boston Braves, os Commanders atravessaram décadas sob diferentes nomes e se estabeleceram na região de Washington. Venceram três Super Bowls nas temporadas 1982, 1987 e 1991.',
      legends:[['Sammy Baugh','QB'],['John Riggins','RB'],['Darrell Green','CB']],
      kits:[['Principal','Bordô e dourado','#5a1414','#ffb612','#ffb612','#5a1414','#ffb612'],['Visitante','Branco e bordô','#ffffff','#5a1414','#5a1414','#5a1414','#ffb612'],['Alternativo','Preto e dourado','#111111','#ffb612','#111111','#111111','#5a1414']]
    }
  ];

  // Associação 1:1 dos 32 arquivos enviados aos respectivos times.
  const uniformPhotos = {
    "ari": "uniformes/ari.webp",
    "atl": "uniformes/atl.webp",
    "bal": "uniformes/bal.webp",
    "buf": "uniformes/buf.webp",
    "car": "uniformes/car.webp",
    "chi": "uniformes/chi.webp",
    "cin": "uniformes/cin.webp",
    "cle": "uniformes/cle.webp",
    "dal": "uniformes/dal.webp",
    "den": "uniformes/den.webp",
    "det": "uniformes/det.webp",
    "gb": "uniformes/gb.webp",
    "hou": "uniformes/hou.webp",
    "ind": "uniformes/ind.webp",
    "jax": "uniformes/jax.webp",
    "kc": "uniformes/kc.webp",
    "lv": "uniformes/lv.webp",
    "lac": "uniformes/lac.webp",
    "lar": "uniformes/lar.webp",
    "mia": "uniformes/mia.webp",
    "min": "uniformes/min.webp",
    "ne": "uniformes/ne.webp",
    "no": "uniformes/no.webp",
    "nyg": "uniformes/nyg.webp",
    "nyj": "uniformes/nyj.webp",
    "phi": "uniformes/phi.webp",
    "pit": "uniformes/pit.webp",
    "sf": "uniformes/sf.webp",
    "sea": "uniformes/sea.webp",
    "tb": "uniformes/tb.webp",
    "ten": "uniformes/ten.webp",
    "wsh": "uniformes/wsh.webp"
};

  const grid = root.querySelector('#nflf-team-grid');
  const dialog = root.querySelector('#nflf-dialog');
  const detail = root.querySelector('#nflf-dialog-content');
  const closeButton = root.querySelector('#nflf-close');
  const count = root.querySelector('#nflf-result-count');
  const empty = root.querySelector('#nflf-empty');
  const search = root.querySelector('#nflf-search');
  let conference = 'Todas';
  let division = 'Todas';
  let previouslyFocused = null;

  const logoUrl = code => `https://a.espncdn.com/i/teamlogos/nfl/500/${code}.png`;
  const fold = text => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const slug = name => fold(name).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const rgba = (hex, alpha) => {
    const h = hex.replace('#','');
    const full = h.length===3 ? h.split('').map(x=>x+x).join('') : h;
    const n = parseInt(full,16);
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${alpha})`;
  };
  // Fallback se a imagem do escudo falhar, inclusive com bloqueadores de conteúdo.
  function enableLogoFallback(scope) {
    scope.querySelectorAll('img[data-nflf-logo]').forEach(img => {
      img.addEventListener('error', () => {
        const parent = img.parentElement;
        if (!parent) return;
        const mark = document.createElement('span');
        mark.className = 'nflf-logo-fallback';
        mark.textContent = img.getAttribute('data-code').toUpperCase();
        img.replaceWith(mark);
      }, {once:true});
    });
  }
  function card(t) {
    return `<button type="button" class="nflf-team-card" data-team="${t.code}" style="--team-color:${t.primary}" aria-label="Abrir detalhes de ${esc(t.name)}">
        <span class="nflf-card-top">
          <span class="nflf-logo-frame"><img data-nflf-logo data-code="${t.code}" loading="lazy" src="${logoUrl(t.code)}" alt="Escudo do ${esc(t.name)}"></span>
          <span class="nflf-conference-tag">${t.league}</span>
        </span>
        <span class="nflf-card-bottom">
          <span class="nflf-team-title">${esc(t.name)}</span>
          <span class="nflf-card-meta">${esc(t.league)} ${esc(t.division)} <span aria-hidden="true"></span> ${esc(t.founded)}</span>
          <span class="nflf-card-link">CONHECER FRANQUIA <b aria-hidden="true">↗</b></span>
        </span>
      </button>`;
  }
  function render() {
    const q = fold(search.value.trim());
    const filtered = teams.filter(t =>
      (conference === 'Todas' || t.league === conference) &&
      (division === 'Todas' || t.division === division) &&
      (!q || fold([t.name,t.league,t.division,t.stadium,t.city,t.history, ...t.legends.flat()].join(' ')).includes(q))
    );
    grid.innerHTML = filtered.map(card).join('');
    count.textContent = `${filtered.length} ${filtered.length===1?'franquia encontrada':'franquias encontradas'}`;
    empty.hidden = filtered.length !== 0;
    enableLogoFallback(grid);
  }
  function realUniformHtml(t) {
    const src = uniformPhotos[t.code];
    if (!src) return '<p class="nflf-kit-disclaimer">Imagem não cadastrada para esta franquia.</p>';
    return `<figure class="nflf-uniform-board">
      <div class="nflf-uniform-board-heading">
        <div><span class="nflf-board-eyebrow">COLEÇÃO DE UNIFORMES</span><strong>${esc(t.name)}</strong></div>
        <span class="nflf-board-chip">Imagem enviada pelo usuário</span>
      </div>
      <div class="nflf-uniform-board-frame">
        <img class="nflf-uniform-board-img" src="${esc(src)}" alt="Imagem contendo os uniformes do ${esc(t.name)} lado a lado" loading="eager" decoding="async">
        <div class="nflf-uniform-board-error" hidden>Não foi possível carregar a imagem. Confira se a pasta <code>uniformes</code> está junto ao HTML e ao JavaScript.</div>
      </div>
    </figure>`;
  }
  function showTeam(code) {
    const t = teams.find(x=>x.code===code);
    if (!t) return;
    previouslyFocused = document.activeElement;
    dialog.style.setProperty('--team-color',t.primary);
    dialog.style.setProperty('--team-glow',rgba(t.primary,.27));
    detail.innerHTML = `
      <header class="nflf-detail-head">
        <img class="nflf-detail-logo" data-nflf-logo data-code="${t.code}" src="${logoUrl(t.code)}" alt="Escudo do ${esc(t.name)}">
        <div>
          <p class="nflf-detail-overline">${t.league} · DIVISÃO ${esc(t.division.toUpperCase())}</p>
          <h2 id="nflf-dialog-title">${esc(t.name)}</h2>
          <p class="nflf-detail-location">${esc(t.city)}</p>
        </div>
      </header>
      <div class="nflf-detail-body">
        <div class="nflf-detail-facts">
          <div class="nflf-detail-fact"><small>Franquia desde</small><strong>${esc(t.founded)}</strong></div>
          <div class="nflf-detail-fact"><small>Conferência / divisão</small><strong>${t.league} ${esc(t.division)}</strong></div>
          <div class="nflf-detail-fact"><small>Estádio (2026)</small><strong>${esc(t.stadium)}</strong></div>
        </div>
        ${t.stadiumNote ? `<p class="nflf-stadium-note">ℹ ${esc(t.stadiumNote)}</p>` : ''}
        <h3>A história da franquia</h3>
        <p class="nflf-history">${esc(t.history)}</p>
        <h3>Três nomes históricos</h3>
        <div class="nflf-legend-grid">
          ${t.legends.map(([name,pos],i)=>`<div class="nflf-legend"><span>LENDÁRIO · 0${i+1}</span><strong>${esc(name)}</strong><small>${esc(pos)}</small></div>`).join('')}
        </div>
        <h3>Identidade visual: uniformes</h3>
        <div class="nflf-real-uniforms">${realUniformHtml(t)}</div>
        <div class="nflf-detail-links"><a href="https://www.nfl.com/teams/${slug(t.name)}/" target="_blank" rel="noopener noreferrer">Página oficial na NFL <span aria-hidden="true">↗</span></a></div>
      </div>`;
    enableLogoFallback(detail);
    const photoImg = detail.querySelector('.nflf-uniform-board-img');
    if (photoImg) photoImg.addEventListener('error', () => {
      photoImg.hidden = true;
      const errorBox = detail.querySelector('.nflf-uniform-board-error');
      if (errorBox) errorBox.hidden = false;
    }, {once:true});
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open','');
    closeButton.focus();
  }
  function closeTeam() {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    if (previouslyFocused && previouslyFocused.isConnected) previouslyFocused.focus();
  }

  grid.addEventListener('click', event => {
    const btn = event.target.closest('button[data-team]');
    if (btn) showTeam(btn.dataset.team);
  });
  root.querySelectorAll('button[data-conference]').forEach(btn => {
    btn.addEventListener('click', () => {
      conference = btn.dataset.conference;
      root.querySelectorAll('button[data-conference]').forEach(b=>{
        const active = b===btn; b.classList.toggle('is-active',active); b.setAttribute('aria-pressed',String(active));
      });
      render();
    });
  });
  root.querySelectorAll('button[data-division]').forEach(btn => {
    btn.addEventListener('click', () => {
      division = btn.dataset.division;
      root.querySelectorAll('button[data-division]').forEach(b=>{
        const active = b===btn; b.classList.toggle('is-active',active); b.setAttribute('aria-pressed',String(active));
      });
      render();
    });
  });
  search.addEventListener('input', render);
  root.querySelector('#nflf-clear').addEventListener('click', () => {
    search.value='';
    root.querySelector('button[data-conference="Todas"]').click();
    root.querySelector('button[data-division="Todas"]').click();
    search.focus();
  });
  closeButton.addEventListener('click',closeTeam);
  dialog.addEventListener('click',event => {if(event.target===dialog)closeTeam();});
  dialog.addEventListener('close',()=>{if (previouslyFocused?.isConnected) previouslyFocused.focus();});
  render();
})();
