// Blog article page generator for Mavy EduSolution
// Run: node generate-blogs.js
// This creates all 12 blog HTML files in ./blog/

const fs = require('fs');
const path = require('path');

const BRAND = 'Mavy EduSolution';
const DOMAIN = 'https://www.mavyedusolution.com';
const EMAIL = 'collab@mavyedusolutions.co.in';

const posts = [
  {
    slug: 'mt-human-pass',
    cat: 'Localization',
    title: 'Why "good enough" machine translation still needs a human pass',
    description: 'MT gets you a fast first draft. Here\'s where it quietly breaks — idiom, tone, and anything with legal weight — and why a second linguist still has to catch it.',
    date: 'Jul 2026',
    dateISO: '2026-07-01',
    read: '6 min read',
    body: `
  <p>Neural machine translation has improved dramatically. For well-resourced language pairs — English to Spanish, French, or German — the output reads naturally enough that you might be tempted to ship it without a second look. And for internal, low-stakes communication, that's often fine.</p>

  <p>But the moment translated text faces your customers, your regulators, or your brand, "good enough" starts showing its edges. Here's where MT quietly breaks — and why a native linguist still has to catch it.</p>

  <h2>Where MT fails silently</h2>

  <p>The dangerous thing about modern MT isn't that it produces gibberish. It doesn't. The dangerous thing is that it produces text that <em>looks</em> correct but carries the wrong meaning in ways that only a native speaker would notice.</p>

  <h3>1. Idiom and cultural register</h3>

  <p>MT translates the words, not the intent. A marketing tagline like "We've got your back" might render literally in German or Japanese, losing the reassuring connotation entirely. A native linguist recognizes the idiom and finds the cultural equivalent — not a word-for-word mirror.</p>

  <h3>2. Legal and regulatory weight</h3>

  <p>In contracts, terms of service, and compliance documents, word choice isn't creative — it's legally binding. MT doesn't know that "shall" and "will" carry different obligations in English legal prose, or that the equivalent distinction in French contract law uses different formulations entirely.</p>

  <blockquote><p>MT output is never sent as final copy. It's a first draft — and first drafts exist to be edited.</p></blockquote>

  <h3>3. Tone-of-voice consistency</h3>

  <p>Your brand voice is specific. MT doesn't read your style guide. It won't know that your product uses informal "you" in German (du vs. Sie), or that your help center avoids passive voice. A post-editor catches these and aligns every string to your existing tone.</p>

  <h2>The economics of MTPE</h2>

  <p>Machine Translation Post-Editing (MTPE) isn't a compromise — it's a strategy. Here's why it makes sense:</p>

  <ul>
    <li><strong>Speed:</strong> MT produces a first draft in seconds. The linguist spends time refining, not starting from scratch.</li>
    <li><strong>Cost:</strong> MTPE typically runs 30â€“40% less than full human translation for suitable content types.</li>
    <li><strong>Consistency:</strong> When combined with a translation memory and glossary, MTPE can actually improve consistency across large volumes.</li>
  </ul>

  <p>The key is knowing which content types are suitable for MTPE (help articles, support tickets, internal documentation) and which need full human translation from the start (marketing, legal, medical).</p>

  <h2>What a good post-editing pass actually checks</h2>

  <p>A trained post-editor does more than proofread. They:</p>

  <ol>
    <li>Verify meaning accuracy against the source text</li>
    <li>Correct terminology against the project glossary</li>
    <li>Fix register and tone to match the style guide</li>
    <li>Check formatting: placeholders, tags, length constraints</li>
    <li>Flag segments where MT output should be discarded and rewritten</li>
  </ol>

  <p>This is why we never ship MT output as final copy. Every string that leaves ${BRAND} has been reviewed by a native linguist — whether the first draft came from a human or a machine.</p>

  <hr>

  <p><strong>Need a quote for MTPE or full human translation?</strong> <a href="../index.html#contact">Start a project</a> — tell us your content type, word count, and target languages, and we'll recommend the right tier.</p>`,
    related: ['glossary-contract', 'rlhf-agreement', 'translation-memory']
  },
  {
    slug: 'rlhf-agreement',
    cat: 'AI Data',
    title: 'RLHF data quality: what "high agreement" actually measures',
    description: 'Inter-rater agreement is easy to game and easy to misread. What it tells you about your preference data, and what it doesn\'t.',
    date: 'Jul 2026',
    dateISO: '2026-07-01',
    read: '7 min read',
    body: `
  <p>When you're buying preference data for RLHF, the first metric anyone quotes you is inter-rater agreement — usually presented as a percentage. "Our annotators agree 87% of the time." That sounds reassuring. But it hides more than it reveals.</p>

  <h2>What agreement actually tells you</h2>

  <p>Inter-rater agreement (IRA) measures how often two or more independent annotators give the same label, ranking, or preference to the same data point. High agreement means your annotators are consistent with each other. It does <em>not</em> mean they're correct.</p>

  <h3>The consistency vs. accuracy gap</h3>

  <p>Five annotators can consistently agree that Response A is better than Response B — and all five can be wrong, because they share the same blind spot. This happens frequently in domains where the annotators lack subject-matter expertise.</p>

  <blockquote><p>High agreement without domain expertise is just consistent noise. It trains your model to be confidently wrong.</p></blockquote>

  <h2>What actually matters for RLHF quality</h2>

  <p>Beyond raw agreement, you should be tracking:</p>

  <ul>
    <li><strong>Domain calibration:</strong> Are annotators trained on your specific evaluation rubric, or are they applying generic "better/worse" instincts?</li>
    <li><strong>Edge-case divergence:</strong> Where do annotators <em>disagree</em>? Those disagreements are where your model's failure modes live.</li>
    <li><strong>Annotation velocity vs. quality:</strong> Raters who are too fast are skimming. Consistent speed without pause-and-think patterns signals shallow evaluation.</li>
    <li><strong>Rubric adherence:</strong> Can you trace each preference decision back to a specific criterion in your rubric?</li>
  </ul>

  <h2>How to audit your preference data</h2>

  <p>Before feeding preference data into your reward model, run these checks:</p>

  <ol>
    <li><strong>Gold standard injection:</strong> Seed your annotation queue with items where the correct answer is known. Measure accuracy, not just agreement.</li>
    <li><strong>Disagreement analysis:</strong> Pull the bottom 10% by agreement and review them manually. These edge cases often reveal rubric ambiguity.</li>
    <li><strong>Annotator stratification:</strong> Group by annotator and look for outliers — both consistently fast annotators and those whose preferences systematically diverge from the group.</li>
    <li><strong>Cross-domain validation:</strong> If your raters handle both coding and creative writing tasks, check if their performance is domain-consistent.</li>
  </ol>

  <h2>What we do differently</h2>

  <p>At ${BRAND}, we match annotators to tasks by domain expertise first, throughput capacity second. Every batch ships with:</p>

  <ul>
    <li>Agreement scores per rubric criterion (not just overall)</li>
    <li>Disagreement analysis with edge-case samples</li>
    <li>Gold standard accuracy (not just inter-rater consistency)</li>
    <li>Annotator-level metadata so you can stratify internally</li>
  </ul>

  <hr>

  <p><strong>Need RLHF data you can trust?</strong> <a href="../index.html#contact">Start a project</a> — tell us your model, your rubric, and your domain, and we'll match annotators with the right expertise.</p>`,
    related: ['red-teaming-llm', 'wake-word-audio', 'mt-human-pass']
  },
  {
    slug: 'rtl-layouts',
    cat: 'Engineering',
    title: 'Shipping right-to-left layouts without a second sprint',
    description: 'The layout bugs that only show up in Arabic and Hebrew builds, and how to catch them in QA instead of in a support ticket.',
    date: 'Jun 2026',
    dateISO: '2026-06-15',
    read: '5 min read',
    body: `
  <p>You've localized your strings into Arabic. The translation is accurate, the glossary was reviewed, the files are merged. Then someone opens the app and the layout is broken — text overflows, icons point the wrong way, and the navigation feels backwards. Welcome to RTL layout bugs.</p>

  <h2>Why RTL isn't just "flip the layout"</h2>

  <p>Right-to-left languages like Arabic, Hebrew, and Urdu don't just reverse text direction — they reverse the entire spatial logic of your UI. What was on the left is now on the right. Progress bars fill from right to left. Back arrows point right.</p>

  <h3>The bugs that only show up in RTL</h3>

  <ul>
    <li><strong>Hardcoded margins and padding:</strong> <code>margin-left: 16px</code> should be <code>margin-inline-start: 16px</code>. Every hardcoded directional property is a potential bug.</li>
    <li><strong>Icon mirroring:</strong> Back arrows, chevrons, and progress indicators need to flip. But not all icons should — a phone handset icon or a checkmark stays the same regardless of direction.</li>
    <li><strong>Text truncation:</strong> Arabic text is often 20â€“30% longer than English. Combined with RTL flow, truncation happens in different places and can cut words mid-morpheme.</li>
    <li><strong>Bidirectional text (Bidi):</strong> When Arabic text contains English brand names, numbers, or URLs, the browser's Bidi algorithm can produce unexpected word order without explicit direction markers.</li>
  </ul>

  <h2>How to catch these before QA</h2>

  <h3>1. Use CSS logical properties everywhere</h3>

  <p>Replace every instance of <code>left</code>/<code>right</code> in your CSS with <code>inline-start</code>/<code>inline-end</code>. This single change eliminates 60% of RTL layout bugs.</p>

  <h3>2. Pseudo-localization with RTL</h3>

  <p>Run your pseudo-localization pass with the <code>dir="rtl"</code> attribute set on <code>&lt;html&gt;</code>. This surfaces layout breaks before any real translation begins — you'll see mirroring issues, overflow, and alignment problems immediately.</p>

  <h3>3. Screenshot-based review</h3>

  <p>Generate screenshots of every screen in both LTR and RTL modes. Have a native RTL speaker review not just the text, but the visual hierarchy — does the layout feel natural, or does it feel like a flipped English UI?</p>

  <h2>The QA checklist we use</h2>

  <ol>
    <li>All CSS directional properties use logical equivalents</li>
    <li>Icons reviewed for mirror/no-mirror classification</li>
    <li>Text expansion tested at 130% of English string length</li>
    <li>Bidi markers inserted for mixed-direction content</li>
    <li>Native RTL speaker reviews visual hierarchy and flow</li>
  </ol>

  <hr>

  <p><strong>Shipping to RTL markets?</strong> <a href="../index.html#contact">Start a project</a> — we handle the translation, the layout QA, and the Bidi edge cases so your Arabic and Hebrew builds ship without a second sprint.</p>`,
    related: ['pseudo-localization', 'multilingual-seo', 'glossary-contract']
  },
  {
    slug: 'wake-word-audio',
    cat: 'AI Data',
    title: 'Sourcing wake-word audio across 40 languages without burning your timeline',
    description: 'What actually slows down multilingual voice data collection — and it usually isn\'t the recording.',
    date: 'Jun 2026',
    dateISO: '2026-06-15',
    read: '6 min read',
    body: `
  <p>Collecting wake-word audio in one language is straightforward. Collecting it in 40 — with demographic balance, background noise variation, and consistent recording quality — is where timelines break.</p>

  <h2>What actually slows you down</h2>

  <p>It's rarely the recording itself. The bottlenecks are upstream:</p>

  <h3>1. Recruitment, not recording</h3>

  <p>Finding 500 speakers per language who match your demographic requirements (age, gender, accent distribution) takes longer than the recording sessions themselves. In underrepresented languages, this is where 80% of the timeline goes.</p>

  <h3>2. Consent and rights management</h3>

  <p>Every speaker needs a clear consent form in their language, covering how the data will be used. In the EU, this means GDPR-compliant consent. In certain markets, it means additional local data protection compliance. Consent management across 40 jurisdictions is a project in itself.</p>

  <h3>3. Quality control at scale</h3>

  <p>When you're processing 20,000 audio clips per language, manual QC doesn't scale. But automated QC (SNR checks, duration validation, wake-word detection) only catches technical issues — it doesn't catch accent mismatch, mumbled pronunciations, or environmental noise that passes the SNR threshold but degrades model performance.</p>

  <blockquote><p>The hardest part of multilingual audio collection isn't technical — it's operational. Finding the right speakers, in the right markets, with the right consent, on the right timeline.</p></blockquote>

  <h2>How we structure a 40-language collection</h2>

  <ol>
    <li><strong>Parallel recruitment:</strong> We start recruitment in all 40 markets simultaneously, not sequentially. Languages with smaller speaker pools get a head start.</li>
    <li><strong>Standardized recording kit:</strong> Every speaker gets the same recording environment spec — device type, distance from mic, ambient noise ceiling — regardless of whether they're in SÃ£o Paulo or Seoul.</li>
    <li><strong>Tiered QC:</strong> Automated checks catch technical failures (SNR, duration, format). Native-speaker reviewers handle pronunciation accuracy and accent classification. Both stages run in parallel with recording.</li>
    <li><strong>Consent as infrastructure:</strong> Consent forms are localized, reviewed by local counsel, and managed through a single platform so you have one rights ledger across all 40 markets.</li>
  </ol>

  <h2>What you get at delivery</h2>

  <ul>
    <li>Audio files in your specified format (WAV, FLAC, or compressed)</li>
    <li>Per-clip metadata: speaker ID, language, accent tag, demographic attributes, recording environment</li>
    <li>QC report: automated check results + native-speaker review scores</li>
    <li>Consent documentation: full audit trail per speaker per market</li>
  </ul>

  <hr>

  <p><strong>Planning a multilingual voice data collection?</strong> <a href="../index.html#contact">Start a project</a> — tell us the languages, the wake words, and the demographic requirements, and we'll build the collection plan.</p>`,
    related: ['rlhf-agreement', 'red-teaming-llm', 'ai-tutoring-data']
  },
  {
    slug: 'translation-memory',
    cat: 'Process',
    title: 'What a translation memory actually saves you',
    description: 'Not just money on repeated strings — consistency across releases, and a paper trail when a term changes six months in.',
    date: 'May 2026',
    dateISO: '2026-05-15',
    read: '4 min read',
    body: `
  <p>A translation memory (TM) is a database that stores every sentence you've ever translated, paired with its source. When the same sentence — or a similar one — appears in a future project, the TM surfaces the existing translation so the linguist doesn't start from zero.</p>

  <p>Most people think of TM as a cost-saving tool. It is — but that's the least interesting thing it does.</p>

  <h2>What TM actually saves</h2>

  <h3>1. Consistency across releases</h3>

  <p>Without a TM, every release is a fresh start. The linguist who translates "Cancel subscription" in v2.1 might use a different term than the linguist who translated the same phrase in v1.8. Over 20 releases and 15 languages, those inconsistencies compound into a fragmented user experience.</p>

  <p>A TM enforces consistency automatically. When the same string appears again, the linguist sees the approved translation and either reuses it or consciously decides to update it — with a record of why.</p>

  <h3>2. A paper trail for term changes</h3>

  <p>When your legal team decides that "Terms of Service" should become "Terms of Use" across the product, a TM gives you a searchable record of every instance of the old term, in every language it was translated into. Without it, you're grepping through spreadsheets.</p>

  <h3>3. Onboarding speed for new linguists</h3>

  <p>When a new linguist joins a project, the TM gives them immediate access to every translation decision the previous linguist made. They can see how the team handles ambiguous terms, whether the product uses formal or informal register, and what abbreviations are accepted.</p>

  <h2>How TM fits into a real workflow</h2>

  <ol>
    <li><strong>New project:</strong> Source strings are run against the TM. Exact matches are auto-populated. Fuzzy matches (70%+ similarity) are surfaced as suggestions.</li>
    <li><strong>Linguist review:</strong> The linguist accepts, modifies, or rejects each suggestion. New translations are added to the TM.</li>
    <li><strong>Next release:</strong> Only new or changed strings need translation. The TM handles the rest — with consistency guaranteed.</li>
  </ol>

  <h2>When TM doesn't help</h2>

  <p>TM works best for repetitive, structured content: UI strings, help articles, product documentation. It's less useful for creative content like marketing copy, where tone and context change between campaigns. For those, transcreation is the right approach — and the TM stays out of the way.</p>

  <hr>

  <p><strong>Want to set up a translation memory for your product?</strong> <a href="../index.html#contact">Start a project</a> — we'll build the TM from your existing translations and use it from day one.</p>`,
    related: ['glossary-contract', 'mt-human-pass', 'pseudo-localization']
  },
  {
    slug: 'glossary-contract',
    cat: 'Localization',
    title: 'A glossary is a contract: keeping terms consistent across 40 languages',
    description: 'How one unreviewed term change turns into forty inconsistent ones, and the review step that stops it.',
    date: 'May 2026',
    dateISO: '2026-05-15',
    read: '5 min read',
    body: `
  <p>A glossary isn't a nice-to-have. It's a contract between your product team and your linguists. It says: "This term means this, always, in every language." When the glossary is wrong or out of date, the translations are wrong in exactly the same way — times forty.</p>

  <h2>The compound error problem</h2>

  <p>When someone on your team changes "workspace" to "project" in the English UI but doesn't update the glossary, here's what happens:</p>

  <ul>
    <li>The German linguist translates the new string using "Projekt" — which is correct for this string.</li>
    <li>But 47 other strings still say "Arbeitsbereich" (the old term for "workspace").</li>
    <li>Your German users now see both "Projekt" and "Arbeitsbereich" in the same product, referring to the same thing.</li>
    <li>Multiply this by 39 other languages.</li>
  </ul>

  <p>One unreviewed change. Forty inconsistencies. And support tickets in languages your team can't read.</p>

  <h2>What a functioning glossary looks like</h2>

  <p>A glossary that actually prevents this has four properties:</p>

  <ol>
    <li><strong>Source term + definition:</strong> Not just the English word, but what it means in your product context. "Workspace" is ambiguous — "the container where a user's projects, files, and settings are stored" is not.</li>
    <li><strong>Approved translations per language:</strong> The linguist doesn't guess — they see the pre-approved term and use it.</li>
    <li><strong>Change log:</strong> When a term changes, the glossary records who changed it, when, and why. This creates accountability.</li>
    <li><strong>Review gate:</strong> No glossary change goes live without review by the lead linguist in at least the top-5 volume languages.</li>
  </ol>

  <h2>How we manage glossaries</h2>

  <p>At ${BRAND}, every project starts with a glossary review — or a glossary build, if one doesn't exist. We extract key terms from your source content, define them in context, and get sign-off from your product team before the first string is translated.</p>

  <p>When terms change mid-project, we flag the change, propagate it across all active languages, and send you a diff report showing every string that was updated.</p>

  <hr>

  <p><strong>Need help building or auditing your glossary?</strong> <a href="../index.html#contact">Start a project</a> — we'll extract terms from your existing content and build a glossary that works across all your target languages.</p>`,
    related: ['translation-memory', 'mt-human-pass', 'multilingual-seo']
  },
  {
    slug: 'multilingual-seo',
    cat: 'Localization',
    title: 'Why multilingual SEO is more than translating your keywords',
    description: 'Hreflang tags, locale-specific search intent, and the gap between "translated" and "discoverable" in 12 markets.',
    date: 'Jul 2026',
    dateISO: '2026-07-01',
    read: '6 min read',
    body: `
  <p>You've translated your website into 12 languages. Your content is accurate, your design adapts to RTL, your images are culturally appropriate. But organic traffic from those markets is flat. The problem isn't translation — it's discoverability.</p>

  <h2>The gap between translated and discoverable</h2>

  <p>A translated page and a discoverable page are different things. Translation gives you linguistic accuracy. Discoverability requires understanding how people in each market actually search.</p>

  <h3>1. Search intent varies by locale</h3>

  <p>The English keyword "project management software" might translate directly into German. But German professionals actually search for "Projektmanagement-Tool" or "Aufgabenverwaltung." Direct translation misses the way people actually phrase their queries.</p>

  <h3>2. Hreflang is infrastructure, not decoration</h3>

  <p>The <code>hreflang</code> attribute tells search engines which language and region each page targets. Without it, Google may:</p>

  <ul>
    <li>Show your Spanish page to Portuguese users (close language, wrong market)</li>
    <li>Index only one version and suppress the others as "duplicate content"</li>
    <li>Route users to the wrong regional variant (es-ES vs. es-MX)</li>
  </ul>

  <p>Implementing hreflang correctly across 12 locales with regional variants is more technical than most teams expect.</p>

  <h3>3. Meta content needs localization, not translation</h3>

  <p>Title tags and meta descriptions are marketing copy — they need to be compelling in each language, within character limits, and optimized for local search terms. A literal translation of your English meta description will be grammatically correct and search-invisible.</p>

  <h2>What a multilingual SEO engagement includes</h2>

  <ol>
    <li><strong>Keyword research per locale:</strong> Native speakers research how users actually search in each market. This produces a localized keyword map, not a translated one.</li>
    <li><strong>Hreflang implementation:</strong> Full audit and implementation of hreflang tags, including regional variants (en-US vs. en-GB, pt-BR vs. pt-PT).</li>
    <li><strong>Meta content localization:</strong> Title tags and meta descriptions written for search performance in each locale — not translated from English.</li>
    <li><strong>URL structure review:</strong> Subdirectory vs. subdomain vs. ccTLD analysis based on your domain authority and market priorities.</li>
  </ol>

  <hr>

  <p><strong>Ready to make your localized content discoverable?</strong> <a href="../index.html#contact">Start a project</a> — tell us your target markets and we'll build a multilingual SEO strategy that drives organic traffic in every locale.</p>`,
    related: ['glossary-contract', 'rtl-layouts', 'mt-human-pass']
  },
  {
    slug: 'red-teaming-llm',
    cat: 'AI Data',
    title: 'Red-teaming your LLM: what annotators actually look for',
    description: 'A practical breakdown of the failure modes human raters flag — and why "sounds correct" is the hardest category to evaluate.',
    date: 'Jul 2026',
    dateISO: '2026-07-01',
    read: '7 min read',
    body: `
  <p>Red-teaming an LLM isn't about trying to make it say something offensive (though that's part of it). It's about systematically probing the model's failure modes — the places where it produces output that looks right but isn't, or where it confidently answers questions it shouldn't.</p>

  <h2>The failure modes annotators flag</h2>

  <h3>1. Plausible but wrong</h3>

  <p>The model generates a response that reads fluently, uses appropriate technical vocabulary, and cites something that sounds like a real source — but the information is fabricated. This is the hardest category to evaluate because it requires domain knowledge to catch.</p>

  <h3>2. Instruction non-compliance</h3>

  <p>The user asks for a bulleted list, and the model responds with paragraphs. Or the user asks for the answer in under 50 words, and the model writes 200. These failures are easy to flag but important for downstream evaluation: a model that ignores formatting instructions will frustrate users.</p>

  <h3>3. Unsafe output under edge-case prompts</h3>

  <p>Standard harmful prompts are well-guarded against. Red-teaming focuses on edge cases: multi-turn manipulation, role-play scenarios that gradually shift boundaries, or ambiguous prompts where the "safe" response is unclear.</p>

  <h3>4. Inconsistency across turns</h3>

  <p>The model says one thing in turn 3 and contradicts itself in turn 7. In long conversations, consistency degrades. Annotators track whether the model maintains its positions, facts, and persona across a multi-turn session.</p>

  <h2>What makes a good red-teaming annotator</h2>

  <ul>
    <li><strong>Domain expertise:</strong> A medical red-teamer needs to know when a dosage recommendation is plausible but wrong. A legal red-teamer needs to catch when the model cites a statute that doesn't exist.</li>
    <li><strong>Adversarial creativity:</strong> Good red-teamers think in attack vectors. They don't just test the obvious — they test the subtle.</li>
    <li><strong>Rubric discipline:</strong> Every flag needs to map to a specific failure category in your rubric. "This feels off" isn't actionable. "Plausible hallucination in medical context, severity: high" is.</li>
  </ul>

  <h2>How we structure red-teaming engagements</h2>

  <ol>
    <li>Define failure taxonomy with your team (safety, accuracy, compliance, consistency)</li>
    <li>Match annotators by domain expertise and adversarial testing experience</li>
    <li>Run structured probing sessions with prompt templates and free-form exploration</li>
    <li>Deliver failure reports with severity scoring, reproducible prompts, and model response captures</li>
  </ol>

  <hr>

  <p><strong>Need to red-team your model before launch?</strong> <a href="../index.html#contact">Start a project</a> — tell us your model, your risk profile, and your domain, and we'll build a red-teaming protocol.</p>`,
    related: ['rlhf-agreement', 'wake-word-audio', 'ai-tutoring-data']
  },
  {
    slug: 'elearning-cultural',
    cat: 'EduSolution',
    title: 'Localizing e-learning for cultural learning styles, not just language',
    description: 'Why a translated course isn\'t a localized course — and the structural changes that make assessments work in MENA, LATAM, and APAC markets.',
    date: 'Jul 2026',
    dateISO: '2026-07-01',
    read: '6 min read',
    body: `
  <p>A translated e-learning course delivers the same words in a new language. A localized e-learning course delivers the same learning outcomes through a structure that makes sense in the target culture. These are not the same thing.</p>

  <h2>Where translation falls short in education</h2>

  <h3>1. Examples and scenarios</h3>

  <p>A case study about American healthcare regulations is meaningless to a learner in Saudi Arabia. A scenario about driving on the right side of the road doesn't work in the UK or Japan. These aren't translation problems — they're relevance problems.</p>

  <h3>2. Assessment design</h3>

  <p>Multiple-choice assessments assume a testing culture that values elimination of wrong answers. In some educational traditions, essay-style or oral assessment is more natural. Localization means adapting not just the questions, but the format of assessment to match learner expectations.</p>

  <h3>3. Visual and interaction conventions</h3>

  <p>Color associations vary by culture. Red means "stop" or "error" in Western contexts, but it means luck and prosperity in Chinese culture. Drag-and-drop interactions may not be intuitive on the touch devices most commonly used in certain markets.</p>

  <blockquote><p>A localized course doesn't just speak the learner's language — it reflects their learning culture, their visual expectations, and their assessment norms.</p></blockquote>

  <h2>What cultural localization involves</h2>

  <ol>
    <li><strong>Content audit:</strong> We review every example, scenario, image, and cultural reference against the target market's norms. Items that won't resonate are flagged for replacement.</li>
    <li><strong>Assessment adaptation:</strong> Question formats, difficulty calibration, and scoring models are reviewed against local educational standards.</li>
    <li><strong>Visual review:</strong> Color usage, imagery, iconography, and layout direction are adapted for cultural appropriateness and accessibility.</li>
    <li><strong>Interactive element rebuild:</strong> Drag-and-drop, click-to-reveal, and other interactive elements are tested and rebuilt for the devices and interaction patterns common in the target market.</li>
    <li><strong>SME review:</strong> A subject-matter expert from the target market reviews the final course for cultural accuracy and pedagogical fit.</li>
  </ol>

  <hr>

  <p><strong>Localizing a course for new markets?</strong> <a href="../index.html#contact">Start a project</a> — tell us the course, the target markets, and the learning platform, and we'll scope the cultural adaptation.</p>`,
    related: ['scorm-translation', 'ai-tutoring-data', 'rtl-layouts']
  },
  {
    slug: 'scorm-translation',
    cat: 'EduSolution',
    title: 'Why SCORM compliance breaks during translation — and how to prevent it',
    description: 'The packaging failures that only surface after you upload to the LMS, and the QA step that catches them before that.',
    date: 'Jun 2026',
    dateISO: '2026-06-15',
    read: '5 min read',
    body: `
  <p>You localize your e-learning course. The translations are accurate. You package it as a SCORM file and upload it to your LMS. It doesn't load. Or it loads but doesn't track completions. Or the navigation is broken in three out of five languages.</p>

  <p>SCORM compliance breaks during translation more often than most teams expect — and the failures only surface at the last step, when the package hits the LMS.</p>

  <h2>Why SCORM breaks</h2>

  <h3>1. Manifest file corruption</h3>

  <p>SCORM packages include an <code>imsmanifest.xml</code> file that defines the course structure, resource paths, and sequencing rules. When content is extracted for translation and repackaged, manifest references can break — especially when file names contain characters that were transliterated during localization.</p>

  <h3>2. Character encoding mismatches</h3>

  <p>A course authored in English uses ASCII-safe characters. The Arabic or Japanese translation introduces UTF-8 characters that the SCORM player doesn't handle correctly if the HTML files aren't explicitly declared as UTF-8. The result: garbled text or rendering failures in the LMS.</p>

  <h3>3. JavaScript tracking breaks</h3>

  <p>SCORM uses JavaScript API calls to communicate completion status, quiz scores, and bookmarking data to the LMS. If the localization process touches any of the JavaScript (even accidentally, through a global find-and-replace), these API calls can break silently — the course loads fine, but progress isn't tracked.</p>

  <h3>4. Text expansion breaks layout</h3>

  <p>German text is typically 30% longer than English. When localized text overflows fixed-width containers inside the SCORM content, navigation buttons can become hidden, quiz options can overlap, and the course becomes unusable — but only in certain languages.</p>

  <h2>How we prevent SCORM failures</h2>

  <ol>
    <li><strong>Extract text only:</strong> We extract translatable strings without touching the manifest, JavaScript, or resource structure.</li>
    <li><strong>Repackage with validation:</strong> After reinserting translations, we run automated SCORM validation against the manifest to catch broken references.</li>
    <li><strong>LMS upload testing:</strong> Every localized package is uploaded to a test LMS instance and checked for: loading, navigation, quiz submission, completion tracking, and bookmarking.</li>
    <li><strong>Text expansion testing:</strong> We test every language at full string length against the course layout, flagging overflow before the package ships.</li>
  </ol>

  <hr>

  <p><strong>Localizing SCORM content?</strong> <a href="../index.html#contact">Start a project</a> — we handle the translation, repackaging, and LMS validation so your localized courses work on first upload.</p>`,
    related: ['elearning-cultural', 'ai-tutoring-data', 'rtl-layouts']
  },
  {
    slug: 'ai-tutoring-data',
    cat: 'EduSolution',
    title: 'Building AI tutoring datasets that actually improve student outcomes',
    description: 'What separates useful Q&A training pairs from noise — difficulty calibration, pedagogical intent tagging, and subject-area coverage.',
    date: 'Jun 2026',
    dateISO: '2026-06-15',
    read: '7 min read',
    body: `
  <p>AI tutoring systems are only as good as their training data. A model trained on generic Q&A pairs will produce generic answers — technically correct, pedagogically useless. Building training data that actually improves student outcomes requires a different approach.</p>

  <h2>What makes tutoring data different from general Q&A</h2>

  <h3>1. Pedagogical intent matters</h3>

  <p>A good tutor doesn't just answer the question — they guide the student toward understanding. Training data needs to encode not just "what's the right answer" but "how should the tutor lead the student to discover the right answer." This means tagging each training pair with pedagogical intent: explain, scaffold, correct misconception, encourage, or assess.</p>

  <h3>2. Difficulty calibration is non-trivial</h3>

  <p>A question that's easy for a university student is impossible for a middle schooler. Training data needs difficulty labels that are calibrated against the target learner population — not against the annotator's own expertise. This requires annotators who understand grade-level expectations and curriculum standards.</p>

  <h3>3. Subject-area coverage isn't uniform</h3>

  <p>Mathematics training data is relatively easy to structure: problems have clear answers. Science is harder: conceptual understanding requires more nuanced evaluation. Humanities are hardest: there's rarely a single correct answer, and the quality of the response depends on reasoning quality, not fact recall.</p>

  <blockquote><p>Training data for AI tutors needs to encode how to teach, not just what to teach. That requires annotators who understand pedagogy, not just the subject matter.</p></blockquote>

  <h2>How we build tutoring datasets</h2>

  <ol>
    <li><strong>Curriculum mapping:</strong> We start with the target curriculum standards (Common Core, CBSE, UK National Curriculum, etc.) and build a coverage map to ensure training data spans all required topics and difficulty levels.</li>
    <li><strong>Q&A pair generation:</strong> Subject-matter experts generate question-answer pairs tagged with: topic, subtopic, difficulty level, grade level, pedagogical intent, and expected misconceptions.</li>
    <li><strong>Multi-turn dialog creation:</strong> Beyond single Q&A pairs, we create multi-turn tutoring dialogs that model how a tutor guides a struggling student through a problem step by step.</li>
    <li><strong>Difficulty calibration:</strong> A separate panel of educators reviews difficulty labels against actual student performance data (where available) to ensure labels reflect real learner difficulty, not expert perception.</li>
    <li><strong>Quality scoring:</strong> Every training pair is scored on pedagogical quality — does the response teach, or does it just tell? Pairs that score below threshold are revised or removed.</li>
  </ol>

  <hr>

  <p><strong>Building an AI tutor?</strong> <a href="../index.html#contact">Start a project</a> — tell us the subject area, the target learner population, and the curriculum standard, and we'll build the training dataset.</p>`,
    related: ['elearning-cultural', 'scorm-translation', 'rlhf-agreement']
  },
  {
    slug: 'pseudo-localization',
    cat: 'Engineering',
    title: 'Pseudo-localization: catching layout bugs before your linguists do',
    description: 'How synthetic placeholder text with accents and extended characters reveals truncation and overflow issues in your UI before real translation begins.',
    date: 'May 2026',
    dateISO: '2026-05-15',
    read: '5 min read',
    body: `
  <p>Pseudo-localization is a testing technique where you replace your English UI strings with synthetic text that simulates the characteristics of translated text — extended length, accented characters, and altered word boundaries — without waiting for actual translation.</p>

  <h2>What pseudo-localization reveals</h2>

  <h3>1. String truncation</h3>

  <p>German text is typically 30% longer than English. Finnish can be 40% longer. If your button says "Submit" and only has room for 8 characters, the German "Absenden" fits — but "Abonnement kÃ¼ndigen" (Cancel subscription) definitely doesn't. Pseudo-localization pads every string to 130â€“150% of its English length, surfacing every truncation point before you spend money on real translation.</p>

  <h3>2. Hardcoded strings</h3>

  <p>If a string shows up in English while everything else is pseudo-localized, it's hardcoded. These are the strings your i18n extraction missed — and they'll show up as untranslated in your shipped product.</p>

  <h3>3. Character encoding issues</h3>

  <p>Pseudo-localization replaces ASCII characters with accented Unicode equivalents (a â†’ Ã¥, e â†’ Ã«). If these render as boxes or question marks anywhere in your UI, you have an encoding issue that will break real translations — especially for languages like Arabic, Chinese, or Thai.</p>

  <h3>4. Concatenation bugs</h3>

  <p>Strings assembled by concatenation ("You have " + count + " items") break in languages where word order differs. Pseudo-localization with reordered segments reveals these issues immediately.</p>

  <h2>How to run it</h2>

  <ol>
    <li><strong>Generate pseudo-localized strings:</strong> Use a tool like pseudolocalize or a custom script that pads length, adds accents, and wraps strings in brackets [á¹ªÄ¥Ä©ÅŸ Ä©ÅŸ Ä á¹«Ä“ÅŸá¹« ÅŸá¹«Å—Ä©Å‹Ä ~~~~~~~~~~]</li>
    <li><strong>Load into your app:</strong> Replace your default locale strings with the pseudo-localized version and run the app.</li>
    <li><strong>Visual audit:</strong> Walk through every screen. Look for truncation, overflow, missing brackets (= hardcoded strings), and rendering issues.</li>
    <li><strong>Fix before translation:</strong> Every issue found now is an issue that won't waste linguist time or cause post-translation rework.</li>
  </ol>

  <h2>When to run it</h2>

  <p>Run pseudo-localization as part of your CI pipeline. Every new screen, every new string, every layout change — test with pseudo strings before requesting real translation. The cost is near-zero. The savings on rework are significant.</p>

  <hr>

  <p><strong>Want help setting up pseudo-localization in your pipeline?</strong> <a href="../index.html#contact">Start a project</a> — we can integrate pseudo-loc testing into your CI/CD workflow and catch layout issues before they reach your linguists.</p>`,
    related: ['rtl-layouts', 'translation-memory', 'glossary-contract']
  },
  {
    slug: 'multimodal-dataset-curation',
    cat: 'AI Data',
    title: 'Curating Multimodal Datasets for Vision-Language Models: Image-Text Pairing at Scale',
    description: 'High-quality image-text alignment for VLM fine-tuning. How synthetic captioning, bounding box verification, and OCR extraction prevent hallucination.',
    date: 'Jul 2026',
    dateISO: '2026-07-15',
    read: '8 min read',
    body: `
  <p>Vision-Language Models (VLMs) like GPT-4V and Gemini Pro Vision rely heavily on paired image-text datasets for multimodal instruction tuning. But raw web-scraped image-alt text pairs are notoriously noisy, leading to hallucination and poor grounding in visual domain tasks.</p>

  <h2>The Anatomy of High-Quality Multimodal Data</h2>

  <p>To train models that accurately reason over diagrams, UI screenshots, documents, and natural images, curation pipelines must enforce strict visual-textual grounding:</p>

  <h3>1. Fine-Grained Synthetic Captioning</h3>
  <p>Basic alt-text ("dog in park") provides insufficient density for VLM training. We generate multi-paragraph dense captions capturing spatial relationships, object colors, text OCR fragments, and background context.</p>

  <h3>2. Spatial Bounding Box & Keypoint Verification</h3>
  <p>For grounding tasks, bounding box coordinates <code>[ymin, xmin, ymax, xmax]</code> must match visual landmarks precisely. Human annotators audit automated region proposals to ensure sub-pixel accuracy.</p>

  <h3>3. OCR & Chart Parsing for Enterprise Documents</h3>
  <p>Financial charts, infographics, and technical diagrams require specialized parsing. We extract structured tables (JSON/Markdown) mapped to image regions for multimodal QA training.</p>

  <h2>Curating for Zero-Hallucination Visual QA</h2>

  <ol>
    <li><strong>Negative Sampling:</strong> Injecting subtle visual edits to test if the model notices missing objects or altered text.</li>
    <li><strong>Demographic & Cultural Balance:</strong> Ensuring visual datasets represent global geographies, architectures, and cultural symbols.</li>
    <li><strong>Privacy & Anonymization:</strong> Automated blurring of faces, PII, and license plates before dataset compilation.</li>
  </ol>

  <hr>

  <p><strong>Building Vision-Language Models?</strong> <a href="../index.html#contact">Start a project</a> — tell us your modal domain and image count, and we'll curate custom VLM datasets.</p>`,
    related: ['red-teaming-llm', 'rlhf-agreement', 'ai-tutoring-data']
  },
  {
    slug: 'llm-localization-eval',
    cat: 'Localization',
    title: 'Evaluating LLM Translation Quality: COMET, BLEU, and Human Rating Correlation',
    description: 'Why traditional BLEU scores fail to capture semantic nuance in modern LLM translations, and how COMET metrics paired with MQM human evaluation set the gold standard.',
    date: 'Jul 2026',
    dateISO: '2026-07-15',
    read: '7 min read',
    body: `
  <p>Evaluating machine translation quality used to be simple: run BLEU or TER against a reference translation. But as Large Language Models (LLMs) output fluent, highly paraphrased translations, n-gram matching metrics like BLEU penalize valid, natural phrasing that happens not to match the reference word-for-word.</p>

  <h2>Why Neural Evaluation Metrics Win</h2>

  <p>Modern localization pipelines employ neural evaluation models like <strong>COMET</strong> (Crosslingual Optimized Metric for Evaluation of Translation) and <strong>BLEURT</strong>. Unlike BLEU, COMET uses cross-lingual embeddings to evaluate semantic similarity between source, translation, and reference.</p>

  <h3>Key Differences: BLEU vs. COMET</h3>

  <ul>
    <li><strong>BLEU:</strong> Measures exact n-gram overlap. Fails when LLMs use synonyms or alter sentence structure for better flow.</li>
    <li><strong>COMET:</strong> Trained on human multidimensional quality metrics (MQM). Detects mistranslations, omissions, and register mismatches even with non-identical vocabulary.</li>
    <li><strong>MTQE (Quality Estimation):</strong> Evaluates translation quality <em>without needing a reference translation</em>, enabling real-time production filtering.</li>
  </ul>

  <h2>Combining Automated Metrics with MQM Human Audits</h2>

  <p>Automation filters low-hanging fruit, but enterprise brand safety requires Multidimensional Quality Metrics (MQM) human evaluations by certified linguists across critical categories: Accuracy, Fluency, Terminology, Style, and Design.</p>

  <hr>

  <p><strong>Benchmarking your translation engine?</strong> <a href="../index.html#contact">Start a project</a> — we provide automated COMET scoring alongside expert MQM linguist audits.</p>`,
    related: ['mt-human-pass', 'enterprise-lqa-framework', 'translation-memory']
  },
  {
    slug: 'adaptive-learning-analytics',
    cat: 'EduSolution',
    title: 'Designing Adaptive Learning Engines: Item Response Theory (IRT) in Modern EdTech',
    description: 'How 3PL Item Response Theory and knowledge tracing algorithms dynamically adjust question difficulty for personalized student learning pathways.',
    date: 'Jul 2026',
    dateISO: '2026-07-10',
    read: '6 min read',
    body: `
  <p>Traditional e-learning treats every student identically: read module A, complete quiz B. Adaptive learning systems change the trajectory in real-time, tailoring question difficulty and pedagogical scaffolding to each learner's demonstrated proficiency.</p>

  <h2>The Mathematics of Adaptive Assessment: 3PL IRT</h2>

  <p>Item Response Theory (IRT) models the probability that a student with ability level &theta; will answer a specific question correctly. The 3-Parameter Logistic (3PL) model accounts for:</p>

  <ol>
    <li><strong>Difficulty (a):</strong> Where on the skill scale the question discriminates best.</li>
    <li><strong>Discrimination (b):</strong> How sharply the item distinguishes between high and low proficiency learners.</li>
    <li><strong>Guessing (c):</strong> The baseline probability of getting the item right by random choice (critical for multiple-choice).</li>
  </ol>

  <h2>Deep Knowledge Tracing (DKT) with Neural Networks</h2>

  <p>Beyond static IRT, modern AI tutors utilize Recurrent Neural Networks (RNNs) and Transformers for <strong>Deep Knowledge Tracing</strong>. DKT models predict future performance by analyzing student response history, time-on-task, and misconception patterns across prerequisite skill graphs.</p>

  <hr>

  <p><strong>Building an adaptive learning platform?</strong> <a href="../index.html#contact">Start a project</a> — we design psychometric item banks and AI knowledge tracing datasets for EdTech platforms.</p>`,
    related: ['ai-tutoring-data', 'elearning-cultural', 'scorm-translation']
  },
  {
    slug: 'multilingual-voice-cloning',
    cat: 'AI Data',
    title: 'Zero-Shot Multilingual Voice Cloning: Dataset Requirements & Phoneme Alignment',
    description: 'What makes voice cloning sound natural across language boundaries — IPA phoneme mapping, studio-quality noise floor, and cross-lingual prosody transfer.',
    date: 'Jul 2026',
    dateISO: '2026-07-10',
    read: '7 min read',
    body: `
  <p>Cloning a speaker's voice in their native language is a solved problem. Cloning their voice in a language they <em>don't speak</em> — while preserving their unique vocal timbre, accent nuance, and emotional cadence — requires specialized cross-lingual audio datasets.</p>

  <h2>Technical Barriers in Cross-Lingual TTS</h2>

  <ul>
    <li><strong>Phoneme Inventory Mismatches:</strong> Spanish lacks the English 'th' sound (/&theta;/); English lacks the Arabic guttural /&xbf;/. Voice models must synthesize foreign phonemes while maintaining the speaker's vocal identity.</li>
    <li><strong>Prosody & Intonation Transfer:</strong> Tonal languages like Mandarin require strict pitch contour control, while English relies on stress-timed rhythm.</li>
    <li><strong>Acoustic Environment Normalization:</strong> Audio collected in inconsistent room acoustics degrades speaker embeddings. Studio-grade 96kHz 24-bit recording specs are mandatory.</li>
  </ul>

  <h2>Dataset Specifications for Zero-Shot Voice Synthesis</h2>

  <ol>
    <li><strong>Phonetically Balanced Corpus:</strong> Scripts engineered using the International Phonetic Alphabet (IPA) to cover all diphthongs and triphones per target language.</li>
    <li><strong>Multi-Speaker Studio Captures:</strong> Anechoic chamber recordings paired with high-precision force-aligned text timestamps.</li>
  </ol>

  <hr>

  <p><strong>Training voice cloning or TTS models?</strong> <a href="../index.html#contact">Start a project</a> — we deliver studio-grade multilingual voice corpora across 40+ languages.</p>`,
    related: ['wake-word-audio', 'rlhf-agreement', 'red-teaming-llm']
  },
  {
    slug: 'rag-chunking-localization',
    cat: 'Engineering',
    title: 'Chunking Strategies for Multilingual RAG: Retaining Semantic Context Across Languages',
    description: 'Why fixed-length character chunking breaks cross-lingual vector retrieval, and how sentence-boundary awareness and metadata enrichment boost RAG accuracy.',
    date: 'Jul 2026',
    dateISO: '2026-07-05',
    read: '6 min read',
    body: `
  <p>Retrieval-Augmented Generation (RAG) is the standard pattern for grounding LLMs on proprietary enterprise knowledge. However, when building RAG systems for multilingual content, standard chunking strategies like "500 characters with 50-character overlap" break down severely.</p>

  <h2>Why Fixed-Length Chunking Fails in Multilingual RAG</h2>

  <p>Different languages encode information at radically different character densities:</p>

  <ul>
    <li><strong>CJK Languages (Chinese, Japanese, Korean):</strong> A 500-character chunk in Chinese contains ~3x more semantic information than a 500-character chunk in English.</li>
    <li><strong>German & Finnish:</strong> Compound words (e.g., <em>Rechtsschutzversicherungsgesellschaften</em>) skew tokenization ratios and cause unnatural mid-word breaks.</li>
    <li><strong>RTL Languages (Arabic, Hebrew):</strong> Mixed English/Arabic strings (Bidi) get fragmented mid-phrase, breaking vector embedding similarity scores.</li>
  </ul>

  <h2>Optimal Multilingual Chunking Patterns</h2>

  <ol>
    <li><strong>Semantic Sentence-Boundary Chunking:</strong> Using spaCy or NLTK language-specific tokenizers to split on sentence and paragraph boundaries rather than raw character counts.</li>
    <li><strong>Parent-Document Retrieval:</strong> Storing small chunks (100 tokens) for vector similarity search, but retrieving the larger parent section (500 tokens) for LLM prompt context insertion.</li>
    <li><strong>Language-Tagged Vector Metadata:</strong> Filtering vector searches by locale tag before running cosine similarity to eliminate cross-lingual vector drift.</li>
  </ol>

  <hr>

  <p><strong>Optimizing your enterprise RAG system?</strong> <a href="../index.html#contact">Start a project</a> — we design multilingual RAG data pipelines and evaluation benchmarks.</p>`,
    related: ['rtl-layouts', 'pseudo-localization', 'multilingual-seo']
  },
  {
    slug: 'enterprise-lqa-framework',
    cat: 'Localization',
    title: 'Building an Enterprise LQA Framework: DQF-MQM Error Typology in Practice',
    description: 'Standardizing localization quality audit scoring across 40 vendors with DQF-MQM severity weighting and automated quality gates.',
    date: 'Jul 2026',
    dateISO: '2026-07-05',
    read: '7 min read',
    body: `
  <p>Managing localization quality across dozens of vendors and 40+ languages quickly turns chaotic without a standardized quality framework. Subjective feedback like "this translation feels unnatural" leads to endless vendor disputes.</p>

  <h2>The DQF-MQM Error Typology Standard</h2>

  <p>The Dynamic Quality Framework (DQF) merged with Multidimensional Quality Metrics (MQM) provides an industry-standard categorization for localization error auditing:</p>

  <h3>1. Error Categories</h3>
  <p>Errors are categorized into standardized buckets: Accuracy (Omission, Addition, Mistranslation), Terminology (Glossary Violation), Fluency (Grammar, Spelling), Style (Brand Voice), and Formatting (Placeholder/Tag corruption).</p>

  <h3>2. Severity Weighting</h3>
  <ul>
    <li><strong>Critical (Points: 10):</strong> Prevents user completion (e.g., corrupted URL or legal contradiction).</li>
    <li><strong>Major (Points: 5):</strong> Noticeable error affecting meaning or professional brand perception.</li>
    <li><strong>Minor (Points: 1):</strong> Typo or minor stylistic choice that does not alter understanding.</li>
  </ul>

  <h2>Calculating the Quality Score (Pass/Fail Gate)</h2>

  <p>The total error penalty score is calculated per 1,000 words. If the score falls below the threshold (e.g., 98/100), the batch automatically fails QA and triggers vendor re-work at no additional cost.</p>

  <hr>

  <p><strong>Need to set up an enterprise LQA framework?</strong> <a href="../index.html#contact">Start a project</a> — we provide independent 3rd-party MQM auditing and automated quality gate implementation.</p>`,
    related: ['llm-localization-eval', 'glossary-contract', 'mt-human-pass']
  }
,
  {
    slug: 'ai-voice-dubbing-ethics',
    cat: 'AI Data',
    title: 'The ethical framework for AI voice cloning and dubbing',
    description: 'As synthetic voice reaches parity with human actors, how do we handle consent, compensation, and copyright? A look into our voice AI training guidelines.',
    date: 'Jul 2026',
    dateISO: '2026-07-20',
    read: '5 min read',
    body: `
  <p>Synthetic voice generation has crossed the uncanny valley. Modern models can replicate breath patterns, emotional cadence, and micro-hesitations. This is incredible for accessibility and rapid content localization, but it introduces massive ethical gray areas.</p>
  <h2>Consent is more than a signature</h2>
  <p>When an actor licenses their voice for an AI model, are they licensing it for a specific project, or for perpetuity? At Mavy EduSolution, we enforce <strong>use-case boundaries</strong>. Voice data collected for educational content cannot be legally repurposed for political advertising or automated telemarketing without explicit re-consent.</p>
  <h3>Compensation models</h3>
  <p>We've pioneered a royalty-share model for voice actors. Instead of a flat buyout, actors receive fractional compensation every time their synthetic voiceprint is deployed in a new locale. This aligns AI progress with human prosperity.</p>
  <h2>Watermarking and deepfake prevention</h2>
  <p>Every synthetic audio file we produce contains a cryptographic audio watermark. It's inaudible to humans but easily detectable by algorithms, ensuring transparency and fighting the spread of misinformation.</p>
  `,
    related: ['multilingual-voice-cloning', 'wake-word-audio']
  },
  {
    slug: 'semantic-search-seo',
    cat: 'Localization',
    title: 'Beyond keywords: Semantic SEO in global markets',
    description: 'Why translating your English keyword list is actively harming your international SEO, and how to optimize for semantic search intent instead.',
    date: 'Aug 2026',
    dateISO: '2026-08-02',
    read: '6 min read',
    body: `
  <p>The era of exact-match keyword localization is dead. Search engines no longer look for strings of characters; they look for entities, context, and intent. When you enter a new market, translating your English SEO strategy word-for-word is a recipe for irrelevance.</p>
  <h2>The problem with keyword translation</h2>
  <p>In English, someone might search for "cheap flights." A literal translation into French might yield "vols bon marché," but actual French users often search for "vols pas chers." If your localization team is just translating your keyword list without local SERP analysis, you are invisible to your target audience.</p>
  <h3>Optimizing for intent</h3>
  <p>Semantic SEO requires understanding <em>why</em> someone is searching. In Japan, searches for B2B software often include terms related to "implementation support" or "trust," whereas US searches prioritize "ROI" or "pricing."</p>
  <h2>How we handle Multilingual SEO</h2>
  <p>At Mavy EduSolution, we don't translate keywords. We conduct native <strong>in-market keyword research</strong> from scratch. We analyze local search volume, map it to the buyer's journey, and craft metadata that satisfies the local search intent.</p>
  `,
    related: ['multilingual-seo', 'enterprise-lqa-framework']
  },
  {
    slug: 'immersive-vr-learning',
    cat: 'Education',
    title: 'Localizing VR and AR learning environments',
    description: 'Text expansion is hard on a screen. It\'s even harder in 3D space. How we adapt immersive spatial learning experiences for global audiences.',
    date: 'Aug 2026',
    dateISO: '2026-08-10',
    read: '8 min read',
    body: `
  <p>Virtual Reality (VR) and Augmented Reality (AR) are transforming enterprise training and higher education. But localizing a 3D spatial interface introduces challenges that don't exist in traditional 2D e-learning.</p>
  <h2>Spatial UI and Text Expansion</h2>
  <p>When you translate English into German, text typically expands by 30%. On a website, you just let the container grow. In VR, if a text label expands, it might clip through a 3D object or become unreadable due to the user's field of view.</p>
  <h3>Audio spatialization</h3>
  <p>In immersive environments, audio doesn't just play; it originates from a location. When we replace English voice-over with localized audio, we must ensure the new audio files are perfectly mapped to the 3D coordinates and match the timing of the visual events.</p>
  <h2>Cultural adaptation of avatars</h2>
  <p>Localization isn't just words. In some markets, the body language, attire, and physical proximity of virtual avatars must be adjusted to align with local professional norms. Our cultural consultants review 3D assets just as rigorously as text.</p>
  `,
    related: ['elearning-cultural', 'scorm-translation']
  },
  {
    slug: 'llm-jailbreak-red-teaming',
    cat: 'AI Data',
    title: 'Multilingual Red Teaming: Finding LLM vulnerabilities across 50 languages',
    description: 'An LLM might be safe in English, but easily jailbroken in Swahili. Why foundation models need comprehensive multilingual red teaming.',
    date: 'Aug 2026',
    dateISO: '2026-08-18',
    read: '7 min read',
    body: `
  <p>Safety alignment is often an English-first endeavor. Foundation models are heavily red-teamed and RLHF-tuned using English prompts, ensuring they refuse harmful instructions. But what happens when you translate that exact same harmful instruction into a low-resource language?</p>
  <h2>The multilingual safety gap</h2>
  <p>In many cases, the safety filters fail. A model that refuses to write a phishing email in English might happily oblige when asked in Bengali or Hausa. The model's safety guardrails haven't been generalized across its entire latent space.</p>
  <h3>Cultural vectors of attack</h3>
  <p>Furthermore, what constitutes a "harmful" prompt is deeply cultural. Hate speech, political sensitivities, and social taboos vary wildly across borders. A prompt that is benign in one country might violate local laws in another.</p>
  <h2>Our Red Teaming methodology</h2>
  <p>At Mavy EduSolution, our adversarial testing teams consist of native speakers who understand local slang, cultural friction points, and linguistic nuances. We probe models using idioms, colloquialisms, and code-switching to ensure safety alignment is globally robust.</p>
  `,
    related: ['red-teaming-llm', 'rlhf-agreement']
  }

];

