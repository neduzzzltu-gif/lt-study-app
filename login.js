// Login panel on index.html: email + password via Supabase (same client as auth.js).
// Modes: login / signup / forgot / newpass (after the reset link) / in (already logged in).
// No Supabase config yet (auth-config.js empty) = the form says so; "Tęsti be paskyros" still works.
(() => {
  const $ = id => document.getElementById(id);
  const form = $("lForm"), msg = $("lMsg"), btn = $("lBtn"), email = form.email, pass = form.password, nameIn = form.fullname;
  const sb = window.sbAuth;
  // read now: Supabase strips the #…type=recovery hash once it has handled the reset link
  const recovering = /type=recovery/.test(location.hash);
  const TEXT = {
    login:   ["Prisijunk", "Tavo klaidos išsisaugos ir bus matomos bet kuriame įrenginyje.", "Prisijungti"],
    signup:  ["Sukurk paskyrą", "Vardas, el. paštas ir slaptažodis (bent 6 simboliai).", "Registruotis"],
    forgot:  ["Pamiršai slaptažodį?", "Įrašyk el. paštą – atsiųsime nuorodą naujam slaptažodžiui.", "Siųsti nuorodą"],
    newpass: ["Naujas slaptažodis", "Įrašyk naują slaptažodį (bent 6 simboliai).", "Išsaugoti"],
    in:      ["Esi prisijungęs", "", "Tęsti"]
  };
  let mode = "login";

  const say = (t, kind = "") => { msg.textContent = t; msg.className = "lmsg " + kind; };
  function setMode(m, who) {
    mode = m;
    const [title, sub, label] = TEXT[m];
    $("lTitle").textContent = title;
    $("lSub").textContent = m === "in" ? who : sub;
    btn.textContent = label;
    $("fName").hidden = m !== "signup";
    $("fEmail").hidden = m === "newpass" || m === "in";
    $("fPass").hidden = m === "forgot" || m === "in";
    pass.autocomplete = m === "login" ? "current-password" : "new-password";
    $("toSignup").hidden = m !== "login";
    $("toForgot").hidden = m !== "login";
    $("toLogin").hidden = !["signup", "forgot"].includes(m);
    $("logout").hidden = m !== "in";
    $("lSkip").hidden = m === "in";
    say("");
  }
  $("toSignup").onclick = () => { setMode("signup"); nameIn.focus(); };
  $("toForgot").onclick = () => { setMode("forgot"); email.focus(); };
  $("toLogin").onclick = () => { setMode("login"); email.focus(); };
  $("logout").onclick = () => sb?.auth.signOut();

  const ERR = {
    "Invalid login credentials": "Neteisingas el. paštas arba slaptažodis.",
    "Email not confirmed": "Pirma patvirtink el. paštą – nuoroda išsiųsta laiške.",
    "User already registered": "Toks el. paštas jau užregistruotas. Prisijunk.",
  };
  const human = e => ERR[e?.message] || (/rate limit/i.test(e?.message) ? "Per daug bandymų. Pabandyk po kelių minučių." : "Nepavyko. Pabandyk dar kartą.");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    if (mode === "in") return location.replace("app.html");
    if (!sb) return say("Prisijungimas dar neįjungtas. Kol kas spausk „Tęsti be paskyros“.", "bad");
    const em = email.value.trim(), pw = pass.value, nm = nameIn.value.trim().replace(/\s+/g, " ");
    if (mode === "signup" && nm.length < 2) { nameIn.focus(); return say("Įrašyk savo vardą.", "bad"); }
    if (mode !== "newpass" && !/^\S+@\S+\.\S+$/.test(em)) { email.focus(); return say("Įrašyk el. pašto adresą.", "bad"); }
    if (mode !== "forgot" && pw.length < 6) { pass.focus(); return say("Slaptažodis turi būti bent 6 simbolių.", "bad"); }
    btn.setAttribute("aria-busy", "true");
    const back = location.origin + location.pathname.replace(/[^/]*$/, "");
    let r;
    try {
      if (mode === "login") r = await sb.auth.signInWithPassword({ email: em, password: pw });
      else if (mode === "signup") r = await sb.auth.signUp({ email: em, password: pw, options: { emailRedirectTo: back + "app.html", data: { full_name: nm } } });
      else if (mode === "forgot") r = await sb.auth.resetPasswordForEmail(em, { redirectTo: back + "index.html" });
      else r = await sb.auth.updateUser({ password: pw });
    } catch (err) { r = { error: err }; }
    btn.removeAttribute("aria-busy");
    if (r.error) return say(human(r.error), "bad");
    if (mode === "login" || mode === "newpass") return location.replace("app.html");
    // email confirmation on: an existing address comes back without error but with no identities
    if (mode === "signup" && r.data?.user?.identities?.length === 0) return say(ERR["User already registered"], "bad");
    if (mode === "signup") return r.data?.session ? location.replace("app.html") : say("Patikrink el. paštą – atsiuntėme patvirtinimo nuorodą.", "ok");
    say("Jei šis el. paštas užregistruotas, nuoroda jau išsiųsta.", "ok");
  });

  if (!sb) return;
  sb.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY") return setMode("newpass");
    if (mode === "newpass") return;
    // already logged in = no login page: straight to the app (only logging out brings you back here)
    if (session?.user && !recovering) location.replace("app.html");
  });
})();
