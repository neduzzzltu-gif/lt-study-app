// Practice rounds: 10 sentences, then a summary with all mistakes.
// Page must have #progress, #sentence, #actions, #check, #result, #next and call:
//   roundStart(size, fixHref, pick, onFix, onEmpty), then roundGo(0)
//   roundAdd(good, total, mistakesHtml, redo, view) on the first check of a sentence
//   roundNext() on "Kitas"
// pick() returns the next sentence index (or null when there are none – then onEmpty() runs).
// onFix(f) shows sentence f.i: f.keys = null → fresh; otherwise only f.keys are empty and
// f.given holds your answers for the rest (keys: [] = just look at it).
// Numbered boxes above the sentence: one per sentence of the round, any of them can be opened.
//   not done yet → solve it · red (mistakes) → fix only the wrong spots · green → look at it
// After the round you can also fix all its mistakes in a row (roundFix).
const ROUND_SIZE = 10;
let round = { size: ROUND_SIZE, slots: [], items: [], pos: -1, fixHref: "", pick: null, onFix: null, onEmpty: null, fix: null };

// size can be a number or a function (re-evaluated for every new round)
function roundStart(size, fixHref, pick, onFix, onEmpty) {
  round = { size: Math.max(1, typeof size === "function" ? size() : size), sizeFn: size, slots: [], items: [], pos: -1, fixHref, pick, onFix, onEmpty, fix: null };
}
const roundCount = () => round.items.filter(Boolean).length;
const roundDone = () => roundCount() >= round.size;

// Open box n
function roundGo(n) {
  if (round.fix || n < 0 || n >= round.size) return;
  const it = round.items[n];
  if (!it && round.slots[n] === undefined) {
    // no sentence twice in one round
    let i, tries = 0;
    do i = round.pick(); while (i != null && round.slots.includes(i) && ++tries < 200);
    if (i === null || i === undefined) {
      if (roundCount()) return roundSummary();          // nothing left to pick mid-round → show what was solved
      document.getElementById("steps")?.replaceChildren();
      document.getElementById("progress").innerHTML = "";
      return round.onEmpty?.();
    }
    round.slots[n] = i;
  }
  round.pos = n;
  document.getElementById("actions").style.display = "";
  document.getElementById("check").style.display = it && !it.redo ? "none" : "";
  round.onFix(it ? (it.redo || it.view) : { i: round.slots[n], keys: null });
  roundUpdate();
}

// view = { i, keys: [], given } – the sentence with your answers, for looking back at it
function roundAdd(good, total, mistakesHtml, redo = null, view = null) {
  const x = { good, total, mistakesHtml, redo, view };
  if (round.fix) { round.fix.done[round.fix.pos] = x; return roundUpdate(); }
  const it = round.items[round.pos];
  if (!it) round.items[round.pos] = x;
  else if (it.redo) {
    // Fixing from a red box: the round's score stays, only what's left to fix changes
    it.redo = redo; if (!redo) it.fixed = true;
    if (view) it.view = view;
  }
  roundUpdate();
}

// The next box that isn't solved yet, counting on from pos (wraps around); -1 if all are done
function roundNextOpen() {
  for (let d = 1; d <= round.size; d++) {
    const n = (round.pos + d) % round.size;
    if (!round.items[n]) return n;
  }
  return -1;
}

function roundSteps() {
  let el = document.getElementById("steps");
  if (!el) { el = document.createElement("div"); el.id = "steps"; el.className = "steps"; document.getElementById("progress").before(el); }
  if (round.fix) return el.innerHTML = "";
  el.innerHTML = Array.from({ length: round.size }, (_, n) => {
    const it = round.items[n], on = n === round.pos ? " on" : "";
    const cls = !it ? "" : it.redo ? " bad" : it.fixed ? " fixed" : " ok";
    const title = !it ? "Atidaryti" : it.redo ? "Pataisyti" : "Peržiūrėti";
    return `<button class="step${cls}${on}" data-n="${n}" title="${title}">${n + 1}</button>`;
  }).join("");
}
document.addEventListener("click", e => {
  const b = e.target.closest("#steps button.step"); if (!b || b.classList.contains("on")) return;
  roundGo(+b.dataset.n);
});

function roundUpdate() {
  roundSteps();
  if (round.fix) {
    const f = round.fix, n = f.queue.length;
    document.getElementById("progress").innerHTML =
      `<span>Taisymas ${Math.min(f.pos + 1, n)} / ${n}</span><i style="width:${Object.keys(f.done).length / n * 100}%"></i>`;
    document.getElementById("next").textContent = f.pos >= n - 1 ? "Baigti taisymą →" : "Kitas sakinys →";
    return;
  }
  const it = round.items[round.pos];
  const mode = !it ? "" : it.redo ? " – taisymas" : " – peržiūra";
  document.getElementById("progress").innerHTML =
    `<span>Sakinys ${round.pos + 1} / ${round.size}${mode}</span><i style="width:${roundCount() / round.size * 100}%"></i>`;
  document.getElementById("next").textContent = roundNextOpen() === -1 ? "Rezultatai →" : "Kitas sakinys →";
}

