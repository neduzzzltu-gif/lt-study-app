// App shell (Taskora-style): sidebar menu + top bar around the page's <main>.
// Landing page: wraps .wrap instead and puts ☰ into its own nav (no top bar, it already has one).
// Runs before auth.js (deferred), so the login button lands in the top bar's #authSlot.
(() => {
  const landing = document.querySelector(".hero .nav");
  const main = landing ? document.querySelector(".wrap") : document.querySelector("main");
  if (!main || document.querySelector(".shell")) return;
  const page = location.pathname.split("/").pop() || "index.html";
  const count = k => { try { return Object.keys(JSON.parse(localStorage.getItem(k)) || {}).length; } catch { return 0; } };
  const n = count("rasyba-mistakes") + count("skyryba-mistakes");
  const I = {
    home: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    comma: '<path d="M10 15a2 2 0 1 1 0 4m0 0-2 3"/><path d="M15 5v8"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    list: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>',
    join: '<rect x="3" y="7" width="8" height="10" rx="2"/><rect x="13" y="7" width="8" height="10" rx="2"/>',
    check: '<path d="M5 12l4 4 10-10"/>',
    ask: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01"/>',
  };
  const items = [
    ["app.html", "Apžvalga", "home"], ["rasyba.html", "Rašyba", "pen"], ["skyryba.html", "Skyryba", "comma"],
    ["test.html", "Testas", "clock"], ["klaidos.html", "Klaidos", "chat"],
    ["pratimai.html#kartu", "Kartu ar atskirai", "join"], ["pratimai.html#rusis", "Sakinio rūšis", "list"], ["pratimai.html#zenklas", "Ženklai", "ask"],
    ["pratimai.html#kultura", "Kalbos kultūra", "check"],
  ];
  // pratimai.html is 4 sections, told apart by #kartu / #rusis / #zenklas / #kultura
  const here = () => page === "pratimai.html" ? "pratimai.html#" + (location.hash.slice(1) || "kartu") : page;
  const cur = items.find(i => i[0] === here()) || ["", "Treniruoklis"];
  // "Pratimai" group: every exercise; "Meniu": overview + mistakes
  const isPr = i => !["app.html", "klaidos.html"].includes(i[0]);
  const link = ([href, label, ic]) => `<a href="${href}"${href === cur[0] ? ' class="on" aria-current="page"' : ""}>${svg(ic)}${label}${href === "klaidos.html" && n ? `<b>${n > 99 ? "99+" : n}</b>` : ""}</a>`;
  const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${I[k]}</svg>`;

  const shell = document.createElement("div");
  shell.className = "shell";
  shell.innerHTML = `
    <aside class="sbar" id="sbar">
      <a class="slogo" href="index.html"><span>Ą</span>Treniruoklis</a>
      <small>Meniu</small>
      <nav>${items.filter(i => !isPr(i)).map(link).join("")}</nav>
      <small>Pratimai</small>
      <nav aria-label="Pratimai">${items.filter(isPr).map(link).join("")}</nav>
      <div class="stip"><b>Patarimas</b>Klaida laikoma pataisyta, kai toje vietoje atsakai teisingai 2 kartus iš eilės.</div>
    </aside>
    <div class="sdim" id="sdim"></div>
    <div class="smain">
      <header class="tbar">
        <button class="sburger" id="sburger" type="button" aria-label="Rodyti arba slėpti meniu" aria-controls="sbar" aria-expanded="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
        <a class="sback" href="${page === "app.html" ? "index.html" : "app.html"}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>${page === "app.html" ? "Pradžia" : "Apžvalga"}</a>
        <div class="crumb"><a href="index.html">Treniruoklis</a><span>/</span><b>${cur[1]}</b></div>
        <div id="authSlot"></div>
      </header>
    </div>`;
  main.before(shell);
  shell.querySelector(".smain").appendChild(main);
  if (landing) {
    // keep ☰ next to the logo in the hero nav, drop the extra top bar
    const tbar = shell.querySelector(".tbar"), left = document.createElement("div");
    left.className = "nav-l";
    landing.querySelector(".logo").before(left);
    left.append(tbar.querySelector("#sburger"), landing.querySelector(".logo"));
    tbar.remove();
  }

  addEventListener("hashchange", () => {
    const now = items.find(i => i[0] === here());
    if (!now) return;
    shell.querySelectorAll(".sbar nav a").forEach(a => { const on = a.getAttribute("href") === now[0]; a.classList.toggle("on", on); on ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"); });
    const crumb = shell.querySelector(".crumb b"); if (crumb) crumb.textContent = now[1];
  });

  // ☰ hides/shows the sidebar (remembered). Hidden: touching the left edge with the mouse slides it back in.
  // Phone: the sidebar is always a drawer.
  const btn = shell.querySelector("#sburger"), sbar = shell.querySelector("#sbar");
  const edge = document.createElement("div");
  edge.className = "sedge"; edge.setAttribute("aria-hidden", "true");
  shell.prepend(edge);
  const phone = matchMedia("(max-width:900px)"), KEY = "sidebar-hidden";
  let hidden = false, leaveTimer = 0;
  try { hidden = localStorage.getItem(KEY) === "1"; } catch {}
  const sync = () => {
    const open = shell.classList.contains("open"), peek = shell.classList.contains("peek");
    shell.classList.toggle("collapsed", hidden && !phone.matches);
    btn.setAttribute("aria-expanded", phone.matches ? open : !hidden || peek);
    sbar.inert = phone.matches ? !open : hidden && !peek; // off-screen = out of the tab order
  };
  const setOpen = open => {
    shell.classList.toggle(phone.matches ? "open" : "peek", open);
    sync();
    if (open) sbar.querySelector("nav a")?.focus();
  };
  sync();
  phone.addEventListener("change", () => { shell.classList.remove("open", "peek"); sync(); });
  btn.addEventListener("click", () => {
    if (phone.matches) return setOpen(!shell.classList.contains("open"));
    hidden = !hidden;
    try { localStorage.setItem(KEY, hidden ? "1" : "0"); } catch {}
    shell.classList.remove("peek");
    sync();
  });
  edge.addEventListener("mouseenter", () => { clearTimeout(leaveTimer); if (hidden) { shell.classList.add("peek"); sync(); } });
  sbar.addEventListener("mouseenter", () => clearTimeout(leaveTimer));
  sbar.addEventListener("mouseleave", () => {
    if (!shell.classList.contains("peek")) return;
    leaveTimer = setTimeout(() => { shell.classList.remove("peek"); sync(); }, 250);
  });
  shell.querySelector("#sdim").addEventListener("click", () => setOpen(false));
  addEventListener("keydown", e => {
    if (e.key === "Escape" && shell.matches(".open, .peek")) { shell.classList.remove("open", "peek"); sync(); btn.focus(); }
  });
})();
