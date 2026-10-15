// Practice rounds: 10 sentences, then a summary with all mistakes.
// Page must have #progress, #sentence, #actions, #result, #next and call:
//   roundStart(size, fixHref, onNext, onFix), roundAdd(good, total, mistakesHtml, redo) on the first check,
//   roundNext() on "Kitas"
// After the round you can fix its mistakes: onFix(redo) shows the same sentence with only the
// wrong spots empty. redo = { i, keys: [wrong spots], given: { spot: your right answer } } or null.
const ROUND_SIZE = 10;
let round = { size: ROUND_SIZE, items: [], fixHref: "", onNext: null, onFix: null, fix: null };

// size can be a number or a function (re-evaluated for every new round)
function roundStart(size, fixHref, onNext, onFix) {
  round = { size: Math.max(1, typeof size === "function" ? size() : size), sizeFn: size, items: [], fixHref, onNext, onFix, fix: null };
  document.getElementById("actions").style.display = "";
  roundUpdate();
}
function roundAdd(good, total, mistakesHtml, redo = null) {
  const x = { good, total, mistakesHtml, redo };
  if (round.fix) round.fix.done[round.fix.pos] = x; else round.items.push(x);
  roundUpdate();
}
const roundDone = () => round.items.length >= round.size;

function roundUpdate() {
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
