/* ===== Список проектов: редактируйте здесь =====
   type: "web" | "python" | "mobile"
   Поле url можно оставить пустым, тогда карточка не будет ссылкой. */
const PROJECTS = [
  // { title: "Название", desc: "Короткое описание", type: "web", tags: ["HTML","CSS","JS"], url: "https://..." },
];

const list = document.getElementById('projectList');
const labels = { web: 'Web', python: 'Python', mobile: 'Mobile' };
function renderProjects(filter) {
  const items = PROJECTS.filter(p => filter === 'all' || p.type === filter);
  list.innerHTML = '';
  if (!items.length) {
    const d = document.createElement('div');
    d.className = 'empty';
    d.textContent = PROJECTS.length ? 'В этой категории пока пусто' : 'Здесь скоро появятся проекты. Загляните на GitHub @manerva.';
    list.appendChild(d);
    return;
  }
  items.forEach(p => {
    const el = document.createElement(p.url ? 'a' : 'div');
    el.className = 'project';
    if (p.url) { el.href = p.url; el.target = '_blank'; el.rel = 'noopener'; }
    const h = document.createElement('h3'); h.textContent = p.title;
    const d = document.createElement('p'); d.textContent = p.desc || '';
    const t = document.createElement('div'); t.className = 'tags';
    [labels[p.type], ...(p.tags || [])].filter(Boolean).forEach(x => {
      const s = document.createElement('span'); s.className = 'tag'; s.textContent = x; t.appendChild(s);
    });
    el.append(h, d, t);
    if (p.url) { const l = document.createElement('span'); l.className = 'link'; l.textContent = 'Открыть ›'; el.appendChild(l); }
    list.appendChild(el);
  });
}
document.querySelectorAll('.segment button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.segment button').forEach(x => x.setAttribute('aria-pressed', x === b));
  renderProjects(b.dataset.f);
}));
renderProjects('all');
