// Skyryba (punctuation) data. Load after data.js (uses esc, norm).

const SK_CATS = {
  salutinis:  { name: "Sudėtinio prijungiamojo sakinio skyryba" },
  vienarusis: { name: "Vienarūšės sakinio dalys" },
  sujung:     { name: "Sudėtiniai sujungiamieji ir bejungtukiai sakiniai" },
  iterpinys:  { name: "Įterpiniai" },
  aplinkybe:  { name: "Dalyvinės, padalyvinės, pusdalyvinės aplinkybės" },
  pazyminys:  { name: "Pažyminio ir priedėlio skyryba" },
  bruksnys:   { name: "Brūkšnys tarp veiksnio ir tarinio" },
  dvitaskis:  { name: "Dvitaškis ir brūkšnys" },
  nereikia:   { name: "Nereikalingi ženklai" }
};

const SK_FULL = {
  salutinis: `<p><b>Privaloma:</b> šalutinis dėmuo išskiriamas kableliais: <i>Jam rūpėjo, kad viskas būtų padaryta laiku.</i></p>
<p>Išskiriamas kartu su žodžiais ypač, nebent, juoba, juolab, tuo labiau, būtent, tai yra.</p>
<p>Vienarūšiai šalutiniai dėmenys su <b>kartojamais</b> jungtukais (ir … ir, nei … nei) skiriami nuo antrojo jungtuko. Su <b>nekartojamais</b> ir, ar, arba, nei – neskiriami: <i>kur jos išvažiavo nei kada grįš.</i></p>
<p><b>Pasirenkama:</b> kablelis tarp dviejų jungtukų (kad, kai…); po vargu, kažin prieš ar.</p>`,
  vienarusis: `<p><b>Su ir, ar, arba, bei</b> – kablelis nededamas.</p>
<p><b>Be jungtuko</b> – kablelis: <i>klausėmės, užsirašėme, sužinojome.</i></p>
<p><b>Kartojamas jungtukas</b> – kablelis prieš antrą ir tolesnius: <i>ir džiaugėmės, ir glėbesčiavomės.</i></p>
<p><b>Su o, bet, tačiau, todėl</b> – kablelis prieš jungtuką. <b>Ne tik …, bet ir</b> – kablelis prieš bet.</p>
<p><b>Apibendrinamasis žodis</b> prieš vienarūšes dalis → <b>dvitaškis</b> (<i>Kalbėk apie viską: drąsą, žygius.</i>); po jų → <b>brūkšnys</b> (<i>Sodybos, medžiai – viskas skrieja.</i>).</p>`,
  sujung: `<p><b>Sudėtinio sujungiamojo</b> sakinio dėmenys skiriami kableliu, ypač prieš o, bet, tačiau, todėl, tad: <i>Kultas buvo paplitęs, tad deivė gavo prievardžius.</i> Prieš ir, ar – paprastai be kablelio.</p>
<p><b>Bejungtukio</b> sakinio dėmenys skiriami kableliu: <i>Vieni šaltiniai pristato kaip karalių, kai kurie tyrėjai teigia…</i></p>
<p>Jei antrasis dėmuo paaiškina pirmąjį – dvitaškis; jei staigi kaita ar priešprieša – brūkšnys.</p>`,
  iterpinys: `<p><b>Įterpiniai</b> (anot mito, be abejo, žinoma, mano manymu, deja, vadinasi) išskiriami kableliais iš abiejų pusių: <i>Juk, anot mito, deivė atplaukė…</i></p>
<p>Žodžiai juk, gal, galbūt, turbūt, taigi dažniausiai neskiriami.</p>`,
  aplinkybe: `<p><b>Dalyvinės</b> (atgaivinęs statulą), <b>padalyvinės</b> (liežuviu nusidriekus) ir <b>pusdalyvinės</b> (remdamiesi užuominomis) aplinkybės su priklausomais žodžiais paprastai išskiriamos kableliais.</p>
<p>Trumpos aplinkybės (vienas žodis ar su taip) gali būti ir neskiriamos: <i>Taip gyvendamas sukūrė…</i></p>`,
  pazyminys: `<p><b>Pažyminiai po pažymimojo žodžio</b> skiriami kableliais: <i>Stovėjo namas, aukštas, dideliais langais.</i></p>
<p><b>Prieš pažymimąjį žodį</b> – neskiriami: <i>Stovėjo aukštas, dideliais langais namas. Ką tik gimusi deivė atplaukė.</i></p>
<p><b>Priedėlis</b> (pažyminys-daiktavardis) po pažymimojo žodžio skiriamas: <i>Kastytis, mano dėdė, išvyko.</i> Prieš – neskiriamas: <i>Dėdė Kastytis.</i> Su <i>vardu, pavarde</i> – neskiriamas.</p>`,
  bruksnys: `<p><b>Brūkšnys tarp veiksnio ir tarinio</b> rašomas, kai praleista jungtis <b>yra</b>: <i>Gruodis – mano mėgstamiausias mėnuo.</i></p>
<p>Brūkšnio galima ir nedėti, bet <b>kablelis – skyrybos klaida</b>.</p>`,
  dvitaskis: `<p><b>Dvitaškis:</b> po apibendrinamojo žodžio prieš vienarūšes dalis; bejungtukiame sakinyje, kai antroji dalis paaiškina pirmąją: <i>Vyksta atvirkščia metamorfozė: statula pavirsta mergina.</i></p>
<p><b>Brūkšnys:</b> po vienarūšių dalių prieš apibendrinamąjį žodį; kai antroji dalis – staigi kaita, priešprieša ar išvada. Paaiškinimui dažnai tinka ir brūkšnys.</p>`,
  nereikia: `<p><b>Kablelio nereikia:</b></p>
<p>tarp veiksnio ir tarinio (vietoj „yra“ galimas tik brūkšnys) · tarp pažyminio ir pažymimojo žodžio, kai pažyminys eina prieš · prieš nekartojamus ir, bei, ar, arba · tarp tarinio dalių (esti paženklintas) · palyginime su toks … kaip.</p>`
};
const skFullRule = cat => SK_FULL[cat] ? `<details class="full"><summary>Visa taisyklė</summary><div class="body">${SK_FULL[cat]}</div></details>` : "";

