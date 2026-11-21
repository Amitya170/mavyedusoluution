/**
 * MAVY EDUSOLUTIONS — AUTOMATED DAILY INDUSTRY SEO & BLOGGING ENGINE
 * 
 * Capabilities:
 * - Rotates across 7 core industries daily:
 *   1. Monday: Gaming & Interactive Entertainment
 *   2. Tuesday: Healthcare & Medical Life Sciences
 *   3. Wednesday: Legal & FinTech Compliance
 *   4. Thursday: Enterprise SaaS & Developer Platforms
 *   5. Friday: EdTech & Higher Education
 *   6. Saturday: Frontier AI Labs & RLHF Data
 *   7. Sunday: Global E-Commerce & Retail
 * - Generates comprehensive, deep-dive technical articles with Schema.org BlogPosting JSON-LD,
 *   OpenGraph metadata, code samples, and actionable industry frameworks.
 * - Automatically compiles new blog HTML, updates blog/index.html, updates sitemap.xml,
 *   and updates rss.xml feed.
 * - Supports CLI: `node auto-blog-engine.js --publish-today` or `--generate-all`.
 */

const fs = require('fs');
const path = require('path');

const BRAND = 'Mavy EduSolutions';
const DOMAIN = 'https://www.mavyedusolution.com';
const EMAIL = 'collab@mavyedusolutions.co.in';

// 7-Day Industry Rotation Matrix
const INDUSTRY_CALENDAR = [
  { day: 0, name: 'E-Commerce', theme: 'Global E-Commerce & Cross-Border Retail' },
  { day: 1, name: 'Gaming', theme: 'Gaming & Interactive Entertainment Localization' },
  { day: 2, name: 'Healthcare', theme: 'Healthcare, MedTech & Clinical Life Sciences' },
  { day: 3, name: 'Legal & Finance', theme: 'Legal, FinTech & Enterprise Compliance' },
  { day: 4, name: 'SaaS & Tech', theme: 'Enterprise SaaS, CI/CD & Developer Platforms' },
  { day: 5, name: 'EdTech', theme: 'EdTech, Higher Education & LMS Adaptation' },
  { day: 6, name: 'AI Data', theme: 'Frontier AI Labs, Multilingual RLHF & Model Auditing' }
];

