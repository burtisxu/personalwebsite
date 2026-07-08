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
      name: "Haolun Xu",
      title: "Examining how economic development is shaped.",
      bio: "I am a direct-entry PhD student in Economic History at the School of Economics, Renmin University of China. My research focuses on the short-term and long-term factors that determine a region's capacity for economic development. Recently, I have been investigating how migration and culture shape regional economic performance over both the short and long term.",
      avatar: "photo.jpg"
    },
    research: [
      { id: 1, title: "How Culture Shapes Regional Economic Performance", description: "" },
      { id: 2, title: "The Long-Term Mechanisms of Migration's Impact on Economic Performance", description: "" },
      { id: 3, title: "Historical Factors Shaping Criminal Behavior", description: "" }
    ],
    publications: [
      { id: 1, title: "How do health shocks affect household energy poverty?", authors: "Fan, W.; Xu, H.; Cheng, S.; Yang, F.", journal: "Energy Economics", year: "2025", link: "https://doi.org/10.1016/j.eneco.2025.108884", abstract: "", ssrn: "", fullText: "" },
      { id: 2, title: "Global intercountry croplands' greenhouse gas emissions differences and their potential drivers from economic levels perspective", authors: "Gao, M.; Xu, H.; Ma, M.; Gao, G.; Chen, X.; Chen, J.; Liu, X.; Qi, L.", journal: "Ecological Indicators", year: "2024", link: "https://doi.org/10.1016/j.ecolind.2024.112635", abstract: "", ssrn: "", fullText: "" }
    ],
    workingPapers: [
      { id: 1, title: "Firm Productivity", authors: "H.X. & C.C.", year: "2025", abstract: "", ssrn: "", fullText: "", link: "" },
      { id: 2, title: "Entrepreneurship", authors: "C.C. & H.X.", year: "2025", abstract: "", ssrn: "", fullText: "", link: "" },
      { id: 3, title: "Crime", authors: "S.S. & H.X.", year: "2026", abstract: "", ssrn: "", fullText: "", link: "" },
      { id: 4, title: "Intergenerational Educational Mobility", authors: "W.F., G.L., M.L., Y.S., Y.X., H.X., J.W.", year: "2025", abstract: "", ssrn: "", fullText: "", link: "" }
    ],
    workInProgress: [
      { id: 1, title: "Innovation Characteristics of Enterprises", description: "", status: "In Progress", coauthors: "S.S." },
      { id: 2, title: "Crime", description: "", status: "In Progress", coauthors: "S.S. & C.Y." },
      { id: 3, title: "Manufacturing Firm Productivity", description: "", status: "In Progress", coauthors: "" },
      { id: 4, title: "Knowledge", description: "", status: "In Progress", coauthors: "" },
      { id: 5, title: "Unintended Outcome of Public Policy", description: "", status: "In Progress", coauthors: "C.C. & S.F." }
    ],
    conferences: [
      { id: 1, title: "Firm Productivity", conference: "The 25th China Economics Annual Conference", location: "Shanghai, China", date: "2025", type: "Presentation" },
      { id: 2, title: "Firm Productivity", conference: "The 12th International Workshop on Regional, Urban, and Spatial Economics in China (RUSE)", location: "Wuhan, China", date: "2024", type: "Presentation" }
    ],
    education: [
      { id: 1, degree: "Ph.D. in Economic History", school: "Renmin University of China", year: "2025 –" },
      { id: 2, degree: "B.S. in Economics", school: "Southwestern University of Finance and Economics", year: "2021 – 2025" }
    ],
    contact: {
      email:   "haolun_xu@ruc.edu.cn",
      github:  "",
      scholar: ""
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
