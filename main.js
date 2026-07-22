window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });


/* ================================================================
   ╔══════════════════════════════════════════════════════════════╗
   ║  EDIT SITE CONTENT HERE                                      ║
   ║  Everything below is plain data. Change text, add or remove  ║
   ║  an array entry, and the page re-renders itself.             ║
   ║  No need to touch the HTML above or the render functions     ║
   ║  further down.                                               ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */

/* — EDIT ME: Brand & config ———————————————————————————————————— */
const SITE = {
  brand: 'Mavy EduSolution',
  tagline: 'Localization · AI Data · Education',
  email: 'hello@mavyedusolution.com',
  domain: 'https://www.mavyedusolution.com',
};

/* — EDIT ME: Trusted clients (marquee) ————————————————————————— */
const CLIENTS = [
  { name: 'Northwind Outfitters', icon: '🧭', color: 'rgba(52,211,153,0.15)' },
  { name: 'Cobalt Games', icon: '🎮', color: 'rgba(34,211,238,0.15)' },
  { name: 'Fennel Health', icon: '🏥', color: 'rgba(244,114,182,0.15)' },
  { name: 'Atlas Robotics', icon: '🤖', color: 'rgba(167,139,250,0.15)' },
  { name: 'Loom & Co.', icon: '🧵', color: 'rgba(34,211,238,0.15)' },
  { name: 'Periwinkle Bank', icon: '🏦', color: 'rgba(167,139,250,0.15)' },
  { name: 'Marrow Studio', icon: '🎨', color: 'rgba(244,114,182,0.15)' },
  { name: 'Fathom Analytics', icon: '📊', color: 'rgba(52,211,153,0.15)' },
  { name: 'Solace EdTech', icon: '🎓', color: 'rgba(34,211,238,0.15)' },
  { name: 'Beacon Learning', icon: '💡', color: 'rgba(167,139,250,0.15)' },
];

