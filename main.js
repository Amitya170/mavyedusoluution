window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
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
  brand: 'Mavy EduSolutions',
  tagline: 'Localization · AI Data · Education',
  email: 'collab@mavyedusolutions.co.in',
  domain: 'https://www.mavyedusolution.com',
};

/* — EDIT ME: Trusted clients (marquee) ————————————————————————— */
const CLIENTS = [
  { name: 'ISO 9001:2015 Certified', icon: '🛡️', color: 'rgba(212,175,55,0.2)' },
  { name: 'ISO/IEC 27001:2022 Certified', icon: '🔒', color: 'rgba(56,189,248,0.2)' },
  { name: 'ISO 17100:2015 Compliant', icon: '🌐', color: 'rgba(16,185,129,0.2)' },
  { name: 'SOC 2 Type II Audited', icon: '✨', color: 'rgba(212,175,55,0.2)' },
  { name: 'Northwind Outfitters', icon: '🧭', color: 'rgba(52,211,153,0.15)' },
  { name: 'Cobalt Games', icon: '🎮', color: 'rgba(56,189,248,0.15)' },
  { name: 'Fennel Health', icon: '🏥', color: 'rgba(244,114,182,0.15)' },
  { name: 'Atlas Robotics', icon: '🤖', color: 'rgba(212,175,55,0.15)' },
  { name: 'Loom & Co.', icon: '🧵', color: 'rgba(56,189,248,0.15)' },
  { name: 'Periwinkle Bank', icon: '🏦', color: 'rgba(212,175,55,0.15)' },
  { name: 'Fathom Analytics', icon: '📊', color: 'rgba(52,211,153,0.15)' },
  { name: 'Solace EdTech', icon: '🎓', color: 'rgba(56,189,248,0.15)' },
  { name: 'Beacon Learning', icon: '💡', color: 'rgba(212,175,55,0.15)' },
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
    { quote:'Mavy EduSolutions shipped our mobile game into 22 languages on the same launch date. Their in-context review caught layout bugs our internal QA missed entirely. We\'ve renewed for every release since.', name:'Priya Sharma', role:'Head of Localization, Cobalt Games', initials:'PS' },
    { quote:'The RLHF annotation team understood our evaluation rubric faster than any vendor we\'ve worked with. The preference data quality was night-and-day compared to our previous provider — our reward model improved on the first fine-tuning round.', name:'Daniel Reeves', role:'ML Engineering Lead, Fathom Analytics', initials:'DR' },
    { quote:'We needed our entire LMS localized for 5 MENA markets with full SCORM compliance — Mavy EduSolutions delivered on time with zero packaging failures. Their cultural adaptation of assessment questions was exceptional.', name:'Amira Hassan', role:'VP of Product, Solace EdTech', initials:'AH' },
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
    { slug:'elearning-cultural', cat:'EduSolutions', title:'Localizing e-learning for cultural learning styles, not just language', excerpt:'Why a translated course isn\'t a localized course — and the structural changes that make assessments work in MENA, LATAM, and APAC markets.', read:'6 min read', date:'Jul 2026' },
    { slug:'scorm-translation', cat:'EduSolutions', title:'Why SCORM compliance breaks during translation — and how to prevent it', excerpt:'The packaging failures that only surface after you upload to the LMS, and the QA step that catches them before that.', read:'5 min read', date:'Jun 2026' },
    { slug:'ai-tutoring-data', cat:'EduSolutions', title:'Building AI tutoring datasets that actually improve student outcomes', excerpt:'What separates useful Q&A training pairs from noise — difficulty calibration, pedagogical intent tagging, and subject-area coverage.', read:'7 min read', date:'Jun 2026' },
    { slug:'pseudo-localization', cat:'Engineering', title:'Pseudo-localization: catching layout bugs before your linguists do', excerpt:'How synthetic placeholder text with accents and extended characters reveals truncation and overflow issues in your UI before real translation begins.', read:'5 min read', date:'May 2026' },
    { slug:'multimodal-dataset-curation', cat:'AI Data', title:'Curating Multimodal Datasets for Vision-Language Models: Image-Text Pairing at Scale', excerpt:'High-quality image-text alignment for VLM fine-tuning. How synthetic captioning, bounding box verification, and OCR extraction prevent hallucination.', read:'8 min read', date:'Jul 2026' },
    { slug:'llm-localization-eval', cat:'Localization', title:'Evaluating LLM Translation Quality: COMET, BLEU, and Human Rating Correlation', excerpt:'Why traditional BLEU scores fail to capture semantic nuance in modern LLM translations, and how COMET metrics paired with MQM human evaluation set the gold standard.', read:'7 min read', date:'Jul 2026' },
    { slug:'adaptive-learning-analytics', cat:'EduSolutions', title:'Designing Adaptive Learning Engines: Item Response Theory (IRT) in Modern EdTech', excerpt:'How 3PL Item Response Theory and knowledge tracing algorithms dynamically adjust question difficulty for personalized student learning pathways.', read:'6 min read', date:'Jul 2026' },
    { slug:'multilingual-voice-cloning', cat:'AI Data', title:'Zero-Shot Multilingual Voice Cloning: Dataset Requirements & Phoneme Alignment', excerpt:'What makes voice cloning sound natural across language boundaries — IPA phoneme mapping, studio-quality noise floor, and cross-lingual prosody transfer.', read:'7 min read', date:'Jul 2026' },
    { slug:'rag-chunking-localization', cat:'Engineering', title:'Chunking Strategies for Multilingual RAG: Retaining Semantic Context Across Languages', excerpt:'Why fixed-length character chunking breaks cross-lingual vector retrieval, and how sentence-boundary awareness and metadata enrichment boost RAG accuracy.', read:'6 min read', date:'Jul 2026' },
    { slug:'enterprise-lqa-framework', cat:'Localization', title:'Building an Enterprise LQA Framework: DQF-MQM Error Typology in Practice', excerpt:'Standardizing localization quality audit scoring across 40 vendors with DQF-MQM severity weighting and automated quality gates.', read:'7 min read', date:'Jul 2026' },
    { slug:'ai-voice-dubbing-ethics', cat:'AI Data', title:'The ethical framework for AI voice cloning and dubbing', excerpt:'As synthetic voice reaches parity with human actors, how do we handle consent, compensation, and copyright? A look into our voice AI training guidelines.', read:'5 min read', date:'Jul 2026' },
    { slug:'semantic-search-seo', cat:'Localization', title:'Beyond keywords: Semantic SEO in global markets', excerpt:'Why translating your English keyword list is actively harming your international SEO, and how to optimize for semantic search intent instead.', read:'6 min read', date:'Aug 2026' },
    { slug:'immersive-vr-learning', cat:'EduSolutions', title:'Localizing VR and AR learning environments', excerpt:'Text expansion is hard on a screen. It\'s even harder in 3D space. How we adapt immersive spatial learning experiences for global audiences.', read:'8 min read', date:'Aug 2026' },
    { slug:'llm-jailbreak-red-teaming', cat:'AI Data', title:'Multilingual Red Teaming: Finding LLM vulnerabilities across 50 languages', excerpt:'An LLM might be safe in English, but easily jailbroken in Swahili. Why foundation models need comprehensive multilingual red teaming.', read:'7 min read', date:'Aug 2026' },
    { slug:'llm-agent-tool-calling-multilingual', cat:'AI Data', title:'Benchmarking Tool & Function Calling in Multilingual LLM Agents', excerpt:'Why function calling breaks down when user prompts are in Hindi, Arabic, or Japanese, and how to build robust cross-lingual parameter extraction benchmarks.', read:'7 min read', date:'Aug 2026' },
    { slug:'multilingual-tokenizer-fertility', cat:'Engineering', title:'Tokenizer Fertility in Low-Resource Languages: Why Your LLM Costs 4x More in Hindi and Swahili', excerpt:'Subword tokenization disparities penalize non-English LLM queries with inflated inference latency, truncated context windows, and 4x cost multipliers.', read:'8 min read', date:'Aug 2026' },
    { slug:'synthetic-data-contamination-eval', cat:'AI Data', title:'Synthetic Data Generation & Contamination Auditing in Multilingual Foundation Models', excerpt:'How translation-based synthetic data secretly leaks English benchmark answers into multilingual test splits, and how to detect contamination before pre-training.', read:'7 min read', date:'Aug 2026' },
    { slug:'enterprise-ai-act-localization', cat:'Localization', title:'EU AI Act Compliance: Localizing Technical Documentation & Model Cards for Global Regulators', excerpt:'Translating algorithmic impact assessments, high-risk AI system cards, and automated disclosures without regulatory ambiguity across EU member states.', read:'6 min read', date:'Sep 2026' },
    { slug:'longform-neural-voice-dubbing', cat:'AI Data', title:'Long-Form Neural Voice Dubbing: Prosody Preservation and Lip-Sync Timing at Scale', excerpt:'Why standard TTS engines fail on 45-minute e-learning modules, and how neural prosody contouring maintains natural vocal fatigue and breath dynamics.', read:'7 min read', date:'Sep 2026' },
    { slug:'xapi-cmi5-global-lms', cat:'EduSolutions', title:'xAPI and cmi5 in Global E-Learning: Modernizing Beyond Legacy SCORM for Multilingual Telemetry', excerpt:'How to capture granular learner behavior across localized courses without breaking state persistence when students switch language tracks mid-session.', read:'6 min read', date:'Sep 2026' },
  ],
};

