
/* ======= Data (editá fácil) ======= */
// Ahora usa URLs directas. Reemplazá estas con tus propias imágenes.
const CAROUSEL_IMAGES = [
  { url: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/c07ae042-082e-4b53-ba86-b6ac5e3004db/e4f92492923d585fc96db003fdad0a30c695ad0b.jpg?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=2000", caption:"Una ciudad devastada" },
  { url: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/41ae9e3f-18a9-4d84-afa3-d1de59f9e7b1/0dd4a8d4-98a2-4ef0-af0a-e88d4abf1a33?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=2000", caption:"Enfrentando el peligro" },
  { url: "https://beam-images.warnermediacdn.com/BEAM_LWM_DELIVERABLES/f714b187-5d41-4552-95ff-6ad3b8ed71ed/48491243-bf97-4984-9868-1b144b548c52?host=wbd-images.prod-vod.h264.io&partner=beamcom&w=2000", caption:"Enfrentando el peligro" },
  { url: "https://beam-images.warnermediacdn.com/2025-03/the-last-of-us-s2-hero-desktop.jpg?host=wbd-dotcom-drupal-prd-us-east-1.s3.amazonaws.com&w=3000", caption:"Joel y Ellie a caballo" },
  { url: "https://media.revistagq.com/photos/640ef6fc23cb6bc2f6a82be7/16:9/w_2560%2Cc_limit/last-of-us-locationspedro-pascal-bella-ramsey_4.jpg", caption:"Joel y Ellie mirando un paisaje desolado" },
  { url: "https://media.vogue.fr/photos/640e4d2fec3d14f372cafc6c/2:3/w_2560%2Cc_limit/bella-ramsey-pedro-pascal_6.jpg", caption:"Joel y Ellie en el caballo" }
];

const SERIES = {
  title: 'The Last of Us — Fan Hub',
  seasons: [
    {
      number: 1, year: 2023,
      episodes: [
        { n:1, title:"When You're Lost in the Darkness", runtime:81, tag:'Impacto', img: CAROUSEL_IMAGES[0].url },
        { n:2, title:"Infected", runtime:53, tag:'Infección', img: CAROUSEL_IMAGES[1].url },
        { n:3, title:"Long, Long Time", runtime:76, tag:'Emotivo', img: CAROUSEL_IMAGES[2].url },
        { n:4, title:"Please Hold to My Hand", runtime:45, tag:'Acción', img: CAROUSEL_IMAGES[3].url },
        { n:5, title:"Endure and Survive", runtime:59, tag:'Acción', img: CAROUSEL_IMAGES[4].url },
        { n:6, title:"Kin", runtime:63, tag:'Drama', img: CAROUSEL_IMAGES[5].url },
        { n:7, title:"Left Behind", runtime:55, tag:'Origen', img: CAROUSEL_IMAGES[0].url },
        { n:8, title:"When We Are in Need", runtime:51, tag:'Tensión', img: CAROUSEL_IMAGES[1].url },
        { n:9, title:"Look for the Light", runtime:43, tag:'Final', img: CAROUSEL_IMAGES[4].url }
      ]
    },
  ]
};
// La galería ahora usa las mismas imágenes que el carrusel para mayor consistencia.
const GALLERY_IMAGES = [...CAROUSEL_IMAGES];

/* ======= Helpers ======= */
const $ = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];
const el = (tag, attrs={}, ...children) => {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => {
    if(k === 'class') node.className = v;
    else if(k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
    else if(v !== false && v != null) node.setAttribute(k, v);
  });
  children.flat().forEach(c => node.append(c.nodeType ? c : document.createTextNode(c)));
  return node;
};

/* ======= Dynamic Content ======= */
(function initDynamicContent() {
  const storyImg = $('#storyCardImg');
  if (storyImg && CAROUSEL_IMAGES.length > 4) {
    storyImg.src = CAROUSEL_IMAGES[4].url; // Usa la 5ta imagen del carrusel
    storyImg.alt = CAROUSEL_IMAGES[4].caption;
  }
})();

/* ======= Theme Toggle ======= */
(function initTheme(){
  const key = 't_theme';
  const saved = localStorage.getItem(key);
  if(saved === 'light') document.documentElement.classList.add('light');
  const btn = $('#themeToggle');
  btn?.addEventListener('click', () => {
    document.documentElement.classList.toggle('light');
    localStorage.setItem(key, document.documentElement.classList.contains('light') ? 'light' : 'dark');
  });
})();

/* ======= Active Nav Link ======= */
(function initActiveNav(){
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLink = $(`#site-menu a[href="${currentPage}"]`);
  
  if (navLink) {
    navLink.classList.add('is-active');
  } else if (currentPage === 'season-1.html') {
    // Si estamos en una subpágina de temporada, resaltar 'Serie'
    $('#site-menu a[href="series.html"]')?.classList.add('is-active');
  } else if (currentPage === 'lore.html') {
    $('#site-menu a[href="lore.html"]')?.classList.add('is-active');
  }
})();

/* ======= Hide Header on Scroll ======= */
(function initHideHeader() {
  const header = $('.site-header');
  if (!header) return;
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 150) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastScrollY = window.scrollY;
  }, { passive: true });
})();