const CONTENT = {

  /* — EDIT ME: Localization services ———————————————————————————— */
  services: [
    { num:'01', title:'Software & app localization', body:'String extraction straight from your repo, pseudo-localization to catch truncation before QA does, and full RTL/LTR layout passes so Arabic and Hebrew builds ship without a second sprint.', tags:['i18n keys','RTL/LTR','pseudo-loc'] },
    { num:'02', title:'Document & legal translation', body:'Contracts, patents, and regulatory filings routed to linguists certified in that jurisdiction, with DTP formatting so the delivered file matches your template, not a plain-text dump.', tags:['certified','DTP','ISO 17100'] },
    { num:'03', title:'Multimedia & subtitling', body:'Time-synced subtitles, dubbing scripts, and voice-over direction, plus an audio description pass for accessibility where the market requires it.', tags:['SRT/VTT','voice-over','a11y'] },
    { num:'04', title:'AI-assisted post-editing', body:'Neural machine translation for first drafts, then a native linguist edits against your style guide and glossary — faster than human-only, more accurate than MT alone.', tags:['MTPE','glossary-aware'] },
    { num:'05', title:'Technical documentation', body:'API references, help centers, and manuals localized with a shared terminology database, so "cancel" means the same thing on page one and page four hundred.', tags:['term base','help centers'] },
    { num:'06', title:'Marketing & brand voice', body:'Transcreation for campaigns, taglines, and ad copy — linguists who write for the market, not just translate into it, with a tone-of-voice brief built from your existing English copy.', tags:['transcreation','tone-of-voice'] },
    { num:'07', title:'Multilingual SEO', body:'Keyword research in each target locale, hreflang implementation, and locale-specific meta content so your localized pages rank in local search engines — not just exist in another language.', tags:['hreflang','keyword research','SERP'] },
    { num:'08', title:'Localization testing & QA', body:'Functional and linguistic testing across all target locales — screenshot-based context review, truncation checks, placeholder validation, and cultural appropriateness auditing before release.', tags:['LQA','context review','functional'] },
  ],

  /* — EDIT ME: AI Data services ————————————————————————————————— */
  aiData: [
    { num:'01', title:'Data collection', body:'Text, speech, image, video, and sensor data gathered to your spec — from wake-word audio in 40+ languages to in-the-wild image sets for computer vision, sourced ethically and matched to your domain.', tags:['text','audio','image/video','sensor'] },
    { num:'02', title:'Data annotation & labeling', body:'Bounding boxes, segmentation, transcription, entity tagging, and sentiment labeling, run through multi-stage QC so client-facing accuracy stays above the threshold your model needs, not just above average.', tags:['CV labeling','NLP tagging','QC pipeline'] },
    { num:'03', title:'RLHF & model evaluation', body:'Human raters compare model outputs, rank responses, and flag failure modes, giving you the preference data and evaluation signal needed to fine-tune a domain-specific LLM against your own bar for quality.', tags:['RLHF','red-teaming','eval sets'] },
    { num:'04', title:'Data licensing', body:'Pre-collected, rights-cleared datasets across common domains and languages, so you can license instead of source from zero when a project timeline won\'t allow for ground-up collection.', tags:['rights-cleared','multilingual'] },
    { num:'05', title:'Conversational AI & chatbot training', body:'Dialog datasets, intent-entity annotation, and conversation flow evaluation for virtual assistants — multilingual, domain-specific, and tuned to your persona guidelines and safety standards.', tags:['intent/entity','dialog','persona QA'] },
    { num:'06', title:'Multimodal data pipelines', body:'End-to-end pipelines combining text, image, audio, and video annotation for foundation models — with cross-modal alignment QC, temporal synchronization, and format-specific delivery.', tags:['multimodal','cross-modal','foundation'] },
  ],

  /* — EDIT ME: Education Solutions services ————————————————————— */
  eduSolutions: [
    { num:'01', title:'E-learning localization', body:'Courses, modules, and assessments adapted for local markets — not just translated, but restructured for cultural learning styles, with SCORM/xAPI compliance preserved and interactive elements rebuilt for each locale.', tags:['SCORM','xAPI','interactive'] },
    { num:'02', title:'LMS content adaptation', body:'Moodle, Canvas, Blackboard, and custom LMS content migrated and localized with all metadata, navigation labels, help strings, and learner-facing UI strings included — nothing ships half-translated.', tags:['Moodle','Canvas','Blackboard'] },
    { num:'03', title:'Academic & research translation', body:'Peer-reviewed papers, thesis documents, and grant applications translated by linguists with subject-matter credentials in STEM, humanities, and social sciences — with citation formatting preserved.', tags:['STEM','peer review','citations'] },
    { num:'04', title:'Curriculum development support', body:'New course material created from SME interviews and existing documentation, structured to meet local accreditation standards, learning outcomes, and accessibility requirements across education systems.', tags:['accreditation','outcomes','a11y'] },
    { num:'05', title:'EdTech training data', body:'Labeled educational content for AI tutoring systems — question-answer pairs, student intent classification, pedagogical quality scoring, and difficulty calibration across subject areas and grade levels.', tags:['Q&A pairs','intent','difficulty'] },
  ],

  /* — EDIT ME: Industries —————————————————————————————————————— */
  industries: [
    { icon:'🎮', name:'Gaming', desc:'Simultaneous ship across 20+ markets with in-context linguist review' },
    { icon:'🏥', name:'Healthcare', desc:'Certified medical translation with regulatory compliance per market' },
    { icon:'⚖️', name:'Legal & Finance', desc:'Jurisdiction-aware translation for contracts, filings, and disclosures' },
    { icon:'💻', name:'SaaS & Tech', desc:'Continuous localization integrated into your CI/CD pipeline via API' },
    { icon:'🎓', name:'EdTech', desc:'Course and LMS content adapted for local learning standards' },
    { icon:'🛍️', name:'E-commerce', desc:'Product listings, checkout flows, and support content localized at scale' },
  ],

  /* — EDIT ME: Case studies ————————————————————————————————————— */
  caseStudies: [
    { tag:'Mobile games', name:'Cobalt Games', result:'Simultaneous launch of a mobile title across 22 languages, with in-context screenshots so linguists translated against the actual UI instead of a spreadsheet.', metrics:[ {n:'3 wks', l:'total turnaround'}, {n:'22', l:'languages, one launch date'}, {n:'40%', l:'less string rework'} ] },
    { tag:'Healthcare', name:'Fennel Health', result:'Patient-facing app localized by linguists certified in medical translation, with terminology reviewed against each target market\'s regulatory glossary.', metrics:[ {n:'9', l:'markets cleared'}, {n:'0', l:'compliance revisions'}, {n:'12', l:'certified linguists'} ] },
    { tag:'Technical docs', name:'Atlas Robotics', result:'10,000-page technical manual set localized into 8 languages using a shared term base, cutting the usual back-and-forth on inconsistent terminology.', metrics:[ {n:'8', l:'languages'}, {n:'50%', l:'fewer revision cycles'}, {n:'1', l:'shared term base'} ] },
    { tag:'E-learning', name:'Solace EdTech', result:'Full K–12 curriculum localized for 5 MENA markets with SCORM-compliant packaging, cultural adaptation of examples and imagery, and RTL layout QA.', metrics:[ {n:'5', l:'MENA markets'}, {n:'100%', l:'SCORM compliance'}, {n:'3 mo', l:'project timeline'} ] },
  ],

  /* — EDIT ME: Testimonials ————————————————————————————————————— */
  testimonials: [
    { quote:'Mavy EduSolution shipped our mobile game into 22 languages on the same launch date. Their in-context review caught layout bugs our internal QA missed entirely. We\'ve renewed for every release since.', name:'Priya Sharma', role:'Head of Localization, Cobalt Games', initials:'PS' },
    { quote:'The RLHF annotation team understood our evaluation rubric faster than any vendor we\'ve worked with. The preference data quality was night-and-day compared to our previous provider — our reward model improved on the first fine-tuning round.', name:'Daniel Reeves', role:'ML Engineering Lead, Fathom Analytics', initials:'DR' },
    { quote:'We needed our entire LMS localized for 5 MENA markets with full SCORM compliance — Mavy EduSolution delivered on time with zero packaging failures. Their cultural adaptation of assessment questions was exceptional.', name:'Amira Hassan', role:'VP of Product, Solace EdTech', initials:'AH' },
  ],

  /* — EDIT ME: FAQ ————————————————————————————————————————————— */
  faq: [
    { q:'Is there a minimum project size?', a:'No. Starter-tier projects are billed per word with no minimum order, though very small jobs may still take a full business day to route to the right linguist.' },
    { q:'How is quality checked?', a:'Every string passes through a second, independent linguist for proofreading, then an automated linguistic QA pass checks length limits, placeholders, and formatting tags before delivery.' },
    { q:'What file formats do you accept?', a:'Common formats include JSON, XLIFF, PO, DOCX, SRT/VTT, SCORM packages, and direct repo access for string extraction. If your format isn\'t listed, tell us in the project form and we\'ll confirm support.' },
    { q:'Do you use machine translation?', a:'On the AI-assisted tier, yes — as a first draft only. A native linguist always edits against your glossary and style guide before anything is delivered; MT output is never sent as final copy.' },
    { q:'Can you integrate with our CI/CD pipeline?', a:'Growth and Enterprise tiers include API access so translated strings push directly into your repo or CMS as part of your existing release process.' },
    { q:'What makes your education localization different?', a:'We don\'t just translate courseware — we restructure content for cultural learning styles, rebuild interactive elements for each locale, and validate SCORM/xAPI compliance so packages work in every LMS.' },
    { q:'How do you handle AI training data quality?', a:'Multi-stage QC with inter-annotator agreement metrics, automated consistency checks, and domain-expert review on every batch. We report agreement scores and flag edge cases before delivery.' },
  ],

  /* — EDIT ME: Blog posts ——————————————————————————————————————— 
     To add a new post: copy one object below, change the fields,
     and the blog grid re-renders automatically.
     slug: URL-friendly identifier (for future article pages)
     cat:  must match one of the filter categories above
     ———————————————————————————————————————————————————————————————— */
  blogPosts: [
    { slug:'mt-human-pass', cat:'Localization', title:'Why "good enough" machine translation still needs a human pass', excerpt:'MT gets you a fast first draft. Here\'s where it quietly breaks — idiom, tone, and anything with legal weight — and why a second linguist still has to catch it.', read:'6 min read', date:'Jul 2026' },
    { slug:'rlhf-agreement', cat:'AI Data', title:'RLHF data quality: what "high agreement" actually measures', excerpt:'Inter-rater agreement is easy to game and easy to misread. What it tells you about your preference data, and what it doesn\'t.', read:'7 min read', date:'Jul 2026' },
    { slug:'rtl-layouts', cat:'Engineering', title:'Shipping right-to-left layouts without a second sprint', excerpt:'The layout bugs that only show up in Arabic and Hebrew builds, and how to catch them in QA instead of in a support ticket.', read:'5 min read', date:'Jun 2026' },
    { slug:'wake-word-audio', cat:'AI Data', title:'Sourcing wake-word audio across 40 languages without burning your timeline', excerpt:'What actually slows down multilingual voice data collection — and it usually isn\'t the recording.', read:'6 min read', date:'Jun 2026' },
    { slug:'translation-memory', cat:'Process', title:'What a translation memory actually saves you', excerpt:'Not just money on repeated strings — consistency across releases, and a paper trail when a term changes six months in.', read:'4 min read', date:'May 2026' },
    { slug:'glossary-contract', cat:'Localization', title:'A glossary is a contract: keeping terms consistent across 40 languages', excerpt:'How one unreviewed term change turns into forty inconsistent ones, and the review step that stops it.', read:'5 min read', date:'May 2026' },
    { slug:'multilingual-seo', cat:'Localization', title:'Why multilingual SEO is more than translating your keywords', excerpt:'Hreflang tags, locale-specific search intent, and the gap between "translated" and "discoverable" in 12 markets.', read:'6 min read', date:'Jul 2026' },
    { slug:'red-teaming-llm', cat:'AI Data', title:'Red-teaming your LLM: what annotators actually look for', excerpt:'A practical breakdown of the failure modes human raters flag — and why "sounds correct" is the hardest category to evaluate.', read:'7 min read', date:'Jul 2026' },
    { slug:'elearning-cultural', cat:'EduSolution', title:'Localizing e-learning for cultural learning styles, not just language', excerpt:'Why a translated course isn\'t a localized course — and the structural changes that make assessments work in MENA, LATAM, and APAC markets.', read:'6 min read', date:'Jul 2026' },
    { slug:'scorm-translation', cat:'EduSolution', title:'Why SCORM compliance breaks during translation — and how to prevent it', excerpt:'The packaging failures that only surface after you upload to the LMS, and the QA step that catches them before that.', read:'5 min read', date:'Jun 2026' },
    { slug:'ai-tutoring-data', cat:'EduSolution', title:'Building AI tutoring datasets that actually improve student outcomes', excerpt:'What separates useful Q&A training pairs from noise — difficulty calibration, pedagogical intent tagging, and subject-area coverage.', read:'7 min read', date:'Jun 2026' },
    { slug:'pseudo-localization', cat:'Engineering', title:'Pseudo-localization: catching layout bugs before your linguists do', excerpt:'How synthetic placeholder text with accents and extended characters reveals truncation and overflow issues in your UI before real translation begins.', read:'5 min read', date:'May 2026' },
  ],
};

