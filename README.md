# Daisy Owei portfolio

A responsive, static portfolio site based on the Figma home and canvas-view frames. The site uses the supplied design images and icons from `public/assets`, with no build step or package dependencies.

The home canvas includes selected work, bonus projects, early-career case studies, and personal/social-impact projects. The left navigation links to all projects; the compact right-side canvas map links to About, Process, and the three main case studies. Selected work, About, and Contact frame their full canvas content when selected. The About widget’s “My story” link opens a scrollable About Me page inside the portfolio shell; the Explore > About link continues to focus the About canvas section. The LetPlant, J.P. Morgan, Hinge, VIM, Quick UX Wins, and Internet Health project links open their case studies inside the portfolio shell. These pages scroll vertically in the main workspace while the portfolio navigation remains available; their section maps and current-section indicators appear in the right sidebar. J.P. Morgan uses a single-column card layout with white cards. LetPlant uses pastel green, About Me pastel purple, J.P. Morgan and Quick UX Wins pastel blue, Hinge pastel lilac, VIM pastel magenta, and Internet Health pastel red. The case-study pages use solid backgrounds and white cards. Internet Health embeds its interactive D3.js visualization and links to the live project; Hinge, VIM, Millennium TV, and Cookie Jar project visuals are labeled placeholders until the referenced images are added. Standalone pages are [about.html](./about.html), [letplant.html](./letplant.html), [jpmorgan.html](./jpmorgan.html), [hinge.html](./hinge.html), [vim.html](./vim.html), [quick-ux.html](./quick-ux.html), and [internet-health.html](./internet-health.html).

On phones, use the Website/Canvas switch to choose a vertically scrolling portfolio or the interactive canvas. The Menu button opens section and project shortcuts.

## Run locally

From this directory, start a local web server:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Canvas controls

- Use the `Scroll` / `Pan` switch to choose between vertically scrolling the portfolio and dragging the canvas.
- In Pan mode, drag an open area of the canvas to move around; use the `+` and `−` controls to zoom, or use `Fit overview` to return to the home layout.
- Choose `Start here` or `Take a canvas tour` to open the focused intro view.
- Use the section links, guide shortcuts, and project cards to navigate the canvas.
