// Quick tap exercises for pratimai.html (sentences are our own, rules from content/vlkk).
// Each item: s = sentence with ___ where the answer goes, o = options, a = index of the right option, r = rule.
// New items are appended so saved mistake ids ("mode:index") stay valid.

const PR_MODES = {
  kartu: {
    name: "Kartu ar atskirai",
    sub: "Kaip rašyti žodį vietoj ___ – kartu ar atskirai?",
    items: [
      { s: "Uždavinys buvo ___, o labai sunkus.", o: ["nelengvas", "ne lengvas"], a: 1, r: "Kai prieštaraujama (… ne lengvas, o sunkus), ne rašomas atskirai nuo visų kalbos dalių." },
      { s: "Po ilgos dienos jis grįžo ___ ir pavargęs.", o: ["nelinksmas", "ne linksmas"], a: 0, r: "Ne su būdvardžiais rašomas kartu, kai nėra priešpriešos." },
      { s: "Mano brolis ___ už tave.", o: ["neaukštesnis", "ne aukštesnis"], a: 1, r: "Ne nuo aukštesniojo laipsnio būdvardžių rašomas atskirai, kai nurodomas lyginamasis objektas (už tave)." },
      { s: "Šią knygą perskaitė ___ mūsų klasės mokinys.", o: ["nevienas", "ne vienas"], a: 1, r: "Ne nuo įvardžių ir skaitvardžių visada rašomas atskirai: ne vienas, ne tas, ne kiekvienas." },
      { s: "Jis ___ ateina laiku.", o: ["nevisada", "ne visada"], a: 1, r: "Ne nuo įvardinių prieveiksmių rašomas atskirai: ne visada, ne visur, ne taip." },
      { s: "Skambinau kelis kartus, bet niekas ___ ragelio.", o: ["nekėlė", "ne kėlė"], a: 0, r: "Ne su veiksmažodžiais rašomas kartu, kai nėra priešpriešos." },
      { s: "Jis ___, o lėkte lekia.", o: ["nebėga", "ne bėga"], a: 1, r: "Prieštaraujama (ne bėga, o lekia) – ne rašomas atskirai net ir nuo veiksmažodžio." },
      { s: "Ši ___ jį labai nuliūdino.", o: ["nesėkmė", "ne sėkmė"], a: 0, r: "Ne su daiktavardžiu rašomas kartu, kai sudaro priešingos reikšmės žodį: nesėkmė, nelaimė, nedarbas." },
      { s: "Tuščiame name jai pasidarė ___.", o: ["nebejauku", "nebe jauku"], a: 0, r: "Nebe su būdvardžiais ir būdvardiniais prieveiksmiais rašoma kartu: nebejauku, nebegeras, nebetoli." },
      { s: "Po dešimties metų jis jau ___ tas žmogus, kurį pažinojau.", o: ["nebetas", "nebe tas"], a: 1, r: "Nebe nuo įvardžių rašoma atskirai: nebe tas, nebe pirmas." },
      { s: "Šiandien lauke ___ žaisti.", o: ["peršalta", "per šalta"], a: 1, r: "Dalelytė per rašoma atskirai: per šalta, per didelis, per vėlai." },
      { s: "Jis ___ ilgai galvojo prieš atsakydamas.", o: ["pernelyg", "per ne lyg"], a: 0, r: "Pernelyg – sutrumpėjęs žodis, rašomas kartu." },
      { s: "___ tu nieko negirdėjai?", o: ["Argi", "Ar gi"], a: 0, r: "Gi kartu su nekaitomais vienskiemeniais žodžiais: argi, kurgi, ogi, netgi." },
      { s: "___ tu taip vėlai grįžai?", o: ["Kodėlgi", "Kodėl gi"], a: 1, r: "Gi atskirai nuo daugiaskiemenių nekaitomų žodžių: kodėl gi, kada gi." },
      { s: "Turime ___ jam padėti.", o: ["kaipnors", "kaip nors"], a: 1, r: "Dalelytė nors rašoma atskirai: kaip nors, kas nors, kada nors." },
      { s: "___ tai paskutinė proga?", o: ["Nejaugi", "Ne jaugi"], a: 0, r: "Nejaugi, kadangi – į vieną žodį suaugę, rašomi kartu." },
      { s: "Pievoje ___ žydėjo ramunės.", o: ["kurnekur", "kur ne kur"], a: 1, r: "Ne tarp dviejų vienodų žodžių rašomas atskirai: kur ne kur, kas ne kas, vos ne vos." },
      { s: "Dabar jis ___ nesigaili, kad taip pasielgė.", o: ["nėmaž", "nė maž"], a: 0, r: "Nėmaž, nėkart – sutrumpėję žodžiai, rašomi kartu." },
      { s: "Traukinys šįkart atvyko ___.", o: ["nelaiku", "ne laiku"], a: 1, r: "Ne nuo daiktavardinių prieveiksmių rašomas atskirai: ne laiku, ne namie, ne vakar." },
      { s: "Susitiksime, bet tikrai ___.", o: ["nešiandien", "ne šiandien"], a: 1, r: "Ne šiandien, ne dabar, ne kasdien – rašoma atskirai." }
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
  // from his tests and notes (2026-10-25)
  kultura: {
    name: "Kalbos kultūra",
    sub: "Kuri forma taisyklinga? Dažniausios kalbos klaidos iš tavo testų.",
    items: [
      { s: "Į koncertą atėjo ___ žmonių.", o: ["virš šimto", "daugiau nei šimtas"], a: 1, r: "„Virš“ kiekiui reikšti – klaida. Sakoma: daugiau nei (negu), per, su viršum." },
      { s: "Prikasėme ___ bulvių.", o: ["per tris tonas", "virš trijų tonų"], a: 0, r: "„Virš“ kiekiui reikšti – klaida: per (apie, daugiau nei) tris tonas." },
      { s: "Pabandę supratome, kas iš to ___.", o: ["gavosi", "išėjo"], a: 1, r: "„Gautis“ reikšme „išeiti, pavykti“ – klaida: išėjo, pavyko." },
      { s: "Taupau ___.", o: ["naujam telefonui", "ant naujo telefono"], a: 0, r: "Ant tikslui reikšti – klaida. Tikslas reiškiamas naudininku: naujam telefonui." },
      { s: "Mums trūksta pinigų ___.", o: ["ant maisto", "maistui"], a: 1, r: "Ant tikslui reikšti – klaida: pinigų maistui." },
      { s: "Neatidėk darbų ___.", o: ["rytojui", "ant rytojaus"], a: 0, r: "„Ant rytojaus“ – klaida: atidėti rytojui." },
      { s: "Jis vakarais groja ___.", o: ["su pianinu", "pianinu"], a: 1, r: "Groti kuo – įnagininkas be su: groja pianinu, gitara." },
      { s: "Ji paskambino ___.", o: ["kitą dieną", "sekančią dieną"], a: 0, r: "„Sekantis“ reikšme „kitas, paskesnis“ – klaida: kitą dieną." },
      { s: "Lijo visą savaitę, ___ derlius supuvo.", o: ["to pasekoje", "todėl"], a: 1, r: "„To pasekoje“ – vertinys. Sakoma: todėl, dėl to." },
      { s: "___, jis tik stovėjo ir žiūrėjo.", o: ["Užuot padėjęs", "Vietoj to, kad padėtų"], a: 0, r: "„Vietoj to, kad…“ – klaida. Sakoma: užuot + dalyvis (užuot padėjęs)." },
      { s: "Dvyniai ___.", o: ["vienas prie vieno", "vienodi"], a: 1, r: "„Vienas prie vieno“ reikšme „vienodi“ – vertinys." },
      { s: "Ginsimės ___.", o: ["nuo bet kurių priešų", "prieš bet kuriuos priešus"], a: 0, r: "Gintis nuo ko (nuo + kilmininkas), ne prieš ką." },
      { s: "Džiaugiuosi, kad mama ___.", o: ["vėl normoje", "vėl sveika"], a: 1, r: "„Būti normoje“ – vertinys: vėl sveika, vėl normali, viskas gerai." },
      { s: "Ilgai stovėjau stotelėje, kol ___ lietus.", o: ["užėjo", "neužėjo"], a: 0, r: "Kol reikšme „iki“ vartojamas be neiginio: laukiau, kol užėjo (kol prasidėjo) lietus." },
      { s: "Vilniuje jis gyveno ___.", o: ["tris metus", "trejus metus"], a: 1, r: "Su daugiskaitiniais daiktavardžiais (metai, durys, žirklės) vartojami dauginiai skaitvardžiai: trejus metus." },
      { s: "Vakar buvau kategoriškos nuomonės, ___ šiandien mąstau kitaip.", o: ["o", "gi"], a: 0, r: "Dalelytė gi nevartojama vietoj jungtukų o, bet." },
      { s: "Po reportažo redakcija sulaukė daug ___.", o: ["telefoninių skambučių", "telefono skambučių"], a: 1, r: "Čia -inis būdvardis netinka – sakoma telefono skambučiai." },
      { s: "Kompozitorius rašė dainas Maironio ___.", o: ["žodžiais", "žodžiams"], a: 0, r: "Daina sukurta kieno žodžiais (įnagininkas), ne žodžiams." },
      { s: "Kūrinys parašytas džiazo ___.", o: ["stiliuje", "stiliumi"], a: 1, r: "Vietininkas būdui reikšti – klaida: džiazo stiliumi." },
      { s: "Dalyvavau konkurse, ___ gauti geresnį darbą.", o: ["siekdamas", "su tikslu"], a: 0, r: "„Su tikslu“ – klaida. Sakoma: siekdamas, norėdamas, turėdamas tikslą." },
      { s: "Ji visada ieško ___.", o: ["žmoguje gerumo", "žmogaus gerumo"], a: 1, r: "Vietininkas vietoj kilmininko – vertinys: ieško žmogaus gerumo." },
      { s: "Vaikinas pagaliau ___.", o: ["prisipažino, kad myli", "prisipažino meilėje"], a: 0, r: "„Prisipažinti meilėje“ – vertinys: prisipažino mylįs, prisipažino, kad myli." },
      { s: "Automobilis senas, neišmanau, kaip teks ___ techninę apžiūrą.", o: ["atlikti", "praeiti"], a: 0, r: "„Praeiti (pereiti) apžiūrą“ – klaida: atlikti techninę apžiūrą." },
      { s: "Nekvaršink man galvos ___.", o: ["dėl tos kelionės", "su ta kelione"], a: 0, r: "Priežastis reiškiama dėl + kilmininkas, ne su: dėl tos kelionės." },
      { s: "Fizikos kursą ___.", o: ["praėjome pilnumoje", "išmokome visą"], a: 1, r: "„Pilnumoje“ – vertinys; kursą išeiname, išmokstame visą (visumą)." },
      { s: "Iš darbo ūkyje turėjome ___.", o: ["naudos", "naudą"], a: 0, r: "Turėti ko (dalies kilmininkas): turėjome naudos." },
      { s: "Kai kurie ___, kad galima apsieiti be kompiuterio.", o: ["skaito", "mano"], a: 1, r: "„Skaityti“ reikšme „manyti, laikyti“ – klaida: mano, sako." },
      { s: "___, į koncertą susirinko ne visi mokiniai.", o: ["Kad ir keista", "Kaip nekeista"], a: 0, r: "„Kaip nekeista“ – vertinys: kad ir keista, nors ir keista." },
      { s: "Dailės būrelį lankau, ___ piešti.", o: ["su tikslu išmokti", "norėdamas išmokti"], a: 1, r: "„Su tikslu“ – klaida. Tikslas: norėdamas išmokti, kad išmokčiau." },
      { s: "Apie ___ berniuko poelgį parašyta laikraštyje.", o: ["pasiaukojamą", "pasiaukojantį"], a: 0, r: "Pasiaukoja žmogus, ne poelgis: pasiaukojantis berniukas, bet pasiaukojamas poelgis." },
      { s: "Į šunų parodą einu tik ___.", o: ["draugui kviečiant", "draugo kviečiamas"], a: 1, r: "Abu variantai galimi, bet natūraliau ir mokytojos rekomenduojama: draugo kviečiamas (pakviestas)." },
      { s: "Poeto gyvenimo prasmė – ___.", o: ["kūryba", "kūryboje"], a: 0, r: "Prasmė yra kas (vardininkas): gyvenimo prasmė – kūryba." },
      { s: "Mano dėdė gydomas ___ skyriuje.", o: ["kardiologiniame", "kardiologijos"], a: 1, r: "Čia -inis būdvardis netinka – sakoma kardiologijos skyrius." },
      { s: "Tu eik ___.", o: ["per vidurį", "pro vidurį"], a: 0, r: "Pro – pro šalį ar kiaurai; einama per vidurį (viduriu)." },
      { s: "Įsigijau automobilį ir pirmą kartą sėdau ___.", o: ["už vairo", "prie vairo"], a: 1, r: "„Sėsti už vairo“ – vertinys: sėsti prie vairo." },
      { s: "Šiandien ne kiekvienas mokinys ___.", o: ["išmano literatūrą", "nusimano literatūroje"], a: 0, r: "Nusimanyti apie ką, išmanyti ką: išmano literatūrą, nusimano apie literatūrą." },
      { s: "Poezijoje ___ neįprastų posakių.", o: ["sutinkama", "randama"], a: 1, r: "Sutinkame žmones; posakius randame, vartojame." },
      { s: "Mokiniai ne tik išmoksta, jie ___ moko kitus.", o: ["taip pat", "tuo pačiu"], a: 0, r: "„Tuo pačiu“ reikšme „kartu, taip pat“ – klaida." },
      { s: "Romano veikėjui pavyko išlikti ___.", o: ["geru", "geram"], a: 1, r: "Kai bendraties veikėjas – naudininkas (veikėjui), būdvardis irgi naudininku: išlikti geram." },
      { s: "Referatas atitinka ___.", o: ["visus reikalavimus", "visiems reikalavimams"], a: 0, r: "Atitikti ką (galininkas): atitinka reikalavimus." },
      { s: "Tu tikiesi būti ___.", o: ["atidžiu", "atidus"], a: 1, r: "Kai bendraties veiksmas tenka veiksniui (tu), būdvardis vardininku: tikiesi būti atidus." },
      { s: "Jis mėgsta futbolą, ___ krepšinį.", o: ["taip pat", "o taip pat"], a: 0, r: "„O taip pat“, „ir taip pat“, „bet taip pat“ – klaida. Užtenka taip pat arba ir." },
      { s: "Tėvai ___ savo vaikus.", o: ["pergyveno", "išgyveno ilgiau už"], a: 1, r: "„Pergyventi“ reikšme „gyventi ilgiau“ – klaida." },
      { s: "___ čia daug kas pasikeitė.", o: ["Per pastaruosius metus", "Pastarųjų metų bėgyje"], a: 0, r: "„Bėgyje“ – vertinys: per pastaruosius metus." },
      { s: "Tokia reklama tik gadina mokyklos ___.", o: ["imidžą", "įvaizdį"], a: 1, r: "Nevartotina svetimybė imidžas – sakoma įvaizdis." },
      { s: "Mums ___ vis naujų sunkumų.", o: ["atsiranda", "randasi"], a: 0, r: "„Rastis“ reikšme „atsirasti, būti“ – klaida." },
      { s: "Dėl išsamesnės informacijos kreipkitės ___ vedėją.", o: ["pas", "į"], a: 1, r: "Kreiptis į ką, ne pas ką." },
      { s: "___, Onute, tavo suknelė puiki.", o: ["Nesijaudink", "Nepergyvenk"], a: 0, r: "„Pergyventi“ reikšme „jaudintis, sielotis“ – klaida." },
      { s: "Daug anglų kalbos žodžių vienaip ___, kitaip rašomi.", o: ["tariasi", "tariami"], a: 1, r: "Sangrąžinė forma vietoj neveikiamosios – klaida: vienaip tariami, kitaip rašomi." },
      { s: "Jis sakėsi tą knygą įsigijęs ___ gatvės prekeivio.", o: ["iš", "pas"], a: 0, r: "Pirkti, įsigyti iš ko, ne pas ką." },
      { s: "___, tu rytoj neateisi?", o: ["Reiškia", "Vadinasi"], a: 1, r: "Įterpinys „reiškia“ – klaida: vadinasi." },
      { s: "Iš pradžių jie pykosi, bet ___ susitaikė.", o: ["galų gale", "ant galo"], a: 0, r: "„Ant galo“ – klaida: galų gale, pagaliau." },
      { s: "Reikia sekretorės, ___ dvi užsienio kalbas.", o: ["žinančios", "mokančios"], a: 1, r: "Kalbas mokame, ne žinome." },
      { s: "Per dvejas atostogas perskaičiau ___ knygas.", o: ["tris", "trejas"], a: 0, r: "Dauginiai skaitvardžiai – tik su daugiskaitiniais daiktavardžiais (atostogos, metai); su knygomis – tris." },
      { s: "Mersas jaučiasi ___ visuomenei.", o: ["svetimu", "svetimas"], a: 1, r: "Jaustis kas – vardininkas: jaučiasi svetimas, laimingas." },
      { s: "Siunčiu trumpą biografiją, norėdamas ___.", o: ["prisistatyti", "pristatyti save"], a: 0, r: "„Pristatyti save“ – vertinys: prisistatyti." },
      { s: "Ši užduotis yra ___ negu ankstesnė.", o: ["labiau sudėtinga", "sudėtingesnė"], a: 1, r: "Aukštesnysis laipsnis daromas priesaga -esnis, ne žodžiu labiau." },
      { s: "Ši šalis yra viena iš ___ išsivysčiusių.", o: ["labiausiai", "daugiausiai"], a: 0, r: "Daugiausia – kiekiui; laipsniui – labiausiai." },
      { s: "Atsižvelgta į ___ laimėtas varžybas.", o: ["abi", "abejas"], a: 1, r: "Su daugiskaitiniais daiktavardžiais (varžybos) – dauginis: abejas varžybas." },
      { s: "___ lėšų, reikės mažinti išlaidas.", o: ["Norint sutaupyti", "Kad sutaupyti"], a: 0, r: "Kad + bendratis – klaida: norint sutaupyti, kad sutaupytume." },
      { s: "Po ilgų diskusijų ___.", o: ["priėjome prie išvados", "padarėme išvadą"], a: 1, r: "„Prieiti prie išvados“ – vertinys: padaryti išvadą." },
      { s: "Dėl avarijų ___ būna kalti pėstieji.", o: ["dažniausiai", "daugelyje atvejų"], a: 0, r: "„Daugelyje atvejų“ – vertinys: dažnai, dažniausiai, neretai." },
      { s: "___ buvo svarstoma, kas lėmė mokinių neraštingumą.", o: ["Pirmoje eilėje", "Pirmiausia"], a: 1, r: "„Pirmoje eilėje“ reikšme „pirmiausia“ – vertinys." },
      { s: "Labai svarbu suprasti, kas ___ poetės sprendimą.", o: ["nulėmė", "įtakojo"], a: 0, r: "„Įtakoti“ – netaisyklingas žodis: darė įtaką, lėmė, veikė." },
      { s: "___ V. Krėvės kūrybą, radau daug gražių posakių.", o: ["Skaitant", "Skaitydamas"], a: 1, r: "Kai veiksmą atlieka sakinio veiksnys (aš), vartojamas pusdalyvis: skaitydamas." },
      { s: "Yra tokių, kurie mano, kad ___ pasitikėti negalima nė vienu žmogumi.", o: ["visiškai", "pilnai"], a: 0, r: "„Pilnai“ reikšme „visiškai“ – klaida." },
      { s: "Reikia būti labai ___, kad nepadarytum tos pačios klaidos.", o: ["atidžiu", "atidžiam"], a: 1, r: "Kai bendraties veikėjas nepasakytas (reikia būti), būdvardis naudininku: atidžiam." },
      { s: "Dramos veikėjas ___ kaip mąstantis žmogus.", o: ["vaizduojamas", "rodomas"], a: 0, r: "Kūrinyje veikėjas vaizduojamas, ne rodomas." },
      { s: "___ norėčiau pasakyti, kad veikėjui pavyksta likti humaniškam.", o: ["Baigiant", "Baigdamas"], a: 1, r: "Kai veiksmą atlieka veiksnys (aš), vartojamas pusdalyvis: baigdamas." },
      { s: "Nutariau visą dėmesį sutelkti ___.", o: ["į lietuvių kalbą", "lietuvių kalbai"], a: 0, r: "Sutelkti dėmesį į ką." },
      { s: "Dramos veikėjas jaučiasi ___ prieš tėvą.", o: ["nusikaltusiu", "nusikaltęs"], a: 1, r: "Jaustis kas – vardininkas: jaučiasi nusikaltęs." },
      { s: "___ sužinoti tiesą, veikėjas dedasi bepročiu.", o: ["Norėdamas", "Kad"], a: 0, r: "Kad + bendratis tikslui reikšti – klaida: norėdamas sužinoti." },
      { s: "Tik būdamas gimtinėje žmogus gali jaustis ___.", o: ["saugiam ir laimingam", "saugus ir laimingas"], a: 1, r: "Bendraties veiksmas tenka veiksniui (žmogus) – vardininkas: saugus ir laimingas." },
      { s: "Senio kova su alkiu daro jį ___ pagarbos.", o: ["vertą", "vertu"], a: 0, r: "Derinama su galininku jį: daro jį vertą." }
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