/* ================================================================
   RENDER FUNCTIONS — You should not need to edit below this line
   unless you are changing layout or behavior.
   ================================================================ */



/* ============ Render: services, AI data, edu grids ============ */
function renderCardGrid(containerId, items) {
  document.getElementById(containerId).innerHTML = items.map(s => `
    <div class="service-card">
      <div class="service-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <div class="service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`).join('');
}
renderCardGrid('servicesGrid', CONTENT.services);
// Bento layout for AI Data — first & last cards span 2 columns
document.getElementById('aiDataGrid').innerHTML = CONTENT.aiData.map((s, i) => `
    <div class="service-card${i === 0 || i === CONTENT.aiData.length - 1 ? ' bento-featured' : ''}">
      <div class="service-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <div class="service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`).join('');
renderCardGrid('eduGrid', CONTENT.eduSolutions);

/* ============ Render: industries ============ */
function renderIndustries() {
  document.getElementById('industriesGrid').innerHTML = CONTENT.industries.map(ind => `
    <div class="industry-card">
      <div class="industry-icon">${ind.icon}</div>
      <h3>${ind.name}</h3>
      <p>${ind.desc}</p>
    </div>`).join('');
}
renderIndustries();

/* ============ Render: case studies ============ */
function renderCaseStudies() {
  const grid = document.getElementById('caseGrid');
  grid.innerHTML = CONTENT.caseStudies.map(c => `
    <div class="case-card" tabindex="0" role="button" aria-expanded="false">
      <span class="case-tag">${c.tag}</span>
      <h3>${c.name}</h3>
      <p class="result">${c.result}</p>
      <span class="case-toggle">View metrics +</span>
      <div class="case-metrics">${c.metrics.map(m => `<div class="case-metric"><b>${m.n}</b><span>${m.l}</span></div>`).join('')}</div>
    </div>`).join('');

  function toggleCase(card) {
    const wasOpen = card.classList.contains('open');
    grid.querySelectorAll('.case-card').forEach(cc => {
      cc.classList.remove('open'); cc.setAttribute('aria-expanded', 'false');
      cc.querySelector('.case-toggle').textContent = 'View metrics +';
    });
    if (!wasOpen) {
      card.classList.add('open'); card.setAttribute('aria-expanded', 'true');
      card.querySelector('.case-toggle').textContent = 'Hide metrics −';
    }
  }
  grid.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', () => toggleCase(card));
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCase(card); } });
  });
}
renderCaseStudies();

