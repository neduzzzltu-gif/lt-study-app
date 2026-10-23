// Quick tap exercises for pratimai.html (sentences are our own, rules from content/vlkk).
// Each item: s = sentence with ___ where the answer goes, o = options, a = index of the right option, r = rule.
// New items are appended so saved mistake ids ("mode:index") stay valid.

const PR_MODES = {
  kartu: {
    name: "Kartu ar atskirai",
    sub: "Kaip rašyti žodį vietoj ___ – kartu ar atskirai?",
    items: [
      { s: "Uždavinys buvo ___, o labai sunkus.", o: ["nelengvas", "ne lengvas"], a: 1, r: "Kai prieštaraujama (… ne lengvas, o sunkus), ne rašomas atskirai nuo visų kalbos dalių (VLKK 5.2.2)." },
      { s: "Po ilgos dienos jis grįžo ___ ir pavargęs.", o: ["nelinksmas", "ne linksmas"], a: 0, r: "Ne su būdvardžiais rašomas kartu, kai nėra priešpriešos (VLKK 5.2.1 b)." },
      { s: "Mano brolis ___ už tave.", o: ["neaukštesnis", "ne aukštesnis"], a: 1, r: "Ne nuo aukštesniojo laipsnio būdvardžių rašomas atskirai, kai nurodomas lyginamasis objektas (už tave) (VLKK 5.2.4)." },
      { s: "Šią knygą perskaitė ___ mūsų klasės mokinys.", o: ["nevienas", "ne vienas"], a: 1, r: "Ne nuo įvardžių ir skaitvardžių visada rašomas atskirai: ne vienas, ne tas, ne kiekvienas (VLKK 5.2.5 a)." },
      { s: "Jis ___ ateina laiku.", o: ["nevisada", "ne visada"], a: 1, r: "Ne nuo įvardinių prieveiksmių rašomas atskirai: ne visada, ne visur, ne taip (VLKK 5.2.5 b)." },
      { s: "Skambinau kelis kartus, bet niekas ___ ragelio.", o: ["nekėlė", "ne kėlė"], a: 0, r: "Ne su veiksmažodžiais rašomas kartu, kai nėra priešpriešos (VLKK 5.2.1)." },
      { s: "Jis ___, o lėkte lekia.", o: ["nebėga", "ne bėga"], a: 1, r: "Prieštaraujama (ne bėga, o lekia) – ne rašomas atskirai net ir nuo veiksmažodžio (VLKK 5.2.2)." },
      { s: "Ši ___ jį labai nuliūdino.", o: ["nesėkmė", "ne sėkmė"], a: 0, r: "Ne su daiktavardžiu rašomas kartu, kai sudaro priešingos reikšmės žodį: nesėkmė, nelaimė, nedarbas (VLKK 5.2.1 a)." },
      { s: "Tuščiame name jai pasidarė ___.", o: ["nebejauku", "nebe jauku"], a: 0, r: "Nebe su būdvardžiais ir būdvardiniais prieveiksmiais rašoma kartu: nebejauku, nebegeras, nebetoli (VLKK 5.2.7 a)." },
      { s: "Po dešimties metų jis jau ___ tas žmogus, kurį pažinojau.", o: ["nebetas", "nebe tas"], a: 1, r: "Nebe nuo įvardžių rašoma atskirai: nebe tas, nebe pirmas (VLKK 5.2.7 b)." },
      { s: "Šiandien lauke ___ žaisti.", o: ["peršalta", "per šalta"], a: 1, r: "Dalelytė per rašoma atskirai: per šalta, per didelis, per vėlai (VLKK 5.2.8 c)." },
      { s: "Jis ___ ilgai galvojo prieš atsakydamas.", o: ["pernelyg", "per ne lyg"], a: 0, r: "Pernelyg – sutrumpėjęs žodis, rašomas kartu (VLKK 5.2.9 a)." },
      { s: "___ tu nieko negirdėjai?", o: ["Argi", "Ar gi"], a: 0, r: "Gi kartu su nekaitomais vienskiemeniais žodžiais: argi, kurgi, ogi, netgi (VLKK 5.2.9 b)." },
      { s: "___ tu taip vėlai grįžai?", o: ["Kodėlgi", "Kodėl gi"], a: 1, r: "Gi atskirai nuo daugiaskiemenių nekaitomų žodžių: kodėl gi, kada gi (VLKK 5.2.8 d)." },
      { s: "Turime ___ jam padėti.", o: ["kaipnors", "kaip nors"], a: 1, r: "Dalelytė nors rašoma atskirai: kaip nors, kas nors, kada nors (VLKK 5.1.3)." },
      { s: "___ tai paskutinė proga?", o: ["Nejaugi", "Ne jaugi"], a: 0, r: "Nejaugi, kadangi – į vieną žodį suaugę, rašomi kartu (VLKK 5.2.9 c)." },
      { s: "Pievoje ___ žydėjo ramunės.", o: ["kurnekur", "kur ne kur"], a: 1, r: "Ne tarp dviejų vienodų žodžių rašomas atskirai: kur ne kur, kas ne kas, vos ne vos (VLKK 5.2.5 c)." },
      { s: "Dabar jis ___ nesigaili, kad taip pasielgė.", o: ["nėmaž", "nė maž"], a: 0, r: "Nėmaž, nėkart – sutrumpėję žodžiai, rašomi kartu (VLKK 5.2.9 a)." },
      { s: "Traukinys šįkart atvyko ___.", o: ["nelaiku", "ne laiku"], a: 1, r: "Ne nuo daiktavardinių prieveiksmių rašomas atskirai: ne laiku, ne namie, ne vakar (VLKK 5.2.5 b)." },
      { s: "Susitiksime, bet tikrai ___.", o: ["nešiandien", "ne šiandien"], a: 1, r: "Ne šiandien, ne dabar, ne kasdien – rašoma atskirai (VLKK 5.2.5 b)." }
    ]
  },
  rusis: {
    name: "Sakinio rūšis",
    sub: "Kokios rūšies sakinys? V – vientisinis, SP – sudėtinis prijungiamasis, SS – sujungiamasis, SB – bejungtukis, SM – mišrusis.",
    opts: ["V", "SP", "SS", "SB", "SM"],
    items: [
      { s: "Vakare pradėjo smarkiai lyti.", a: 0, r: "Vienas gramatinis centras (pradėjo lyti) – vientisinis sakinys." },
      { s: "Kai pradėjo lyti, visi subėgo į vidų.", a: 1, r: "Du centrai; šalutinis dėmuo (kai pradėjo lyti) prijungtas jungtuku kai – sudėtinis prijungiamasis." },
      { s: "Pradėjo lyti, o mes dar buvome lauke.", a: 2, r: "Du lygiaverčiai dėmenys, sujungti jungtuku o – sudėtinis sujungiamasis." },
      { s: "Pradėjo lyti: debesys jau seniai kaupėsi.", a: 3, r: "Du dėmenys be jungtuko (antrasis paaiškina pirmąjį) – sudėtinis bejungtukis." },
      { s: "Pradėjo lyti, o mes, kadangi neturėjome skėčių, pasislėpėme po medžiu.", a: 4, r: "Yra ir sujungiamasis ryšys (o), ir prijungiamasis (kadangi) – sudėtinis mišrusis." },
      { s: "Grįžęs namo, jis ilgai sėdėjo prie lango ir galvojo apie draugą.", a: 0, r: "Vienas veiksnys (jis) su vienarūšiais tariniais (sėdėjo ir galvojo); grįžęs namo – dalyvinė aplinkybė, ne atskiras dėmuo. Vientisinis." },
      { s: "Žinau, kad tu mane supranti.", a: 1, r: "Šalutinis dėmuo (kad tu mane supranti) prijungtas jungtuku kad – sudėtinis prijungiamasis." },
      { s: "Saulė leidosi, paukščiai nutilo, ežere sutemo.", a: 3, r: "Trys dėmenys be jungtukų – sudėtinis bejungtukis." },
      { s: "Ir vėjas pūtė, ir lietus lijo.", a: 2, r: "Dėmenys sujungti kartojamu jungtuku ir … ir – sudėtinis sujungiamasis." },
      { s: "Paukščiai išskrido į pietus, nes artėjo žiema.", a: 1, r: "Šalutinis priežasties dėmuo su jungtuku nes – sudėtinis prijungiamasis." },
      { s: "Vaikai žaidė kieme, o mama, kuri ruošė vakarienę, kartkartėmis žvilgtelėdavo pro langą.", a: 4, r: "Sujungiamasis ryšys (o) ir prijungiamasis (kuri ruošė vakarienę) – sudėtinis mišrusis." },
      { s: "Ji visą vakarą dainavo ir šoko.", a: 0, r: "Vienas veiksnys su vienarūšiais tariniais – vientisinis sakinys." },
      { s: "Atėjo ruduo: lapai pageltonavo, dienos sutrumpėjo.", a: 3, r: "Visi dėmenys be jungtukų – sudėtinis bejungtukis." },
      { s: "Pasakyk, kur buvai ir ką veikei.", a: 1, r: "Pagrindinis dėmuo (pasakyk) ir du šalutiniai (kur buvai, ką veikei) – sudėtinis prijungiamasis." },
      { s: "Norėjau paskambinti, bet telefonas buvo išsikrovęs.", a: 2, r: "Lygiaverčiai dėmenys, sujungti jungtuku bet – sudėtinis sujungiamasis." },
      { s: "Kai atėjo pavasaris, ledai ištirpo, upė patvino.", a: 4, r: "Prijungiamasis ryšys (kai atėjo pavasaris) ir bejungtukis (ledai ištirpo, upė patvino) – sudėtinis mišrusis." }
    ]
  },
  zenklas: {
    name: "Ženklai",
    sub: "Kuris skyrybos ženklas tinka vietoj ___?",
    items: [
      { s: "Žiema atėjo staiga ___ per naktį iškrito pusmetris sniego.", o: [",", ":"], a: 1, r: "Antrasis bejungtukio sakinio dėmuo paaiškina pirmąjį – dvitaškis (arba brūkšnys) (VLKK 13.1 c)." },
      { s: "Vieni mokiniai rašė ___ kiti skaitė.", o: [",", ":"], a: 0, r: "Gretinami du veiksmai – bejungtukio sakinio dėmenys skiriami kableliu (VLKK 13.1 a)." },
      { s: "Ateisi vėliau ___ nieko nebeliks.", o: [",", "–"], a: 1, r: "Pirmasis dėmuo reiškia sąlygą – dažniausiai rašomas brūkšnys (VLKK 13.1 b)." },
      { s: "Pianiną, smuiką, natas ___ viską jis paveldėjo iš tėvo.", o: [":", "–"], a: 1, r: "Po vienarūšių dalių prieš apibendrinamąjį žodį (viską) rašomas brūkšnys (VLKK 4.9)." },
      { s: "Jis turėjo tris draugus ___ Joną, Petrą ir Ugnę.", o: [":", ","], a: 0, r: "Po apibendrinamojo žodžio (draugus) prieš vienarūšes dalis rašomas dvitaškis (VLKK 4.7)." },
      { s: "Mano brolis ___ gydytojas.", o: [",", "–"], a: 1, r: "Vietoj praleistos jungties „yra“ gali būti rašomas brūkšnys; kablelis tarp veiksnio ir tarinio – klaida (VLKK 10)." },
      { s: "Lauke lijo ___ o mes žaidėme stalo žaidimus.", o: [",", ":"], a: 0, r: "Prieš jungtuką o sudėtinio sakinio dėmenys skiriami kableliu (VLKK 12.1)." },
      { s: "Jis nusprendė ___ nuo rytojaus pradės sportuoti.", o: [",", ":"], a: 1, r: "Antrasis dėmuo atskleidžia, ką nusprendė (aiškina) – dvitaškis (VLKK 13.1 c)." },
      { s: "Pasakyk tiesą ___ tau pačiam bus lengviau.", o: [",", "–"], a: 1, r: "Antrasis dėmuo reiškia pasekmę – rašomas brūkšnys (ar dvitaškis) (VLKK 13.1)." },
      { s: "Vasarą aplankėme daug miestų ___ Trakus, Kernavę ir Nidą.", o: [":", ","], a: 0, r: "Po apibendrinamojo žodžio (miestų) prieš išvardijimą rašomas dvitaškis (VLKK 4.7)." }
    ]
  }
};

// Mistakes: { "mode:index": { wrong, streak, last } } – after 2 right answers in a row the item counts as fixed
const PR_KEY = "pratimai-mistakes";
function prLoad() {
  let m; try { m = JSON.parse(localStorage.getItem(PR_KEY)) || {}; } catch { m = {}; }
  for (const id in m) { const [mode, i] = id.split(":"); if (!PR_MODES[mode]?.items[+i]) delete m[id]; }
  return m;
}
const prSave = m => { localStorage.setItem(PR_KEY, JSON.stringify(m)); window.onProgressSaved?.(); };
function prRecord(mode, i, ok, given) {
  const m = prLoad(), id = mode + ":" + i;
  if (ok) { if (m[id] && ++m[id].streak >= 2) delete m[id]; }
  else m[id] = { wrong: (m[id]?.wrong || 0) + 1, streak: 0, last: given };
  prSave(m);
}
