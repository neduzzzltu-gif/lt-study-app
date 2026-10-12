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

// Full rule for each rule type, from the official VLKK rules (content/vlkk/rasyba-2022.pdf)
const SRC_R = p => `<p class="src">📘 VLKK „Lietuvių kalbos rašyba“ (2022), ${p}</p>`;
const FULL = {
  nosines: SRC_R("2.3 p.") + `<p><b>2.3.1.</b> Nosinės ą, ę, į, ų prieš s rašomos šaknyse, kai ilgieji balsiai kaitaliojasi su <b>an, en, in, un</b>: bręsti (brendo), galąsti (galanda), grįsti (grindė), išsigąsti (išsigando), kąsti (kando), kęsti (kentė), lįsti, ląsta (lindo), pažįsta (pažinti), rąstas, ręsti (rentė), skęsti (skendo), siųsti (siuntė), skųsti (skundė), spąstai, spęsti (spendė), spręsti (sprendė), švęsti (šventė), žįsti (žindo).<br><i>Nerašomos</i>, kai n atsiranda tik esamajame laike: akti, anka, ako; sekti, senka, seko; gesti, genda, gedo.</p>
<p><b>2.3.2.</b> Prieš s, š, ž rašomos, kai garsai giminiškuose žodžiuose <b>kaitaliojasi tarpusavyje</b>: drąsa – drįsti; grąža, grąžtas – grįžti, gręžti; mąstyti – mįslė; ręžtis – rąžytis; tąsa – tęsti – tįsti; trąšos – tręšti.<br><i>Nerašomos:</i> kai a, e kaitaliojasi su <b>ė</b> (graso, gresia, grėsti; drasko, dreskia, drėskė); kai ilgasis balsis kaitaliojasi su trumpuoju (driksti – dryksta – drisko, gižti – gyžta, įgristi – įgrysta, tižti – tyžta); <b>y</b> rašoma: lysti „plonėti“, ryžtas, ryžtis, ryžtingas, pasiryžęs; mastas, mastelis (ne mąst-); asla, brasta, lysvė, gryčia, gražinti „puošti“, ražas, ražiena, pažastis, vaškas, žastas; tesėti (žodį).</p>
<p><b>2.3.3.</b> Rašomos, kai garsai ilgi ir kirčiuotame, ir nekirčiuotame skiemenyje: a) <b>daiktavardžiuose</b> – ąsa, ąsotis, ąžuolas, ląsta, ląstelė, lęšis, vąšas, žąsis, žąslai, įsčios; b) <b>veiksmažodžių esamojo laiko</b> šaknyse – bąla, gęsta, glęžta, mąžta, sąla, šąla, šąšta, tęžta, tręšta, kęžta, knęžta, žabąla (ir jų formose: gęstantis, šąlant).<br><i>Bet</i> bendratyje, kituose laikuose ir dariniuose – be nosinių: apsalti, nušašęs, pabalęs, balina, šalti, pašalas, sutežęs, sutrešęs, užges, gesina, gesdamas.</p>
<p><b>2.3.4–2.3.5.</b> Priešdėliai <b>są-</b> (sąjunga, sąrašas) ir <b>į-</b> (įtaka, įdomus) – su nosine; jų variantai sam-, san-, in-, im- – be nosinės (sambūris, sandara, santaka, intakas).</p>`,

  saknis: SRC_R("2.1 ir 2.2 p.") + `<p><b>2.1.1–2.1.2.</b> Šaknies balsiai paprastai rašomi taip, kaip tariami: ilgai ir įtemptai tariami garsai žymimi <b>y, ū</b> (yla, knyga, mylėti, tylus), trumpi – <b>i, u</b>.</p>
<p><b>2.1.3.</b> Pagrindinių veiksmažodžio formų šaknyse trumpieji ir ilgieji balsiai gali kaitaliotis: gyti, gyja, gijo; lyti, lyja, lijo; griūti, griūva, griuvo; pūti, pūva, puvo.</p>
<p><b>2.1.7.</b> Veiksmažodinių daiktavardžių šaknyje paprastai rašoma tokio pat ilgumo balsė kaip toje veiksmažodžio formoje, iš kurios jie padaryti: apvija (apvijo), apžiūra (apžiūri), trūkis (trūko).</p>
<p>Darinių šaknyje dėl balsių kaitos gali būti rašoma y, ū (plg. 2.1.8): kurti – kūryba, šaukti – iššūkis. Trumpas balsis lieka: likti – likimas, trikti – sutrikimas.</p>
<p><b>2.2.4.</b> Lietuviškų žodžių šaknyse rašoma tik <b>e</b>, negali būti ia: semti – semiasi, atvejis – atvejais.</p>`,

  priesagos: SRC_R("2.1, 2.2 p.") + `<p><b>-ymas / -imas.</b> Veiksmažodiniai daiktavardžiai daromi iš veiksmažodžio: -yti → <b>-ymas</b> (papildyti → papildymas, atsakyti → atsakymas, išbandyti → išbandymas); -ti, -inti → <b>-imas</b> (klausti → klausimas, rausti → rausimas, gaivinti → gaivinimas).</p>
<p><b>Aukštesnysis laipsnis:</b> -esnis, -esnė (gilus → gilesnis, laisvas → laisvesnė). <b>2.2.12.</b> Aukščiausiajame laipsnyje rašoma -(i)ausias: didžiausias, greičiausias.</p>
<p><b>-umas, -ybė</b> iš būdvardžių: įžvalgus → įžvalgumas, puikus → puikybė.</p>
<p><b>-uoti, -auti</b> veiksmažodžių būtajame laike <b>-avo</b>: studijuoti → studijavo → išstudijavęs, keliauti → keliavo.</p>`,

  galunes: SRC_R("2.1.15, 2.2.1, 2.2.8, 2.3.7–2.3.9 p.") + `<p><b>2.2.1.</b> <b>e</b> rašoma galūnėse, jei vardininke yra <b>-ė</b>: tikrovė → tikrovei, realybė → realybei.</p>
<p><b>2.2.8.</b> <b>(i)a</b> rašoma galūnėse, kai vienaskaitos vardininke nėra ė: panašus → panašiais, istorinis → istoriniame, reali → realiame, pati → pačiai.</p>
<p><b>2.1.15.</b> <b>ū</b> rašoma (i)u linksniuotės būdvardžių vyr. g. daugiskaitos vardininke: pajėgūs, malonūs, ryškūs.</p>
<p><b>2.3.7.</b> ą, ę, į, ų – vienaskaitos <b>galininke</b> (knygą, gėlę, brolį, sūnų). <b>2.3.9.</b> ų – daugiskaitos <b>kilmininke</b> (archajiškų, knygų, brolių).</p>
<p><b>2.3.8 c.</b> Nosinės <b>nerašomos</b> bevardės giminės galūnėse: <i>Visa palikau namie</i> – todėl ir „visa ko teorija“.</p>`,

  ivardz: SRC_R("2.3.11 p.") + `<p><b>Įvardžiuotinė forma</b> = paprastoji forma + įvardžio jis / ji forma: gerame + jame → gerajame, gerų + jų → gerųjų, geram + jam → gerajam, gerai + jai → gerajai.</p>
<p><b>2.3.11.</b> Nosinės rašomos: a) vienaskaitos <b>galininko</b> ir daugiskaitos <b>kilmininko</b> abiejuose galūnės skiemenyse – gražųjį, gražiąją, naująjį, naująją, antrąjį; gražiųjų, naujųjų, didžiųjų; b) ą – mot. g. vns. įnagininko ir dgs. galininko priešpaskutiniame skiemenyje – gražiąja, naująsias.</p>
<p><i>Vienaskaitos naudininko ir vietininko galūnėse nosinės nerašomos:</i> naujajai, naujajam, naujajame, pirmajame, mirtingajam, žmogiškajai.</p>`,

  dalyviai: SRC_R("2.3.10, 2.2.9 p.") + `<p><b>2.3.10 a.</b> <b>ą, į</b> rašomos veikiamųjų dalyvių trumpųjų formų vyr. g. vardininke: es. l. klausąs, rašąs, <b>pradedąs</b>, stovįs, tylįs; būs. l. rašysiąs, tylėsiąs.</p>
<p><b>2.3.10 b.</b> <b>ę</b> rašoma būtojo kartinio ir dažninio laiko vyr. g. dalyvių vardininke: vns. matęs, <b>perskaitęs</b>, <b>išstudijavęs</b>; dgs. matę, <b>pastebėję</b>; rašydavęs, rašydavę.</p>
<p><b>Ilgosios formos</b> es. l.: einantis, dgs. einantys (gaivinantys, gyvenantys).</p>
<p><b>Neveikiamieji</b> es. l. dalyviai daromi iš esamojo laiko; <b>2.2.9 a</b> – esamojo laiko 3 asm. baigmenyje rašoma (i)a: pateikia → pateikiamas, pateikiamos.</p>`,

  tariamoji: SRC_R("2.3.12 p.") + `<p><b>2.3.12.</b> Nosinė <b>ų</b> rašoma tariamosios nuosakos <b>trečiajame asmenyje</b>: aiškintų, bėgtų, eitų, lauktų, matytų, norėtų, rašytų, reikėtų – ir nevirstų, vestų, įgytų.</p>
<p>Sangrąžos dalelytė -si galūnės nekeičia: juoktųsi, mokytųsi.</p>
<p>Tariamoji nuosaka dažnai eina po <b>kad, jei</b>: <i>Kad grįžimas nevirstų…, o vestų…</i></p>`,

  tarpt: SRC_R("2.2.4, 2.2.11, 2.3.5 p.") + `<p><b>2.2.4.</b> Lietuviškų žodžių šaknyse rašoma tik e. Nelietuviškos kilmės žodžiai rašomi pagal kilmę: <b>e</b> – realus, realybė, idealas, teatras (lot. realis); <b>2.2.11.</b> su <b>ia</b> rašomi tik kai kurie nelietuviški žodžiai (aliarmas, miniatiūra, pliažas).</p>
<p>Junginys <b>io</b> po priebalsio: racionalus, aviacija, specialus.</p>
<p><b>2.3.5 2*.</b> Tarptautiniuose žodžiuose pradžioje rašoma <b>i</b> (idealas, iracionalus), lietuviškuose – y (yla, ypač).</p>
<p>Tarp balsių kai kuriuose žodžiuose rašoma j: archajiškas, trajektorija.</p>`,

  sudurt: SRC_R("2.1.12, 2.3.4, 4 p.") + `<p><b>Išskaidyk žodį į dalis</b> – kiekviena dalis rašoma kaip atskirai: aki + vaizdu → akivaizdu, dvi + dešimt → dvidešimt, kas + diena → kasdienė, kiek + vienas → kiekvienas, ana + pus → anapus.</p>
<p><b>4.4.</b> Sudurtinių žodžių dėmenų sandūroje paprastai rašomos visos susidūrusios balsės ir priebalsės.</p>
<p><b>2.1.12.</b> Kai priešdėlis ne- susilieja su būti formomis, rašoma viena raidė: ne + yra → <b>nėra</b>.</p>
<p><b>2.3.4.</b> Priešdėlis są- turi variantus sam-, san- (be nosinės): sambūris, sandara, <b>santykis</b>, santaka.</p>`,

  ne: SRC_R("5.2.1–5.2.5 p.") + `<p><b>5.2.1. Kartu</b>, kai ne suteikia priešingą ar kitą reikšmę: su daiktavardžiais (nelaimė, nesėkmė), būdvardžiais (negeras, nedidelis), <b>veiksmažodžiais ir jų formomis</b> (negalėti, nematyti), būdvardiniais prieveiksmiais (negerai, nemažai); su įvardžiais ir įvardiniais prieveiksmiais, kai sudaro kitos reikšmės žodžius – nekaip „prastai“, nekoks „prastas“, nekiek „nedaug“.</p>
<p><b>5.2.2. Atskirai nuo visų kalbos dalių</b>, kai prieštaraujama ar norima paneigti: <i>Uždavinys buvo ne lengvas, o labai sunkus. Jis ne bėga, o lėkte lekia.</i></p>
<p><b>5.2.4.</b> Atskirai su aukštesniuoju / aukščiausiuoju laipsniu, kai nurodomas lyginamasis objektas: <i>Jis ne prastesnis mokinys už kitus.</i></p>
<p><b>5.2.5. Visada atskirai:</b> a) nuo įvardžių ir skaitvardžių – ne aš, ne toks, ne koks, ne kiekvienas, ne vienas; b) nuo įvardinių ir kai kurių kitų prieveiksmių – ne visada, ne taip, ne čia, ne dabar, ne veltui, ne tiktai, ne vien; c) tarp dviejų vienodų žodžių – kas ne kas, kur ne kur; d) po dalelyčių – ar ne, dar ne, vos ne.</p>`,

  kartu: SRC_R("5.2.7–5.2.9 p.") + `<p><b>5.2.9 b. GI kartu</b> su nekaitomais vienskiemeniais žodžiais: argi, betgi, irgi, kaipgi, netgi, taigi, vėlgi, visgi. <b>5.2.8 d. Atskirai</b> nuo kaitomų, daugiaskiemenių žodžių ir samplaikų: kas gi, kodėl gi, rytoj gi. <b>5.2.9 c.</b> Suaugę: kadangi, nejaugi.</p>
<p><b>5.2.8 c. PER atskirai:</b> per didelis, per vėlai. <b>5.2.9 a.</b> Kartu: pernelyg, nepernelyg, perdėm; nė – nėmaž, nėkart.</p>
<p><b>5.2.8 b.</b> Nė, nei – atskirai: nė vieno, nei vienas, nei du.</p>
<p><b>5.2.7.</b> Nebe, te, be, tebe – kartu su veiksmažodžiais ir būdvardžiais (nebegalėti, tebetoli, bekalbant), atskirai nuo daiktavardžių, įvardžių ir kai prieštaraujama (nebe tas; Dangus nebe mėlynas, o pilkas).</p>
<p>Dalelytės <b>nors, bet, kai, kažin</b> rašomos atskirai: kas nors, kada nors, bet kuris, kai kas, kol kas. <b>Galbūt</b> – vienas žodis.</p>`,

  prielinks: SRC_R("5.1, 5.3 p.") + `<p><b>5.3.1.</b> Prielinksniai visada rašomi <b>atskirai</b>, kai sudaro konstrukcijas su linksniuojamais ar nekaitomais žodžiais: be abejo, be galo, be reikalo, be to, dėl ko, iki galo, iš anksto, iš dalies, iš eilės, iš esmės…</p>
<p><b>5.1.</b> <b>Kartu</b> rašomi sutrumpėję žodžiai: bemaž, iškart, išsyk, išties, išvis, perdien, perpus, popiet, suvis, užvis, užtat.</p>
<p><b>5.3.2.</b> Polinksniai dėka, link – visada atskirai.</p>`
};
const fullRule = cat => FULL[cat] ? `<details class="full"><summary>Visa taisyklė (VLKK)</summary><div class="body">${FULL[cat]}</div></details>` : "";