/* ============ Render: testimonials ============ */
function renderTestimonials() {
  document.getElementById('testimonialsGrid').innerHTML = CONTENT.testimonials.map(t => `
    <div class="testimonial-card">
      <p class="testimonial-quote">${t.quote}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div class="testimonial-info">
          <h4>${t.name}</h4>
          <span>${t.role}</span>
        </div>
      </div>
    </div>`).join('');
}
renderTestimonials();

/* ============ Render: FAQ ============ */
function renderFaq() {
  const list = document.getElementById('faqList');
  list.innerHTML = CONTENT.faq.map(f => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span>${f.q}</span><span class="plus">+</span></button>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');

  list.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('open'); i.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
}
renderFaq();

/* ============ Render: blog with category filtering ============ */
let blogActiveCat = 'all';
const BLOG_PAGE_SIZE = 6;
let blogVisibleCount = BLOG_PAGE_SIZE;

function renderBlog() {
  const filtered = blogActiveCat === 'all'
    ? CONTENT.blogPosts
    : CONTENT.blogPosts.filter(p => p.cat === blogActiveCat);

  const visible = filtered.slice(0, blogVisibleCount);
  document.getElementById('blogGrid').innerHTML = visible.map(p => `
    <a href="blog/${p.slug}.html" class="blog-card">
      <div class="blog-meta"><span class="blog-cat">${p.cat}</span><span>${p.date}</span></div>
      <h3>${p.title}</h3>
      <p class="blog-excerpt">${p.excerpt}</p>
      <span class="blog-read">${p.read} →</span>
    </a>`).join('');

  const loadMore = document.getElementById('blogLoadMore');
  loadMore.style.display = visible.length < filtered.length ? 'block' : 'none';

  // Trigger reveal animations
  requestAnimationFrame(() => {
    document.querySelectorAll('.blog-card').forEach(c => cardObserver.observe(c));
  });
}
renderBlog();

document.getElementById('blogLoadMore').addEventListener('click', () => {
  blogVisibleCount += BLOG_PAGE_SIZE;
  renderBlog();
});

document.getElementById('blogFilters').querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.getElementById('blogFilters').querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    blogActiveCat = chip.dataset.cat;
    blogVisibleCount = BLOG_PAGE_SIZE;
    renderBlog();
  });
});

/* ============ Newsletter form ============ */
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  e.target.reset();
  setTimeout(() => toast.classList.remove('show'), 3200);
});

/* ============ Mobile menu ============ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
mobileClose.addEventListener('click', closeMobile);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

/* ============ Reduced motion check ============ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

/* ============ Ultra-Modern AI Holographic Cursor Engine ============ */
const aiCursorDot = document.getElementById('aiCursorDot');
const aiCursorRing = document.getElementById('aiCursorRing');
const aiCursorLabel = document.getElementById('aiCursorLabel');
const lensWrap = document.getElementById('lensWrap');
const lensTranslated = document.getElementById('lensTranslated');
const lensLangLabel = document.getElementById('lensLangLabel');

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;
let hoveringLens = false;

if (aiCursorDot && aiCursorRing) {
  // Direct instantaneous dot position tracking
  window.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    aiCursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  }, { passive: true });

  // Smooth 60fps LERP loop for trailing holographic ring
  function animateCursorRing() {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;
    aiCursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursorRing);
  }
  requestAnimationFrame(animateCursorRing);

  // Interactive Hover States with contextual tech labels
  document.querySelectorAll('a, button, .lang-tag, .case-card, .faq-q, .filter-chip, .service-card, .industry-card, .blog-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      aiCursorRing.classList.add('active');
      aiCursorDot.classList.add('active');
      if (aiCursorLabel) {
        if (el.tagName === 'A' || el.tagName === 'BUTTON') aiCursorLabel.textContent = 'SELECT';
        else if (el.classList.contains('service-card')) aiCursorLabel.textContent = 'SERVICE';
        else if (el.classList.contains('case-card')) aiCursorLabel.textContent = 'IMPACT';
        else if (el.classList.contains('industry-card')) aiCursorLabel.textContent = 'INDUSTRY';
        else if (el.classList.contains('blog-card')) aiCursorLabel.textContent = 'READ';
        else aiCursorLabel.textContent = 'EXPLORE';
      }
    });
    el.addEventListener('mouseleave', () => {
      aiCursorRing.classList.remove('active');
      aiCursorDot.classList.remove('active');
    });
  });

  // Spotlight cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Lens hover state
  if (lensWrap) {
    lensWrap.addEventListener('mouseenter', () => {
      hoveringLens = true;
      aiCursorRing.classList.add('lens');
      aiCursorDot.classList.add('active');
    });
    lensWrap.addEventListener('mouseleave', () => {
      hoveringLens = false;
      aiCursorRing.classList.remove('lens');
      aiCursorDot.classList.remove('active');
    });
  }
}

