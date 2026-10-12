// Shared data for rasyba.html and klaidos.html

// Rule types: name + hint that points to the rule without giving the answer
const CATS = {
  nosines:   { name: "Nosinės šaknyje", hint: "Nosinės šaknyje. Rask giminišką žodį: ar balsis kaitaliojasi su an, en, in, un ar su kitu ilguoju balsiu (ą – į – ę)? Jei kaitaliojasi su ė ar y – nosinės nėra (pavojingi žodžiai)." },
  saknis:    { name: "Šaknies balsiai", hint: "Šaknies balsis. Rask giminišką žodį ar bendratį ir pažiūrėk, kaip ten rašoma šaknis (ilgas ar trumpas balsis?)." },
  priesagos: { name: "Priesagos", hint: "Priesaga. Iš kokio žodžio (veiksmažodžio ar būdvardžio) padarytas šis žodis? Kokia priesaga čia tinka?" },
  galunes:   { name: "Galūnės", hint: "Galūnė. Kokia kalbos dalis, linksnis ir skaičius? Ar priebalsis prieš galūnę minkštas?" },
  ivardz:    { name: "Įvardžiuotinės formos", hint: "Įvardžiuotinė forma. Paimk paprastąją formą ir pridėk įvardžio jis / ji galūnę." },
  dalyviai:  { name: "Dalyviai", hint: "Dalyvis. Nustatyk laiką, giminę, skaičių ir rūšį (veikiamasis ar neveikiamasis)." },
  tariamoji: { name: "Veiksmažodžio formos", hint: "Veiksmažodžio forma. Kokia čia nuosaka ir asmuo? Po „kad“ dažnai eina tariamoji nuosaka." },
  tarpt:     { name: "Tarptautiniai žodžiai", hint: "Tarptautinis žodis. Prisimink, kaip jis rašomas kitose kalbose (pvz. anglų)." },
  sudurt:    { name: "Sudurtiniai žodžiai, priešdėliai", hint: "Išskaidyk žodį į dalis: iš kokių žodžių ar priešdėlio jis sudarytas?" },
  ne:        { name: "NE rašymas", hint: "NE rašymas. Su kokia kalbos dalimi eina ne? Veiksmažodžiai, įvardžiai, prieveiksmiai ir dalelytės turi skirtingas taisykles." },
  kartu:     { name: "Dalelytės, kartu ar skyrium", hint: "Kartu ar skyrium. Kokia čia dalelytė ar junginys? Pasitikrink GI, PER, NORS, BET taisykles." },
  prielinks: { name: "Prielinksninės konstrukcijos", hint: "Prielinksninė konstrukcija. Ar antrasis žodis sutrumpėjęs, ar ne?" }
};

// Rules reused across blanks ("rule text|type")
const R = {
  ymas: "Priesaga -ymas daroma iš -yti veiksmažodžių: papildyti → papildymas, aprašyti → aprašymas, atsakyti → atsakymas, išbandyti → išbandymas.|priesagos",
  imas: "Priesaga -imas (trumpas i): klausti → klausimas, rausti → rausimas, kasti → kasimas.|priesagos",
  buti: "Šaknis būt-/būd- (būti, būdas, būtina, būtis) rašoma su ilguoju ū.|saknis",
  kuryba: "kurti → kūryba, kūrybingas: šios šaknies daiktavardžiuose rašoma ilgoji ū.|saknis",
  tu: "Tariamosios nuosakos 3 asmuo baigiasi -tų: nevirstų, vestų, įgytų.|tariamoji",
  esnis: "Aukštesnysis laipsnis daromas su priesaga -esnis, -esnė: gilesnė, laisvesnė.|priesagos",
  masty: "Nosinė ą, nes giminiškuose žodžiuose ilgieji balsiai kaitaliojasi tarpusavyje: mąstyti – mįslė (taisyklė II).|nosines",
  grizti: "Nosinė į, nes kaitaliojasi su ą: grįžti – grąža – grąžinti (taisyklė II).|nosines",
  ivardz: "Įvardžiuotinė forma = paprastoji forma + įvardžio jis/ji galūnė: pirmame → pirmajame, didžių → didžiųjų, mirtingam → mirtingajam, žmogiškai → žmogiškajai, gimtą → gimtąją.|ivardz",
  antys: "Esamojo laiko veikiamasis dalyvis, vyr. g. dgs.: -antys (gaivinantys, gyvenantys).|dalyviai",
  tarpt: "Tarptautinis žodis rašomas kaip kilmės kalboje: racionalus, realus, realybė.|tarpt",
  ia: "Po minkštojo priebalsio galūnėje rašoma -ia-: panašiais, istoriniame, realiame, pačiai.|galunes",
  gyti: "Šaknyje y: gyventi, gyvas, įgyti (įgijo).|saknis",
  nekaip: "Ne su nebūdvardiniais prieveiksmiais rašoma atskirai: ne kaip, ne taip, ne čia. Kartu „nekaip“ rašoma tik kai reiškia „prastai“. Čia kaip – palyginimas, todėl ne kaip atskirai.|ne",
  nors: "Dalelytė nors visada rašoma atskirai: kas nors, kada nors, koks nors.|kartu"
};

