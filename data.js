/* ───────────────────────────────────
   data.js — Shared data layer for the
   personal academic website.
   Uses LocalStorage for persistence.
   ─────────────────────────────────── */

(function () {
  const STORAGE_KEY = "siteData";

  /* ── Default content ─────────────── */
  var DEFAULTS = {
    personal: {
      name: "Hao Xu",
      title: "AI for Science & Computational Mechanics",
      bio:   "Researcher focused on the intersection of artificial intelligence and scientific computing.",
      avatar: ""
    },
    research: [
      { id: 1, title: "AI for Science",        description: "Leveraging deep learning and foundation models to accelerate scientific discovery, from molecular dynamics to PDE solving." },
      { id: 2, title: "Computational Mechanics", description: "Developing high-performance numerical methods for multiphysics simulations, with a focus on finite element and meshfree methods." },
      { id: 3, title: "Scientific Machine Learning", description: "Bridging physics-based models with data-driven approaches to build robust, interpretable, and generalizable surrogates." }
    ],
    publications: [
      { id: 1, title: "A Deep Learning Framework for Multiscale PDE Solving", authors: "Xu H., Li J., Zhang W.", journal: "Journal of Computational Physics", year: "2024", link: "https://doi.org/10.xxxx/example", abstract: "", ssrn: "", fullText: "" },
      { id: 2, title: "Physics-Informed Neural Operators for Solid Mechanics", authors: "Xu H., Wang Y.", journal: "Computer Methods in Applied Mechanics", year: "2023", link: "https://doi.org/10.xxxx/example", abstract: "We propose a physics-informed neural operator framework for modeling complex solid mechanics problems.", ssrn: "", fullText: "" }
    ],
    workingPapers: [
      { id: 1, title: "Causal Inference with Deep Instrumental Variables", authors: "Xu H., Chen L.", year: "2024", abstract: "We develop a novel framework combining deep learning with instrumental variable methods for causal inference in high-dimensional settings.", ssrn: "https://papers.ssrn.com/abstract=xxxx", fullText: "" },
      { id: 2, title: "Robust Policy Learning under Unobserved Confounding", authors: "Xu H.", year: "2025", abstract: "", ssrn: "", fullText: "" }
    ],
    workInProgress: [
      { id: 1, title: "Foundation Models for Multiphysics Discovery", description: "Building large-scale pretrained models for coupled physics systems across scales.", status: "In Progress" },
      { id: 2, title: "Uncertainty Quantification in Scientific ML", description: "Developing rigorous uncertainty bounds for neural operator predictions.", status: "Writing" }
    ],
    conferences: [
      { id: 1, title: "Deep Learning for Multiscale PDE Solving", conference: "NeurIPS", location: "Vancouver, Canada", date: "2024", type: "Presentation" },
      { id: 2, title: "Physics-Informed Neural Operators", conference: "WCCM", location: "Paris, France", date: "2024", type: "Presentation" },
      { id: 3, title: "Machine Learning for Computational Science", conference: "ICML Workshop", location: "Honolulu, USA", date: "2023", type: "Poster" }
    ],
    education: [
      { id: 1, degree: "Ph.D. in Engineering Mechanics", school: "Tsinghua University",     year: "2020 – 2024" },
      { id: 2, degree: "M.S. in Computational Science",  school: "Peking University",        year: "2017 – 2020" },
      { id: 3, degree: "B.S. in Engineering",            school: "Zhejiang University",      year: "2013 – 2017" }
    ],
    contact: {
      email:   "haoxu@example.edu",
      github:  "https://github.com/haoxu",
      scholar: "https://scholar.google.com/citations?user=USER_ID"
    }
  };

  /* ── Public API ───────────────────── */
  window.loadSiteData = function () {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return deepMerge(DEFAULTS, parsed);
      }
    } catch (e) { /* corrupted data – fall through to defaults */ }
    return deepClone(DEFAULTS);
  };

  window.saveSiteData = function (data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;  // quota exceeded or storage unavailable
    }
  };

  window.resetSiteData = function () {
    localStorage.removeItem(STORAGE_KEY);
    return deepClone(DEFAULTS);
  };

  window.getDefaults = function () {
    return deepClone(DEFAULTS);
  };

  /* ── Helpers ──────────────────────── */
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function deepMerge(base, override) {
    var out = deepClone(base);
    for (var key in override) {
      if (override.hasOwnProperty(key)) {
        out[key] = override[key];
      }
    }
    return out;
  }

})();
