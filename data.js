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
  priebalsiai: { name: "Priebalsių rašyba", hint: "Priebalsis prieš kitą priebalsį tariamas kitaip. Rask giminišką žodį, kur po jo eina balsė." },
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

  "Mitai kalba ir apie žmogišk{a|"+R.ivardz+"}j{a|"+R.ivardz+"}i puik{y|puikus → puikybė: priesaga -ybė.|priesagos}bei, kuriai taip dažnai pasiduoda šiuolaikinis žmogus, gr{e|grėsti, grėsė, bet esamasis laikas gresia, todėl dalyvis gresiantis, gresiančius rašomas su e; nosinės nėra.|nosines}siančius pavojus: Sizifo, Tantalo, Belerofonto ar Iksijono l{i|likti → likimas: šaknyje trumpas i.|saknis}kimas gali ištikti {{bet, kurį|bet kurį|Dalelytė bet visada rašoma atskirai: bet kas, bet kuris, bet koks.|kartu}} iš mūsų {{ne, kokioje, nors|ne kokioje nors|Ne su įvardžiais rašoma atskirai, o dalelytė nors – irgi atskirai.|ne}} mitinėje amžinybėje, o r{e|"+R.tarpt+"}aliame laike ir erdvėje.",

  "Šiuolaikinis žmogus, laikantis save {{kol, kas|kol kas|„kol kas“ rašoma atskirai.|kartu}} mirtingu dievu ar {{net, gi|netgi|Gi rašoma kartu su nekaitomais vienskiemeniais žodžiais: netgi, argi, irgi.|kartu}} praded{ą|Esamojo laiko veikiamasis dalyvis, vyr. g. vns. trumpoji forma: pradedąs (= pradedantis).|dalyviai}s vaidinti patį Dievą, įg{y|"+R.gyti+"}tų daugiau išminties ir naudos įd{ė|įdėmus → įdėmiai (dėmesys): šaknyje ė.|saknis}miai perskait{ę|Būtojo kartinio laiko veikiamasis dalyvis, vyr. g. vns.: -ęs (perskaitęs, išstudijavęs).|dalyviai}s graikiškų mitų rinktinę, nei išstudij{a|studijuoti → studijavo → išstudijavęs: -uoti veiksmažodžių būtajame laike yra -avo, todėl rašoma a.|priesagos}vęs kokį nors genų inžinerijos, klonavimo ar vadinamosios „vis{a|„Visa ko teorija“ – nusistovėjęs terminas (angl. theory of everything), rašoma visa.|galunes} ko teorijos“ vadovėlį.",

  "Pagaliau tikroviški mito pasauliai suteikia daugiau tikroviškumo ir dažnai {{per, ne, lyg|pernelyg|pernelyg – vienas prieveiksmis, rašomas kartu (bet: per daug, per mažai – atskirai).|kartu}} nusivadėjusiai, tikrumo stokojančiai mūsų r{e|"+R.tarpt+"}alybei.",

  "Iš vaizduotės gelmių iškelti tikroviški mito pasauliai gali suteikti daugiau tikrumo pač{ia|"+R.ia+"}i tikrov{e|tikrovė → tikrovei (naudininkas -ei).|galunes}i, ypač kai ji tampa vis labiau netikra – virtuali, simuliuota ar kitaip falsifikuota."
];

