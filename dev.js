// Developer settings (only for me). Turn on: open any page with ?dev (remembered). Turn off: ?dev=0 or the button in the panel.
// Change theme colors/sizes or any element's text/style live, then "Kopijuoti kodą" and send it to Claude to make it real in the source.
(() => {
  const ON = "dev-mode", KEY = "dev-changes";
  try {
    const q = new URLSearchParams(location.search);
    if (q.has("dev")) localStorage.setItem(ON, q.get("dev") === "0" ? "0" : "1");
    if (localStorage.getItem(ON) !== "1") return;
  } catch { return; }

  const page = location.pathname.split("/").pop() || "index.html";
  const blank = () => ({ vars: {}, styles: [], texts: [], note: "" });
  const load = () => { try { return Object.assign(blank(), JSON.parse(localStorage.getItem(KEY))); } catch { return blank(); } };
  let data = load();
  const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const clean = s => String(s).replace(/­/g, "").replace(/\s+/g, " ").trim();
  const mine = c => c.page === "*" || c.page === page;
  const count = () => Object.keys(data.vars).length + data.styles.length + data.texts.length;

  // ---- apply saved changes ----
  const sheet = document.createElement("style");
  sheet.id = "dev-overrides";
  document.head.appendChild(sheet);
  const applied = new Set();
  function apply() {
    const root = document.documentElement.style;
    applied.forEach(n => { if (!data.vars[n]) root.removeProperty(n); });
    applied.clear();
    for (const [n, v] of Object.entries(data.vars)) { root.setProperty(n, v.to); applied.add(n); }
    sheet.textContent = data.styles.filter(mine).map(s => `${s.sel} { ${s.prop}: ${s.to} !important; }`).join("\n");
    applyTexts();
  }
  function applyTexts() {
    for (const t of data.texts.filter(mine)) {
      let el; try { el = document.querySelector(t.sel); } catch { continue; }
      if (el && !el.children.length && clean(el.textContent) === clean(t.from)) el.textContent = t.to;
    }
  }
  // quiz pages render text with JS, so re-apply text edits when the page changes
  let queued = false;
  new MutationObserver(() => {
    if (queued || !data.texts.some(mine)) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; applyTexts(); });
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch {} apply(); badge(); };

  // ---- helpers ----
  const STATE = new Set(["on", "open", "ok", "bad", "set", "cur", "done", "fixed", "peek", "collapsed", "in", "out", "ready", "alert", "cut", "empty", "fixing", "low", "has-auth", "js", "locked"]);
  function selOf(el) {
    const path = [];
    for (let n = el; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
      if (n.id) { path.unshift("#" + CSS.escape(n.id)); break; }
      let part = n.tagName.toLowerCase() + [...n.classList].filter(c => !STATE.has(c)).map(c => "." + CSS.escape(c)).join("");
      const same = n.parentElement ? [...n.parentElement.children].filter(c => c.tagName === n.tagName) : [];
      if (same.length > 1) part += `:nth-of-type(${same.indexOf(n) + 1})`;
      path.unshift(part);
      if (document.querySelectorAll(path.join(" > ")).length === 1) break;
    }
    if (!path[0]?.startsWith("#") && document.querySelectorAll(path.join(" > ")).length !== 1) path.unshift("body");
    return path.join(" > ");
  }
  const hex = v => {
    if (/^#[0-9a-f]{6}$/i.test(v)) return v;
    if (/^#[0-9a-f]{3}$/i.test(v)) return "#" + [...v.slice(1)].map(c => c + c).join("");
    const m = v.match(/[\d.]+/g);
    return v.startsWith("rgb") && m ? "#" + m.slice(0, 3).map(n => Math.round(+n).toString(16).padStart(2, "0")).join("") : "#000000";
  };
  const isColor = v => /^(#|rgb|hsl)/i.test(v.trim());

  // ---- UI ----
  const css = document.createElement("style");
  css.textContent = `
  #dev-root, #dev-root * { box-sizing:border-box; font:13px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif; letter-spacing:0; }
  #dev-root .dv-fab { position:fixed; left:16px; bottom:16px; z-index:2147483000; border:none; border-radius:999px; padding:9px 14px; background:#14161c; color:#fff; font-weight:600; cursor:pointer; box-shadow:0 6px 18px rgba(0,0,0,.25); }
  #dev-root .dv-fab b { background:#ff9f1c; color:#14161c; border-radius:999px; padding:0 6px; margin-left:6px; font-weight:700; }
  #dev-root .dv-panel { position:fixed; left:16px; bottom:62px; z-index:2147483000; width:min(380px,calc(100vw - 32px)); max-height:min(78vh,680px); display:flex; flex-direction:column; background:#fff; color:#14161c; border:1px solid #e3e7ed; border-radius:16px; box-shadow:0 18px 50px rgba(0,0,0,.25); overflow:hidden; }
  #dev-root .dv-tabs { display:flex; gap:4px; padding:8px; border-bottom:1px solid #e3e7ed; background:#f6f7f9; }
  #dev-root .dv-tabs button { flex:1; border:none; border-radius:10px; padding:7px 6px; background:none; cursor:pointer; color:#646b79; font-weight:600; }
  #dev-root .dv-tabs button.on { background:#fff; color:#14161c; box-shadow:0 1px 3px rgba(0,0,0,.1); }
  #dev-root .dv-body { overflow:auto; padding:12px 14px 14px; }
  #dev-root .dv-sub { color:#646b79; margin:0 0 10px; }
  #dev-root .dv-row { display:grid; grid-template-columns:1fr 150px; gap:8px; align-items:center; padding:4px 0; }
  #dev-root .dv-row > span { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  #dev-root .dv-row.ch > span { color:#e06c12; font-weight:600; }
  #dev-root .dv-in { display:flex; gap:4px; }
  #dev-root input[type=text], #dev-root textarea, #dev-root select { width:100%; padding:5px 8px; border:1px solid #d6dbe3; border-radius:8px; background:#fff; color:#14161c; }
  #dev-root input[type=color] { width:30px; height:28px; padding:0; border:1px solid #d6dbe3; border-radius:8px; background:none; flex:none; cursor:pointer; }
  #dev-root textarea { min-height:60px; resize:vertical; font-family:ui-monospace,Consolas,monospace; }
  #dev-root label.dv-l { display:block; font-weight:600; margin:10px 0 4px; }
  #dev-root .dv-btns { display:flex; flex-wrap:wrap; gap:6px; margin-top:12px; }
  #dev-root .dv-btns button { border:none; border-radius:10px; padding:8px 12px; background:#e9ecf1; color:#14161c; cursor:pointer; font-weight:600; }
  #dev-root .dv-btns .dv-main { background:#14161c; color:#fff; }
  #dev-root .dv-btns .dv-red { background:#fbecee; color:#b3343f; }
  #dev-root .dv-sel { background:#f3f9fc; border-radius:10px; padding:8px 10px; word-break:break-all; font-family:ui-monospace,Consolas,monospace; font-size:12px; }
  #dev-root pre { white-space:pre-wrap; word-break:break-word; background:#f6f7f9; border-radius:10px; padding:10px; margin:0; font:12px/1.5 ui-monospace,Consolas,monospace; max-height:260px; overflow:auto; }
  #dev-root .dv-x { border:none; background:none; color:#b3343f; cursor:pointer; font-size:14px; padding:0 4px; }
  #dev-root .dv-item { display:flex; justify-content:space-between; gap:8px; padding:5px 0; border-bottom:1px solid #f0f2f5; }
  #dev-root .dv-item code { font:12px ui-monospace,Consolas,monospace; word-break:break-all; }
  #dev-hl { position:fixed; z-index:2147482999; pointer-events:none; border:2px solid #ff9f1c; background:rgba(255,159,28,.12); border-radius:4px; transition:all 60ms; }
  #dev-hl i { position:absolute; left:-2px; bottom:100%; background:#ff9f1c; color:#14161c; font:600 11px/1.6 system-ui,sans-serif; font-style:normal; padding:0 6px; border-radius:4px 4px 0 0; white-space:nowrap; }`;
  document.head.appendChild(css);

  const root = document.createElement("div");
  root.id = "dev-root";
  root.innerHTML = `<button class="dv-fab" type="button">⚙ Dev</button><div class="dv-panel" hidden><div class="dv-tabs"><button data-t="theme">Tema</button><button data-t="el">Elementas</button><button data-t="code">Kodas</button></div><div class="dv-body"></div></div>`;
  document.body.appendChild(root);
  const fab = root.querySelector(".dv-fab"), panel = root.querySelector(".dv-panel"), body = root.querySelector(".dv-body");
  const badge = () => { const n = count(); fab.innerHTML = `⚙ Dev${n ? `<b>${n}</b>` : ""}`; };
  // typing in the panel must not trigger the quiz's Enter / shortcut handlers
  root.addEventListener("keydown", ev => ev.stopPropagation());
  root.addEventListener("keyup", ev => ev.stopPropagation());

  let tab = "theme", picked = null, scope = page;
  fab.onclick = () => { panel.hidden = !panel.hidden; if (!panel.hidden) render(); };
  root.querySelectorAll(".dv-tabs button").forEach(b => b.onclick = () => { tab = b.dataset.t; render(); });

  function render() {
    root.querySelectorAll(".dv-tabs button").forEach(b => b.classList.toggle("on", b.dataset.t === tab));
    ({ theme: renderTheme, el: renderEl, code: renderCode })[tab]();
  }

  // color/text input pair; onSet(value)
  function field(label, value, changed, onSet) {
    const row = document.createElement("div");
    row.className = "dv-row" + (changed ? " ch" : "");
    row.innerHTML = `<span title="${e(label)}">${e(label)}</span><div class="dv-in">${isColor(value) ? `<input type="color" value="${hex(value)}">` : ""}<input type="text" value="${e(value)}"></div>`;
    const txt = row.querySelector("input[type=text]"), col = row.querySelector("input[type=color]");
    txt.onchange = () => onSet(txt.value.trim());
    // only save on change: re-rendering while the native picker is open would close it
    if (col) { col.oninput = () => { txt.value = col.value; }; col.onchange = () => onSet(col.value); }
    return row;
  }

  // ---- Tema: every --variable from the :root rules ----
  // name -> where it's defined (last one wins, like the cascade)
  const varSrc = {};
  function varNames() {
    for (const sh of document.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch { continue; }
      const src = sh.href ? sh.href.split("/").pop().split("?")[0] : `${page} <style>`;
      for (const r of rules) if (r.selectorText === ":root") for (const p of r.style) if (p.startsWith("--")) varSrc[p] = src;
    }
    return Object.keys(varSrc);
  }
  function renderTheme() {
    body.innerHTML = `<p class="dv-sub">Spalvos ir dydžiai visai programėlei (theme.css). Keičiasi iškart visuose puslapiuose.</p>`;
    const cs = getComputedStyle(document.documentElement);
    for (const n of varNames()) {
      const ch = data.vars[n];
      const now = ch ? ch.to : cs.getPropertyValue(n).trim();
      body.appendChild(field(n, now, !!ch, v => {
        const from = ch ? ch.from : cs.getPropertyValue(n).trim();
        if (!v || v === from) delete data.vars[n]; else data.vars[n] = { from, to: v, src: varSrc[n] };
        save(); renderTheme();
      }));
    }
  }

  // ---- Elementas: pick anything on the page, change its text / style ----
  const FIELDS = [
    ["font-size", "Šrifto dydis"], ["font-weight", "Storis (400, 600…)"], ["color", "Teksto spalva"],
    ["background-color", "Fonas"], ["border-radius", "Kampų apvalumas"], ["padding", "Vidinis tarpas"],
    ["margin", "Išorinis tarpas"], ["width", "Plotis"], ["gap", "Tarpas tarp vidinių"], ["line-height", "Eilutės aukštis"],
    ["text-align", "Lygiavimas"], ["opacity", "Permatomumas"],
  ];
  function renderEl() {
    if (!picked || !picked.el.isConnected) {
      try { const el = picked && document.querySelector(picked.sel); picked = el ? { el, sel: picked.sel } : null; } catch { picked = null; }
    }
    body.innerHTML = `<p class="dv-sub">Spausk „Pasirinkti“, tada paspausk bet ką puslapyje. Esc – atšaukti.</p>
      <div class="dv-btns" style="margin-top:0"><button class="dv-main" id="dv-pick">🎯 Pasirinkti elementą</button>${picked ? `<button id="dv-up">⬆ Tėvinis</button>` : ""}</div>`;
    body.querySelector("#dv-pick").onclick = startPick;
    if (!picked) return;
    body.querySelector("#dv-up").onclick = () => {
      const p = picked.el.parentElement;
      if (p && p !== document.body && p !== document.documentElement) { picked = { el: p, sel: selOf(p) }; renderEl(); }
    };
    const { el, sel } = picked, cs = getComputedStyle(el);
    const wrap = document.createElement("div");
    wrap.innerHTML = `<label class="dv-l">Elementas</label><div class="dv-sel">${e(sel)}</div>
      <label class="dv-l">Kur taikyti</label><select id="dv-scope"><option value="${e(page)}">Tik šiame puslapyje (${e(page)})</option><option value="*">Visuose puslapiuose</option></select>`;
    body.appendChild(wrap);
    const sc = wrap.querySelector("#dv-scope");
    sc.value = scope; sc.onchange = () => { scope = sc.value; };

    // text: only for elements that hold plain text (no tags inside)
    if (!el.children.length && clean(el.textContent)) {
      const t = data.texts.find(x => x.sel === sel && mine(x));
      const lab = document.createElement("label"); lab.className = "dv-l"; lab.textContent = "Tekstas";
      const ta = document.createElement("textarea"); ta.value = clean(el.textContent);
      ta.onchange = () => {
        const from = t ? t.from : clean(el.textContent), to = ta.value.trim();
        data.texts = data.texts.filter(x => !(x.sel === sel && mine(x)));
        if (to && to !== from) data.texts.push({ page: scope, sel, from, to });
        if (t) el.textContent = from; // back to the original so the new edit applies live
        save(); renderEl();
      };
      body.append(lab, ta);
    } else if (clean(el.textContent)) {
      const hint = document.createElement("p"); hint.className = "dv-sub"; hint.style.margin = "10px 0 0";
      hint.textContent = "Tekstas turi vidinių žymų – spausk „Pasirinkti“ ir pasirink vidinį elementą, kad pakeistum tekstą.";
      body.appendChild(hint);
    }

    const lab = document.createElement("label"); lab.className = "dv-l"; lab.textContent = "Stilius";
    body.appendChild(lab);
    const setStyle = (prop, v) => {
      const old = data.styles.find(x => x.sel === sel && x.prop === prop && mine(x));
      const from = old ? old.from : cs.getPropertyValue(prop).trim();
      data.styles = data.styles.filter(x => x !== old);
      if (v && v !== from) data.styles.push({ page: scope, sel, what: clean(data.texts.find(x => x.sel === sel)?.from ?? el.textContent).slice(0, 60), prop, from, to: v });
      save(); renderEl();
    };
    for (const [prop, name] of FIELDS) {
      const ch = data.styles.find(x => x.sel === sel && x.prop === prop && mine(x));
      body.appendChild(field(name, ch ? ch.to : cs.getPropertyValue(prop).trim(), !!ch, v => setStyle(prop, v)));
    }
    const hiddenCh = data.styles.find(x => x.sel === sel && x.prop === "display" && x.to === "none" && mine(x));
    const hide = document.createElement("div");
    hide.className = "dv-btns";
    hide.innerHTML = `<button class="${hiddenCh ? "dv-main" : ""}">${hiddenCh ? "👁 Rodyti vėl" : "🙈 Paslėpti elementą"}</button>`;
    hide.firstChild.onclick = () => setStyle("display", hiddenCh ? "" : "none");
    body.appendChild(hide);

    const lab2 = document.createElement("label"); lab2.className = "dv-l"; lab2.textContent = "Kitas CSS (savybė: reikšmė)";
    const free = document.createElement("textarea"); free.placeholder = "pvz.\nletter-spacing: 1px\nborder: 2px solid red";
    const add = document.createElement("div"); add.className = "dv-btns"; add.innerHTML = `<button>Pridėti</button>`;
    add.firstChild.onclick = () => {
      for (const line of free.value.split(/[\n;]/)) {
        const i = line.indexOf(":"); if (i < 1) continue;
        setStyle(line.slice(0, i).trim().toLowerCase(), line.slice(i + 1).trim());
      }
    };
    body.append(lab2, free, add);
  }

  let hl = null, hover = null;
  function startPick() {
    panel.hidden = true;
    hl = document.createElement("div"); hl.id = "dev-hl"; hl.innerHTML = "<i></i>";
    document.body.appendChild(hl);
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("keydown", onKey, true);
  }
  function stopPick() {
    hl?.remove(); hl = hover = null;
    document.removeEventListener("mousemove", onMove, true);
    document.removeEventListener("click", onClick, true);
    document.removeEventListener("keydown", onKey, true);
    panel.hidden = false; tab = "el"; render();
  }
  function onMove(ev) {
    const t = ev.target;
    if (!(t instanceof Element) || root.contains(t) || t === document.body || t === document.documentElement) return;
    hover = t;
    const r = t.getBoundingClientRect();
    Object.assign(hl.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
    hl.firstChild.textContent = t.tagName.toLowerCase() + (t.classList.length ? "." + [...t.classList].join(".") : "");
  }
  function onClick(ev) {
    if (root.contains(ev.target)) return;
    ev.preventDefault(); ev.stopPropagation();
    const t = hover || ev.target;
    if (t instanceof Element && t !== document.body) picked = { el: t, sel: selOf(t) };
    stopPick();
  }
  function onKey(ev) { if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); stopPick(); } }

  // ---- Kodas: everything as text to send to Claude ----
  function asText() {
    const L = ["=== LT APP DEV PAKEITIMAI v1 ===", "Claude: padaryk šiuos pakeitimus kode (lt-study-app).", ""];
    if (data.note.trim()) L.push("PASTABA: " + data.note.trim(), "");
    const vars = Object.entries(data.vars);
    if (vars.length) { L.push("TEMA (:root kintamieji)"); vars.forEach(([n, v]) => L.push(`  ${n}: ${v.from} → ${v.to}  [${v.src || "theme.css"}]`)); L.push(""); }
    if (data.styles.length) {
      L.push("STILIUS");
      const groups = new Map();
      for (const s of data.styles) { const k = s.page + "|" + s.sel; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(s); }
      for (const list of groups.values()) {
        const s0 = list[0];
        L.push(`  [${s0.page === "*" ? "visi puslapiai" : s0.page}] ${s0.sel}${s0.what ? `  („${s0.what}“)` : ""}`);
        list.forEach(s => L.push(`    ${s.prop}: ${s.from} → ${s.to}`));
      }
      L.push("");
    }
    if (data.texts.length) {
      L.push("TEKSTAS");
      data.texts.forEach(t => L.push(`  [${t.page === "*" ? "visi puslapiai" : t.page}] ${t.sel}`, `    „${t.from}“ → „${t.to}“`));
      L.push("");
    }
    return L.join("\n").trim();
  }
  let sure = false;
  function renderCode() {
    const n = count();
    body.innerHTML = `<p class="dv-sub">${n ? `${n} pakeitim${n === 1 ? "as" : n < 10 ? "ai" : "ų"}.` : "Kol kas pakeitimų nėra."} Nukopijuok kodą ir atsiųsk Claudui – jis padarys tai tikrame kode. Po to spausk „Išvalyti“.</p>
      <label class="dv-l" style="margin-top:0">Pastaba Claudui (nebūtina)</label><textarea id="dv-note" placeholder="pvz. noriu, kad mygtukai būtų ryškesni">${e(data.note)}</textarea>
      <div id="dv-list"></div>
      <label class="dv-l">Kodas</label><pre>${e(asText())}</pre>
      <div class="dv-btns"><button class="dv-main" id="dv-copy">📋 Kopijuoti kodą</button><button class="dv-red" id="dv-clear">${sure ? "Tikrai išvalyti?" : "Išvalyti viską"}</button><button id="dv-off">Išjungti dev</button></div>`;
    const note = body.querySelector("#dv-note");
    note.onchange = () => { data.note = note.value; save(); renderCode(); };
    // one ✕ per change, so a single mistake can be undone
    const list = body.querySelector("#dv-list");
    const item = (label, undo) => {
      const d = document.createElement("div"); d.className = "dv-item";
      d.innerHTML = `<code>${e(label)}</code><button class="dv-x" title="Atšaukti">✕</button>`;
      d.querySelector("button").onclick = () => { undo(); save(); renderCode(); };
      list.appendChild(d);
    };
    Object.keys(data.vars).forEach(k => item(`${k} → ${data.vars[k].to}`, () => delete data.vars[k]));
    data.styles.forEach(s => item(`${s.sel} { ${s.prop}: ${s.to} }`, () => data.styles.splice(data.styles.indexOf(s), 1)));
    data.texts.forEach(t => item(`„${t.to}“`, () => {
      data.texts.splice(data.texts.indexOf(t), 1);
      try { const el = document.querySelector(t.sel); if (el && clean(el.textContent) === clean(t.to)) el.textContent = t.from; } catch {}
    }));
    const copy = body.querySelector("#dv-copy");
    copy.onclick = async () => {
      try { await navigator.clipboard.writeText(asText()); }
      catch { const t = document.createElement("textarea"); t.value = asText(); document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); }
      copy.textContent = "Nukopijuota ✓";
    };
    body.querySelector("#dv-clear").onclick = () => {
      if (!sure) { sure = true; renderCode(); return; }
      sure = false;
      data.texts.forEach(t => { try { const el = document.querySelector(t.sel); if (el && clean(el.textContent) === clean(t.to)) el.textContent = t.from; } catch {} });
      data = blank(); save(); renderCode();
    };
    body.querySelector("#dv-off").onclick = () => { try { localStorage.setItem(ON, "0"); } catch {} const u = new URL(location.href); u.searchParams.delete("dev"); location.replace(u); };
  }

  apply(); badge();
})();
