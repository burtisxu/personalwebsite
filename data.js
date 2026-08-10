/* ─────────────────────────────────────────────
   data.js
   Shared data layer for Haolun Xu's academic site
   ───────────────────────────────────────────── */

(function () {

  "use strict";

  /*
   * Increment DATA_VERSION whenever you make a
   * substantial public-content update.
   *
   * This prevents stale LocalStorage content from
   * overriding newly deployed defaults.
   */
  const DATA_VERSION = "v3";
  const STORAGE_KEY = "siteData_" + DATA_VERSION;

  /* =========================================================
     Default public content
     ========================================================= */

  var DEFAULTS = {

    personal: {

      name: "Haolun Xu",

      title: "PhD Student in Economic History",

      bio:
        "I am a direct-entry PhD student in Economic History at the School of Economics, Renmin University of China. My research lies at the intersection of development economics and economic history, with a focus on how migration, culture, and historical shocks shape regional development, firm performance, and individual behavior over the long run.",

      avatar: "photo.jpg"

    },

    /* =======================================================
       Research Interests
       ======================================================= */

    research: [

      {
        id: 1,
        title: "Culture & Long-Run Development",
        description:
          "How culture and historical exposure shape economic behavior and regional performance."
      },

      {
        id: 2,
        title: "Migration & Regional Development",
        description:
          "How population reallocation affects labor markets, firms, and regional economic development."
      },

      {
        id: 3,
        title: "Economic History & Behavior",
        description:
          "The long-run effects of historical shocks on individual behavior and social outcomes."
      }

    ],

    /* =======================================================
       Publications
       ======================================================= */

    publications: [

      {
        id: 1,

        title:
          "How do health shocks affect household energy poverty?",

        authors:
          "Fan, W.; Xu, H.; Cheng, S.; Yang, F.",

        journal:
          "Energy Economics",

        year:
          "2025",

        link:
          "https://doi.org/10.1016/j.eneco.2025.108884",

        abstract: "",
        ssrn: "",
        fullText: ""
      },

      {
        id: 2,

        title:
          "Global intercountry croplands' greenhouse gas emissions differences and their potential drivers from economic levels perspective",

        authors:
          "Gao, M.; Xu, H.; Ma, M.; Gao, G.; Chen, X.; Chen, J.; Liu, X.; Qi, L.",

        journal:
          "Ecological Indicators",

        year:
          "2024",

        link:
          "https://doi.org/10.1016/j.ecolind.2024.112635",

        abstract: "",
        ssrn: "",
        fullText: ""
      }

    ],

    /* =======================================================
       Working Papers
       ======================================================= */

    workingPapers: [

      {
        id: 1,
        title: "Crime",
        authors: "S.S. & H.X.",
        year: "2026",
        abstract: "",
        ssrn: "",
        fullText: "",
        link: ""
      },

      {
        id: 2,
        title: "Firm Productivity",
        authors: "H.X. & C.C.",
        year: "2025",
        abstract: "",
        ssrn: "",
        fullText: "",
        link: ""
      },

      {
        id: 3,
        title: "Intergenerational Educational Mobility",
        authors: "W.F., G.L., M.L., Y.S., Y.X., H.X., J.W.",
        year: "2025",
        abstract: "",
        ssrn: "",
        fullText: "",
        link: ""
      }

    ],

    /* =======================================================
       Work in Progress
       ======================================================= */

    workInProgress: [

      {
        id: 1,
        title: "Innovation Characteristics of Enterprises",
        description: "",
        status: "In Progress",
        coauthors: "S.S."
      },

      {
        id: 2,
        title: "Crime",
        description: "",
        status: "In Progress",
        coauthors: "S.S. & C.Y."
      },

      {
        id: 3,
        title: "Manufacturing Firm Productivity",
        description: "",
        status: "In Progress",
        coauthors: ""
      },

      {
        id: 4,
        title: "Knowledge",
        description: "",
        status: "In Progress",
        coauthors: ""
      },

      {
        id: 5,
        title: "Unintended Outcome of Public Policy",
        description: "",
        status: "In Progress",
        coauthors: "C.C. & S.F."
      },

      {
        id: 6,
        title: "Law Economics",
        description: "",
        status: "In Progress",
        coauthors: ""
      }

    ],

    /* =======================================================
       Conferences
       ======================================================= */

    conferences: [

      {
        id: 1,

        title:
          "Firm Productivity",

        conference:
          "The 25th China Economics Annual Conference",

        location:
          "Shanghai, China",

        date:
          "2025",

        type:
          "Presentation"
      },

      {
        id: 2,

        title:
          "Firm Productivity",

        conference:
          "The 12th International Workshop on Regional, Urban, and Spatial Economics in China (RUSE)",

        location:
          "Wuhan, China",

        date:
          "2024",

        type:
          "Presentation"
      }

    ],

    /* =======================================================
       Education
       ======================================================= */

    education: [

      {
        id: 1,

        degree:
          "Ph.D. in Economic History",

        school:
          "Renmin University of China",

        year:
          "2025–Present"
      },

      {
        id: 2,

        degree:
          "B.S. in Economics",

        school:
          "Southwestern University of Finance and Economics",

        year:
          "2021–2025"
      }

    ],

    /* =======================================================
       Contact
       ======================================================= */

    contact: {

      email:
        "haolun_xu@ruc.edu.cn",

      cv:
        "",

      github:
        "",

      scholar:
        ""

    }

  };

  /* =========================================================
     Public API
     ========================================================= */

  window.loadSiteData = function () {

    try {

      var raw =
        localStorage.getItem(STORAGE_KEY);

      if (raw) {

        var parsed =
          JSON.parse(raw);

        return deepMerge(
          DEFAULTS,
          parsed
        );

      }

    } catch (e) {

      /*
       * Invalid or unavailable storage:
       * silently fall back to deployed defaults.
       */

    }

    return deepClone(DEFAULTS);

  };


  window.saveSiteData = function (data) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

      return true;

    } catch (e) {

      return false;

    }

  };


  window.resetSiteData = function () {

    try {

      localStorage.removeItem(
        STORAGE_KEY
      );

    } catch (e) {}

    return deepClone(DEFAULTS);

  };


  window.getDefaults = function () {

    return deepClone(DEFAULTS);

  };


  /* =========================================================
     Helpers
     ========================================================= */

  function deepClone(obj) {

    return JSON.parse(
      JSON.stringify(obj)
    );

  }


  function deepMerge(base, override) {

    var out =
      deepClone(base);

    if (!override ||
        typeof override !== "object") {

      return out;

    }

    Object.keys(override).forEach(
      function (key) {

        if (
          override[key] !== undefined
        ) {

          out[key] =
            override[key];

        }

      }
    );

    return out;

  }

})();