// More sentences: Hamletas (2 tekstai), smalsumas, Testas 3 (added 2026-10-12)
(() => {
  const N = {
    dal: "Neveikiamasis dalyvis daromas iš esamojo laiko 3 asmens, kurio baigmenyje rašoma -ia: atskleidžia → atskleidžiamas, vengia → neišvengiamas, baudžia → nubaudžiamas, patiria → patiriama.|dalyviai",
    trump: "Esamojo laiko veikiamojo dalyvio trumposios formos vyr. g. vardininke rašoma ą, į: stengiąs, mokąs, galįs, turįs.|dalyviai",
    bus: "Būsimojo laiko 3 asmenyje, kai bendratis baigiasi -yti, -ūti, rašoma i, u: bus (būti), žus (žūti), gis (gyti).|saknis",
    ija: "-yti veiksmažodžių esamajame ir būtajame laike rašoma trumpas i: liudyti → liudija, skiepyti → skiepijo, nuodyti → nuodija, keršyti → keršija, kūnyti → įsikūnija.|saknis",
    sar: "Sangrąžinė forma: esamojo laiko -ia + si: elgiasi, liejasi, grumiasi, reiškiasi, remiasi.|galunes",
    vns: "Įvardžiuotinio būdvardžio vienaskaitos naudininke ir vietininke nosinės nerašomos: niekšingajam, trečiajame.|ivardz",
    gal: "Įvardžiuotinės formos vienaskaitos galininke ir daugiskaitos kilmininke nosinės rašomos abiejuose galūnės skiemenyse: kilniąją, lemtingąjį, tragiškąjį, prarastąją, naujųjų, šaltųjų, tikrųjų.|ivardz",
    inag: "Mot. g. vienaskaitos įnagininke ir daugiskaitos galininke ą rašoma priešpaskutiniame skiemenyje, o galūnėje – be nosinės: garsiąja, šviesiąja, baltąsias, didžiąsias.|ivardz",
    vard: "Įvardžiuotinės formos vardininke nosinės nėra: skirtasis, antrasis (nosinės tik galininke: skirtąjį).|ivardz",
    tuk: "Tariamosios nuosakos 3 asmuo baigiasi -tų, ir su -si: užtektų, norėtųsi, išliktų.|tariamoji",
    ymas: R.ymas, imas: R.imas, buti: R.buti,
    pr: "Priebalsis rašomas taip, kaip giminiškame žodyje prieš balsį:",
    nos1: "Nosinė rašoma, nes kaitaliojasi su an, en, in, un:",
    nos2: "Nosinė rašoma, nes kaitaliojasi su kitu ilguoju balsiu:",
    sa: "Priešdėlis są- rašomas su nosine: sąmonė, sąžinė, sąmokslas, sąjūdis.|sudurt",
    i: "Priešdėlis į- rašomas su nosine: neįmanomas, įsikūnijimas.|sudurt",
    yb: "Priesaga -ybė (-ybės): galimybė, aplinkybė, didybė.|priesagos",
    ue: "(i)u linksniuotės būdvardžių vyr. g. daugiskaitos vardininke rašoma ū: ryškūs, niūrūs, teisūs, smalsūs.|galunes",
    kiek: "kiek + vienas: kiekvienas.|sudurt"
  };
  const P = (t, c = "priebalsiai") => N.pr + " " + t + "|" + c;

  SENTENCES.push(
    "„Hamletas“ yra tragedija, paremta ne hero{ji|herojus → herojiškas: tarptautinių žodžių priesagoje -iškas po balsio rašoma j.|tarpt}ška asmenybe, bet žmogum. Pagrindinis personažas Hamletas – nauj{ų|"+N.gal+"}jų laikų žmogus, smalsus, lankstaus proto, nuolat besisteng{ią|"+N.trump+"}s suvo{k|"+P("suvokia → suvokti.")+"}ti savo situaciją būtyje ir nebūties ak{i|Akivaizdoje = aki- (akis) + vaizdas.|sudurt}vaizdoje.",

    "Hamletas {{ne, g_sdinančio|negąsdinančio|Ne su dalyviais rašoma kartu, kai nėra priešpriešos; gąsdinti – nosinė, nes kaitaliojasi su an (išsigando).|ne}} likimo neišveng{ia|"+N.dal+"}mybės auka. Užtekt{ų|"+N.tuk+"} jam a{ts|Priešdėlis at- rašomas visada vienodai: at + si → atsižadėti.|sudurt}ižadėti atsakomybės sau ir viskas išsispr{ę|"+N.nos1+" spręsti – sprendė.|nosines}stų savaim{e|Prieveiksmis savaime baigiasi -e.|galunes}.",

    "Jis nėra nei ner{y|ryžtas, ryžtingas – pavojingas žodis, rašoma y.|nosines}žtingas, nei bevalis, {{tik, tai|tiktai|„Tiktai“ – vienas žodis (dalelytė), rašomas kartu.|kartu}} jo veiksmams tr{ū|trūkti, trūksta, trūko – šaknyje ū.|saknis}ksta barbariškos aistros, jo valią paralyž{iuo|paralyžiuoti → paralyžiuoja (-iuoti veiksmažodis).|priesagos}ja m{ą|"+R.masty+"}stymas.",

    "Tad ir jo mirtis {{ne, tiek|ne tiek|Ne nuo įvardinių prieveiksmių rašoma atskirai: ne tiek, ne taip.|ne}} r{ū|rūstus, rūsčiai – šaknyje ū.|saknis}staus likimo sm{ū|smūgis – šaknyje ū.|saknis}gis, kiek a{b|"+P("absurdas – tarptautinis žodis, rašoma b kaip kilmės kalboje.")+"}surdiškas incidentas.",

    "Hamletas yra vienas įsp{ū|įspūdis, įspūdingas – šaknyje ū.|saknis}dingiausių personažų visoje Vakarų literatūroje. Tatai li{u|liudyti, liudininkas – šaknyje iu.|saknis}d{i|"+N.ija+"}ja ir tas faktas, kad jis nesiduoda galutinai atskleidž{ia|"+N.dal+"}mas ir padedamas literatūros istorijos lentyno{n|Kryptinis vietininkas (kur?): lentynon = į lentyną.|galunes}.",

    "Laikui bėgant jis, nel{y|lygus → nelyginant: šaknyje y.|saknis}ginant gen{i|genialus – tarptautinis žodis, rašoma i (geni-alus).|tarpt}alaus kūrėjo paleistas satelitas, skrieja intelektualinio pasaulio orbitoje, nuolat persik{u|Pusdalyvis daromas iš bendraties kamieno: kurti → kurdamas, todėl trumpas u.|saknis}rdamas ir k{ie|"+N.kiek+"}kvienai epochai atskleisdamas naujus savo prasmės aspektus.",

    "Nuo antrosios XVIII a. pusės kritikai daugiausia dėm{e|dėmesys – šaknyje e.|saknis}sio skyrė Hamleto charakterio analizei, bandydami įminti jo dels{i|delsti → delsimas. "+R.imas+"}mo m{į|"+N.nos2+" mįslė – mąstyti.|nosines}slę, atsakyti į klaus{i|"+R.imas+"}mą, ar jis tikrai pamiš{ė|Priesaga -ėlis: pamišti → pamišėlis (kaip nevykėlis, nusikaltėlis).|priesagos}lis, ar tik apsimeta.",

    "Subjektyvistams Hamleto motyvai gl{ū|glūdėti, glūdi – šaknyje ū.|saknis}di jo charakteryje ir yra grynai vidinio pob{ū|"+R.buti+"}džio. J. V. Gėtė dėl vis{a|Bevardės giminės galūnėje nosinė nerašoma: visa ko.|galunes} ko kaltina kiln{ią|"+N.gal+"}j{ą|"+N.gal+"} Hamleto prigimtį, {{per, ne, lyg|pernelyg|Pernelyg rašoma kartu.|kartu}} silpną kerštui, kaip gėlei skirt{a|"+N.vard+"}sis vazonas {ą|ąžuolas – nosinė senuose daiktavardžiuose.|nosines}žuolo šaknims.",

    "Objektyvistai keršto įvy{k|"+P("įvykti → įvykdyti, įvykdymas.")+"}dymo sta{b|"+P("stabdyti → stabdis, stabdžiu.")+"}džiu laiko išorin{e|Raidė e rašoma, jei vardininke yra -ė: išorinė → išorines.|galunes}s kli{ū|kliūtis – šaknyje ū (kliudyti, kliuvo).|saknis}tis: karalius {{vis_, laik|visąlaik|Sąaugos su galininku rašomos kartu ir su nosine: visąlaik, šįryt, kitąkart.|sudurt}} saugomas, tr{ū|trūkti, trūksta – šaknyje ū.|saknis}ksta t{ie|tiesa, tiesioginis – šaknyje ie.|saknis}sioginių kaltės įrod{y|"+N.ymas+"}mų, jei ž{u|"+N.bus+"}s karalius, {{iš, vis|išvis|Prielinksniai rašomi kartu su sutrumpėjusiais žodžiais: išvis, iškart.|prielinks}} b{u|"+N.bus+"}s sunaikinta vienint{e|vienintelis, vienintelė – rašoma e.|saknis}lė galim{y|"+N.yb+"}bė įrodyti kaltę.",

    "K{ie|"+N.kiek+"}kvienas šimtmetis ar žym{e|"+R.esnis+"}snis literatūrinis sąj{ū|sąjūdis – šaknyje ū (judėti, jūdinti).|saknis}dis davė skirtingą Hamleto interpretaciją. XX a. Hamleto portretai pasiž{y|žymė, žymėti → pasižymi: šaknyje y.|saknis}mi {{ne, tik|ne tik|Ne su dalelytėmis rašoma atskirai: ne tik, ne vien.|ne}} gausa, bet ir įvairove. Iš jų b{ū|"+R.buti+"}dingiausiais laikytini psichoanalitiniai portretai, paremti Z. Froido Edipo komplekso teorija.",

    "Pasak E. Jones, Hamletas nekenčia Klaudijaus {{ne, dėl, to|ne dėl to|Prielinksnis rašomas atskirai (dėl to), o ne – atskirai, kai prieštaraujama (ne dėl to, bet todėl).|ne}}, kad jis nuž{u|žudyti, žudo – šaknyje trumpas u.|saknis}dė, bet todėl, kad užėmė šio vietą, į kurią pats pretenduoja.",

    "Hamleto pas{ą|"+N.sa+"}monėje Klaudijus yra jo paties užgniau{ž|"+P("gniaužti, gniaužia → užgniaužtų.")+"}tų siekimų įsik{ū|kūnas → įsikūnyti: šaknyje ū.|saknis}n{i|"+N.ija+"}jimas, ir jis negal{į|"+N.trump+"}s atkeršyti niekšing{a|"+N.vns+"}j{a|"+N.vns+"}m dėdei, nenuž{u|žudyti – šaknyje trumpas u.|saknis}dydamas sav{ę|Įvardžių manęs, tavęs, savęs kilmininke rašoma ę.|galunes}s. Psichoanalitikai atmeta tradicines neveiksmingumo priež{a|priežastis – rašoma a.|saknis}sčių teorijas.",

    "Klaudijus yra antr{a|"+N.vard+"}sis savo reikšme tragedijos personažas. Ilgainiui teatrinė tradicija jam primetė treč{ia|Tarp sudurtinių žodžių dėmenų rašoma (i)a: trečiaeilis.|sudurt}eilio niekšo vaidmenį, skirtą Hamleto kilnumui pabrė{ž|"+P("brėžti, brėžia → pabrėžti.")+"}ti.",

    "{{Iš, tiesų|Iš tiesų|Prielinksniai rašomi atskirai nuo nesutrumpėjusių žodžių: iš tiesų, iš tikrųjų.|prielinks}} Klaudijus yra didži{u|Priesaga -ulis, -ulė: didžiulis, didžiulė.|priesagos}lės apimties personažas, paties Hamleto vertas antagonistas.",

    "Jis {{taip, pat|taip pat|„Taip pat“ rašoma atskirai.|kartu}} lankstaus proto, kilnios laikys{e|Priesaga -sena: laikysena, eisena.|priesagos}nos, gražb{y|gražbylys – šaknyje y (byla, bylóti).|saknis}lys, mok{ą|"+N.trump+"}s tinkamai prab{i|prabilti, prabilo – šaknyje trumpas i.|saknis}lti.",

    "Jis myli Gertrūdą ir nesulaikomai rieda į pakalnę, suvo{k|"+P("suvokia → suvokdamas.")+"}damas likiminę nusikalt{i|"+R.imas+"}mo logiką. Ofelijos vaidmuo, priešingai, buvo dirbtinai iškeltas. Šekspyrologai ab{e|abejoti – šaknyje e.|saknis}joja Ofelijos nekaltumu. Tatai iš dalies paremia Hamleto elg{e|Priesaga -esys: elgesys.|priesagos}sys, b{e|beje – rašoma e.|saknis}j{e|beje – rašoma e.|saknis}, ji šnipinėja tėvo ir karaliaus naudai.",

    "Kiti personažai – Polonijus, Horacijus, Laertas, Rozenkrancas ir Gildensternas, Gertrūda – visi ryšk{ū|"+N.ue+"}s ir gyvi žmonės.",

    // Hamletas, 2 dalis (pagal R. Tamošaitį)
    "Pasaulio nuop{uo|pulti, puolė → nuopuolis: šaknyje uo.|saknis}lio, krizės b{ū|"+R.buti+"}sena Šekspyro tragedijoje nusakyta gars{ią|"+N.inag+"}j{a|"+N.inag+"} išnirusio laiko metafora. Tai Hamletas konstatuoja sužinoj{ę|Būtojo kartinio laiko veikiamasis dalyvis vyr. g. vns.: -ęs.|dalyviai}s tėvo mirties aplink{y|"+N.yb+"}bes.",

    "Veikėjas tiesiog pasmer{k|"+P("smerkti, smerkia → pasmerktas.")+"}tas hero{ji|herojus → herojiškas: tarptautinių žodžių priesagoje -iškas po balsio rašoma j.|tarpt}škam veiksmui, turi tapti lemties vykd{y|vykdyti → vykdytojas: rašoma y.|priesagos}toju.",

    "Hamletui norėt{ų|"+N.tuk+"}si i{šs|Priešdėlis iš- rašomas visada vienodai: iš + si → išsilaisvinti.|sudurt}ilaisvinti iš dvejonių, jo netenkina l{i|Ligi – gi rašoma kartu su vienskiemeniais nekaitomais žodžiais.|kartu}gi galo neįsis{ą|"+N.sa+"}moninti veiksmai.",

    "Trečiaj{a|"+N.vns+"}m{e|Vietininko galūnė -e.|galunes} veiksme Hamleto surežisuotas vaidinimas atskleidžia Klaudijaus niekšybę: nusikalt{ė|Priesaga -ėlis: nusikaltėlis.|priesagos}lis {{ne, be, gali|nebegali|Dalelytės nebe, be su veiksmažodžiais rašomos kartu.|ne}} nuslėpti sutrik{i|trikti → sutrikimas: šaknyje trumpas i.|saknis}mo, jis dr{a|draskyti (drėskė) – pavojingas žodis BE nosinės: a kaitaliojasi su ė.|nosines}skomas sl{e|slėgti – slegia: esamajame laike trumpas e.|saknis}giančių s{ą|"+N.sa+"}žinės priekaištų.",

    "„Hamleto“ pabaigoje stiprėja ni{ū|niūrus – šaknyje ū.|saknis}r{ū|"+N.ue+"}s akcentai, artimi baroko pasaulėjautai: žmogaus trumpalaikišk{u|Priesaga -umas: trumpalaikiškumas.|priesagos}mo apm{ą|"+R.masty+"}stymai, g{ą|"+N.nos1+" gąsdinti – išsigando.|nosines}sdinant{y|"+R.antys+"}s kapų ir sutr{e|tręšta, bet sutrešęs: dariniuose iš bendraties nosinė nerašoma.|nosines}šusių kaukolių vaizdiniai.",

    "Pasirodo duo{b|"+P("duobė → duobkasys.")+"}kasiai, kurie dr{a|drastiškas – tarptautinis žodis (gr. drastikos), nesusijęs su drąsa, todėl be nosinės.|tarpt}stiškai juokauja k{ie|"+N.kiek+"}kvienam gr{e|grėsti, grėsė, bet esamasis laikas gresia, todėl dalyvis gresiantis, gresiančius rašomas su e; nosinės nėra.|nosines}siančios mirties tema, atsainiai elg{ia|"+N.sar+"}si su žmogaus palaikais.",

    "Hamletas tartum papra{s|"+P("paprastas → paprasčiausias (st → sč).")+"}čiausią dai{k|"+P("daiktai, daiktas.")+"}tą ranko{j|Sutrumpinta vietininko forma: rankoj = rankoje.|galunes} laiko buvusio juo{k|"+P("juokas → juokdarys.")+"}dario Joriko kaukolę, st{e|stebėti(s) – šaknyje e.|saknis}bėdamasis žmogaus gyvenimo netvarumu ir tarytum atpažindamas joje savo lemtį.",

    "Svarbiausia idėja – viskas {{kaip, mat|kaipmat|Kaipmat (iš kaip matai) – sutrumpėjęs žodis, rašomas kartu.|kartu}} praeina, egzistencijos su{i|irti → suirimas: trumpas i.|saknis}rimas neišveng{ia|"+N.dal+"}mas. Viskas d{ū|dūlėti – šaknyje ū.|saknis}lėja – tokia šio pasaulio išmintis.",

    "Tragedijos atomazga – veikėjų likimo išsipild{y|"+N.ymas+"}mas. Laertas ir Hamletas sužeidžia vienas kitą, karalienė netyč{ia|Prieveiksmių tyčia, nejučia, netyčia gale rašoma (i)a.|galunes} nusinuod{i|"+N.ija+"}ja, Hamletas pagaliau atkerš{i|"+N.ija+"}ja niekšing{a|"+N.vns+"}j{a|"+N.vns+"}m Klaudijui.",

    "Kaltieji {{vis, gi|visgi|Visgi rašoma kartu.|kartu}} nubaudž{ia|"+N.dal+"}mi, herojus ž{ū|žūti, žūva – esamajame laike ū.|saknis}va, įvy{k|"+P("įvykti → įvykdyti, įvykdęs.")+"}dęs savo misiją, bet įsigali teisingumas.",

    "Hamletas žengia lemting{ą|"+N.gal+"}j{į|"+N.gal+"} žingsnį, nes tai paskutinė pastanga įprasminti gyvenimą. Pasir{y|ryžtis, pasiryžęs – pavojingas žodis, rašoma y.|nosines}žęs tokiam žingsniui jis įg{y|gyti, gyja, gijo: esamajame laike y.|saknis}ja tragiškos did{y|"+N.yb+"}bės.",

    "Hamleto mirtis parodo, kad už au{k|"+P("aukštas → aukščiausias.")+"}ščiausius id{e|"+R.tarpt+"}alus mokama didžiausia kaina.",

    "Šekspyro tragedijose {{per, ne, lyg|pernelyg|Pernelyg rašoma kartu.|kartu}} daug kraujo, nes nusiv{y|nusivilti, nusivylė → nusivylimas: šaknyje y.|saknis}l{i|"+R.imas+"}mas pasauliu, žmogumi skatina pesimistinį poži{ū|požiūris – šaknyje ū (žiūrėti).|saknis}rį.",

    "Pavienės blogio apraiškos gali būti atpaž{į|"+N.nos1+" pažįsta – pažinti.|nosines}stamos ir {{iš, vis|išvis|Kartu su sutrumpėjusiais žodžiais: išvis.|prielinks}} išraunamos, tačiau kai jis darosi visuotinis, gyvenimas gri{ū|griūti, griūva – esamajame laike ū.|saknis}va.",

    "Tad ir liej{a|"+N.sar+"}si kraujas, įsisiautėj{ę|Būtojo kartinio laiko veikiamasis dalyvis vyr. g. vns.: -ęs.|dalyviai}s blogis naikina viską, net patį sav{e|Įvardžių mane, tave, save galininke nosinė nerašoma.|galunes}, {{dėl, to|dėl to|Prielinksnis su įvardžiu rašomas atskirai.|prielinks}} vis{a|Bevardės giminės visa galūnėje nosinė nerašoma: visa apimantis.|galunes} apimančiuose mirties vaizduose esama išg{i|gyti, gijo → išgijimas: trumpas i.|saknis}jimo, prisik{ė|prisikelti, prisikėlė → prisikėlimas: ė.|saknis}limo nuojautos, išlieka gyvenimo vilties prošvai{s|"+P("prošvaistė → prošvaisčių.")+"}čių.",

    "Hamletui svarbu, kad po mirties išlikt{ų|"+N.tuk+"} jo garbingas vardas, todėl Horacijus turi gyventi ir pali{u|liudyti – šaknyje iu.|saknis}dyti, {{kas, gi|kas gi|Gi nuo kaitomų žodžių rašoma atskirai: kas gi, ko gi.|kartu}} atsitiko Elsinore, – {{tik, tai|tiktai|„Tiktai“ – vienas žodis, rašomas kartu.|kartu}} taip neliks niekšybių, br{ę|"+N.nos1+" bręsti – brendo.|nosines}stančių s{ą|"+N.sa+"}mokslų, pasaulis atgims, o herojaus auka įg{i|"+N.bus+"}s prasmę.",

    "Hamletas yra Vakarų civilizacijos epochų l{ū|lūžti, lūžis – šaknyje ū.|saknis}žio žmogus: senoji tvarka negalioja, tragišk{ą|"+N.gal+"}j{į|"+N.gal+"} personažą s{u|supti, supa – trumpas u.|saknis}pa chaosas, su{i|irti → suirutė: trumpas i.|saknis}rutė, kuriai jis tur{į|"+N.trump+"}s pasipriešinti savo jėgomis.",

    "Hamletas grum{ia|"+N.sar+"}si {{ne, vien|ne vien|Ne su dalelytėmis rašoma atskirai: ne vien.|ne}} su pasaulio blogiu, bet ir su savimi – su savo ab{e|abejoti, abejonė – šaknyje e.|saknis}jonėmis. Jis svarsto apie blogio m{a|mastas „dydis, apimtis“ – BE nosinės; nepainiok su mąstyti „galvoti“.|nosines}stą ir jo priež{a|priežastis – rašoma a.|saknis}stis, siekia tikrumo.",

    "Išband{y|"+N.ymas+"}mų situacijoje gimsta naujas žmogus – prieštaringas, sud{ė|sudėti, sudėtis → sudėtingas: ė.|saknis}tingas, nuo pasaulio problemų atsigr{ę|"+N.nos2+" gręžti – grįžti – grąža.|nosines}žiantis į save.",

    // Smalsumas ir naujovės
    "Iš tikr{ų|"+N.gal+"}j{ų|"+N.gal+"} neteisinga prielaida, jog smalsumas ir naujovių poreikis lydi mus visus lygiai {{taip, pat|taip pat|„Taip pat“ rašoma atskirai.|kartu}} visada, be perstojo. Jei taip būtų, gyvenimas būtų ne{į|"+N.i+"}manomas.",

    "Bet kokiam gyvenimui būdinga, jog veikia ir į esamos tvarkos išlaik{y|"+N.ymas+"}mą besior{ie|orientuotis – tarptautinis žodis (orientas), rašoma ie.|tarpt}ntuojančios jėgos, ir kitos. Žmonių pasaul{y|Sutrumpinta vietininko forma: pasauly = pasaulyje.|galunes} šios jėgos reišk{ia|"+N.sar+"}si kaip saugumo, buvimo paž{į|"+N.nos1+" pažįsta – pažinti.|nosines}stamoje aplinkoje poreikis ir naujovių, permainų poreikis.",

    "Žmonių charakterius iš tiesų galima skirti, be kit{a|Bevardės giminės galūnėje nosinė nerašoma: be kita ko.|galunes} ko, pagal šių jėgų proporciją: nuo tų, kurie mė{g|"+P("mėgti, mėgo → mėgsta.")+"}sta tik nuob{o|nuobodus – rašoma o.|saknis}džią rutiną ir paž{į|"+N.nos1+" pažinti.|nosines}stamus dalykus, l{i|Ligi – gi kartu su vienskiemeniais žodžiais.|kartu}gi tų, kuriems rutina atgr{a|atgrasus, atgrasi – BE nosinės: graso, gresia, grėsti.|nosines}si ir kurie vertina tik pok{y|pokytis – rašoma y.|saknis}čius.",

    "Žavėjim{a|Vardininke žavėjimasis – be nosinės; nosinė tik galininke: žavėjimąsi.|galunes}sis tuo, kas nepaž{į|"+N.nos1+" pažinti.|nosines}stama, yra gyvenimas, kuris rem{ia|"+N.sar+"}si, nors ir nes{ą|"+N.sa+"}moningai, tam tikru pasaulėvai{z|"+P("vaizdas → pasaulėvaizdis, pasaulėvaizdžiu.")+"}džiu.",

    "Jei tikėtume, kaip tikri budistai, jog pasaulis nieko nevertas, jog tai tik kančių ir skausmo v{i|virtinė – trumpas i.|saknis}rtinė, jog nėra nieko nauja po švies{ią|"+N.inag+"}j{a|"+N.inag+"} saule, mums nereikėtų jokių naujovių, net{u|turėti – trumpas u.|saknis}rėtume jokio smalsumo ir jokio noro keliauti.",

    "Tačiau nesvarstysime, ar budistai teis{ū|"+N.ue+"}s, nes rizikuotume leistis į niūrią metafizikos prarają. Tai neleistina tokia lengvab{ū|"+R.buti+"}diška proga, kaip apm{ą|"+R.masty+"}stymai apie keliones.",

    // Testas 3: kelionės ir smalsumas
    "Pasak daug{e|daugelis – rašoma e.|saknis}lio kartų pat{y|patirti, patyrė → patyrimas: y.|saknis}rimo, kurį mums neab{e|abejoti – šaknyje e.|saknis}jotinai {{kaži, kaip|kaži kaip|Kaži, kažin rašomi atskirai: kaži kaip, kažin kas.|kartu}} įskiep{i|"+N.ija+"}jo evoliucija, pasaulis nedraugiškas mums, tad t{u|turėti – trumpas u.|saknis}rėtume saugotis naujų dalykų, s{ė|sėdėti – ė.|saknis}dėti gerai paž{į|"+N.nos1+" pažinti.|nosines}stamuose kampuose ir vaikščioti išmintais takais.",

    "Bet taip nėra. Kodėl vaikystėje skaitome m{į|"+N.nos2+" mįslė – mąstyti.|nosines}slingas kelionių knygas? Kodėl žmonės, vos panaikinę balt{ą|"+N.inag+"}s{ia|"+N.inag+"}s dėmes žemėlapiuose, dr{ą|"+N.nos2+" drąsa – drįsti.|nosines}siai puolė į dar nesen{ia|Prieveiksmis neseniai: po minkšto priebalsio -iai.|galunes}i neįsivaizduojamas keliones po didž{ia|Aukščiausiojo laipsnio priesaga -(i)ausias.|priesagos}usias erdves ir svajoja apie dar did{e|"+R.esnis+"}snes?",

    "Kalbėdami apie keliones, mes turime galvoje {{ne, bet, kokį|ne bet kokį|Ne nuo įvardžių ir junginių su bet rašoma atskirai: ne bet kaip, ne bet koks.|ne}} judėjimą erdvėje, bet tokį, kur pati kelionė yra tikslas, kai visai nėra b{ū|"+R.buti+"}tinybės tvarkyti reikalų, kuriuos išspr{ę|"+N.nos1+" spręsti – sprendė.|nosines}stume ir be keliavimo.",

    "Verslininkai, reng{ia|Esamojo laiko dalyvis iš 3 asm.: rengia → rengiantys.|dalyviai}ntys susitikimus oro uostų konferencijų salėse, {{iš, kart|iškart|Kartu su sutrumpėjusiais žodžiais: iškart.|prielinks}} po jų gr{į|"+R.grizti+"}žta į savo įstaigas ir visiškai nekeliauja.",

    "Kažin ar galima keliavimu laikyti tokią m{a|masinis – tarptautinis žodis (masė), rašoma a.|tarpt}sinio turizmo r{ū|rūšis – ū.|saknis}šį, kai, pavy{z|"+P("pavyzdys → pavyzdžiui.")+"}džiui, šalt{ų|"+N.gal+"}j{ų|"+N.gal+"} kraštų gyventojams tiesiog reikia šiltos jūros gabalėlio Ispanijoje, o pati Ispanija jiems {{nė, maž|nėmaž|Nė su sutrumpėjusiais žodžiais rašoma kartu: nėmaž, nėkart.|kartu}} nerūpi. Mes kalbame apie keliones, kai patir{ia|"+N.dal+"}ma kas nors nauja.",

    "Keliaujant mums {{iš, vis|išvis|Kartu su sutrumpėjusiais žodžiais: išvis.|prielinks}} nėra svarbu ką nors išmokti. Keliaujame ir ne todėl, kad ak{i|akimirka = aki- (akis) + mirka.|sudurt}mirkai atitr{ū|trūkti, trūko – ū.|saknis}ktume nuo ka{s|kasdienis = kas + diena.|sudurt}dienių darbų ir pamirštume sl{e|slėgti – slegia: esamajame laike trumpas e.|saknis}giančius rūp{e|Priesaga -estis: rūpestis.|priesagos}sčius.",

    "Mus v{y|vyti → vyte (būdinys iš bendraties): y.|saknis}te v{e|vyti, veja, vijo: esamajame laike e.|saknis}ja {{ne, noras|ne noras|Ne atskirai, kai prieštaraujama: ne noras …, bet smalsumas.|ne}} pabėgti, bet smalsumas. Mokslininkai tvirtina, jog smalsumas išlieka visą žmogaus gyvenimą ir jog tai yra s{a|savas → savitas: a.|saknis}vitas žmogaus bruožas.",

    "Esame smals{ū|"+N.ue+"}s ne todėl, kad nežinomi dalykai žada mums nusiraminimą arba gr{e|grėsti, gresia – BE nosinės: e kaitaliojasi su ė.|nosines}sia {{kuo, nors|kuo nors|Dalelytė nors visada rašoma atskirai.|kartu}}, ko norėt{ų|"+N.tuk+"}si išven{g|"+P("vengti, vengia → išvengti.")+"}ti.",

    "Žmonės iš smalsumo imasi įvairių r{y|ryžtingas – pavojingas žodis, rašoma y.|nosines}žtingų veiksmų, nors žino, jog tai pavojinga, keliauja į mažai ištirtas vietas, ž{ū|žūti, žūva, žūsta – ū.|saknis}sta ko{p|"+P("kopti, kopia → kopdami.")+"}dami į kalnus arba {o|ola – rašoma o.|saknis}lų nasruose.",

    "B{e|beje – rašoma e.|saknis}j{e|beje – rašoma e.|saknis}, tik per smalsumą buvome išvaryti iš rojaus, tad teologai dažnai smer{k|"+P("smerkti, smerkia.")+"}davo smalsumą kaip nuod{ė|nuodėmė – ė.|saknis}mę. Bet be šio impulso {{ne, daug|nedaug|Nedaug „maža, truputį“ rašoma kartu.|ne}} būtų pažangos.",

    "Net ir šiandien, smalsumo nug{i|ginti, gina → nuginti: trumpas i.|saknis}nti į kokią nepaž{į|"+N.nos1+" pažinti.|nosines}stamą šalį ar miestą, galime sakyti tai patys sau atradę, nes atrad{i|"+R.imas+"}mas – tai nebūtinai žinios, kurių dar niekas neturėjo, bet tik naujas pat{y|patirti, patyrė → patyrimas: y.|saknis}rimas.",

    "Tiesa, žmonės kartais išsiruošia į didž{ią|"+N.inag+"}s{ia|"+N.inag+"}s sentimentų keliones – į apleistas vietas, į prarast{ą|"+N.gal+"}j{ą|"+N.gal+"} vaikystės ar jaunystės šalį. Ar tokias išv{y|išvykti → išvyka: y.|saknis}kas irgi galime vadinti kelionėmis?",

    "Atrodo, neatrandame nieko nauja, bet tarsi esame sugr{ą|"+N.nos2+" grąžinti – grįžti.|nosines}žinami patys prie sav{ę|Įvardžių manęs, tavęs, savęs kilmininke rašoma ę.|galunes}s, į senuosius laikus, atrodo, jog keliaujame laiku, nes tai, ką kadais{e|Prieveiksmis kadaise – rašoma e.|galunes} pat{y|patirti, patyrė: y.|saknis}rėme, yra vėl nauja.",

    "Mumyse gyvas naujovių poreikis, naujovės mus m{a|masinti „vilioti“ – BE nosinės (nepainiok su mąstyti).|nosines}sina, nes tai sus{i|susieti, susijęs – trumpas i.|saknis}ję su mūsų specifiškai žmogišku laiko išgyvenimu.",

    "Mes norėtume visuomet būti pradžioje, jausti, jog pasaulis mums atviras, o naujovės išgyvenimas, nors ir a{p|"+P("apgauti → apgaulė, apgaulingai: priešdėlis ap-.")+"}gaulingai, sukelia šį poj{ū|pojūtis – ū (jausti, jutimas).|saknis}tį."
  );
})();

