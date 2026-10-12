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
  salutinis: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 11 p.</p><p><b>11.1.</b> Šalutinis prijungiamojo sakinio dėmuo <b>išskiriamas kableliais</b>, retai – brūkšniais: <i>Jam be galo rūpėjo, kad viskas būtų padaryta laiku ir gerai. Vyras, kuris sėdėjo su kunigu pirmoje eilėje, pradėjo ploti.</i></p>
<p><b>11.8.</b> Išskiriamas kartu su žodžiais būtent, ypač, juoba, juolab, juo labiau, tuo labiau, nebent, bent jau, tai yra, vis tiek.</p>
<p><b>11.9.</b> Tarp šalutinio dėmens jungtuko ir prieš jį einančio jungtuko <b>gali</b> būti rašomas kablelis: <i>Reikia pasakyti, kad(,) kai tik kuris iš jų įžengia…</i></p>
<p><b>11.10.</b> Vienarūšiai šalutiniai dėmenys su <b>kartojamais</b> jungtukais (ir … ir, nei … nei, ar … ar) atskiriami pradedant antruoju jungtuku. <i>Pastaba:</i> su <b>nekartojamais</b> ir, nei, ar, arba – <b>neatskiriami</b>: <i>Niekam nerūpėjo, kur jos išvažiavo nei kada grįš.</i></p>
<p><b>11.4.</b> Po vargu, kažin prieš ar, kas, kur, kada <b>gali</b> būti kablelis: <i>Vargu(,) ar jis pats žino.</i> <b>11.7.</b> Gali būti neišskiriamas, jei prieš jį eina dalelytė: <i>Reikia mokėti(,) ir kaip pasakyti.</i></p>`,
  vienarusis: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 3 ir 4 p.</p><p><b>3.1.</b> Vienarūšės sakinio dalys <b>be jungtukų</b> atskiriamos kableliais: <i>Meilė, širdgėla, neviltis geso pamažu.</i></p>
<p><b>3.5.</b> Sujungtos jungtukais <b>o, bet, tačiau, tik(tai), todėl, tad, taigi</b>, poriniais <b>ne tik … bet ir, nors … bet</b>, kartojamais <b>ir … ir, nei … nei, ar … ar</b> – atskiriamos kableliais. <i>Pastaba:</i> su nekartojamais <b>ir, bei, nei, ar, arba</b> – <b>neatskiriamos</b>.</p>
<p><b>3.3.</b> Pažyminiai prieš pažymimąjį žodį, nurodantys ne vieno pagrindo požymius, <b>gali</b> būti atskiriami: <i>Priešais sujudėjo aukštas(,) storas žmogus.</i></p>
<p><b>4.7.</b> Po apibendrinamojo žodžio aiškinamosios dalys išskiriamos <b>dvitaškiu</b> ir kableliu (ar brūkšniu) arba brūkšniais: <i>Pasakyk tą patį visiems: mokytojui, kaimynams, mano draugams, ir sužinosi…</i></p>
<p><b>4.9.</b> Po vienarūšių dalių <b>prieš</b> apibendrinamąjį žodį rašomas <b>brūkšnys</b>: <i>Gimines, kaimynus, draugus – visus suvadino.</i></p>`,
  sujung: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 12 ir 13 p.</p><p><b>12.1.</b> Dėmenys, susieti jungtukais <b>o, bet, tačiau, tik(tai), vis dėlto, užtat, tad, todėl</b>, atskiriami kableliu (rečiau kabliataškiu): <i>Sietynas jau aukštai iškilo, o Aušrinės vis dar nematyti.</i></p>
<p><b>12.2.</b> Su kartojamais jungtukais (ir … ir, nei … nei, arba … arba) – kableliais. <b>12.3.</b> Su nekartojamais <b>ir, nei, ar, arba</b> – kablelis <b>gali</b> būti rašomas, jei norima parodyti dėmenų savarankiškumą.</p>
<p><b>13.1.</b> Bejungtukio sakinio dėmenys atskiriami kableliu, kabliataškiu, brūkšniu ar dvitaškiu: išvardijimas, gretinimas, priešprieša – <b>kablelis</b>; apibendrinimas, sąlyga, laikas – dažniau <b>brūkšnys</b>; aiškinimas, priežastis, pasekmė – <b>dvitaškis ar brūkšnys</b>.</p>`,
  iterpinys: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 8 p.</p><p><b>8.1.</b> Įterpinys išskiriamas kableliais, rečiau – brūkšniais: <i>Mes, pavyzdžiui, niekada neketinome… Vadinasi, bausmės baimė…</i></p>
<p><b>8.4.</b> Modaliniai žodžiai (galbūt, greičiausiai, iš tiesų, iš tikrųjų, pagaliau, paprastai, taigi, tikriausiai, <b>turbūt</b>, vis dėlto, visų pirma ir pan.) <b>gali</b> būti išskiriami kableliais, jei norima suteikti įterptinį pobūdį: <i>Turbūt(,) visuose miestuose buvo taip pat.</i></p>`,
  aplinkybe: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 5 p.</p><p><b>5.</b> Dalyvinė, pusdalyvinė ar padalyvinė aplinkybė išskiriama tik tada, kai dalyvis, pusdalyvis ar padalyvis yra <b>išplėstas</b> bent vienu savarankišku žodžiu.</p>
