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
  salutinis: `<p><b>11.1.</b> Šalutinis prijungiamojo sakinio dėmuo <b>išskiriamas kableliais</b>, retai – brūkšniais: <i>Jam be galo rūpėjo, kad viskas būtų padaryta laiku ir gerai. Vyras, kuris sėdėjo su kunigu pirmoje eilėje, pradėjo ploti.</i></p>
<p><b>11.8.</b> Išskiriamas kartu su žodžiais būtent, ypač, juoba, juolab, juo labiau, tuo labiau, nebent, bent jau, tai yra, vis tiek.</p>
<p><b>11.9.</b> Tarp šalutinio dėmens jungtuko ir prieš jį einančio jungtuko <b>gali</b> būti rašomas kablelis: <i>Reikia pasakyti, kad(,) kai tik kuris iš jų įžengia…</i></p>
<p><b>11.10.</b> Vienarūšiai šalutiniai dėmenys su <b>kartojamais</b> jungtukais (ir … ir, nei … nei, ar … ar) atskiriami pradedant antruoju jungtuku. <i>Pastaba:</i> su <b>nekartojamais</b> ir, nei, ar, arba – <b>neatskiriami</b>: <i>Niekam nerūpėjo, kur jos išvažiavo nei kada grįš.</i></p>
<p><b>11.4.</b> Po vargu, kažin prieš ar, kas, kur, kada <b>gali</b> būti kablelis: <i>Vargu(,) ar jis pats žino.</i> <b>11.7.</b> Gali būti neišskiriamas, jei prieš jį eina dalelytė: <i>Reikia mokėti(,) ir kaip pasakyti.</i></p>`,
  vienarusis: `<p><b>3.1.</b> Vienarūšės sakinio dalys <b>be jungtukų</b> atskiriamos kableliais: <i>Meilė, širdgėla, neviltis geso pamažu.</i></p>
<p><b>3.5.</b> Sujungtos jungtukais <b>o, bet, tačiau, tik(tai), todėl, tad, taigi</b>, poriniais <b>ne tik … bet ir, nors … bet</b>, kartojamais <b>ir … ir, nei … nei, ar … ar</b> – atskiriamos kableliais. <i>Pastaba:</i> su nekartojamais <b>ir, bei, nei, ar, arba</b> – <b>neatskiriamos</b>.</p>
<p><b>3.3.</b> Pažyminiai prieš pažymimąjį žodį, nurodantys ne vieno pagrindo požymius, <b>gali</b> būti atskiriami: <i>Priešais sujudėjo aukštas(,) storas žmogus.</i></p>
<p><b>4.7.</b> Po apibendrinamojo žodžio aiškinamosios dalys išskiriamos <b>dvitaškiu</b> ir kableliu (ar brūkšniu) arba brūkšniais: <i>Pasakyk tą patį visiems: mokytojui, kaimynams, mano draugams, ir sužinosi…</i></p>
<p><b>4.9.</b> Po vienarūšių dalių <b>prieš</b> apibendrinamąjį žodį rašomas <b>brūkšnys</b>: <i>Gimines, kaimynus, draugus – visus suvadino.</i></p>`,
  sujung: `<p><b>12.1.</b> Dėmenys, susieti jungtukais <b>o, bet, tačiau, tik(tai), vis dėlto, užtat, tad, todėl</b>, atskiriami kableliu (rečiau kabliataškiu): <i>Sietynas jau aukštai iškilo, o Aušrinės vis dar nematyti.</i></p>
<p><b>12.2.</b> Su kartojamais jungtukais (ir … ir, nei … nei, arba … arba) – kableliais. <b>12.3.</b> Su nekartojamais <b>ir, nei, ar, arba</b> – kablelis <b>gali</b> būti rašomas, jei norima parodyti dėmenų savarankiškumą.</p>
<p><b>13.1.</b> Bejungtukio sakinio dėmenys atskiriami kableliu, kabliataškiu, brūkšniu ar dvitaškiu: išvardijimas, gretinimas, priešprieša – <b>kablelis</b>; apibendrinimas, sąlyga, laikas – dažniau <b>brūkšnys</b>; aiškinimas, priežastis, pasekmė – <b>dvitaškis ar brūkšnys</b>.</p>`,
  iterpinys: `<p><b>8.1.</b> Įterpinys išskiriamas kableliais, rečiau – brūkšniais: <i>Mes, pavyzdžiui, niekada neketinome… Vadinasi, bausmės baimė…</i></p>
<p><b>8.4.</b> Modaliniai žodžiai (galbūt, greičiausiai, iš tiesų, iš tikrųjų, pagaliau, paprastai, taigi, tikriausiai, <b>turbūt</b>, vis dėlto, visų pirma ir pan.) <b>gali</b> būti išskiriami kableliais, jei norima suteikti įterptinį pobūdį: <i>Turbūt(,) visuose miestuose buvo taip pat.</i></p>`,
  aplinkybe: `<p><b>5.</b> Dalyvinė, pusdalyvinė ar padalyvinė aplinkybė išskiriama tik tada, kai dalyvis, pusdalyvis ar padalyvis yra <b>išplėstas</b> bent vienu savarankišku žodžiu.</p>
<p><b>5.1.</b> Išplėsta aplinkybė (arba dvi ir daugiau neišplėstų) <b>gali būti</b> išskiriama kableliais, jei norima išryškinti jos savarankiškumą: <i>Išėjusi iš mokyklos(,) direktorė stabtelėjo. Liucė dengė stalą, bet(,) išgirdusi svečią(,) tuoj išbėgo.</i></p>
<p>Jei aplinkybė išskiriama sakinio viduryje – kableliai rašomi <b>iš abiejų pusių</b>.</p>`,
  pazyminys: `<p><b>6.1.</b> Išplėstinis derinamasis pažyminys <b>po</b> pažymimojo žodžio išskiriamas kableliais: <i>Stalų, išrikiuotų palei sieną, turėjo pakakti visiems.</i></p>
<p><i>Pastabos:</i> 1) <b>prieš</b> pažymimąjį žodį pažyminys <b>neskiriamas</b>: <i>Išrikiuotų palei sieną stalų…</i>; 2) neskiriami nederinamieji pažyminiai su vardu, pavarde, tema, pavadinimu: <i>žmogus vardu Petras.</i></p>
<p><b>6.3.</b> Išplėstas priedėlis po pažymimojo žodžio išskiriamas kableliais, rečiau – brūkšniais: <i>Pirmas atėjo Jonas Augutis, Povilo sūnus.</i> Prieš pažymimąjį žodį – neskiriamas: <i>Mūsų kaimynas Stanislovas…</i></p>
<p><b>6.4.</b> Neišplėstas priedėlis po pažymimojo žodžio <b>gali</b> būti išskiriamas: <i>Vyresnysis sūnus(,) Antanas(,) ūkio reikalų nesiėmė.</i></p>`,
  bruksnys: `<p><b>10.</b> Vietoj praleistos tarinio jungties (yra) <b>gali būti</b> rašomas brūkšnys, jei norima paryškinti praleidimą: <i>Gyvenimas mano (–) vėjas palaidas. Mokinys Vytautas (–) vienas gabiausių astronomų. Jis (–) baisus žmogus.</i></p>
<p><b>Kablelis</b> tarp veiksnio ir tarinio – visada <b>klaida</b>.</p>`,
  dvitaskis: `<p><b>13.1 c.</b> Kai bejungtukio sakinio dėmuo reiškia <b>aiškinimą, priežastį ar pasekmę</b> – rašomas <b>dvitaškis ar brūkšnys</b>: <i>Kumeliukas buvo tikrai gražus gyvulėlis: balta vilnelė klojo visą kūną… Pagailo jam senutės – toks susirūpinęs buvo jos veidas.</i></p>
<p><b>4.7.</b> Po apibendrinamojo žodžio prieš aiškinamąsias dalis – <b>dvitaškis</b> (arba brūkšniai). <b>4.9.</b> Po vienarūšių dalių prieš apibendrinamąjį žodį – <b>brūkšnys</b>.</p>`,
  nereikia: `<p><b>Kablelio nereikia:</b></p>
<p>tarp veiksnio ir tarinio · <b>6.1 past.</b> tarp pažyminio ir pažymimojo žodžio, kai pažyminys eina prieš · <b>3.5 past.</b> prieš nekartojamus ir, bei, nei, ar, arba · <b>3.1 past.</b> tarp nevienarūšių sakinio dalių · <b>7.1.</b> lyginamasis posakis su toks … kaip išskiriamas tik norint pabrėžti savarankiškumą.</p>`
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
  apib: "Po apibendrinamojo žodžio prieš aiškinamąsias dalis rašomas dvitaškis (arba brūkšnys).|vienarusis",
  suj: "Sudėtinio sujungiamojo sakinio dėmenys prieš bet, tad, todėl, o, tačiau skiriami kableliu.|sujung",
  bej: "Bejungtukio sudėtinio sakinio dėmenys skiriami kableliu.|sujung",
  iterp: "Įterpinys išskiriamas kableliais iš abiejų pusių (anot mito, be abejo).|iterpinys",
  apl: "Išplėsta dalyvinė / padalyvinė / pusdalyvinė aplinkybė gali būti išskiriama kableliais iš abiejų pusių, bet nebūtinai.|aplinkybe",
  pazPo: "Pažyminys po pažymimojo žodžio išskiriamas kableliais.|pazyminys",
  bruk: "Vietoj praleistos jungties „yra“ gali būti rašomas brūkšnys. Kablelis tarp veiksnio ir tarinio – klaida.|bruksnys",
  dvit: "Antroji dalis paaiškina pirmąją – rašomas dvitaškis arba brūkšnys.|dvitaskis"
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

  "Nedrąsų Pigmaliono prašymą[|Bendratis „duoti“ čia yra pažyminys (koks prašymas?) ir neskiriama; visa konstrukcija eina prieš žodį Venera.|nereikia] duoti jam tokią žmoną kaip dramblio kaulo mergaitė[|„… mergaitė perpratusi Venera“ – dalyvinis pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] perpratusi Venera turi epitetą „auksinė“[,|Dalyvinis pažyminys po pažymimojo žodžio (epitetą, turintį…) išskiriamas kableliu.|pazyminys] turintį perkeltinę prasmę[:/–|Prieš aiškinamąsias dalis (nepaprasta, tobula, stebuklinga) rašomas dvitaškis arba brūkšnys.|dvitaskis] nepaprasta[,|"+S.vienNo+"] tobula[,|"+S.vienNo+"] stebuklinga.",

  "Veneros epitetas „auksinė“ reiškė ne tik tobulą grožį[,|"+S.netik+"] bet ir tobulą globą[|"+S.vienIr+"] bei rūpinimąsi visu tuo[,|"+S.salStart+"] kas gyva.",

  "Parodydama skulptoriui[,|"+S.salStart+"] kad jo malda išklausyta[,|"+S.salEnd+"] ant aukuro suplieskė triskart liepsna[/,|"+S.apl+"] liežuviu nusidriekus per orą.",

  "Laikyta[,|"+S.salStart+"] kad[/,|Padalyvinė aplinkybė (tris kartus … išdrykus) gali būti išskiriama kableliais iš abiejų pusių – tada kablelis ir po kad.|aplinkybe#p4] tris kartus ugniai ant aukuro pašokus ir kiekvieną kartą liepsnos liežuviui išdrykus[/,|Jei padalyvinė aplinkybė išskiriama, kablelis rašomas ir jos pabaigoje.|aplinkybe#p4] dievai būtinai išgirs ir įvykdys žmogaus meldimą.",

  "Šiuo atveju taip ir įvyksta[:/–|"+S.dvit+"] bučiniu ir prisilietimu atgaivinęs statulą[/,|Dalyvinė aplinkybė (bučiniu … atgaivinęs statulą) gali būti išskiriama kableliu, bet nebūtinai.|aplinkybe] Pigmalionas jaučia kūną darantis tokį tąsų[/,|Su „toks … kaip“ ir palyginimu be veiksmažodžio kablelis nerašomas (kablelis toleruojamas).|nereikia] kaip antikoje pagarsėjusio Atėnų apylinkėse stūksančio Himeto kalno bičių vaškas.",

  "Be abejo[,|"+S.iterp+"] romėnų poeto papasakotas[|Dalyvis papasakotas – pažyminys prieš pažymimąjį žodį mitas, neskiriamas.|pazyminys] tobulą dalyką gebančio sukurti kūrėjo mitas[|Tarp veiksnio ir tarinio kablelis nededamas.|nereikia] pasirodė patrauklus Naujųjų laikų rašytojams.",

  "Ovidijus nepaminėjo Veneros[|„Veneros sužmogintos merginos“ – pažyminys prieš pažymimąjį žodį neskiriamas.|pazyminys] sužmogintos merginos vardo.",

  "Kadangi romėnų literatūroje šmėščiojo[|Tarp tarinio ir veiksnio kablelio nereikia; „tarsi bendriniu tapęs“ – pažyminys prieš žodį vardas.|nereikia] tarsi bendriniu tapęs lyrinio subjekto mylimosios vardas Galatėja[,|"+S.salEnd+"] ji Naujųjų laikų mene dažniausiai vadinama Galatėja.",

  "Europoje mitas paplito XVIII a.[,|Vienarūšiai tariniai be jungtuko (paplito, buvo) skiriami kableliu.|vienarusis] buvo populiarus XIX a. mene. Kūrėjai[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais iš abiejų pusių arba visai neskiriama.|aplinkybe#p1] įvairiai interpretuodami[/,|Pusdalyvinė aplinkybė (įvairiai interpretuodami) gali būti išskiriama kableliais iš abiejų pusių arba visai neskiriama.|aplinkybe#p1] juo naudojasi iki šių laikų.",

  "Turbūt[/,|Modalinis žodis turbūt gali būti išskiriamas kableliu, jei norima suteikti įterptinį pobūdį, bet nebūtinai.|iterpinys] garsiausias šios temos kūrinys[–/|"+S.bruk+"] B. Šo 1912 m. parašyta pjesė „Pigmalionas“[,|"+S.salStart+"] pagal kurią F. Loewe 1956 m. sukūrė miuziklą „Mano puikioji ledi“."
];