// More sentences: nosinės, NE / NEBE, GI (pagal PUPP pratybų temas, sakiniai savi; added 2026-10-17)
(() => {
  const K = {
    esam: "Nosinė rašoma tik esamojo laiko šaknyje ir jo išvestinėse formose: šąla, gęsta, bąla → bąlantis.|nosines",
    besam: "Kai nosinė yra tik esamajame laike (šąla, gęsta, bąla), bendraties, kitų laikų ir iš jų padarytų žodžių šaknyje ji nerašoma: šalti → įšalęs, gesti → užgesęs, balti → pabalęs.|nosines",
    kait: "Nosinė rašoma, nes giminiškuose žodžiuose kaitaliojasi su kitu ilguoju balsiu:",
    an: "Nosinė rašoma, nes kaitaliojasi su an, en, in, un:",
    ryz: "Ryžtas, ryžtis, pasiryžęs – rašoma ilgoji y, nosinės nėra.|nosines",
    azuol: "Senuose daiktavardžiuose ir jų dariniuose nosinė išlieka: ąžuolas, ąžuolynas, ąsotis, žąsis.|nosines",
    neV: "Ne su veiksmažodžiais rašoma kartu, kai nėra priešpriešos.|ne",
    nebe: "Dalelytės nebe, be su veiksmažodžiais ir jų formomis rašomos kartu.|ne",
    giK: "Gi kartu rašoma su vienskiemeniais nekaitomais žodžiais: argi, kurgi, ogi, negi.|kartu",
    giA: "Gi nuo kaitomų žodžių rašoma atskirai: kas gi, ko gi, kam gi.|kartu",
    perd: "Per daug, per mažai rašoma atskirai (kartu tik pernelyg).|kartu",
    kazi: "Kaži, kažin rašomi atskirai: kaži kodėl, kažin kas.|kartu"
  };
  SENTENCES.push(
    "Kai lauke š{ą|"+K.esam+"}la, senas muzikantas užsikuria krosnį ir, pasir{y|"+K.ryz+"}žęs baigti kūrinį, iki vėlumos m{ą|"+K.kait+" mąstyti – mįslė.|nosines}sto prie pianino.",

    "Jis {{ne, mėgsta|nemėgsta|"+K.neV+"}} triukšmo, todėl, kai kaimynai ima {{per, daug|per daug|"+K.perd+"}} triukšmauti, išsig{ą|"+K.an+" išsigąsta – išsigando.|nosines}sta ir užsidaro kambaryje.",

    "Ugnis krosnyje pamažu g{ę|"+K.esam+"}sta, o užg{e|"+K.besam+"}susios žarijos dar ilgai rusena.",

    "Jis vis bando t{ę|"+K.kait+" tęsti – tąsa – tįsti.|nosines}sti seną melodiją: jos t{ą|"+K.kait+" tąsa – tęsti.|nosines}sa jam atrodo svarbesnė už naują kūrinį.",

    "Kaimynai stebisi, kad senolis {{kaži, kodėl|kaži kodėl|"+K.kazi+"}} {{ne, švenčia|nešvenčia|"+K.neV+"}} savo gimtadienio, nors mėgsta šv{ę|"+K.an+" švęsti – šventė.|nosines}sti kitų šventes.",

    "Jaunystėje jis gr{į|"+K.kait+" grįžti – grąža – gręžti.|nosines}ždavo namo pėsčiomis per {ą|"+K.azuol+"}žuolyną ir mintyse dėliodavo naujas melodijas.",

    "{{Nebe, galėdamas|Nebegalėdamas|"+K.nebe+"}} ilgiau laukti, jis užsimetė paltą, pasiėmė įš{a|"+K.besam+"}lusį smuiką ir išėjo į gatvę.",

    "Virš stogų švietė b{ą|"+K.esam+"}lantis rytų dangus, o kaimynas, nuo šalčio visas pab{a|"+K.besam+"}lęs, skubėjo į parduotuvę.",

    "„{{Kur, gi|Kurgi|"+K.giK+"}} taip anksti?“ – nustebo kaimynas. „{{O, gi|Ogi|"+K.giK+"}} į repeticiją, {{kas, gi|kas gi|"+K.giA+"}} kitas groja tame koncerte?“ – nusijuokė muzikantas."
  );
})();

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

