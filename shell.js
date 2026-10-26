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
    pen: '<path d="M17 3.5a2.1 2.1 0 0 1 3 3L8 18.5l-4.5 1 1-4.5z"/><path d="M14.5 6l3 3"/>',
    comma: '<circle cx="8" cy="9" r="2.8" fill="currentColor" stroke="none"/><path d="M10.7 9.5c0 4.4-2 7.4-5.2 9" stroke-width="2.2"/><circle cx="17.5" cy="7.5" r="1.8" fill="currentColor" stroke="none"/><circle cx="17.5" cy="15.5" r="1.8" fill="currentColor" stroke="none"/>',
    clock: '<circle cx="12" cy="14" r="7.5"/><path d="M10 2.5h4M12 14l3-3M19 6l1.5-1.5"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    list: '<circle cx="12" cy="18.5" r="2.5"/><circle cx="6" cy="5.5" r="2.5"/><circle cx="18" cy="5.5" r="2.5"/><path d="M6 8v2a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8M12 12v4"/>',
    join: '<path d="M16 3h5v5M8 3H3v5"/><path d="M12 22v-8.3a4 4 0 0 0-1.2-2.9L3 3M15 9l6-6"/>',
    check: '<path d="M5 15.5l5.5-11 5.5 11M7.2 11.5h6.6"/><path d="M15 19l2 2 4-4"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    ask: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2.5 21.5z"/><path d="M9.3 9a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.6-2.7 2.6M12 16.5h.01"/>',
  };
  const items = [
    ["app.html", "Apžvalga", "home"], ["rasyba.html", "Rašyba", "pen"], ["skyryba.html", "Skyryba", "comma"],
    ["test.html", "Testas", "clock"], ["klaidos.html", "Klaidos", "chat"], ["nuotrauka.html", "Nuotrauka", "camera"],
    ["pratimai.html#kartu", "Kartu ar atskirai", "join"], ["pratimai.html#rusis", "Sakinio rūšis", "list"],
    ["pratimai.html#kultura", "Kalbos kultūra", "check"],
  ];
  // pratimai.html is 3 sections, told apart by #kartu / #rusis / #kultura
  const here = () => page === "pratimai.html" ? "pratimai.html#" + (location.hash.slice(1) || "kartu") : page;
  const cur = items.find(i => i[0] === here()) || ["", "Treniruoklis"];
  // "Pratimai" group: every exercise; "Meniu": overview, mistakes, photo check
  const isPr = i => !["app.html", "klaidos.html", "nuotrauka.html"].includes(i[0]);
  const link = ([href, label, ic]) => `<a href="${href}"${href === cur[0] ? ' class="on" aria-current="page"' : ""}>${svg(ic)}${label}${href === "klaidos.html" && n ? `<b>${n > 99 ? "99+" : n}</b>` : ""}</a>`;
  const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[k]}</svg>`;

  const shell = document.createElement("div");
  shell.className = "shell";
  shell.innerHTML = `
    <aside class="sbar" id="sbar">
      <a class="slogo" href="app.html"><span>Ą</span>Treniruoklis</a>
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
        ${page === "app.html" ? "" : `<a class="sback" href="app.html"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>Apžvalga</a>`}
        <div class="crumb"><a href="app.html">Treniruoklis</a><span>/</span><b>${cur[1]}</b></div>
        <details class="sset" id="sset">
          <summary aria-label="Nustatymai" title="Nustatymai"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.2 2h-.4a2 2 0 0 0-2 2v.2a2 2 0 0 1-1 1.7l-.4.3a2 2 0 0 1-2 0l-.2-.1a2 2 0 0 0-2.7.7l-.2.4a2 2 0 0 0 .7 2.7l.2.1a2 2 0 0 1 1 1.7v.5a2 2 0 0 1-1 1.7l-.2.1a2 2 0 0 0-.7 2.7l.2.4a2 2 0 0 0 2.7.7l.2-.1a2 2 0 0 1 2 0l.4.3a2 2 0 0 1 1 1.7v.2a2 2 0 0 0 2 2h.4a2 2 0 0 0 2-2v-.2a2 2 0 0 1 1-1.7l.4-.3a2 2 0 0 1 2 0l.2.1a2 2 0 0 0 2.7-.7l.2-.4a2 2 0 0 0-.7-2.7l-.2-.1a2 2 0 0 1-1-1.7v-.5a2 2 0 0 1 1-1.7l.2-.1a2 2 0 0 0 .7-2.7l-.2-.4a2 2 0 0 0-2.7-.7l-.2.1a2 2 0 0 1-2 0l-.4-.3a2 2 0 0 1-1-1.7V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></summary>
          <div>
            <b>Profilis</b>
            <div class="sprof" id="sprof"><p>Prisijunk, kad galėtum keisti profilį.</p><a href="index.html">Prisijungti</a></div>
            <b>Nustatymai</b>
            <label><span>Didesnis tekstas</span><input type="checkbox" role="switch" data-set="big"></label>
            <label><span>Mažiau animacijų</span><input type="checkbox" role="switch" data-set="calm"></label>
          </div>
        </details>
        <div id="authSlot"></div>
      </header>
    </div>`;
  main.before(shell);
  shell.querySelector(".smain").appendChild(main);
  // ⚙ settings: each switch is a class on <html> (set-big = larger text, set-calm = less motion; the <head> line applies them before first paint), remembered per device
  const SET = "settings";
  let set = {};
  try { set = JSON.parse(localStorage.getItem(SET)) || {}; } catch {}
  const sset = shell.querySelector("#sset");
  sset.querySelectorAll("[data-set]").forEach(box => {
    const k = box.dataset.set;
    box.checked = !!set[k];
    document.documentElement.classList.toggle("set-" + k, box.checked);
    box.addEventListener("change", () => {
      set[k] = box.checked;
      document.documentElement.classList.toggle("set-" + k, box.checked);
      try { localStorage.setItem(SET, JSON.stringify(set)); } catch {}
    });
  });
  document.addEventListener("click", e => { if (sset.open && !sset.contains(e.target)) sset.open = false; });
  // on document (runs before the window Escape handler below): closes only the menu, not the sidebar too
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape" || !sset.open) return;
    const had = sset.contains(document.activeElement);
    sset.open = false;
    if (had) sset.querySelector("summary").focus();
    e.stopPropagation();
  });
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