// More sentences: Leonardas da Vinčis (Diagnostinis testas 3-2024), Kelionės (added 2026-10-12)
(() => {
  const T = {
    sal: S.salStart, salEnd: S.salEnd, vien: S.vienNo, bet: S.vienBet, suj: S.suj, iterp: S.iterp, pazPo: S.pazPo,
    mod: "Modalinis žodis (iš tikrųjų, visų pirma, pagaliau) gali būti išskiriamas kableliais iš abiejų pusių, bet nebūtinai.|iterpinys",
    aisk: "Antroji bejungtukio sakinio dalis aiškina pirmąją – dvitaškis arba brūkšnys.|dvitaskis",
    ty: "Aiškinamoji dalis su t. y. (tai yra) išskiriama kableliais iš abiejų pusių.|pazyminys",
    pried: "Priedėlis po pažymimojo žodžio išskiriamas kableliais.|pazyminys",
    kart: "Su kartojamu jungtuku (ir … ir) kablelis rašomas prieš antrąjį jungtuką.|vienarusis"
  };
  SK_SENTENCES.push(
    "Amerikiečių antropologas ir kultūros teoretikas A. L. Krioberis pastebėjo[,|"+T.sal+"] kad tinkamas genijaus įvertinimas ir Europos genijų galerija tapo įmanomi tik dėl tam tikro kultūros modelio.",

    "Politinio[,|"+T.vien+"] moralinio ir intelektualinio individualizmo kultūroje[,|"+T.sal+"] kurioje svarbiausiais dalykais laikomi novatoriškumas[,|"+T.vien+"] su niekuo nesupainiojamas stilius bei kūrybos unikalumas[,|"+T.salEnd+"] anksčiau ar vėliau atrandami ypatingo talento žmonės[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o vėliau ir jų biografijos.",

    "Tiesa[,|Įterpinys tiesa išskiriamas kableliu.|iterpinys] pastarosios gali būti pakoreguotos ir net mitologizuotos.",

    "Leonardas da Vinčis pelnė universalaus kūrėjo vardą ne tik dėl savo kūrybinio genijaus[,|Ne tik …, bet ir … – kablelis prieš bet.|vienarusis] bet ir dėl savo laikmečio kultūros modelio[,|"+T.sal+"] kuris buvo palankus tarp meno ir mokslo balansuojantiems kūrėjams.",

    "Viduramžiais menininkai buvo laikomi paprasčiausiais amatininkais[,|"+T.suj+"] tad net jų kūrinių autorystė dažniausiai likdavo nežinoma.",

    "Tik renesansinėje Europoje menininkai pradeda pasirašinėti savo kūrinius[,|"+T.suj+"] o jų socialinis reikšmingumas ir prestižas neįtikėtinai pakyla.",

    "Kita vertus[,|Įterpinys kita vertus išskiriamas kableliu.|iterpinys] jei ne XV a. intelektualinė atmosfera ir jei Leonardas būtų gyvenęs kokiais trimis šimtmečiais vėliau[,|"+T.salEnd+"] griežtos specializacijos ir profesionalumo epocha jį būtų išjuokusi kaip diletantą.",

    "Da Vinčis[/,|"+T.mod+"#p1] iš tikrųjų[/,|"+T.mod+"#p1] buvo stulbinančio universalumo žmogus[:/–|"+T.aisk+"] jis buvo tapytojas[,|"+T.vien+"] architektas[,|"+T.vien+"] skulptorius[,|"+T.vien+"] poetas[,|"+T.vien+"] matematikas[,|"+T.vien+"] inžinierius[,|"+T.vien+"] navigacijos ir fortifikacijos specialistas.",

    "Ne veltui savo gyvenimo saulėlydyje į Prancūzijos karaliaus Pranciškaus I tarnybą Leonardas buvo priimtas[/,|"+T.mod+"#p1] visų pirma[/,|"+T.mod+"#p1] kaip karo inžinierius[,|Išplėstinis pažyminys po pažymimojo žodžio (inžinierius, tobulinęs…) išskiriamas.|pazyminys] tobulinęs bombardas (patrankas[,|"+T.pazPo+"] šaudžiusias akmeniniais sviediniais) ir gynybos įrenginius[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o tik po to kaip genialus tapytojas.",

    "Jam teko tarnauti ir itin žiauriems politikams[,|Išplėstinis pažyminys po pažymimojo žodžio (politikams, pagarsėjusiems…) išskiriamas.|pazyminys] pagarsėjusiems klasta ir skrupulų negailestingumu[:/–|"+T.aisk+"] vienas jų buvo Čezarė Bordžija.",

    "Mes žinome[,|"+T.sal+"] kad labai retai istorinė epocha iškart pripažįsta didį menininką.",

    "Tarkim[,|Įterpinys tarkim išskiriamas kableliu.|iterpinys] J. S. Bachas buvo laikomas tiesiog kompozitoriumi[,|Pažyminiai po pažymimojo žodžio išskiriami kableliais.|pazyminys] geru[,|Pažyminiai po pažymimojo žodžio išskiriami kableliais.|pazyminys] profesionaliu[,|Prieš jungtuką bet rašomas kablelis.|vienarusis] bet tik ne barokinės muzikos viršūne.",

    "Jo kūrinių autorystė buvo priskiriama ir kitam dramaturgui[/,|Neišplėstas priedėlis po pažymimojo žodžio gali būti išskiriamas, jei norima pabrėžti.|pazyminys#p1] K. Marlou[/,|Neišplėstas priedėlis po pažymimojo žodžio gali būti išskiriamas, jei norima pabrėžti.|pazyminys#p1] ir filosofui F. Beikonui.",

    "Net XIX amžiaus Anglijoje[,|"+T.ty+"] t. y. Viktorijos epochoje[,|"+T.ty+"] buvo atsisakoma tikėti universitetinio išsilavinimo neturėjusio ir neaukštos kilmės aktoriaus galimybėmis parašyti nemirtingus sonetus ir genialias pjeses.",

    "V. Šekspyro vardą iškėlė J. V. Gėtė ir F. Šileris[–/,|Aiškinamoji dalis po vienarūšių sakinio dalių atskiriama brūkšniu (rečiau kableliu).|pazyminys] didieji vokiečių poetai[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o vėliau ir vokiečių romantikai.",

    "Be abejo[,|"+T.iterp+"] ne anglų literatūros kritikams[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o vokiečių rašytojams priklauso V. Šekspyro mito autorystė.",

    "Pagaliau[/,|"+T.mod+"] nepamirškime[,|"+T.sal+"] kad romantikai sukūrė vienišo[,|"+T.vien+"] paslaptingo[,|"+T.vien+"] nuo pilkos vidutinybių masės atitrūkusio genijaus mitą[,|"+T.suj+"] tad Europos didieji menininkai ne kieno nors kito[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o romantikų buvo perkelti į genijų galeriją.",

    // Kelionės
    "Anksčiau nesupratau[,|"+T.sal+"] kodėl mane taip traukia kelionės į užsienį.",

    "Vis mėgindavau pats save apgaudinėti[,|"+T.sal+"] kad gal tas alkis yra išlikęs iš geležinės uždangos laikų[,|"+T.sal+"] kai pasaulio geografinis žemėlapis buvo padalytas[/,|Sakinio dalis su lyginamąja dalelyte tarytum gali būti atskirta kableliu arba neskiriama. Pati dalelytė nuo tolesnių žodžių neatskiriama.|aplinkybe] tarytum į du raudona spalva nudažytą kalėjimo lopą ir kitomis spalvomis laisvės ar pusiau laisvės teritoriją.",

    "Ir[/,|Tarp sujungiamojo jungtuko ir šalutinio dėmens jungtuko gali būti rašomas kablelis.|salutinis] kai pagaliau sienos griuvo[,|"+T.salEnd+"] tas alkis niekur nedingo[,|"+T.sal+"] nors pradėjau jau kitaip motyvuoti[,|"+T.sal+"] kodėl vis dažniau aptinku save kraunantį lagaminą.",

    "Motyvas[,|"+T.sal+"] kad keliauju[/,|"+S.apl+"] trokšdamas įkvėpti laisvės oro[,|"+T.salEnd+"] ilgainiui išbluko.",

    "Tuomet atsirado kitas[–/|Vietoj praleistos sakinio dalies (motyvas) gali būti rašomas brūkšnys.|bruksnys] pažinimo[,|"+T.vien+"] akiračio plėtimo.",

    "Kodėl vokietis[,|"+T.vien+"] italas[,|"+T.vien+"] norvegas[,|"+T.vien+"] amerikietis neršia po visą pasaulį[,|Bejungtukio sakinio dėmenys (kodėl …, kodėl …) atskiriami kableliu.|sujung] kodėl atsipūtęs gali gerti sau vyną Barselonos Les Rambloj[,|"+T.vien+"] Paryžiuj[/,|Vieta gali būti patikslinta kableliu.|pazyminys] Lotynų kvartale[,|Vienarūšiai tariniai (gerti, grožėtis) atskiriami kableliu.|vienarusis] grožėtis[,|"+T.sal+"] kaip vakaro saulė meta pustonių gamą ant Notre Dame fasado[,|Prieš jungtuką o rašomas kablelis.|sujung] o tu negali?",

    "„Galiu ir aš“[/–|Vietoj praleistos jungties gali būti rašomas brūkšnys.|bruksnys] tai toks donkichotiškas atsakas[,|"+T.pazPo+"] panašus į tragikomišką ubago maištą kviestinių puotoje.",

    "Bet[/,|Tarp sujungiamojo jungtuko ir šalutinio dėmens jungtuko gali būti rašomas kablelis.|salutinis] kai maištas įgyvendintas[,|"+T.salEnd+"] vėl supranti[,|"+T.sal+"] kad ne tai tave varė.",

    "Tau neįdomūs tie muziejai ir visokios senų laikų relikvijos[,|"+T.vien+"] sarkofagai ir antikinių šventyklų liekanos.",

    "Tau už turistinius maršrutus kur kas įdomiau be žemėlapio ir tikslo iki nukritimo klaidžioti siauromis nežinomų miestų gatvelėmis[,|"+T.vien+"] uosti žuvų dvoką nedidelių uostų krantinėse[,|"+T.vien+"] persimesti žodžiu kitu su kokiu valkata[,|"+T.vien+"] paglostyti svetimos valstybės tarpuvartėje šunį ar katę.",

    "Ypač tą pajunti[,|"+T.sal+"] jei svetur ilgėliau užsibūni. Paskutinės dienos tampa tiesiog kankyne[/,|Padalyvinė aplinkybė (laukiant skrydžio atgal) gali būti išskiriama kableliu.|aplinkybe] laukiant skrydžio atgal.",

    "Niekas tau nebeįdomu[:/–|Po apibendrinamojo žodžio (niekas) prieš aiškinamąsias dalis – dvitaškis arba brūkšnys.|dvitaskis] nei naujai užsimezgusios pažintys[,|"+T.kart+"] nei pamaldos savose svetimų miestų bažnyčiose[,|"+T.kart+"] nei tarpuvarčių šunys ir katės[,|"+T.pazPo+"] gal ir suprantančios lietuviškai[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o gal ir nebesuprantančios.",

    "Štai dėl ko labiausiai verta keliauti[–/,|Aiškinamoji dalis atskiriama brūkšniu, norint pabrėžti tapatumą.|dvitaskis] dėl to ilgesio[,|"+T.sal+"] kuriam nereikia sugalvoti kokios nors motyvacijos[:/–|"+T.aisk+"] jis nelauktai užklumpa[,|"+T.vien+"] įsismelkia iki panagių ir maudžia.",

    "Ir štai tu jau leidiesi nuo Aušros Vartų žemyn[,|"+T.vien+"] dardi su lagaminu Didžiąja[,|Vienarūšės sakinio dalys (Didžiąja, Pilies gatve) atskiriamos kableliu.|vienarusis] Pilies gatve.",

    "Viešpatie[,|Kreipinys visada išskiriamas kableliu.|iterpinys] koks gražus ir jaukus Vilnius[,/–|Bejungtukio sakinio dėmenys atskiriami kableliu, o nuolaidai reikšti dažniau brūkšniu.|sujung] nesvarbu[,/–/:|Bejungtukio sakinio dėmuo – kablelis arba brūkšnys.|sujung] naktis[,|"+T.vien+"] rytas ar vakaras.",

    "Būtent iš čia Leonardo[,|"+T.pried+"] naujojo Dedalo[,|"+T.pried+"] be jokių skrupulų tarnavusio tironams[,|"+T.vien+"] savo talentą ir paslaugas jiems pardavinėjusio meistro[,|"+T.pried+"] ir moderniojo meistro[,|"+T.pazPo+"] galinčio vienu metu tarnauti ir grožiui[,|"+T.kart+"] ir blogiui[,|"+T.pazPo+"] reputacija[,|Prieš jungtuką o rašomas kablelis.|vienarusis] o gal mitas[,|"+T.sal+"] nuo kurio lieka tik žingsnis iki daktaro Fausto idėjos.",

    "Moljeras buvo šventai įsitikinęs[,|"+T.sal+"] kad V. Šekspyrui buvo svetimas formos pojūtis[|Vienarūšiai šalutiniai dėmenys su nekartojamu ir neatskiriami.|salutinis] ir kad jis neskyrė komedijos nuo tragedijos[,|Sujungiamojo sakinio dėmenys prieš o atskiriami kableliu.|sujung] o Volteras V. Šekspyrą yra pavadinęs anglų barbaru."
  );
})();

