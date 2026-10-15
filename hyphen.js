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
    if (!HY_SKIP.has(root.parentNode?.nodeName) && !root.data.includes(SHY)) {
      const t = hyphenateText(root.data);
      if (t !== root.data) root.data = t;
    }
    return;
  }
  if (root.nodeType !== 1 || HY_SKIP.has(root.nodeName)) return;
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walk.nextNode()) nodes.push(walk.currentNode);
  nodes.forEach(hyphenateNode);
}
hyphenateNode(document.body);
new MutationObserver(list => list.forEach(m => m.addedNodes.forEach(hyphenateNode)))
  .observe(document.body, { childList: true, subtree: true });

// Copying text: drop the hidden split marks
document.addEventListener("copy", e => {
  const t = String(getSelection());
  if (!t.includes(SHY) || e.target.closest?.("input, textarea")) return;
  e.clipboardData.setData("text/plain", t.replaceAll(SHY, ""));
  e.preventDefault();
});