// Rules reused across gaps ("rule|type")
const S = {
  salStart: "Šalutinis dėmuo išskiriamas kableliais: kablelis prieš jungiamąjį žodį (kad, kur, kas, kuris, kokios…).|salutinis",
  salEnd: "Šalutinio dėmens pabaigoje dedamas kablelis, kai sakinys tęsiasi.|salutinis",
  vienNo: "Vienarūšės sakinio dalys be jungtuko skiriamos kableliais.|vienarusis",
  vienBet: "Prieš jungtukus o, bet, tačiau, todėl dedamas kablelis.|vienarusis",
  vienIr: "Prieš ir, bei, ar, arba (nekartojamus) kablelis nededamas.|vienarusis",
  netik: "Ne tik …, bet ir … – kablelis prieš bet.|vienarusis",
  apib: "Po apibendrinamojo žodžio prieš vienarūšes dalis dedamas dvitaškis.|vienarusis",
  suj: "Sudėtinio sujungiamojo sakinio dėmenys prieš bet, tad, todėl, o, tačiau skiriami kableliu.|sujung",
  bej: "Bejungtukio sudėtinio sakinio dėmenys skiriami kableliu.|sujung",
  iterp: "Įterpinys išskiriamas kableliais iš abiejų pusių (anot mito, be abejo).|iterpinys",
  apl: "Dalyvinė / padalyvinė / pusdalyvinė aplinkybė su priklausomais žodžiais išskiriama kableliais.|aplinkybe",
  pazPo: "Pažyminys po pažymimojo žodžio išskiriamas kableliais.|pazyminys",
  bruk: "Praleista jungtis „yra“ – galima brūkšnys (arba nieko). Kablelis tarp veiksnio ir tarinio – klaida.|bruksnys",
  dvit: "Antroji dalis paaiškina pirmąją – dedamas dvitaškis (tinka ir brūkšnys).|dvitaskis"
};

