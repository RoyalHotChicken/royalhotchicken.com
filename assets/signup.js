// Supernova Club signup -> Royal Hot back office (POST /signup).
document.querySelectorAll("form.signup").forEach(function (f) {
  f.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var s = f.querySelector(".status"), b = f.querySelector("button");
    var data = { name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
                 consent: f.consent.checked, website: f.website.value, where: f.dataset.where || "site" };
    if (!data.name) { s.textContent = "Add your name."; return; }
    if (!data.email && !data.phone) { s.textContent = "Add an email or a mobile number so we can reach you."; return; }
    if (!data.consent) { s.textContent = "Check the box to join."; return; }
    b.disabled = true; s.textContent = "Joining…";
    fetch(f.dataset.api + "/signup", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) {
        if (!x.ok) { s.textContent = x.j.error || "That didn't go through. Try again."; return; }
        f.reset();
        s.textContent = x.j.already ? "You're already in the Supernova Club. See you at the window." : "You're in the Supernova Club. Watch for your grand-opening free food.";
      })
      .catch(function () { s.textContent = "That didn't go through. Check your connection and try again."; })
      .finally(function () { b.disabled = false; });
  });
});
