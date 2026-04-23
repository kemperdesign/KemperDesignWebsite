// Basic interactions
document.addEventListener('DOMContentLoaded', () => {
    // Reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply init styles and observer to items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Simple logo scroller logic to duplicate content for seamless effect
const scroller = document.querySelector('.logo-scroller-inner');
if (scroller) {
    const content = scroller.innerHTML;
    scroller.innerHTML = content + content;
}

// ── Text Rotate Banner ──
function initTextRotate() {
  const track = document.getElementById('textRotateTrack');
  if (!track) return;

  const texts = [
    'Automations',
    'Consulting',
    'Integrations',
    'Enablement',
    'Education',
    'Implementations',
    'Designed for YOU!',
  ];

  const INTERVAL = 2000;
  const STAGGER  = 0.025;
  const IN_DUR   = 0.45;
  const OUT_DUR  = 0.35;
  const SPRING   = 'cubic-bezier(0.34,1.56,0.64,1)';

  let current  = 0;
  let animating = false;

  function segmentText(text) {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
      return Array.from(seg.segment(text), s => s.segment);
    }
    return Array.from(text);
  }

  function renderChars(text, visible) {
    track.innerHTML = '';
    const chars = segmentText(text);
    chars.forEach(ch => {
      const span = document.createElement('span');
      span.className = 'tr-char';
      span.textContent = ch === ' ' ? ' ' : ch;
      span.style.transform = visible ? 'translateY(0)' : 'translateY(110%)';
      span.style.opacity   = visible ? '1' : '0';
      span.style.display   = 'inline-block';
      track.appendChild(span);
    });
    return Array.from(track.querySelectorAll('.tr-char'));
  }

  function animateIn(chars) {
    return new Promise(resolve => {
      const total = chars.length;
      let done = 0;
      chars.forEach((span, i) => {
        const delay = (total - 1 - i) * STAGGER;
        span.style.transition = `transform ${IN_DUR}s ${SPRING} ${delay}s, opacity ${IN_DUR * 0.6}s ease ${delay}s`;
        requestAnimationFrame(() => {
          span.style.transform = 'translateY(0)';
          span.style.opacity   = '1';
        });
        setTimeout(() => { if (++done === total) resolve(); }, (delay + IN_DUR) * 1000);
      });
    });
  }

  function animateOut(chars) {
    return new Promise(resolve => {
      const total = chars.length;
      let done = 0;
      chars.forEach((span, i) => {
        const delay = (total - 1 - i) * STAGGER;
        span.style.transition = `transform ${OUT_DUR}s ease-in ${delay}s, opacity ${OUT_DUR}s ease-in ${delay}s`;
        requestAnimationFrame(() => {
          span.style.transform = 'translateY(-120%)';
          span.style.opacity   = '0';
        });
        setTimeout(() => { if (++done === total) resolve(); }, (delay + OUT_DUR) * 1000);
      });
    });
  }

  async function rotate() {
    if (animating) return;
    animating = true;
    const currentChars = Array.from(track.querySelectorAll('.tr-char'));
    await animateOut(currentChars);
    current = (current + 1) % texts.length;
    const nextChars = renderChars(texts[current], false);
    await animateIn(nextChars);
    animating = false;
  }

  renderChars(texts[current], true);
  setInterval(rotate, INTERVAL);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initTextRotate();
});

// Spotlight glow effect for service cards
document.addEventListener('pointermove', (e) => {
  const x = e.clientX.toFixed(2);
  const y = e.clientY.toFixed(2);
  const xp = (e.clientX / window.innerWidth).toFixed(2);
  const yp = (e.clientY / window.innerHeight).toFixed(2);

  document.querySelectorAll('.service-card, .seo-service-item').forEach(card => {
    card.style.setProperty('--x', x);
    card.style.setProperty('--y', y);
    card.style.setProperty('--xp', xp);
    card.style.setProperty('--yp', yp);
  });
});