// Rich Library of Deep-Dive Industry Articles for Autonomous Daily Publishing
const INDUSTRY_ARTICLES = [
  // --- GAMING (Monday) ---
  {
    slug: 'gaming-simultaneous-ship-loc-qa',
    cat: 'Gaming',
    industry: 'Gaming & Interactive Entertainment',
    title: 'Simultaneous Global Ship: Zero-Day Localization QA in AAA Game Engines',
    description: 'How modern game studios coordinate simultaneous releases across 20+ markets without UI text truncation, audio desync, or cultural rating blowups.',
    date: 'Daily Edition',
    read: '8 min read',
    keywords: ['game localization', 'simultaneous ship', 'LQA', 'Unreal Engine i18n', 'Unity localization', 'dialogue dubbing'],
    body: `
      <p>Simultaneous global shipping (Sim-ship) is the gold standard for AAA and mobile gaming studios. Shipping a localized title weeks or months after the domestic launch leaks engagement to pirate streams, fractures multiplayer matchmaking, and dampens global marketing return.</p>
      
      <h2>The Geometry of Game UI: Text Expansion in Fixed Canvas</h2>
      <p>Unlike responsive web pages, game interfaces frequently render into fixed-pixel HUD elements, skill-tree canvases, and dialogue boxes. When English strings are translated into German or Finnish, character counts expand by 30% to 45%:</p>

      <div class="code-block" style="background:#090d16; border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:1.2rem; margin:1.5rem 0; font-family:'IBM Plex Mono',monospace; font-size:0.85rem; color:#f8fafc;">
        <span style="color:#94a3b8;">// English (16 chars):</span><br>
        <strong>Equip Legendary</strong><br><br>
        <span style="color:#94a3b8;">// German Expansion (+56%, 25 chars):</span><br>
        <span style="color:#d4af37;">Legendäre Ausrüstung anlegen</span> <span style="color:#ff6b6b;">/* OVERFLOW TRUNCATION RISK */</span>
      </div>

      <h2>In-Context Screenshot & Engine-Level LQA</h2>
      <p>Top-tier game localization does not occur in spreadsheets. Native linguists inspect strings directly inside the engine or through dynamic screenshot context tools that map string IDs directly to active UI cameras. This catches:</p>
      <ul>
        <li><strong>Visual Truncation:</strong> Text slipping outside button bounding boxes or overlapping mini-maps.</li>
        <li><strong>Gender/Plural Variables:</strong> Dynamic tokens like <code>{player_name} has slain {count} {monster_type}</code> correctly conjugated across Slavic and Romance grammar.</li>
        <li><strong>Dialogue Subtitle Time-Sync:</strong> Subtitles calibrated precisely to speech cadence and reading speed (17 to 20 characters per second).</li>
      </ul>

      <h2>Cultural Adaptation & Age Rating Compliance</h2>
      <p>A sword gesture or color palette that is innocuous in North America may trigger age-rating bumps or outright bans under Germany’s USK, Japan’s CERO, or Australia’s ACB. In-region gaming specialists flag cultural taboos, religious symbols, and blood tint requirements early in production.</p>
    `
  },

  // --- HEALTHCARE & LIFE SCIENCES (Tuesday) ---
  {
    slug: 'healthcare-clinical-trial-meddra-compliance',
    cat: 'Healthcare',
    industry: 'Healthcare, MedTech & Clinical Life Sciences',
    title: 'Precision Clinical Translation: MedDRA Coding and FDA/EMA Regulatory Disclosures',
    description: 'The regulatory blueprint for translating patient-reported outcomes, Investigator Brochures, and medical device software under strict ISO 17100 and 13485 standards.',
    date: 'Daily Edition',
    read: '9 min read',
    keywords: ['medical translation', 'clinical trials', 'MedDRA', 'ISO 17100', 'FDA compliance', 'eCOA localization'],
    body: `
      <p>In life sciences and medical device manufacturing, a translation defect is not an inconvenience—it is a patient safety hazard and a regulatory rejection trigger. Clinical trials operating across global investigator sites require multi-layered linguistic verification.</p>

      <h2>Standardized Terminology: MedDRA and WHO-ART</h2>
      <p>Adverse event reporting demands absolute adherence to the Medical Dictionary for Regulatory Activities (MedDRA). When translating patient symptom descriptions into System Organ Class (SOC) and Preferred Terms (PT), linguists must possess medical domain credentials:</p>

      <blockquote><p>A colloquial patient phrase like "my chest feels clamped" must be systematically mapped to appropriate clinical diagnostic terminology without altering severity or chronology.</p></blockquote>

      <h2>Dual Independent Forward & Back-Translation Protocol</h2>
      <p>For patient-reported outcomes (PRO) and clinical consent forms, regulatory authorities (FDA, EMA, NMPA) expect a rigorous 5-stage validation gate:</p>
      <ol>
        <li><strong>Forward Translation:</strong> Two independent native medical translators generate draft versions.</li>
        <li><strong>Reconciliation:</strong> A third senior medical linguist harmonizes discrepancies.</li>
        <li><strong>Back-Translation:</strong> An independent translator blindly renders the harmonized document back into the source language.</li>
        <li><strong>Clinical Review:</strong> Primary investigators verify conceptual equivalence against study protocols.</li>
        <li><strong>Cognitive Debriefing:</strong> Pilot patient interviews confirm comprehension across diverse literacy levels.</li>
      </ol>
    `
  },

  // --- LEGAL & FINTECH (Wednesday) ---
  {
    slug: 'legal-fintech-cross-border-compliance-localization',
    cat: 'Legal & Finance',
    industry: 'Legal, FinTech & Enterprise Compliance',
    title: 'Cross-Border M&A and SEC Disclosures: Mitigating Legal Exposure in Translation',
    description: 'Managing jurisdiction-specific legal phrasing, SEC Form 10-K disclosures, and EU AI Act model cards with certified cryptographic chain-of-custody.',
    date: 'Daily Edition',
    read: '7 min read',
    keywords: ['legal translation', 'fintech localization', 'SEC disclosures', 'cross-border contracts', 'EU AI Act compliance'],
    body: `
      <p>International corporate transactions, patent filings, and algorithmic financial platforms operate under strict liability. Translating legal instruments requires a deep understanding of civil law versus common law doctrinal differences.</p>

      <h2>The Pitfalls of False Cognates in Contractual Law</h2>
      <p>Many legal concepts have no one-to-one equivalent across jurisdictions. For instance, the French doctrine of <em>force majeure</em> differs subtly from English common law frustration of contract. A naive literal translation can inadvertently waive indemnification rights or invalidate arbitration clauses.</p>

      <h2>Certified Jurat and Chain-of-Custody Protocols</h2>
      <p>Delivered legal translations must be accompanied by certified affidavits of accuracy signed by accredited translators and notarized for court admissibility. At ${BRAND}, every legal translation pass preserves tamper-evident cryptographic checksums matching delivered files to source repositories.</p>
    `
  },

  // --- SAAS & DEVTECH (Thursday) ---
  {
    slug: 'saas-ci-cd-continuous-localization-pipeline',
    cat: 'SaaS & Tech',
    industry: 'Enterprise SaaS, CI/CD & Developer Platforms',
    title: 'Zero-Touch Continuous Localization: Automating Git-Driven Translation Webhooks',
    description: 'How high-velocity engineering teams integrate TMS APIs into GitHub Actions and GitLab CI to localize software strings without interrupting sprint velocity.',
    date: 'Daily Edition',
    read: '8 min read',
    keywords: ['continuous localization', 'CI/CD i18n', 'TMS API', 'GitHub Actions translation', 'pseudo-localization'],
    body: `
      <p>Modern engineering organizations ship code continuously. If software localization relies on manual file exports and spreadsheet handoffs, translation becomes a permanent sprint blocker. The solution is zero-touch continuous localization.</p>

      <h2>The Automated Git-Webhook Flow</h2>
      <p>When a developer opens a pull request that modifies an internationalization file (e.g. <code>en.json</code>, <code>strings.xml</code>, or <code>Localizable.strings</code>), automated CI webhooks push delta strings directly to the translation memory engine:</p>

      <div class="code-block" style="background:#090d16; border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:1.2rem; margin:1.5rem 0; font-family:'IBM Plex Mono',monospace; font-size:0.85rem; color:#f8fafc;">
        <span style="color:#38bdf8;">name:</span> Continuous Localization<br>
        <span style="color:#38bdf8;">on:</span><br>
        &nbsp;&nbsp;pull_request:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;paths: ['locales/en/*.json']<br>
        <span style="color:#38bdf8;">jobs:</span><br>
        &nbsp;&nbsp;sync:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;runs-on: ubuntu-latest<br>
        &nbsp;&nbsp;&nbsp;&nbsp;steps:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- uses: mavy-edusolutions/i18n-sync-action@v2<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with:<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;api_key: \${{ secrets.MAVY_API_KEY }}<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pseudo_loc_preview: true
      </div>

      <h2>Automated Bidirectional RTL Layout Testing</h2>
      <p>Continuous pipelines run automated headless browser passes across Arabic, Hebrew, and Urdu viewports to verify that UI margins, icons, and flexbox layouts flip automatically (<code>dir="rtl"</code>) without horizontal clipping or broken flex-wrap.</p>
    `
  },

  // --- EDTECH & LMS (Friday) ---
  {
    slug: 'edtech-scorm-cmi5-global-learning-adaptation',
    cat: 'EdTech',
    industry: 'EdTech, Higher Education & LMS Adaptation',
    title: 'Beyond Translation in E-Learning: SCORM/cmi5 Cultural Adaptation and Pedagogical Alignments',
    description: 'Transforming interactive courseware for global learners while preserving xAPI telemetry, assessment psychometrics, and accessibility standards.',
    date: 'Daily Edition',
    read: '7 min read',
    keywords: ['SCORM localization', 'cmi5 adaptation', 'e-learning translation', 'LMS migration', 'pedagogical localization'],
    body: `
      <p>Translating an educational course is fundamentally different from translating product copy. Education is culturally contextual: cognitive learning styles, teacher-student relationship expectations, and historical frameworks vary widely across global markets.</p>

      <h2>Preserving Packaging Standards: SCORM 2004 and cmi5</h2>
      <p>A courseware localization package must never break LMS communication. At ${BRAND}, interactive HTML5, Articulate Storyline, and Adobe Captivate packages are localized with all manifest files (<code>imsmanifest.xml</code>), objective IDs, and xAPI tracking statements strictly preserved.</p>

      <h2>Psychometric Assessment Calibration</h2>
      <p>Multiple-choice questions and assessment rubrics must maintain consistent cognitive difficulty across languages. If a translation inadvertently introduces grammatical clues or changes question complexity, the grading validity is compromised. Specialist educational reviewers calibrate item difficulty across all localized cohorts.</p>
    `
  },

  // --- AI DATA & FRONTIER LABS (Saturday) ---
  {
    slug: 'ai-data-rlhf-multilingual-preference-agreement',
    cat: 'AI Data',
    industry: 'Frontier AI Labs, Multilingual RLHF & Model Auditing',
    title: 'High-Agreement Human Preference Curation for Multilingual LLM Alignment',
    description: 'Establishing Fleiss’ kappa and Cohen’s kappa > 0.85 in human feedback rater networks across 40+ languages to avoid reward model collapse.',
    date: 'Daily Edition',
    read: '10 min read',
    keywords: ['RLHF', 'human preference data', 'Fleiss kappa', 'LLM evaluation', 'multilingual AI alignment', 'reward model'],
    body: `
      <p>Reward models trained on low-agreement or noisy human preference data inevitably collapse into sycophancy or hallucination. When evaluating frontier LLMs across low-resource or non-English prompts, rater alignment is the primary determinant of model safety and reasoning quality.</p>

      <h2>Mathematical Multi-Rater Consensus: Fleiss' Kappa</h2>
      <p>Rather than relying on simple percentage agreement, high-performance rater pools establish formal inter-annotator agreement metrics that discount chance agreement:</p>

      <div class="code-block" style="background:#090d16; border:1px solid rgba(212,175,55,0.25); border-radius:10px; padding:1.2rem; margin:1.5rem 0; font-family:'IBM Plex Mono',monospace; font-size:0.85rem; color:#f8fafc;">
        <span style="color:#d4af37;">κ = (P̄ - P̄_e) / (1 - P̄_e)</span><br><br>
        <span style="color:#94a3b8;">// Quality Tier Thresholds:</span><br>
        κ &lt; 0.40 : Discard batch (High noise / Ambiguous rubric)<br>
        0.60 ≤ κ &lt; 0.80 : Substantial agreement<br>
        <strong>κ ≥ 0.85 : Gold-standard certified preference data (Production ready)</strong>
      </div>

      <h2>Adversarial Red-Teaming in Local Idioms</h2>
      <p>Standard safety filters built in English often fail to recognize regional slang, cultural insults, and obfuscated jailbreak attempts in Arabic, Hindi, or Tagalog. Native specialist red-teamers stress-test model safeguards against cultural edge cases before weights are deployed.</p>
    `
  },

  // --- E-COMMERCE & RETAIL (Sunday) ---
  {
    slug: 'ecommerce-cross-border-transcreation-conversion',
    cat: 'E-Commerce',
    industry: 'Global E-Commerce & Cross-Border Retail',
    title: 'Conversion-Centric Transcreation: Optimizing Cross-Border Product Listings for Local Search',
    description: 'How global retail brands localize catalogues, customer reviews, and checkout friction points to achieve domestic parity in international markets.',
    date: 'Daily Edition',
    read: '7 min read',
    keywords: ['ecommerce localization', 'transcreation', 'cross-border checkout', 'international SEO', 'catalog translation'],
    body: `
      <p>Translating an e-commerce catalogue word-for-word rarely drives sales. Shoppers search using regional vocabulary, informal brand shorthand, and specific dimension systems. High-converting retail localization is grounded in market-specific search intent.</p>

      <h2>Local Search Keyword Mapping vs. Direct Translation</h2>
      <p>Consider the English query "sweatshirt with hood". In the UK, shoppers search for "hoodie"; in French Canada, they search for "coton ouaté", whereas in metropolitan France, the term is "sweat à capuche". Optimizing category titles for the wrong regional keyword wastes ad spend and tanks organic SERP rankings.</p>

      <h2>Frictionless Checkout Localization</h2>
      <p>International cart abandonment often stems from localized checkout dissonance: unsupported local payment rails (iDEAL in Netherlands, PIX in Brazil, Boleto in Latin America), ambiguous customs duties, or rigid address input forms that mandate non-existent postcodes. Cultural UX optimization eliminates these friction points.</p>
    `
  }
];