// Build lookup for related posts
const postMap = {};
posts.forEach(p => { postMap[p.slug] = p; });

function generateHTML(post) {
  // Auto-calculate reading time
  const plainText = post.body.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');
  const wordCount = plainText.split(' ').filter(w => w.length > 0).length;
  const autoReadTime = Math.max(1, Math.ceil(wordCount / 230));

  const relatedHTML = (post.related || []).map(slug => {
    const r = postMap[slug];
    if (!r) return '';
    return `
    <a href="${r.slug}.html" class="related-card">
      <span class="blog-cat">${r.cat}</span>
      <h3>${r.title}</h3>
      <span class="blog-read">${r.read} â†’</span>
    </a>`;
  }).join('');

  const LOGO_SVG = '<svg class="logo-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="22" fill="#050510"/><rect x="4" y="4" width="92" height="92" rx="18" stroke="#a78bfa" stroke-width="2" fill="none"/><path d="M25 70V35l15 25 15-25v35" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M62 70V35h15M62 52.5h12M62 70h15" stroke="#f0f0ff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>';

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} | ${BRAND} Blog</title>
<meta name="description" content="${post.description}">
<link rel="canonical" href="${DOMAIN}/blog/${post.slug}">
<meta property="og:type" content="article">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="${post.description}">
<meta property="og:url" content="${DOMAIN}/blog/${post.slug}">
<meta property="og:site_name" content="${BRAND}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${post.title}">
<meta name="twitter:description" content="${post.description}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23050510'/%3E%3Ctext x='50' y='68' font-size='48' font-family='Georgia,serif' fill='%23a78bfa' text-anchor='middle'%3EME%3C/text%3E%3C/svg%3E">
<link rel="alternate" type="application/rss+xml" title="${BRAND} Blog" href="../rss.xml">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "${post.title.replace(/"/g, '\\"')}",
  "description": "${post.description.replace(/"/g, '\\"')}",
  "datePublished": "${post.dateISO}",
  "author": { "@type": "Organization", "name": "${BRAND}" },
  "publisher": { "@type": "Organization", "name": "${BRAND}" },
  "mainEntityOfPage": "${DOMAIN}/blog/${post.slug}",
  "wordCount": ${wordCount}
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{--ink:#050510;--surface:rgba(255,255,255,0.03);--surface-solid:#0d0d20;--surface-2:rgba(255,255,255,0.06);--text:#f0f0ff;--muted:#8888aa;--brass:#a78bfa;--brass-soft:rgba(167,139,250,0.14);--coral:#22d3ee;--paper:#0e0e1e;--line:rgba(255,255,255,0.08);--shadow:0 20px 60px rgba(0,0,0,0.6);--glass:blur(16px) saturate(180%);--r-lg:22px;--r-md:14px;--accent-pink:#f472b6;}
  *{margin:0;padding:0;box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{background:var(--ink);color:var(--text);font-family:'IBM Plex Sans',system-ui,sans-serif;overflow-x:hidden;}
  ::selection{background:var(--brass);color:#050510;}
  h1,h2,h3{font-family:'Fraunces',serif;font-weight:600;letter-spacing:-0.01em;}
  a{color:inherit;text-decoration:none;}
  nav{position:fixed;top:0;width:100%;z-index:100;padding:1.1rem 5%;display:flex;justify-content:space-between;align-items:center;background:var(--surface);backdrop-filter:var(--glass);border-bottom:1px solid var(--line);}
  .logo{font-size:1.3rem;font-weight:600;display:flex;align-items:center;gap:.5rem;}
  .logo span{color:var(--brass);}
  .logo-icon{width:32px;height:32px;flex-shrink:0;}
  .nav-links{display:flex;gap:2.1rem;align-items:center;}
  .nav-links a{font-size:.92rem;font-weight:500;position:relative;color:var(--muted);transition:color .2s;}
  .nav-links a::after{content:'';position:absolute;bottom:-6px;left:0;width:0;height:1.5px;background:var(--brass);transition:width .3s;}
  .nav-links a:hover,.nav-links a.active{color:var(--text);}
  .nav-links a:hover::after,.nav-links a.active::after{width:100%;}
  .icon-btn{cursor:pointer;padding:.5rem .6rem;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--text);font-size:1rem;display:none;}
  @media(max-width:768px){.icon-btn{display:block;}.nav-links a{display:none;}}
  .mobile-menu{position:fixed;inset:0;background:var(--ink);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2rem;opacity:0;pointer-events:none;transition:opacity .3s;}
  .mobile-menu.open{opacity:1;pointer-events:auto;}
  .mobile-menu a{font-size:1.6rem;font-weight:500;color:var(--muted);transition:color .2s;}
  .mobile-menu a:hover{color:var(--brass);}
  .mobile-menu .mobile-close{position:absolute;top:1.2rem;right:5%;font-size:1.5rem;color:var(--text);background:none;border:none;cursor:pointer;padding:.5rem;}
  .reading-progress{position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,var(--brass),var(--coral));z-index:200;transition:width .1s linear;}
  .breadcrumbs{padding:6rem 5% 0;max-width:900px;margin:auto;}
  .breadcrumbs ol{list-style:none;display:flex;gap:.6rem;font-family:'IBM Plex Mono',monospace;font-size:.75rem;color:var(--muted);flex-wrap:wrap;}
  .breadcrumbs a{color:var(--brass);}.breadcrumbs a:hover{text-decoration:underline;}
  .breadcrumbs li::after{content:'/';margin-left:.6rem;color:var(--line);}.breadcrumbs li:last-child::after{display:none;}.breadcrumbs li:last-child{color:var(--muted);}
  .article-hero{max-width:900px;margin:2.4rem auto 0;padding:0 5%;}
  .article-hero .cat-tag{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:var(--brass);text-transform:uppercase;letter-spacing:.08em;margin-bottom:1rem;display:inline-block;}
  .article-hero h1{font-size:clamp(2rem,3.5vw,2.8rem);line-height:1.12;margin-bottom:1.2rem;}
  .article-meta{display:flex;gap:1.6rem;font-family:'IBM Plex Mono',monospace;font-size:.78rem;color:var(--muted);margin-bottom:2rem;flex-wrap:wrap;}
  .article-meta span{display:flex;align-items:center;gap:.4rem;}
  .article-body{max-width:900px;margin:0 auto;padding:0 5% 4rem;}
  .article-body h2{font-size:1.6rem;margin:2.4rem 0 1rem;color:var(--text);}
  .article-body h3{font-size:1.25rem;margin:2rem 0 .8rem;color:var(--text);}
  .article-body p{color:var(--muted);font-size:1.02rem;line-height:1.75;margin-bottom:1.4rem;}
  .article-body ul,.article-body ol{color:var(--muted);font-size:1.02rem;line-height:1.75;margin-bottom:1.4rem;padding-left:1.6rem;}
  .article-body li{margin-bottom:.5rem;}
  .article-body blockquote{border-left:3px solid var(--brass);padding:.8rem 1.4rem;margin:1.6rem 0;background:var(--brass-soft);border-radius:0 var(--r-md) var(--r-md) 0;}
  .article-body blockquote p{color:var(--text);margin-bottom:0;}
  .article-body code{font-family:'IBM Plex Mono',monospace;background:var(--surface-2);padding:.15rem .4rem;border-radius:4px;font-size:.9rem;}
  .article-body pre{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);padding:1.4rem;overflow-x:auto;margin-bottom:1.6rem;}
  .article-body pre code{background:none;padding:0;}
  .article-body a{color:var(--brass);text-decoration:underline;text-underline-offset:3px;}
  .article-body a:hover{color:var(--coral);}
  .article-body img{border-radius:var(--r-md);margin:1.6rem 0;}
  .article-body hr{border:none;border-top:1px solid var(--line);margin:2.4rem 0;}
  .share-bar{max-width:900px;margin:0 auto 2rem;padding:0 5%;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
  .share-bar span{font-family:'IBM Plex Mono',monospace;font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;}
  .share-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.5rem 1rem;border-radius:8px;border:1px solid var(--line);background:transparent;color:var(--muted);font-size:.82rem;font-family:'IBM Plex Sans',sans-serif;cursor:pointer;transition:border-color .2s,color .2s;text-decoration:none;}
  .share-btn:hover{border-color:var(--brass);color:var(--brass);}
  .back-to-blog{display:flex;align-items:center;gap:.5rem;max-width:900px;margin:0 auto 2rem;padding:0 5%;font-family:'IBM Plex Mono',monospace;font-size:.82rem;color:var(--brass);}
  .back-to-blog:hover{text-decoration:underline;}
  .related-section{max-width:900px;margin:0 auto 4rem;padding:0 5%;}
  .related-section h2{font-size:1.4rem;margin-bottom:1.6rem;}
  .related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.2rem;}
  .related-card{background:var(--surface);backdrop-filter:var(--glass);border:1px solid var(--line);border-radius:var(--r-lg);padding:1.6rem;transition:border-color .3s,transform .3s;display:block;}
  .related-card:hover{border-color:var(--brass);transform:translateY(-3px);}
  .related-card .blog-cat{font-family:'IBM Plex Mono',monospace;font-size:.68rem;color:var(--brass);text-transform:uppercase;letter-spacing:.06em;display:block;margin-bottom:.6rem;}
  .related-card h3{font-size:1rem;margin-bottom:.5rem;line-height:1.35;}
  .related-card .blog-read{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:var(--brass);}
  footer{border-top:1px solid var(--line);padding:3.5rem 5% 2rem;margin-top:2rem;}
  .footer-grid{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:2rem;max-width:1400px;margin:auto auto 2.5rem;}
  .footer-grid h4{font-family:'IBM Plex Mono',monospace;font-size:.72rem;color:var(--brass);text-transform:uppercase;letter-spacing:.08em;margin-bottom:1rem;}
  .footer-grid a,.footer-grid p{color:var(--muted);font-size:.88rem;display:block;margin-bottom:.6rem;}
  .footer-grid a:hover{color:var(--text);}
  .footer-social{display:flex;gap:.8rem;margin-top:1rem;}
  .footer-social a{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid var(--line);color:var(--muted);font-size:.9rem;transition:border-color .2s,color .2s;}
  .footer-social a:hover{border-color:var(--brass);color:var(--brass);}
  .footer-bottom{display:flex;justify-content:space-between;color:var(--muted);font-size:.8rem;max-width:1400px;margin:auto;flex-wrap:wrap;gap:1rem;padding-top:2rem;border-top:1px solid var(--line);}
  .footer-bottom a{color:var(--muted);margin-left:1.2rem;}.footer-bottom a:hover{color:var(--text);}
  .scroll-top{position:fixed;bottom:2rem;right:2rem;z-index:90;width:48px;height:48px;border-radius:50%;background:var(--brass);color:#050510;border:none;cursor:pointer;font-size:1.3rem;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 20px rgba(167,139,250,0.35);opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s;pointer-events:none;}
  .scroll-top.show{opacity:1;transform:translateY(0);pointer-events:auto;}
  .scroll-top:hover{transform:translateY(-3px);box-shadow:0 10px 28px rgba(167,139,250,0.5);}
  @media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr;}}
  @media(max-width:768px){.footer-grid{grid-template-columns:1fr;}.article-hero h1{font-size:1.8rem;}}
  :focus-visible{outline:2px solid var(--brass);outline-offset:2px;}
