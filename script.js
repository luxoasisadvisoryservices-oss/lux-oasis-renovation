/* GENERATED FILE — do not edit directly. Edit the files in partials/ styles/ scripts/ then run: python3 build.py */
/* ============================================================
   LUX OASIS INTERIORS & RENOVATION — vanilla JS, no dependencies.
   Forms/CTAs have no backend: every contact flow opens a prefilled
   wa.me or mailto: link (see the HTML).
   ============================================================ */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sticky header gains a hairline on scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- scroll-reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ============================================================
     RENOVATION PAYBACK ESTIMATOR
     Every figure below is arithmetic on the numbers the visitor types.
     It is not a forecast and it is not financial advice — the wording
     on the page says so, and this comment is here so nobody later
     mistakes it for a model of anything.

       nights per month        = 30.4 x occupancy
       additional revenue /mo  = (rate after - rate now) x nights
       additional revenue /yr  = additional revenue /mo x 12
       payback (months)        = renovation budget / additional revenue /mo
       five-year uplift        = additional revenue /mo x 60 - budget
       net income /mo after    = rate after x nights - operating costs

     Operating costs are assumed unchanged by the renovation, so they
     move the "net income" line only — never the uplift or the payback.
     ============================================================ */
  var estFields = [
    { num: "est-budget",   range: "est-budget-r",   min: 0,  max: 1000000, def: 180000 },
    { num: "est-adr-now",  range: "est-adr-now-r",  min: 0,  max: 5000,    def: 480 },
    { num: "est-adr-new",  range: "est-adr-new-r",  min: 0,  max: 5000,    def: 640 },
    { num: "est-occ",      range: "est-occ-r",      min: 5,  max: 100,     def: 72 },
    { num: "est-opex",     range: "est-opex-r",     min: 0,  max: 60000,   def: 4500 }
  ];
  var estOut = {
    month:   document.getElementById("est-out-month"),
    year:    document.getElementById("est-out-year"),
    payback: document.getElementById("est-out-payback"),
    five:    document.getElementById("est-out-five"),
    net:     document.getElementById("est-out-net")
  };
  var estNote = document.getElementById("est-note");
  var estNights = document.getElementById("est-nights");
  var estTweens = {};

  function estRead(id, fallback) {
    var el = document.getElementById(id);
    var v = parseFloat(el && el.value);
    return isNaN(v) ? fallback : v;
  }
  function estFmt(v) {
    return Math.round(v).toLocaleString("en-US");
  }
  function estSet(el, key, value, formatter) {
    if (!el) return;
    if (estTweens[key]) cancelAnimationFrame(estTweens[key].raf);
    var from = estTweens[key] ? estTweens[key].value : 0;
    if (prefersReducedMotion) {
      el.textContent = formatter(value);
      estTweens[key] = { value: value, raf: 0 };
      return;
    }
    var t0 = performance.now(), dur = 460;
    function step(now) {
      var t = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - t, 3);
      var v = from + (value - from) * e;
      el.textContent = formatter(v);
      estTweens[key].value = v;
      if (t < 1) estTweens[key].raf = requestAnimationFrame(step);
      else estTweens[key].value = value;
    }
    estTweens[key] = { value: from, raf: requestAnimationFrame(step) };
  }

  function estCompute() {
    var budget = Math.max(0, estRead("est-budget", 180000));
    var adrNow = Math.max(0, estRead("est-adr-now", 480));
    var adrNew = Math.max(0, estRead("est-adr-new", 640));
    var occ = Math.min(100, Math.max(0, estRead("est-occ", 72))) / 100;
    var opex = Math.max(0, estRead("est-opex", 4500));

    var nights = 30.4 * occ;
    var month = (adrNew - adrNow) * nights;
    var year = month * 12;
    var five = month * 60 - budget;
    var net = adrNew * nights - opex;
    var payback = month > 0 ? budget / month : null;

    if (estNights) estNights.textContent = nights.toFixed(1);

    estSet(estOut.month, "month", month, function (v) { return estFmt(v); });
    estSet(estOut.year, "year", year, function (v) { return estFmt(v); });
    estSet(estOut.five, "five", five, function (v) { return estFmt(v); });
    estSet(estOut.net, "net", net, function (v) { return estFmt(v); });

    if (estOut.payback) {
      if (payback === null) {
        if (estTweens.payback) cancelAnimationFrame(estTweens.payback.raf);
        estTweens.payback = { value: 0, raf: 0 };
        estOut.payback.textContent = "—";
      } else {
        estSet(estOut.payback, "payback", payback, function (v) { return v.toFixed(1); });
      }
    }
    if (estNote) {
      estNote.textContent = payback === null
        ? "At these numbers the nightly rate does not rise, so there is nothing to pay back. Raise the rate after renovation to see an estimate."
        : (payback > 120
          ? "At these numbers the payback runs past ten years. Worth a conversation about scope before committing."
          : "Estimate only — built entirely from the five numbers above.");
      estNote.classList.toggle("is-warn", payback === null || payback > 120);
    }
  }

  if (estOut.month) {
    estFields.forEach(function (f) {
      var num = document.getElementById(f.num);
      var range = document.getElementById(f.range);
      function sync(src, dst) {
        return function () {
          var v = parseFloat(src.value);
          if (isNaN(v)) return;
          v = Math.min(f.max, Math.max(f.min, v));
          if (dst && dst.value !== String(v)) dst.value = v;
          estCompute();
        };
      }
      if (num) { num.addEventListener("input", sync(num, range)); num.addEventListener("change", sync(num, range)); }
      if (range) range.addEventListener("input", sync(range, num));
    });
    estCompute();
  }

  /* ---------- before / after drag slider ----------
     The range input is the real control (so it works with a keyboard and
     with screen readers). Dragging anywhere on the image just writes to it. */
  var baWrap = document.querySelector(".ba");
  if (baWrap) {
    var baRange = baWrap.querySelector(".ba-range");
    var baFig = baWrap.querySelector(".ba-figure");
    function baPaint() {
      baWrap.style.setProperty("--ba", baRange.value + "%");
      baWrap.setAttribute("data-pos", baRange.value);
    }
    baRange.addEventListener("input", baPaint);
    function baFromPointer(e) {
      var r = baFig.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      baRange.value = Math.round(Math.min(100, Math.max(0, (x / r.width) * 100)));
      baPaint();
    }
    var baDragging = false;
    baFig.addEventListener("pointerdown", function (e) {
      baDragging = true; baFig.setPointerCapture(e.pointerId); baFromPointer(e);
    });
    baFig.addEventListener("pointermove", function (e) { if (baDragging) baFromPointer(e); });
    baFig.addEventListener("pointerup", function () { baDragging = false; });
    baFig.addEventListener("pointercancel", function () { baDragging = false; });
    baPaint();
  }

  /* ---------- real projects: YouTube lite-embed facades ----------
     Authored as plain links to the watch pages (the no-JS state). With JS
     each link is swapped for a real <button>, so activation is keyboard-
     native, and the YouTube iframe is only created when the visitor asks
     for it — nothing from YouTube loads before that click. */
  var rpFrames = document.querySelectorAll(".rp-frame");
  Array.prototype.forEach.call(rpFrames, function (frame) {
    var link = frame.querySelector("a.rp-facade");
    var id = frame.getAttribute("data-video-id");
    if (!link || !id) return;
    var title = frame.getAttribute("data-video-title") || "Project video";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "rp-facade";
    btn.setAttribute("aria-label", "Play video: " + title);
    btn.innerHTML = link.innerHTML;
    link.parentNode.replaceChild(btn, link);

    btn.addEventListener("click", function () {
      if (frame.classList.contains("is-playing")) return;
      var iframe = document.createElement("iframe");
      iframe.className = "rp-iframe";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1";
      iframe.title = title;
      iframe.setAttribute("allow", "autoplay; encrypted-media");
      iframe.setAttribute("allowfullscreen", "");
      frame.appendChild(iframe);
      frame.classList.add("is-playing");
      iframe.focus();
    });
  });
})();

