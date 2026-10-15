// DEMO ONLY – "Pranešti klaidą" tool. To remove: delete this file and its <script> line in the pages.
(() => {
  const KEY = "demo-reports";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const save = l => localStorage.setItem(KEY, JSON.stringify(l));
  const e = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

  const css = document.createElement("style");
  css.textContent = `
  .dr-btn { position:fixed; right:16px; bottom:16px; z-index:50; border:none; border-radius:999px; padding:10px 16px; font:600 14px system-ui,sans-serif; background:#ff9f1c; color:#1d1d1f; cursor:pointer; box-shadow:0 6px 18px rgba(0,0,0,.18); }
  .dr-btn small { font-weight:400; opacity:.8; }
  .dr-back { position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:60; display:flex; align-items:center; justify-content:center; padding:16px; }
  .dr-box { background:#fff; border-radius:16px; width:min(520px,100%); max-height:85vh; overflow:auto; padding:20px; font:15px/1.5 system-ui,sans-serif; color:#1d1d1f; }
  .dr-box h3 { margin:0 0 4px; font-size:18px; }
  .dr-box .dr-sub { color:#6b6b70; font-size:13px; margin:0 0 14px; }
  .dr-box label { display:block; font-size:13px; font-weight:600; margin:10px 0 4px; }
  .dr-box input, .dr-box textarea { width:100%; box-sizing:border-box; font:inherit; padding:8px 10px; border:1px solid #e3e0d8; border-radius:10px; }
  .dr-box textarea { min-height:80px; resize:vertical; }
  .dr-ctx { background:#f6f4ef; border-radius:10px; padding:8px 10px; font-size:13px; color:#444; }
  .dr-row { display:flex; gap:8px; flex-wrap:wrap; margin-top:14px; }
  .dr-row button { font:inherit; padding:10px 16px; border-radius:10px; border:none; cursor:pointer; background:#e3e0d8; }
  .dr-row .dr-main { background:#1d1d1f; color:#fff; }
  .dr-item { border-left:4px solid #ff9f1c; background:#fffaf2; padding:8px 12px; border-radius:0 10px 10px 0; margin-bottom:8px; font-size:14px; }
  .dr-item .dr-x { float:right; border:none; background:none; cursor:pointer; color:#c62828; font-size:16px; }
  .dr-item .dr-meta { color:#6b6b70; font-size:12px; }`;
  document.head.appendChild(css);

  const btn = document.createElement("button");
  btn.className = "dr-btn";
  document.body.appendChild(btn);
  const label = () => { const n = load().length; btn.innerHTML = `🐞 Pranešti klaidą${n ? ` <small>(${n})</small>` : ""}`; };
  label();

  // Grab selected text before the click clears it
  let picked = "";
  let viaMouse = false;
  btn.addEventListener("mousedown", () => { picked = String(getSelection()).replace(/\u00AD/g, "").trim(); viaMouse = true; });

  const page = (document.querySelector("h1")?.textContent || document.title).replace(/\u00AD/g, "").trim();
  const context = () => (document.getElementById("sentence")?.innerText || "").replace(/\u00AD/g, "").replace(/\s+/g, " ").trim();

  function close() { document.querySelector(".dr-back")?.remove(); }
  function modal(html) {
    close();
    const back = document.createElement("div");
    back.className = "dr-back";
    back.innerHTML = `<div class="dr-box">${html}</div>`;
    back.addEventListener("click", ev => { if (ev.target === back) close(); });
    // Keep typing here from triggering the page's Enter / shortcut handlers
    back.addEventListener("keydown", ev => { ev.stopPropagation(); if (ev.key === "Escape") close(); });
    document.body.appendChild(back);
    return back;
  }

  function form() {
    const ctx = context();
    const b = modal(`
      <h3>🐞 Pranešti klaidą</h3>
      <p class="dr-sub">Demo versija. Pažymėk žodį sakinyje prieš spausdamas mygtuką – jis įsirašys pats.</p>
      ${ctx ? `<label>Sakinys</label><div class="dr-ctx">${e(ctx.slice(0, 400))}</div>` : ""}
      <label>Žodis / vieta</label><input id="dr-word" value="${e(picked)}" placeholder="pvz. grėsiančius">
      <label>Kas negerai, kaip turėtų būti?</label><textarea id="dr-note" placeholder="pvz. turi būti gresiančius (su e)"></textarea>
      <div class="dr-row"><button class="dr-main" id="dr-save">Išsaugoti</button><button id="dr-list">Mano pranešimai (${load().length})</button><button id="dr-close">Uždaryti</button></div>`);
    b.querySelector(picked ? "#dr-note" : "#dr-word").focus();
    b.querySelector("#dr-close").onclick = close;
    b.querySelector("#dr-list").onclick = list;
    b.querySelector("#dr-save").onclick = () => {
      const word = b.querySelector("#dr-word").value.trim(), note = b.querySelector("#dr-note").value.trim();
      if (!word && !note) return;
      const l = load();
      l.push({ page, sentence: ctx, word, note, at: new Date().toISOString().slice(0, 16).replace("T", " ") });
      save(l); label(); list();
    };
  }

  function asText() {
    return load().map((r, i) => `${i + 1}. [${r.page}] ${r.word}${r.note ? " – " + r.note : ""}${r.sentence ? `\n   Sakinys: ${r.sentence}` : ""}`).join("\n");
  }

  function list() {
    const l = load();
    const b = modal(`
      <h3>Mano pranešimai (${l.length})</h3>
      <p class="dr-sub">Kai susikaups, spausk „Kopijuoti viską“ ir atsiųsk.</p>
      ${l.length ? l.map((r, i) => `<div class="dr-item"><button class="dr-x" data-i="${i}" title="Ištrinti">✕</button><b>${e(r.word || "—")}</b>${r.note ? ` – ${e(r.note)}` : ""}<div class="dr-meta">${e(r.page)} · ${e(r.at)}</div></div>`).join("") : `<p class="dr-sub">Kol kas tuščia.</p>`}
      <div class="dr-row">${l.length ? `<button class="dr-main" id="dr-copy">Kopijuoti viską</button><button id="dr-clear">Išvalyti</button>` : ""}<button id="dr-new">+ Naujas</button><button id="dr-close">Uždaryti</button></div>`);
    b.querySelectorAll(".dr-x").forEach(x => x.onclick = () => { const l2 = load(); l2.splice(+x.dataset.i, 1); save(l2); label(); list(); });
    b.querySelector("#dr-close").onclick = close;
    b.querySelector("#dr-new").onclick = () => { picked = ""; form(); };
    const copy = b.querySelector("#dr-copy");
    if (copy) copy.onclick = async () => {
      try { await navigator.clipboard.writeText(asText()); copy.textContent = "Nukopijuota ✓"; }
      catch { const t = document.createElement("textarea"); t.value = asText(); document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); copy.textContent = "Nukopijuota ✓"; }
    };
    const clear = b.querySelector("#dr-clear");
    if (clear) clear.onclick = () => { if (confirm("Ištrinti visus pranešimus?")) { save([]); label(); list(); } };
  }

  btn.addEventListener("click", () => { if (!viaMouse) picked = String(getSelection()).replace(/\u00AD/g, "").trim(); viaMouse = false; form(); });
  document.addEventListener("keydown", ev => { if (ev.key === "Escape") close(); });
})();