<p><b>5.1.</b> Išplėsta aplinkybė (arba dvi ir daugiau neišplėstų) <b>gali būti</b> išskiriama kableliais, jei norima išryškinti jos savarankiškumą: <i>Išėjusi iš mokyklos(,) direktorė stabtelėjo. Liucė dengė stalą, bet(,) išgirdusi svečią(,) tuoj išbėgo.</i></p>
<p>Jei aplinkybė išskiriama sakinio viduryje – kableliai rašomi <b>iš abiejų pusių</b>.</p>`,
  pazyminys: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 6 p.</p><p><b>6.1.</b> Išplėstinis derinamasis pažyminys <b>po</b> pažymimojo žodžio išskiriamas kableliais: <i>Stalų, išrikiuotų palei sieną, turėjo pakakti visiems.</i></p>
<p><i>Pastabos:</i> 1) <b>prieš</b> pažymimąjį žodį pažyminys <b>neskiriamas</b>: <i>Išrikiuotų palei sieną stalų…</i>; 2) neskiriami nederinamieji pažyminiai su vardu, pavarde, tema, pavadinimu: <i>žmogus vardu Petras.</i></p>
<p><b>6.3.</b> Išplėstas priedėlis po pažymimojo žodžio išskiriamas kableliais, rečiau – brūkšniais: <i>Pirmas atėjo Jonas Augutis, Povilo sūnus.</i> Prieš pažymimąjį žodį – neskiriamas: <i>Mūsų kaimynas Stanislovas…</i></p>
<p><b>6.4.</b> Neišplėstas priedėlis po pažymimojo žodžio <b>gali</b> būti išskiriamas: <i>Vyresnysis sūnus(,) Antanas(,) ūkio reikalų nesiėmė.</i></p>`,
  bruksnys: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 10 p.</p><p><b>10.</b> Vietoj praleistos tarinio jungties (yra) <b>gali būti</b> rašomas brūkšnys, jei norima paryškinti praleidimą: <i>Gyvenimas mano (–) vėjas palaidas. Mokinys Vytautas (–) vienas gabiausių astronomų. Jis (–) baisus žmogus.</i></p>
<p><b>Kablelis</b> tarp veiksnio ir tarinio – visada <b>klaida</b>.</p>`,
  dvitaskis: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 13.1 ir 4.7 p.</p><p><b>13.1 c.</b> Kai bejungtukio sakinio dėmuo reiškia <b>aiškinimą, priežastį ar pasekmę</b> – rašomas <b>dvitaškis ar brūkšnys</b>: <i>Kumeliukas buvo tikrai gražus gyvulėlis: balta vilnelė klojo visą kūną… Pagailo jam senutės – toks susirūpinęs buvo jos veidas.</i></p>
<p><b>4.7.</b> Po apibendrinamojo žodžio prieš aiškinamąsias dalis – <b>dvitaškis</b> (arba brūkšniai). <b>4.9.</b> Po vienarūšių dalių prieš apibendrinamąjį žodį – <b>brūkšnys</b>.</p>`,
  nereikia: `<p class="src">📘 VLKK „Lietuvių kalbos skyrybos taisyklės“ (2019), 3, 6, 7 p.</p><p><b>Kablelio nereikia:</b></p>
<p>tarp veiksnio ir tarinio · <b>6.1 past.</b> tarp pažyminio ir pažymimojo žodžio, kai pažyminys eina prieš · <b>3.5 past.</b> prieš nekartojamus ir, bei, nei, ar, arba · <b>3.1 past.</b> tarp nevienarūšių sakinio dalių · <b>7.1.</b> lyginamasis posakis su toks … kaip išskiriamas tik norint pabrėžti savarankiškumą.</p>`
};
const skFullRule = cat => SK_FULL[cat] ? `<details class="full"><summary>Visa taisyklė (VLKK)</summary><div class="body">${SK_FULL[cat]}</div></details>` : "";