/* ================================================================
   RENDER FUNCTIONS — You should not need to edit below this line
   unless you are changing layout or behavior.
   ================================================================ */




/* ============ Render helpers (Null-Safe) ============ */

/* ================================================================
   DIMENSIONAL 4D VECTOR ICON DEFINITIONS
   ================================================================ */
function getDimIcon(type, num) {
  const gold = "#d4af37";
  const sapphire = "#38bdf8";
  const emerald = "#10b981";

  const icons = {
    "serv-01": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M16 3V29M4 9.5L16 16L28 9.5M4 22.5L16 16L28 22.5" stroke="${sapphire}" stroke-width="1.2" stroke-opacity="0.6"/>
      <circle cx="16" cy="16" r="3" fill="${gold}" fill-opacity="0.8"/>
      <circle cx="9" cy="12" r="1.5" fill="${emerald}"/>
      <circle cx="23" cy="12" r="1.5" fill="${sapphire}"/>
    </svg>`,
    "serv-02": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="16" height="22" rx="3" stroke="${gold}" stroke-width="1.8"/>
      <rect x="10" y="8" width="16" height="20" rx="3" stroke="${sapphire}" stroke-width="1.2" stroke-opacity="0.6"/>
      <line x1="10" y1="10" x2="18" y2="10" stroke="${gold}" stroke-width="1.5"/>
      <line x1="10" y1="14" x2="18" y2="14" stroke="${gold}" stroke-width="1.5"/>
      <line x1="10" y1="18" x2="15" y2="18" stroke="${gold}" stroke-width="1.5"/>
      <circle cx="21" cy="22" r="4" fill="${gold}" fill-opacity="0.2" stroke="${gold}" stroke-width="1.2"/>
    </svg>`,
    "serv-03": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="${sapphire}" stroke-width="1.8" stroke-dasharray="3 3"/>
      <path d="M7 16C7 16 11 9 16 9C21 9 25 16 25 16C25 16 21 23 16 23C11 23 7 16 7 16Z" stroke="${gold}" stroke-width="1.8"/>
      <circle cx="16" cy="16" r="3.5" fill="${emerald}"/>
      <line x1="12" y1="26" x2="20" y2="26" stroke="${gold}" stroke-width="1.5"/>
    </svg>`,
    "serv-04": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L22 10L12 26H6V20L16 4Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <circle cx="23" cy="9" r="3" fill="${sapphire}" fill-opacity="0.3" stroke="${sapphire}" stroke-width="1.2"/>
      <path d="M19 19L27 23M23 15L29 17M15 23L21 27" stroke="${emerald}" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`,
    "serv-05": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M4 8C8 6 13 7 16 10C19 7 24 6 28 8V24C24 22 19 23 16 26C13 23 8 22 4 24V8Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <line x1="16" y1="10" x2="16" y2="26" stroke="${sapphire}" stroke-width="1.5"/>
      <circle cx="22" cy="14" r="1.5" fill="${emerald}"/>
      <circle cx="10" cy="14" r="1.5" fill="${gold}"/>
    </svg>`,
    "serv-06": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M6 12H11L19 6V26L11 20H6V12Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M22 11C24 13 24 19 22 21" stroke="${sapphire}" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M25 8C28 12 28 20 25 24" stroke="${emerald}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`,
    "serv-07": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="${sapphire}" stroke-width="1.8"/>
      <ellipse cx="16" cy="16" rx="5" ry="11" stroke="${sapphire}" stroke-width="1.2" stroke-opacity="0.6"/>
      <line x1="5" y1="16" x2="27" y2="16" stroke="${sapphire}" stroke-width="1.2" stroke-opacity="0.6"/>
      <circle cx="21" cy="11" r="3" fill="${gold}" stroke="${gold}" stroke-width="1.5"/>
      <path d="M23 13L27 17" stroke="${gold}" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    "serv-08": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M16 4L26 8V16C26 22 22 26 16 28C10 26 6 22 6 16V8L16 4Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M11 16L14.5 19.5L21 13" stroke="${emerald}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    "ai-01": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="4" fill="${gold}" fill-opacity="0.4" stroke="${gold}" stroke-width="1.8"/>
      <circle cx="7" cy="9" r="2.5" stroke="${sapphire}" stroke-width="1.5"/>
      <circle cx="25" cy="9" r="2.5" stroke="${sapphire}" stroke-width="1.5"/>
      <circle cx="16" cy="27" r="2.5" stroke="${emerald}" stroke-width="1.5"/>
      <line x1="9" y1="10" x2="13" y2="14" stroke="${gold}" stroke-width="1.2" stroke-dasharray="2 2"/>
      <line x1="23" y1="10" x2="19" y2="14" stroke="${gold}" stroke-width="1.2" stroke-dasharray="2 2"/>
      <line x1="16" y1="20" x2="16" y2="24" stroke="${emerald}" stroke-width="1.2" stroke-dasharray="2 2"/>
    </svg>`,
    "ai-02": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="6" width="20" height="20" rx="3" stroke="${gold}" stroke-width="1.8" stroke-dasharray="3 3"/>
      <circle cx="6" cy="6" r="2" fill="${gold}"/>
      <circle cx="26" cy="6" r="2" fill="${gold}"/>
      <circle cx="6" cy="26" r="2" fill="${gold}"/>
      <circle cx="26" cy="26" r="2" fill="${gold}"/>
      <rect x="11" y="11" width="10" height="10" rx="2" fill="${sapphire}" fill-opacity="0.25" stroke="${sapphire}" stroke-width="1.5"/>
    </svg>`,
    "ai-03": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <line x1="16" y1="5" x2="16" y2="27" stroke="${gold}" stroke-width="2"/>
      <line x1="7" y1="10" x2="25" y2="10" stroke="${gold}" stroke-width="2"/>
      <path d="M7 10L4 18H10L7 10Z" stroke="${sapphire}" stroke-width="1.5" fill="${sapphire}" fill-opacity="0.2"/>
      <path d="M25 10L22 18H28L25 10Z" stroke="${emerald}" stroke-width="1.5" fill="${emerald}" fill-opacity="0.2"/>
      <rect x="12" y="27" width="8" height="2" rx="1" fill="${gold}"/>
    </svg>`,
    "ai-04": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="12" width="20" height="16" rx="4" stroke="${gold}" stroke-width="1.8"/>
      <path d="M10 12V8C10 4.68 12.68 2 16 2C19.32 2 22 4.68 22 8V12" stroke="${sapphire}" stroke-width="2"/>
      <circle cx="16" cy="20" r="2.5" fill="${emerald}"/>
      <line x1="16" y1="22.5" x2="16" y2="25" stroke="${emerald}" stroke-width="2"/>
    </svg>`,
    "ai-05": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M6 14C6 8.5 10 4 15 4C20 4 24 8.5 24 14C24 19.5 20 24 15 24H11L5 28V20C5 18 6 16 6 14Z" stroke="${gold}" stroke-width="1.8"/>
      <circle cx="11" cy="14" r="1.5" fill="${gold}"/>
      <circle cx="15" cy="14" r="1.5" fill="${sapphire}"/>
      <circle cx="19" cy="14" r="1.5" fill="${emerald}"/>
    </svg>`,
    "ai-06": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="${sapphire}" stroke-width="1.5" stroke-opacity="0.5"/>
      <polygon points="16,4 26,16 16,28 6,16" stroke="${gold}" stroke-width="1.8"/>
      <line x1="4" y1="16" x2="28" y2="16" stroke="${emerald}" stroke-width="1.5"/>
      <line x1="16" y1="4" x2="16" y2="28" stroke="${emerald}" stroke-width="1.5"/>
      <circle cx="16" cy="16" r="2.5" fill="${gold}"/>
    </svg>`
  };

  const key = type === "serv" ? `serv-${num}` : `ai-${num}`;
  return icons[key] || icons["serv-01"];
}

