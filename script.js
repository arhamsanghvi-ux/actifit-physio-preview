(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // Booking helper: builds WhatsApp / email text locally. Nothing is sent or stored by this site.
  var form = document.getElementById("book-form");
  var wa = document.getElementById("book-wa");
  var mail = document.getElementById("book-mail");
  if (!form || !wa || !mail) return;
  var PHONE = "919888033456";
  var EMAIL = "actifitphysio@gmail.com";
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function update() {
    var lines = ["Hi ActiFit, I'd like to book a physiotherapy appointment."];
    if (val("f-name")) lines.push("Name: " + val("f-name"));
    if (val("f-concern")) lines.push("Concern: " + val("f-concern"));
    if (val("f-time")) lines.push("Preferred day/time: " + val("f-time"));
    var msg = lines.join("\n");
    wa.href = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);
    mail.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Appointment request") + "&body=" + encodeURIComponent(msg);
  }
  form.addEventListener("input", update);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  update();
})();
