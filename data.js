// Shared data for rasyba.html and klaidos.html

// Rule types: name + hint that points to the rule without giving the answer
const CATS = {
  nosines:   { name: "Nosinės šaknyje", hint: "Nosinės šaknyje. Rask giminišką žodį: ar balsis kaitaliojasi su an, en, in, un ar su kitu ilguoju balsiu (ą – į – ę)? Jei kaitaliojasi su ė ar y – nosinės nėra (pavojingi žodžiai)." },
  saknis:    { name: "Šaknies balsiai", hint: "Šaknies balsis. Rask giminišką žodį ar bendratį ir pažiūrėk, kaip ten rašoma šaknis (ilgas ar trumpas balsis?)." },
  priesagos: { name: "Priesagos", hint: "Priesaga. Iš kokio žodžio padarytas šis žodis? Prisimink: -yti → -ymas, -ti / -inti → -imas, būdvardis → -esnis, -umas, -ybė." },
  galunes:   { name: "Galūnės", hint: "Galūnė. Kokia kalbos dalis, linksnis ir skaičius? Ar priebalsis prieš galūnę minkštas?" },
  ivardz:    { name: "Įvardžiuotinės formos", hint: "Įvardžiuotinė forma. Paimk paprastąją formą ir pridėk įvardžio jis / ji galūnę." },
  dalyviai:  { name: "Dalyviai", hint: "Dalyvis. Nustatyk laiką, giminę ir skaičių: es. l. -antis / -ąs, būt. l. -ęs / -ę, neveikiamasis -amas." },
  tariamoji: { name: "Veiksmažodžio formos", hint: "Veiksmažodžio forma. Kokia čia nuosaka ir asmuo? Po „kad“ dažnai eina tariamoji nuosaka." },
  tarpt:     { name: "Tarptautiniai žodžiai", hint: "Tarptautinis žodis. Rašoma taip, kaip kilmės kalboje (lot. ratio, realis)." },
  sudurt:    { name: "Sudurtiniai žodžiai, priešdėliai", hint: "Išskaidyk žodį į dalis: iš kokių žodžių ar priešdėlio jis sudarytas?" },
  ne:        { name: "NE rašymas", hint: "NE rašymas. Su kokia kalbos dalimi eina ne? Veiksmažodžiai, įvardžiai, prieveiksmiai ir dalelytės turi skirtingas taisykles." },
  kartu:     { name: "Dalelytės, kartu ar skyrium", hint: "Kartu ar skyrium. Kokia čia dalelytė ar junginys? Pasitikrink GI, PER, NORS, BET taisykles." },
  prielinks: { name: "Prielinksninės konstrukcijos", hint: "Prielinksninė konstrukcija. Ar antrasis žodis sutrumpėjęs, ar ne?" }
};