// word[answers|rule|type] = gap right after the word. "–/" = dash or nothing. Gaps without [...] need nothing.
const SK_SENTENCES = [
  "Ovidijaus „Metamorfozių“ pasakojimas apie Pigmalioną[–/|"+S.bruk+"] skirtas kūrybos klausimams.",

  "Poetas mąsto[,|"+S.salStart+"] ką sukurti leista žmogui[|Vienarūšiai šalutiniai dėmenys, sujungti nekartojamu ir, neatskiriami.|salutinis] ir koks kūrinys esti[|„esti paženklintas“ – vienas tarinys, jo dalių neskiriame.|nereikia] paženklintas tobulybės ženklu. Pigmaliono istorija užima išskirtinę vietą.",

  "Kitaip nei daugumoje šio epo pasakojimų[,|"+S.salStart+"] kur pateikiami žmogaus pavirtimo akmeniu[,|"+S.vienNo+"] medžiu ar kitu negyvu daiktu variantai[,|"+S.salEnd+"] čia vyksta atvirkščia metamorfozė[:/–|"+S.dvit+"] statula pavirsta mergina.",

  "Pasakojimo herojus[–/|"+S.bruk+"] Kipre gyvenęs talentingas menininkas Pigmalionas.",

  "Kipro sala[,|Dalyvinis pažyminys po pažymimojo žodžio (sala, plytinti…) išskiriamas kableliais.|pazyminys] plytinti Rytinėje Viduržemio jūros dalyje[,|Dalyvinio pažyminio pabaigoje dedamas kablelis.|pazyminys] garsėjo ne tik variu[,|"+S.netik+"] bet ir Afroditės kultu.",

  "Juk[,|Įterpinys „anot mito“ išskiriamas kableliais – kablelis prieš anot.|iterpinys] anot mito[,|"+S.iterp+"] ką tik iš jūros putos gimusi deivė[|„ką tik gimusi deivė“ – pažyminys prieš pažymimąjį žodį neskiriamas; tarp veiksnio ir tarinio kablelio nėra.|pazyminys] kriauklėje atplaukė į šią salą.",

  "Čia Afroditės kultas buvo labai paplitęs[,|"+S.suj+"] tad deivė gavo prievardžius Kipridė ir Kiprija.",

  "Ji garbinta[|Tarp tarinio ir aplinkybės kablelio nereikia.|nereikia] visoje saloje[:|"+S.apib+"] Amatunte[,|"+S.vienNo+"] Salamine[,|"+S.vienNo+"] Idalijuje ir kitur[,|"+S.suj+"] bet svarbiausia Afroditės kulto vieta laikytas Pafo miestas.",

  "Deivė net turėjo epitetą[/–|Pavadinimas po žodžio „epitetą“ kableliu neskiriamas (galima brūkšnys).|pazyminys] Pafija.",

  "Pigmalioną vieni mitų šaltiniai pristato kaip Kipro salos karalių[,|"+S.bej+"] kai kurie tyrėjai[,|"+S.apl+"] remdamiesi antikinėmis užuominomis[,|"+S.apl+"] teigia galimą jo ir Afroditės mylimojo Adonio tapatumą.",

  "Tačiau Ovidijus vaizduoja Pigmalioną kaip paprastą[/,|„Paprastas mirtingasis“ dažniausiai suvokiamas kaip junginys – kablelio nereikia; jei pažyminiai laikomi vienarūšiais, galima kablelis.|vienarusis] mirtingąjį kūrėją[,|"+S.pazPo+"] apdovanotą nuostabiu talentu.",

  "Ovidijus pradeda pasakojimą trumpu paaiškinimu[,|"+S.salStart+"] kad Pigmalionas buvo viengungis.",

  "Jis puikiai matė moterų nedorybes[|"+S.vienIr+"] bei jų prigimties trūkumus[,|"+S.suj+"] todėl šalinosi santuokos.",

  "Taip gyvendamas[/,|Trumpa pusdalyvinė aplinkybė (taip gyvendamas) gali būti ir neskiriama.|aplinkybe] sukūrė merginos statulą[,/–|Toliau eina aiškinamasis priedėlis (padarą su pažyminiais) – skiriamas kableliu arba brūkšniu.|pazyminys] pirmapradį[,|"+S.vienNo+"] nesuteptą[,|"+S.vienNo+"] niekieno[|„niekieno net žvilgsniu nepaliestą“ – vienas pažyminys: niekieno priklauso žodžiui žvilgsniu, todėl kablelio nėra.|nereikia] net žvilgsniu nepaliestą padarą.",

  "Skulptorius pasirinko statulai ne marmurą[,|"+S.vienBet+"] tačiau baltumu spindintį dramblio kaulą[,/–|Priedėlis po pažymimojo žodžio (kaulą – medžiagą) išskiriamas kableliais arba brūkšniais.|pazyminys] artimesnę žmogui organinės kilmės medžiagą[,/–|Priedėlio pabaigoje taip pat dedamas ženklas.|pazyminys] ir iš jo išskobė tobulą nepaprastai gražios merginos skulptūrą.",

  "Taigi Pigmalionas trokšta merginos kaip gyvos[,|"+S.vienBet+"] tačiau statulos negali paversti žmogumi.",

  "Jam duota sukurti statulą kaip gyvą ir tikrą merginą[,|"+S.suj+"] bet lygiai tokią[,|"+S.salStart+"] kokios yra dievų pasaulio merginos[,|"+S.salEnd+"] sukurti trukdo žmogui užbrėžtų galimybių riba.",

  "Tik aukštesnės jėgos gali padėti skulptoriui. Pigmalionas pasinaudoja atėjusia Veneros švente. Šventės apeigos leidžia ne tik garbinti deivę[,|"+S.netik+"] bet ir maldauti jos malonės.",

  "Nedrąsų Pigmaliono prašymą[|Bendratis „duoti“ čia yra pažyminys (koks prašymas?) ir neskiriama; visa konstrukcija eina prieš žodį Venera.|nereikia] duoti jam tokią žmoną kaip dramblio kaulo mergaitė[|„… mergaitė perpratusi Venera“ – dalyvinis pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] perpratusi Venera turi epitetą „auksinė“[,|Dalyvinis pažyminys po pažymimojo žodžio (epitetą, turintį…) išskiriamas kableliu.|pazyminys] turintį perkeltinę prasmę[:/–|Prieš aiškinamuosius žodžius (nepaprasta, tobula…) dedamas dvitaškis arba brūkšnys.|dvitaskis] nepaprasta[,|"+S.vienNo+"] tobula[,|"+S.vienNo+"] stebuklinga.",

  "Veneros epitetas „auksinė“ reiškė ne tik tobulą grožį[,|"+S.netik+"] bet ir tobulą globą[|"+S.vienIr+"] bei rūpinimąsi visu tuo[,|"+S.salStart+"] kas gyva.",

  "Parodydama skulptoriui[,|"+S.salStart+"] kad jo malda išklausyta[,|"+S.salEnd+"] ant aukuro suplieskė triskart liepsna[,|"+S.apl+"] liežuviu nusidriekus per orą.",

  "Laikyta[,|"+S.salStart+"] kad[/,|Po jungtuko kad prasideda padalyvinė aplinkybė – kablelis po kad galimas, bet nebūtinas.|aplinkybe] tris kartus ugniai ant aukuro pašokus ir kiekvieną kartą liepsnos liežuviui išdrykus[,|Padalyvinės aplinkybės pabaigoje dedamas kablelis.|aplinkybe] dievai būtinai išgirs ir įvykdys žmogaus meldimą.",

  "Šiuo atveju taip ir įvyksta[:/–|"+S.dvit+"] bučiniu ir prisilietimu atgaivinęs statulą[,|Dalyvinė aplinkybė (atgaivinęs statulą) išskiriama kableliu.|aplinkybe] Pigmalionas jaučia kūną darantis tokį tąsų[/,|Palyginimas su „toks … kaip“ dažniausiai neskiriamas, bet kablelis galimas.|nereikia] kaip antikoje pagarsėjusio Atėnų apylinkėse stūksančio Himeto kalno bičių vaškas.",

  "Be abejo[,|"+S.iterp+"] romėnų poeto papasakotas[|Dalyvis papasakotas – pažyminys prieš pažymimąjį žodį mitas, neskiriamas.|pazyminys] tobulą dalyką gebančio sukurti kūrėjo mitas[|Tarp veiksnio ir tarinio kablelis nededamas.|nereikia] pasirodė patrauklus Naujųjų laikų rašytojams.",

  "Ovidijus nepamini Veneros[|„Veneros sužmogintos merginos“ – pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] sužmogintos merginos vardo.",

  "Kadangi romėnų literatūroje šmėščiojo[|Tarp tarinio ir veiksnio kablelio nereikia; „tarsi bendriniu tapęs“ – pažyminys prieš žodį vardas.|nereikia] tarsi bendriniu tapęs lyrinio subjekto mylimosios vardas Galatėja[,|"+S.salEnd+"] ji Naujųjų laikų mene dažniausiai vadinama Galatėja.",

  "Europoje mitas paplito XVIII a.[,|Vienarūšiai tariniai be jungtuko (paplito, buvo) skiriami kableliu.|vienarusis] buvo populiarus XIX a. mene. Kūrėjai[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais, bet nebūtinai.|aplinkybe] įvairiai interpretuodami[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais, bet nebūtinai.|aplinkybe] juo naudojasi iki šių laikų.",

  "Turbūt[/,|Žodis turbūt dažniausiai neskiriamas.|iterpinys] garsiausias šios temos kūrinys[–/|"+S.bruk+"] B. Šo 1912 m. parašyta pjesė „Pigmalionas“[,|"+S.salStart+"] pagal kurią F. Loewe 1956 m. sukūrė miuziklą „Mano puikioji ledi“."
];