/* ======= Scroll to Top Button ======= */
(function initScrollTop() {
  const btn = $('#scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ======= Menu (mobile) ======= */
(function initMenu(){
  const hamb = document.querySelector('.hamburger');
  const menu = document.getElementById('site-menu');
  hamb?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamb.setAttribute('aria-expanded', String(open));
  });
  // close on navlink click (mobile)
  $$('#site-menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ======= Carousel ======= */
(function initCarousel(){
  const carousel = $('.carousel');
  if (!carousel) return;

  const track = $('#carouselTrack');
  track.setAttribute('aria-live', 'polite'); // Anuncia cambios a lectores de pantalla

  CAROUSEL_IMAGES.forEach(({url, caption}) => {
    const slide = el('figure', {class:'slide'});
    slide.append(
      el('img', {src: url, alt: caption}),
      el('figcaption', {class:'caption'}, caption)
    );
    track.append(slide);
  });

  const dots = $('#carDots');
  const slides = [...track.children]; // Obtenemos los slides directamente del DOM
  slides.forEach((slide, i) => {
    const b = el('button', {'aria-label':`Ir a slide ${i+1}`, role:'tab'});
    b.addEventListener('click', () => go(i, true));
    dots.append(b);
  });

  const prev = $('#carPrev'), next = $('#carNext');
  let idx = -1, timer = null;
  const autoplay = carousel.dataset.autoplay === 'true';
  const interval = Number(carousel.dataset.interval || 4500);

  function go(i, user=false){
    const oldIdx = idx;
    if (oldIdx === i && oldIdx !== -1) return; // No hacer nada si es el mismo slide, permitir primera ejecución

    idx = (i + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === idx;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      isActive ? slide.removeAttribute('inert') : slide.setAttribute('inert', '');
    });

    [...dots.children].forEach((d,j) => d.setAttribute('aria-selected', String(j===idx)));
    if(user) resetAutoplay();
  }
  function step(dir){ go(idx + dir, true); }
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
  });

  function startAutoplay(){
    if(!autoplay || timer) return;
    timer = setInterval(() => go(idx+1), interval);
  }
  function stopAutoplay(){ if(timer){ clearInterval(timer); timer = null; } }
  function resetAutoplay(){ stopAutoplay(); startAutoplay(); }

  // Pause on hover/focus, resume on leave
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  // Pause when tab is not visible
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });

  go(0);
  startAutoplay();
})();