// More sentences: vienarūšės dalys, apibendrinamasis žodis, sujungiamieji ir bejungtukiai sakiniai, priedėliai
// (pagal PUPP pratybų temas, sakiniai savi; added 2026-10-17)
(() => {
  const U = {
    apibPo: "Po vienarūšių dalių prieš apibendrinamąjį žodį rašomas brūkšnys.|vienarusis",
    apibGal: "Aiškinamųjų dalių pabaigoje, kai sakinys tęsiasi, rašomas kablelis (po dvitaškio) arba brūkšnys.|vienarusis",
    kart: "Su kartojamu jungtuku (ir … ir, nei … nei) kablelis rašomas prieš antrąjį jungtuką.|vienarusis",
    pried: "Išplėstas priedėlis po pažymimojo žodžio išskiriamas kableliais, rečiau – brūkšniais.|pazyminys",
    priedN: "Neišplėstas priedėlis po pažymimojo žodžio gali būti išskiriamas, jei norima pabrėžti.|pazyminys"
  };
  SK_SENTENCES.push(
    "Muzikantas turėjo tik tris brangius daiktus[:/–|"+S.apib+"] seną pianiną[,|"+S.vienNo+"] smuiką ir natų sąsiuvinį.",

    "Pianiną[,|"+S.vienNo+"] smuiką[,|"+S.vienNo+"] natas[–|"+U.apibPo+"] viską jis paveldėjo iš tėvo.",

    "Lauke siautė pūga[,|"+S.suj+"] o kambaryje tyliai skambėjo smuikas.",

    "Kaimynai nesiskundė[:/–|"+S.dvit+"] muzika jiems priminė vaikystę.",

    "Senolis grojo ir liūdnas[,|"+U.kart+"] ir linksmas melodijas.",

    "Muzika jam buvo ne tik darbas[,|"+S.netik+"] bet ir paguoda.",

    "Jo mokinė[/,|"+U.priedN+"#p1] Rūta[/,|"+U.priedN+"#p1] ateidavo kiekvieną šeštadienį.",

    "Kartą užsuko senas draugas Jonas[,/–|"+U.pried+"#p2] buvęs orkestro dirigentas[,/–|"+U.pried+"#p2] ir atnešė naujų natų.",

    "Visi svečiai[:|"+S.apib+"] kaimynai[,|"+S.vienNo+"] draugai ir mokiniai[,/–|"+U.apibGal+"] tylėjo ir klausėsi.",

    "Koncertas baigėsi vėlai[,|"+S.suj+"] tačiau niekas neskubėjo namo."
  );
})();