</style>
</head>
<body>
<div class="reading-progress" id="readingProgress"></div>
<nav>
  <a href="../index.html" class="logo">${LOGO_SVG}Mavy <span>EduSolution</span></a>
  <div class="nav-links">
    <a href="../index.html#services">Services</a>
    <a href="../index.html#ai-data">AI Data</a>
    <a href="../index.html#edu-solutions">EduSolutions</a>
    <a href="../index.html#blog" class="active">Blog</a>
    <a href="../index.html#contact">Contact</a>
    <button class="icon-btn" id="menuToggle" aria-label="Open menu" aria-expanded="false">\u2630</button>
  </div>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose" aria-label="Close menu">\u2715</button>
  <a href="../index.html#services">Services</a>
  <a href="../index.html#ai-data">AI Data</a>
  <a href="../index.html#edu-solutions">EduSolutions</a>
  <a href="../index.html#blog">Blog</a>
  <a href="../index.html#contact">Contact</a>
</div>
<div class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="../index.html">Home</a></li>
    <li><a href="../index.html#blog">Blog</a></li>
    <li>${post.title.length > 60 ? post.title.substring(0, 57) + '...' : post.title}</li>
  </ol>
</div>
<div class="article-hero">
  <span class="cat-tag">${post.cat}</span>
  <h1>${post.title}</h1>
  <div class="article-meta">
    <span>\ud83d\udcc5 ${post.date}</span>
    <span>\u23f1 ${autoReadTime} min read</span>
    <span>\u270d ${BRAND} Team</span>
  </div>