// {answer|rule|type} = letters,  {{shown hint|answer|rule|type}} = kartu/skyrium.  "a/b" = both accepted
const SENTENCES = [
  "Į šiuolaikinio žmogaus gyvenimą vėl gr{į|"+R.grizti+"}žta mitas – kaip įprastos tikrovės papild{y|"+R.ymas+"}mas ir jos praturtinimas, {{gal, būt|galbūt|„galbūt“ yra vienas prieveiksmis, rašomas kartu.|kartu}} kaip alternatyvi tikrovė, bet jokiu b{ū|"+R.buti+"}du {{ne, kaip|ne kaip|"+R.nekaip+"}} radikali opozicija įprastai tikrovei, {{ne, kaip|ne kaip|"+R.nekaip+"}} nesutaikomas jos paneigimas.",

  "Kad gr{į|"+R.grizti+"}žimas prie mito nevirst{ų|"+R.tu+"} archa{ji/i|Žodis archajiškas (taip pat archaiškas): nosinės nėra, tarp balsių rašoma j.|tarpt}šk{ų|Būdvardžio dgs. kilmininkas: archaiškų (kokių?).|galunes} atavistinių polinkių bei egzistencinių rudimentų gaiv{i|gaivinti → gaivinimas: veiksmažodžio priesaga -inti, rašoma trumpas i.|priesagos}nimu, o vest{ų|"+R.tu+"} prie laisvos k{ū|"+R.kuryba+"}rybos ir laisv{e|"+R.esnis+"}snės b{ū|"+R.buti+"}ties versmių, mito prigimtį b{ū|"+R.buti+"}tina apm{ą|"+R.masty+"}styti naujai – naujai klausti tiek apie paties mito esmę, tiek apie mito s{a|Priešdėlis san- (santykis, sandora) rašomas be nosinės.|sudurt}nt{y|santykis, santykiai: šaknyje rašoma y.|saknis}kį su tuo, kas n{ė|nėra = ne + yra, todėl rašoma ė.|sudurt}ra mitas.",

  "Ak{i|Akivaizdu = aki- (akis) + vaizdu.|sudurt}vaizdu, kad vis gil{e|"+R.esnis+"}snės prarajos tarp mito ir logo, rac{i|"+R.tarpt+"}onalaus proto ir intuicijos, m{ą|"+R.masty+"}stymo ir vaizduotės raus{i|"+R.imas+"}mas tikrai {{ne, gali|negali|Ne su veiksmažodžiais rašoma kartu, kai nėra priešpriešos (o, bet, tačiau): negali, nežino. Su priešprieša – atskirai: ne bėgo, o skriejo.|ne}} pasitarnauti tiems, kuriems lemta gyventi dv{i|dvi + dešimt: dvidešimt (trumpas i).|sudurt}dešimt pirm{a|"+R.ivardz+"}j{a|"+R.ivardz+"}me amžiuje.",

  "Mito išmintis ir mite įš{a|šalti → šaldyti → įšaldyti: šaknyje a.|saknis}ldyti gaivalingos vaizduotės kristalai, gaivinant{y|"+R.antys+"}s šiuolaikinio žmogaus k{ū|"+R.kuryba+"}rybingumą, pajėg{ū|Būdvardžiai su -us daugiskaitoje vyr. g. turi galūnę -ūs: pajėgus → pajėgūs.|galunes}s suteikti vilties ir įkv{ė|kvėpti → kvėpavimas → įkvėpimas: šaknyje ė.|saknis}pimo tiems, kurie kenčia nuo dvasinės disharmonijos ir egzistencinio sutr{i|trikti → sutrikimas: šaknyje trumpas i.|saknis}kimo.",

  "T{u|turėti – šaknyje trumpas u.|saknis}rėtume – kaip ir kitais panaš{ia|"+R.ia+"}is atv{e|atvejis → atvejais: šaknyje e.|saknis}jais – pasikliauti senovės graikų, didži{ų|"+R.ivardz+"}j{ų|"+R.ivardz+"} mūsų mokytojų, įžvalg{u|įžvalgus → įžvalgumas: priesaga -umas (trumpas u).|priesagos}mu, kurio jie s{e|semti → semiasi: šaknyje e.|saknis}miasi tiek iš mitinės vaizduotės versmių, tiek ir iš loginių proto galių.",

  "Senovės graikų m{ą|"+R.masty+"}stytojai yra pastebėj{ę|Būtojo kartinio laiko veikiamasis dalyvis, vyr. g. dgs.: pastebėję (jie pastebėję).|dalyviai}, kad mitai b{y|byla → byloti: šaknyje y.|saknis}loja ne apie tai, kas {{kada, nors|kada nors|"+R.nors+"}} buvo įvykę m{į|Nosinė į, nes kaitaliojasi su ą: mįslė – mąstyti (taisyklė II).|nosines}slingame istorin{ia|"+R.ia+"}me laike ir erdvėje, o apie tai, kas an{a|anapus = ana + pus: rašoma a.|sudurt}pus erdvės ir laiko egzistuoja visada.",

  "Mitai kalba apie archetipines, nuolat pasikartojančias egzistencines situacijas, į kurias patenka {{ne, tik|ne tik|Ne su dalelytėmis rašoma atskirai: ne tik, ne vien, ne tiktai.|ne}} mitų herojai, bet ir įprastame laike bei erdvėje gyvenant{y|"+R.antys+"}s žmonės.",

  "Mitai kalba apie amžinuosius išš{ū|šaukti → šūkis → iššūkis: ū kaitaliojasi su au.|saknis}kius, kuriuos tikrovė meta žmogui, ir apie laiko patikrintus b{ū|"+R.buti+"}dus dorotis su jais.",

  "Kartu su dievams, pusdieviams ir žmonėms tenkančių išband{y|"+R.ymas+"}mų apraš{y|"+R.ymas+"}mais mituose, {{be, ab__jo|be abejo|Prielinksniai rašomi atskirai nuo nesutrumpėjusių žodžių: be abejo, be galo, be reikalo.|prielinks}} pateik{ia|Neveikiamasis dalyvis daromas iš esamojo laiko: pateikia → pateikiamos.|dalyviai}mos ir jų ištv{ė|ištverti → ištvėrė → ištvėrimas: iš būtojo laiko kamieno, rašoma ė.|saknis}rimo istorijos, si{ū|siūlyti: šaknyje ilgasis ū.|saknis}lančios mirting{a|"+R.ivardz+"}j{a|"+R.ivardz+"}m atsak{y|"+R.ymas+"}mus į klaus{i|"+R.imas+"}mus, kuriuos ka{s|kasdienė = kas + diena (kasdien): rašoma s.|sudurt}dienė egzistencija nuolat kelia k{i|kiek + vienas: kiekvienas.|sudurt}ekvienam iš mūsų.",

  "Visi mes gyvenimo kelionėje esame priversti ieškoti kelio į gimt{ą|"+R.ivardz+"}j{ą|"+R.ivardz+"} Itakę kaip Odisėjas, r{y|ryžtis – pavojingas žodis BE nosinės: ryžtis, pasiryžti, ryžtingai.|nosines}žtingai ieškotis naujos tėvynės kaip Enėjas, siekti šlovės kaip Achilas ar amžinojo gyvenimo – kaip šumerų pusdievis Gilgamešas.",

  "Mitai kalba ir apie žmogišk{a|"+R.ivardz+"}j{a|"+R.ivardz+"}i puik{y|puikus → puikybė: priesaga -ybė.|priesagos}bei, kuriai taip dažnai pasiduoda šiuolaikinis žmogus, gr{ė|grėsti (grėsė) – pavojingas žodis BE nosinės: kaitaliojasi su ė, o ne su nosine (grasinti, grėsmė).|nosines}siančius pavojus: Sizifo, Tantalo, Belerofonto ar Iksijono l{i|likti → likimas: šaknyje trumpas i.|saknis}kimas gali ištikti {{bet, kurį|bet kurį|Dalelytė bet visada rašoma atskirai: bet kas, bet kuris, bet koks.|kartu}} iš mūsų {{ne, kokioje, nors|ne kokioje nors|Ne su įvardžiais rašoma atskirai, o dalelytė nors – irgi atskirai.|ne}} mitinėje amžinybėje, o r{e|"+R.tarpt+"}aliame laike ir erdvėje.",

  "Šiuolaikinis žmogus, laikantis save {{kol, kas|kol kas|„kol kas“ rašoma atskirai.|kartu}} mirtingu dievu ar {{net, gi|netgi|Gi rašoma kartu su nekaitomais vienskiemeniais žodžiais: netgi, argi, irgi.|kartu}} praded{ą|Esamojo laiko veikiamasis dalyvis, vyr. g. vns. trumpoji forma: pradedąs (= pradedantis).|dalyviai}s vaidinti patį Dievą, įg{y|"+R.gyti+"}tų daugiau išminties ir naudos įd{ė|įdėmus → įdėmiai (dėmesys): šaknyje ė.|saknis}miai perskait{ę|Būtojo kartinio laiko veikiamasis dalyvis, vyr. g. vns.: -ęs (perskaitęs, išstudijavęs).|dalyviai}s graikiškų mitų rinktinę, nei išstudij{a|studijuoti → studijavo → išstudijavęs: -uoti veiksmažodžių būtajame laike yra -avo, todėl rašoma a.|priesagos}vęs kokį nors genų inžinerijos, klonavimo ar vadinamosios „vis{a|„Visa ko teorija“ – nusistovėjęs terminas (angl. theory of everything), rašoma visa.|galunes} ko teorijos“ vadovėlį.",

  "Pagaliau tikroviški mito pasauliai suteikia daugiau tikroviškumo ir dažnai {{per, ne, lyg|pernelyg|pernelyg – vienas prieveiksmis, rašomas kartu (bet: per daug, per mažai – atskirai).|kartu}} nusivadėjusiai, tikrumo stokojančiai mūsų r{e|"+R.tarpt+"}alybei.",

  "Iš vaizduotės gelmių iškelti tikroviški mito pasauliai gali suteikti daugiau tikrumo pač{ia|"+R.ia+"}i tikrov{e|tikrovė → tikrovei (naudininkas -ei).|galunes}i, ypač kai ji tampa vis labiau netikra – virtuali, simuliuota ar kitaip falsifikuota."
];