// Helper: Escape XML
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate Complete Modern HTML for a Blog Post
function generateHTML(post) {
  const fullTitle = `${post.title} | ${BRAND}`;
  const canonicalUrl = `${DOMAIN}/blog/${post.slug}.html`;

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeXML(fullTitle)}</title>
<meta name="description" content="${escapeXML(post.description)}">
<meta name="keywords" content="${post.keywords ? post.keywords.join(', ') : 'localization, AI data, global e-learning'}">
<link rel="canonical" href="${canonicalUrl}">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeXML(fullTitle)}">
<meta property="og:description" content="${escapeXML(post.description)}">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:site_name" content="${BRAND}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeXML(fullTitle)}">
<meta name="twitter:description" content="${escapeXML(post.description)}">
<link rel="icon" type="image/svg+xml" href="/logo.svg">
<meta name="theme-color" content="#07090e">
<link rel="stylesheet" href="../styles.css">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${escapeXML(post.title)}",
  "description": "${escapeXML(post.description)}",
  "datePublished": "${post.dateISO || new Date().toISOString()}",
  "dateModified": "${new Date().toISOString()}",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${canonicalUrl}"
  },
  "author": {
    "@type": "Organization",
    "name": "${BRAND}",
    "url": "${DOMAIN}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "${BRAND}",
    "logo": {
      "@type": "ImageObject",
      "url": "${DOMAIN}/logo.svg"
    }
  }
}
</script>
</head>
<body>
<nav>
  <a href="../index.html" class="logo"><img src="../logo.svg" alt="${BRAND}" class="logo-icon" width="32" height="32" style="margin-right: 8px; vertical-align: middle;">${BRAND}</a>
  <div class="nav-links">
    <a href="../index.html#services">Services</a>
    <a href="../index.html#ai-data">AI Data</a>
    <a href="../index.html#edu-solutions">EduSolutions</a>
    <a href="index.html" class="active">Blog</a>
    <a href="../index.html#contact">Contact</a>
  </div>
