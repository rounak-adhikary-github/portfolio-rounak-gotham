/* ============================================================
   Rounak Adhikary — dark knight portfolio behaviour
   ------------------------------------------------------------
   Progressive enhancement: with JavaScript off the page still reads,
   every link still works and the résumé still downloads. Nothing is
   fetched from a third party; the only storage used is this browser's
   localStorage, and only for the two display toggles.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = !!window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  };

  /* ---------------- footer year ---------------- */
  var yearEl = $("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------------- live Kolkata clock ---------------- */
  var clockEl = $("statusClock");
  if (clockEl) {
    var tick = function () {
      try {
        clockEl.textContent = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        }).format(new Date());
      } catch (err) {
        clockEl.textContent = new Date().toLocaleTimeString();
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------------- rotating focus ---------------- */
  var typed = $("typedRole");
  if (typed) {
    var words = ["Core Java", "Spring Boot", "REST APIs", "Microservices", "JAX-RS · JPA", "Migrations", "AI-assisted dev"];
    if (reduceMotion) {
      typed.textContent = words[0];
    } else {
      var w = 0, c = 0, deleting = false;
      (function loop() {
        var word = words[w];
        typed.textContent = word.slice(0, c);
        if (!deleting && c < word.length) { c++; setTimeout(loop, 62); }
        else if (!deleting && c === word.length) { deleting = true; setTimeout(loop, 1500); }
        else if (deleting && c > 0) { c--; setTimeout(loop, 28); }
        else { deleting = false; w = (w + 1) % words.length; setTimeout(loop, 220); }
      })();
    }
  }

  /* ---------------- reading progress ---------------- */
  var fill = $("progressFill");
  if (fill) {
    var paint = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      fill.style.width = Math.max(0, Math.min(100, pct)).toFixed(2) + "%";
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
  }

  /* ---------------- case files slide in ---------------- */
  var panels = Array.prototype.slice.call(document.querySelectorAll(".panel"));
  if (!("IntersectionObserver" in window) || reduceMotion) {
    panels.forEach(function (el) { el.classList.add("in"); });
  } else {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        seen.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    panels.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min((i % 6) * 45, 220) + "ms";
      seen.observe(el);
    });
  }

  /* ---------------- current section tab ---------------- */
  var tabLinks = Array.prototype.slice.call(document.querySelectorAll(".tabs a"));
  var sections = tabLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var mark = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        tabLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { mark.observe(s); });
  }

  /* ---------------- evidence counters ---------------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
  var runCounter = function (el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = null, ms = 900;
    var step = function (now) {
      if (start === null) start = now;
      var t = Math.min(1, (now - start) / ms);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + (t === 1 ? suffix : "");
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
  } else {
    var counted = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCounter(e.target);
        counted.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counted.observe(el); });
  }

  /* ---------------- filter chips (arsenal + side cases) ----------------
     One routine drives every .filters bar: the bar names the grid it controls
     in data-target, and each card in that grid carries a data-cat. */
  Array.prototype.slice.call(document.querySelectorAll(".filters[data-target]")).forEach(function (bar) {
    var target = document.querySelector(bar.getAttribute("data-target"));
    if (!target) return;

    var chips = Array.prototype.slice.call(bar.querySelectorAll(".chip[data-filter]"));
    var cards = Array.prototype.slice.call(target.querySelectorAll("[data-cat]"));
    if (!chips.length || !cards.length) return;

    var apply = function (want) {
      cards.forEach(function (card) {
        var show = want === "all" || card.getAttribute("data-cat") === want;
        card.classList.toggle("is-hidden", !show);
        // a card that was display:none at load never reached the reveal
        // observer, so un-hiding it has to reveal it here as well
        if (show) card.classList.add("in");
      });
      chips.forEach(function (b) {
        var on = b.getAttribute("data-filter") === want;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    };

    chips.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); });
    });
  });

  /* ---------------- status toast ---------------- */
  var toast = document.createElement("p");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var toastTimer = null;
  var say = function (msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 2800);
  };

  /* ---------------- the searchlight follows the pointer ---------------- */
  var spot = $("spotlight");
  if (spot && finePointer && !reduceMotion) {
    var moveSpot = function (e) {
      spot.style.setProperty("--x", e.clientX + "px");
      spot.style.setProperty("--y", e.clientY + "px");
    };
    window.addEventListener("pointermove", moveSpot, { passive: true });
    // only switch the light on once the pointer is actually inside the page
    window.addEventListener("pointerenter", function () { document.body.classList.add("signal-on"); });
    document.body.classList.add("signal-on");
  }

  /* ---------------- rain toggle ---------------- */
  var rainBtn = $("rainToggle");
  if (rainBtn) {
    var setRain = function (on) {
      document.body.classList.toggle("rain-off", !on);
      rainBtn.setAttribute("aria-pressed", on ? "true" : "false");
    };
    setRain(store.get("ra-rain") !== "off");
    rainBtn.addEventListener("click", function () {
      var on = document.body.classList.contains("rain-off");   // was off -> turn it on
      setRain(on);
      store.set("ra-rain", on ? "on" : "off");
      say(on ? "Rain on — the city never dries" : "Rain off — clear night");
    });
  }

  /* ---------------- detective mode ---------------- */
  var detBtn = $("detectiveToggle");
  if (detBtn) {
    var setDetective = function (on) {
      document.body.classList.toggle("detective", on);
      detBtn.setAttribute("aria-pressed", on ? "true" : "false");
    };
    setDetective(store.get("ra-detective") === "on");
    detBtn.addEventListener("click", function () {
      var on = !document.body.classList.contains("detective");
      setDetective(on);
      store.set("ra-detective", on ? "on" : "off");
      say(on ? "Detective mode — everything reads amber" : "Back to the night");
      flare();
    });
  }

  /* ---------------- the signal flare (used for feedback and the cipher) -------- */
  var flaring = false;
  function flare() {
    if (reduceMotion || flaring) return;
    flaring = true;
    document.body.classList.add("signal-flare");
    setTimeout(function () {
      document.body.classList.remove("signal-flare");
      flaring = false;
    }, 720);
  }

  /* ---------------- the cipher: type the word and the signal answers ---------- */
  (function () {
    var WORD = "gotham";
    var at = 0;
    var cipher = $("cipher");
    var found = store.get("ra-cipher") === "found";

    var reveal = function () {
      if (cipher) {
        cipher.hidden = false;
        cipher.setAttribute("tabindex", "-1");
        cipher.focus({ preventScroll: false });
      }
      say("★ The signal answered. Welcome to the inner file.");
      flare();
      if (!reduceMotion) {
        var stage = document.querySelector("main") || document.body;
        stage.classList.add("shake");
        setTimeout(function () { stage.classList.remove("shake"); }, 500);
      }
      store.set("ra-cipher", "found");
      found = true;
    };

    var konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var kat = 0;

    document.addEventListener("keydown", function (e) {
      // never swallow keys while someone is typing a message
      var tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      // the word
      if (key === WORD[at]) {
        at++;
        if (at === WORD.length) { at = 0; reveal(); }
      } else {
        at = key === WORD[0] ? 1 : 0;
      }

      // and the old arrow sequence, for anyone who still tries it
      if (key === konami[kat]) {
        kat++;
        if (kat === konami.length) { kat = 0; reveal(); }
      } else {
        kat = key === konami[0] ? 1 : 0;
      }
    });

    // someone who already found it should still see it, without the fanfare
    if (found && cipher) cipher.hidden = false;
  })();

  /* ---------------- copy email ---------------- */
  var EMAIL = "write2r.adhikary@gmail.com";
  var copyBtn = $("copyMail");
  var note = $("formNote");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var announce = function (msg) {
        if (note) note.textContent = msg;
        say(msg);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(EMAIL).then(function () {
          announce("Copied — " + EMAIL);
        }, function () { announce(EMAIL); });
      } else {
        announce(EMAIL);
      }
    });
  }

  /* ---------------- contact form -> mail client ---------------- */
  var form = $("contactForm");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = ($("cName") || {}).value || "";
      var from = ($("cEmail") || {}).value || "";
      var msg = ($("cMsg") || {}).value || "";
      var live = $("formNote");

      if (!name.trim() || !from.trim() || !msg.trim()) {
        if (live) live.textContent = "Please fill in your name, email and a message.";
        say("Please fill in every field.");
        var firstEmpty = [!name.trim() && $("cName"), !from.trim() && $("cEmail"), !msg.trim() && $("cMsg")]
          .filter(Boolean)[0];
        if (firstEmpty) firstEmpty.focus();
        return;
      }

      var subject = "Portfolio enquiry from " + name;
      var body = msg + "\n\n—\n" + name + "\n" + from;
      window.location.href = "mailto:" + EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      if (live) live.textContent = "Opening your mail app…";
      say("Opening your mail app…");
    });
  }

  /* ---------------- case intake counter (cosmetic, this browser only) --------- */
  var hits = $("hitCount");
  if (hits) {
    var KEY = "ra-intake";
    var n = parseInt(store.get(KEY) || "0", 10) || 0;
    n += 1;
    store.set(KEY, String(n));
    hits.textContent = String(100000 + n).padStart(6, "0");
  }
})();