/* language lens sweep */
const lensPhrases = [
  { code: 'ES', text: 'Tu producto, fluido en todas partes.', rtl: false },
  { code: 'JA', text: 'あなたの製品を、どこでも自在に。', rtl: false },
  { code: 'AR', text: 'منتجك، بطلاقة في كل مكان.', rtl: true },
  { code: 'DE', text: 'Dein Produkt, überall verständlich.', rtl: false },
  { code: 'FR', text: 'Votre produit, fluide partout.', rtl: false },
];
let lensIdx = 0;
function setLensPhrase(i) {
  const p = lensPhrases[i];
  lensTranslated.textContent = p.text;
  lensLangLabel.textContent = '→ ' + p.code;
  if (p.rtl) lensTranslated.setAttribute('dir', 'rtl'); else lensTranslated.removeAttribute('dir');
}
setLensPhrase(0);
setInterval(() => { lensIdx = (lensIdx + 1) % lensPhrases.length; setLensPhrase(lensIdx); }, 5000);

function animateLens() {
  const rect = lensWrap.getBoundingClientRect();
  let cx, cy;
  if (hoveringLens && !isCoarsePointer) { cx = mouseX - rect.left; cy = mouseY - rect.top; }
  else { cx = rect.width/2 + Math.sin(Date.now()/1000)*100; cy = rect.height/2; }
  lensTranslated.style.clipPath = `circle(90px at ${cx}px ${cy}px)`;
  requestAnimationFrame(animateLens);
}
animateLens();

/* ============ Scroll reveal + counters ============ */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('stat-card')) {
        const numEl = entry.target.querySelector('.stat-number');
        const target = +numEl.dataset.target;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { clearInterval(timer); numEl.textContent = target + (target === 98 ? '%' : '+'); }
          else numEl.textContent = Math.floor(current);
        }, 25);
      }
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.step, .stat-card').forEach(el => statObserver.observe(el));

/* ============ Card reveal observer (lazy animations) ============ */
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), idx * 60);
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .industry-card, .case-card, .testimonial-card, .blog-card').forEach(el => cardObserver.observe(el));

/* ============ Trust marquee (with icons) ============ */
const trustTrack = document.getElementById('trustTrack');
[...CLIENTS, ...CLIENTS].forEach(c => {
  const el = document.createElement('div');
  el.className = 'trust-item';
  el.innerHTML = `<span class="trust-icon" style="background:${c.color}">${c.icon}</span>${c.name}`;
  trustTrack.appendChild(el);
});

/* ============ Nav active state on scroll ============ */
const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[data-section]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

navSections.forEach(section => navObserver.observe(section));

/* ============ Scroll-to-top button ============ */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ Interactive background: drifting script glyphs ============ */
(function () {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  const GLYPHS = ['A','ぁ','文','字','言','ب','ل','ñ','Ж','Я','न','म','ส','€','漢','ㄱ','ع','é','Ω','ü'];
  const BRASS = '167,139,250'; const CORAL = '34,211,238';
  let w, h, dpr, particles = [];
  let mx = -9999, my = -9999;

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeParticles() {
    const count = w < 700 ? 26 : (w < 1200 ? 42 : 64);
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      size: 14 + Math.random() * 22,
      alpha: 0.06 + Math.random() * 0.2,
      color: Math.random() > 0.5 ? BRASS : CORAL,
    }));
  }

  size(); makeParticles();
  window.addEventListener('resize', () => { size(); makeParticles(); });

  if (!isCoarsePointer) {
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.textBaseline = 'middle';
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -30) p.x = w + 30; if (p.x > w + 30) p.x = -30;
      if (p.y < -30) p.y = h + 30; if (p.y > h + 30) p.y = -30;

      let dx = p.x - mx, dy = p.y - my;
      let dist = Math.sqrt(dx * dx + dy * dy);
      let drawX = p.x, drawY = p.y, alpha = p.alpha;
      const radius = 140;
      if (dist < radius) {
        const force = (radius - dist) / radius;
        drawX += (dx / (dist || 1)) * force * 34;
        drawY += (dy / (dist || 1)) * force * 34;
        alpha = Math.min(0.55, p.alpha + force * 0.4);
      }
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillStyle = `rgba(${p.color},${alpha})`;
      ctx.fillText(p.char, drawX, drawY);
    });
    requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    particles.forEach(p => { ctx.font = `${p.size}px sans-serif`; ctx.fillStyle = `rgba(${p.color},${p.alpha})`; ctx.fillText(p.char, p.x, p.y); });
  } else {
    frame();
  }
})();

