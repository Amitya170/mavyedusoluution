# Mavy EduSolutions

> **Enterprise Localization &middot; AI Training Data &middot; Education Solutions**  
> High-performance multilingual solutions built like a type foundry: one shared system of terms, tone, and formatting across 150+ languages.

[![Website](https://img.shields.io/badge/Website-mavyedusolution.com-818cf8?style=flat-square)](https://www.mavyedusolution.com)
[![License](https://img.shields.io/badge/License-Proprietary-22d3ee?style=flat-square)](terms.html)
[![WCAG](https://img.shields.io/badge/WCAG_Contrast-AAA_Compliant-10b981?style=flat-square)](styles.css)
[![Blog Posts](https://img.shields.io/badge/Technical_Articles-28_Published-a78bfa?style=flat-square)](blog/index.html)

---

## 🌟 Overview

**Mavy EduSolutions** delivers enterprise-grade language localization, AI training data curation, RLHF model evaluation, and e-learning adaptation. The platform provides clients with self-service developer tools, deep technical research, and transparent project scoping.

- **150+ Target Locales**: Native-speaker linguist network with ISO 17100 compliance and shared terminology bases.
- **AI Training Data Curation**: Speech/wake-word collection, multimodal labeling, and high-agreement RLHF human preference evaluation.
- **Modern E-Learning**: SCORM-to-cmi5 conversion, LMS migration (Canvas, Moodle, Blackboard), and cultural curriculum alignment.

---

## 🛠️ Interactive Developer & Localization Tools

The platform includes two zero-latency, client-side tools built directly into `index.html#tools`:

1. **Global Text Expansion & Pseudo-Localization Estimator**:
   - Predicts character expansion across key locales: German (+30%), Finnish (+40%), French (+20%), Spanish (+25%), Arabic (+25%), and Japanese (-35%).
   - Detects layout overflow risks for UI buttons and mobile navigation strings.
   - Generates instant accented pseudo-localization strings (e.g. `[ !!! Çömpľéţé ŷöûř řégîşţřáţîöñ ~~~ !!! ]`) to test UI clipping in Figma or staging repos before translation begins.
   - One-click copy with visual clipboard confirmation.

2. **AI Multilingual Dataset Scope & Token Calculator**:
   - Supports 4 core AI modalities: Audio/Voice, Text QA Instruction Tuning, RLHF Preference Ranks, and Multimodal Pairs.
   - Dynamic sliders to scale language count (1–50) and dataset volume (20–10,000 units).
   - Real-time estimates for native specialist cohort size, delivery schedule (weeks), and multi-tier QA gates (SNR acoustic checks, Fleiss' &kappa;, Cohen's &kappa; > 0.85).
   - One-click **Transfer Scope to Project Form** that pre-populates the contact inquiry.

---

## 📚 Technical Blog & SEO Engine

The platform features an automated static site generation pipeline (`generate-blogs.js`) managing **28 deep-dive technical articles**:

| Category | Highlights |
| :--- | :--- |
| **AI Data** | *Benchmarking Tool Calling in Multilingual LLMs*, *Synthetic Data Contamination Auditing*, *Zero-Shot Multilingual Voice Cloning*, *Long-Form Neural Voice Dubbing* |
| **Engineering** | *Tokenizer Fertility in Low-Resource Languages*, *Shipping RTL Layouts Without a Second Sprint*, *Chunking Strategies for Multilingual RAG* |
| **Localization** | *EU AI Act Compliance & Model Card Localization*, *Enterprise LQA with DQF-MQM Error Typology*, *Evaluating LLM Translation: COMET vs BLEU* |
| **EduSolutions** | *xAPI and cmi5 in Global E-Learning*, *Localizing VR/AR Learning Environments*, *Adaptive Learning Engines with Item Response Theory* |

### Generation Pipeline
Run the generator to build all articles, pre-render the blog index, and compile search engine metadata:
```bash
node generate-blogs.js
```
- Generates 28 standalone `.html` pages with Schema.org `BlogPosting` JSON-LD and OpenGraph metadata.
- Pre-renders blog cards in `blog/index.html` for instant search engine indexing.
- Compiles `sitemap.xml` (32 verified URLs) and `rss.xml` (28 items).

---

## 🎨 Design System & Visual Architecture

- **Color Palette**: Obsidian Dark (`#030712`) with Amethyst Indigo (`#818cf8`) and Electric Cyan (`#22d3ee`) accents.
- **Accessibility**: Strict WCAG AAA text contrast ratio (> 7:1 against dark surfaces).
- **Motion & Micro-Interactions**:
  - **Bento Cursor Spotlight**: Cards track cursor position with a radial lighting effect via `--mouse-x` and `--mouse-y`.
  - **Animated Metric Counters**: IntersectionObserver smoothly interpolates stats (`150+`, `98%`, `24hr`).
  - **Magnetic Buttons**: CTAs gently follow cursor hover with spring-back transitions.
  - Fully honors user `prefers-reduced-motion` preferences.
- **Brand Logo**: Vector SVG mark combining the letterforms of 'M' and 'E' inside an Amethyst-to-Cyan neural shield.

---

## 🔒 Legal & Compliance

- [`privacy.html`](privacy.html): Comprehensive GDPR & CCPA privacy policy with strict client data confidentiality guarantees (client TMs and source documents are never used for third-party AI training).
- [`terms.html`](terms.html): Master services agreement terms ensuring 100% client intellectual property ownership over delivered assets and a 14-day quality assurance revision guarantee.
- [`site.webmanifest`](site.webmanifest): Progressive Web App manifest with standalone display configuration and theme coloring (`#030712`).

---

## 📁 Repository Structure

```
├── 404.html                # Custom branded 404 error page with navigation fallbacks
├── about.html              # Clean redirect handler to #about
├── contact.html            # Clean redirect handler to #contact
├── privacy.html            # GDPR & CCPA compliance and data governance policy
├── terms.html              # Enterprise terms of service & deliverable IP ownership
├── index.html              # Main single-page web app with embedded interactive tools
├── main.js                 # Client-side state, tool calculations, and motion system
├── styles.css              # Obsidian theme design tokens and responsive layouts
├── logo.svg                # Master vector brand icon
├── site.webmanifest        # PWA metadata for mobile home-screen installation
├── generate-blogs.js       # Static blog engine, sitemap generator, and RSS builder
├── sitemap.xml             # XML sitemap with 32 production URLs
├── rss.xml                 # RSS 2.0 feed with RFC-822 timestamps
├── robots.txt              # Search engine crawler instructions
└── blog/                   # Static blog articles directory
    ├── index.html          # Pre-rendered article gallery with real-time filters
    └── *.html              # 28 published technical SEO articles
```

---

## 🚀 Development & Maintenance

### Verify Codebase Integrity
```bash
# Validate JavaScript syntax
node -c main.js
node -c generate-blogs.js

# Regenerate all blog pages, sitemap, and RSS
node generate-blogs.js
```

### Form Submissions & Analytics
- **Contact Form**: Wired to Formspree endpoint (`https://formspree.io/f/mgogkawo`) with real-time async validation and loading states.
- **Google Analytics**: GA4 tag placeholder configured in `index.html` and `main.js`.

---

&copy; 2026 **Mavy EduSolutions**. All rights reserved.