// "Kitas sakinys" → the next unsolved sentence, or the summary when all are solved
function roundNext() {
  if (round.fix) {
    if (++round.fix.pos < round.fix.queue.length) { round.onFix(round.fix.queue[round.fix.pos]); roundUpdate(); }
    else roundFixSummary();
    return;
  }
  const n = roundNextOpen();
  if (n === -1) roundSummary(); else roundGo(n);
}

// Go back through the round's sentences: your right answers stay, only the wrong spots are empty
function roundFix(queue) {
  round.fix = { queue, pos: 0, done: {} };
  document.getElementById("actions").style.display = "";
  document.getElementById("check").style.display = "";
  round.onFix(queue[0]);
  roundUpdate();
  scrollTo(0, 0);
}
function roundNew() { roundStart(round.sizeFn, round.fixHref, round.pick, round.onFix, round.onEmpty); roundGo(0); }

function roundFixSummary() {
  const f = round.fix, done = Object.values(f.done);
  const good = done.reduce((s, x) => s + x.good, 0), total = done.reduce((s, x) => s + x.total, 0);
  // Still wrong + skipped sentences can be fixed again
  const left = f.queue.map((q, p) => f.done[p] ? f.done[p].redo : q).filter(Boolean);
  const wrong = done.filter(x => x.mistakesHtml);
  roundSteps();
  document.getElementById("progress").innerHTML = `<span>Taisymas baigtas</span><i style="width:100%"></i>`;
  document.getElementById("actions").style.display = "none";
  document.getElementById("sentence").innerHTML = `
    <div class="rsum ${left.length ? "mid" : "good"}">
      <div class="big">${done.length ? `${good} / ${total}` : "–"}</div>
      <div class="pct">${!done.length ? "Nieko nepataisyta" : left.length ? `Liko pataisyti sakinių: ${left.length}` : "Visos klaidos pataisytos! 🎉"}</div>
    </div>
    <div class="ractions">
      ${left.length ? `<button class="primary" id="fixAgain">✏️ Taisyti likusias</button>` : ""}
      <button class="${left.length ? "secondary" : "primary"}" id="newRound">Naujas raundas</button>
    </div>`;
  document.getElementById("result").innerHTML = wrong.length
    ? `<div class="score">Vis dar klaidos</div>` + wrong.map(x => x.mistakesHtml).join("") : "";
  document.getElementById("fixAgain") && (document.getElementById("fixAgain").onclick = () => roundFix(left));
  document.getElementById("newRound").onclick = roundNew;
  scrollTo(0, 0);
}

function roundSummary() {
  const items = round.items.filter(Boolean);
  const good = items.reduce((s, x) => s + x.good, 0), total = items.reduce((s, x) => s + x.total, 0);
  const pct = total ? Math.round(good / total * 100) : 100;
  const wrong = items.filter(x => x.mistakesHtml), canFix = round.onFix && items.some(x => x.redo);
  round.pos = -1; roundSteps();
  document.getElementById("progress").innerHTML = `<span>Raundas baigtas</span><i style="width:100%"></i>`;
  document.getElementById("actions").style.display = "none";
  document.getElementById("sentence").innerHTML = `
    <div class="rsum ${pct >= 85 ? "good" : pct >= 60 ? "mid" : "low"}">
      <div class="big">${good} / ${total}</div>
      <div class="pct">${pct}% teisingai</div>
    </div>
    <div class="ractions">
      ${canFix ? `<button class="primary" id="fixRound">✏️ Taisyti šio raundo klaidas</button>` : ""}
      <button class="${canFix ? "secondary" : "primary"}" id="newRound">Naujas raundas</button>
      ${wrong.length ? `<a class="fixbtn" href="${round.fixHref}">🎯 Visos mano klaidos →</a>` : ""}
    </div>`;
  document.getElementById("result").innerHTML = wrong.length
    ? `<div class="score">Klaidos šiame raunde</div>` + wrong.map(x => x.mistakesHtml).join("")
    : `<div class="allok">Be klaidų! 🎉</div>`;
  document.getElementById("newRound").onclick = roundNew;
  if (canFix) document.getElementById("fixRound").onclick = () => roundFix(items.map(x => x.redo).filter(Boolean));
  scrollTo(0, 0);
}