function getIndEmblem(name) {
  const gold = "#d4af37";
  const sapphire = "#38bdf8";
  const emerald = "#10b981";

  const map = {
    "Gaming": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="9" width="22" height="14" rx="7" stroke="${gold}" stroke-width="1.8"/>
      <path d="M10 13V19M7 16H13" stroke="${sapphire}" stroke-width="2" stroke-linecap="round"/>
      <circle cx="21" cy="14" r="1.5" fill="${emerald}"/>
      <circle cx="24" cy="17" r="1.5" fill="${gold}"/>
    </svg>`,
    "Healthcare": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M13 5H19V13H27V19H19V27H13V19H5V13H13V5Z" stroke="${sapphire}" stroke-width="1.8" fill="${sapphire}" fill-opacity="0.15" stroke-linejoin="round"/>
      <circle cx="16" cy="16" r="3" fill="${emerald}"/>
    </svg>`,
    "Legal & Finance": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <line x1="6" y1="28" x2="26" y2="28" stroke="${gold}" stroke-width="2"/>
      <line x1="8" y1="10" x2="8" y2="26" stroke="${gold}" stroke-width="1.8"/>
      <line x1="16" y1="10" x2="16" y2="26" stroke="${gold}" stroke-width="1.8"/>
      <line x1="24" y1="10" x2="24" y2="26" stroke="${gold}" stroke-width="1.8"/>
      <polygon points="16,4 4,10 28,10" stroke="${gold}" stroke-width="1.8" fill="${sapphire}" fill-opacity="0.2"/>
    </svg>`,
    "SaaS & Tech": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="5" width="22" height="7" rx="2" stroke="${gold}" stroke-width="1.8"/>
      <rect x="5" y="14" width="22" height="7" rx="2" stroke="${sapphire}" stroke-width="1.8"/>
      <rect x="5" y="23" width="22" height="5" rx="2" stroke="${emerald}" stroke-width="1.5"/>
      <circle cx="9" cy="8.5" r="1.2" fill="${gold}"/>
      <circle cx="9" cy="17.5" r="1.2" fill="${sapphire}"/>
      <circle cx="9" cy="25.5" r="1.2" fill="${emerald}"/>
    </svg>`,
    "EdTech": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <polygon points="16,5 29,12 16,19 3,12" stroke="${gold}" stroke-width="1.8" fill="${gold}" fill-opacity="0.2"/>
      <path d="M8 15V22C8 25 11.5 27 16 27C20.5 27 24 25 24 22V15" stroke="${sapphire}" stroke-width="1.8"/>
      <line x1="26" y1="14" x2="26" y2="23" stroke="${emerald}" stroke-width="1.5"/>
    </svg>`,
    "E-commerce": `<svg class="dim-svg-icon" viewBox="0 0 32 32" fill="none">
      <path d="M6 9H26L24 25H8L6 9Z" stroke="${gold}" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M11 12V7C11 4.5 13 3 16 3C19 3 21 4.5 21 7V12" stroke="${sapphire}" stroke-width="1.8"/>
      <circle cx="16" cy="17" r="3" fill="${emerald}" fill-opacity="0.3" stroke="${emerald}" stroke-width="1.2"/>
    </svg>`
  };

  return map[name] || map["Gaming"];
}

function renderCardGrid(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el || !items) return;
  const isServ = containerId === 'servicesGrid';
  el.innerHTML = items.map((s) => `
    <div class="service-card tilt-card">
      <div class="service-card-header">
        <div class="dim-icon-wrap">
          ${getDimIcon(isServ ? 'serv' : 'ai', s.num)}
        </div>
        <div class="service-num">${s.num}</div>
      </div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <div class="service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`).join('');
}
if (typeof CONTENT !== 'undefined' && CONTENT.services) renderCardGrid('servicesGrid', CONTENT.services);

// Bento layout for AI Data
const aiDataEl = document.getElementById('aiDataGrid');
if (aiDataEl && typeof CONTENT !== 'undefined' && CONTENT.aiData) {
  aiDataEl.innerHTML = CONTENT.aiData.map((s, i) => `
    <div class="service-card tilt-card${i === 0 || i === CONTENT.aiData.length - 1 ? ' bento-featured' : ''}">
      <div class="service-card-header">
        <div class="dim-icon-wrap">
          ${getDimIcon('ai', s.num)}
        </div>
        <div class="service-num">${s.num}</div>
      </div>
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <div class="service-tags">${s.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`).join('');
}

if (typeof CONTENT !== 'undefined' && CONTENT.eduSolutions) renderCardGrid('eduGrid', CONTENT.eduSolutions);

/* ============ Render: industries ============ */
function renderIndustries() {
  const el = document.getElementById('industriesGrid');
  if (!el || typeof CONTENT === 'undefined' || !CONTENT.industries) return;
  el.innerHTML = CONTENT.industries.map(ind => `
    <div class="industry-card tilt-card">
      <div class="ind-emblem-wrap">
        ${getIndEmblem(ind.name)}
      </div>
      <h3>${ind.name}</h3>
      <p>${ind.desc}</p>
    </div>`).join('');
}
renderIndustries();

/* ============ Render: case studies ============ */
const caseMockups = {
  "Cobalt Games": { env: "In-Context String HUD Pass", label: "Game UI (EN ➔ JA)", preview: "QUEST: [Find the Ancient Forge] ➔ クエスト: [古代の鍛冶場を探せ] · 0 clipping defects" },
  "Fennel Health": { env: "MedDRA v27.0 Compliance", label: "Clinical App (EN ➔ AR)", preview: "Dosage Advisory: [Take twice daily after meals] ➔ [تناول مرتين يومياً بعد الوجبات] · RTL Validated" },
  "Atlas Robotics": { env: "10,000p Shared Term Base", label: "Technical Docs (EN ➔ 8x)", preview: "Actuator Protocol: [Emergency Override Torque] ➔ Synchronized cross-locale term consistency" },
  "Solace EdTech": { env: "SCORM 2004 / cmi5 Packaging", label: "LMS Curriculum (5 Markets)", preview: "Interactive STEM Assessment adapted for MENA cultural paradigms · 100% Package QA" }
};

function renderCaseStudies() {
  const grid = document.getElementById('caseGrid');
  if (!grid || typeof CONTENT === 'undefined' || !CONTENT.caseStudies) return;
  grid.innerHTML = CONTENT.caseStudies.map(c => {
    const mockup = caseMockups[c.name] || { env: "Production Pipeline", label: "Localized Deliverable", preview: "Verified zero-defect delivery across target markets" };
    return `
    <div class="case-card tilt-card" tabindex="0" role="button" aria-expanded="false">
      <span class="case-tag">${c.tag}</span>
      <h3>${c.name}</h3>
      <p class="result">${c.result}</p>
      <div class="case-card-visual">
        <div class="case-visual-header">
          <span>${mockup.env}</span>
          <span style="color:var(--champagne)">${mockup.label}</span>
        </div>
        <div class="case-visual-preview">${mockup.preview}</div>
      </div>
      <span class="case-toggle">View metrics +</span>
      <div class="case-metrics">${c.metrics.map(m => `<div class="case-metric"><b>${m.n}</b><span>${m.l}</span></div>`).join('')}</div>
    </div>`;
  }).join('');

  function toggleCase(card) {
    const wasOpen = card.classList.contains('open');
    grid.querySelectorAll('.case-card').forEach(cc => {
      cc.classList.remove('open'); cc.setAttribute('aria-expanded', 'false');
      const toggle = cc.querySelector('.case-toggle');
      if (toggle) toggle.textContent = 'View metrics +';
    });
    if (!wasOpen) {
      card.classList.add('open'); card.setAttribute('aria-expanded', 'true');
      const toggle = card.querySelector('.case-toggle');
      if (toggle) toggle.textContent = 'Hide metrics −';
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
  const el = document.getElementById('testimonialsGrid');
  if (!el || typeof CONTENT === 'undefined' || !CONTENT.testimonials) return;
  el.innerHTML = CONTENT.testimonials.map(t => `
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
  if (!list || typeof CONTENT === 'undefined' || !CONTENT.faq) return;
  list.innerHTML = CONTENT.faq.map(f => `
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span>${f.q}</span><span class="plus">+</span></button>
      <div class="faq-a">${f.a}</div>
    </div>`).join('');

  list.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      list.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-q');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
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
  const blogGrid = document.getElementById('blogGrid');
  if (!blogGrid || typeof CONTENT === 'undefined' || !CONTENT.blogPosts) return;

  const isInsideBlog = window.location.pathname.includes('/blog/');
  const prefix = isInsideBlog ? '' : 'blog/';

  const filtered = blogActiveCat === 'all'
    ? CONTENT.blogPosts
    : CONTENT.blogPosts.filter(p => p.cat === blogActiveCat);

  const visible = filtered.slice(0, blogVisibleCount);
  blogGrid.innerHTML = visible.map(p => `
    <a href="${prefix}${p.slug}.html" class="blog-card">
      <div class="blog-meta"><span class="blog-cat">${p.cat}</span><span>${p.date}</span></div>
      <h3>${p.title}</h3>
      <p class="blog-excerpt">${p.excerpt}</p>
      <span class="blog-read">${p.read} →</span>
    </a>`).join('');

  const loadMore = document.getElementById('blogLoadMore');
  if (loadMore) {
    loadMore.style.display = visible.length < filtered.length ? 'block' : 'none';
  }

  // Trigger reveal animations
  requestAnimationFrame(() => {
    if (typeof cardObserver !== 'undefined') {
      document.querySelectorAll('.blog-card').forEach(c => cardObserver.observe(c));
    }
  });
}
renderBlog();

const blogLoadMoreBtn = document.getElementById('blogLoadMore');
if (blogLoadMoreBtn) {
  blogLoadMoreBtn.addEventListener('click', () => {
    blogVisibleCount += BLOG_PAGE_SIZE;
    renderBlog();
  });
}

const blogFiltersEl = document.getElementById('blogFilters');
if (blogFiltersEl) {
  blogFiltersEl.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      blogFiltersEl.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      blogActiveCat = chip.dataset.cat;
      blogVisibleCount = BLOG_PAGE_SIZE;
      renderBlog();
    });
  });
}

/* ============ Newsletter form ============ */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    if (toast) toast.classList.add('show');
    e.target.reset();
    if (toast) setTimeout(() => toast.classList.remove('show'), 3200);
  });
}

/* ============ Mobile menu ============ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  });
}
function closeMobile() {
  if (mobileMenu && menuToggle) {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}
if (mobileClose) mobileClose.addEventListener('click', closeMobile);


/* ============ Reduced motion check ============ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

/* ============ Natural Pointer & 3D Tilt Mechanics ============ */
const lensWrap = document.getElementById('lensWrap');
const lensTranslated = document.getElementById('lensTranslated');
const lensLangLabel = document.getElementById('lensLangLabel');

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let hoveringLens = false;

window.addEventListener('pointermove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

// Spotlight cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});

// Realistic 3D Tilt Interaction for Cards
if (!reduceMotion && !isCoarsePointer) {
  document.querySelectorAll('.tilt-card, .service-card, .case-card, .industry-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// Lens hover state
if (lensWrap) {
  lensWrap.addEventListener('mouseenter', () => {
    hoveringLens = true;
  });
  lensWrap.addEventListener('mouseleave', () => {
    hoveringLens = false;
  });
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
  if (!lensTranslated || !lensLangLabel) return;
  const p = lensPhrases[i];
  lensTranslated.textContent = p.text;
  lensLangLabel.textContent = '→ ' + p.code;
  if (p.rtl) lensTranslated.setAttribute('dir', 'rtl'); else lensTranslated.removeAttribute('dir');
}
if (lensTranslated && lensLangLabel) {
  setLensPhrase(0);
  setInterval(() => { lensIdx = (lensIdx + 1) % lensPhrases.length; setLensPhrase(lensIdx); }, 5000);
}

function animateLens() {
  if (!lensWrap || !lensTranslated) return;
  const rect = lensWrap.getBoundingClientRect();
  let cx, cy;
  if (hoveringLens && !isCoarsePointer) { cx = mouseX - rect.left; cy = mouseY - rect.top; }
  else { cx = rect.width/2 + Math.sin(Date.now()/1000)*100; cy = rect.height/2; }
  lensTranslated.style.clipPath = `circle(90px at ${cx}px ${cy}px)`;
  requestAnimationFrame(animateLens);
}
if (lensWrap && lensTranslated) {
  animateLens();
}

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
if (trustTrack && typeof CLIENTS !== 'undefined') {
  [...CLIENTS, ...CLIENTS].forEach(c => {
    const el = document.createElement('div');
    el.className = 'trust-item';
    el.innerHTML = `<span class="trust-icon" style="background:${c.color}">${c.icon}</span>${c.name}`;
    trustTrack.appendChild(el);
  });
}

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
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============ Interactive background: drifting script glyphs ============ */
(function () {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
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

if (langGrid && langSearch && langFilters) {
  function renderLangGrid() {
    const q = langSearch ? langSearch.value.trim().toLowerCase() : '';
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
          if (langDetail) {
            langDetail.innerHTML = `<div class="sample" dir="${lang.dir}" lang="${lang.code.toLowerCase()}">${lang.sample}</div><div class="facts"><span><b>${lang.name}</b></span><span>Tier: <b>${lang.tier}</b></span><span>Direction: <b>${lang.dir.toUpperCase()}</b></span></div>`;
            langDetail.classList.add('show');
          }
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
}

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

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const service = document.getElementById('service');
    const message = document.getElementById('message');

    if (!name || !email || !service || !message) return;

    const nameOk = validateField(name, name.nextElementSibling?.nextElementSibling);
    const emailOk = validateEmail(email, email.nextElementSibling?.nextElementSibling);
    const serviceOk = !!service.value;
    const messageOk = validateField(message, message.nextElementSibling?.nextElementSibling);

    if (nameOk && emailOk && serviceOk && messageOk) {
      const originalBtnText = submitBtn ? submitBtn.textContent : 'Send project request';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }

      try {
        const formData = new FormData(form);
        const actionUrl = form.getAttribute('action') || 'https://formspree.io/f/mgogkawo';
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (typeof gtag === 'function') gtag('event', 'form_submit', { event_category: 'contact', event_label: service.value });
          if (toast) {
            const h3 = toast.querySelector('h3');
            const p = toast.querySelector('p');
            if (h3) h3.textContent = 'Message Received';
            if (p) p.textContent = 'Thank you for reaching out! A localization expert from our team will contact you within 1 business day.';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
          }
          form.reset();
        } else {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || 'Submission failed');
        }
      } catch (err) {
        console.error('Contact form submission error:', err);
        alert('There was a problem sending your project request. Please email us directly at collab@mavyedusolutions.co.in');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      }
    }
  });
}

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
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  if (!banner) return;
  try {
    const accepted = typeof localStorage !== 'undefined' ? localStorage.getItem('cookie-consent') : null;
    if (!accepted) {
      setTimeout(() => banner.classList.add('show'), 1500);
    }
  } catch(e) {}
  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      try { if (typeof localStorage !== 'undefined') localStorage.setItem('cookie-consent', 'accepted'); } catch(e) {}
      banner.classList.remove('show');
      if (typeof gtag === 'function') gtag('consent', 'update', { analytics_storage: 'granted' });
    });
  }
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      try { if (typeof localStorage !== 'undefined') localStorage.setItem('cookie-consent', 'declined'); } catch(e) {}
      banner.classList.remove('show');
    });
  }
})();

/* ============ GA4 blog click tracking ============ */
const blogGridEl = document.getElementById('blogGrid');
if (blogGridEl) {
  blogGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.blog-card');
    if (card && typeof gtag === 'function') {
      gtag('event', 'blog_click', { event_label: card.querySelector('h3')?.textContent || '' });
    }
  });
}




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
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ÆΣΩあいう亜新'.split('');
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
  }, 600);
});

/* ============ Theme Toggle & LocalStorage ============ */
(() => {
  const themeToggle = document.getElementById('themeToggle');
  let savedTheme = 'dark';
  try {
    if (typeof localStorage !== 'undefined') {
      savedTheme = localStorage.getItem('mavy_theme') || 'dark';
    }
  } catch(e) {}
  if (document.documentElement) document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggle) {
    themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      if (document.documentElement) document.documentElement.setAttribute('data-theme', next);
      try {
        if (typeof localStorage !== 'undefined') localStorage.setItem('mavy_theme', next);
      } catch(e) {}
      themeToggle.textContent = next === 'light' ? '🌙' : '☀️';
    });
  }
})();

/* ================================================================
   FREE INTERACTIVE TOOLS & ADVANCED SYSTEM ANIMATIONS
   ================================================================ */

/* --- 1. Tool 1: Global Text Expansion & Pseudo-Localization Estimator --- */
(() => {
  const inputEl = document.getElementById('expansionInput');
  const chipsEl = document.getElementById('expansionChips');
  const previewEl = document.getElementById('pseudoPreview');
  const copyBtn = document.getElementById('copyPseudoBtn');
  if (!inputEl || !chipsEl || !previewEl) return;

  const expansionFactors = [
    { code: 'DE', name: 'German', rate: 0.30, flag: '🇩🇪' },
    { code: 'FI', name: 'Finnish', rate: 0.40, flag: '🇫🇮' },
    { code: 'FR', name: 'French', rate: 0.20, flag: '🇫🇷' },
    { code: 'ES', name: 'Spanish', rate: 0.25, flag: '🇪🇸' },
    { code: 'AR', name: 'Arabic', rate: 0.25, flag: '🇸🇦' },
    { code: 'JA', name: 'Japanese', rate: -0.35, flag: '🇯🇵' },
  ];

  const charMap = {
    'a': 'á', 'A': 'Å', 'b': 'þ', 'B': 'ß', 'c': 'ç', 'C': 'Ç',
    'd': 'ð', 'D': 'Ð', 'e': 'é', 'E': 'Ë', 'f': 'ƒ', 'g': 'ĝ',
    'h': 'ĥ', 'i': 'î', 'I': 'Î', 'l': 'ľ', 'm': 'ɱ', 'n': 'ñ',
    'o': 'ö', 'O': 'Ö', 'p': 'ƥ', 'r': 'ř', 's': 'ş', 'S': 'Ş',
    't': 'ţ', 'u': 'û', 'U': 'Û', 'w': 'ŵ', 'y': 'ŷ', 'z': 'ž'
  };

  function toPseudo(str) {
    if (!str) return '[ !!! Empty String !!! ]';
    const transformed = str.split('').map(c => charMap[c] || c).join('');
    const padLen = Math.max(3, Math.round(str.length * 0.3));
    const pad = '~'.repeat(padLen);
    return `[ !!! ${transformed} ${pad} !!! ]`;
  }

  function updateEstimator() {
    const raw = inputEl.value.trim();
    const len = raw.length || 0;

    chipsEl.innerHTML = expansionFactors.map(f => {
      const targetLen = Math.max(1, Math.round(len * (1 + f.rate)));
      const diffPct = Math.round(f.rate * 100);
      const sign = diffPct > 0 ? `+${diffPct}%` : `${diffPct}%`;
      const isWarn = f.rate > 0.25 && targetLen > 32;
      const statusHtml = isWarn
        ? `<span class="expansion-warn">⚠️ Overflow Risk</span>`
        : `<span class="expansion-ok">✓ Safe Fit</span>`;

      return `
        <div class="expansion-chip">
          <div class="expansion-chip-top">
            <span class="expansion-flag">${f.flag}</span>
            <span class="expansion-lang">${f.name} (${sign})</span>
          </div>
          <div class="expansion-chip-chars"><strong>${targetLen}</strong> chars</div>
          ${statusHtml}
        </div>
      `;
    }).join('');

    previewEl.textContent = toPseudo(raw);
  }

  inputEl.addEventListener('input', updateEstimator);
  updateEstimator();

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = previewEl.textContent;
      if (!textToCopy) return;
      navigator.clipboard.writeText(textToCopy).then(() => {
        const orig = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ Copied to Clipboard!';
        copyBtn.style.background = 'rgba(52,211,153,0.2)';
        copyBtn.style.borderColor = 'var(--accent-emerald)';
        copyBtn.style.color = '#34d399';
        setTimeout(() => {
          copyBtn.innerHTML = orig;
          copyBtn.style.background = '';
          copyBtn.style.borderColor = '';
          copyBtn.style.color = '';
        }, 2000);
      }).catch(() => {
        // Fallback
        const sel = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(previewEl);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy');
        alert('Copied to clipboard!');
      });
    });
  }
})();

/* --- 2. Tool 2: AI Multilingual Dataset Scope & Token Calculator --- */
(() => {
  const modalityEl = document.getElementById('calcModality');
  const sliderLangs = document.getElementById('sliderLanguages');
  const valLangs = document.getElementById('valLanguages');
  const sliderVol = document.getElementById('sliderVolume');
  const valVol = document.getElementById('valVolume');
  const lblVol = document.getElementById('lblVolume');
  const resCohort = document.getElementById('resCohort');
  const resTimeline = document.getElementById('resTimeline');
  const resQC = document.getElementById('resQC');
  const exportBtn = document.getElementById('btnExportBrief');

  if (!modalityEl || !sliderLangs || !sliderVol) return;

  const modalityData = {
    audio: {
      unit: 'hrs',
      label: 'Dataset Volume (Recorded Hours of Native Audio)',
      minVol: 20, maxVol: 2000, step: 20, defVol: 300,
      cohortCalc: (langs, vol) => Math.max(12, Math.round(langs * 3.5 + vol * 0.08)),
      timelineCalc: (langs, vol) => {
        const low = (vol / (langs * 20 + 40) + 1.5).toFixed(1);
        const high = (vol / (langs * 20 + 40) + 3.0).toFixed(1);
        return `${low} - ${high} weeks`;
      },
      qc: "3-Tier (SNR Acoustic Verification + Phoneme LQA + Native Speaker Validation)",
      serviceName: "AI data collection"
    },
    text: {
      unit: 'instruction pairs',
      label: 'Dataset Volume (Verified Multilingual Q&A Pairs)',
      minVol: 100, maxVol: 10000, step: 100, defVol: 2500,
      cohortCalc: (langs, vol) => Math.max(8, Math.round(langs * 2.2 + (vol / 10) * 0.04)),
      timelineCalc: (langs, vol) => {
        const v = vol / 10;
        const low = (v / (langs * 30 + 60) + 1.2).toFixed(1);
        const high = (v / (langs * 30 + 60) + 2.5).toFixed(1);
        return `${low} - ${high} weeks`;
      },
      qc: "3-Tier (Syntax Parsing + Fleiss' κ Inter-Rater Agreement + Domain SME Review)",
      serviceName: "Data annotation & labeling"
    },
    rlhf: {
      unit: 'preference turns',
      label: 'Dataset Volume (Human Rater Comparison Turns)',
      minVol: 100, maxVol: 8000, step: 100, defVol: 1500,
      cohortCalc: (langs, vol) => Math.max(15, Math.round(langs * 4.0 + (vol / 5) * 0.06)),
      timelineCalc: (langs, vol) => {
        const v = vol / 5;
        const low = (v / (langs * 18 + 35) + 1.8).toFixed(1);
        const high = (v / (langs * 18 + 35) + 3.8).toFixed(1);
        return `${low} - ${high} weeks`;
      },
      qc: "4-Tier (Adversarial Red-Team + Cohen's κ > 0.85 + Safety Guardrails + Benchmark Holdout)",
      serviceName: "RLHF & model evaluation"
    },
    multimodal: {
      unit: 'paired assets',
      label: 'Dataset Volume (Image/Video-to-Text Labeled Pairs)',
      minVol: 100, maxVol: 5000, step: 50, defVol: 1000,
      cohortCalc: (langs, vol) => Math.max(16, Math.round(langs * 3.2 + (vol / 2) * 0.05)),
      timelineCalc: (langs, vol) => {
        const v = vol / 2;
        const low = (v / (langs * 16 + 30) + 2.0).toFixed(1);
        const high = (v / (langs * 16 + 30) + 4.2).toFixed(1);
        return `${low} - ${high} weeks`;
      },
      qc: "3-Tier (Bounding Box IoU > 0.92 + OCR Alignment + Native Cultural Review)",
      serviceName: "Data annotation & labeling"
    }
  };

  function syncModalityConfig() {
    const mode = modalityEl.value;
    const cfg = modalityData[mode];
    if (!cfg) return;
    if (lblVol) lblVol.textContent = cfg.label;
    sliderVol.min = cfg.minVol;
    sliderVol.max = cfg.maxVol;
    sliderVol.step = cfg.step;
    sliderVol.value = cfg.defVol;
    updateScope();
  }

  function updateScope() {
    const mode = modalityEl.value;
    const cfg = modalityData[mode];
    if (!cfg) return;

    const langs = parseInt(sliderLangs.value, 10);
    const vol = parseInt(sliderVol.value, 10);

    if (valLangs) valLangs.textContent = `${langs} ${langs === 1 ? 'locale' : 'locales'}`;
    if (valVol) valVol.textContent = `${vol.toLocaleString()} ${cfg.unit}`;

    const cohort = cfg.cohortCalc(langs, vol);
    const timeline = cfg.timelineCalc(langs, vol);

    if (resCohort) resCohort.textContent = `~${cohort} native specialists`;
    if (resTimeline) resTimeline.textContent = timeline;
    if (resQC) resQC.textContent = cfg.qc;
  }

  modalityEl.addEventListener('change', syncModalityConfig);
  sliderLangs.addEventListener('input', updateScope);
  sliderVol.addEventListener('input', updateScope);
  syncModalityConfig();

  if (exportBtn) {
    exportBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const mode = modalityEl.value;
      const cfg = modalityData[mode];
      const langs = sliderLangs.value;
      const vol = sliderVol.value;
      const cohort = resCohort ? resCohort.textContent : '';
      const timeline = resTimeline ? resTimeline.textContent : '';
      const qc = resQC ? resQC.textContent : '';

      const serviceDropdown = document.getElementById('service');
      if (serviceDropdown && cfg.serviceName) {
        for (let i = 0; i < serviceDropdown.options.length; i++) {
          if (serviceDropdown.options[i].text.toLowerCase().includes(cfg.serviceName.toLowerCase())) {
            serviceDropdown.selectedIndex = i;
            break;
          }
        }
      }

      const msgBox = document.getElementById('message');
      if (msgBox) {
        msgBox.value = [
          `[Scope Brief from Interactive AI Dataset Calculator]`,
          `• Target Modality: ${modalityEl.options[modalityEl.selectedIndex].text}`,
          `• Target Languages: ${langs} locales`,
          `• Target Volume: ${parseInt(vol, 10).toLocaleString()} ${cfg.unit}`,
          `• Estimated Cohort: ${cohort}`,
          `• Projected Turnaround: ${timeline}`,
          `• Quality Gates: ${qc}`,
          ``,
          `Please provide a customized quotation and production roadmap.`
        ].join('\n');

        msgBox.dispatchEvent(new Event('input', { bubbles: true }));
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (msgBox) msgBox.focus();
        }, 600);
      }
    });
  }
})();

/* --- 3. Bento Spotlight Radial Follower --- */
(() => {
  const cards = document.querySelectorAll('.spotlight-card, .service-card, .tool-box, .case-card, .industry-card');
  if (!cards.length) return;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  cards.forEach(card => {
    card.classList.add('spotlight-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();

/* --- 4. IntersectionObserver Animated Stat Counters --- */
(() => {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      observer.unobserve(el);

      const target = parseFloat(el.getAttribute('data-target')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';

      if (isReducedMotion) {
        el.textContent = `${target}${suffix}`;
        return;
      }

      const duration = 1200;
      const startTime = performance.now();

      function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * easeOut);
        el.textContent = `${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }, { threshold: 0.3 });

  counters.forEach(c => counterObserver.observe(c));
})();

/* --- 5. Magnetic Hover Micro-Interaction --- */
(() => {
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  if (!magneticBtns.length) return;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.22;
      const dy = (e.clientY - cy) * 0.22;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
      btn.style.transition = 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'none';
    });
  });
})();

