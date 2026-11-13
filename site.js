(function () {

    "use strict";

    // Keep links to sections of the former single-page site working.
    var legacySections = {
      "#dissertation": "research.html", "#working-papers": "research.html",
      "#publications": "research.html", "#work-in-progress": "research.html",
      "#research-projects": "research.html", "#conferences": "activities.html",
      "#honors-awards": "activities.html", "#paper-slides": "slides.html"
    };
    if ((window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html")) && legacySections[window.location.hash]) {
      window.location.replace(legacySections[window.location.hash] + window.location.search + window.location.hash);
      return;
    }

    /* =======================================================
       Load Data
       ======================================================= */

    var data =
      window.loadSiteData();

    /* =======================================================
       Helpers
       ======================================================= */

    function escHTML(value) {

      var div =
        document.createElement("div");

      div.textContent =
        value == null
          ? ""
          : String(value);

      return div.innerHTML;

    }

    function escAttr(value) {

      return String(
        value == null
          ? ""
          : value
      )
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    }

    function setExternalLink(
      element,
      href
    ) {

      element.href =
        href;

      element.target =
        "_blank";

      element.rel =
        "noopener noreferrer";

    }

    /* =======================================================
       Author Renderer
       ======================================================= */

    function renderAuthors(
      authors,
      separator
    ) {

      if (!authors) {
        return "";
      }

      if (
        typeof authors === "string"
      ) {

        return escHTML(
          authors
        );

      }

      if (
        !Array.isArray(authors) ||
        authors.length === 0
      ) {

        return "";

      }

      separator =
        separator || " & ";

      return authors
        .map(
          function (author) {

            var name =
              escHTML(
                author.name || ""
              );

            if (
              author.self
            ) {

              return (
                '<strong class="author-self">' +
                name +
                "</strong>"
              );

            }

            if (
              author.url
            ) {

              return (
                '<a href="' +
                escAttr(author.url) +
                '" target="_blank"' +
                ' rel="noopener noreferrer"' +
                ' class="author-link">' +
                name +
                "</a>"
              );

            }

            return name;

          }
        )
        .join(separator);

    }

    /* =======================================================
       Navigation
       ======================================================= */

    document.getElementById(
      "navName"
    ).textContent =
      data.personal.name;

    if (document.getElementById("hero")) {

    /* =======================================================
       Hero
       ======================================================= */

    document.getElementById(
      "heroName"
    ).textContent =
      data.personal.name;

    document.getElementById(
      "heroTitle"
    ).textContent =
      data.personal.title || "";

    var affiliation =
      document.getElementById(
        "heroAffiliation"
      );

    if (
      data.education &&
      data.education.length > 0
    ) {

      affiliation.textContent =
        data.education[0].school || "";

    }

    document.getElementById(
      "heroBio"
    ).textContent =
      data.personal.bio || "";

    /* =======================================================
       Hero Image
       ======================================================= */

    var heroAvatar =
      document.getElementById(
        "heroAvatar"
      );

    if (
      data.personal.avatar
    ) {

      heroAvatar.src =
        data.personal.avatar;

      heroAvatar.alt =
        "Portrait of " +
        data.personal.name;

    } else {

      heroAvatar.parentElement.style.display =
        "none";

    }

    }

    /* =======================================================
       Contact Data
       ======================================================= */

    var contact =
      data.contact || {};

    /* =======================================================
       Structured Data: sameAs

       Automatically adds:
       - ORCID
       - Google Scholar
       - GitHub
       ======================================================= */

    updateStructuredData();

    function updateStructuredData() {

      var schemaElement =
        document.getElementById(
          "siteStructuredData"
        );

      if (!schemaElement) {
        return;
      }

      try {

        var schema =
          JSON.parse(
            schemaElement.textContent
          );

        var person =
          schema["@graph"].find(
            function (entry) {

              return (
                entry["@type"] ===
                "Person"
              );

            }
          );

        if (!person) {
          return;
        }

        var sameAs =
          [];

        if (
          contact.orcid
        ) {

          sameAs.push(
            contact.orcid
          );

        }

        if (
          contact.scholar
        ) {

          sameAs.push(
            contact.scholar
          );

        }

        if (
          contact.github
        ) {

          sameAs.push(
            contact.github
          );

        }

        if (
          sameAs.length > 0
        ) {

          person.sameAs =
            sameAs;

        }

        schemaElement.textContent =
          JSON.stringify(
            schema
          );

      } catch (error) {

        /*
         * If structured data cannot be updated,
         * leave the original schema untouched.
         */

      }

    }

    if (document.getElementById("hero")) {

    /* =======================================================
       Hero Links
       ======================================================= */

    var heroLinks =
      document.querySelector(
        ".hero-links"
      );

    var hasHeroLink =
      false;

    /* CV */

    var cvLink =
      document.getElementById(
        "cvLink"
      );

    if (
      contact.cv
    ) {

      cvLink.href =
        contact.cv;

      cvLink.hidden =
        false;

      hasHeroLink =
        true;

    }

    /* Email */

    var emailLink =
      document.getElementById(
        "emailLink"
      );

    if (
      contact.email
    ) {

      emailLink.href =
        "mailto:" +
        contact.email;

      emailLink.hidden =
        false;

      hasHeroLink =
        true;

    } else {

      emailLink.hidden =
        true;

    }

    /* Google Scholar */

    var scholarLink =
      document.getElementById(
        "scholarLink"
      );

    if (
      contact.scholar
    ) {

      setExternalLink(
        scholarLink,
        contact.scholar
      );

      scholarLink.hidden =
        false;

      hasHeroLink =
        true;

    }

    /* ORCID */

    var orcidLink =
      document.getElementById(
        "orcidLink"
      );

    if (
      contact.orcid
    ) {

      setExternalLink(
        orcidLink,
        contact.orcid
      );

      orcidLink.hidden =
        false;

      hasHeroLink =
        true;

    }

    if (
      !hasHeroLink
    ) {

      heroLinks.style.display =
        "none";

    }

    }

    if (document.getElementById("research")) {
      document.getElementById("researchList").replaceChildren();
    /* =======================================================
       Research Interests
       ======================================================= */

    var researchList =
      document.getElementById(
        "researchList"
      );

    var researchItems =
      data.research || [];

    if (
      researchItems.length === 0
    ) {

      document.getElementById(
        "research"
      ).style.display =
        "none";

    } else {

      researchItems.forEach(
        function (research) {

          var card =
            document.createElement(
              "article"
            );

          card.className =
            "research-card";

          var title =
            document.createElement(
              "h3"
            );

          title.className =
            "research-card-title";

          title.textContent =
            research.title || "";

          card.appendChild(
            title
          );

          if (
            research.description
          ) {

            var description =
              document.createElement(
                "div"
              );

            description.className =
              "research-card-desc";

            description.textContent =
              research.description;

            card.appendChild(
              description
            );

          }

          researchList.appendChild(
            card
          );

        }
      );

    }

    }

    if (document.getElementById("dissertation")) {
      document.getElementById("dissertationMilestones").replaceChildren();
      document.getElementById("dissertationChapterList").replaceChildren();
    /* =======================================================
       PhD Dissertation
       ======================================================= */

    var dissertation = data.dissertation || {};

    function dissertationText(value) {
      return String(value == null ? "" : value).trim();
    }

    function dissertationURL(value) {
      var href = dissertationText(value);
      if (!href) return "";

      try {
        var url = new URL(href, window.location.href);
        return /^(https?:|file:)$/.test(url.protocol) ? url.href : "";
      } catch (e) {
        return "";
      }
    }

    var dissertationTopic = document.getElementById("dissertationTopic");
    var dissertationTopicText = dissertationText(dissertation.topic || dissertation.title);
    dissertationTopic.textContent = dissertationTopicText
      ? "Topic: " + dissertationTopicText : "Topic to come";
    dissertationTopic.classList.toggle("is-placeholder", !dissertationTopicText);

    document.getElementById("dissertationStatus").textContent =
      dissertationText(dissertation.status) || "Details to come";

    var dissertationSummary = document.getElementById("dissertationSummary");
    dissertationSummary.textContent = dissertationText(dissertation.summary);
    dissertationSummary.hidden = !dissertationSummary.textContent;

    var milestoneList = document.getElementById("dissertationMilestones");
    var milestones = Array.isArray(dissertation.milestones)
      ? dissertation.milestones.filter(function (step) {
          return step && dissertationText(step.label);
        })
      : [];

    milestoneList.hidden = !milestones.length;
    milestoneList.style.setProperty("--milestone-count", milestones.length || 5);

    milestones.forEach(function (step, index) {
      var item = document.createElement("li");
      var state = step.status === "done" || step.status === "current" || step.status === "pending"
        ? step.status : "";
      var label = dissertationText(step.label);
      var stateLabel = state === "done" ? "Completed"
        : state === "current" ? "In progress"
        : state === "pending" ? "Not completed" : "Not yet updated";

      item.className = "dissertation-step" + (state ? " is-" + state : "");
      item.setAttribute("aria-label", label + ": " + stateLabel);
      item.title = label + ": " + stateLabel;
      item.innerHTML =
        '<span class="dissertation-step-index" aria-hidden="true">' +
          (state === "done" ? "&#10003;" : index + 1) +
        '</span><span class="dissertation-step-label">' +
          escHTML(label) +
        '</span>';
      milestoneList.appendChild(item);
    });

    var chapters = Array.isArray(dissertation.chapters)
      ? dissertation.chapters.filter(function (chapter) {
          return chapter && dissertationText(chapter.title);
        })
      : [];

    var chapterDetails = document.getElementById("dissertationChapters");
    chapterDetails.hidden = !chapters.length;
    document.getElementById("dissertationChaptersLabel").textContent =
      "Chapters (" + chapters.length + ")";

    chapters.forEach(function (chapter) {
      var item = document.createElement("li");
      var href = dissertationURL(chapter.link);
      var title = document.createElement(href ? "a" : "span");
      title.textContent = dissertationText(chapter.title);
      if (href) setExternalLink(title, href);
      item.appendChild(title);

      if (dissertationText(chapter.status)) {
        var status = document.createElement("span");
        status.className = "dissertation-chapter-status";
        status.textContent = dissertationText(chapter.status);
        item.appendChild(status);
      }

      document.getElementById("dissertationChapterList").appendChild(item);
    });

    var updateParts = [];
    if (dissertationText(dissertation.updated)) {
      updateParts.push("Updated " + dissertationText(dissertation.updated));
    }
    if (dissertationText(dissertation.latestUpdate)) {
      updateParts.push(dissertationText(dissertation.latestUpdate));
    }

    var dissertationUpdate = document.getElementById("dissertationUpdate");
    dissertationUpdate.textContent = updateParts.join(" · ");
    dissertationUpdate.hidden = !updateParts.length;

    var dissertationLink = document.getElementById("dissertationLink");
    var dissertationHref = dissertationURL(dissertation.link);
    dissertationLink.hidden = !dissertationHref;
    if (dissertationHref) setExternalLink(dissertationLink, dissertationHref);

    }

    if (document.getElementById("working-papers")) {
      document.getElementById("wpList").replaceChildren();
    /* =======================================================
       Working Papers
       ======================================================= */

    renderWorkingPapers(
      "wpList",
      data.workingPapers || []
    );

    }

    if (document.getElementById("publications")) {
      document.getElementById("pubList").replaceChildren();
    /* =======================================================
       Publications
       ======================================================= */

    renderPublications(
      "pubList",
      data.publications || []
    );

    }

    if (document.getElementById("work-in-progress")) {
      document.getElementById("wipGrid").replaceChildren();
    /* =======================================================
       Work in Progress
       ======================================================= */

    var wipSection =
      document.getElementById(
        "work-in-progress"
      );

    var wipGrid =
      document.getElementById(
        "wipGrid"
      );

    var wipItems =
      data.workInProgress || [];

    if (
      wipItems.length === 0
    ) {

      wipSection.style.display =
        "none";

    } else {

      wipItems.forEach(
        function (wip) {

          var item =
            document.createElement(
              "article"
            );

          item.className =
            "wip-item-simple";

          var title =
            document.createElement(
              "h3"
            );

          title.className =
            "wip-item-title";

          title.textContent =
            wip.title || "";

          item.appendChild(
            title
          );

          var renderedCoauthors =
            renderAuthors(
              wip.coauthors,
              " & "
            );

          if (
            renderedCoauthors
          ) {

            var coauthors =
              document.createElement(
                "div"
              );

            coauthors.className =
              "wip-item-coauthors";

            coauthors.innerHTML =
              "with " +
              renderedCoauthors;

            item.appendChild(
              coauthors
            );

          }

          wipGrid.appendChild(
            item
          );

        }
      );

    }

    }

    if (document.getElementById("research-projects")) {
      document.getElementById("projectList").replaceChildren();
    /* =======================================================
       Research Projects
       ======================================================= */

    var projectSection =
      document.getElementById(
        "research-projects"
      );

    var projectList =
      document.getElementById(
        "projectList"
      );

    var researchProjects =
      data.researchProjects || [];

    if (
      researchProjects.length === 0
    ) {

      projectSection.style.display =
        "none";

    } else {

      researchProjects.forEach(
        function (project) {

          var item =
            document.createElement(
              "article"
            );

          item.className =
            "project-item";

          var heading =
            document.createElement(
              "div"
            );

          heading.className =
            "project-heading";

          var title =
            document.createElement(
              "h3"
            );

          title.className =
            "project-title";

          title.textContent =
            project.title || "";

          heading.appendChild(
            title
          );

          if (
            project.year
          ) {

            var year =
              document.createElement(
                "div"
              );

            year.className =
              "project-year";

            year.textContent =
              project.year;

            heading.appendChild(
              year
            );

          }

          item.appendChild(
            heading
          );

          var metaParts = [];

          if (
            project.role
          ) {

            metaParts.push(
              project.role
            );

          }

          if (
            project.funder
          ) {

            metaParts.push(
              project.funder
            );

          }

          if (
            project.projectNo
          ) {

            metaParts.push(
              "Project No. " +
              project.projectNo
            );

          }

          if (
            metaParts.length
          ) {

            var meta =
              document.createElement(
                "div"
              );

            meta.className =
              "project-meta";

            meta.textContent =
              metaParts.join(" · ");

            item.appendChild(
              meta
            );

          }

          projectList.appendChild(
            item
          );

        }
      );

    }

    }

    if (document.getElementById("honors-awards")) {
      document.getElementById("honorsList").replaceChildren();
    /* =======================================================
       Honors & Awards
       One year label per group, with each award on its own line.
       ======================================================= */

    var honorsSection = document.getElementById("honors-awards");
    var honorsList = document.getElementById("honorsList");
    var honorsByYear = Object.create(null);

    (data.honorsAwards || []).forEach(function (award) {
      if (!award || !String(award.title || "").trim()) return;
      var year = String(award.year || "").trim();
      if (!honorsByYear[year]) honorsByYear[year] = [];
      honorsByYear[year].push(award);
    });

    var honorsYears = Object.keys(honorsByYear).sort(function (a, b) {
      return (parseInt(b, 10) || 0) - (parseInt(a, 10) || 0);
    });

    if (honorsYears.length === 0) {
      honorsSection.style.display = "none";
      var honorsJump = document.querySelector('a[href="#honors-awards"]');
      if (honorsJump) honorsJump.hidden = true;
    } else {
      honorsYears.forEach(function (year) {
        var row = document.createElement("div");
        row.className = "honors-row";

        var yearLabel = document.createElement("div");
        yearLabel.className = "honors-year";
        yearLabel.textContent = year;
        row.appendChild(yearLabel);

        var content = document.createElement("p");
        content.className = "honors-content";

        honorsByYear[year].forEach(function (award, index) {
          if (index > 0) {
            content.appendChild(document.createElement("br"));
          }

          var hasLink = /^https?:\/\//i.test(award.url || "");
          var name = document.createElement(hasLink ? "a" : "span");
          name.className = "honors-name";
          name.textContent = award.title;

          if (hasLink) {
            setExternalLink(name, award.url);
          }

          content.appendChild(name);

          if (award.institution) {
            var institution = document.createElement("span");
            institution.className = "honors-institution";
            institution.textContent = " (" + award.institution + ")";
            content.appendChild(institution);
          }
        });

        row.appendChild(content);
        honorsList.appendChild(row);
      });
    }

    }

    if (document.getElementById("conferences")) {
      document.getElementById("confList").replaceChildren();
    /* =======================================================
       Conferences
       ======================================================= */

    var confSection =
      document.getElementById(
        "conferences"
      );

    var confList =
      document.getElementById(
        "confList"
      );

    var conferences =
      data.conferences || [];

    if (
      conferences.length === 0
    ) {

      confSection.style.display =
        "none";

    } else {

      conferences.forEach(
        function (conf) {

          var item =
            document.createElement(
              "div"
            );

          item.className =
            "conf-item";

          var date = String(conf.year || conf.date || "");
          var year = date.match(/\b\d{4}\b/);

          item.innerHTML =
            '<div class="conf-year">' +
              escHTML(year ? year[0] : "") +
            "</div>" +
            '<div class="conf-content">' +
              '<span class="conf-title">' +
                escHTML(conf.conference || "") +
              "</span>" +
            "</div>";

          confList.appendChild(
            item
          );

        }
      );

    }

    }

    if (document.getElementById("education")) {
      document.getElementById("eduList").replaceChildren();
    /* =======================================================
       Education
       ======================================================= */

    var educationSection =
      document.getElementById(
        "education"
      );

    var educationList =
      document.getElementById(
        "eduList"
      );

    var education =
      data.education || [];

    if (
      education.length === 0
    ) {

      educationSection.style.display =
        "none";

    } else {

      education.forEach(
        function (entry) {

          var item =
            document.createElement(
              "div"
            );

          item.className =
            "edu-item";

          item.innerHTML =

            '<span class="edu-school">' +

              escHTML(
                entry.school || ""
              ) +

            "</span>" +

            " &mdash; " +

            '<span class="edu-degree">' +

              escHTML(
                entry.degree || ""
              ) +

            "</span>" +

            (
              entry.year

                ? ', <span class="edu-year">' +
                  escHTML(
                    entry.year
                  ) +
                  "</span>"

                : ""
            );

          educationList.appendChild(
            item
          );

        }
      );

    }

    }

    if (document.getElementById("contact")) {
      document.getElementById("contactLinks").replaceChildren();
    /* =======================================================
       Contact
       ======================================================= */

    var contactSection =
      document.getElementById(
        "contact"
      );

    var contactLinks =
      document.getElementById(
        "contactLinks"
      );

    var hasContact =
      false;

    /* Email */

    if (
      contact.email
    ) {

      var email =
        document.createElement(
          "a"
        );

      email.className =
        "contact-link";

      email.href =
        "mailto:" +
        contact.email;

      email.textContent =
        contact.email;

      contactLinks.appendChild(
        email
      );

      hasContact =
        true;

    }

    /* GitHub */

    if (
      contact.github
    ) {

      var github =
        document.createElement(
          "a"
        );

      github.className =
        "contact-link";

      github.textContent =
        "GitHub";

      setExternalLink(
        github,
        contact.github
      );

      contactLinks.appendChild(
        github
      );

      hasContact =
        true;

    }

    /* Google Scholar */

    if (
      contact.scholar
    ) {

      var scholar =
        document.createElement(
          "a"
        );

      scholar.className =
        "contact-link";

      scholar.textContent =
        "Google Scholar";

      setExternalLink(
        scholar,
        contact.scholar
      );

      contactLinks.appendChild(
        scholar
      );

      hasContact =
        true;

    }

    /* ORCID */

    if (
      contact.orcid
    ) {

      var orcid =
        document.createElement(
          "a"
        );

      orcid.className =
        "contact-link";

      orcid.textContent =
        "ORCID";

      setExternalLink(
        orcid,
        contact.orcid
      );

      contactLinks.appendChild(
        orcid
      );

      hasContact =
        true;

    }

    if (
      !hasContact
    ) {

      contactSection.style.display =
        "none";

    }

    }

    document.querySelectorAll("[data-cv-link]").forEach(function (link) {
      link.hidden = !contact.cv;
      if (contact.cv) link.href = contact.cv;
    });

    /* =======================================================
       Footer
       ======================================================= */

    document.getElementById(
      "footerYear"
    ).textContent =
      new Date().getFullYear();

    document.getElementById(
      "footerName"
    ).textContent =
      data.personal.name;

    /* =======================================================
       Working Papers Renderer
       ======================================================= */

    function renderWorkingPapers(
      listId,
      items
    ) {

      var list =
        document.getElementById(
          listId
        );

      var section =
        document.getElementById(
          "working-papers"
        );

      if (
        !items.length
      ) {

        if (section) {

          section.style.display =
            "none";

        }

        return;

      }

      items.forEach(
        function (paper, index) {

          var article =
            document.createElement(
              "article"
            );

          article.className =
            "wp-item";

          var titleHTML =

            paper.link

              ? '<a href="' +
                escAttr(
                  paper.link
                ) +
                '" target="_blank"' +
                ' rel="noopener noreferrer">' +
                escHTML(
                  paper.title
                ) +
                "</a>"

              : escHTML(
                  paper.title
                );

          var renderedAuthors =
            renderAuthors(
              paper.authors,
              " & "
            );

          var hasAbstract =

            paper.abstract &&
            paper.abstract
              .trim()
              .length > 0;

          var hasLinks =

            paper.link ||
            paper.ssrn ||
            paper.fullText;

          var notes =

            Array.isArray(
              paper.notes
            )

              ? paper.notes

              : paper.notes

                ? [paper.notes]

                : [];

          notes =

            notes
              .map(
                function (note) {

                  return String(
                    note == null
                      ? ""
                      : note
                  ).trim();

                }
              )
              .filter(
                function (note) {

                  return note.length > 0;

                }
              );

          var html =

            '<div class="wp-header">' +

              '<div class="wp-main">' +

                '<h3 class="wp-title">' +

                  titleHTML +

                "</h3>" +

                (
                  renderedAuthors

                    ? '<div class="wp-authors">' +
                      renderedAuthors +
                      "</div>"

                    : ""
                ) +

              "</div>" +

              (
                paper.year

                  ? '<div class="wp-status">' +
                    escHTML(
                      paper.year
                    ) +
                    "</div>"

                  : ""
              ) +

            "</div>";

          if (
            hasLinks
          ) {

            var links =
              [];

            if (
              paper.link
            ) {

              links.push(

                '<a href="' +

                escAttr(
                  paper.link
                ) +

                '" target="_blank"' +

                ' rel="noopener noreferrer"' +

                ' class="wp-link">' +

                "Paper" +

                "</a>"

              );

            }

            if (
              paper.ssrn
            ) {

              links.push(

                '<a href="' +

                escAttr(
                  paper.ssrn
                ) +

                '" target="_blank"' +

                ' rel="noopener noreferrer"' +

                ' class="wp-link">' +

                "SSRN" +

                "</a>"

              );

            }

            if (
              paper.fullText
            ) {

              links.push(

                '<a href="' +

                escAttr(
                  paper.fullText
                ) +

                '" target="_blank"' +

                ' rel="noopener noreferrer"' +

                ' class="wp-link">' +

                "PDF" +

                "</a>"

              );

            }

            html +=

              '<div class="wp-links">' +

                links.join("") +

              "</div>";

          }

          if (
            notes.length
          ) {

            html +=

              '<ul class="wp-notes">' +

                notes
                  .map(
                    function (note) {

                      return (
                        '<li class="wp-note">' +
                          escHTML(note) +
                        "</li>"
                      );

                    }
                  )
                  .join("") +

              "</ul>";

          }

          if (
            hasAbstract
          ) {

            var abstractId =
              "wp-abstract-" +
              index;

            html +=

              '<button' +

                ' class="wp-abstract-toggle"' +

                ' type="button"' +

                ' aria-expanded="false"' +

                ' aria-controls="' +
                abstractId +
                '">' +

                "Abstract" +

              "</button>" +

              '<div' +

                ' class="wp-abstract"' +

                ' id="' +
                abstractId +
                '"' +

                " hidden>" +

                escHTML(
                  paper.abstract
                ) +

              "</div>";

          }

          article.innerHTML =
            html;

          if (
            hasAbstract
          ) {

            var toggle =
              article.querySelector(
                ".wp-abstract-toggle"
              );

            var abstract =
              article.querySelector(
                ".wp-abstract"
              );

            toggle.addEventListener(

              "click",

              function () {

                var open =

                  toggle.getAttribute(
                    "aria-expanded"
                  ) === "true";

                toggle.setAttribute(

                  "aria-expanded",

                  open
                    ? "false"
                    : "true"

                );

                toggle.textContent =

                  open
                    ? "Abstract"
                    : "Hide Abstract";

                abstract.hidden =
                  open;

              }

            );

          }

          list.appendChild(
            article
          );

        }
      );

    }

    /* =======================================================
       Publications Renderer
       ======================================================= */

    function renderPublications(
      listId,
      items
    ) {

      var list =
        document.getElementById(
          listId
        );

      var section =
        document.getElementById(
          "publications"
        );

      if (
        !items.length
      ) {

        if (section) {

          section.style.display =
            "none";

        }

        return;

      }

      items.forEach(
        function (publication) {

          var article =
            document.createElement(
              "article"
            );

          article.className =
            "pub-item";

          var title =
            escHTML(
              publication.title || ""
            );

          var titleHTML =

            publication.link

              ? '<a href="' +

                escAttr(
                  publication.link
                ) +

                '" target="_blank"' +

                ' rel="noopener noreferrer">' +

                title +

                "</a>"

              : title;

          var html =

            '<h3 class="pub-title">' +

              titleHTML +

            "</h3>";

          var renderedAuthors =
            renderAuthors(
              publication.authors,
              "; "
            );

          if (
            renderedAuthors
          ) {

            html +=

              '<div class="pub-authors">' +

                renderedAuthors +

              "</div>";

          }

          var meta =
            "";

          if (
            publication.journal
          ) {

            meta +=

              '<span class="pub-journal">' +

                escHTML(
                  publication.journal
                ) +

              "</span>";

          }

          if (
            publication.year
          ) {

            meta +=

              (
                meta
                  ? ", "
                  : ""
              ) +

              escHTML(
                publication.year
              );

          }

          if (
            meta
          ) {

            html +=

              '<div class="pub-meta">' +

                meta +

              "</div>";

          }

          var links =
            [];

          if (
            publication.link
          ) {

            links.push(

              '<a href="' +

              escAttr(
                publication.link
              ) +

              '" target="_blank"' +

              ' rel="noopener noreferrer"' +

              ' class="pub-link">' +

              "DOI" +

              "</a>"

            );

          }

          if (
            publication.fullText
          ) {

            links.push(

              '<a href="' +

              escAttr(
                publication.fullText
              ) +

              '" target="_blank"' +

              ' rel="noopener noreferrer"' +

              ' class="pub-link">' +

              "PDF" +

              "</a>"

            );

          }

          if (
            links.length
          ) {

            html +=

              '<div class="pub-links">' +

                links.join(" · ") +

              "</div>";

          }

          article.innerHTML =
            html;

          list.appendChild(
            article
          );

        }
      );

    }

  })();