// Correction line "yours → right" with only the differing letters/marks underlined.
// right may hold several answers joined with "  arba  ".
function fixLine(yours, right) {
  const same = (x, y) => x.toLowerCase() === y.toLowerCase(); // checking ignores case too
  const span = (a, b) => {
    let p = 0; while (p < a.length && p < b.length && same(a[p], b[p])) p++;
    let q = 0; while (q < a.length - p && q < b.length - p && same(a[a.length - 1 - q], b[b.length - 1 - q])) q++;
    return [p, a.length - q];
  };
  const mark = (a, b) => {
    if (same(a, b)) return esc(a);
    let [s, e] = span(a, b);
    while (s < e && a[s] === " ") s++;
    while (e > s && a[e - 1] === " ") e--;
    if (s === e) { // nothing typed here (e.g. a missing comma) → underline the nearest letter, left first
      let i = s - 1; while (i >= 0 && a[i] === " ") i--;
      if (i < 0) { i = s; while (i < a.length && a[i] === " ") i++; }
      if (i >= 0 && i < a.length) { s = i; e = i + 1; }
    }
    // nothing written ("_" or "—") is already a line – don't underline it again
    const mid = a.slice(s, e), blank = /^[_—]+$/.test(mid);
    return esc(a.slice(0, s)) + (s < e ? (blank ? esc(mid) : `<u>${esc(mid)}</u>`) : "") + esc(a.slice(e));
  };
  // Compare your answer with the closest of the right answers
  const alts = right.split("  arba  ");
  const cost = r => { const [s, e] = span(yours, r), [s2, e2] = span(r, yours); return e - s + e2 - s2; };
  const best = alts.reduce((x, y) => cost(y) < cost(x) ? y : x);
  return `<s>${mark(yours, best)}</s> → <b>${alts.map(r => mark(r, yours)).join("  arba  ")}</b>`;
}