// short ones moved in from the old "Ženklai" quiz (2026-10-26) – appended so saved ids stay valid
SK_SENTENCES.push(
  "Žiema atėjo staiga[:/–|Antrasis bejungtukio sakinio dėmuo paaiškina pirmąjį – dvitaškis (arba brūkšnys).|dvitaskis] per naktį iškrito pusmetris sniego.",
  "Vieni mokiniai rašė[,|Gretinami du veiksmai – bejungtukio sakinio dėmenys skiriami kableliu.|sujung] kiti skaitė.",
  "Ateisi vėliau[–|Pirmasis dėmuo reiškia sąlygą – dažniausiai rašomas brūkšnys.|sujung] nieko nebeliks.",
  "Jis turėjo tris draugus[:/–|"+S.apib+"] Joną[,|"+S.vienNo+"] Petrą ir Ugnę.",
  "Mano brolis[–/|"+S.bruk+"] gydytojas.",
  "Lauke lijo[,|"+S.suj+"] o mes žaidėme stalo žaidimus.",
  "Jis nusprendė[:/–|"+S.dvit+"] nuo rytojaus pradės sportuoti.",
  "Pasakyk tiesą[–/:|Antrasis dėmuo reiškia pasekmę – rašomas brūkšnys (ar dvitaškis).|dvitaskis] tau pačiam bus lengviau.",
  "Vasarą aplankėme daug miestų[:/–|"+S.apib+"] Trakus[,|"+S.vienNo+"] Kernavę ir Nidą."
);

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

