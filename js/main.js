/* Навбар: заголовок при скролле */
const nav = document.getElementById('navbar');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 90);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Подсветка текущего раздела */
const ids = ['top', 'services', 'projects', 'contacts', 'skills'];
const links = document.querySelectorAll('#topnav a, #tabbar a');
const spy = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    let id = e.target.id;
    if (id === 'skills') id = 'services';
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
ids.forEach(i => { const el = document.getElementById(i); if (el) spy.observe(el); });

/* Появление блоков и полос навыков */
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('.bar i').forEach(b => b.style.width = b.dataset.w + '%');
    io.unobserve(e.target);
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Копирование ника */
const toast = document.getElementById('toast');
document.querySelectorAll('[data-copy]').forEach(btn => btn.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(btn.dataset.copy); } catch (e) {}
  toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1600);
}));

document.getElementById('year').textContent = new Date().getFullYear();