// Animated Feature Carousel
(function() {
  const STEPS = [
    {
      name: "Step 1", title: "AI-Powered Workflows",
      desc: "We map your processes and build automated workflows that tie your tools together, saving teams an average of 15 hours a week.",
      images: [
        { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", preset: "slideLeft", css: "width:52%;left:0;top:10%" },
        { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", preset: "slideRight", css: "width:60%;left:38%;top:35%", delay: 100 }
      ]
    },
    {
      name: "Step 2", title: "Measurable Results",
      desc: "Track performance and ROI in real time. Our analytics integrations give you clear visibility into exactly what's working.",
      images: [
        { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80", preset: "scale", css: "width:52%;left:5%;top:15%" },
        { src: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?w=600&q=80", preset: "scale", css: "width:42%;left:52%;top:40%", delay: 100 }
      ]
    },
    {
      name: "Step 3", title: "Seamless Integration",
      desc: "Works with the tools you already use — QuickBooks, HubSpot, Calendly, Google Workspace, Shopify, and hundreds more.",
      images: [
        { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80", preset: "scale", css: "width:90%;left:5%;top:15%" }
      ]
    },
    {
      name: "Step 4", title: "Expert Support",
      desc: "White-glove service from strategy through delivery. Every project includes documentation and a 30-day support window.",
      images: [
        { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", preset: "scale", css: "width:90%;left:5%;top:15%" }
      ]
    }
  ];

  let current = 0;
  let timer = null;
  const INTERVAL = 5000;

  function init() {
    renderNav();
    renderStep(0, false);
    startTimer();
  }

  function renderNav() {
    const ol = document.getElementById('fc-steps');
    if (!ol) return;
    ol.innerHTML = STEPS.map((s, i) => `
      <li>
        <button class="fc-step-btn${i === 0 ? ' active' : ''}" data-index="${i}" type="button" aria-label="${s.name}">
          <span class="fc-step-num">${i + 1}</span>
          <span class="fc-step-name-label">${s.name}</span>
        </button>
      </li>`).join('');
    ol.querySelectorAll('.fc-step-btn').forEach(btn => {
      btn.addEventListener('click', () => { goTo(parseInt(btn.dataset.index)); });
    });
  }

  function goTo(index) {
    if (index === current) return;
    clearTimeout(timer);
    const textCol = document.querySelector('.fc-text-col');
    textCol && textCol.classList.add('fc-out');
    clearImages();
    setTimeout(() => {
      current = index;
      renderStep(current, true);
      startTimer();
    }, 300);
  }

  function renderStep(index, animate) {
    const step = STEPS[index];
    const label = document.getElementById('fc-step-label');
    const title = document.getElementById('fc-title');
    const desc  = document.getElementById('fc-desc');
    if (label) label.textContent = step.name;
    if (title) title.textContent = step.title;
    if (desc)  desc.textContent  = step.desc;
    const textCol = document.querySelector('.fc-text-col');
    if (textCol) {
      textCol.classList.remove('fc-out');
    }
    updateNav(index);
    renderImages(step.images);
  }

  function renderImages(images) {
    const area = document.getElementById('fc-image-area');
    if (!area) return;
    area.innerHTML = '';
    images.forEach((img, i) => {
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = 'Feature screenshot';
      el.className = 'fc-img ' + (img.preset === 'slideLeft' ? 'fc-slide-left' : img.preset === 'slideRight' ? 'fc-slide-right' : 'fc-scale');
      el.setAttribute('style', img.css);
      area.appendChild(el);
      setTimeout(() => el.classList.add('fc-visible'), img.delay || 50);
    });
  }

  function clearImages() {
    document.querySelectorAll('.fc-img').forEach(img => img.classList.remove('fc-visible'));
  }

  function updateNav(index) {
    document.querySelectorAll('.fc-step-btn').forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
      btn.classList.toggle('completed', i < index);
    });
  }

  function startTimer() {
    timer = setTimeout(() => { goTo((current + 1) % STEPS.length); }, INTERVAL);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('feature-carousel')) init();
  });
})();