// Mistakes, same idea as rašyba: moved to the fixed list after 2 correct in a row
const SK_KEY = "skyryba-mistakes", SK_FIXED_KEY = "skyryba-fixed";
function skLoadMistakes(key = SK_KEY) {
  let m; try { m = JSON.parse(localStorage.getItem(key)) || {}; } catch { m = {}; }
  for (const id in m) {
    const [si, g] = id.split(":").map(Number);
    if (!SK_SENTENCES[si] || g >= skParse(SK_SENTENCES[si]).gaps.length) delete m[id];
  }
  return m;
}
const skSaveMistakes = (m, key = SK_KEY) => { localStorage.setItem(key, JSON.stringify(m)); window.onProgressSaved?.(); };
function skRecord(si, g, ok, given) {
  const m = skLoadMistakes(), f = skLoadMistakes(SK_FIXED_KEY), id = si + ":" + g;
  if (ok) { if (m[id] && ++m[id].streak >= 2) { f[id] = { wrong: m[id].wrong, last: m[id].last, fixed: Date.now() }; delete m[id]; } }
  else { m[id] = { wrong: (m[id]?.wrong || f[id]?.wrong || 0) + 1, streak: 0, last: given }; delete f[id]; }
  skSaveMistakes(m); skSaveMistakes(f, SK_FIXED_KEY);
}