/* ============ Languages: data, filter, search ============ */
const languages = [
  { code:'ES', name:'Spanish', tier:'Standard', dir:'ltr', complex:false, sample:'Hola, bienvenido.' },
  { code:'FR', name:'French', tier:'Standard', dir:'ltr', complex:false, sample:'Bonjour, bienvenue.' },
  { code:'DE', name:'German', tier:'Technical focus', dir:'ltr', complex:false, sample:'Hallo, willkommen.' },
  { code:'PT', name:'Portuguese', tier:'Standard', dir:'ltr', complex:false, sample:'Olá, bem-vindo.' },
  { code:'ZH', name:'Chinese (Simplified)', tier:'Specialized', dir:'ltr', complex:true, sample:'你好，欢迎。' },
  { code:'JA', name:'Japanese', tier:'Complex script', dir:'ltr', complex:true, sample:'こんにちは、ようこそ。' },
  { code:'KO', name:'Korean', tier:'Complex script', dir:'ltr', complex:true, sample:'안녕하세요, 환영합니다.' },
  { code:'AR', name:'Arabic', tier:'RTL layout', dir:'rtl', complex:true, sample:'مرحبا بك.' },
  { code:'HE', name:'Hebrew', tier:'RTL layout', dir:'rtl', complex:true, sample:'שלום, ברוך הבא.' },
  { code:'HI', name:'Hindi', tier:'Complex script', dir:'ltr', complex:true, sample:'नमस्ते, आपका स्वागत है।' },
  { code:'RU', name:'Russian', tier:'Standard', dir:'ltr', complex:false, sample:'Здравствуйте, добро пожаловать.' },
  { code:'IT', name:'Italian', tier:'Standard', dir:'ltr', complex:false, sample:'Ciao, benvenuto.' },
  { code:'NL', name:'Dutch', tier:'Standard', dir:'ltr', complex:false, sample:'Hallo, welkom.' },
  { code:'TH', name:'Thai', tier:'Complex script', dir:'ltr', complex:true, sample:'สวัสดี ยินดีต้อนรับ' },
  { code:'VI', name:'Vietnamese', tier:'Standard', dir:'ltr', complex:false, sample:'Xin chào, chào mừng.' },
  { code:'TR', name:'Turkish', tier:'Standard', dir:'ltr', complex:false, sample:'Merhaba, hoş geldiniz.' },
  { code:'UR', name:'Urdu', tier:'RTL layout', dir:'rtl', complex:true, sample:'خوش آمدید۔' },
  { code:'SV', name:'Swedish', tier:'Standard', dir:'ltr', complex:false, sample:'Hej, välkommen.' },
];

const langGrid = document.getElementById('langGrid');
const langDetail = document.getElementById('lang-detail');
const langSearch = document.getElementById('langSearch');
const langFilters = document.getElementById('langFilters');
let activeFilter = 'all';

function renderLangGrid() {
  const q = langSearch.value.trim().toLowerCase();
  langGrid.innerHTML = '';
  languages
    .filter(l => activeFilter === 'all' || (activeFilter === 'rtl' && l.dir === 'rtl') || (activeFilter === 'complex' && l.complex))
    .filter(l => !q || l.name.toLowerCase().includes(q) || l.code.toLowerCase().includes(q))
    .forEach(lang => {
      const tag = document.createElement('div');
      tag.className = 'lang-tag';
      tag.tabIndex = 0; tag.setAttribute('role', 'button');
      tag.innerHTML = `<div class="code">${lang.code}</div><div class="name">${lang.name}</div><div class="tier">${lang.tier}</div>`;
      const select = () => {
        document.querySelectorAll('.lang-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        langDetail.innerHTML = `<div class="sample" dir="${lang.dir}" lang="${lang.code.toLowerCase()}">${lang.sample}</div><div class="facts"><span><b>${lang.name}</b></span><span>Tier: <b>${lang.tier}</b></span><span>Direction: <b>${lang.dir.toUpperCase()}</b></span></div>`;
        langDetail.classList.add('show');
      };
      tag.addEventListener('click', select);
      tag.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } });
      langGrid.appendChild(tag);
    });
}
renderLangGrid();
langSearch.addEventListener('input', renderLangGrid);
langFilters.querySelectorAll('.filter-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    langFilters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.dataset.filter;
    renderLangGrid();
  });
});

/* ============ Form validation & submission ============ */
const form = document.getElementById('projectForm');
const toast = document.getElementById('toast');

function validateField(input, errorEl) {
  if (!input.value.trim()) {
    input.style.borderColor = '#ff8577';
    errorEl.style.display = 'block';
    return false;
  }
  input.style.borderColor = '';
  errorEl.style.display = 'none';
  return true;
}

function validateEmail(input, errorEl) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ok = re.test(input.value.trim());
  input.style.borderColor = ok ? '' : '#ff8577';
  errorEl.style.display = ok ? 'none' : 'block';
  return ok;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const service = document.getElementById('service');
  const message = document.getElementById('message');

  const nameOk = validateField(name, name.nextElementSibling.nextElementSibling);
  const emailOk = validateEmail(email, email.nextElementSibling.nextElementSibling);
  const serviceOk = !!service.value;
  const messageOk = validateField(message, message.nextElementSibling.nextElementSibling);

  if (nameOk && emailOk && serviceOk && messageOk) {
    // GA4 event tracking
    if (typeof gtag === 'function') gtag('event', 'form_submit', { event_category: 'contact', event_label: service.value });
    toast.textContent = 'âœ… Project request sent successfully!';
    toast.classList.add('show');
    form.reset();
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
});

/* ============ Section heading reveal on scroll ============ */
const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      headingObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section-head').forEach(el => headingObserver.observe(el));

/* ============ Cookie consent ============ */
(function() {
  const banner = document.getElementById('cookieBanner');
  const accepted = localStorage.getItem('cookie-consent');
  if (!accepted) {
    setTimeout(() => banner.classList.add('show'), 1500);
  }
  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    banner.classList.remove('show');
    if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: 'granted' });
  });
  document.getElementById('cookieDecline').addEventListener('click', () => {
    localStorage.setItem('cookie-consent', 'declined');
    banner.classList.remove('show');
  });
})();

/* ============ GA4 blog click tracking ============ */
document.getElementById('blogGrid').addEventListener('click', (e) => {
  const card = e.target.closest('.blog-card');
  if (card && typeof gtag === 'function') {
    gtag('event', 'blog_click', { event_label: card.querySelector('h3')?.textContent || '' });
  }
});




/* ================================================================
   3D OVERHAUL JAVASCRIPT INJECTIONS
   ================================================================ */

