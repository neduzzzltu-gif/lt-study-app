// Optional login (Supabase, email + password on index.html). Logged in = mistakes sync between devices; logged out = only this browser.
// Needs auth-config.js and supabase-js loaded first. Pages with #authSlot get the button.
(() => {
  const cfg = window.AUTH_CONFIG;
  if (!cfg?.url || !cfg?.anonKey || !window.supabase) return;
  // keepalive so the last save still goes out when the page is closed
  const sb = supabase.createClient(cfg.url, cfg.anonKey, { global: { fetch: (u, o) => fetch(u, { ...o, keepalive: true }) } });
  window.sbAuth = sb; // login.js (index.html) uses the same client
  const KEYS = ["rasyba-mistakes", "rasyba-fixed", "skyryba-mistakes", "skyryba-fixed", "pratimai-mistakes"];
  const DIRTY = "sync-dirty", OWNER = "sync-owner";
  const read = k => { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch { return {}; } };
  const snapshot = () => Object.fromEntries(KEYS.map(k => [k, read(k)]));
  const sig = o => KEYS.map(k => Object.keys(o[k] || {}).sort().join()).join("|");
  let user = null, timer = null;

  async function push() {
    timer = null;
    if (!user) return;
    const { error } = await sb.from("progress").upsert({ user_id: user.id, data: snapshot(), updated_at: new Date().toISOString() });
    if (!error) localStorage.removeItem(DIRTY);
  }
  // data.js / skyryba-data.js call this after every save
  window.onProgressSaved = () => { localStorage.setItem(DIRTY, "1"); clearTimeout(timer); timer = setTimeout(push, 800); };
  addEventListener("pagehide", () => { if (timer) { clearTimeout(timer); push(); } });

  // First login in this browser: join both sides. Unsaved local changes: this browser wins. Otherwise: the account wins.
  async function pull() {
    const { data, error } = await sb.from("progress").select("data").eq("user_id", user.id).maybeSingle();
    if (error) return;
    const cloud = data?.data, local = snapshot(), owner = localStorage.getItem(OWNER);
    let out;
    if (owner !== user.id) {
      // never logged in here = keep this browser's mistakes too; another account's leftovers = drop them
      out = {};
      for (const k of KEYS) out[k] = owner ? { ...(cloud?.[k] || {}) } : { ...(cloud?.[k] || {}), ...local[k] };
      for (const [m, f] of [["rasyba-mistakes", "rasyba-fixed"], ["skyryba-mistakes", "skyryba-fixed"]])
        for (const id in out[m]) if (out[f][id]) (owner || !(id in local[f]) || id in local[m]) ? delete out[f][id] : delete out[m][id];
      localStorage.setItem(OWNER, user.id);
    } else if (localStorage.getItem(DIRTY) || !cloud) {
      return push();
    } else out = cloud;
    KEYS.forEach(k => localStorage.setItem(k, JSON.stringify(out[k] || {})));
    await push();
    // not on the login page: a reload there would drop a password-reset link before login.js reads it
    if (sig(out) !== sig(local) && !document.getElementById("lForm")) location.reload();
  }

  const slot = document.getElementById("authSlot");
  const esc = s => String(s).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
  function render() {
    if (!slot) return;
    slot.parentElement.classList.add("has-auth");
    if (!user) {
      slot.innerHTML = `<a class="pill light auth-btn" href="index.html">Prisijungti</a>`;
      return;
    }
    const m = user.user_metadata || {}, name = m.full_name || user.email || "?";
    const pic = m.avatar_url ? `<img src="${esc(m.avatar_url)}" alt="" referrerpolicy="no-referrer">` : `<i>${esc(name[0].toUpperCase())}</i>`;
    slot.innerHTML = `<details class="auth-me"><summary title="${esc(user.email)}">${pic}<span>${esc(name.split(" ")[0])}</span></summary>` +
      `<div><small>${esc(user.email)}</small><p>Klaidos sinchronizuojamos tarp įrenginių.</p><button type="button">Atsijungti</button></div></details>`;
    // the only way back to the start page: log out from the profile menu (replace = Back can't return here)
    slot.querySelector("button").onclick = async () => { clearTimeout(timer); await push(); await sb.auth.signOut({ scope: "local" }); location.replace("index.html"); };
  }
  // ⚙ menu "Profilis" (shell.js #sprof): logged in = change name (it's the "Labas, …!" greeting), reset password by email
  function renderProfile() {
    const box = document.getElementById("sprof");
    if (!box) return;
    if (!user) { box.innerHTML = `<p>Prisijunk, kad galėtum keisti profilį.</p><a href="index.html">Prisijungti</a>`; return; }
    const name = user.user_metadata?.full_name || "";
    box.innerHTML = `<small>${esc(user.email)}</small>` +
      `<form><label for="spName">Vardas</label><div><input id="spName" name="n" value="${esc(name)}" autocomplete="given-name" maxlength="60"><button type="submit">Išsaugoti</button></div></form>` +
      `<button type="button" class="sp-pass">Keisti slaptažodį</button><p class="sp-msg" role="status"></p>`;
    const msg = box.querySelector(".sp-msg"), say = (t, ok) => { msg.textContent = t; msg.classList.toggle("bad", !ok); };
    box.querySelector("form").onsubmit = async e => {
      e.preventDefault();
      const nm = e.target.n.value.trim().replace(/\s+/g, " "), b = e.target.querySelector("button");
      if (nm.length < 2) return say("Įrašyk savo vardą.", false);
      if (b.ariaDisabled === "true") return;
      b.ariaDisabled = "true"; // not .disabled: that would drop keyboard focus
      const { error } = await sb.auth.updateUser({ data: { full_name: nm } });
      b.ariaDisabled = null;
      say(error ? "Nepavyko. Pabandyk dar kartą." : "Išsaugota.", !error);
    };
    // same flow as "Pamiršai slaptažodį?" on index.html: the email link opens the new-password form there
    box.querySelector(".sp-pass").onclick = async e => {
      const b = e.currentTarget;
      if (b.ariaDisabled === "true") return;
      b.ariaDisabled = "true";
      const back = location.origin + location.pathname.replace(/[^/]*$/, "");
      const { error } = await sb.auth.resetPasswordForEmail(user.email, { redirectTo: back + "index.html" });
      b.ariaDisabled = null;
      say(error ? (/rate limit/i.test(error.message) ? "Per daug bandymų. Pabandyk po kelių minučių." : "Nepavyko. Pabandyk dar kartą.") : "Nuoroda išsiųsta į " + user.email + ".", !error);
    };
  }

  // close the account menu on a click outside it
  document.addEventListener("click", e => { const d = slot?.querySelector(".auth-me[open]"); if (d && !d.contains(e.target)) d.open = false; });

  // "Labas, Nedai!" on app.html: first name from sign-up (or Google), put into the vocative (šauksmininkas)
  const vocative = n => n.replace(/us$/, "au").replace(/jas$/, "jau").replace(/as$/, "ai").replace(/ys$/, "y").replace(/is$/, "i").replace(/ė$/, "e");
  function greet() {
    const h = document.getElementById("hello"); if (!h) return;
    const first = (user?.user_metadata?.full_name || "").trim().split(/\s+/)[0];
    h.textContent = first ? `Labas, ${vocative(first[0].toUpperCase() + first.slice(1).toLowerCase())}!` : "Labas!";
  }
  sb.auth.onAuthStateChange((event, session) => {
    const was = user?.id;
    user = session?.user || null;
    render();
    if (user?.id !== was) renderProfile(); // not on every event: a token refresh would wipe a half-typed name
    greet();
    // not inside the callback: Supabase calls here can deadlock the auth lock
    if (user && user.id !== was) setTimeout(pull, 0);
  });
  // Back after logging out can bring an app page out of the browser cache with the old profile menu: reload it
  addEventListener("pageshow", e => { if (e.persisted) location.reload(); });
})();
