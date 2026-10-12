// Practice rounds: 10 sentences, then a summary with all mistakes.
// Page must have #progress, #sentence, #actions, #result, #next and call:
//   roundStart(size), roundAdd(good, total, mistakesHtml) on the first check, roundNext() on "Kitas"
const ROUND_SIZE = 10;
let round = { size: ROUND_SIZE, items: [], fixHref: "", onNext: null };

// size can be a number or a function (re-evaluated for every new round)
function roundStart(size, fixHref, onNext) {
  round = { size: Math.max(1, typeof size === "function" ? size() : size), sizeFn: size, items: [], fixHref, onNext };
  document.getElementById("actions").style.display = "";
  roundUpdate();
}
function roundAdd(good, total, mistakesHtml) {
  round.items.push({ good, total, mistakesHtml });
  roundUpdate();
}
const roundDone = () => round.items.length >= round.size;

function roundUpdate() {
  const n = round.items.length;
  document.getElementById("progress").innerHTML =
    `<span>Sakinys ${Math.min(n + (roundDone() ? 0 : 1), round.size)} / ${round.size}</span><i style="width:${n / round.size * 100}%"></i>`;
  document.getElementById("next").textContent = roundDone() ? "Rezultatai →" : "Kitas sakinys →";
}

// "Kitas sakinys" → next sentence, or the summary when the round is over
function roundNext() {
  if (roundDone()) roundSummary(); else round.onNext();
}

function roundSummary() {
  const good = round.items.reduce((s, x) => s + x.good, 0), total = round.items.reduce((s, x) => s + x.total, 0);
  const pct = total ? Math.round(good / total * 100) : 100;
  const wrong = round.items.filter(x => x.mistakesHtml);
  document.getElementById("progress").innerHTML = `<span>Raundas baigtas</span><i style="width:100%"></i>`;
  document.getElementById("actions").style.display = "none";
  document.getElementById("sentence").innerHTML = `
    <div class="rsum ${pct >= 85 ? "good" : pct >= 60 ? "mid" : "low"}">
      <div class="big">${good} / ${total}</div>
      <div class="pct">${pct}% teisingai</div>
    </div>
    <div class="ractions">
      <button class="primary" id="newRound">Naujas raundas</button>
      ${wrong.length ? `<a class="fixbtn" href="${round.fixHref}">🎯 Taisyti klaidas →</a>` : ""}
    </div>`;
  document.getElementById("result").innerHTML = wrong.length
    ? `<div class="score">Klaidos šiame raunde</div>` + wrong.map(x => x.mistakesHtml).join("")
    : `<div class="allok">Be klaidų! 🎉</div>`;
  document.getElementById("newRound").onclick = () => { roundStart(round.sizeFn, round.fixHref, round.onNext); round.onNext(); };
  scrollTo(0, 0);
}