// Parse into words + gap after each word: { words:[], gaps:[{ans:[...], rule, cat}] }
function skParse(src) {
  const specs = [];
  const flat = src.replace(/\[([^|\]]*)\|([^\]]*)\]/g, (_, ans, rest) => {
    const i = rest.lastIndexOf("|");
    specs.push({ ans: ans.split("/"), rule: rest.slice(0, i), cat: rest.slice(i + 1) });
    return "\u0001" + (specs.length - 1) + "\u0002";
  });
  const words = [], gaps = [];
  flat.split(" ").forEach(tok => {
    const m = tok.match(/^(.*)\u0001(\d+)\u0002$/);
    words.push(m ? m[1] : tok);
    gaps.push(m ? specs[+m[2]] : { ans: [""], rule: "Čia skyrybos ženklo nereikia.", cat: "nereikia", def: true });
  });
  gaps.pop(); // no gap after the last word
  return { words, gaps };
}

// "word, next" / "word – next" / "word: next"
const skJoin = (a, mark, b) => mark === "–" ? `${a} – ${b}` : `${a}${mark} ${b}`;

// Mistakes, same idea as rašyba: cleared after 2 correct in a row
const SK_KEY = "skyryba-mistakes";
function skLoadMistakes() {
  let m; try { m = JSON.parse(localStorage.getItem(SK_KEY)) || {}; } catch { m = {}; }
  for (const id in m) {
    const [si, g] = id.split(":").map(Number);
    if (!SK_SENTENCES[si] || g >= skParse(SK_SENTENCES[si]).gaps.length) delete m[id];
  }
  return m;
}
const skSaveMistakes = m => localStorage.setItem(SK_KEY, JSON.stringify(m));
function skRecord(si, g, ok, given) {
  const m = skLoadMistakes(), id = si + ":" + g;
  if (ok) { if (m[id] && ++m[id].streak >= 2) delete m[id]; }
  else m[id] = { wrong: (m[id]?.wrong || 0) + 1, streak: 0, last: given };
  skSaveMistakes(m);
}