const norm = s => s.trim().toLowerCase().replace(/\s+/g, " ");
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");

// Turn a sentence string into parts: text, letter blank, or word blank
function parse(src) {
  const parts = [], re = /\{\{([^|}]*)\|([^|}]*)\|([^}]*)\}\}|\{([^|}]*)\|([^}]*)\}/g;
  let last = 0, m;
  const split = r => { const i = r.lastIndexOf("|"); return i < 0 ? { rule: r, cat: "" } : { rule: r.slice(0, i), cat: r.slice(i + 1) }; };
  while ((m = re.exec(src))) {
    if (m.index > last) parts.push({ t: src.slice(last, m.index) });
    if (m[1] !== undefined) parts.push({ word: true, hint: m[1], ans: m[2], ...split(m[3]) });
    else parts.push({ ans: m[4], ...split(m[5]) });
    last = re.lastIndex;
  }
  if (last < src.length) parts.push({ t: src.slice(last) });
  return parts;
}

// Rebuild the word around blank k of a parsed sentence (neighbour blanks use correct answers)
function wordAround(parts, k, fill) {
  const txt = p => p.t !== undefined ? p.t : (p.word ? null : p.ans.split("/")[0]);
  let left = "", right = "";
  for (let j = k - 1; j >= 0; j--) {
    const s = txt(parts[j]); if (s === null) break;
    const m = s.match(/[\p{L}-]*$/u)[0]; left = m + left;
    if (m.length < s.length) break;
  }
  for (let j = k + 1; j < parts.length; j++) {
    const s = txt(parts[j]); if (s === null) break;
    const m = s.match(/^[\p{L}-]*/u)[0]; right += m;
    if (m.length < s.length) break;
  }
  return left + fill + right;
}