</div>
<div class="article-body" id="articleBody">
${post.body}
</div>
<div class="share-bar">
  <span>Share</span>
  <a class="share-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(DOMAIN + '/blog/' + post.slug + '.html')}" target="_blank" rel="noopener">\ud83d\udc26 Twitter / X</a>
  <a class="share-btn" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(DOMAIN + '/blog/' + post.slug + '.html')}" target="_blank" rel="noopener">\ud83d\udcbc LinkedIn</a>
  <a class="share-btn" href="mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent('Check this out: ' + DOMAIN + '/blog/' + post.slug + '.html')}">\u2709 Email</a>
</div>
<a href="../index.html#blog" class="back-to-blog">\u2190 Back to all posts</a>
<div class="related-section">
  <h2>Related posts</h2>
  <div class="related-grid">${relatedHTML}</div>
</div>
<a href="../index.html#blog" class="back-to-blog" style="margin-bottom:3rem;">\u2190 Back to all posts</a>
<footer>
  <div class="footer-grid">
    <div>
      <a href="../index.html" class="logo">${LOGO_SVG}Mavy <span>EduSolution</span></a>
      <p style="margin-top:1rem;max-width:280px;">Localization, AI data, and education solutions built like a type foundry: one shared system of terms, tone, and formatting behind every language you ship.</p>
      <div class="footer-social">
        <a href="#" aria-label="LinkedIn" title="LinkedIn">in</a>
        <a href="#" aria-label="Twitter / X" title="Twitter / X">\ud835\udd4f</a>
        <a href="#" aria-label="GitHub" title="GitHub">GH</a>
      </div>
    </div>
    <div><h4>Services</h4><a href="../index.html#services">Localization</a><a href="../index.html#ai-data">AI Data Services</a><a href="../index.html#edu-solutions">Education Solutions</a><a href="../index.html#process">Process</a></div>
    <div><h4>Company</h4><a href="../index.html#about">About</a><a href="../index.html#blog">Blog</a><a href="../index.html#faq">FAQ</a></div>
    <div><h4>Contact</h4><a href="../index.html#contact">Start a project</a><a href="mailto:${EMAIL}">${EMAIL}</a></div>
  </div>
  <div class="footer-bottom">
    <span>\u00a9 2026 ${BRAND}.</span>
    <span>Built for global scale, one string at a time.<a href="#">Privacy</a><a href="#">Terms</a></span>
  </div>
