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
