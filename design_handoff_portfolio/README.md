# Handoff: Rust Systems Engineer Portfolio

## Overview
Single-page portfolio for Aman Kumar Matta, a systems software engineer transitioning from Unity/C++ game development into Rust + Linux systems work. Dark, terminal/systems-inspired aesthetic with a three.js wireframe/particle hero and GSAP scroll reveals.

## About the Design Files
The bundled file (`Portfolio.dc.html`) is a **design reference** — a working HTML/JS prototype showing intended look, motion, and content structure, not production code to copy verbatim. It uses a proprietary component-templating syntax (`{{ }}` holes, `<sc-for>`, `ref="{{ }}"` bindings, `support.js` runtime) specific to the design tool it was built in — **do not** try to run this file's templating engine in a real app. Recreate the same visual design and behavior in whatever framework the target codebase uses (React, Next.js, plain Vite/vanilla JS, etc.), or choose a simple static-site stack (Vite + vanilla JS/TS) if none exists yet.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and animation timing below are final — recreate pixel-perfectly.

## Screens / Views
One continuous scrolling page, four sections plus a fixed nav.

### Fixed Nav
- Fixed top, full width, `padding: 22px 48px`, `background: rgba(10,12,14,0.6)` with `backdrop-filter: blur(8px)`, bottom border `1px solid rgba(255,255,255,0.06)`.
- Left: logo text `akm@systems_` (blinking underscore cursor), JetBrains Mono 14px, color `#ff7a3d`.
- Right: 4 nav links (`01_work`, `02_about`, `03_stack`, `04_contact`) anchor to section ids, JetBrains Mono 13px, color `#8b9198` → hover `#e8e6e1`.

### Hero
- Full `100vh`, flex `align-items:center`, scanline texture overlay (repeating 1px horizontal lines, `rgba(255,255,255,0.02)`).
- Full-bleed `<canvas>` background (three.js scene, see Interactions), opacity 0.55, with a bottom gradient fade to `#0a0c0e`.
- Content (fades/slides in on load): eyebrow `// systems software engineer` (JetBrains Mono 14px, `#ff7a3d`, uppercase, letter-spacing 2px) → `h1` "Aman Kumar Matta" (`clamp(48px,7vw,80px)`, weight 700, line-height 0.98, letter-spacing -2px) → paragraph (JetBrains Mono 16px, `#8b9198`, line-height 1.65, max-width 640px) → two CTAs: primary "VIEW WORK →" (solid `#ff7a3d` bg, `#0a0c0e` text, hover `#ff9660`) and secondary "GITHUB" (outlined, hover border/text `#ff7a3d`), both JetBrains Mono 13px bold, `padding:14px 26px`.
- Bottom-left small hint "scroll to explore ↓", `bottom:16px`, 11px, `#4a4f55`.

### About (`#about`)
- `padding: 160px 48px`, max-width 1100px centered, top border `1px solid rgba(255,255,255,0.06)`.
- Eyebrow `02 / ABOUT` (`#ff7a3d`, mono, 13px).
- Two-column grid (`1.3fr 1fr`, gap 80px): left a 32px pull-quote paragraph (weight 500, accent spans on "Rust"/"Linux"); right a mono key/value list (background, focus, interests, status) with row dividers, status value in green `#4ade80`.

### Work (`#work`)
- Eyebrow `01 / SELECTED WORK`.
- Repeating row list, each row: index number (00-style, `#4a4f55`) | title (26px, weight 600) + description (mono 14px, `#8b9198`) + tag chips (outlined, `#ff7a3d` border/text) | status label (mono 12px, `#4a4f55`), separated by top border rules, subtle hover background tint.
- 4 placeholder projects (rustlock, schedwatch, netfold, ecs-rs) — swap for real repos.
- Footnote: `// placeholder projects — swap in real repos as they ship`.

### Stack (`#stack`)
- Eyebrow `03 / STACK`.
- 4-column grid of cells (1px gutters via background color trick), each cell: small category label (mono 11px, `#4a4f55`) + name (18px, weight 500). 8 items: Rust, Linux, Tokio/async, eBPF, C++/Unity, CLI/TUI, TCP/UDP internals, Git.

### Contact (`#contact`)
- Centered, `padding:120px 48px 100px`, top border.
- Eyebrow `04 / CONTACT`, heading "Let's build something that doesn't segfault." (56px, weight 700).
- Two underlined links: GitHub (github.com/rxyenv) and LinkedIn (linkedin/amankumarmatta), hover `#ff7a3d`.
- Footer line: `© 2026 Aman Kumar Matta — built with Rust in mind, shipped in HTML.`

## Interactions & Behavior
- **Hero canvas (three.js)**: `PerspectiveCamera` at `(0,0,22)`, fov 55. Scene contains (1) a wireframe icosahedron (`IcosahedronGeometry(8,1)` → `WireframeGeometry` → `LineSegments`, color `#ff7a3d`, opacity 0.35) continuously rotating (`rotation.y += 0.0015`, `rotation.x += 0.0006` per frame), and (2) 600 random points in a 60-unit cube (`PointsMaterial` color `#8b9198`, size 0.09, opacity 0.5) rotating slowly the opposite direction. Camera position eases toward mouse position (`mouse.x*3`, `-mouse.y*3`) each frame at 0.02 lerp factor, always looking at origin. Renderer is transparent (`alpha:true`), resizes on window resize.
- **Load animation (GSAP)**: hero content fades/slides from `opacity:0, y:30` to visible over 1.1s (`power3.out`), 0.2s delay.
- **Scroll reveals (GSAP + ScrollTrigger)**: every element with class `reveal` fades/slides from `opacity:0, y:40` to visible over 0.9s (`power2.out`) when it hits 85% viewport on scroll (`start: 'top 85%'`).
- Nav links are simple in-page anchor scrolls to section ids.
- No loading/error states — static content.

## State Management
None — fully static content, no data fetching. All copy/project/stack data can be hardcoded or pulled from a simple JSON/config file.

## Design Tokens

**Colors**
- Background: `#0a0c0e`
- Primary text: `#e8e6e1`
- Secondary/muted text: `#8b9198`
- Faint text: `#4a4f55`
- Accent (orange): `#ff7a3d` (hover: `#ff9660`)
- Success/status green: `#4ade80`
- Borders/dividers: `rgba(255,255,255,0.06)` and `rgba(255,255,255,0.08)`

**Typography**
- Display/headings: Space Grotesk, weights 500/600/700
- Mono (labels, nav, body copy, chips): JetBrains Mono, weights 400/700
- Both loaded from Google Fonts

**Spacing**
- Section vertical padding: 160px (about/work/stack), 120px (contact)
- Horizontal page padding: 48px
- Content max-width: 1100px

**Radius / Shadows**
- No border-radius anywhere (sharp corners throughout)
- No box-shadows — depth comes from borders/opacity only

## Assets
No image assets. All visuals are code-generated (three.js geometry, CSS gradients/textures). Fonts via Google Fonts CDN (Space Grotesk, JetBrains Mono). three.js r128 and GSAP 3.12.5 + ScrollTrigger via cdnjs.

## Files
- `Portfolio.dc.html` — full design reference (markup + logic) for the page described above.
