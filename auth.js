// Optional Google login (Supabase). Logged in = mistakes sync between devices; logged out = only this browser.
// Needs auth-config.js and supabase-js loaded first. Pages with #authSlot get the button.
(() => {
  const cfg = window.AUTH_CONFIG;
  if (!cfg?.url || !cfg?.anonKey || !window.supabase) return;
  // keepalive so the last save still goes out when the page is closed
  const sb = supabase.createClient(cfg.url, cfg.anonKey, { global: { fetch: (u, o) => fetch(u, { ...o, keepalive: true }) } });
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
    if (sig(out) !== sig(local)) location.reload();
  }

  const slot = document.getElementById("authSlot");
  const esc = s => String(s).replace(/[&<>"']/g, c => `&#${c.charCodeAt(0)};`);
  const G = `<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>`;
  function render() {
    if (!slot) return;
    slot.parentElement.classList.add("has-auth");
    if (!user) {
      slot.innerHTML = `<button class="pill light auth-btn" type="button" aria-label="Prisijungti su Google">${G}<span>Prisijungti su Google</span></button>`;
      slot.firstChild.onclick = () => sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } });
      return;
    }
    const m = user.user_metadata || {}, name = m.full_name || user.email || "?";
    const pic = m.avatar_url ? `<img src="${esc(m.avatar_url)}" alt="" referrerpolicy="no-referrer">` : `<i>${esc(name[0].toUpperCase())}</i>`;
    slot.innerHTML = `<details class="auth-me"><summary title="${esc(user.email)}">${pic}<span>${esc(name.split(" ")[0])}</span></summary>` +
      `<div><small>${esc(user.email)}</small><p>Klaidos sinchronizuojamos tarp įrenginių.</p><button type="button">Atsijungti</button></div></details>`;
    slot.querySelector("button").onclick = async () => { clearTimeout(timer); await push(); sb.auth.signOut(); };
  }
  // close the account menu on a click outside it
  document.addEventListener("click", e => { const d = slot?.querySelector(".auth-me[open]"); if (d && !d.contains(e.target)) d.open = false; });

  sb.auth.onAuthStateChange((event, session) => {
    const was = user?.id;
    user = session?.user || null;
    render();
    // not inside the callback: Supabase calls here can deadlock the auth lock
    if (user && user.id !== was) setTimeout(pull, 0);
  });
})();