</nav>

<main style="max-width: 840px; margin: 7rem auto 4rem; padding: 0 5%;">
  <a href="index.html" style="display:inline-block; margin-bottom:1.8rem; font-family:'IBM Plex Mono',monospace; font-size:0.78rem; color:var(--champagne);">← Back to All Articles</a>
  
  <div style="font-family:'IBM Plex Mono',monospace; font-size:0.75rem; color:var(--champagne); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.8rem;">
    ${escapeXML(post.cat)} &middot; ${escapeXML(post.read)} &middot; Published Daily Series
  </div>
  
  <h1 style="font-family:'Fraunces',serif; font-size:clamp(2rem, 3.8vw, 2.9rem); line-height:1.15; margin-bottom:1.4rem; color:var(--text); font-weight:600;">
    ${escapeXML(post.title)}
  </h1>
  
  <p style="font-size:1.15rem; color:var(--muted); line-height:1.6; margin-bottom:2.2rem; border-left:3px solid var(--champagne); padding-left:1.2rem;">
    ${escapeXML(post.description)}
  </p>
  
  <div class="article-content" style="color:var(--text); font-size:1.05rem; line-height:1.75;">
    ${post.body}
  </div>

  <div style="margin-top:4rem; padding:2.2rem; background:var(--surface); border:1px solid var(--line); border-radius:16px; text-align:center;">
    <h3 style="font-family:'Fraunces',serif; font-size:1.4rem; margin-bottom:0.6rem; color:var(--champagne);">Ready to Scale Your ${escapeXML(post.cat)} Infrastructure?</h3>
    <p style="color:var(--muted); font-size:0.95rem; margin-bottom:1.4rem;">Connect with native linguists, AI data curators, and e-learning engineers specialized in your vertical.</p>
    <a href="../index.html#contact" class="btn btn-primary" style="display:inline-block; padding:0.85rem 2rem; border-radius:8px; font-weight:600;">Schedule Project Scope &rarr;</a>
  </div>