// One mistake in the results: only the word shows; the arrow at the bottom opens the rule
const mistakeRow = (line, rule, full) => `<div class="mistake"><div class="w">${line}</div>` +
  `<div class="more"><div><div class="r">${esc(rule)}</div>${full}</div></div>` +
  `<button class="exp" type="button" aria-expanded="false" aria-label="Rodyti taisyklę"><svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>`;
document.addEventListener("click", e => {
  const b = e.target.closest(".mistake .exp"); if (!b) return;
  const open = b.parentElement.classList.toggle("open");
  // reopening shows just the short rule again: the full rule starts folded every time
  if (open) b.parentElement.querySelectorAll("details.full[open]").forEach(d => d.open = false);
  b.setAttribute("aria-expanded", open);
  b.setAttribute("aria-label", open ? "Slėpti taisyklę" : "Rodyti taisyklę");
});

// Arrow keys inside a sentence:
//   blanks (inputs): ← → jump to the prev/next blank at the word's edge, ↑ ↓ always jump
//   gaps (skyryba):  ← → move between gaps, ↑ ↓ change the mark via cycle(button, ±1)
//   onMove() runs after focus jumps (e.g. to close a hover picker)
function arrowKeys(el, cycle, onMove) {
  el.addEventListener("keydown", e => {
    const t = e.target, isInput = t.tagName === "INPUT", isGap = t.classList.contains("gap");
    if (!isInput && !isGap || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const dir = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1, ArrowDown: 1 }[e.key];
    if (!dir) return;
    const vertical = e.key === "ArrowUp" || e.key === "ArrowDown";
    if (isGap && vertical) { e.preventDefault(); return cycle?.(t, dir); }
    if (isInput && !vertical) {
      const atEdge = t.selectionStart === t.selectionEnd && t.selectionStart === (dir < 0 ? 0 : t.value.length);
      if (!atEdge) return;
    }
    const all = [...el.querySelectorAll(isInput ? "input" : ".gap:not(.locked)")], to = all[all.indexOf(t) + dir];
    if (!to) return;
    e.preventDefault();
    to.focus();
    onMove?.();
    if (isInput) { const at = dir < 0 ? to.value.length : 0; to.setSelectionRange(at, at); }
  });
}