(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  // 1. Magnetic Hover for Nav & Buttons
  if (!isTouch) {
    const magneticEls = document.querySelectorAll('.btn-primary, .btn-outline, .nav-links a');
    magneticEls.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  // 2. 3D Tilt Cards with Glare
  const tiltCards = document.querySelectorAll('.service-card, .industry-card, .case-card, .testimonial-card, .step, .blog-card');
  
  tiltCards.forEach(card => {
    // Inject glare div
    const glare = document.createElement('div');
    glare.className = 'card-glare';
    card.appendChild(glare);

    if (!isTouch && !isReducedMotion) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate tilt (-15 to 15 deg)
        const tiltX = ((x / rect.width) - 0.5) * 30;
        const tiltY = ((y / rect.height) - 0.5) * -30;
        
        card.style.setProperty('--tilt-x', `${tiltX}deg`);
        card.style.setProperty('--tilt-y', `${tiltY}deg`);
        card.style.setProperty('--glare-x', `${x}px`);
        card.style.setProperty('--glare-y', `${y}px`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tilt-x', `0deg`);
        card.style.setProperty('--tilt-y', `0deg`);
      });
    }
  });

  // 3. Staggered Scroll Reveal (IntersectionObserver)
  if (!isReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      let delay = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, delay);
          delay += 100; // Stagger delay
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    tiltCards.forEach(card => observer.observe(card));
  } else {
    // Instant reveal
    tiltCards.forEach(card => card.classList.add('revealed'));
  }

  // 4. Custom Cursor 3D State on Hero
  if (!isTouch) {
    const heroCanvas = document.getElementById('bgCanvas');
    const ring = document.getElementById('aiCursorRing');
    const dot = document.getElementById('aiCursorDot');
    if (heroCanvas && ring && dot) {
      heroCanvas.addEventListener('mouseenter', () => { ring.setAttribute('data-cursor', '3d'); dot.setAttribute('data-cursor', '3d'); });
      heroCanvas.addEventListener('mouseleave', () => { ring.removeAttribute('data-cursor'); dot.removeAttribute('data-cursor'); });
    }
  }
})();

// Three.js code removed




/* ================================================================
   FLOATING CHARACTERS ANIMATION
   ================================================================ */
(() => {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const canvas = document.getElementById('charsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789Ã†Î£Î©ã ‚ã „ã †äºœæ–°'.split('');
  const particles = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  class CharParticle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial random spread
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.speed = 0.2 + Math.random() * 0.5;
      this.char = chars[Math.floor(Math.random() * chars.length)];
      this.size = 10 + Math.random() * 24;
      this.opacity = 0.1 + Math.random() * 0.4;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    update() {
      this.y -= this.speed;
      this.rotation += this.rotSpeed;
      if (this.y < -50) this.reset();
    }
    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.fillStyle = `rgba(202, 162, 68, ${this.opacity})`; // Brass color
      ctx.font = `${this.size}px "IBM Plex Mono"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.char, 0, 0);
      ctx.restore();
    }
  }

  // Determine count based on screen size to keep performance
  const count = Math.min(Math.floor(window.innerWidth / 20), 80);
  for (let i = 0; i < count; i++) {
    particles.push(new CharParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });
    requestAnimationFrame(animate);
  }
  animate();
})();



/* ================================================================
   ELEGANCE: Constellation Mesh Canvas + Split Slider
   ================================================================ */

/* --- 1. Interactive Constellation Mesh (Hero Background) --- */
(() => {
  const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let w, h, dpr;
  let mx = -9999, my = -9999;
  const nodes = [];
  const NODE_COUNT = window.innerWidth < 768 ? 35 : 70;
  const CONN_DIST = 140;
  const MOUSE_R = 180;

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    const palette = ['167,139,250','34,211,238','244,114,182','52,211,153'];
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1.2 + Math.random() * 1.8,
        glow: Math.random() > 0.75,
        color: palette[Math.floor(Math.random() * palette.length)]
      });
    }
  }
  resize(); seed();
  window.addEventListener('resize', () => { resize(); seed(); });
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) {
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
  }

  let visible = true;
  const hero = document.getElementById('hero');
  if (hero) {
    const obs = new IntersectionObserver(e => { visible = e[0].isIntersecting; });
    obs.observe(hero);
  }

  function draw() {
    requestAnimationFrame(draw);
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
      if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
      const dx = n.x - mx, dy = n.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_R && dist > 0) {
        const f = (MOUSE_R - dist) / MOUSE_R * 0.6;
        n.x += (dx / dist) * f * 2;
        n.y += (dy / dist) * f * 2;
      }
    });
    // Edges — violet tinted data connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONN_DIST) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(167,139,250,${(1 - d / CONN_DIST) * 0.15})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    // Nodes — multi-colored data points
    nodes.forEach(n => {
      if (n.glow) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},0.04)`; ctx.fill();
      }
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},0.7)`; ctx.fill();
    });
  }
  if (isRM) {
    nodes.forEach(n => {
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},0.4)`; ctx.fill();
    });
  } else { draw(); }
})();