/* ======= Seasons + Episodes (accordion + grid) ======= */
(function initSeasons(){
  const seasonList = $('#seasonList');
  const seasonFilter = $('#seasonFilter');
  const episodesGrid = $('#episodesGrid'); // Para la página de temporada
  const favSelect = $('#favEpisodeSelect');

  if(!seasonList && !episodesGrid) return;

  // Fill season filter
  if (seasonFilter) {
    const allOption = el('option', {value:''}, 'Todas');
    seasonFilter.append(allOption);
    SERIES.seasons.forEach(s => seasonFilter.append(el('option', {value:String(s.number)}, `Temporada ${s.number} (${s.year})`)));
  }

  // Render accordion
  function renderAccordion(filter=''){
    seasonList.innerHTML = '';
    SERIES.seasons
      .filter(s => !filter || String(s.number) === filter)
      .forEach(season => {
        const dd = el('details');
        const sum = el('summary', {}, 
          el('span', {class:'ttl'}, `Temporada ${season.number}`),
          el('span', {class:'meta'}, `Año ${season.year} · ${season.episodes.length} episodios`)
        );
        const inner = el('div', {class:'acc-inner'});
        season.episodes.forEach(ep => {
          const row = el('div', {class:'episode-item'});
          row.append(el('div', {class:'episode-index'}, ep.n));
          const text = el('div', {}, 
            el('h4', {class:'episode-title'}, ep.title),
            el('span', {class:'badge'}, `${ep.runtime} min · ${ep.tag}`)
          );
          row.append(text);
          const star = el('button', {class:'btn icon star', 'aria-pressed':'false', title:'Agregar a favoritos'}, '⭐');
          star.addEventListener('click', () => toggleFav(season.number, ep.n, ep.title, star));
          row.append(star);
          inner.append(row);
        });
        dd.append(sum, inner);
        seasonList.append(dd);
      });
  }
  if (seasonList) renderAccordion();

  // Episodes grid (quick view)
  function renderGrid(seasonNumber){
    episodesGrid.innerHTML = '';
    const seasonsToRender = seasonNumber ? SERIES.seasons.filter(s => s.number == seasonNumber) : SERIES.seasons;
    seasonsToRender.forEach(season => {
      season.episodes.forEach((ep,i) => {
        const card = el('article', {class:'card reveal'});
        card.append(el('img', {src: ep.img, alt: ep.title, loading:'lazy'}));
        const pad = el('div', {class:'pad'});
        pad.append(el('h3', {}, `${ep.n}. ${ep.title}`));
        pad.append(el('p', {}, `T${season.number} · ${ep.runtime} min · ${ep.tag}`));
        const act = el('div', {style:'margin-top:8px; display:flex; gap:8px;'});
        const favBtn = el('button', {class:'btn icon star', 'aria-pressed':'false'}, '⭐ Favorito');
        favBtn.addEventListener('click', () => toggleFav(season.number, ep.n, ep.title, favBtn));
        act.append(favBtn);
        pad.append(act);
        card.append(pad);
        episodesGrid.append(card);
      });
    });
  }
  // Si estamos en una página de temporada, renderizar su grid
  if (episodesGrid && episodesGrid.dataset.season) {
    renderGrid(episodesGrid.dataset.season);
  }

  // Fill contact favorite selector
  function fillFavSelect(){
    if (!favSelect) return;
    favSelect.innerHTML = '<option value="">Elegí uno...</option>';
    SERIES.seasons.forEach(season => {
      season.episodes.forEach(ep => {
        favSelect.append(el('option', {value:`T${season.number}E${ep.n} ${ep.title}`}, `T${season.number}E${ep.n} — ${ep.title}`));
      });
    });
  }
  fillFavSelect();

  // Search / Filter
  $('#epSearch')?.addEventListener('input', e => filterEpisodes(e.target.value));
  seasonFilter?.addEventListener('change', e => renderAccordion(e.target.value));

  function filterEpisodes(q=''){
    const norm = q.trim().toLowerCase();
    $$('.episode-item').forEach(item => {
      const title = item.querySelector('.episode-title')?.textContent?.toLowerCase() || '';
      item.style.display = !norm || title.includes(norm) ? 'grid' : 'none';
    });
  }

  // Favorites (localStorage)
  const FKEY = 't_favs';
  function loadFavs(){
    try{ return JSON.parse(localStorage.getItem(FKEY)||'[]'); } catch{ return []; }
  }
  function saveFavs(list){ localStorage.setItem(FKEY, JSON.stringify(list)); }
  function isFav(favs, s, n){ return favs.some(x => x.s===s && x.n===n); }
  function toggleFav(s,n,title,btn){
    const favs = loadFavs();
    const idx = favs.findIndex(x => x.s===s && x.n===n);
    if(idx>=0){ favs.splice(idx,1); btn.setAttribute('aria-pressed','false'); }
    else{ favs.push({s, n, title}); btn.setAttribute('aria-pressed','true'); }
    saveFavs(favs); renderFavList();
  }
  function renderFavList(){
    const box = $('#favList'); if(!box) return;
    const favs = loadFavs();
    // Limpiar solo si la caja existe. Esto evita errores en otras páginas.
    if (box) {
      box.innerHTML = '';
    } else { return; }

    if(!favs.length){ box.hidden = true; return; }
    favs.forEach(f => box.append(el('div', {}, `T${f.s}E${f.n} — ${f.title}`)));
    box.hidden = false;
  }
  $('#viewFavs')?.addEventListener('click', renderFavList);
})();

