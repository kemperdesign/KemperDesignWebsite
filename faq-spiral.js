// FAQ with Spiral Animation - Vanilla JavaScript Version
// No dependencies required - pure JS + SVG

class FAQSpiral {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.spiralRef = null;
    this.panelOpen = false;
    this.query = "";

    // Spiral configuration
    this.cfg = {
      points: 700,
      dotRadius: 1.8,
      duration: 3.0,
      color: "#ffffff",
      gradient: "none", // none, rainbow, sunset, ocean, fire, neon, pastel, grayscale
      pulseEffect: true,
      opacityMin: 0.25,
      opacityMax: 0.9,
      sizeMin: 0.5,
      sizeMax: 1.4,
      background: "#000000",
    };

    // Gradient presets
    this.gradients = {
      none: [],
      rainbow: ["#ff0000", "#ff9900", "#ffff00", "#00ff00", "#0099ff", "#6633ff"],
      sunset: ["#ff0000", "#ff9900", "#ffcc00"],
      ocean: ["#0066ff", "#00ccff", "#00ffcc"],
      fire: ["#ff0000", "#ff6600", "#ffcc00"],
      neon: ["#ff00ff", "#00ffff", "#ffff00"],
      pastel: ["#ffcccc", "#ccffcc", "#ccccff"],
      grayscale: ["#ffffff", "#999999", "#333333"],
    };