// Rules reused across blanks ("rule text|type")
const R = {
  ymas: "Priesaga -ymas daroma iš -yti veiksmažodžių: papildyti → papildymas, aprašyti → aprašymas, atsakyti → atsakymas, išbandyti → išbandymas.|priesagos",
  imas: "Priesaga -imas (trumpas i): gaivinti → gaivinimas, sutrikti → sutrikimas, klausti → klausimas, likti → likimas.|priesagos",
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

  "Kad gr{į|"+R.grizti+"}žimas prie mito nevirst{ų|"+R.tu+"} archa{ji/i|Žodis archajiškas (taip pat archaiškas): nosinės nėra, tarp balsių rašoma j.|saknis}šk{ų|Būdvardžio dgs. kilmininkas: archaiškų (kokių?).|galunes} atavistinių polinkių bei egzistencinių rudimentų gaiv{i|"+R.imas+"}nimu, o vest{ų|"+R.tu+"} prie laisvos k{ū|"+R.kuryba+"}rybos ir laisv{e|"+R.esnis+"}snės b{ū|"+R.buti+"}ties versmių, mito prigimtį b{ū|"+R.buti+"}tina apm{ą|"+R.masty+"}styti naujai – naujai klausti tiek apie paties mito esmę, tiek apie mito s{a|Priešdėlis san- (santykis, sandora) rašomas be nosinės.|sudurt}nt{y|santykis, santykiai: šaknyje rašoma y.|saknis}kį su tuo, kas n{ė|nėra = ne + yra, todėl rašoma ė.|sudurt}ra mitas.",

  "Ak{i|Akivaizdu = aki- (akis) + vaizdu.|sudurt}vaizdu, kad vis gil{e|"+R.esnis+"}snės prarajos tarp mito ir logo, rac{i|"+R.tarpt+"}onalaus proto ir intuicijos, m{ą|"+R.masty+"}stymo ir vaizduotės raus{i|rausti → rausimas. "+R.imas+"}mas tikrai {{ne, gali|negali|Ne su veiksmažodžiais visada rašoma kartu: negali, nežino, nebuvo.|ne}} pasitarnauti tiems, kuriems lemta gyventi dv{i|dvi + dešimt: dvidešimt (trumpas i).|sudurt}dešimt pirm{a|"+R.ivardz+"}j{a|"+R.ivardz+"}me amžiuje.",

  "Mito išmintis ir mite įš{a|šalti → šaldyti → įšaldyti: šaknyje a.|saknis}ldyti gaivalingos vaizduotės kristalai, gaivinant{y|"+R.antys+"}s šiuolaikinio žmogaus k{ū|"+R.kuryba+"}rybingumą, pajėg{ū|Būdvardžiai su -us daugiskaitoje vyr. g. turi galūnę -ūs: pajėgus → pajėgūs.|galunes}s suteikti vilties ir įkv{ė|kvėpti → kvėpavimas → įkvėpimas: šaknyje ė.|saknis}pimo tiems, kurie kenčia nuo dvasinės disharmonijos ir egzistencinio sutr{i|"+R.imas+"}kimo.",

  "T{u|turėti – šaknyje trumpas u.|saknis}rėtume – kaip ir kitais panaš{ia|"+R.ia+"}is atv{e|atvejis → atvejais: šaknyje e.|saknis}jais – pasikliauti senovės graikų, didži{ų|"+R.ivardz+"}j{ų|"+R.ivardz+"} mūsų mokytojų, įžvalg{u|įžvalgus → įžvalgumas: priesaga -umas (trumpas u).|priesagos}mu, kurio jie s{e|semti → semiasi: šaknyje e.|saknis}miasi tiek iš mitinės vaizduotės versmių, tiek ir iš loginių proto galių.",

  "Senovės graikų m{ą|"+R.masty+"}stytojai yra pastebėj{ę|Būtojo kartinio laiko veikiamasis dalyvis, vyr. g. dgs.: pastebėję (jie pastebėję).|dalyviai}, kad mitai b{y|byla → byloti: šaknyje y.|saknis}loja ne apie tai, kas {{kada, nors|kada nors|"+R.nors+"}} buvo įvykę m{į|Nosinė į, nes kaitaliojasi su ą: mįslė – mąstyti (taisyklė II).|nosines}slingame istorin{ia|"+R.ia+"}me laike ir erdvėje, o apie tai, kas an{a|anapus = ana + pus: rašoma a.|sudurt}pus erdvės ir laiko egzistuoja visada.",

  "Mitai kalba apie archetipines, nuolat pasikartojančias egzistencines situacijas, į kurias patenka {{ne, tik|ne tik|Ne su dalelytėmis rašoma atskirai: ne tik, ne vien, ne tiktai.|ne}} mitų herojai, bet ir įprastame laike bei erdvėje gyvenant{y|"+R.antys+"}s žmonės.",

  "Mitai kalba apie amžinuosius išš{ū|šaukti → šūkis → iššūkis: ū kaitaliojasi su au.|saknis}kius, kuriuos tikrovė meta žmogui, ir apie laiko patikrintus b{ū|"+R.buti+"}dus dorotis su jais.",

  "Kartu su dievams, pusdieviams ir žmonėms tenkančių išband{y|"+R.ymas+"}mų apraš{y|"+R.ymas+"}mais mituose, {{be, ab__jo|be abejo|Prielinksniai rašomi atskirai nuo nesutrumpėjusių žodžių: be abejo, be galo, be reikalo.|prielinks}} pateik{ia|Neveikiamasis dalyvis daromas iš esamojo laiko: pateikia → pateikiamos.|dalyviai}mos ir jų ištv{ė|ištverti → ištvėrė → ištvėrimas: iš būtojo laiko kamieno, rašoma ė.|priesagos}rimo istorijos, si{ū|siūlyti: šaknyje ilgasis ū.|saknis}lančios mirting{a|"+R.ivardz+"}j{a|"+R.ivardz+"}m atsak{y|"+R.ymas+"}mus į klaus{i|"+R.imas+"}mus, kuriuos ka{s|kasdienė = kas + diena (kasdien): rašoma s.|sudurt}dienė egzistencija nuolat kelia k{i|kiek + vienas: kiekvienas.|sudurt}ekvienam iš mūsų.",

  "Visi mes gyvenimo kelionėje esame priversti ieškoti kelio į gimt{ą|"+R.ivardz+"}j{ą|"+R.ivardz+"} Itakę kaip Odisėjas, r{y|ryžtis – pavojingas žodis BE nosinės: ryžtis, pasiryžti, ryžtingai.|nosines}žtingai ieškotis naujos tėvynės kaip Enėjas, siekti šlovės kaip Achilas ar amžinojo gyvenimo – kaip šumerų pusdievis Gilgamešas.",

  "Mitai kalba ir apie žmogišk{a|"+R.ivardz+"}j{a|"+R.ivardz+"}i puik{y|puikus → puikybė: priesaga -ybė.|priesagos}bei, kuriai taip dažnai pasiduoda šiuolaikinis žmogus, gr{ė|grėsti (grėsė) – pavojingas žodis BE nosinės: kaitaliojasi su ė, o ne su nosine (grasinti, grėsmė).|nosines}siančius pavojus: Sizifo, Tantalo, Belerofonto ar Iksijono l{i|likti → likimas: šaknyje trumpas i.|saknis}kimas gali ištikti {{bet, kurį|bet kurį|Dalelytė bet visada rašoma atskirai: bet kas, bet kuris, bet koks.|kartu}} iš mūsų {{ne, kokioje, nors|ne kokioje nors|Ne su įvardžiais rašoma atskirai, o dalelytė nors – irgi atskirai.|ne}} mitinėje amžinybėje, o r{e|"+R.tarpt+"}aliame laike ir erdvėje.",

  "Šiuolaikinis žmogus, laikantis save {{kol, kas|kol kas|„kol kas“ rašoma atskirai.|kartu}} mirtingu dievu ar {{net, gi|netgi|Gi rašoma kartu su nekaitomais vienskiemeniais žodžiais: netgi, argi, irgi.|kartu}} praded{ą|Esamojo laiko veikiamasis dalyvis, vyr. g. vns. trumpoji forma: pradedąs (= pradedantis).|dalyviai}s vaidinti patį Dievą, įg{y|"+R.gyti+"}tų daugiau išminties ir naudos įd{ė|įdėmus → įdėmiai (dėmesys): šaknyje ė.|saknis}miai perskait{ę|Būtojo kartinio laiko veikiamasis dalyvis, vyr. g. vns.: -ęs (perskaitęs, išstudijavęs).|dalyviai}s graikiškų mitų rinktinę, nei išstudij{a|studijuoti → išstudijavo → išstudijavęs: rašoma a.|dalyviai}vęs kokį nors genų inžinerijos, klonavimo ar vadinamosios „vis{a|„Visa ko teorija“ – nusistovėjęs terminas (angl. theory of everything), rašoma visa.|galunes} ko teorijos“ vadovėlį.",

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
const loadMistakes = () => { try { return JSON.parse(localStorage.getItem(MISTAKES_KEY)) || {}; } catch { return {}; } };
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
