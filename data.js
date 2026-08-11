/* ─────────────────────────────────────────────
   data.js
   Shared data layer for Haolun Xu's academic site
   ───────────────────────────────────────────── */

(function () {

  "use strict";

  /*
   * IMPORTANT:
   * Increment DATA_VERSION whenever the public
   * data structure changes substantially.
   *
   * v5 adds structured research-project data.
   */
  const DATA_VERSION = "v5";
  const STORAGE_KEY = "siteData_" + DATA_VERSION;


  /* =========================================================
     Default public content
     ========================================================= */

  var DEFAULTS = {

    /* =======================================================
       Personal
       ======================================================= */

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

        title:
          "Culture & Long-Run Development",

        description:
          "How culture and historical exposure shape economic behavior and regional performance."
      },

      {
        id: 2,

        title:
          "Migration & Regional Development",

        description:
          "How population reallocation affects labor markets, firms, and regional economic development."
      },

      {
        id: 3,

        title:
          "Economic History & Behavior",

        description:
          "The long-run effects of historical shocks on individual behavior and social outcomes."
      }

    ],


    /* =======================================================
       Working Papers

       Author structure:

       {
         name: "Author Name",
         url: "https://homepage.com/",
         self: false
       }

       For yourself:
       {
         name: "H.X.",
         self: true
       }

       If url is empty, the author is rendered as plain text.
       ======================================================= */

    workingPapers: [

      {
        id: 1,

        title: "Crime",

        authors: [

          {
            name: "S.S.",
            url: "http://econ.ruc.edu.cn/jszy/38e856abc20543fe9cf22f0699aaf73a.htm"
          },

          {
            name: "H.X.",
            self: true
          }

        ],

        year: "2026",

        abstract: "",

        ssrn: "",

        fullText: "",

        link: ""
      },


      {
        id: 2,

        title: "Firm Productivity",

        authors: [

          {
            name: "H.X.",
            self: true
          },

          {
            name: "C.C.",
            url: "https://chenxuanchen-econ.github.io/research.html"
          }

        ],

        year: "2025",

        abstract: "",

        ssrn: "",

        fullText: "",

        link: ""
      },


      {
        id: 3,

        title:
          "Intergenerational Educational Mobility",

        authors: [

          {
            name: "W.F.",
            url: ""
          },

          {
            name: "G.L.",
            url: ""
          },

          {
            name: "M.L.",
            url: ""
          },

          {
            name: "Y.S.",
            url: ""
          },

          {
            name: "Y.X.",
            url: ""
          },

          {
            name: "H.X.",
            self: true
          },

          {
            name: "J.W.",
            url: ""
          }

        ],

        year: "2025",

        abstract: "",

        ssrn: "",

        fullText: "",

        link: ""
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

        authors: [

          {
            name: "Fan, W.",
            url: ""
          },

          {
            name: "Xu, H.",
            self: true
          },

          {
            name: "Cheng, S.",
            url: ""
          },

          {
            name: "Yang, F.",
            url: ""
          }

        ],

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

        authors: [

          {
            name: "Gao, M.",
            url: ""
          },

          {
            name: "Xu, H.",
            self: true
          },

          {
            name: "Ma, M.",
            url: ""
          },

          {
            name: "Gao, G.",
            url: ""
          },

          {
            name: "Chen, X.",
            url: ""
          },

          {
            name: "Chen, J.",
            url: ""
          },

          {
            name: "Liu, X.",
            url: ""
          },

          {
            name: "Qi, L.",
            url: ""
          }

        ],

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
       Work in Progress

       Only coauthors are listed here because the website
       already makes clear that these are Haolun Xu's projects.
       ======================================================= */

    workInProgress: [

      {
        id: 1,

        title:
          "Innovation Characteristics of Enterprises",

        description: "",

        status:
          "In Progress",

        coauthors: [

          {
            name: "S.S.",
            url: "http://econ.ruc.edu.cn/jszy/38e856abc20543fe9cf22f0699aaf73a.htm"
          }

        ]
      },


      {
        id: 2,

        title:
          "Crime",

        description: "",

        status:
          "In Progress",

        coauthors: [

          {
            name: "S.S.",
            url: "http://econ.ruc.edu.cn/jszy/38e856abc20543fe9cf22f0699aaf73a.htm"
          },

          {
            name: "C.Y.",
            url: ""
          }

        ]
      },


      {
        id: 3,

        title:
          "Manufacturing Firm Productivity",

        description: "",

        status:
          "In Progress",

        coauthors: []
      },


      {
        id: 4,

        title:
          "Knowledge",

        description: "",

        status:
          "In Progress",

        coauthors: []
      },


      {
        id: 5,

        title:
          "Unintended Outcome of Public Policy",

        description: "",

        status:
          "In Progress",

        coauthors: [

          {
            name: "C.C.",
            url: "https://chenxuanchen-econ.github.io/research.html"
          },

          {
            name: "S.F.",
            url: "https://fansiyuan.weebly.com"
          }

        ]
      },


      {
        id: 6,

        title:
          "Law and Economics",

        description: "",

        status:
          "In Progress",

        coauthors: []
      }

    ],


    /* =======================================================
       Research Projects
       ======================================================= */

    researchProjects: [

      {
        id: 1,
         title:
          "Empowering Rural Revitalization through County-Level Converged Media in the Internet Era: Mechanism Evolution, Governance Effectiveness, and Practical Pathways",

        funder:
          "Renmin University of China “Qiushi Academic–Dongliang” Brand Research Project",

        year:
          "2026",

        projectNo:
          "",

        role:
          "Key Participant"
        
      },


      {
        id: 2,

         title:
          "Theoretical Framework and Implementation Pathways for Coordinating New Industrialization, New Urbanization, and Comprehensive Rural Revitalization",

        funder:
          "National Social Science Fund of China, Major Special Project",

        year:
          "2025",

        projectNo:
          "24ZDA046",

        role:
          "Participant"
      },


      {
        id: 3,
          title:
          "Satellite Remote Sensing for Advancing China’s Dual-Carbon Goals: Data Measurement, Spatiotemporal Differentiation, and Evolution Pathways",

        funder:
          "Humanities and Social Sciences Research Project, Ministry of Education of China",

        year:
          "2022",

        projectNo:
          "22YJC790025",

        role:
          "Participant"
        
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

      /*
       * Example:
       * cv: "cv.pdf"
       */
      cv: "",

      github: "",

      scholar: "",

      orcid:
        "https://orcid.org/my-orcid?orcid=0009-0003-4418-6177"

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
       * Corrupted or unavailable storage.
       * Fall back to deployed defaults.
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

    } catch (e) {

      /* Ignore storage errors */

    }

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


    if (
      !override ||
      typeof override !== "object"
    ) {

      return out;

    }


    Object.keys(
      override
    ).forEach(
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
