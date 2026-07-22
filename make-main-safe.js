const fs = require('fs');

let mainJs = fs.readFileSync('main.js', 'utf8');

// Replace render functions with null-safe versions
const safeRenderBlock = `
/* ============ Render helpers (Null-Safe) ============ */
function renderCardGrid(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el || !items) return;
  el.innerHTML = items.map(s => \`
    <div class="service-card">
      <div class="service-num">\${s.num}</div>
      <h3>\${s.title}</h3>
      <p>\${s.body}</p>
      <div class="service-tags">\${s.tags.map(t => \`<span>\${t}</span>\`).join('')}</div>
    </div>\`).join('');
}
if (typeof CONTENT !== 'undefined' && CONTENT.services) renderCardGrid('servicesGrid', CONTENT.services);

// Bento layout for AI Data
const aiDataEl = document.getElementById('aiDataGrid');
if (aiDataEl && typeof CONTENT !== 'undefined' && CONTENT.aiData) {
  aiDataEl.innerHTML = CONTENT.aiData.map((s, i) => \`
    <div class="service-card\${i === 0 || i === CONTENT.aiData.length - 1 ? ' bento-featured' : ''}">
      <div class="service-num">\${s.num}</div>
      <h3>\${s.title}</h3>
      <p>\${s.body}</p>
      <div class="service-tags">\${s.tags.map(t => \`<span>\${t}</span>\`).join('')}</div>
    </div>\`).join('');
}

if (typeof CONTENT !== 'undefined' && CONTENT.eduSolutions) renderCardGrid('eduGrid', CONTENT.eduSolutions);

/* ============ Render: industries ============ */
function renderIndustries() {
  const el = document.getElementById('industriesGrid');
  if (!el || typeof CONTENT === 'undefined' || !CONTENT.industries) return;
  el.innerHTML = CONTENT.industries.map(ind => \`
    <div class="industry-card">
      <div class="industry-icon">\${ind.icon}</div>
      <h3>\${ind.name}</h3>
      <p>\${ind.desc}</p>
    </div>\`).join('');
}
renderIndustries();

/* ============ Render: case studies ============ */
function renderCaseStudies() {
  const grid = document.getElementById('caseGrid');
  if (!grid || typeof CONTENT === 'undefined' || !CONTENT.caseStudies) return;
  grid.innerHTML = CONTENT.caseStudies.map(c => \`
    <div class="case-card" tabindex="0" role="button" aria-expanded="false">
      <span class="case-tag">\${c.tag}</span>
      <h3>\${c.name}</h3>
      <p class="result">\${c.result}</p>
      <span class="case-toggle">View metrics +</span>
      <div class="case-metrics">\${c.metrics.map(m => \`<div class="case-metric"><b>\${m.n}</b><span>\${m.l}</span></div>\`).join('')}</div>
    </div>\`).join('');

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
  el.innerHTML = CONTENT.testimonials.map(t => \`
    <div class="testimonial-card">
      <p class="testimonial-quote">\${t.quote}</p>
      <div class="testimonial-author">
        <div class="testimonial-avatar">\${t.initials}</div>
        <div class="testimonial-info">
          <h4>\${t.name}</h4>
          <span>\${t.role}</span>
        </div>
      </div>
    </div>\`).join('');
}
renderTestimonials();

/* ============ Render: FAQ ============ */
function renderFaq() {
  const list = document.getElementById('faqList');
  if (!list || typeof CONTENT === 'undefined' || !CONTENT.faq) return;
  list.innerHTML = CONTENT.faq.map(f => \`
    <div class="faq-item">
      <button class="faq-q" aria-expanded="false"><span>\${f.q}</span><span class="plus">+</span></button>
      <div class="faq-a">\${f.a}</div>
    </div>\`).join('');

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

  const filtered = blogActiveCat === 'all'
    ? CONTENT.blogPosts
    : CONTENT.blogPosts.filter(p => p.cat === blogActiveCat);

  const visible = filtered.slice(0, blogVisibleCount);
  blogGrid.innerHTML = visible.map(p => \`
    <a href="blog/\${p.slug}.html" class="blog-card">
      <div class="blog-meta"><span class="blog-cat">\${p.cat}</span><span>\${p.date}</span></div>
      <h3>\${p.title}</h3>
      <p class="blog-excerpt">\${p.excerpt}</p>
      <span class="blog-read">\${p.read} →</span>
    </a>\`).join('');

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
`;

const startIndex = mainJs.indexOf('/* ============ Render: services, AI data, edu grids ============ */');
const endIndex = mainJs.indexOf('mobileMenu.querySelectorAll(\'a\').forEach(a => a.addEventListener(\'click\', closeMobile));');

if (startIndex !== -1 && endIndex !== -1) {
  mainJs = mainJs.substring(0, startIndex) + safeRenderBlock + mainJs.substring(endIndex + 'mobileMenu.querySelectorAll(\'a\').forEach(a => a.addEventListener(\'click\', closeMobile));'.length);
  fs.writeFileSync('main.js', mainJs);
  console.log('Successfully made main.js render section 100% null-safe!');
} else {
  console.error('Could not locate render block markers in main.js', startIndex, endIndex);
}