/* ======= Gallery + Lightbox ======= */
(function initGallery(){
  // Esta función solo se ejecutará si estamos en la página de la galería.
  const galleryGrid = $('#galleryGrid');
  if (!galleryGrid) {
    return;
  }

  // Elementos del Lightbox (visor de imágenes)
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lbImg');
  const lightboxCaption = $('#lbCaption');
  const btnClose = $('#lbClose');
  const btnPrev = $('#lbPrev');
  const btnNext = $('#lbNext');
  let currentIndex = 0;

  // Verificar si tenemos imágenes para mostrar
  if (!GALLERY_IMAGES || GALLERY_IMAGES.length === 0) {
    $('#gallery-fallback').hidden = false;
    return;
  }

  // --- Funciones para controlar el lightbox ---
  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    updateLightboxImage();
    lightbox.showModal();
  }

  function closeLightbox() { if (lightbox) lightbox.close(); }

  function changeImage(step) {
    currentIndex = (currentIndex + step + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    if (!lightboxImg) return;
    lightboxImg.src = GALLERY_IMAGES[currentIndex].url;
    lightboxCaption.textContent = GALLERY_IMAGES[currentIndex].caption;
  }
  // Crear y mostrar las imágenes en la grilla
  GALLERY_IMAGES.forEach((imgData, index) => {
    const figure = el('figure');
    figure.style.setProperty('--delay', `${index * 50}ms`); // Para la animación escalonada

    const img = el('img', { src: imgData.url, alt: imgData.caption, loading: 'lazy' });
    const figcaption = el('figcaption', {}, imgData.caption);

    figure.append(img, figcaption);
    figure.addEventListener('click', () => openLightbox(index));
    galleryGrid.append(figure);
  });

  // Asignar eventos a los botones del lightbox
  if (lightbox) {
    // Solo añadir eventos si los elementos existen
    btnClose?.addEventListener('click', closeLightbox);
    btnPrev?.addEventListener('click', () => changeImage(-1));
    btnNext?.addEventListener('click', () => changeImage(1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.open) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') changeImage(-1);
      if (e.key === 'ArrowRight') changeImage(1);
    });
  }
})();

/* ======= Photo Mode ======= */
(function initPhotoMode(){
  $('#photoModeBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('photo-mode');
  });
})();

/* ======= Contact Form (fake submit) ======= */
(function initForm(){
  const form = $('#contactForm');
  const msg = $('#formMsg');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      msg.hidden=false; msg.textContent='Revisá los campos.'; msg.style.color='var(--danger)';
      form.reportValidity();
      return;
    }
    msg.hidden=false; msg.textContent='Enviando...'; msg.style.color='var(--muted)';

    // Simular envío
    await new Promise(r => setTimeout(r, 800));
    const data = Object.fromEntries(new FormData(form).entries());
    // Guardar local
    const arr = JSON.parse(localStorage.getItem('t_messages')||'[]');
    arr.push({ ...data, at: new Date().toISOString() });
    localStorage.setItem('t_messages', JSON.stringify(arr));

    msg.textContent = '¡Listo! Te responderemos pronto.'; msg.style.color='var(--accent-2)';
    form.reset();
  });
})();

/* ======= Command Palette (Ctrl+K) ======= */
(function initPalette(){
  const pal = $('#palette');
  if (!pal) return;

  const form = pal.querySelector('form');
  const input = $('#paletteInput');
  const results = $('#paletteResults');

  // Definir todos los destinos de navegación posibles
  const navTargets = {
    'Ir a Home': 'index.html',
    'Ver la Serie': 'series.html',
    'Explorar Galería': 'gallery.html',
    'Página de Contacto': 'contact.html',
    'Leer la Historia': 'story.html',
    'Ver Temporada 1': 'season-1.html',
    'Explorar el Mundo (Lore)': 'lore.html',
  };

  function renderResults(filter = '') {
    const normFilter = filter.trim().toLowerCase();
    const filtered = Object.entries(navTargets).filter(([name]) => name.toLowerCase().includes(normFilter));
    
    if (filtered.length === 0) {
      results.innerHTML = `<p style="color: var(--muted); padding: .6rem .8rem;">No se encontraron resultados.</p>`;
      return;
    }
    results.innerHTML = filtered.map(([name, url]) => `<a href="${url}">${name}</a>`).join('');
  }

  function open(){
    pal.showModal();
    renderResults();
    input.value = '';
    input.focus();
  }
  function close(){ pal.close(); }

  $('#openPalette')?.addEventListener('click', open);
  document.addEventListener('keydown', (e) => {
    if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
      e.preventDefault(); open();
    }
  });
  input?.addEventListener('input', () => renderResults(input.value));
  form?.addEventListener('submit', e => {
    e.preventDefault();
    results.querySelector('a')?.click();
  });
  pal.addEventListener('click', (e) => { if(e.target === pal) close(); });
  results.addEventListener('click', () => close());
})();

/* ======= Reveal on scroll ======= */
function revealOnScroll(){
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting){ en.target.classList.add('in'); obs.unobserve(en.target); }
    });
  }, { threshold: .12 });
  $$('.reveal').forEach(n => obs.observe(n));
}
// Deferir la llamada para asegurar que el DOM esté completamente listo para ser observado
setTimeout(revealOnScroll, 0);

/* ======= Splash Screen Remover ======= */
(function initSplashScreen(){
  const splash = $('#splash-screen');
  if (!splash) return;

  splash.addEventListener('animationend', () => {
    splash.remove();
  });
})();