// Mistakes saved in the browser: { "sentence:part": { wrong, streak, last } }
// After 2 correct answers in a row a mistake moves to the fixed list (FIXED_KEY).
const MISTAKES_KEY = "rasyba-mistakes", FIXED_KEY = "rasyba-fixed";
function loadMistakes(key = MISTAKES_KEY) {
  let m; try { m = JSON.parse(localStorage.getItem(key)) || {}; } catch { m = {}; }
  for (const id in m) {
    const [si, k] = id.split(":").map(Number), p = SENTENCES[si] && parse(SENTENCES[si])[k];
    if (!p || p.t !== undefined) delete m[id];
  }
  return m;
}
const saveMistakes = (m, key = MISTAKES_KEY) => { localStorage.setItem(key, JSON.stringify(m)); window.onProgressSaved?.(); };
function recordAnswer(si, k, ok, given) {
  const m = loadMistakes(), f = loadMistakes(FIXED_KEY), id = si + ":" + k;
  if (ok) {
    if (m[id] && ++m[id].streak >= 2) { f[id] = { wrong: m[id].wrong, last: m[id].last, fixed: Date.now() }; delete m[id]; }
  } else {
    m[id] = { wrong: (m[id]?.wrong || f[id]?.wrong || 0) + 1, streak: 0, last: given };
    delete f[id];
  }
  saveMistakes(m); saveMistakes(f, FIXED_KEY);
}

