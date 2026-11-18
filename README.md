# Daisy Owei — Portfolio

**Live site:** [daisyowei.com](https://daisyowei.com/)

This is my product design portfolio. I designed it and built it from scratch, without a template, as a static HTML, CSS and JavaScript site.

## The idea

By default it works like a normal portfolio website. You can also switch to a canvas view and drag and zoom around the page, the way you would in Figma.

The canvas idea came from Figma, but it's also about why I design. A canvas is a place to create and make things, and that's what I care about most: being creative, helping other people be creative, and helping people find what they're passionate about so they can help themselves.

Most portfolios look the same, so I wanted mine to feel a bit more playful and more like me. It was also a personal project to see whether I could actually build it. The canvas is the part that makes it mine.

## How I built it

1. **Design in Figma.** I started the layout with Figma AI, then reworked and adjusted elements by hand in Figma.
2. **Figma to code.** I connected the Figma MCP server to GitHub Copilot and Claude Code and used them to build the first few versions of the site from my Figma frames.
3. **Iterate by prompting.** After that I made a lot of design changes and refinements by prompting Claude Code and Copilot, reviewing each version, and adjusting until it matched what I wanted.
4. **Content.** I moved my case studies and writing over from my old Notion portfolio so they live on a proper website.

## Features

- **Website/Canvas toggle.** A scrolling website by default, or a canvas you can pan and zoom. Includes zoom controls, "Fit overview", and a guided canvas tour.
- **Case studies inside the canvas.** Projects open in the same portfolio shell, with a section map in the sidebar that tracks where you are.
- **Responsive.** On phones you can choose the scrolling website or the interactive canvas, and a menu gives shortcuts to sections and projects.
- **Interactive data visualisation.** The Internet Health case study embeds a D3.js visualisation.
- **No build step.** Plain HTML, CSS and JavaScript with no frameworks or package dependencies, hosted on Netlify.

## Run locally

From this directory, start a local web server:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).