// Rules reused across gaps ("rule|type")
const S = {
  salStart: "Šalutinis dėmuo išskiriamas kableliais: kablelis prieš jungiamąjį žodį (kad, kur, kas, kuris, kokios…).|salutinis",
  salEnd: "Šalutinio dėmens pabaigoje dedamas kablelis, kai sakinys tęsiasi.|salutinis",
  vienNo: "Vienarūšės sakinio dalys be jungtuko skiriamos kableliais.|vienarusis",
  vienBet: "Prieš jungtukus o, bet, tačiau, todėl dedamas kablelis.|vienarusis",
  vienIr: "Prieš ir, bei, ar, arba (nekartojamus) kablelis nededamas.|vienarusis",
  netik: "Ne tik …, bet ir … – kablelis prieš bet.|vienarusis",
  apib: "Po apibendrinamojo žodžio prieš aiškinamąsias dalis rašomas dvitaškis (arba brūkšnys) (VLKK 4.7 p.).|vienarusis",
  suj: "Sudėtinio sujungiamojo sakinio dėmenys prieš bet, tad, todėl, o, tačiau skiriami kableliu.|sujung",
  bej: "Bejungtukio sudėtinio sakinio dėmenys skiriami kableliu.|sujung",
  iterp: "Įterpinys išskiriamas kableliais iš abiejų pusių (anot mito, be abejo).|iterpinys",
  apl: "Išplėsta dalyvinė / padalyvinė / pusdalyvinė aplinkybė gali būti išskiriama kableliais iš abiejų pusių, bet nebūtinai (VLKK 5.1 p.).|aplinkybe",
  pazPo: "Pažyminys po pažymimojo žodžio išskiriamas kableliais.|pazyminys",
  bruk: "Vietoj praleistos jungties „yra“ gali būti rašomas brūkšnys (VLKK 10 p.). Kablelis tarp veiksnio ir tarinio – klaida.|bruksnys",
  dvit: "Antroji dalis paaiškina pirmąją – rašomas dvitaškis arba brūkšnys (VLKK 13.1 c).|dvitaskis"
};

