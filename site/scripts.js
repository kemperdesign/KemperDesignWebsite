const googleTools = [
  { name: "Anti Gravity", desc: "High-Agency Coding Intelligence and agentic workflow orchestration.", link: "https://deepmind.google/technologies/gemini/" },
  { name: "Gemini", desc: "Google's most capable multimodal AI model for text, images, and logic.", link: "https://gemini.google.com/" },
  { name: "Notebook LLM", desc: "A personalized AI research assistant that analyzes your own documents.", link: "https://notebooklm.google.com/" },
  { name: "Google AI Studio", desc: "Fastest way to build with Gemini models in a web-based prototyping environment.", link: "https://aistudio.google.com/" },
  { name: "Firebase", desc: "Complete backend-as-a-service for building and scaling web and mobile apps.", link: "https://firebase.google.com/" },
  { name: "Gemini Code Assist", desc: "Enterprise-grade AI coding companion for professional development teams.", link: "https://cloud.google.com/products/gemini/code-assist" },
  { name: "Gems", desc: "Custom AI assistants designed for specific professional roles and expertise.", link: "https://gemini.google.com/gems" },
  { name: "GenKit", desc: "The framework for building, testing, and deploying production-ready AI apps.", link: "https://github.com/firebase/genkit" },
  { name: "Genie", desc: "Generative AI research model capable of creating interactive 2D environments.", link: "https://deepmind.google/discover/blog/genie-learning-world-models-from-video/" },
  { name: "Google Labs", desc: "The home of Google's latest experimental AI features and early-access tools.", link: "https://labs.google/" },
  { name: "Google Cloud", desc: "Scalable infrastructure and data-driven AI services for modern business.", link: "https://cloud.google.com/" },
  { name: "Lyria", desc: "DeepMind's advanced model for high-fidelity AI music and audio generation.", link: "https://deepmind.google/technologies/lyria/" },
  { name: "Project Mariner", desc: "An intelligent agent designed to explore and navigate the web autonomously.", link: "https://deepmind.google/" },
  { name: "TTS", desc: "Natural-sounding Text-to-Speech voices powered by the latest AI research.", link: "https://cloud.google.com/text-to-speech" },
  { name: "Stitch", desc: "A framework for integrating AI seamlessly into complex data workflows.", link: "https://cloud.google.com/" },
  { name: "Jules", desc: "Experimental AI tool for legacy code modernization and transformation.", link: "https://cloud.google.com/" },
  { name: "Google Music AI Sandbox", desc: "Professional creative tools designed for AI music experimentation.", link: "https://www.youtube.com/creators/ai-music/" },
  { name: "Whisk", desc: "AI-powered visual search for recipes and culinery exploration.", link: "https://www.whisk.com/" }
];

// Toolkit removed - moved to resources.html
// googleTools data kept for reference if needed
function initToolkit() {
  // Toolkit widget disabled - access toolkit via resources.html instead
}

// ── Mobile Navigation ──
function openMobileNav() {
  document.getElementById('mobile-nav').classList.add('active');
  document.getElementById('offcanvas-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('offcanvas-overlay');
  if (mobileNav) mobileNav.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  initToolkit();
  initSpotlightCTA();

  // Header scroll logic
  const nav = document.querySelector('nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  initTextRotate();
});

// ── Spotlight CTA ──
function initSpotlightCTA() {
  const card = document.getElementById('spotlightCard');
  const glow = document.getElementById('spotlightGlow');
  if (!card || !glow) return;

  function updateGlow(x, y) {
    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(134,188,37,0.10), transparent 50%)`;
  }

  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    updateGlow(e.clientX - rect.left, e.clientY - rect.top);
  });

  card.addEventListener('mouseleave', function() {
    glow.style.background = 'none';
  });

  card.addEventListener('touchmove', function(e) {
    if (e.touches.length > 0) {
      const rect = card.getBoundingClientRect();
      updateGlow(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  }, { passive: true });

  card.addEventListener('touchend', function() {
    glow.style.background = 'none';
  });
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
      span.textContent = ch === ' ' ? '\u00A0' : ch;
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
        const delay = (total - 1 - i) * STAGGER; // staggerFrom "last"
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