    // FAQ content
    this.faqs = [
      {
        q: "What does Kemper Design Services do?",
        a: "We design and build digital products end‑to‑end: AI automation, custom applications, websites, graphic design, training, video editing, 3D printing, music production, notary services, and format conversions.",
      },
      {
        q: "How does an engagement with Kemper Design Services start?",
        a: "Every project starts with a free 30-minute discovery call. We ask about your business, your workflows, and what's eating the most time. From there we produce a written scope with a fixed price and timeline. No surprises, no scope creep — you approve the cost before any work begins.",
      },
      {
        q: "How long does a typical AI automation project take?",
        a: "An AI automation workflow takes 3–5 weeks from signed scope to delivery. A custom website is 2–3 weeks. A full custom application is 6–10 weeks. Format conversions and graphic design projects can often turn around in 48–72 hours.",
      },
      {
        q: "Do I need to be technical to work with you?",
        a: "Not at all. We explain everything in plain language and don't assume any technical background. Our goal is that you finish every engagement understanding exactly what was built and how to use it. We also provide documentation and a handoff walkthrough with every delivery.",
      },
      {
        q: "How is pricing structured for AI services?",
        a: "Fixed price per project, agreed before any work begins. You will never receive an invoice larger than what you signed off on. Custom websites start at $999. Custom training apps deliver consistent onboarding for under $500 per head. AI automations are scoped to your specific needs — book a free call for an accurate quote.",
      },
      {
        q: "Is my business data secure?",
        a: "Yes. We never store, share, or train on your business data. Every system we build is configured so your data stays on your infrastructure or in accounts you own and control.",
      },
      {
        q: "Who owns the code and designs after the project?",
        a: "You do. Upon final payment, full ownership of the code, designs, and assets transfers to you. We don't retain licensing rights or lock you into proprietary systems.",
      },
      {
        q: "Can I come back for a second project?",
        a: "90% of our clients do. Return clients skip the full discovery process and get priority scheduling.",
      },
    ];

    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.generateSpiral();
    this.setupKeyboardShortcuts();
  }

  render() {
    const html = `
      <div class="faq-spiral-container" style="background-color: ${this.cfg.background}; color: white;">
        <!-- Background Spiral -->
        <div class="faq-spiral-bg">
          <div id="spiral-canvas" class="faq-spiral-canvas"></div>
        </div>

        <!-- Main Content -->
        <div class="faq-spiral-content">
          <!-- Header -->
          <header class="faq-header">
            <div>
              <h2 class="faq-title">Frequently Asked Questions</h2>
              <p class="faq-subtitle">Everything you need to know about working with us.</p>
            </div>
            <div class="faq-search-wrapper">
              <input
                type="text"
                id="faq-search"
                class="faq-search"
                placeholder="Search questions…"
              />
            </div>
          </header>

          <!-- FAQ Items -->
          <section class="faq-section">
            <div class="faq-grid" id="faq-items">
              <!-- Items will be inserted here -->
            </div>
          </section>


        </div>

        <!-- Control Panel (Optional) -->
        <aside id="faq-panel" class="faq-control-panel" style="display: none;">
          <h3 class="faq-panel-title">Spiral Controls</h3>
          <div class="faq-panel-content">
            <div class="faq-control-group">
              <label>Points: <span id="points-value">${this.cfg.points}</span></label>
              <input type="range" id="points-slider" min="100" max="2000" step="50" value="${this.cfg.points}" />
            </div>
            <div class="faq-control-group">
              <label>Dot Radius: <span id="dotRadius-value">${this.cfg.dotRadius.toFixed(2)}</span></label>
              <input type="range" id="dotRadius-slider" min="0.5" max="5" step="0.1" value="${this.cfg.dotRadius}" />
            </div>
            <div class="faq-control-group">
              <label>Duration: <span id="duration-value">${this.cfg.duration.toFixed(2)}</span>s</label>
              <input type="range" id="duration-slider" min="1" max="10" step="0.1" value="${this.cfg.duration}" />
            </div>
            <div class="faq-control-group">
              <label>
                <input type="checkbox" id="pulseEffect-toggle" ${this.cfg.pulseEffect ? 'checked' : ''} />
                Pulse Effect
              </label>
            </div>
            <div class="faq-control-group">
              <label>Gradient:</label>
              <select id="gradient-select">
                <option value="none">None</option>
                <option value="rainbow">Rainbow</option>
                <option value="sunset">Sunset</option>
                <option value="ocean">Ocean</option>
                <option value="fire">Fire</option>
                <option value="neon">Neon</option>
                <option value="pastel">Pastel</option>
                <option value="grayscale">Grayscale</option>
              </select>
            </div>
            <div class="faq-control-buttons">
              <button id="randomize-btn" class="faq-btn-secondary">Randomize (R)</button>
              <button id="close-panel-btn" class="faq-btn-secondary">Close (H)</button>
            </div>
          </div>
        </aside>
      </div>
    `;

    this.container.innerHTML = html;
    this.spiralRef = document.getElementById('spiral-canvas');
    this.renderFAQItems();
  }

  renderFAQItems() {
    const itemsContainer = document.getElementById('faq-items');
    const filtered = this.query
      ? this.faqs.filter(({ q, a }) => (q + a).toLowerCase().includes(this.query.toLowerCase()))
      : this.faqs;

    itemsContainer.innerHTML = filtered.map((item, index) => `
      <div class="faq-item" data-index="${index}">
        <button class="faq-item-header" aria-expanded="false">
          <div class="faq-item-left">
            <span class="faq-item-number">${String(index + 1).padStart(2, '0')}</span>
            <h3 class="faq-item-question">${item.q}</h3>
          </div>
          <span class="faq-item-toggle">+</span>
        </button>
        <div class="faq-item-answer" style="display: none;">
          <p>${item.a}</p>
        </div>
      </div>
    `).join('');

    // Attach click handlers
    document.querySelectorAll('.faq-item-header').forEach((button) => {
      button.addEventListener('click', (e) => this.toggleFAQItem(e));
    });
  }

  toggleFAQItem(event) {
    const button = event.currentTarget;
    const item = button.closest('.faq-item');
    const answer = item.querySelector('.faq-item-answer');
    const toggle = button.querySelector('.faq-item-toggle');
    const isOpen = answer.style.display !== 'none';

    if (isOpen) {
      answer.style.display = 'none';
      toggle.textContent = '+';
      button.setAttribute('aria-expanded', 'false');
    } else {
      answer.style.display = 'block';
      toggle.textContent = '–';
      button.setAttribute('aria-expanded', 'true');
    }
  }

  generateSpiral() {
    if (!this.spiralRef) return;

    const SIZE = 560;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const N = this.cfg.points;
    const DOT = this.cfg.dotRadius;
    const CENTER = SIZE / 2;
    const PADDING = 4;
    const MAX_R = CENTER - PADDING - DOT;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", String(SIZE));
    svg.setAttribute("height", String(SIZE));
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    // Add gradient if needed
    if (this.cfg.gradient !== "none") {
      const defs = document.createElementNS(svgNS, "defs");
      const g = document.createElementNS(svgNS, "linearGradient");
      g.setAttribute("id", "spiralGradient");
      g.setAttribute("gradientUnits", "userSpaceOnUse");
      g.setAttribute("x1", "0%");
      g.setAttribute("y1", "0%");
      g.setAttribute("x2", "100%");
      g.setAttribute("y2", "100%");

      const colors = this.gradients[this.cfg.gradient];
      colors.forEach((color, idx, arr) => {
        const stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", `${(idx * 100) / (arr.length - 1)}%`);
        stop.setAttribute("stop-color", color);
        g.appendChild(stop);
      });
      defs.appendChild(g);
      svg.appendChild(defs);
    }

    // Generate spiral points
    for (let i = 0; i < N; i++) {
      const idx = i + 0.5;
      const frac = idx / N;
      const r = Math.sqrt(frac) * MAX_R;
      const theta = idx * GOLDEN_ANGLE;
      const x = CENTER + r * Math.cos(theta);
      const y = CENTER + r * Math.sin(theta);

      const c = document.createElementNS(svgNS, "circle");
      c.setAttribute("cx", x.toFixed(3));
      c.setAttribute("cy", y.toFixed(3));
      c.setAttribute("r", String(DOT));
      c.setAttribute("fill", this.cfg.gradient === "none" ? this.cfg.color : "url(#spiralGradient)");
      c.setAttribute("opacity", "0.6");

      if (this.cfg.pulseEffect) {
        const animR = document.createElementNS(svgNS, "animate");
        animR.setAttribute("attributeName", "r");
        animR.setAttribute("values", `${DOT * this.cfg.sizeMin};${DOT * this.cfg.sizeMax};${DOT * this.cfg.sizeMin}`);
        animR.setAttribute("dur", `${this.cfg.duration}s`);
        animR.setAttribute("begin", `${(frac * this.cfg.duration).toFixed(3)}s`);
        animR.setAttribute("repeatCount", "indefinite");
        animR.setAttribute("calcMode", "spline");
        animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animR);

        const animO = document.createElementNS(svgNS, "animate");
        animO.setAttribute("attributeName", "opacity");
        animO.setAttribute("values", `${this.cfg.opacityMin};${this.cfg.opacityMax};${this.cfg.opacityMin}`);
        animO.setAttribute("dur", `${this.cfg.duration}s`);
        animO.setAttribute("begin", `${(frac * this.cfg.duration).toFixed(3)}s`);
        animO.setAttribute("repeatCount", "indefinite");
        animO.setAttribute("calcMode", "spline");
        animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1");
        c.appendChild(animO);
      }

      svg.appendChild(c);
    }

    this.spiralRef.innerHTML = "";
    this.spiralRef.appendChild(svg);
  }

  attachEventListeners() {
    // Search
    const searchInput = document.getElementById('faq-search');
    searchInput.addEventListener('input', (e) => {
      this.query = e.target.value;
      this.renderFAQItems();
    });

    // Control panel sliders
    ['points', 'dotRadius', 'duration'].forEach((key) => {
      const slider = document.getElementById(`${key}-slider`);
      const valueDisplay = document.getElementById(`${key}-value`);
      if (slider) {
        slider.addEventListener('input', (e) => {
          this.cfg[key] = key === 'points' ? parseInt(e.target.value) : parseFloat(e.target.value);
          if (valueDisplay) {
            valueDisplay.textContent = key === 'points'
              ? this.cfg[key]
              : this.cfg[key].toFixed(2);
          }
          this.generateSpiral();
        });
      }
    });

    // Pulse effect toggle
    const pulseToggle = document.getElementById('pulseEffect-toggle');
    if (pulseToggle) {
      pulseToggle.addEventListener('change', (e) => {
        this.cfg.pulseEffect = e.target.checked;
        this.generateSpiral();
      });
    }

    // Gradient select
    const gradientSelect = document.getElementById('gradient-select');
    if (gradientSelect) {
      gradientSelect.addEventListener('change', (e) => {
        this.cfg.gradient = e.target.value;
        this.generateSpiral();
      });
    }

    // Buttons
    const randomizeBtn = document.getElementById('randomize-btn');
    const closePanelBtn = document.getElementById('close-panel-btn');
    if (randomizeBtn) randomizeBtn.addEventListener('click', () => this.randomize());
    if (closePanelBtn) closePanelBtn.addEventListener('click', () => this.togglePanel());
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (key === 'h') this.togglePanel();
      if (key === 'r') this.randomize();
    });
  }

  togglePanel() {
    this.panelOpen = !this.panelOpen;
    const panel = document.getElementById('faq-panel');
    if (panel) {
      panel.style.display = this.panelOpen ? 'block' : 'none';
    }
  }

  randomize() {
    const rand = (min, max) => Math.random() * (max - min) + min;
    const lightColors = ["#ffffff"];
    const darkColors = ["#222222", "#111111"];
    const useLightBg = Math.random() > 0.5;

    this.cfg = {
      points: Math.floor(rand(300, 1600)),
      dotRadius: rand(0.8, 3.2),
      duration: rand(1.2, 7.5),
      pulseEffect: Math.random() > 0.35,
      opacityMin: rand(0.1, 0.4),
      opacityMax: rand(0.6, 1.0),
      sizeMin: rand(0.4, 0.9),
      sizeMax: rand(1.2, 2.2),
      background: useLightBg ? "#f5f5f5" : "#000000",
      color: useLightBg
        ? darkColors[Math.floor(Math.random() * darkColors.length)]
        : lightColors[Math.floor(Math.random() * lightColors.length)],
      gradient: Math.random() > 0.6
        ? ["rainbow", "ocean", "grayscale", "neon"][Math.floor(Math.random() * 4)]
        : "none",
    };

    this.container.style.backgroundColor = this.cfg.background;
    this.generateSpiral();
    this.updateControlPanel();
  }

  updateControlPanel() {
    const updates = {
      'points-slider': this.cfg.points,
      'points-value': this.cfg.points,
      'dotRadius-slider': this.cfg.dotRadius,
      'dotRadius-value': this.cfg.dotRadius.toFixed(2),
      'duration-slider': this.cfg.duration,
      'duration-value': this.cfg.duration.toFixed(2),
      'pulseEffect-toggle': this.cfg.pulseEffect,
      'gradient-select': this.cfg.gradient,
    };

    Object.entries(updates).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) {
        if (el.type === 'checkbox') {
          el.checked = value;
        } else if (el.textContent !== undefined) {
          el.textContent = value;
        } else {
          el.value = value;
        }
      }
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('faq-spiral-container');
  if (container) {
    new FAQSpiral('faq-spiral-container');
  }
});