</footer>
<button class="scroll-top" id="scrollTop" aria-label="Scroll to top">\u2191</button>
<script>
const menuToggle=document.getElementById('menuToggle'),mobileMenu=document.getElementById('mobileMenu'),mobileClose=document.getElementById('mobileClose');
menuToggle.addEventListener('click',()=>{mobileMenu.classList.add('open');document.body.style.overflow='hidden';});
function closeMobile(){mobileMenu.classList.remove('open');document.body.style.overflow='';}
mobileClose.addEventListener('click',closeMobile);
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMobile));
const scrollTopBtn=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{scrollTopBtn.classList.toggle('show',window.scrollY>400);
  const prog=document.getElementById('readingProgress');
  const body=document.getElementById('articleBody');
  if(body){const rect=body.getBoundingClientRect();const total=body.scrollHeight;const scrolled=Math.min(Math.max(-rect.top/(total-window.innerHeight)*100,0),100);prog.style.width=scrolled+'%';}
},{passive:true});
scrollTopBtn.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});
</script>
</body>
</html>`;
}

// Generate all blog files
const blogDir = path.join(__dirname, 'blog');
posts.forEach(post => {
  const filepath = path.join(blogDir, `${post.slug}.html`);
  fs.writeFileSync(filepath, generateHTML(post), 'utf8');
  console.log(`\u2705 Created: blog/${post.slug}.html`);
});

console.log(`\n\ud83c\udf89 Generated ${posts.length} blog articles in ./blog/`);