/* --- 3. Before/After Split Slider Interaction --- */
(() => {
  const container = document.getElementById('splitContainer');
  const handle = document.getElementById('splitHandle');
  const after = container ? container.querySelector('.split-side--after') : null;
  if (!container || !handle || !after) return;
  let dragging = false;

  function update(clientX) {
    const rect = container.getBoundingClientRect();
    let x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const pct = (x / rect.width) * 100;
    after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  container.addEventListener('mousedown', e => { dragging = true; update(e.clientX); });
  window.addEventListener('mousemove', e => { if (dragging) update(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });

  // Touch
  handle.addEventListener('touchstart', e => { dragging = true; e.preventDefault(); }, { passive: false });
  container.addEventListener('touchstart', e => { dragging = true; update(e.touches[0].clientX); });
  window.addEventListener('touchmove', e => { if (dragging) update(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend', () => { dragging = false; });
})();



/* ================================================================
   4D INTERACTIVE DEPTH ENGINE
   ================================================================ */

/* --- 1. Scroll Progress Bar --- */
(() => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / h * 100) + '%';
  }, { passive: true });
})();

/* --- 2. Parallax Floating Shapes (mouse-reactive) --- */
(() => {
  const shapes = document.querySelectorAll('.float-shape');
  if (!shapes.length) return;
  // Fade in after load
  setTimeout(() => shapes.forEach(s => s.classList.add('loaded')), 500);
  // Mouse parallax
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch) {
    let mx = 0.5, my = 0.5;
    window.addEventListener('mousemove', e => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    });
    const depths = [0.02, 0.035, 0.025, 0.015, 0.03];
    function animateShapes() {
      shapes.forEach((s, i) => {
        const d = depths[i % depths.length];
        const ox = (mx - 0.5) * window.innerWidth * d;
        const oy = (my - 0.5) * window.innerHeight * d;
        s.style.transform = s.style.transform.replace(/translate\([^)]*\)/, '') || '';
        const current = getComputedStyle(s).transform;
        s.style.setProperty('--px', ox + 'px');
        s.style.setProperty('--py', oy + 'px');
        s.style.translate = `${ox}px ${oy}px`;
      });
      requestAnimationFrame(animateShapes);
    }
    animateShapes();
  }
})();

/* --- 3. Conic Gradient Card Angle (follows mouse on hover) --- */
(() => {
  const cards = document.querySelectorAll('.service-card, .industry-card, .case-card, .blog-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
      card.style.setProperty('--card-angle', angle + 'deg');
    });
  });
})();

/* --- 4. Section Depth Parallax on Scroll --- */
(() => {
  const sections = document.querySelectorAll('section');
  const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isRM) return;
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transform = 'translateZ(0)';
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(s);
  });
})();

/* --- 5. Enhanced Constellation: Add color variety --- */
(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  // Override the draw colors with multi-chromatic nodes
  // We do this by adding a secondary overlay effect
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;opacity:0.2;';
  overlayCanvas.setAttribute('aria-hidden', 'true');
  document.body.insertBefore(overlayCanvas, document.body.firstChild);
  const octx = overlayCanvas.getContext('2d');
  let ow, oh;
  function resizeOverlay() {
    ow = window.innerWidth; oh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    overlayCanvas.width = ow * dpr; overlayCanvas.height = oh * dpr;
    overlayCanvas.style.width = ow + 'px'; overlayCanvas.style.height = oh + 'px';
    octx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeOverlay();
  window.addEventListener('resize', resizeOverlay);
  
  const sparkles = [];
  for (let i = 0; i < 30; i++) {
    sparkles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.8 + Math.random() * 1.5,
      color: ['rgba(167,139,250,', 'rgba(34,211,238,', 'rgba(244,114,182,', 'rgba(52,211,153,'][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.7
    });
  }
  
  let time = 0;
  function drawSparkles() {
    requestAnimationFrame(drawSparkles);
    time += 0.016;
    octx.clearRect(0, 0, ow, oh);
    sparkles.forEach(s => {
      const pulse = 0.3 + 0.7 * Math.abs(Math.sin(time * s.speed + s.phase));
      octx.beginPath();
      octx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
      octx.fillStyle = s.color + (pulse * 0.08) + ')';
      octx.fill();
      octx.beginPath();
      octx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      octx.fillStyle = s.color + pulse + ')';
      octx.fill();
    });
  }
  drawSparkles();
})();

/* --- 6. Floating Badge Parallax Micro-motion --- */
(() => {
  const badges = document.querySelectorAll('.float-badge');
  if (!badges.length) return;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    badges.forEach((b, i) => {
      const offset = Math.sin(sy * 0.003 + i * 1.5) * 8;
      b.style.transform = `translateY(${offset}px) rotate(${offset * 0.2}deg)`;
    });
  }, { passive: true });
})();

/* --- 7. Glow Line Intersection Trigger --- */
(() => {
  const lines = document.querySelectorAll('.glow-line');
  if (!lines.length) return;
  lines.forEach(l => { l.style.opacity = '0'; l.style.transition = 'opacity 1s ease'; });
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.style.opacity = '1'; });
  }, { threshold: 0.5 });
  lines.forEach(l => obs.observe(l));
})();


/* ================================================================
   HERO WORD ROTATION — cycles "fluent" through 6 languages
   ================================================================ */
(() => {
  const em = document.querySelector('.hero h1 em, #main h1 em');
  if (!em) return;
  const words = [
    { text: 'fluent', lang: 'en' },
    { text: 'fluido', lang: 'es' },
    { text: '流暢', lang: 'ja' },
    { text: 'بطلاقة', lang: 'ar' },
    { text: 'fließend', lang: 'de' },
    { text: 'couramment', lang: 'fr' },
  ];
  let idx = 0;
  const isRM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isRM) return;

  function cycle() {
    em.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    em.style.opacity = '0';
    em.style.transform = 'translateY(8px)';
    setTimeout(() => {
      idx = (idx + 1) % words.length;
      em.textContent = words[idx].text;
      em.style.direction = words[idx].lang === 'ar' ? 'rtl' : 'ltr';
      em.style.opacity = '1';
      em.style.transform = 'translateY(0)';
    }, 400);
  }
  setInterval(cycle, 3000);
})();

window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
    const reveal = document.getElementById('page-reveal');
    if (reveal) reveal.classList.add('hidden');
  }, 2200);
});

/* ============ Theme Toggle & LocalStorage ============ */
(() => {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('mavy_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mavy_theme', next);
      themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
    });
  }
})();