// word[answers|rule|type] = gap right after the word. "–/" = dash or nothing. Gaps without [...] need nothing.
const SK_SENTENCES = [
  "Ovidijaus „Metamorfozių“ pasakojimas apie Pigmalioną[/–|"+S.bruk+"] skirtas kūrybos klausimams.",

  "Poetas mąsto[,|"+S.salStart+"] ką sukurti leista žmogui[|Vienarūšiai šalutiniai dėmenys, sujungti nekartojamu ir, neatskiriami.|salutinis] ir koks kūrinys esti[|„esti paženklintas“ – vienas tarinys, jo dalių neskiriame.|nereikia] paženklintas tobulybės ženklu. Pigmaliono istorija užima išskirtinę vietą.",

  "Kitaip nei daugumoje šio epo pasakojimų[,|"+S.salStart+"] kur pateikiami žmogaus pavirtimo akmeniu[,|"+S.vienNo+"] medžiu ar kitu negyvu daiktu variantai[,|"+S.salEnd+"] čia vyksta atvirkščia metamorfozė[:/–|"+S.dvit+"] statula pavirsta mergina.",

  "Pasakojimo herojus[–/|"+S.bruk+"] Kipre gyvenęs talentingas menininkas Pigmalionas.",

  "Kipro sala[,|Dalyvinis pažyminys po pažymimojo žodžio (sala, plytinti…) išskiriamas kableliais.|pazyminys] plytinti Rytinėje Viduržemio jūros dalyje[,|Dalyvinio pažyminio pabaigoje dedamas kablelis.|pazyminys] garsėjo ne tik variu[,|"+S.netik+"] bet ir Afroditės kultu.",

  "Juk[,|Įterpinys „anot mito“ išskiriamas kableliais – kablelis prieš anot.|iterpinys] anot mito[,|"+S.iterp+"] ką tik iš jūros putos gimusi deivė[|„ką tik gimusi deivė“ – pažyminys prieš pažymimąjį žodį neskiriamas; tarp veiksnio ir tarinio kablelio nėra.|pazyminys] kriauklėje atplaukė į šią salą.",

  "Čia Afroditės kultas buvo labai paplitęs[,|"+S.suj+"] tad deivė gavo prievardžius Kipridė ir Kiprija.",

  "Ji garbinta[|Tarp tarinio ir aplinkybės kablelio nereikia.|nereikia] visoje saloje[:/–|"+S.apib+"] Amatunte[,|"+S.vienNo+"] Salamine[,|"+S.vienNo+"] Idalijuje ir kitur[,|"+S.suj+"] bet svarbiausia Afroditės kulto vieta laikytas Pafo miestas.",

  "Deivė net turėjo epitetą[|Pavadinimas po žodžio „epitetą“ (epitetą Pafija) niekuo neskiriamas.|pazyminys] Pafija.",

  "Pigmalioną vieni mitų šaltiniai pristato kaip Kipro salos karalių[,|"+S.bej+"] kai kurie tyrėjai[/,|"+S.apl+"#p3] remdamiesi antikinėmis užuominomis[/,|"+S.apl+"#p3] teigia galimą jo ir Afroditės mylimojo Adonio tapatumą.",

  "Tačiau Ovidijus vaizduoja Pigmalioną kaip paprastą[/,|„Paprastas mirtingasis“ dažniausiai suvokiamas kaip junginys – kablelio nereikia; jei pažyminiai laikomi vienarūšiais, galima kablelis.|vienarusis] mirtingąjį kūrėją[,|"+S.pazPo+"] apdovanotą nuostabiu talentu.",

  "Ovidijus pradeda pasakojimą trumpu paaiškinimu[,|"+S.salStart+"] kad Pigmalionas buvo viengungis.",

  "Jis puikiai matė moterų nedorybes[|"+S.vienIr+"] bei jų prigimties trūkumus[,|"+S.vienBet+"] todėl šalinosi santuokos.",

  "Taip gyvendamas[/,|Trumpa pusdalyvinė aplinkybė (taip gyvendamas) gali būti ir neskiriama.|aplinkybe] sukūrė merginos statulą[–/,|Toliau eina aiškinamasis priedėlis (padarą su pažyminiais) – skiriamas brūkšniu (galima ir kableliu).|pazyminys] pirmapradį[,|"+S.vienNo+"] nesuteptą[,|"+S.vienNo+"] niekieno[|„niekieno net žvilgsniu nepaliestą“ – vienas pažyminys: niekieno priklauso žodžiui žvilgsniu, todėl kablelio nėra.|nereikia] net žvilgsniu nepaliestą padarą.",

  "Skulptorius pasirinko statulai ne marmurą[,|"+S.vienBet+"] tačiau baltumu spindintį dramblio kaulą[,/–|Priedėlis po pažymimojo žodžio (kaulą – medžiagą) išskiriamas iš abiejų pusių vienodais ženklais: kableliais arba brūkšniais.|pazyminys#p2] artimesnę žmogui organinės kilmės medžiagą[,/–|Priedėlio pabaigoje dedamas toks pat ženklas kaip pradžioje.|pazyminys#p2] ir iš jo išskobė tobulą nepaprastai gražios merginos skulptūrą.",

  "Taigi Pigmalionas trokšta merginos kaip gyvos[,|"+S.vienBet+"] tačiau statulos negali paversti žmogumi.",

  "Jam duota sukurti statulą kaip gyvą ir tikrą merginą[,|"+S.suj+"] bet lygiai tokią[,|"+S.salStart+"] kokios yra dievų pasaulio merginos[,|"+S.salEnd+"] sukurti trukdo žmogui užbrėžtų galimybių riba.",

  "Tik aukštesnės jėgos gali padėti skulptoriui. Pigmalionas pasinaudoja atėjusia Veneros švente. Šventės apeigos leidžia ne tik garbinti deivę[,|"+S.netik+"] bet ir maldauti jos malonės.",

  "Nedrąsų Pigmaliono prašymą[|Bendratis „duoti“ čia yra pažyminys (koks prašymas?) ir neskiriama; visa konstrukcija eina prieš žodį Venera.|nereikia] duoti jam tokią žmoną kaip dramblio kaulo mergaitė[|„… mergaitė perpratusi Venera“ – dalyvinis pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] perpratusi Venera turi epitetą „auksinė“[,|Dalyvinis pažyminys po pažymimojo žodžio (epitetą, turintį…) išskiriamas kableliu.|pazyminys] turintį perkeltinę prasmę[:/–|Prieš aiškinamąsias dalis (nepaprasta, tobula, stebuklinga) rašomas dvitaškis arba brūkšnys (VLKK 4.7 p.).|dvitaskis] nepaprasta[,|"+S.vienNo+"] tobula[,|"+S.vienNo+"] stebuklinga.",

  "Veneros epitetas „auksinė“ reiškė ne tik tobulą grožį[,|"+S.netik+"] bet ir tobulą globą[|"+S.vienIr+"] bei rūpinimąsi visu tuo[,|"+S.salStart+"] kas gyva.",

  "Parodydama skulptoriui[,|"+S.salStart+"] kad jo malda išklausyta[,|"+S.salEnd+"] ant aukuro suplieskė triskart liepsna[/,|"+S.apl+"] liežuviu nusidriekus per orą.",

  "Laikyta[,|"+S.salStart+"] kad[/,|Padalyvinė aplinkybė (tris kartus … išdrykus) gali būti išskiriama kableliais iš abiejų pusių – tada kablelis ir po kad (VLKK 5.1, 11.9 p.).|aplinkybe#p4] tris kartus ugniai ant aukuro pašokus ir kiekvieną kartą liepsnos liežuviui išdrykus[/,|Jei padalyvinė aplinkybė išskiriama, kablelis rašomas ir jos pabaigoje (VLKK 5.1 p.).|aplinkybe#p4] dievai būtinai išgirs ir įvykdys žmogaus meldimą.",

  "Šiuo atveju taip ir įvyksta[:/–|"+S.dvit+"] bučiniu ir prisilietimu atgaivinęs statulą[/,|Dalyvinė aplinkybė (bučiniu … atgaivinęs statulą) gali būti išskiriama kableliu, bet nebūtinai (VLKK 5.1 p.).|aplinkybe] Pigmalionas jaučia kūną darantis tokį tąsų[/,|Su „toks … kaip“ ir palyginimu be veiksmažodžio kablelis nerašomas (kablelis toleruojamas).|nereikia] kaip antikoje pagarsėjusio Atėnų apylinkėse stūksančio Himeto kalno bičių vaškas.",

  "Be abejo[,|"+S.iterp+"] romėnų poeto papasakotas[|Dalyvis papasakotas – pažyminys prieš pažymimąjį žodį mitas, neskiriamas.|pazyminys] tobulą dalyką gebančio sukurti kūrėjo mitas[|Tarp veiksnio ir tarinio kablelis nededamas.|nereikia] pasirodė patrauklus Naujųjų laikų rašytojams.",

  "Ovidijus nepaminėjo Veneros[|„Veneros sužmogintos merginos“ – pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] sužmogintos merginos vardo.",

  "Kadangi romėnų literatūroje šmėščiojo[|Tarp tarinio ir veiksnio kablelio nereikia; „tarsi bendriniu tapęs“ – pažyminys prieš žodį vardas.|nereikia] tarsi bendriniu tapęs lyrinio subjekto mylimosios vardas Galatėja[,|"+S.salEnd+"] ji Naujųjų laikų mene dažniausiai vadinama Galatėja.",

  "Europoje mitas paplito XVIII a.[,|Vienarūšiai tariniai be jungtuko (paplito, buvo) skiriami kableliu.|vienarusis] buvo populiarus XIX a. mene. Kūrėjai[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais iš abiejų pusių arba visai neskiriama.|aplinkybe#p1] įvairiai interpretuodami[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais iš abiejų pusių arba visai neskiriama.|aplinkybe#p1] juo naudojasi iki šių laikų.",

  "Turbūt[/,|Modalinis žodis turbūt gali būti išskiriamas kableliu, jei norima suteikti įterptinį pobūdį, bet nebūtinai (VLKK 8.4 p.).|iterpinys] garsiausias šios temos kūrinys[–/|"+S.bruk+"] B. Šo 1912 m. parašyta pjesė „Pigmalionas“[,|"+S.salStart+"] pagal kurią F. Loewe 1956 m. sukūrė miuziklą „Mano puikioji ledi“."
];

// Parse into words + gap after each word: { words:[], gaps:[{ans:[...], rule, cat}] }
function skParse(src) {
  const specs = [];
  const flat = src.replace(/\[([^|\]]*)\|([^\]]*)\]/g, (_, ans, rest) => {
    const i = rest.lastIndexOf("|");
    const [cat, pair] = rest.slice(i + 1).split("#");
    specs.push({ ans: ans.split("/"), rule: rest.slice(0, i), cat, pair });
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
