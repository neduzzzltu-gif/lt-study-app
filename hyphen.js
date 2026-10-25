// Word splitting at line ends with a "-", by VLKK rašyba 2022, 6 sk. (content/vlkk/rasyba-2022.txt)
// Inserts invisible soft hyphens (U+00AD); the browser shows "-" only where a word is actually cut.
//   6.1 split by syllables  ·  6.3 the last consonant goes to the next line
//   6.4 never split ai, au, ie, ei, uo, ui (any vowel run stays whole), al/an/ar… (consonant stays
//       with the vowel), dz, dž, ch
const LT_VOWELS = "aąeęėiįyouųūAĄEĘĖIĮYOUŲŪáàãéèẽíìĩýóòõúùũ";
const SHY = "\u00AD";

function hyphenateWord(w) {
  // 6.6: abbreviations (UNESCO) and mixed-case words (JavaScript) are not split
  if (w.length < 5 || /^\p{Lu}+$/u.test(w) || /.\p{Lu}/u.test(w)) return w;
  // Vowel runs = syllable centres
  const runs = [];
  for (let i = 0; i < w.length; i++) {
    if (!LT_VOWELS.includes(w[i])) continue;
    const s = i;
    while (i + 1 < w.length && LT_VOWELS.includes(w[i + 1])) i++;
    runs.push([s, i + 1]);
  }
  const cuts = [];
  for (let r = 1; r < runs.length; r++) {
    const start = runs[r][0], cluster = w.slice(runs[r - 1][1], start);
    if (!cluster) continue;
    let at = start - 1;
    if (cluster.length >= 2 && /^(dz|dž|ch)$/i.test(w.slice(start - 2, start))) at = start - 2;
    if (at >= 2 && w.length - at >= 2) cuts.push(at);
  }
  let out = "", from = 0;
  for (const c of cuts) { out += w.slice(from, c) + SHY; from = c; }
  return out + w.slice(from);
}
const hyphenateText = t => t.replace(/\p{L}+/gu, hyphenateWord);

// Apply to all page text, including text the app adds later
const HY_SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "CODE"]);
function hyphenateNode(root) {
  if (root.nodeType === 3) {
    if (!HY_SKIP.has(root.parentNode?.nodeName) && !root.parentElement?.closest("#dev-root") && !root.data.includes(SHY)) {
      const t = hyphenateText(root.data);
      if (t !== root.data) root.data = t;
    }
    return;
  }
  if (root.nodeType !== 1 || HY_SKIP.has(root.nodeName) || root.closest("#dev-root")) return; // dev.js panel stays as typed
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(hyphenateNode);
}
hyphenateNode(document.body);
new MutationObserver(list => list.forEach(m => m.addedNodes.forEach(hyphenateNode)))
  .observe(document.body, { childList: true, subtree: true });

// Words with a blank inside (besisteng▢s) can wrap right at the blank. The browser adds no "-"
// there, so check where the lines actually broke and draw the "-" ourselves.
const isLetter = ch => /\p{L}/u.test(ch || "");
function markBlankCuts() {
  document.querySelectorAll(".sentence input").forEach(inp => {
    // wrap once: <span class="bw">[mark]<input></span>
    if (!inp.parentNode.classList.contains("bw")) {
      const w = document.createElement("span"); w.className = "bw";
      // moving a focused input drops its focus – put it back
      const had = document.activeElement === inp, s = inp.selectionStart, e = inp.selectionEnd;
      inp.before(w); w.append(inp);
      if (had) { inp.focus({ preventScroll: true }); inp.setSelectionRange(s, e); }
      const prev = w.previousSibling;
      if (prev?.nodeType === 3 && isLetter(prev.data.replaceAll(SHY, "").slice(-1))) {
        const m = document.createElement("span"); m.className = "bw-mark"; w.before(m);
      }
    }
  });
  document.querySelectorAll(".sentence .bw").forEach(w => {
    const inp = w.querySelector("input"); if (!inp) return;
    const r = inp.getBoundingClientRect(), mid = rc => (rc.top + rc.bottom) / 2, far = rc => Math.abs(mid(rc) - mid(r)) > r.height * .8;
    const m = w.previousSibling?.classList?.contains("bw-mark") ? w.previousSibling : null;
    if (m) { const mr = m.getBoundingClientRect(); m.classList.toggle("cut", far(mr)); }
    const next = w.nextSibling;
    let cutAfter = false;
    if (next?.nodeType === 3 && isLetter(next.data.replaceAll(SHY, "")[0])) {
      const rg = document.createRange(); rg.setStart(next, 0); rg.setEnd(next, 1);
      cutAfter = far(rg.getBoundingClientRect());
    }
    w.classList.toggle("cut", cutAfter);
  });
}
let cutRaf = 0;
const scheduleCuts = () => { cancelAnimationFrame(cutRaf); cutRaf = requestAnimationFrame(markBlankCuts); };
new MutationObserver(list => { if (list.some(m => [...m.addedNodes].some(n => n.nodeType === 1 && (n.matches?.("input") || n.querySelector?.("input"))))) scheduleCuts(); })
  .observe(document.body, { childList: true, subtree: true });
addEventListener("resize", scheduleCuts);
document.fonts?.ready.then(scheduleCuts);
scheduleCuts();

// Copying text: drop the hidden split marks
document.addEventListener("copy", e => {
  const t = String(getSelection());
  if (!t.includes(SHY) || e.target.closest?.("input, textarea")) return;
  e.clipboardData.setData("text/plain", t.replaceAll(SHY, ""));
  e.preventDefault();
});
