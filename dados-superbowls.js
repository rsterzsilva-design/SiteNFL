/*
 * DADOS HISTÓRICOS DOS 60 SUPER BOWLS (1967–2026)
 * Pontuações: primeiro o campeão, depois o vice.
 * Fontes de consulta: Pro Football Reference, lista histórica de campeões,
 * Pro Football Mania (parciais por quarto), Sporting News (intervalo).
 * Alterações de conteúdo podem ser feitas apenas neste arquivo.
 */
(() => {
  'use strict';

  const confrontos = `
Green Bay Packers|Kansas City Chiefs|35-10|Bart Starr
Green Bay Packers|Oakland Raiders|33-14|Bart Starr
New York Jets|Baltimore Colts|16-7|Joe Namath
Kansas City Chiefs|Minnesota Vikings|23-7|Len Dawson
Baltimore Colts|Dallas Cowboys|16-13|Chuck Howley (Dallas Cowboys)
Dallas Cowboys|Miami Dolphins|24-3|Roger Staubach
Miami Dolphins|Washington Redskins|14-7|Jake Scott
Miami Dolphins|Minnesota Vikings|24-7|Larry Csonka
Pittsburgh Steelers|Minnesota Vikings|16-6|Franco Harris
Pittsburgh Steelers|Dallas Cowboys|21-17|Lynn Swann
Oakland Raiders|Minnesota Vikings|32-14|Fred Biletnikoff
Dallas Cowboys|Denver Broncos|27-10|Randy White e Harvey Martin
Pittsburgh Steelers|Dallas Cowboys|35-31|Terry Bradshaw
Pittsburgh Steelers|Los Angeles Rams|31-19|Terry Bradshaw
Oakland Raiders|Philadelphia Eagles|27-10|Jim Plunkett
San Francisco 49ers|Cincinnati Bengals|26-21|Joe Montana
Washington Redskins|Miami Dolphins|27-17|John Riggins
Los Angeles Raiders|Washington Redskins|38-9|Marcus Allen
San Francisco 49ers|Miami Dolphins|38-16|Joe Montana
Chicago Bears|New England Patriots|46-10|Richard Dent
New York Giants|Denver Broncos|39-20|Phil Simms
Washington Redskins|Denver Broncos|42-10|Doug Williams
San Francisco 49ers|Cincinnati Bengals|20-16|Jerry Rice
San Francisco 49ers|Denver Broncos|55-10|Joe Montana
New York Giants|Buffalo Bills|20-19|Ottis Anderson
Washington Redskins|Buffalo Bills|37-24|Mark Rypien
Dallas Cowboys|Buffalo Bills|52-17|Troy Aikman
Dallas Cowboys|Buffalo Bills|30-13|Emmitt Smith
San Francisco 49ers|San Diego Chargers|49-26|Steve Young
Dallas Cowboys|Pittsburgh Steelers|27-17|Larry Brown
Green Bay Packers|New England Patriots|35-21|Desmond Howard
Denver Broncos|Green Bay Packers|31-24|Terrell Davis
Denver Broncos|Atlanta Falcons|34-19|John Elway
St. Louis Rams|Tennessee Titans|23-16|Kurt Warner
Baltimore Ravens|New York Giants|34-7|Ray Lewis
New England Patriots|St. Louis Rams|20-17|Tom Brady
Tampa Bay Buccaneers|Oakland Raiders|48-21|Dexter Jackson
New England Patriots|Carolina Panthers|32-29|Tom Brady
New England Patriots|Philadelphia Eagles|24-21|Deion Branch
Pittsburgh Steelers|Seattle Seahawks|21-10|Hines Ward
Indianapolis Colts|Chicago Bears|29-17|Peyton Manning
New York Giants|New England Patriots|17-14|Eli Manning
Pittsburgh Steelers|Arizona Cardinals|27-23|Santonio Holmes
New Orleans Saints|Indianapolis Colts|31-17|Drew Brees
Green Bay Packers|Pittsburgh Steelers|31-25|Aaron Rodgers
New York Giants|New England Patriots|21-17|Eli Manning
Baltimore Ravens|San Francisco 49ers|34-31|Joe Flacco
Seattle Seahawks|Denver Broncos|43-8|Malcolm Smith
New England Patriots|Seattle Seahawks|28-24|Tom Brady
Denver Broncos|Carolina Panthers|24-10|Von Miller
New England Patriots|Atlanta Falcons|34-28|Tom Brady
Philadelphia Eagles|New England Patriots|41-33|Nick Foles
New England Patriots|Los Angeles Rams|13-3|Julian Edelman
Kansas City Chiefs|San Francisco 49ers|31-20|Patrick Mahomes
Tampa Bay Buccaneers|Kansas City Chiefs|31-9|Tom Brady
Los Angeles Rams|Cincinnati Bengals|23-20|Cooper Kupp
Kansas City Chiefs|Philadelphia Eagles|38-35|Patrick Mahomes
Kansas City Chiefs|San Francisco 49ers|25-22|Patrick Mahomes
Philadelphia Eagles|Kansas City Chiefs|40-22|Jalen Hurts
Seattle Seahawks|New England Patriots|29-13|Kenneth Walker III
`.trim().split('\n');

  // Parciais acumuladas do CAMPEÃO e do VICE ao final de cada quarto.
  // Se houve prorrogação, uma quinta parcial é acrescentada.
  const parciais = `
7-0 14-10 28-10 35-10
3-0 16-7 26-7 33-14
0-0 7-0 13-0 16-7
3-0 16-0 23-7 23-7
0-3 6-13 6-13 16-13
3-0 10-3 17-3 24-3
7-0 14-0 14-0 14-7
14-0 17-0 24-0 24-7
0-0 2-0 9-0 16-6
7-7 7-10 7-10 21-17
0-0 16-0 19-7 32-14
10-0 13-0 20-10 27-10
7-7 21-14 21-17 35-31
3-7 10-13 17-19 31-19
14-0 14-3 24-3 27-10
7-0 20-0 20-7 26-21
0-7 10-17 13-17 27-17
7-0 21-3 35-9 38-9
7-10 28-16 38-16 38-16
13-3 23-3 44-3 46-10
7-10 9-10 26-10 39-20
0-10 35-10 35-10 42-10
3-0 3-3 6-13 20-16
13-3 27-3 41-10 55-10
3-3 10-12 17-12 20-19
0-0 17-0 31-10 37-24
14-7 28-10 31-17 52-17
6-3 6-13 20-13 30-13
14-7 28-10 42-18 49-26
10-0 13-7 20-7 27-17
10-14 27-14 35-21 35-21
7-7 17-14 24-17 31-24
7-3 17-6 17-6 34-19
3-0 9-0 16-6 23-16
7-0 10-0 24-7 34-7
0-3 14-3 17-3 20-17
3-3 20-3 34-9 48-21
0-0 14-10 14-10 32-29
0-0 7-7 14-14 24-21
0-3 7-3 14-10 21-10
6-14 16-14 22-17 29-17
3-0 3-7 3-7 17-14
3-0 17-7 20-7 27-23
0-10 6-10 16-17 31-17
14-0 21-10 21-17 31-25
9-0 9-10 15-17 21-17
7-3 21-6 28-23 34-31
8-0 22-0 36-8 43-8
0-0 14-14 14-24 28-24
10-0 13-7 16-7 24-10
0-0 3-21 9-28 28-28 34-28
9-3 22-12 29-26 41-33
0-0 3-0 3-3 13-3
7-3 10-10 10-20 31-20
7-3 21-6 31-9 31-9
7-3 13-10 16-20 23-20
7-7 14-24 21-27 38-35
0-0 3-10 13-10 19-19 25-22
7-0 24-0 34-6 40-22
3-0 9-0 12-0 29-13
`.trim().split('\n');

  const publicos = `
61946 75546 75389 80562 79204 81023 90182 71882 80997 80187
103438 76400 79484 103985 76135 81270 103667 72980 84059 73818
101063 73302 75129 72919 73813 63130 98374 72817 74107 76347
72301 68912 74803 72625 71921 72922 67603 71525 78125 68206
74512 71101 70774 74059 103219 68658 71024 82529 70288 71088
70807 67612 70081 62417 24835 70048 67827 61629 65719 70823
`.trim().split(/\s+/).map(Number);

  const estadios = `
Los Angeles Memorial Coliseum
Miami Orange Bowl
Miami Orange Bowl
Tulane Stadium
Miami Orange Bowl
Tulane Stadium
Los Angeles Memorial Coliseum
Rice Stadium
Tulane Stadium
Miami Orange Bowl
Rose Bowl
Louisiana Superdome
Miami Orange Bowl
Rose Bowl
Louisiana Superdome
Pontiac Silverdome
Rose Bowl
Tampa Stadium
Stanford Stadium
Louisiana Superdome
Rose Bowl
Jack Murphy Stadium
Joe Robbie Stadium
Louisiana Superdome
Tampa Stadium
Metrodome
Rose Bowl
Georgia Dome
Joe Robbie Stadium
Sun Devil Stadium
Louisiana Superdome
Qualcomm Stadium
Pro Player Stadium
Georgia Dome
Raymond James Stadium
Louisiana Superdome
Qualcomm Stadium
Reliant Stadium
Alltel Stadium
Ford Field
Dolphin Stadium
University of Phoenix Stadium
Raymond James Stadium
Sun Life Stadium
Cowboys Stadium
Lucas Oil Stadium
Mercedes-Benz Superdome
MetLife Stadium
University of Phoenix Stadium
Levi's Stadium
NRG Stadium
U.S. Bank Stadium
Mercedes-Benz Stadium
Hard Rock Stadium
Raymond James Stadium
SoFi Stadium
State Farm Stadium
Allegiant Stadium
Caesars Superdome
Levi's Stadium
`.trim().split('\n');

  const shows = `
Bandas das universidades de Arizona e Grambling State
Bandas escolares da região de Miami
Banda da Florida A&M University
Carol Channing e bandas marciais
Banda da Florida A&M University
Ella Fitzgerald, Carol Channing e Al Hirt
Banda da Universidade de Michigan e Woody Herman
Banda da Universidade do Texas
Homenagem a Duke Ellington com Mercer Ellington
Up with People (tributo ao bicentenário dos EUA)
Disney: It's a Small World e banda All-City de Los Angeles
Pete Fountain e Al Hirt
Homenagem ao Caribe com grupos musicais
Tributo à era das big bands e Up with People
Festival de Mardi Gras
Tributo aos anos 1960 e à Motown
KaleidoSUPERscope
Tributo aos astros do cinema
A World of Children's Dreams
Beat of the Future
Tributo ao centenário de Hollywood
Rockettes e Chubby Checker
Be Bop Bamboozled
Pete Fountain, Doug Kershaw e Irma Thomas
New Kids on the Block
Gloria Estefan e espetáculo Winter Magic
Michael Jackson
Clint Black, Tanya Tucker, Travis Tritt e as Judds
Tony Bennett, Patti LaBelle e Miami Sound Machine
Diana Ross
Blues Brothers, James Brown e ZZ Top
Boyz II Men, Smokey Robinson, Queen Latifah e The Temptations
Stevie Wonder, Gloria Estefan e Big Bad Voodoo Daddy
Phil Collins, Christina Aguilera, Enrique Iglesias e Toni Braxton
Aerosmith, NSYNC, Britney Spears, Mary J. Blige e Nelly
U2
Shania Twain, No Doubt e Sting
Janet Jackson, Justin Timberlake, P. Diddy, Nelly e Kid Rock
Paul McCartney
The Rolling Stones
Prince
Tom Petty and the Heartbreakers
Bruce Springsteen e E Street Band
The Who
Black Eyed Peas, Usher e Slash
Madonna, Nicki Minaj, M.I.A., LMFAO e CeeLo Green
Beyoncé e Destiny's Child
Bruno Mars e Red Hot Chili Peppers
Katy Perry, Lenny Kravitz e Missy Elliott
Coldplay, Beyoncé e Bruno Mars
Lady Gaga
Justin Timberlake
Maroon 5, Travis Scott e Big Boi
Jennifer Lopez, Shakira, Bad Bunny e J Balvin
The Weeknd
Dr. Dre, Snoop Dogg, Eminem, Mary J. Blige e Kendrick Lamar
Rihanna
Usher e convidados
Kendrick Lamar e SZA
Bad Bunny com Lady Gaga e Ricky Martin
`.trim().split('\n');

  // Dia e mês do jogo, na ordem das edições I a LX. O ano é 1966 + edição.
  const dias = `
01-15 01-14 01-12 01-11 01-17 01-16 01-14 01-13 01-12 01-18
01-09 01-15 01-21 01-20 01-25 01-24 01-30 01-22 01-20 01-26
01-25 01-31 01-22 01-28 01-27 01-26 01-31 01-30 01-29 01-28
01-26 01-25 01-31 01-30 01-28 02-03 01-26 02-01 02-06 02-05
02-04 02-03 02-01 02-07 02-06 02-05 02-03 02-02 02-01 02-07
02-05 02-04 02-03 02-02 02-07 02-13 02-12 02-11 02-09 02-08
`.trim().split(/\s+/);

  // Resumos autorais, em linguagem simples. Um por edição.
  const resumos = `
A decisão inaugural ficou equilibrada até o intervalo, mas Green Bay dominou o segundo tempo. Bart Starr comandou o ataque e Max McGee marcou duas vezes.
Os Packers de Vince Lombardi voltaram a superar um rival da AFL. Green Bay ampliou a vantagem na segunda metade e conquistou o bicampeonato.
Joe Namath conduziu o New York Jets à vitória sobre o favorito Baltimore Colts. A surpresa ajudou a consolidar o prestígio da AFL.
A defesa dos Chiefs conteve o ataque de Minnesota, enquanto Kansas City construiu uma vantagem sólida antes do intervalo.
Em uma final marcada por erros e reviravoltas, Baltimore conquistou a vitória com um field goal nos instantes finais. Chuck Howley, de Dallas, foi o MVP mesmo com a derrota.
Dallas controlou o jogo com sua defesa e seu ataque terrestre. Roger Staubach comandou a conquista do primeiro Super Bowl dos Cowboys.
Miami limitou Washington a apenas sete pontos e completou sua temporada perfeita, invicta do começo ao fim.
Com Larry Csonka liderando as corridas, os Dolphins dominaram os Vikings e conquistaram o segundo título consecutivo.
A defesa de Pittsburgh impôs seu ritmo e segurou os Vikings. Foi o primeiro título dos Steelers em um Super Bowl.
As recepções de Lynn Swann foram determinantes em uma partida disputada até os últimos minutos contra Dallas.
Oakland chegou ao intervalo vencendo por 16 a 0. Uma interceptação retornada para touchdown por Willie Brown ajudou a assegurar o primeiro título dos Raiders.
Dallas se aproveitou dos erros de Denver e dominou a partida. Randy White e Harvey Martin dividiram o prêmio de MVP.
Steelers e Cowboys protagonizaram uma disputa de muitos pontos. Pittsburgh resistiu à reação de Dallas no último quarto.
O Los Angeles Rams chegou a liderar no terceiro quarto, mas Pittsburgh reagiu no período final para conquistar seu quarto título.
Com Jim Plunkett no comando, os Raiders abriram vantagem cedo e impediram uma reação dos Eagles.
San Francisco construiu uma vantagem de 20 a 0 no intervalo. Cincinnati reagiu depois, mas a equipe de Joe Montana preservou a vitória.
Com Washington atrás do placar, John Riggins conseguiu um touchdown decisivo em quarta descida, encaminhando a virada sobre Miami.
Marcus Allen brilhou com uma corrida histórica de 74 jardas para touchdown. Os Raiders superaram Washington por ampla margem.
Joe Montana comandou o ataque de San Francisco diante dos Dolphins de Dan Marino, em uma final de grande produção ofensiva.
A defesa dos Bears de 1985 pressionou os Patriots durante toda a partida, garantindo a vitória por larga diferença.
Denver chegou a liderar no intervalo, mas os Giants dominaram a segunda metade. Phil Simms foi o MVP.
Depois de sair perdendo por 10 a 0, Washington anotou 35 pontos no segundo quarto e mudou completamente a decisão.
Joe Montana encontrou John Taylor para um touchdown nos minutos finais, coroando a virada dos 49ers sobre Cincinnati.
San Francisco abriu grande vantagem desde o início e derrotou Denver por 55 a 10, um placar histórico.
Os Giants venceram um jogo equilibrado decidido no fim, quando um field goal de Buffalo passou à direita das traves.
Washington construiu vantagem de 17 a 0 no intervalo e controlou a reação dos Bills para levantar o troféu.
Dallas aproveitou sucessivos turnovers de Buffalo e venceu por 52 a 17. Troy Aikman comandou o ataque campeão.
Buffalo liderava no intervalo, mas Dallas assumiu o controle no segundo tempo, com destaque para Emmitt Smith.
Steve Young comandou o ataque dos 49ers com seis passes para touchdown, superando San Diego.
A defesa de Dallas conseguiu interceptações decisivas de Larry Brown e ajudou os Cowboys a garantir o título.
Green Bay retomou a liderança contra New England e confirmou a vitória com um retorno de kickoff para touchdown de Desmond Howard.
Em uma partida equilibrada, Terrell Davis marcou três touchdowns terrestres e levou Denver ao seu primeiro título.
Os Broncos de John Elway dominaram boa parte da final contra Atlanta e conquistaram o segundo título consecutivo.
O jogo terminou em uma das jogadas mais famosas da NFL: a defesa dos Rams impediu um touchdown de Tennessee a uma jarda da linha de gol.
A defesa de Baltimore dominou os Giants e comandou uma vitória convincente por 34 a 7.
Em um duelo decidido no fim, Adam Vinatieri acertou um field goal decisivo para o primeiro título dos Patriots.
A defesa de Tampa Bay interceptou repetidamente o ataque de Oakland e garantiu uma vitória por 48 a 21.
Após uma segunda metade de muitos pontos, Adam Vinatieri garantiu a vitória dos Patriots com um field goal nos segundos finais.
New England e Philadelphia chegaram empatados ao último quarto. Os Patriots fizeram os pontos decisivos e seguraram os Eagles.
Pittsburgh abriu vantagem na segunda metade e fechou a partida com um passe para touchdown em jogada ensaiada de Antwaan Randle El.
Em uma final disputada sob chuva, Indianapolis reagiu à largada dos Bears e conquistou o título com Peyton Manning.
Os Patriots chegaram invictos, mas os Giants surpreenderam. Uma recepção espetacular de David Tyree integrou a campanha da virada decisiva.
Arizona chegou a assumir a liderança no fim, mas Ben Roethlisberger conectou com Santonio Holmes para o touchdown vencedor.
Os Saints viraram sobre Indianapolis e ampliaram a vantagem com uma interceptação retornada para touchdown por Tracy Porter.
Green Bay abriu vantagem cedo, mas precisou resistir à recuperação dos Steelers até o apito final.
Os Giants tomaram a liderança no último quarto depois de uma campanha conduzida por Eli Manning e seguraram os Patriots.
Baltimore construiu grande vantagem, mas San Francisco reagiu após uma interrupção elétrica. Os Ravens preservaram a vitória.
Seattle dominou Denver desde as primeiras jogadas, com defesa agressiva, turnovers e pontos em todos os períodos.
Os Patriots viraram na reta final. Uma interceptação de Malcolm Butler perto da linha de gol selou a vitória sobre Seattle.
A defesa de Denver comandada por Von Miller pressionou Cam Newton e assegurou o triunfo sobre Carolina.
Atlanta abriu 28 a 3 no terceiro quarto, mas New England reagiu, empatou em 28 a 28 e venceu por 34 a 28 na primeira prorrogação da história do Super Bowl. É a maior virada do evento.
Philadelphia venceu um confronto ofensivo contra os Patriots. Uma jogada especial conhecida como Philly Special ajudou a construir a vantagem dos Eagles.
As defesas dominaram, mas os Patriots encontraram o touchdown decisivo no último quarto e venceram por 13 a 3.
Kansas City começou o quarto período perdendo por 20 a 10. Patrick Mahomes liderou a virada que deu aos Chiefs seu primeiro título em 50 anos.
Tampa Bay limitou o poderoso ataque de Kansas City e dominou a final. Tom Brady conquistou seu sétimo título.
Cincinnati liderava no último quarto, até Matthew Stafford encontrar Cooper Kupp para o touchdown que deu o título aos Rams.
Philadelphia liderava no intervalo, mas Kansas City reagiu no segundo tempo e decidiu a partida com um field goal nos segundos finais.
O jogo foi para a prorrogação após empate de 19 a 19. Patrick Mahomes comandou a campanha do touchdown que garantiu o título dos Chiefs.
Os Eagles construíram vantagem de 24 a 0 até o intervalo e dominaram Kansas City antes da reação tardia do adversário.
Seattle anulou o ataque de New England nos três primeiros quartos. Jason Myers acertou cinco field goals e a defesa dos Seahawks confirmou o título por 29 a 13.
`.trim().split('\n');

  function romano(numero) {
    const algarismos = [
      [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];
    let resto = numero;
    let resultado = '';
    for (const [quantidade, simbolo] of algarismos) {
      while (resto >= quantidade) {
        resultado += simbolo;
        resto -= quantidade;
      }
    }
    return resultado;
  }

  function porQuarto(linha) {
    let anterior = [0, 0];
    return linha.trim().split(/\s+/).map((placar) => {
      const atual = placar.split('-').map(Number);
      const pontuacao = [atual[0] - anterior[0], atual[1] - anterior[1]];
      anterior = atual;
      return pontuacao;
    });
  }

  const quantidades = [confrontos, parciais, publicos, estadios, shows, dias, resumos].map(item => item.length);
  if (quantidades.some(n => n !== 60)) {
    console.error('[Super Bowls] A base histórica deve conter 60 entradas por campo.', quantidades);
    return;
  }

  const dados = confrontos.map((linha, indice) => {
    const numero = indice + 1;
    const [campeao, vice, placar, mvp] = linha.split('|');
    const [pontosCampeao, pontosVice] = placar.split('-').map(Number);
    const quartos = porQuarto(parciais[indice]);
    const soma = quartos.reduce((total, [a, b]) => [total[0] + a, total[1] + b], [0, 0]);
    if (soma[0] !== pontosCampeao || soma[1] !== pontosVice || quartos.some(q => q.some(p => p < 0))) {
      console.error('[Super Bowls] Pontuação inconsistente na edição', numero);
    }
    const ano = 1966 + numero;
    return {
      numero,
      romano: romano(numero),
      nomeExibicao: numero === 50 ? 'Super Bowl 50' : `Super Bowl ${romano(numero)}`,
      ano,
      data: `${ano}-${dias[indice]}`,
      campeao,
      vice,
      pontosCampeao,
      pontosVice,
      mvp,
      estadio: estadios[indice],
      publico: publicos[indice],
      show: shows[indice],
      quartos,
      resumo: resumos[indice],
      fonte: numero === 50
        ? 'https://en.wikipedia.org/wiki/Super_Bowl_50'
        : `https://en.wikipedia.org/wiki/Super_Bowl_${romano(numero)}`
    };
  });

  window.NFL_SUPERBOWLS = Object.freeze(dados);
})();