// Full rule for each rule type, from the official VLKK rules (content/vlkk/rasyba-2022.pdf)
const SRC_R = p => ""; // source line hidden on purpose
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

  priebalsiai: SRC_R("3.2 p.") + `<p><b>Morfologinė priebalsių rašyba.</b> Prieš kitus priebalsius skardieji ir duslieji priebalsiai (b–p, d–t, g–k, z–s, ž–š) tariami supanašėję, bet rašomi taip, kaip giminiškame žodyje prieš balsį:</p>
<p>suvokti (suvokia), stabdžiu (stabdyti), įvykdyti (įvykti), duobkasys (duobė), juokdarys (juokas), mėgsta (mėgo), išvengti (vengia), kopdami (kopia), smerkdavo (smerkia), užgniaužtų (gniaužia), pabrėžti (brėžia), pavyzdžiui (pavyzdys), pasaulėvaizdis (vaizdas), aukščiausias (aukštas).</p>
<p>Tarptautiniai žodžiai – pagal kilmę: absurdas (b).</p>`,
  prielinks: SRC_R("5.1, 5.3 p.") + `<p><b>5.3.1.</b> Prielinksniai visada rašomi <b>atskirai</b>, kai sudaro konstrukcijas su linksniuojamais ar nekaitomais žodžiais: be abejo, be galo, be reikalo, be to, dėl ko, iki galo, iš anksto, iš dalies, iš eilės, iš esmės…</p>
<p><b>5.1.</b> <b>Kartu</b> rašomi sutrumpėję žodžiai: bemaž, iškart, išsyk, išties, išvis, perdien, perpus, popiet, suvis, užvis, užtat.</p>
<p><b>5.3.2.</b> Polinksniai dėka, link – visada atskirai.</p>`
};
const fullRule = cat => FULL[cat] ? `<details class="full"><summary>Visa taisyklė</summary><div class="body">${FULL[cat]}</div></details>` : "";
