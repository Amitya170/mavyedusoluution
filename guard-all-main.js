const fs = require('fs');

let code = fs.readFileSync('main.js', 'utf8');

// 1. Guard scrollTopBtn
code = code.replace(
`const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('show', window.scrollY > 600);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});`,
`const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}`
);

// 2. Guard canvas bgCanvas
code = code.replace(
`  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');`,
`  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');`
);

// 3. Guard language grid
code = code.replace(
`const langGrid = document.getElementById('langGrid');
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
      tag.innerHTML = \`<div class="code">\${lang.code}</div><div class="name">\${lang.name}</div><div class="tier">\${lang.tier}</div>\`;
      const select = () => {
        document.querySelectorAll('.lang-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        langDetail.innerHTML = \`<div class="sample" dir="\${lang.dir}" lang="\${lang.code.toLowerCase()}">\${lang.sample}</div><div class="facts"><span><b>\${lang.name}</b></span><span>Tier: <b>\${lang.tier}</b></span><span>Direction: <b>\${lang.dir.toUpperCase()}</b></span></div>\`;
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
});`,
`const langGrid = document.getElementById('langGrid');
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
        tag.innerHTML = \`<div class="code">\${lang.code}</div><div class="name">\${lang.name}</div><div class="tier">\${lang.tier}</div>\`;
        const select = () => {
          document.querySelectorAll('.lang-tag').forEach(t => t.classList.remove('active'));
          tag.classList.add('active');
          if (langDetail) {
            langDetail.innerHTML = \`<div class="sample" dir="\${lang.dir}" lang="\${lang.code.toLowerCase()}">\${lang.sample}</div><div class="facts"><span><b>\${lang.name}</b></span><span>Tier: <b>\${lang.tier}</b></span><span>Direction: <b>\${lang.dir.toUpperCase()}</b></span></div>\`;
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
}`
);

// 4. Guard projectForm submission
code = code.replace(
`if (form) {
  form.addEventListener('submit', (e) => {`,
`const form = document.getElementById('projectForm');
const toast = document.getElementById('toast');

if (form) {
  form.addEventListener('submit', (e) => {`
);

fs.writeFileSync('main.js', code);
console.log('Guarded all DOM handlers in main.js!');