// Mistakes saved in the browser: { "sentence:part": { wrong, streak, last } }
// A mistake is cleared after 2 correct answers in a row.
const MISTAKES_KEY = "rasyba-mistakes";
function loadMistakes() {
  let m; try { m = JSON.parse(localStorage.getItem(MISTAKES_KEY)) || {}; } catch { m = {}; }
  for (const id in m) {
    const [si, k] = id.split(":").map(Number), p = SENTENCES[si] && parse(SENTENCES[si])[k];
    if (!p || p.t !== undefined) delete m[id];
  }
  return m;
}
const saveMistakes = m => localStorage.setItem(MISTAKES_KEY, JSON.stringify(m));
function recordAnswer(si, k, ok, given) {
  const m = loadMistakes(), id = si + ":" + k;
  if (ok) {
    if (m[id] && ++m[id].streak >= 2) delete m[id];
  } else {
    m[id] = { wrong: (m[id]?.wrong || 0) + 1, streak: 0, last: given };
  }
  saveMistakes(m);
}

// Full rule for each rule type (opened with "Visa taisyklė" under a mistake)
const FULL = {
  nosines: `<p><b>I. Kaitaliojasi su an, en, in, un</b> → rašoma nosinė: kąsti–kando, kęsti–kentė, lįsti–lindo, siųsti–siuntė, spręsti–sprendė, švęsti–šventė, pažįsta–pažinti.<br><i>Pavojingi be nosinių:</i> akti–anka–ako, gesti–genda–gedo.</p>
<p><b>II. Ilgieji balsiai kaitaliojasi tarpusavyje</b> (ą – į – ę), bet <b>ne su ė</b>: drįsti–drąsa, grįžti–grąža–gręžti–grąžtas, mąstyti–mįslė, tęsti–tįsti–tąsa, tręšti–trąša.<br><i>Pavojingi be nosinių:</i> draskyti (drėskė), dvesia (dvėsė), grasinti (grėsė), driksti–dryksta, gižti–gyžta, tižti–tyžta, pasiryžti, ryžtis, tysoti, tesėti žodį.</p>
<p><b>III. Senuose daiktavardžiuose</b> (pagal kilmę): ąsa, ąsotis, ąžuolas, įsčios, ląsta, ląstelė, lęšis, vąšas, žąsis, žąslai.<br><i>Pavojingi be nosinių:</i> asla, lysvė, mastas, mastelis, gryčia, ražas, ražiena, žastas, ypatybė, ypač.</p>
<p><b>IV. Kai kurių veiksmažodžių esamajame laike:</b> bąla, gęsta, glęžta, kąra, knęžta, kęžta, mąžta, sąla, šąla, šąšta, tęžta, tręšta, žabąla.<br><i>Bet bendratyje, kituose laikuose ir jų dariniuose – be nosinių:</i> apsalęs, nušašęs, pabalęs, pašalas, užges, gesina, balina, gesdamas.</p>`,

  saknis: `<p>Šaknis giminiškuose žodžiuose rašoma <b>vienodai</b>. Rask giminišką žodį ar bendratį, kur balsis aiškiai girdisi.</p>
<p><b>Ilgasis ar trumpasis balsis:</b> būti – būdas – būtina – būtis (ū); kurti – kūryba (u kaitaliojasi su ū); šaukti – šūkis – iššūkis (au kaitaliojasi su ū); gyti – gijo – įgytų (i kaitaliojasi su y); likti – likimas, trikti – sutrikimas (trumpas i).</p>
<p><b>e ar ė:</b> kvėpti – įkvėpimas, dėmesys – įdėmiai, ištverti – ištvėrė – ištvėrimas, bet semti – semiasi, atvejis – atvejais.</p>
<p>Jei giminiškas žodis nepadeda – žodį reikia įsiminti (byloja, siūlyti, santykis).</p>`,

  priesagos: `<p><b>-ymas</b> daromas iš <b>-yti</b> veiksmažodžių: papildyti → papildymas, aprašyti → aprašymas, atsakyti → atsakymas, išbandyti → išbandymas.</p>
<p><b>-imas</b> – iš kitų veiksmažodžių: klausti → klausimas, rausti → rausimas, kasti → kasimas. Iš <b>-inti</b>: gaivinti → gaivinimas.</p>
<p><b>-esnis, -esnė</b> – aukštesnysis laipsnis: gilus → gilesnis, laisvas → laisvesnė.</p>
<p><b>-umas</b> iš būdvardžių: įžvalgus → įžvalgumas, gražus → gražumas. <b>-ybė</b>: puikus → puikybė.</p>
<p><b>-uoti, -auti</b> veiksmažodžių būtajame laike <b>-avo</b>: studijuoti → studijavo → išstudijavęs, dainuoti → dainavo, keliauti → keliavo.</p>`,

  galunes: `<p><b>Minkštas priebalsis:</b> prieš a, o, u, ų rašoma i: panašiais, istoriniame, realiame, pačiai, didžiųjų.</p>
<p><b>Daugiskaitos kilmininkas</b> visada baigiasi <b>-ų</b>: archaiškų, žmonių, mokytojų.</p>
<p><b>Būdvardžiai su -us</b> daugiskaitos vardininke vyr. g.: <b>-ūs</b> (gražūs, pajėgūs, gausūs).</p>
<p><b>Daiktavardžiai su -ė</b> naudininke: <b>-ei</b> (tikrovė → tikrovei, realybė → realybei).</p>
<p>Nustatyk: kokia kalbos dalis → koks linksnis → koks skaičius → tada galūnė.</p>`,

  ivardz: `<p><b>Įvardžiuotinė forma = paprastoji forma + įvardžio jis / ji forma.</b></p>
<p>geras + jis → gerasis · gera + ji → geroji<br>gerame + jame → gerajame · geroje + joje → gerojoje<br>gerų + jų → gerųjų · geram + jam → gerajam<br>gerai + jai → gerajai · gerą + jį → gerąjį · gerą + ją → gerąją</p>
<p>Nosinė rašoma ten, kur ji yra paprastojoje formoje ir įvardyje: gimtą + ją → <b>gimtąją</b>, didžių + jų → <b>didžiųjų</b>.</p>
<p>Pvz.: pirmajame amžiuje, mirtingajam žmogui, žmogiškajai puikybei.</p>`,

  dalyviai: `<p><b>Veikiamieji dalyviai:</b><br>es. l. – einąs, einantis (dgs. einantys, gyvenantys, gaivinantys); trumpoji vyr. g. forma su <b>-ąs</b>: pradedąs, darąs<br>būt. k. l. – ėjęs, ėjusi (dgs. ėję, pastebėję); vns. vyr. g. su <b>-ęs</b>: perskaitęs, išstudijavęs<br>būt. d. l. – eidavęs · būs. l. – eisiąs, eisiantis</p>
<p><b>Neveikiamieji dalyviai:</b><br>es. l. – daromas (daromas iš esamojo laiko: pateikia → pateikiamas, daro → daromas)<br>būt. l. – darytas · būs. l. – darysimas</p>
<p><b>Padalyvis:</b> einant, ėjus, eidavus, eisiant · <b>Pusdalyvis:</b> eidamas, eidama</p>`,

  tariamoji: `<p><b>Tariamoji nuosaka</b> reiškia galimą ar norimą veiksmą: daryčiau, darytum, <b>darytų</b>, darytume, darytumėte.</p>
<p>3 asmuo visada baigiasi <b>-tų</b>: nevirstų, vestų, įgytų, turėtų.</p>
<p>Dažnai eina po <b>kad, jei, jeigu</b>: <i>Kad grįžimas nevirstų…, o vestų…</i></p>`,

  tarpt: `<p><b>Tarptautiniai žodžiai</b> rašomi pagal kilmės kalbą ir tarptautinį tarimą.</p>
<p>Junginiai <b>io, ia</b> po priebalsio: racionalus, aviacija, specialus.</p>
<p><b>ea</b> rašoma, kai kilmės kalboje yra e (lot. realis, gr. theatron): realus, realybė, idealas, teatras.</p>
<p>Kai kuriuose žodžiuose tarp balsių rašoma <b>j</b>: archajiškas, trajektorija.</p>`,

  sudurt: `<p><b>Išskaidyk žodį į dalis</b> – kiekviena dalis rašoma taip, kaip atskirai:</p>
<p>aki + vaizdu → akivaizdu · dvi + dešimt → dvidešimt · kas + diena → kasdienė · kiek + vienas → kiekvienas · ana + pus → anapus<br><i>Išimtis:</i> ne + yra → nėra (susilieja į ė).</p>
<p><b>Priešdėliai:</b> san- / sam- / su- – to paties priešdėlio variantai (sam- prieš b, p: sambūris; san- prieš d, t, g, k: santykis, sandora); iš- visada su š (išbėgti).</p>`,

  ne: `<p><b>1. Kartu</b> su daiktavardžiais, būdvardžiais, veiksmažodžiais ir būdvardiniais prieveiksmiais, jei <b>nėra priešpriešos</b>: nelaimė, negeras, nežino. Su veiksmažodžiais – irgi kartu, jei nėra priešpriešos: negali.</p>
<p><b>Atskirai</b>, jei yra priešprieša (o, bet, tačiau): <i>Knyga buvo ne nauja, o aptrinta.</i></p>
<p><b>2. Visada atskirai:</b><br>su nebūdvardiniais prieveiksmiais – ne visada, ne kaip, ne taip, ne čia, ne dabar<br>su įvardžiais – ne aš, ne toks, ne kokioje nors<br>su skaitvardžiais – ne vienas, ne pirmas<br>su dalelytėmis – ne tik, ne vien, ne tiktai<br>su prielinksniais – ne be reikalo, ne iš namų<br>tarp dviejų vienodų žodžių – kas ne kas, kur ne kur</p>
<p><b>3. Įsidėmėk:</b> kartu, kai reikšmė priešinga – nekoks (prastas), nekaip (prastai), nekiek (mažai).</p>`,

  kartu: `<p><b>GI</b> – kartu su nekaitomais vienskiemeniais žodžiais: argi, betgi, irgi, netgi, kurgi, vėlgi. Atskirai nuo kitų: kas gi, kodėl gi. Išimtys: kadangi, nejaugi.</p>
<p><b>VIS</b> – visada atskirai (vis tiek, vis dėlto, vis dar), išskyrus <b>visgi</b>.</p>
<p><b>PER</b> – atskirai (per daug, per vėlai), išskyrus <b>pernelyg</b>; kartu su sutrumpėjusiais: perniek, pernakt.</p>
<p><b>BET, KAI, KAŽIN, NORS, IR, JAU, PAT, TIK</b> – visada atskirai: bet kas, bet kuris, kai kas, kas nors, kada nors, kol kas, vos tik.</p>
<p><b>TE, BE, TEBE</b> – kartu su veiksmažodžiais ir būdvardžiais: tebetoli, bekalbant.</p>
<p><b>galbūt</b> – vienas žodis, rašomas kartu.</p>`,

  prielinks: `<p><b>1. Atskirai</b> nuo nesutrumpėjusių žodžių ir bevardės giminės formų: be abejo, be galo, be reikalo, be to, dėl ko, iki galo, iš anksto, iš dalies, iš karto, iš tiesų, iš tikrųjų, iš viso, ko gero, per pusę, už dyką.</p>
<p><b>2. Kartu</b> su sutrumpėjusiais žodžiais: bemaž, iškart, išsyk, išties, išvien, išvis, perdien, perpus, popiet, suvis, užvis, užtat.</p>`
};
const fullRule = cat => FULL[cat] ? `<details class="full"><summary>Visa taisyklė</summary><div class="body">${FULL[cat]}</div></details>` : "";
