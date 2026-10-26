// AI check for nuotrauka.html: sends the photo to your API, gets the mistakes back.
// To connect it, put your API address in PHOTO_AI_URL. Until then the page says the check isn't connected.
//
// What the API gets:  POST, multipart form, field "photo" = JPEG (max 1600px on the long side, about 1 MB at most)
//   + header "Authorization: Bearer <token>" when the user is logged in (Supabase session token)
// What it must return: JSON { "mistakes": [ { "wrong": "...", "right": "...", "why": "..." } ] }
//   plain Lithuanian text: wrong = the word/part as written, right = the correct version, why = short rule (optional)
//   no mistakes = { "mistakes": [] }; an error = any non-2xx status (the body is ignored)
//   answer within 60 s, or the page gives up
//
// Rules for the API itself:
// - Never put the AI key in this file: everyone can read it. The key lives only on the API's server.
// - Check the Bearer token with Supabase and limit requests per user, or anyone can use up your AI credits.
// - CORS: answer with "Access-Control-Allow-Origin: <this site's address>", and answer the OPTIONS
//   request with "Access-Control-Allow-Headers: Authorization" and "Access-Control-Allow-Methods: POST".
const PHOTO_AI_URL = "";

// Big phone photos are 4–12 MB: shrink before sending (faster, cheaper for the API)
function shrinkPhoto(file, max = 1600) {
  return new Promise((ok, fail) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h));
      const c = document.createElement("canvas");
      c.width = Math.round(w * k); c.height = Math.round(h * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : fail(new Error("shrink")), "image/jpeg", 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); fail(new Error("image")); };
    img.src = url;
  });
}

// null = not connected yet; otherwise resolves to [{ wrong, right, why }]
window.checkPhoto = !PHOTO_AI_URL ? null : async file => {
  const form = new FormData();
  form.append("photo", await shrinkPhoto(file), "photo.jpg");
  const token = (await window.sbAuth?.auth.getSession())?.data?.session?.access_token;
  const res = await fetch(PHOTO_AI_URL, {
    method: "POST", body: form, signal: AbortSignal.timeout(60000),
    headers: token ? { Authorization: "Bearer " + token } : {},
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  const data = await res.json();
  // skip broken items instead of showing "undefined"
  return Array.isArray(data?.mistakes) ? data.mistakes.filter(m => m && typeof m.wrong === "string" && typeof m.right === "string") : [];
};
