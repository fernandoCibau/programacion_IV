
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
function showToast(message, type = 'info', duration = 3000) {
  const container = $('#toast-container');
  if (!container) return;

  const toast = el('div', { class: `toast ${type}` }, message);
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, duration);
}

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
  const episodesGrid = $('#episodesGrid');
  const favSelect = $('#favEpisodeSelect');

  // Mover la declaración aquí para evitar ReferenceError
  const seasonFilter = $('#seasonFilter');

  if(!seasonList && !episodesGrid) return;

  // Rellenar filtro de temporada (si existe)
  if (seasonFilter) {
    const allOption = el('option', {value:''}, 'Todas');
    seasonFilter.append(allOption);
    SERIES.seasons.forEach(s => seasonFilter.append(el('option', {value:String(s.number)}, `Temporada ${s.number} (${s.year})`)));
  }

  // Episodes grid (quick view)
  function renderGrid(seasonNumber){
    episodesGrid.innerHTML = '';
    const seasonsToRender = seasonNumber ? SERIES.seasons.filter(s => String(s.number) === seasonNumber) : SERIES.seasons;
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
  // Si existe la grilla de episodios, la renderizamos.
  if (episodesGrid) {
    renderGrid(); // Renderizar todos por defecto
  }

  // Rellenar el selector de episodios favoritos en la página de contacto
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
  const epSearch = $('#epSearch');

  epSearch?.addEventListener('input', e => filterEpisodes(e.target.value));
  // Ahora el filtro de temporada también afecta a la grilla de episodios
  seasonFilter?.addEventListener('change', e => renderGrid(e.target.value));

  function filterEpisodes(q=''){
    const norm = q.trim().toLowerCase();
    $$('.episodes-grid .card').forEach(card => {
      const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      card.style.display = !norm || title.includes(norm) ? 'block' : 'none';
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
    box.innerHTML = '';

    if(!favs.length){ box.hidden = true; return; }
    favs.forEach(f => box.append(el('div', {}, `T${f.s}E${f.n} — ${f.title}`)));
    box.hidden = false;
  }
  renderFavList(); // Cargar al inicio en la página de series
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
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if(!form.checkValidity()){
      showToast('Por favor, revisa los campos marcados.', 'error');
      form.reportValidity();
      return;
    }
    showToast('Enviando mensaje...', 'info');

    // Simular envío
    await new Promise(r => setTimeout(r, 800));
    const data = Object.fromEntries(new FormData(form).entries());
    const arr = JSON.parse(localStorage.getItem('t_messages')||'[]');
    arr.push({ ...data, at: new Date().toISOString() });
    localStorage.setItem('t_messages', JSON.stringify(arr));

    showToast('¡Listo! Te responderemos pronto.', 'success');
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
    'Explorar el Mundo': 'mundo.html',
    'Contacto': 'contact.html',
    'Activar/Desactivar Tema': () => $('#themeToggle')?.click(),
  };

  function renderResults(filter = '') {
    const normFilter = filter.trim().toLowerCase();
    const filtered = Object.entries(navTargets).filter(([name]) => name.toLowerCase().includes(normFilter));
    
    if (filtered.length === 0) {
      results.innerHTML = `<p style="color: var(--muted); padding: .6rem .8rem;">No se encontraron resultados.</p>`;
      return;
    }
    results.innerHTML = ''; // Limpiar resultados
    filtered.forEach(([name, action]) => {
      const isFunc = typeof action === 'function';
      const item = el('a', { href: isFunc ? '#' : action }, name);
      if (isFunc) item.addEventListener('click', (e) => { e.preventDefault(); action(); close(); });
      results.appendChild(item);
    });
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

/* ======= Ambient Audio Player ======= */
(function initAudioPlayer() {
  const audio = $('#ambientAudio');
  const playBtn = $('#ambientPlayBtn');
  if (!audio || !playBtn) return;

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.classList.replace('icon-play', 'icon-pause');
      playBtn.ariaLabel = "Pausar música de ambiente";
    } else {
      audio.pause();
      playBtn.classList.replace('icon-pause', 'icon-play');
      playBtn.ariaLabel = "Reproducir música de ambiente";
    }
  });
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

/* ======= Floating Actions ======= */
(function initFloatingActions() {
  const likeBtn = $('#likeBtn');
  const likeCountSpan = $('#likeCount');
  const dislikeBtn = $('#dislikeBtn');
  const chatBtn = $('#chatBtn');
  const shareBtn = $('#shareBtn');
  const miniChat = $('#miniChat');

  if (!likeBtn) return; // Si no existe la barra, no hacer nada

  const LIKE_KEY = 't_likes';
  const LIKED_KEY = 't_liked_this_session';

  // --- Likes ---
  function getLikes() {
    return parseInt(localStorage.getItem(LIKE_KEY) || '42', 10);
  }

  function updateLikeDisplay() {
    const count = getLikes();
    likeCountSpan.textContent = count;
    if (sessionStorage.getItem(LIKED_KEY)) {
      likeBtn.classList.add('liked');
      likeBtn.title = "Ya te gusta esta página";
    }
  }

  likeBtn.addEventListener('click', () => {
    if (sessionStorage.getItem(LIKED_KEY)) {
      showToast('Ya te gusta esta página.', 'info');
      return; // Solo un like por sesión
    }

    // Crear y animar el corazón
    const heart = el('span', { class: 'like-effect' }, '❤️');
    likeBtn.appendChild(heart);
    heart.addEventListener('animationend', () => {
      heart.remove();
    });

    let currentLikes = getLikes();
    currentLikes++;
    localStorage.setItem(LIKE_KEY, currentLikes);
    sessionStorage.setItem(LIKED_KEY, 'true');
    updateLikeDisplay();
  });

  // --- Dislike ---
  dislikeBtn.addEventListener('click', () => {
    const iconSvgPath = "M256 32c-4.3 0-8.6.3-12.8.9C138.7 40.7 48.9 130.5 40 235.2c-.3 4.2-.5 8.5-.5 12.8c0 4.3.2 8.6.5 12.8c8.9 104.7 98.7 194.5 203.2 202.3c4.2.3 8.5.5 12.8.5s8.6-.2 12.8-.5c104.5-7.8 194.3-97.6 203.2-202.3c.3-4.2.5-8.5.5-12.8s-.2-8.6-.5-12.8C463.1 130.5 373.3 40.7 268.8 32.9c-4.2-.6-8.5-.9-12.8-.9zm-12.8 48.5c100.4 7.5 178.2 85.3 185.7 185.7c.2 4.2.4 8.5.4 12.8s-.1 8.6-.4 12.8c-7.5 100.4-85.3 178.2-185.7 185.7c-4.2.2-8.5.4-12.8.4s-8.6-.1-12.8-.4C116.8 470.7 39 392.9 31.5 292.5c-.2-4.2-.4-8.5-.4-12.8s.1-8.6.4-12.8c7.5-100.4 85.3-178.2 185.7-185.7c4.2-.2 8.5-.4 12.8-.4s8.6.1 12.8.4zM256 96c-88.4 0-160 71.6-160 160s71.6 160 160 160s160-71.6 160-160s-71.6-160-160-160z";
    const iconSvg = el('svg', { class: 'dislike-modal-icon', viewBox: '0 0 512 512' });
    iconSvg.innerHTML = `<path fill="currentColor" d="${iconSvgPath}"/>`;

    const closeBtn = el('button', { class: 'btn btn-close' }, 'Entendido');
    const modal = el('dialog', { class: 'dislike-modal' },
      iconSvg,
      el('h3', {}, '¡No seas forro!'),
      el('p', {}, 'Apreciamos tu honestidad, pero este sitio fue hecho con mucho cariño. ¡Intenta ser más constructivo!'),
      closeBtn
    );

    function closeModal() {
      modal.close();
    }

    closeBtn.addEventListener('click', closeModal);
    // El evento 'close' se dispara tanto al hacer clic en el botón como al presionar ESC.
    modal.addEventListener('close', () => modal.remove());

    document.body.appendChild(modal);
    modal.showModal();
  });

  // --- Chat ---
  chatBtn.addEventListener('click', () => {
    miniChat.classList.toggle('open');
    miniChat.hidden = !miniChat.classList.contains('open');
  });

  // --- Share ---
  shareBtn.addEventListener('click', () => {
    showToast('¡Gracias por querer compartir! Próximamente habilitaremos esta función.', 'info');
  });

  // Init
  updateLikeDisplay();
})();

/* ======= Spore Animation ======= */
(function initSporeAnimation() {
  const container = $('#spore-container');
  if (!container) return;

  const SPORE_COUNT = 50; // Cantidad de esporas en pantalla

  function createSpore() {
    const spore = el('div', { class: 'spore' });    
    const pageHeight = document.documentElement.scrollHeight;

    const size = Math.random() * 4 + 2; // Tamaño entre 2px y 6px
    const initialX = Math.random() * 100; // Posición horizontal inicial
    const initialY = Math.random() * pageHeight; // Posición vertical inicial a lo largo de la página
    const duration = Math.random() * 10 + 8; // Duración entre 8s y 18s
    const opacity = Math.random() * 0.4 + 0.3; // Opacidad entre 0.3 y 0.7

    spore.style.width = `${size}px`;
    spore.style.height = `${size}px`;
    spore.style.left = `${initialX}vw`;
    spore.style.top = `${initialY}px`;
    spore.style.animationDuration = `${duration}s`;
    spore.style.opacity = opacity;

    container.appendChild(spore);
    // Eliminar la espora cuando la animación termina para crear una nueva
    spore.addEventListener('animationend', () => {
      spore.remove();
      createSpore(); // Vuelve a crear una espora para un efecto infinito
    });
  }

  // Crear el lote inicial de esporas
  for (let i = 0; i < SPORE_COUNT; i++) {
    createSpore();
  }
})();