/* ============================================================
   MOTION ENGINE — scroll choreography.
   One rAF loop, scroll position read once per frame, every animation
   driven through transform / opacity / attribute writes only.

   Two engines, one set of visual states:

     sceneMode  (>= 768px)  the pinned, scroll-scrubbed scenes. A tall
                block, a sticky inner frame, progress read from scrollY.
     stepsMode  (<  768px)  the same states played on a short timer from
                the moment a scene arrives (scripts/80-mobile-scenes.js).
                Reading position selects the scene; time plays it.

   Scrubbing is deliberately NOT enabled on a phone: a sticky frame
   fights the browser chrome collapsing mid-gesture, and a pinned scene
   means several swipes produce no page movement, which reads as broken.

   With reduced motion, or with JS off, neither runs and the page renders
   its finished, fully readable static state.

   The mode is decided once at load — and identically in the inline
   script in partials/00-head.html, so the state classes are on the
   element before first paint. Resizing across 768px keeps the current
   mode until reload.
   ============================================================ */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var sceneMode = !reduced && window.innerWidth >= 768 && "requestAnimationFrame" in window;
  /* the phone engine needs IntersectionObserver; without it the page simply
     keeps its static final states, which are complete and readable */
  var stepsMode = !reduced && window.innerWidth < 768 &&
                  "requestAnimationFrame" in window && "IntersectionObserver" in window;

  function clamp01(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function band(p, start, width) { return clamp01((p - start) / width); }

  /* ---------------- hero: the sheet sets itself up ---------------- */
  var heroEl = document.querySelector(".hero");
  function heroIntro() {
    if (!heroEl) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { heroEl.classList.add("is-ready"); });
    });
  }

  /* ============================================================
     FLAGSHIP SCENE — THE APARTMENT MODEL
     "From shell to guest-ready".

     Everything in the scene is a box measured in real metres:
       x  runs left→right across the plan   (0 → 12.00 m)
       y  runs top→bottom down the plan     (0 → 10.40 m, incl. terrace)
       z  is height above the floor slab    (0 → 2.90 m)

     Each box carries two colours:
       a = the technical / blueprint colour (early stages)
       b = the finished, guest-ready colour (final stage)
     The renderer cross-fades a→b and shades each face by orientation,
     so a change here needs no code change anywhere else.

     g = which build group the box belongs to:
       "w" walls (stage 2 — Lift)
       "f" fit-out (stage 3 — Fit out)
       "u" furniture (stage 4 — Furnish)
     o = its position in the stagger inside that group (0 = first in).

     NOTE: after editing this file, regenerate the static fallback drawing
     (partials/34-scene-geometry.html) — see README, "The apartment drawing".
     ============================================================ */

  var RM_PLAN = {
    /* overall */
    W: 12.0, D: 8.4, TD: 2.0, H: 2.9,

    /* rooms: floor finishes + labels. m2 is computed, never hand-typed. */
    rooms: [
      { id: "kitchen",  x1: 0.0,  y1: 0.0, x2: 4.2,  y2: 3.0,  name: "KITCHEN",        a: "#1E3252", b: "#E5DCCE", o: 1 },
      { id: "entry",    x1: 4.2,  y1: 0.0, x2: 6.6,  y2: 3.0,  name: "ENTRY",          a: "#1B2E4C", b: "#E1D7C8", o: 2 },
      { id: "living",   x1: 0.0,  y1: 3.0, x2: 6.6,  y2: 8.4,  name: "LIVING/DINING",  a: "#1E3252", b: "#E9E1D5", o: 0 },
      { id: "bath",     x1: 6.6,  y1: 0.0, x2: 9.6,  y2: 3.6,  name: "BATHROOM",       a: "#1B2E4C", b: "#DED5C8", o: 4 },
      { id: "dress",    x1: 9.6,  y1: 0.0, x2: 12.0, y2: 3.6,  name: "DRESSING",       a: "#1B2E4C", b: "#DFD6C7", o: 5 },
      { id: "bed",      x1: 6.6,  y1: 3.6, x2: 12.0, y2: 8.4,  name: "BEDROOM",        a: "#1E3252", b: "#E7DFD2", o: 3 },
      { id: "terrace",  x1: 0.0,  y1: 8.4, x2: 12.0, y2: 10.4, name: "TERRACE",        a: "#182742", b: "#C9AF8D", o: 6 }
    ],

    /* the slab the whole drawing sits on */
    slab: { x1: -0.34, y1: -0.34, x2: 12.34, y2: 10.74, z0: -0.28, z1: 0.0, a: "#101B2E", b: "#2B2320" },

    boxes: [
      /* ---------------- structure (group w) ---------------- */
      /* north wall, split by the entrance door opening */
      { id: "w-n-a",  x1: -0.12, y1: -0.12, x2: 4.80,  y2: 0.12,  z0: 0, z1: 2.9,  g: "w", o: 0, a: "#2C4370", b: "#DFD5C6" },
      { id: "w-n-b",  x1: 5.70,  y1: -0.12, x2: 12.12, y2: 0.12,  z0: 0, z1: 2.9,  g: "w", o: 0, a: "#2C4370", b: "#DFD5C6" },
      { id: "w-n-lin",x1: 4.80,  y1: -0.12, x2: 5.70,  y2: 0.12,  z0: 2.2, z1: 2.9, g: "w", o: 1, a: "#2C4370", b: "#DFD5C6" },
      /* east wall */
      { id: "w-e",    x1: 11.88, y1: -0.12, x2: 12.12, y2: 8.52,  z0: 0, z1: 2.9,  g: "w", o: 1, a: "#2C4370", b: "#DFD5C6" },
      /* west wall — nearest to the eye, kept as a low cut edge so the
         apartment stays open, exactly as a cutaway isometric would be drawn */
      { id: "w-w",    x1: -0.12, y1: -0.12, x2: 0.12,  y2: 8.52,  z0: 0, z1: 0.16, g: "w", o: 2, a: "#33507F", b: "#CFC4B3" },
      /* south piers — the glazing line onto the terrace */
      { id: "w-s-p1", x1: -0.12, y1: 8.28,  x2: 0.55,  y2: 8.52,  z0: 0, z1: 2.9,  g: "w", o: 2, a: "#2C4370", b: "#DFD5C6" },
      { id: "w-s-p2", x1: 6.30,  y1: 8.28,  x2: 6.90,  y2: 8.52,  z0: 0, z1: 2.9,  g: "w", o: 3, a: "#2C4370", b: "#DFD5C6" },
      { id: "w-s-p3", x1: 11.45, y1: 8.28,  x2: 12.12, y2: 8.52,  z0: 0, z1: 2.9,  g: "w", o: 3, a: "#2C4370", b: "#DFD5C6" },
      /* glazing head beam over both window bays */
      { id: "w-s-h1", x1: 0.55,  y1: 8.30,  x2: 6.30,  y2: 8.50,  z0: 2.62, z1: 2.9, g: "w", o: 4, a: "#2C4370", b: "#DFD5C6" },
      { id: "w-s-h2", x1: 6.90,  y1: 8.30,  x2: 11.45, y2: 8.50,  z0: 2.62, z1: 2.9, g: "w", o: 4, a: "#2C4370", b: "#DFD5C6" },

      /* internal partitions */
      { id: "p-b1",   x1: 6.53,  y1: -0.12, x2: 6.67,  y2: 1.20,  z0: 0, z1: 2.9, g: "w", o: 5, a: "#293D64", b: "#D7CCBB" },
      { id: "p-b2",   x1: 6.53,  y1: 2.10,  x2: 6.67,  y2: 5.20,  z0: 0, z1: 2.9, g: "w", o: 5, a: "#293D64", b: "#D7CCBB" },
      { id: "p-b3",   x1: 6.53,  y1: 6.10,  x2: 6.67,  y2: 8.40,  z0: 0, z1: 2.9, g: "w", o: 6, a: "#293D64", b: "#D7CCBB" },
      { id: "p-h1",   x1: 6.67,  y1: 3.53,  x2: 10.20, y2: 3.67,  z0: 0, z1: 2.9, g: "w", o: 6, a: "#293D64", b: "#D7CCBB" },
      { id: "p-h2",   x1: 11.10, y1: 3.53,  x2: 11.88, y2: 3.67,  z0: 0, z1: 2.9, g: "w", o: 7, a: "#293D64", b: "#D7CCBB" },
      { id: "p-v",    x1: 9.53,  y1: 0.12,  x2: 9.67,  y2: 3.60,  z0: 0, z1: 2.9, g: "w", o: 7, a: "#293D64", b: "#D7CCBB" },
      { id: "p-k",    x1: 0.12,  y1: 2.93,  x2: 3.00,  y2: 3.07,  z0: 0, z1: 2.9, g: "w", o: 8, a: "#293D64", b: "#D7CCBB" },
      { id: "p-e",    x1: 4.13,  y1: 0.12,  x2: 4.27,  y2: 3.00,  z0: 0, z1: 2.9, g: "w", o: 8, a: "#293D64", b: "#D7CCBB" },

      /* terrace parapets */
      { id: "par-s",  x1: -0.12, y1: 10.28, x2: 12.12, y2: 10.44, z0: 0, z1: 0.98, g: "w", o: 9, a: "#2E4674", b: "#CDC2B1" },
      { id: "par-w",  x1: -0.12, y1: 8.40,  x2: 0.04,  y2: 10.44, z0: 0, z1: 0.98, g: "w", o: 9, a: "#2E4674", b: "#CDC2B1" },
      { id: "par-e",  x1: 11.96, y1: 8.40,  x2: 12.12, y2: 10.44, z0: 0, z1: 0.98, g: "w", o: 9, a: "#2E4674", b: "#CDC2B1" },

      /* glazing — thin translucent panes, sorted with everything else */
      { id: "gl-1",   x1: 0.55,  y1: 8.34,  x2: 6.30,  y2: 8.46,  z0: 0.02, z1: 2.62, g: "w", o: 10, glass: 1, a: "#5E8ED6", b: "#F3D2A0" },
      { id: "gl-2",   x1: 6.90,  y1: 8.34,  x2: 11.45, y2: 8.46,  z0: 0.02, z1: 2.62, g: "w", o: 10, glass: 1, a: "#5E8ED6", b: "#F3D2A0" },

      /* ---------------- fit-out (group f) ---------------- */
      { id: "f-k-tall",  x1: 0.22, y1: 0.20, x2: 1.30, y2: 0.88, z0: 0,    z1: 2.34, g: "f", o: 0, a: "#3E5F97", b: "#B08262" },
      { id: "f-k-run",   x1: 1.30, y1: 0.20, x2: 4.02, y2: 0.88, z0: 0,    z1: 0.92, g: "f", o: 0, a: "#3E5F97", b: "#B08262" },
      { id: "f-k-top",   x1: 1.28, y1: 0.18, x2: 4.04, y2: 0.90, z0: 0.92, z1: 0.96, g: "f", o: 1, a: "#4A6EA8", b: "#E3DACB" },
      { id: "f-k-isl",   x1: 1.10, y1: 1.80, x2: 3.30, y2: 2.55, z0: 0,    z1: 0.90, g: "f", o: 1, a: "#3E5F97", b: "#B08262" },
      { id: "f-k-islt",  x1: 1.02, y1: 1.72, x2: 3.38, y2: 2.63, z0: 0.90, z1: 0.95, g: "f", o: 2, a: "#4A6EA8", b: "#E6DECF" },
      { id: "f-b-van",   x1: 6.85, y1: 0.22, x2: 9.30, y2: 0.78, z0: 0.38, z1: 0.86, g: "f", o: 2, a: "#3E5F97", b: "#B08262" },
      { id: "f-b-sh",    x1: 6.85, y1: 2.25, x2: 8.30, y2: 3.45, z0: 0.02, z1: 2.20, g: "f", o: 3, glass: 1, a: "#5E8ED6", b: "#DCE4E6" },
      { id: "f-b-tray",  x1: 6.85, y1: 2.25, x2: 8.30, y2: 3.45, z0: 0,    z1: 0.06, g: "f", o: 3, a: "#4A6EA8", b: "#D6CDBE" },
      { id: "f-b-wc",    x1: 8.72, y1: 2.92, x2: 9.34, y2: 3.46, z0: 0.12, z1: 0.58, g: "f", o: 4, a: "#4A6EA8", b: "#F0ECE4" },
      { id: "f-d-w1",    x1: 9.80, y1: 0.22, x2: 11.80,y2: 0.88, z0: 0,    z1: 2.50, g: "f", o: 4, a: "#3E5F97", b: "#B08262" },
      { id: "f-d-w2",    x1: 11.14,y1: 0.88, x2: 11.80,y2: 3.40, z0: 0,    z1: 2.50, g: "f", o: 5, a: "#3E5F97", b: "#A87C5D" },
      { id: "f-l-tv",    x1: 0.30, y1: 3.20, x2: 3.40, y2: 3.66, z0: 0,    z1: 0.52, g: "f", o: 5, a: "#3E5F97", b: "#A87C5D" },
      { id: "f-bd-ward", x1: 11.22,y1: 4.10, x2: 11.86,y2: 7.20, z0: 0,    z1: 2.50, g: "f", o: 6, a: "#3E5F97", b: "#B08262" },

      /* ---------------- furniture (group u) ---------------- */
      { id: "u-rug-l",   x1: 0.40, y1: 5.00, x2: 4.00, y2: 8.10, z0: 0, z1: 0.02, g: "u", o: 0, flat: 1, a: "#3A5C93", b: "#B99878" },
      { id: "u-sofa-s",  x1: 0.60, y1: 6.60, x2: 3.60, y2: 7.58, z0: 0.10, z1: 0.46, g: "u", o: 0, a: "#4A6EA8", b: "#CFC6B8" },
      { id: "u-sofa-b",  x1: 0.60, y1: 7.58, x2: 3.60, y2: 7.92, z0: 0.10, z1: 0.86, g: "u", o: 1, a: "#4A6EA8", b: "#C6BCAC" },
      { id: "u-coffee",  x1: 1.30, y1: 5.60, x2: 2.80, y2: 6.32, z0: 0,    z1: 0.38, g: "u", o: 1, a: "#4A6EA8", b: "#9C7C5F" },
      { id: "u-dine-b",  x1: 4.72, y1: 5.22, x2: 5.88, y2: 6.18, z0: 0,    z1: 0.68, g: "u", o: 2, a: "#4A6EA8", b: "#8E7358" },
      { id: "u-dine-t",  x1: 4.50, y1: 5.00, x2: 6.10, y2: 6.40, z0: 0.68, z1: 0.76, g: "u", o: 2, a: "#5478B2", b: "#C29B71" },
      { id: "u-ch-1",    x1: 4.62, y1: 4.42, x2: 5.04, y2: 4.84, z0: 0, z1: 0.46, g: "u", o: 3, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-ch-2",    x1: 5.56, y1: 4.42, x2: 5.98, y2: 4.84, z0: 0, z1: 0.46, g: "u", o: 3, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-ch-3",    x1: 4.62, y1: 6.56, x2: 5.04, y2: 6.98, z0: 0, z1: 0.46, g: "u", o: 3, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-ch-4",    x1: 5.56, y1: 6.56, x2: 5.98, y2: 6.98, z0: 0, z1: 0.46, g: "u", o: 3, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-rug-b",   x1: 7.20, y1: 3.95, x2: 10.25,y2: 7.10, z0: 0, z1: 0.02, g: "u", o: 4, flat: 1, a: "#3A5C93", b: "#B99878" },
      { id: "u-bed-h",   x1: 7.50, y1: 3.74, x2: 9.70, y2: 4.02, z0: 0,    z1: 1.14, g: "u", o: 4, a: "#4A6EA8", b: "#B08262" },
      { id: "u-bed-ba",  x1: 7.60, y1: 4.00, x2: 9.60, y2: 6.10, z0: 0,    z1: 0.30, g: "u", o: 5, a: "#4A6EA8", b: "#8C7A66" },
      { id: "u-bed-m",   x1: 7.70, y1: 4.10, x2: 9.50, y2: 6.00, z0: 0.30, z1: 0.80, g: "u", o: 5, a: "#5478B2", b: "#EFEAE1" },
      { id: "u-ns-l",    x1: 7.08, y1: 3.95, x2: 7.53, y2: 4.42, z0: 0, z1: 0.52, g: "u", o: 6, a: "#4A6EA8", b: "#9C7C5F" },
      { id: "u-ns-r",    x1: 9.66, y1: 3.95, x2: 10.11,y2: 4.42, z0: 0, z1: 0.52, g: "u", o: 6, a: "#4A6EA8", b: "#9C7C5F" },
      { id: "u-bench",   x1: 7.80, y1: 6.34, x2: 9.40, y2: 6.82, z0: 0, z1: 0.46, g: "u", o: 6, a: "#4A6EA8", b: "#C6BCAC" },

      /* terrace */
      { id: "u-t-l1s",   x1: 1.20, y1: 9.10, x2: 2.10, y2: 10.00, z0: 0.10, z1: 0.44, g: "u", o: 7, a: "#4A6EA8", b: "#CDBEA9" },
      { id: "u-t-l1b",   x1: 1.20, y1: 9.10, x2: 2.10, y2: 9.30,  z0: 0.10, z1: 0.88, g: "u", o: 7, a: "#4A6EA8", b: "#C4B39C" },
      { id: "u-t-l2s",   x1: 2.70, y1: 9.10, x2: 3.60, y2: 10.00, z0: 0.10, z1: 0.44, g: "u", o: 7, a: "#4A6EA8", b: "#CDBEA9" },
      { id: "u-t-l2b",   x1: 2.70, y1: 9.10, x2: 3.60, y2: 9.30,  z0: 0.10, z1: 0.88, g: "u", o: 7, a: "#4A6EA8", b: "#C4B39C" },
      { id: "u-t-tab",   x1: 2.24, y1: 9.38, x2: 2.56, y2: 9.78,  z0: 0,    z1: 0.44, g: "u", o: 8, a: "#4A6EA8", b: "#9C7C5F" },
      { id: "u-t-db",    x1: 7.54, y1: 9.24, x2: 9.26, y2: 9.82,  z0: 0,    z1: 0.66, g: "u", o: 8, a: "#4A6EA8", b: "#8E7358" },
      { id: "u-t-dt",    x1: 7.20, y1: 9.00, x2: 9.60, y2: 10.06, z0: 0.66, z1: 0.74, g: "u", o: 8, a: "#5478B2", b: "#C29B71" },
      { id: "u-t-c1",    x1: 7.62, y1: 8.54, x2: 8.04, y2: 8.96,  z0: 0, z1: 0.46, g: "u", o: 9, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-t-c2",    x1: 8.76, y1: 8.54, x2: 9.18, y2: 8.96,  z0: 0, z1: 0.46, g: "u", o: 9, a: "#4A6EA8", b: "#9E8B76" },
      { id: "u-t-p1",    x1: 10.55,y1: 9.20, x2: 11.25,y2: 9.90,  z0: 0, z1: 0.58, g: "u", o: 9, a: "#4A6EA8", b: "#A5765B" },
      { id: "u-t-p2",    x1: 0.32, y1: 8.62, x2: 0.92, y2: 9.22,  z0: 0, z1: 0.52, g: "u", o: 9, a: "#4A6EA8", b: "#A5765B" }
    ],

    /* linework drawn on the floor plane in stage 1, in draw order.
       Each entry is a list of sub-paths; each sub-path a list of [x, y] points.
       d = the fraction of stage 1 at which this line starts drawing. */
    lines: [
      { id: "ln-grid", d: 0.00, w: 0.7, cls: "sc-grid", loops: [] },  /* filled in by rmGridLoops() */
      { id: "ln-env",  d: 0.10, w: 2.1, cls: "sc-ln", loops: [
        [[-0.12, -0.12], [12.12, -0.12], [12.12, 8.52], [-0.12, 8.52], [-0.12, -0.12]]
      ] },
      { id: "ln-ter",  d: 0.24, w: 1.7, cls: "sc-ln", loops: [
        [[-0.12, 8.52], [-0.12, 10.44], [12.12, 10.44], [12.12, 8.52]]
      ] },
      { id: "ln-p1",   d: 0.34, w: 1.5, cls: "sc-ln", loops: [
        [[6.53, -0.12], [6.53, 1.20]], [[6.67, -0.12], [6.67, 1.20]],
        [[6.53, 2.10], [6.53, 5.20]], [[6.67, 2.10], [6.67, 5.20]],
        [[6.53, 6.10], [6.53, 8.40]], [[6.67, 6.10], [6.67, 8.40]]
      ] },
      { id: "ln-p2",   d: 0.44, w: 1.5, cls: "sc-ln", loops: [
        [[6.67, 3.53], [10.20, 3.53]], [[6.67, 3.67], [10.20, 3.67]],
        [[11.10, 3.53], [11.88, 3.53]], [[11.10, 3.67], [11.88, 3.67]],
        [[9.53, 0.12], [9.53, 3.60]], [[9.67, 0.12], [9.67, 3.60]]
      ] },
      { id: "ln-p3",   d: 0.54, w: 1.5, cls: "sc-ln", loops: [
        [[0.12, 2.93], [3.00, 2.93]], [[0.12, 3.07], [3.00, 3.07]],
        [[4.13, 0.12], [4.13, 3.00]], [[4.27, 0.12], [4.27, 3.00]]
      ] },
      { id: "ln-open", d: 0.64, w: 1.4, cls: "sc-ln", loops: [
        /* window bays on the terrace line */
        [[0.55, 8.34], [6.30, 8.34]], [[0.55, 8.46], [6.30, 8.46]],
        [[6.90, 8.34], [11.45, 8.34]], [[6.90, 8.46], [11.45, 8.46]]
      ] },
      { id: "ln-door", d: 0.72, w: 1.4, cls: "sc-ln", loops: [] }      /* filled in by rmDoorLoops() */
    ],

    /* dimension lines: floor-plane geometry + a mono label */
    dims: [
      { id: "dim-w", x1: 0.0,   y1: -1.00, x2: 12.0,  y2: -1.00, label: "12.00 m", d: 0.30, lp: -15 },
      { id: "dim-d", x1: -1.00, y1: 0.0,   x2: -1.00, y2: 8.40,  label: "8.40 m",  d: 0.46, lp:  15 },
      { id: "dim-t", x1: 13.05, y1: 8.40,  x2: 13.05, y2: 10.40, label: "2.00 m",  d: 0.62, lp: -16 },
      { id: "dim-b", x1: 6.60,  y1: 9.05,  x2: 12.00, y2: 9.05,  label: "5.40 m",  d: 0.78, lp:  16 }
    ],

    /* stage-3 / stage-4 annotation callouts. ax/ay/az = the point in the model
       the leader line points at; lx/ly = where the mono label sits on the sheet. */
    notes: [
      { id: "n-1", ax: 1.60, ay: 7.60, az: 0.02, lx: 58,  ly: 636, at: 0.10, side: -1,
        t: "PORCELAIN TILE · 60×60", s: "Floors, wet areas" },
      { id: "n-2", ax: 0.80, ay: 0.55, az: 2.34, lx: 58,  ly: 238, at: 0.34, side: -1,
        t: "JOINERY · FULL-HEIGHT", s: "Kitchen, dressing, wardrobe" },
      { id: "n-3", ax: 7.60, ay: 2.80, az: 1.30, lx: 984, ly: 218, at: 0.58,
        t: "SANITARY · WALL-HUNG", s: "Bathroom, wet areas" },
      { id: "n-4", ax: 8.40, ay: 9.50, az: 0.74, lx: 984, ly: 592, at: 0.82,
        t: "FF&E · SPECIFIED + PROCURED", s: "Living, bedroom, terrace" }
    ]
  };

  /* 1 m planning grid, drawn inside the envelope in stage 1 */
  function rmGridLoops() {
    var out = [], i;
    for (i = 1; i < 12; i++) out.push([[i, -0.12], [i, 10.44]]);
    for (i = 1; i < 11; i++) out.push([[-0.12, i], [12.12, i]]);
    return out;
  }

  /* door leaf + swing arc, drawn in plan like a real drawing sheet */
  function rmDoorArc(hx, hy, r, a0, a1, leafDx, leafDy) {
    var pts = [], n = 12, i, a;
    for (i = 0; i <= n; i++) {
      a = a0 + (a1 - a0) * (i / n);
      pts.push([hx + Math.cos(a) * r, hy + Math.sin(a) * r]);
    }
    return [pts, [[hx, hy], [hx + leafDx, hy + leafDy]]];
  }

  function rmDoorLoops() {
    var P = Math.PI, out = [];
    /* entrance door in the north wall */
    out = out.concat(rmDoorArc(5.70, 0.0, 0.90, P, P * 0.5, -0.90, 0.0));
    /* bathroom door off the entry hall */
    out = out.concat(rmDoorArc(6.60, 2.10, 0.90, -P * 0.5, 0, 0.0, -0.90));
    /* bedroom door off the living room */
    out = out.concat(rmDoorArc(6.60, 6.10, 0.90, -P * 0.5, 0, 0.0, -0.90));
    /* dressing door off the bedroom */
    out = out.concat(rmDoorArc(10.20, 3.60, 0.90, 0, P * 0.5, 0.90, 0.0));
    return out;
  }

  /* ============================================================
     FLAGSHIP SCENE — GEOMETRY
     A very small isometric engine. It does three things:
       1. projects a point (x, y, z) in metres onto the drawing sheet,
       2. turns every box in the model into its visible faces,
       3. sorts those faces back-to-front so they overlap correctly.

     The camera travels from a flat plan view (stage 1) to an isometric
     view (stage 2+) by interpolating four numbers, so the floor plan and
     the finished 3D model are literally the same drawing.
     ============================================================ */

  var RM_CX = 6.0, RM_CY = 5.2;              /* the point the camera turns around */
  var RM_PLAN_CAM = { a: 0, k: 1, zk: 0, s: 58, oy: 372 };
  var RM_ISO_CAM  = { a: -40 * Math.PI / 180, k: 0.56, zk: 0.72, s: 54, oy: 406 };
  var RM_OX = 520;

  function rmCam(t) {
    return {
      a:  RM_PLAN_CAM.a  + (RM_ISO_CAM.a  - RM_PLAN_CAM.a)  * t,
      k:  RM_PLAN_CAM.k  + (RM_ISO_CAM.k  - RM_PLAN_CAM.k)  * t,
      zk: RM_ISO_CAM.zk * t,
      s:  RM_PLAN_CAM.s  + (RM_ISO_CAM.s  - RM_PLAN_CAM.s)  * t,
      ox: RM_OX,
      oy: RM_PLAN_CAM.oy + (RM_ISO_CAM.oy - RM_PLAN_CAM.oy) * t
    };
  }

  function rmProj(x, y, z, c) {
    var xc = x - RM_CX, yc = y - RM_CY;
    var ca = Math.cos(c.a), sa = Math.sin(c.a);
    var X = xc * ca - yc * sa;
    var Y = xc * sa + yc * ca;
    return [c.ox + X * c.s, c.oy + Y * c.s * c.k - z * c.s * c.zk];
  }

  /* depth key in the FINAL camera. Face order is fixed once, from the final
     view: while the camera is still tilting the walls have almost no height,
     so nothing can overlap wrongly on the way. */
  function rmDepth(x, y) {
    return (x - RM_CX) * Math.sin(RM_ISO_CAM.a) + (y - RM_CY) * Math.cos(RM_ISO_CAM.a);
  }

  /* In the final camera the viewer stands off the south-west corner, so of a
     box's six faces exactly three can be seen: the west side, the south side
     and the top. Drawn in that order they stack correctly. */
  var RM_FACES = [
    { k: "w", f: 0.70, pts: function (b) { return [[b.x1, b.y1, 0], [b.x1, b.y2, 0], [b.x1, b.y2, 1], [b.x1, b.y1, 1]]; } },
    { k: "s", f: 0.88, pts: function (b) { return [[b.x1, b.y2, 0], [b.x2, b.y2, 0], [b.x2, b.y2, 1], [b.x1, b.y2, 1]]; } },
    { k: "t", f: 1.00, pts: function (b) { return [[b.x1, b.y1, 1], [b.x2, b.y1, 1], [b.x2, b.y2, 1], [b.x1, b.y2, 1]]; } }
  ];

  /* Build the complete, ordered list of things to draw. Called once. */
  function rmDrawList() {
    var items = [];
    var P = RM_PLAN;

    /* 0 — the slab */
    RM_FACES.forEach(function (fc) {
      items.push({ t: "face", id: P.slab.x1 + "-slab-" + fc.k, box: P.slab, face: fc, g: "slab",
                   a: P.slab.a, b: P.slab.b, f: fc.f });
    });

    /* 1 — room floor finishes (flat polygons on the slab) */
    P.rooms.forEach(function (r) {
      items.push({ t: "room", room: r, g: "floor", a: r.a, b: r.b, f: 1 });
    });

    /* 2 — rugs and other flat pieces, always just above the floor */
    P.boxes.filter(function (b) { return b.flat; }).forEach(function (b) {
      items.push({ t: "face", box: b, face: RM_FACES[2], g: b.g, o: b.o, a: b.a, b: b.b, f: 1, flat: 1, ref: b });
    });

    /* 3 — the blueprint linework, drawn on the floor plane */
    P.lines.forEach(function (ln) {
      var loops = ln.loops;
      if (ln.id === "ln-grid") loops = rmGridLoops();
      if (ln.id === "ln-door") loops = rmDoorLoops();
      items.push({ t: "line", line: ln, loops: loops, g: "line" });
    });

    /* 4 — every solid box, sorted far → near */
    var solids = P.boxes.filter(function (b) { return !b.flat; }).slice();
    solids.sort(function (m, n) {
      return rmDepth((m.x1 + m.x2) / 2, (m.y1 + m.y2) / 2) - rmDepth((n.x1 + n.x2) / 2, (n.y1 + n.y2) / 2);
    });
    solids.forEach(function (b) {
      RM_FACES.forEach(function (fc) {
        items.push({ t: "face", box: b, face: fc, g: b.g, o: b.o, a: b.a, b: b.b, f: fc.f,
                     glass: b.glass, ref: b });
      });
    });

    return items;
  }

  /* ---------- geometry for one item at a given camera / build state ---------- */

  /* state: { rise: 0..1 height of this box, drop: metres it is still falling } */
  function rmFacePoints(item, cam, rise, drop) {
    var b = item.box;
    var z0 = b.z0 + drop;
    var z1 = b.z0 + (b.z1 - b.z0) * rise + drop;
    var raw = item.face.pts(b);
    var out = "", i, p;
    for (i = 0; i < 4; i++) {
      p = raw[i];
      var pt = rmProj(p[0], p[1], p[2] ? z1 : z0, cam);
      out += (i ? " " : "") + pt[0].toFixed(1) + "," + pt[1].toFixed(1);
    }
    return out;
  }

  function rmRoomPoints(item, cam) {
    var r = item.room;
    var q = [[r.x1, r.y1], [r.x2, r.y1], [r.x2, r.y2], [r.x1, r.y2]];
    var out = "", i, pt;
    for (i = 0; i < 4; i++) {
      pt = rmProj(q[i][0], q[i][1], 0.004, cam);
      out += (i ? " " : "") + pt[0].toFixed(1) + "," + pt[1].toFixed(1);
    }
    return out;
  }

  function rmLinePath(item, cam) {
    var d = "", i, j, loop, pt;
    for (i = 0; i < item.loops.length; i++) {
      loop = item.loops[i];
      for (j = 0; j < loop.length; j++) {
        pt = rmProj(loop[j][0], loop[j][1], 0.012, cam);
        d += (j ? "L" : "M") + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
      }
    }
    return d;
  }

  /* ---------- colour ---------- */
  function rmHex(h) {
    return [parseInt(h.substr(1, 2), 16), parseInt(h.substr(3, 2), 16), parseInt(h.substr(5, 2), 16)];
  }
  function rmMix(c1, c2, t) {
    return [c1[0] + (c2[0] - c1[0]) * t, c1[1] + (c2[1] - c1[1]) * t, c1[2] + (c2[2] - c1[2]) * t];
  }
  function rmShadeRgb(c, f) {
    return "rgb(" + Math.round(c[0] * f) + "," + Math.round(c[1] * f) + "," + Math.round(c[2] * f) + ")";
  }
  /* the fill an item shows when the drawing is `warm` (0 technical → 1 finished) */
  function rmItemFill(item, warm) {
    return rmShadeRgb(rmMix(rmHex(item.a), rmHex(item.b), warm), item.f);
  }

  /* ============================================================
     FLAGSHIP SCENE — THE SCRUB
     Maps one number (scene progress, 0 → 1) onto the whole build:

       0.00 – 0.20   BLUEPRINT   plan lines draw themselves
       0.20 – 0.42   LIFT        camera tilts, walls rise
       0.42 – 0.63   FIT OUT     finishes, kitchen, bathroom, joinery
       0.63 – 0.83   FURNISH     furniture drops in and settles
       0.83 – 1.00   GUEST-READY warm light, technical drawing → rendering

     Everything below is reversible: scrub back and the unit unbuilds.
     ============================================================ */

  /* rmWrap is the tall block that provides the scroll distance;
     rmScene is the 100vh panel that sticks inside it. */
  var rmWrap    = document.querySelector(".scene-wrap");
  var rmScene   = document.getElementById("scene-apartment");
  var rmSvg     = document.getElementById("rm-svg");
  var rmItems   = null, rmEls = null;
  var rmSolids  = null, rmGlowEl = null, rmCapEl = null;
  var rmDimEls  = [], rmLabelEls = [], rmNoteEls = [];
  var rmStageBtns = [], rmStageCards = [], rmRailFill = null, rmPctEl = null;
  var rmLastStage = -1;
  /* true when the scene is only ever painted in its finished state
     (small screens, reduced motion). Room names then stay on the drawing,
     because there is no scrub to reveal them. */
  var rmStaticFinal = false;
  /* The scrub owns the progress rail and the stage copy: it derives the
     current stage from p, i.e. "which band is the scrub inside". The phone
     engine works the other way round — the stage is chosen first and p is
     tweened to it — and its targets sit at the END of each band, which is
     the start of the next one. So it takes ownership of the stage classes
     by clearing this, and rmUpdate leaves them alone. Always true on the
     desktop, where nothing else writes them. */
  var rmDriveStages = true;

  var RM_STAGES = [0, 0.20, 0.42, 0.63, 0.83, 1.0];

  function rmEase(t) { t = clamp01(t); return 1 - Math.pow(1 - t, 3); }
  function rmEaseIO(t) { t = clamp01(t); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function rmInit() {
    if (!rmScene || !rmSvg || !rmWrap) return false;
    rmItems = rmDrawList();
    rmEls = rmSvg.querySelectorAll("#rm-draw [data-i]");
    if (rmEls.length !== rmItems.length) {
      /* the generated drawing and the model have drifted apart — leave the
         static, finished drawing on screen rather than animating nonsense */
      return false;
    }
    rmSolids = document.getElementById("rm-solids");
    rmGlowEl = document.getElementById("rm-glow");
    rmCapEl  = document.getElementById("rm-caption");
    rmDimEls = Array.prototype.slice.call(rmSvg.querySelectorAll(".sc-dim"));
    rmLabelEls = Array.prototype.slice.call(rmSvg.querySelectorAll(".sc-rlabel"));
    rmNoteEls = Array.prototype.slice.call(rmSvg.querySelectorAll(".sc-note"));
    rmStageBtns = Array.prototype.slice.call(document.querySelectorAll(".scene-stage"));
    rmStageCards = Array.prototype.slice.call(document.querySelectorAll(".scene-copy-card"));
    rmRailFill = document.getElementById("scene-rail-fill");
    rmPctEl = document.getElementById("scene-pct");
    return true;
  }

  /* how far a single box has risen / dropped at progress p */
  function rmBoxState(item, p) {
    var b = item.ref;
    if (!b) return { rise: 1, drop: 0, op: 1 };
    if (b.g === "w") {
      var lw = rmEase(band(p, 0.215 + b.o * 0.0145, 0.075));
      /* during stage 1 the wall has no height, so its top face IS its plan
         footprint — fading it in draws the walls as solid poché on the plan */
      var poche = rmEase(band(p / 0.20, 0.26 + b.o * 0.032, 0.26));
      return { rise: lw, drop: 0, op: Math.max(poche, lw > 0 ? 1 : 0) };
    }
    if (b.g === "f") {
      var lf = rmEase(band(p, 0.455 + b.o * 0.019, 0.075));
      return { rise: lf, drop: 0, op: lf > 0 ? 1 : 0 };
    }
    /* furniture: falls the last 1.5 m and settles with one small rebound */
    var t = clamp01((p - (0.63 + b.o * 0.0165)) / 0.085);
    var e = rmEase(t);
    var drop = (1 - e) * 1.5;
    if (t > 0.72 && t < 1) drop += 0.055 * Math.sin((t - 0.72) / 0.28 * Math.PI);
    return { rise: 1, drop: drop, op: t > 0 ? clamp01(t * 4) : 0 };
  }

  function rmUpdate(p) {
    if (!rmItems) return;
    var tilt   = rmEaseIO(band(p, 0.20, 0.215));
    var cam    = rmCam(tilt);
    var warm   = rmEase(band(p, 0.825, 0.145));
    var drawT  = clamp01(p / 0.20);
    var lineOp = 1 - clamp01((p - 0.42) / 0.10);
    var gridOp = (1 - clamp01((p - 0.36) / 0.09)) * (0.55 + 0.45 * (1 - tilt));
    var dimOp  = 1 - clamp01((p - 0.44) / 0.10);
    var labOp  = rmStaticFinal ? 1 : 1 - clamp01((p - 0.66) / 0.10);

    var i, item, el, st;
    for (i = 0; i < rmItems.length; i++) {
      item = rmItems[i]; el = rmEls[i];
      if (item.t === "room") {
        el.setAttribute("points", rmRoomPoints(item, cam));
        var ro = rmEase(band(p, 0.425 + item.room.o * 0.016, 0.07));
        el.style.opacity = ro;
        /* the floor finish is the first thing that stops being a drawing:
           it warms up part of the way as it is laid, and the rest at the end */
        el.setAttribute("fill", rmItemFill(item, Math.max(warm, ro * 0.58)));
      } else if (item.t === "line") {
        var ln = item.line;
        var isGrid = ln.id === "ln-grid";
        el.setAttribute("d", rmLinePath(item, cam));
        /* the planning grid is the sheet itself: it is there from the first
           frame, so the scene never starts as an empty box. Everything else
           draws itself on top of it. */
        var lt = isGrid ? 1 : clamp01((drawT - ln.d) / 0.30);
        el.style.strokeDashoffset = (1 - lt);
        el.style.opacity = isGrid ? gridOp : lineOp * (lt > 0 ? 1 : 0);
      } else {
        st = item.g === "slab" || item.g === "floor" ? { rise: 1, drop: 0, op: 1 } : rmBoxState(item, p);
        el.setAttribute("points", rmFacePoints(item, cam, st.rise, st.drop));
        el.style.opacity = item.g === "slab" ? rmEase(band(p, 0.16, 0.10)) : st.op;
        el.setAttribute("fill", rmItemFill(item, warm));
        if (item.glass) el.setAttribute("fill-opacity", (0.20 + 0.34 * warm).toFixed(2));
      }
    }

    /* dimension lines */
    for (i = 0; i < rmDimEls.length; i++) {
      var d = RM_PLAN.dims[i], g = rmDimEls[i];
      var a = rmProj(d.x1, d.y1, 0, cam), b2 = rmProj(d.x2, d.y2, 0, cam);
      var dx = b2[0] - a[0], dy = b2[1] - a[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
      var px = -dy / L * 5, py = dx / L * 5;
      g.querySelector("path").setAttribute("d",
        "M" + (a[0] - px) + " " + (a[1] - py) + "L" + (a[0] + px) + " " + (a[1] + py) +
        "M" + a[0] + " " + a[1] + "L" + b2[0] + " " + b2[1] +
        "M" + (b2[0] - px) + " " + (b2[1] - py) + "L" + (b2[0] + px) + " " + (b2[1] + py));
      var tx = g.querySelector("text");
      tx.setAttribute("x", ((a[0] + b2[0]) / 2 + px / 5 * (d.lp || -15)).toFixed(1));
      tx.setAttribute("y", ((a[1] + b2[1]) / 2 + py / 5 * (d.lp || -15) + 4).toFixed(1));
      g.style.opacity = clamp01((drawT - d.d) / 0.22) * dimOp;
    }

    /* room names + areas, pinned to the centre of each room */
    for (i = 0; i < rmLabelEls.length; i++) {
      var r = RM_PLAN.rooms[i], lg = rmLabelEls[i];
      var c = rmProj((r.x1 + r.x2) / 2, (r.y1 + r.y2) / 2, 0, cam);
      var ts = lg.querySelectorAll("text");
      ts[0].setAttribute("x", c[0].toFixed(1)); ts[0].setAttribute("y", (c[1] - 3).toFixed(1));
      ts[1].setAttribute("x", c[0].toFixed(1)); ts[1].setAttribute("y", (c[1] + 13).toFixed(1));
      lg.style.opacity = clamp01((drawT - 0.34 - r.o * 0.05) / 0.16) * labOp;
    }

    /* annotation callouts */
    for (i = 0; i < rmNoteEls.length; i++) {
      var n = RM_PLAN.notes[i], ng = rmNoteEls[i];
      var ap = rmProj(n.ax, n.ay, n.az, cam);
      var side = n.side || 1;
      /* leader: one straight run from the model to the label, then the short
         horizontal rule the label sits on — the way a drawing annotates */
      var nearX = side > 0 ? n.lx - 236 : n.lx + 236;
      var ry = n.ly + 26;
      ng.querySelector("path").setAttribute("d",
        "M" + ap[0].toFixed(1) + " " + ap[1].toFixed(1) +
        "L" + nearX + " " + ry + "L" + n.lx + " " + ry);
      ng.querySelector("circle").setAttribute("cx", ap[0].toFixed(1));
      ng.querySelector("circle").setAttribute("cy", ap[1].toFixed(1));
      var appear = 0.45 + n.at * 0.40;
      ng.style.opacity = (clamp01((p - appear) / 0.05) * (1 - clamp01((p - 0.955) / 0.04))).toFixed(3);
    }

    /* the light coming through the glazing, and the closing caption */
    if (rmGlowEl) rmGlowEl.style.opacity = rmEase(band(p, 0.845, 0.13)).toFixed(3);
    if (rmCapEl) rmCapEl.style.opacity = rmEase(band(p, 0.905, 0.06)).toFixed(3);
    if (rmSolids) rmSolids.style.setProperty("--sc-shadow", (0.16 + 0.56 * rmEase(band(p, 0.22, 0.2))).toFixed(3));
    if (rmScene) {
      rmScene.style.setProperty("--warm", warm.toFixed(3));
      rmScene.style.setProperty("--sc-edge",
        rmShadeRgb(rmMix(rmHex("#6E9BE0"), rmHex("#7A6553"), warm), 1));
      rmScene.style.setProperty("--sc-label",
        rmShadeRgb(rmMix(rmHex("#9FBFEC"), rmHex("#5B4B3D"), warm), 1));
    }

    /* progress indicator */
    if (!rmDriveStages) return;
    if (rmRailFill) rmRailFill.style.transform = "scaleX(" + p.toFixed(4) + ")";
    if (rmPctEl) rmPctEl.textContent = (p * 100 < 10 ? "0" : "") + Math.round(p * 100) + "%";
    var si = 0;
    while (si < 4 && p >= RM_STAGES[si + 1]) si++;
    if (si !== rmLastStage) {
      rmStageBtns.forEach(function (b3, k) {
        b3.classList.toggle("is-active", k === si);
        b3.classList.toggle("is-done", k < si);
        b3.setAttribute("aria-current", k === si ? "step" : "false");
      });
      rmStageCards.forEach(function (c2, k) { c2.classList.toggle("is-active", k === si); });
      rmLastStage = si;
    }
  }

  /* clicking a stage label jumps the page to that point of the scrub */
  function rmBindStages(getTop, getSpan) {
    rmStageBtns.forEach(function (btn, k) {
      btn.addEventListener("click", function () {
        var target = RM_STAGES[k] + (RM_STAGES[k + 1] - RM_STAGES[k]) * (k === 4 ? 0.92 : 0.6);
        window.scrollTo({ top: getTop() + getSpan() * target, behavior: "smooth" });
      });
    });
  }

  /* ---------------- "How a project runs": the programme line draws itself
     left to right as the seven phases scroll past, and each phase marker
     fills as the line reaches it. ---------------- */
  var phaseScene = document.querySelector(".phases");
  var phaseRule = document.getElementById("phase-rule");
  var phaseNodes = Array.prototype.slice.call(document.querySelectorAll(".phase"));

  function phaseUpdate(p) {
    var e = 1 - Math.pow(1 - clamp01(p), 2);
    if (phaseRule) phaseRule.style.transform = "scaleX(" + e.toFixed(4) + ")";
    phaseNodes.forEach(function (n, i) {
      n.classList.toggle("is-lit", e >= (i + 0.35) / phaseNodes.length);
    });
  }

  /* ---------------- scene registry + the single rAF loop ---------------- */
  var scenes = [];
  var vh = window.innerHeight;

  function addScene(el, type, fn) {
    if (el) scenes.push({ el: el, type: type, fn: fn, top: 0, height: 0, p: -1 });
  }
  function measure() {
    vh = window.innerHeight;
    var y = window.scrollY;
    scenes.forEach(function (s) {
      var r = s.el.getBoundingClientRect();
      s.top = r.top + y;
      s.height = r.height;
    });
  }
  function progressOf(s, y) {
    if (s.type === "pin") {
      var span = s.height - vh;
      if (span <= 0) return 1;
      return clamp01((y - s.top) / span);
    }
    /* "view" scenes scrub while the element travels 90% -> 32% of the viewport */
    var start = s.top - vh * 0.90;
    var end = s.top - vh * 0.32;
    if (end <= start) return 1;
    return clamp01((y - start) / (end - start));
  }

  var ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY;
    scenes.forEach(function (s) {
      var p = progressOf(s, y);
      if (p !== s.p) { s.fn(p); s.p = p; }
    });
  }
  function queue() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  /* ============================================================
     PHONE CHOREOGRAPHY (html.js-steps, below 768px)

     The desktop scenes are pinned and scroll-scrubbed. Below 768px that
     engine never runs and this one does instead. It drives the SAME
     visual states — the flagship drawing's own progress number, the
     .is-active / .is-done stage classes, .is-lit on the seven programme
     phases, the programme rule's scaleX — but reading position only
     decides WHICH scene plays. Time then walks the states inside it,
     once, and the scene rests on its last state. Nothing loops and
     nothing replays on a second pass.

     Rules kept: passive listeners, every play-once observer disconnects
     as soon as its scene has fired, and nothing here is scheduled under
     prefers-reduced-motion or without JS — in both of those cases the
     static final states are already correct.
     ============================================================ */

  /* fire `run` the first time `el` is on screen, then stop watching it */
  function playOnce(el, ratio, run) {
    if (!el) return;
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (!entries[i].isIntersecting) continue;
        io.disconnect();
        run();
        return;
      }
    }, { threshold: ratio, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
  }

  function stepFlag(el, cls, on) { if (el) el.classList.toggle(cls, !!on); }

  /* ---------- THE FLAGSHIP, ON A PHONE ----------
     "From shell to guest-ready" is the whole proposition of a renovation
     business, so the one thing a phone must not be handed is the finished
     drawing with the transformation removed. The scrub is gone; the five
     stages stay, as a snapping track with a dot index.

     The drawing itself is driven by exactly the same rmUpdate(p) the
     desktop scrub calls, so nothing about the build is reimplemented
     here: only where p comes from changes. Each stage is the progress at
     which that stage's work has finished, which is why the drawing
     genuinely walks all five states rather than cutting between two.

     It auto-advances from arrival so the unit builds itself unprompted;
     the first touch on the track or a dot hands control over for good,
     and going back re-runs the build in reverse — the shell becoming
     guest-ready again is the thing a visitor will want to watch twice. */

  /* 01 blueprint drawn · 02 walls up · 03 fit-out in · 04 furniture in · 05 warm */
  var RM_STEP_P = [0.206, 0.435, 0.645, 0.865, 1.0];
  var RM_FIRST  = 1500;   /* the plan drawing itself deserves a little longer */
  var RM_TWEEN  = 1150;   /* ms to build one stage */
  var RM_DWELL  = 900;    /* ms resting on it before the next begins */

  function rmStepsRun() {
    var track = document.querySelector(".scene-copy");
    var cards = Array.prototype.slice.call(document.querySelectorAll(".scene-copy-card"));
    var dots  = Array.prototype.slice.call(document.querySelectorAll(".scene-dot"));
    var stage = document.querySelector(".scene-stage-box");
    if (!rmWrap || !track || !stage || cards.length !== RM_STEP_P.length) return false;
    /* rmInit fails only if the generated drawing and the model have drifted
       apart; the caller then restores the finished drawing + static list */
    if (!rmInit()) return false;

    /* on a phone this track IS the stage copy, not a decorative duplicate of
       the static list underneath — which .js-scene has just hidden */
    track.removeAttribute("aria-hidden");
    /* the stage a visitor has chosen is the truth here, not the band p happens
       to be inside, so this engine owns the stage classes (see 52-scene-render) */
    rmDriveStages = false;

    var idx = -1;
    var p = 0;
    var auto = true;
    var armed = false;          /* the drawing waits below the fold at p = 0 */
    var timer = null;
    var raf = null;
    var landed = null;
    var syncing = false;

    function stopAuto() {
      auto = false;
      if (timer) { window.clearTimeout(timer); timer = null; }
      /* the thumb is the source of truth from here on: never yank the track
         back to a position this engine chose */
      if (landed) { window.clearTimeout(landed); landed = null; syncing = false; }
    }

    function tweenTo(target, dur) {
      if (raf) { window.cancelAnimationFrame(raf); raf = null; }
      var from = p;
      var delta = target - from;
      if (Math.abs(delta) < 0.0005) { p = target; rmUpdate(p); return; }
      var t0 = null;
      function beat(ts) {
        if (t0 === null) t0 = ts;
        var q = clamp01((ts - t0) / dur);
        var e = q < 0.5 ? 4 * q * q * q : 1 - Math.pow(-2 * q + 2, 3) / 2;
        p = from + delta * e;
        rmUpdate(p);
        if (q < 1) { raf = window.requestAnimationFrame(beat); }
        else { raf = null; p = target; rmUpdate(p); }
      }
      raf = window.requestAnimationFrame(beat);
    }

    /* marks a stage everywhere — card, dot, drawing — without moving the
       track; the track calls this from its own scroll handler */
    function mark(i, dur) {
      if (i === idx) return;
      idx = i;
      cards.forEach(function (c, k) { stepFlag(c, "is-active", k === i); });
      dots.forEach(function (d, k) {
        stepFlag(d, "on", k === i);
        d.setAttribute("aria-current", k === i ? "step" : "false");
      });
      if (armed) tweenTo(RM_STEP_P[i], dur || RM_TWEEN);
    }

    /* snap position of card i as the scroll container sees it: card 0 sits at
       scrollLeft 0 because scroll-padding matches the track's own gutter */
    function pos(i) { return cards[i].offsetLeft - cards[0].offsetLeft; }

    function scrollToCard(i) {
      if (!cards[i]) return;
      syncing = true;
      if (track.scrollTo) track.scrollTo({ left: pos(i), behavior: "smooth" });
      else track.scrollLeft = pos(i);
      /* A smooth scroll on a nested scroller can be dropped when the page is
         scrolling underneath it — which is exactly what happens while the
         visitor is still travelling towards this section. If the track has
         not arrived by the time the animation should be over, put it there,
         so the card, the dot and the drawing can never disagree. */
      window.clearTimeout(landed);
      landed = window.setTimeout(function () {
        landed = null;
        if (idx === i && Math.abs(track.scrollLeft - pos(i)) > 4) track.scrollLeft = pos(i);
        syncing = false;
      }, 620);
    }

    function go(i, scroll) {
      mark(i);
      if (scroll) scrollToCard(i);
    }

    function queue(delay) {
      if (!auto) return;
      timer = window.setTimeout(function () {
        timer = null;
        if (!auto || idx >= cards.length - 1) return;
        go(idx + 1, true);
        queue();
      }, delay || (RM_TWEEN + RM_DWELL));
    }

    /* the card whose snap position is nearest the current scroll is current */
    function syncFromTrack() {
      if (syncing) return;
      var x = track.scrollLeft;
      var best = 0, bestD = Infinity, i, d;
      for (i = 0; i < cards.length; i++) {
        d = Math.abs(pos(i) - x);
        if (d < bestD) { bestD = d; best = i; }
      }
      mark(best);
    }

    var tick = false;
    track.addEventListener("scroll", function () {
      if (tick) return;
      tick = true;
      window.requestAnimationFrame(function () { tick = false; syncFromTrack(); });
    }, { passive: true });

    /* any touch on the track is the visitor taking over, permanently */
    track.addEventListener("pointerdown", stopAuto, { passive: true });
    track.addEventListener("touchstart", stopAuto, { passive: true });

    /* A viewport resize — an orientation change, or the mobile browser's
       chrome collapsing mid-scroll — makes a mandatory-snap container
       re-snap itself, and the scroll event that follows would otherwise be
       read as the visitor choosing a different stage and drag the drawing
       backwards. The stage that is currently selected is the truth: ignore
       the re-snap and hold the track to it. */
    var resizeT = null;
    function holdTrack() {
      if (idx >= 0 && Math.abs(track.scrollLeft - pos(idx)) > 4) track.scrollLeft = pos(idx);
    }
    window.addEventListener("resize", function () {
      syncing = true;
      /* immediately, so the re-snap is never even painted, and again once the
         resize has stopped, because a chrome collapse arrives as a burst */
      holdTrack();
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(function () {
        resizeT = null;
        holdTrack();
        syncing = false;
      }, 260);
    }, { passive: true });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { stopAuto(); go(i, true); });
    });

    mark(0);
    track.scrollLeft = 0;
    rmUpdate(0);
    /* the drawing stays an empty sheet until the box is actually on screen, so
       the plan draws itself in front of the visitor instead of having already
       been drawn while it was below the fold */
    playOnce(stage, 0.55, function () {
      armed = true;
      tweenTo(RM_STEP_P[0], RM_FIRST);
      queue(RM_FIRST + RM_DWELL);
    });
    return true;
  }

  /* ---------- HOW A PROJECT RUNS, ON A PHONE ----------
     Desktop scrubs the programme line across the seven phases as they pass.
     On a phone the list is a single column a screen and a half tall, so the
     meaning that carries is the same movement down the ladder: the rule
     draws itself once when the section arrives, and each phase marker lights
     as that phase comes on screen. Same .is-lit class the scrub drives. */
  function phaseStepsRun() {
    if (!phaseScene) return;
    playOnce(phaseScene, 0.05, function () {
      if (phaseRule) phaseRule.style.transform = "scaleX(1)";
    });
    if (!phaseNodes.length) return;
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        pio.unobserve(el);
        /* a short stagger off the phase's own index keeps the list reading as
           one movement down the programme rather than seven separate pops */
        var i = phaseNodes.indexOf(el);
        window.setTimeout(function () { el.classList.add("is-lit"); }, Math.min(i, 3) * 90);
      });
    }, { threshold: 0.34, rootMargin: "0px 0px -6% 0px" });
    phaseNodes.forEach(function (n) { pio.observe(n); });
  }

  /* ---------------- boot ---------------- */

  /* Phone: reading position selects the scene, time plays it. No pin, no
     scrub, no rAF loop against scrollY — see scripts/80-mobile-scenes.js. */
  if (stepsMode) {
    if (!rmStepsRun()) {
      /* the generated drawing and the model have drifted apart: put the
         finished drawing and the static stage list back rather than
         animating nonsense */
      if (rmWrap) rmWrap.classList.add("rm-fallback");
      if (rmInit()) { rmStaticFinal = true; rmUpdate(1); }
    }
    phaseStepsRun();
    heroIntro();
    return;
  }

  var sceneReady = rmInit();

  if (!sceneMode) {
    /* Reduced motion, small screens, or no rAF: paint the finished unit once
       and leave it. The stage list under the drawing carries the story. */
    rmStaticFinal = true;
    if (sceneReady) rmUpdate(1);
    phaseUpdate(1);
    if (heroEl) heroEl.classList.add("is-ready");
    window.addEventListener("resize", function () { if (sceneReady) rmUpdate(1); });
    return;
  }

  document.documentElement.classList.add("js-scenes");
  document.documentElement.classList.add("js-scene");

  addScene(sceneReady ? rmWrap : null, "pin", rmUpdate);
  addScene(phaseScene, "view", phaseUpdate);
  if (sceneReady) {
    rmBindStages(
      function () { return rmWrap.getBoundingClientRect().top + window.scrollY; },
      function () { return Math.max(1, rmWrap.offsetHeight - window.innerHeight); }
    );
  }

  measure();
  frame();
  heroIntro();

  window.addEventListener("scroll", queue, { passive: true });

  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      measure();
      scenes.forEach(function (s) { s.p = -1; });
      queue();
    }, 150);
  });
  /* re-measure once the webfonts and layout have settled */
  window.addEventListener("load", function () {
    measure();
    scenes.forEach(function (s) { s.p = -1; });
    queue();
  });
  setTimeout(function () { measure(); scenes.forEach(function (s) { s.p = -1; }); queue(); }, 900);
})();
