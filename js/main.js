(function () {
  "use strict";

  var PREVIEW = /[?&]preview(=|&|$)/.test(location.search);

  // ---------- theme
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) toggle.addEventListener("click", function () {
    var dark = root.getAttribute("data-theme") === "dark" ||
      (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
    var next = dark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---------- mobile nav
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { navLinks.classList.remove("open"); navToggle.setAttribute("aria-expanded", "false"); }
    });
  }

  // ---------- year
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // ---------- projects
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function mediaNode(m) {
    var wrap = el("div", "project-media" + (m.contain ? " contain" : ""));
    var node;
    if (m.type === "video") {
      node = document.createElement("video");
      node.src = m.src;
      if (m.poster) node.poster = m.poster;
      node.muted = true; node.loop = true; node.playsInline = true; node.preload = "metadata";
      node.setAttribute("aria-label", m.alt || "");
      wrap.appendChild(el("span", "play", "▶ hover to play"));
      wrap.addEventListener("mouseenter", function () { node.play().catch(function () {}); });
      wrap.addEventListener("mouseleave", function () { node.pause(); });
    } else {
      node = document.createElement("img");
      node.src = m.src; node.alt = m.alt || ""; node.loading = "lazy";
    }
    wrap.appendChild(node);
    wrap.addEventListener("click", function () { openLightbox(m); });
    return wrap;
  }

  function projectCard(p) {
    var card = el("article", "project" + (p.featured ? " featured" : "") + (p.hidden ? " preview-only" : ""));
    card.id = "project-" + p.id;
    card.dataset.category = p.category || "";
    if (p.media) card.appendChild(mediaNode(p.media));

    var body = el("div", "project-body");
    body.appendChild(el("h3", null, p.title));
    if (p.period) body.appendChild(el("div", "period", p.period));
    if (p.tags && p.tags.length) {
      var chips = el("ul", "chips");
      p.tags.forEach(function (t) { chips.appendChild(el("li", null, t)); });
      body.appendChild(chips);
    }
    if (p.summary) body.appendChild(el("p", "summary", p.summary));
    if (p.bullets && p.bullets.length) {
      var ul = el("ul", "bullets");
      p.bullets.forEach(function (b) { ul.appendChild(el("li", null, b)); });
      body.appendChild(ul);
    }
    if (p.links && p.links.length) {
      var links = el("div", "links");
      p.links.forEach(function (l) {
        var a = el("a", null, l.label); a.href = l.href; a.rel = "noopener";
        links.appendChild(a);
      });
      body.appendChild(links);
    }
    card.appendChild(body);
    return card;
  }

  var grid = document.querySelector("[data-projects]");
  if (grid && window.PROJECTS) {
    window.PROJECTS.forEach(function (p) {
      if (p.hidden && !PREVIEW) return;
      grid.appendChild(projectCard(p));
    });
  }

  // ---------- filters: hide cards whose category doesn't match; first visible card is the spotlight
  var filterBar = document.querySelector("[data-filters]");
  var emptyNote = document.querySelector("[data-empty]");
  function applyFilter(cat) {
    var cards = grid ? Array.prototype.slice.call(grid.children) : [];
    var shown = 0;
    cards.forEach(function (c) {
      var hide = cat !== "all" && c.dataset.category !== cat;
      c.classList.toggle("is-hidden", hide);
      c.classList.remove("spotlight");
      if (!hide) shown++;
    });
    var first = cards.filter(function (c) { return !c.classList.contains("is-hidden"); })[0];
    if (first && first.querySelector(".project-media")) first.classList.add("spotlight");
    if (emptyNote) emptyNote.hidden = shown > 0;
  }
  if (filterBar) {
    filterBar.addEventListener("click", function (e) {
      var b = e.target.closest("[data-filter]");
      if (!b) return;
      filterBar.querySelectorAll("[data-filter]").forEach(function (x) {
        var on = x === b;
        x.classList.toggle("is-active", on);
        x.setAttribute("aria-pressed", String(on));
      });
      applyFilter(b.dataset.filter);
    });
  }
  applyFilter("all");

  // ---------- scroll-spy: underline the nav link of the section in view
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  var sections = navAnchors.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navAnchors.forEach(function (a) { a.classList.toggle("is-current", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---------- reveal on scroll
  var revealables = document.querySelectorAll(".section, .project, .facts li");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealables.forEach(function (n) { n.classList.add("reveal"); ro.observe(n); });
  }

  // ---------- copy email
  document.querySelectorAll("[data-copy]").forEach(function (b) {
    var label = b.textContent;
    b.addEventListener("click", function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(b.dataset.copy).then(function () {
        b.textContent = "Copied ✓";
        setTimeout(function () { b.textContent = label; }, 1600);
      });
    });
  });

  // ---------- lightbox
  var box = document.querySelector(".lightbox");
  var boxBody = box && box.querySelector(".lightbox-body");
  function openLightbox(m) {
    if (!box) return;
    boxBody.innerHTML = "";
    var node;
    if (m.type === "video") {
      node = document.createElement("video");
      node.src = m.src; node.controls = true; node.autoplay = true; node.loop = true; node.muted = true;
    } else {
      node = document.createElement("img"); node.src = m.src; node.alt = m.alt || "";
    }
    boxBody.appendChild(node);
    box.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    if (!box) return;
    box.hidden = true; boxBody.innerHTML = ""; document.body.style.overflow = "";
  }
  if (box) {
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lightbox-close")) closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
  }
})();
