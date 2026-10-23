// Shared motion: scroll reveals + count-ups, the nav bubble, cursor tags following the mouse,
// a soft fade between sentences and the result-screen ring. Styles live in theme.css / index.html.
(() => {
  window.__motion = 1;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
  const easeOut = t => 1 - Math.pow(1 - t, 3);

  // Count a number up from 0 to data-count
  function countUp(el, delay = 0, dur = 1100) {
    const to = +el.dataset.count;
    if (!Number.isFinite(to) || reduce || !to) return void (el.textContent = to || 0);
    const start = performance.now() + delay;
    el.textContent = 0;
    const tick = t => {
      const p = Math.min(Math.max((t - start) / dur, 0), 1);
      el.textContent = Math.round(to * easeOut(p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Reveal on scroll (once). Numbers inside count up; nested reveals handle their own numbers.
  const show = el => {
    el.classList.add("in");
    [...el.querySelectorAll("[data-count]")].filter(c => c.closest("[data-reveal]") === el)
      .forEach((c, i) => countUp(c, 250 + i * 90));
    const i = +getComputedStyle(el).getPropertyValue("--i") || 0;
    setTimeout(() => el.classList.add("done"), 650 + i * 60);
  };
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) els.forEach(show);
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(el => io.observe(el));
  }

  // Nav: the white bubble slides to the link of the section you're looking at
  const links = document.querySelector(".links"), ind = links?.querySelector(".ind");
  if (ind) {
    const as = [...links.querySelectorAll("a")];
    let cur = as[0], lockUntil = 0;
    const move = a => {
      cur = a;
      ind.style.width = a.offsetWidth + "px";
      ind.style.transform = `translateX(${a.offsetLeft}px)`;
      as.forEach(x => x.classList.toggle("on", x === a));
    };
    move(cur);
    requestAnimationFrame(() => requestAnimationFrame(() => ind.classList.add("ready")));
    // a click moves it right away; ignore the sections scrolled past on the way
    as.forEach(a => a.addEventListener("click", () => { move(a); lockUntil = Date.now() + 2000; }));
    addEventListener("scrollend", () => { lockUntil = 0; });
    const bySec = new Map(as.map(a => [document.querySelector(a.getAttribute("href")), a]).filter(([s]) => s));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(es => {
        if (Date.now() < lockUntil) return;
        const hit = es.find(e => e.isIntersecting);
        if (hit) move(bySec.get(hit.target));
      }, { rootMargin: "-45% 0px -50% 0px" });
      bySec.forEach((_, s) => io.observe(s));
    }
    addEventListener("resize", () => move(cur));
    document.fonts?.ready.then(() => move(cur));
  }

  // Cursor tags lean toward the mouse (mouse only, smoothed)
  const tags = [...document.querySelectorAll("[data-depth]")];
  if (tags.length && fine && !reduce) {
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const loop = () => {
      x += (tx - x) * .08; y += (ty - y) * .08;
      tags.forEach(t => { const d = +t.dataset.depth; t.style.transform = `translate3d(${(x * d).toFixed(2)}px, ${(y * d).toFixed(2)}px, 0)`; });
      raf = Math.abs(tx - x) + Math.abs(ty - y) > .001 ? requestAnimationFrame(loop) : 0;
    };
    addEventListener("pointermove", e => {
      tx = e.clientX / innerWidth - .5; ty = e.clientY / innerHeight - .5;
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: true });
  }

  // Practice pages: the next sentence fades in instead of popping (test.html rebuilds #sentence, so re-query it)
  if (!document.querySelector(".hero") && document.body.animate) {
    let lastText = document.getElementById("sentence")?.textContent;
    new MutationObserver(recs => {
      const sent = document.getElementById("sentence");
      // only a new sentence: #sentence itself replaced, or its children swapped (not inner edits after "Tikrinti")
      if (!sent || sent.textContent === lastText || !recs.some(r => r.target === sent || [...r.addedNodes].some(n => n.contains?.(sent)))) return;
      lastText = sent.textContent;
      sent.animate([{ opacity: 0, transform: reduce ? "none" : "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 180, easing: EASE });
    }).observe(document.querySelector("main") || document.body, { childList: true, subtree: true });
  }

  // Result screens (round end, test): ring fills to the score, the number counts up, letters burst on a good score
  const LETTERS = ["ą", "ę", "į", "ų", "ė", "ū", "č", "š", "ž", ","];
  function burst(box) {
    if (reduce || !box.animate) return;
    const ring = box.querySelector(".ring");
    LETTERS.forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "burst"; s.textContent = ch; s.setAttribute("aria-hidden", "true");
      if (ring) s.style.top = ring.offsetTop + ring.offsetHeight / 2 - 12 + "px";
      box.appendChild(s);
      const a = (i / LETTERS.length) * Math.PI * 2 + Math.random() * .4, r = 70 + Math.random() * 50;
      const dx = Math.cos(a) * r, dy = Math.sin(a) * r, rot = (Math.random() - .5) * 90;
      s.animate([
        { opacity: 0, transform: "translate(-50%, -50%) scale(.6)" },
        { opacity: 1, transform: `translate(calc(-50% + ${dx * .6}px), calc(-50% + ${dy * .6}px)) scale(1) rotate(${rot * .6}deg)`, offset: .45 },
        { opacity: 0, transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 18}px)) scale(.9) rotate(${rot}deg)` },
      ], { duration: 1000, delay: 450 + i * 20, easing: EASE, fill: "both" }).onfinish = () => s.remove();
    });
  }
  function celebrate(box) {
    box.dataset.done = "1";
    const big = box.querySelector(".big"), m = big?.textContent.match(/(\d+)\s*\/\s*(\d+)/);
    if (!m) return;
    const good = +m[1], total = +m[2], pct = total ? good / total * 100 : 100;
    const ring = document.createElement("div");
    ring.className = "ring"; ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" pathLength="100"/><circle class="arc" cx="60" cy="60" r="50" pathLength="100" style="--p:${pct.toFixed(1)}"/></svg>`;
    big.before(ring);
    big.innerHTML = `<span data-count="${good}">${good}</span> / ${total}`;
    countUp(big.firstElementChild, 100, 900);
    if (box.classList.contains("good")) burst(box);
  }
  const scan = () => document.querySelectorAll(".rsum:not([data-done]), .card.score:not([data-done])").forEach(celebrate);
  if (!document.querySelector(".hero")) {
    scan();
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
  }
})();
