// Practice rounds: 10 sentences, then a summary with all mistakes.
// Page must have #progress, #sentence, #actions, #result, #next and call:
//   roundStart(size, fixHref, onNext, onFix), roundAdd(good, total, mistakesHtml, redo) on the first check,
//   roundNext() on "Kitas"
// Numbered boxes above the sentence show the round so far; a red box (a sentence with mistakes)
// can be clicked to go back to it right away – right answers stay, only the wrong spots are empty.
// After the round you can fix its mistakes: onFix(redo) shows the same sentence with only the
// wrong spots empty. redo = { i, keys: [wrong spots], given: { spot: your right answer } } or null.
const ROUND_SIZE = 10;
let round = { size: ROUND_SIZE, items: [], fixHref: "", onNext: null, onFix: null, fix: null, jump: null };

// size can be a number or a function (re-evaluated for every new round)
function roundStart(size, fixHref, onNext, onFix) {
  round = { size: Math.max(1, typeof size === "function" ? size() : size), sizeFn: size, items: [], fixHref, onNext, onFix, fix: null, jump: null };
  document.getElementById("actions").style.display = "";
  roundUpdate();
}
function roundAdd(good, total, mistakesHtml, redo = null) {
  const x = { good, total, mistakesHtml, redo };
  if (round.jump) {
    // Went back from a box: the round's score stays, only what's left to fix changes
    const it = round.items[round.jump.n];
    it.redo = redo; if (!redo) it.fixed = true;
  } else if (round.fix) round.fix.done[round.fix.pos] = x; else round.items.push(x);
  roundUpdate();
}
const roundDone = () => round.items.length >= round.size;

function roundSteps() {
  let el = document.getElementById("steps");
  if (!el) { el = document.createElement("div"); el.id = "steps"; el.className = "steps"; document.getElementById("progress").before(el); }
  if (round.fix) return el.innerHTML = "";
  const cur = round.jump ? round.jump.n : round.items.length;
  el.innerHTML = Array.from({ length: round.size }, (_, n) => {
    const it = round.items[n], on = n === cur && (round.jump || !roundDone()) ? " on" : "";
    if (it && it.redo) return `<button class="step bad${on}" data-n="${n}" title="Grįžti ir pataisyti">${n + 1}</button>`;
    if (it) return `<span class="step ${it.fixed ? "fixed" : "ok"}${on}">${n + 1}</span>`;
    return `<span class="step${on}">${n + 1}</span>`;
  }).join("");
}
document.addEventListener("click", e => {
  const b = e.target.closest(".step.bad"); if (!b) return;
  roundJump(+b.dataset.n);
});

// Go back to a sentence of this round; "Kitas" then returns to where you were
function roundJump(n) {
  const it = round.items[n]; if (!it || !it.redo) return;
  if (round.fix) return;
  if (!round.jump) {
    // Resume only a sentence that is actually on screen (not the summary / "no mistakes" view)
    const live = document.getElementById("actions").style.display !== "none";
    round.jump = { back: live && typeof current !== "undefined" && !checked ? current : null };
  }
  round.jump.n = n;
  document.getElementById("actions").style.display = "";
  round.onFix(it.redo);
  roundUpdate();
}

function roundUpdate() {
  roundSteps();
  if (round.jump) {
    document.getElementById("progress").innerHTML = `<span>Grįžai į ${round.jump.n + 1} sakinį</span><i style="width:${round.items.length / round.size * 100}%"></i>`;
    document.getElementById("next").textContent = "Grįžti →";
    return;
  }
  if (round.fix) {
    const f = round.fix, n = f.queue.length;
    document.getElementById("progress").innerHTML =
      `<span>Taisymas ${Math.min(f.pos + 1, n)} / ${n}</span><i style="width:${Object.keys(f.done).length / n * 100}%"></i>`;
    document.getElementById("next").textContent = f.pos >= n - 1 ? "Baigti taisymą →" : "Kitas sakinys →";
    return;
  }
  const n = round.items.length;
  document.getElementById("progress").innerHTML =
    `<span>Sakinys ${Math.min(n + (roundDone() ? 0 : 1), round.size)} / ${round.size}</span><i style="width:${n / round.size * 100}%"></i>`;
  document.getElementById("next").textContent = roundDone() ? "Rezultatai →" : "Kitas sakinys →";
}

// "Kitas sakinys" → next sentence, or the summary when the round is over
function roundNext() {
  if (round.jump) {
    const back = round.jump.back; round.jump = null;
    if (back !== null) round.onFix({ i: back, keys: null });
    else if (roundDone()) return roundSummary();
    else round.onNext();
    roundUpdate();
    return;
  }
  if (round.fix) {
    if (++round.fix.pos < round.fix.queue.length) { round.onFix(round.fix.queue[round.fix.pos]); roundUpdate(); }
    else roundFixSummary();
    return;
  }
  if (roundDone()) roundSummary(); else round.onNext();
}

// Go back through the round's sentences: your right answers stay, only the wrong spots are empty
function roundFix(queue) {
  round.fix = { queue, pos: 0, done: {} };
  document.getElementById("actions").style.display = "";
  round.onFix(queue[0]);
  roundUpdate();
  scrollTo(0, 0);
}
function roundNew() { roundStart(round.sizeFn, round.fixHref, round.onNext, round.onFix); round.onNext(); }

function roundFixSummary() {
  roundSteps();
  const f = round.fix, done = Object.values(f.done);
  const good = done.reduce((s, x) => s + x.good, 0), total = done.reduce((s, x) => s + x.total, 0);
  // Still wrong + skipped sentences can be fixed again
  const left = f.queue.map((q, p) => f.done[p] ? f.done[p].redo : q).filter(Boolean);
  const wrong = done.filter(x => x.mistakesHtml);
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
  round.jump = null; roundSteps();
  const good = round.items.reduce((s, x) => s + x.good, 0), total = round.items.reduce((s, x) => s + x.total, 0);
  const pct = total ? Math.round(good / total * 100) : 100;
  const wrong = round.items.filter(x => x.mistakesHtml), canFix = round.onFix && wrong.some(x => x.redo);
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
  if (canFix) document.getElementById("fixRound").onclick = () => roundFix(wrong.map(x => x.redo).filter(Boolean));
  scrollTo(0, 0);
}