</main>
</body>
</html>`;
}

// Publish today's industry blog post
function publishToday() {
  const now = new Date();
  const dayOfWeek = now.getUTCDay();
  const todayISO = now.toISOString().split('T')[0];
  const industrySchedule = INDUSTRY_CALENDAR.find(c => c.day === dayOfWeek) || INDUSTRY_CALENDAR[0];
  const article = INDUSTRY_ARTICLES.find(a => a.cat === industrySchedule.name) || INDUSTRY_ARTICLES[0];

  console.log(`\n📅 Today is day ${dayOfWeek} (${industrySchedule.theme})`);
  console.log(`⚡ Publishing daily industry article: "${article.title}"`);

  article.dateISO = todayISO;
  article.date = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Read existing generate-blogs.js to merge with standard collection
  const genScriptPath = path.join(__dirname, 'generate-blogs.js');
  let genScript = fs.readFileSync(genScriptPath, 'utf8');

  // Write new blog HTML
  const blogDir = path.join(__dirname, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const articlePath = path.join(blogDir, `${article.slug}.html`);
  fs.writeFileSync(articlePath, generateHTML(article), 'utf8');
  console.log(`✅ Generated: blog/${article.slug}.html`);

  // Run full compiler to update index, sitemap.xml, rss.xml
  require('./generate-blogs.js');

  console.log(`\n🚀 Daily industry blog successfully published & SEO engines refreshed!`);
}

// Generate all industry articles into the blog library
function publishAllIndustryArticles() {
  const blogDir = path.join(__dirname, 'blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  INDUSTRY_ARTICLES.forEach((article, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - idx);
    article.dateISO = d.toISOString().split('T')[0];
    article.date = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const articlePath = path.join(blogDir, `${article.slug}.html`);
    fs.writeFileSync(articlePath, generateHTML(article), 'utf8');
    console.log(`✅ Compiled Industry Post: blog/${article.slug}.html`);
  });

  // Re-run standard generator to update sitemap & RSS
  require('./generate-blogs.js');
}

// CLI Command routing
const args = process.argv.slice(2);
if (args.includes('--publish-today')) {
  publishToday();
} else {
  publishAllIndustryArticles();
}

module.exports = {
  INDUSTRY_ARTICLES,
  INDUSTRY_CALENDAR,
  publishToday,
  publishAllIndustryArticles
};
