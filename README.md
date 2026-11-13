# Haolun Xu — academic website

This is a static website, with no build or package installation required.

- **Home** (`index.html`): biography, research interests, shared resources, education, and contact.
- **Research** (`research.html`): working papers, publications, work in progress, dissertation, and research projects.
- **Paper Slides** (`slides.html`): openly accessible slides from paper presentations.
- **Activities** (`activities.html`): conferences, talks, honors, and awards.
- `publications.html` retains the existing standalone publications address.

## Preview locally

From this folder, run:

```sh
python3 -m http.server 8765
```

Then open `http://localhost:8765/`.

## Update research and personal information

`data.js` remains the shared public data source. `site.js` displays the relevant
sections on each page. The existing `admin.html` editor and its browser-local
saved data continue to work.

Each HTML page also contains readable default content for visitors and search
engines that do not run JavaScript. When changing public information in
`data.js`, update the corresponding HTML fallback as well.

## Add a paper presentation

1. Put the PDF in `assets/slides/`, using a descriptive ASCII filename.
2. Copy an existing `<article class="slide-item">` in `slides.html` and update
   its unique IDs, paper title, paper authors, slide presenters, paper link,
   PDF links, page count, and file size. Credit all co-presenters separately
   from the original paper authors.
3. Add an optional WebP preview of the PDF title page and update its image path.
4. Add the presentation to the `ItemList` in that page's structured data, and
   update the number of presentations in the Home page's shared-resources link.

The first presentation, *Bottom-Up Institutional Change and Growth in China*,
uses the joint-presentation PDF credited to **Shangkun Xie and Haolun Xu**.

## Hosting and existing links

The original custom domain and Vercel configuration are retained. The canonical
address is `https://www.haolunxu.xyz/`. The sitemap includes all public pages.
Links to former Home page sections such as `/#publications` and `/#conferences`
continue to open their corresponding sections on the new pages.
