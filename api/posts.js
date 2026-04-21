const jwt = require('jsonwebtoken');
const { Octokit } = require('@octokit/rest');

function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.slice(7);
  try {
    const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
}

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function generatePostHTML(post) {
  const nav = `        <li class="nav-item nav-item--mega">
          <a href="services.html">Services</a>
          <div class="nav-megamenu">
            <div class="mega-col">
              <span class="mega-heading">AI & Automation</span>
              <a href="service-automation.html">AI Workflow Integration</a>
              <a href="service-chatbot.html">AI Chatbots & Assistants</a>
              <a href="service-custom-ai.html">Custom Internal AI Tools</a>
              <a href="service-integrations.html">System Integrations</a>
              <a href="service-automation.html">Local AI Deployment</a>
              <a href="service-automation.html">Document Processing</a>
            </div>
            <div class="mega-col">
              <span class="mega-heading">Design & Development</span>
              <a href="service-websites.html">Custom Websites</a>
              <a href="service-apps.html">Custom Applications</a>
              <a href="service-design.html">Graphic Design</a>
              <a href="service-design.html">Brand Identity</a>
              <a href="service-apps.html">UI/UX Design</a>
              <a href="service-apps.html">Frontend Development</a>
            </div>
            <div class="mega-col">
              <span class="mega-heading">Operations & Training</span>
              <a href="service-scheduling.html">AI Auto-Scheduler</a>
              <a href="service-training.html">Instructional Design</a>
              <a href="service-training.html">AI Training & Education</a>
              <a href="service-training.html">Employee Onboarding</a>
              <a href="service-training.html">Custom Training Apps</a>
              <a href="service-automation.html">Process Optimization</a>
            </div>
            <div class="mega-col">
              <span class="mega-heading">IT & Security</span>
              <a href="service-integrations.html">Cybersecurity Solutions</a>
              <a href="service-integrations.html">IT Infrastructure</a>
              <a href="service-integrations.html">Data Protection</a>
              <a href="service-integrations.html">System Integration</a>
              <a href="service-integrations.html">Cloud Solutions</a>
              <a href="service-integrations.html">Network Management</a>
            </div>
            <div class="mega-col">
              <span class="mega-heading">Creative & Specialty</span>
              <a href="service-video.html">Video Editing</a>
              <a href="service-music.html">Custom Music Production</a>
              <a href="service-3dprinting.html">3D Printing</a>
              <a href="service-notary.html">Digital Notary</a>
              <a href="service-conversions.html">Data/Format Conversion</a>
              <a href="service-training.html">Content Creation</a>
            </div>
          </div>
        </li>`;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${post.title} — Kemper Design Services</title>
  <link rel="stylesheet" href="../styles.css">
  <style>html { background: #010F34; }</style>
</head>
<body>

  <!-- Offcanvas overlay -->
  <div class="offcanvas-overlay" id="offcanvas-overlay" onclick="closeMobileNav()"></div>

  <!-- Mobile Nav -->
  <div class="mobile-nav" id="mobile-nav">
    <button class="mobile-close" onclick="closeMobileNav()" aria-label="Close menu">✕</button>
    <ul style="display:flex;flex-direction:column;gap:4px;margin-top:20px;">
      <li><a href="../index.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Home</a></li>
      <li><a href="../about.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">About</a></li>
      <li><a href="../services.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Services</a></li>
      <li><a href="../products.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Products</a></li>
      <li><a href="../consulting.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Consulting</a></li>
      <li><a href="../faq.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">FAQ</a></li>
      <li><a href="../blog.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Blog</a></li>
      <li><a href="../contact.html" style="display:block;padding:10px 0;font-family:var(--heading-font);font-weight:500;color:var(--heading-color);">Contact</a></li>
    </ul>
    <a href="../discovery.html" class="btn btn-primary" style="margin-top:24px;width:100%;justify-content:center;">Get a Quote →</a>
  </div>

  <!-- ── Navigation ── -->
  <nav>
    <div class="nav-inner">
      <a href="../index.html" class="logo">
        <span style="font-family: var(--heading-font); font-weight: 700; color: white; font-size: 16px; letter-spacing: -0.5px;">Kemper Design Services</span>
      </a>

      <ul class="nav-links">
        <li class="nav-item"><a href="../index.html">Home</a></li>
        <li class="nav-item"><a href="../about.html">About</a></li>

        ${nav}

        <li class="nav-item"><a href="../products.html">Products</a></li>
        <li class="nav-item"><a href="../consulting.html">Consulting</a></li>
        <li class="nav-item"><a href="../faq.html">FAQ</a></li>
        <li class="nav-item"><a href="../blog.html">Blog</a></li>
        <li class="nav-item"><a href="../contact.html">Contact</a></li>
      </ul>
      <div class="nav-cta-wrapper">
        <button class="nav-search-btn" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </button>
        <a href="../discovery.html" class="btn btn-primary nav-cta">Get a Quote <span class="btn-arrow">→</span></a>
        <button class="hamburger" id="hamburger" aria-label="Open menu" onclick="openMobileNav()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- ── Blog Post ── -->
  <section class="page-hero" style="padding: 80px 30px 60px;">
    <div class="container" style="max-width: 900px;">
      <div class="page-hero-content">
        <span class="eyebrow" style="color:rgba(255,255,255,.55);">${post.category}</span>
        <h1 class="h1" style="margin-bottom: 16px;">${post.title}</h1>
        <p style="color: rgba(255,255,255,.7); font-size: 16px; margin-bottom: 32px;">${formattedDate}</p>
        ${post.image ? `<img src="${post.image}" alt="${post.title}" style="width: 100%; max-width: 900px; border-radius: 12px; margin-bottom: 32px;">` : ''}
      </div>
    </div>
  </section>

  <!-- ── Article Content ── -->
  <section class="section" style="padding: 60px 30px;">
    <div class="container" style="max-width: 900px;">
      <div style="background: white; padding: 40px; border-radius: 12px; line-height: 1.8; color: #333;">
        ${post.content}
      </div>
    </div>
  </section>

  <!-- ── Footer ── -->
  <footer class="orbia-footer">
    <div class="orbia-footer-outer">
      <div class="container">
        <div class="orbia-footer-card">

          <!-- Top: 4 columns -->
          <div class="orbia-footer-cols">

            <!-- Col 1: Brand -->
            <div class="orbia-footer-brand">
              <div style="display:flex;align-items:center;gap:20px;margin-bottom:16px;">
                <a href="../index.html" class="orbia-footer-logo">
                  <img src="../assets/logos/logo-white.png" alt="Kemper Design Services" style="height:88px;width:auto;" />
                </a>
                <div style="font-family:var(--heading-font);font-weight:700;color:white;font-size:18px;line-height:1.2;">
                  <div>Kemper</div>
                  <div>Design</div>
                  <div>Services</div>
                </div>
              </div>
              <p class="orbia-footer-desc">We modernize business operations with practical AI — automating workflows, building custom tools, and helping teams do more without burning out.</p>
              <div class="orbia-footer-social">
                <a href="https://www.linkedin.com/in/damiankemper/" aria-label="LinkedIn" class="orbia-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.facebook.com/people/Kemper-Design-Services/61558862320236/" aria-label="Facebook" class="orbia-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.youtube.com/@KemperDesignServices" aria-label="YouTube" class="orbia-social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                </a>
              </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="orbia-footer-col">
              <h4 class="orbia-footer-col-title">Quick Links</h4>
              <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../about.html">About Us</a></li>
                <li><a href="../faq.html">FAQ</a></li>
                <li><a href="../blog.html">Blog</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>

            <!-- Col 3: AI Services -->
            <div class="orbia-footer-col">
              <h4 class="orbia-footer-col-title">AI Services</h4>
              <ul>
                <li><a href="../service-automation.html">AI Automations</a></li>
                <li><a href="../consulting.html">AI Consulting</a></li>
                <li><a href="../service-integrations.html">AI Integrations</a></li>
                <li><a href="../service-training.html">AI Enablement</a></li>
                <li><a href="../service-training.html">AI Education</a></li>
                <li><a href="../service-custom-ai.html">AI Implementations</a></li>
              </ul>
            </div>

            <!-- Col 4: Additional Services -->
            <div class="orbia-footer-col">
              <h4 class="orbia-footer-col-title" style="white-space:nowrap;">Additional Services</h4>
              <ul>
                <li><a href="../services.html#apps">Custom Applications</a></li>
                <li><a href="../services.html#websites">Web Engineering</a></li>
                <li><a href="../services.html#design">Graphic Design</a></li>
                <li><a href="../services.html#training">Instructional Design</a></li>
                <li><a href="../services.html#notary">Notary Services</a></li>
              </ul>
            </div>

            <!-- Col 5: Contact Us -->
            <div class="orbia-footer-col">
              <h4 class="orbia-footer-col-title">Contact Us</h4>
              <ul class="orbia-contact-list">
                <li>
                  <span class="orbia-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span>St Augustine, FL</span>
                </li>
                <li>
                  <span class="orbia-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <a href="mailto:damian@kemperdesignservices.com">damian@kemperdesignservices.com</a>
                </li>
                <li>
                  <span class="orbia-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                  </span>
                  <a href="tel:+19042363706">904.236.3706</a>
                </li>
                <li>
                  <span class="orbia-contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </span>
                  <span>Mon–Fri, 9am–5pm EST</span>
                </li>
              </ul>
            </div>

          </div>

          <!-- Bottom bar -->
          <div class="orbia-footer-bottom">
            <p class="orbia-footer-copy">© 2026 Kemper Design Services. All rights reserved.</p>
            <div class="orbia-footer-links"></div>
          </div>

        </div>
      </div>
    </div>
  </footer>

  <script src="../scripts.js"></script>

</body>
</html>`;
}

export default async function handler(req, res) {
  const { method, query } = req;

  // GET /api/posts — fetch all posts from posts.json
  if (method === 'GET') {
    try {
      const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
      const owner = process.env.GITHUB_OWNER;
      const repo = process.env.GITHUB_REPO;

      try {
        const response = await octokit.repos.getContent({
          owner,
          repo,
          path: 'site/data/posts.json',
        });
        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
        const posts = JSON.parse(content);
        return res.status(200).json(posts);
      } catch (err) {
        // File doesn't exist yet
        return res.status(200).json([]);
      }
    } catch (err) {
      console.error('GET error:', err);
      return res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  // POST / PUT / DELETE require auth
  const user = verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  // POST /api/posts — create new post
  if (method === 'POST') {
    const { title, category, excerpt, content, image, date } = req.body;
    const slug = slugify(query.slug || title);

    if (!title || !category || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const postHTML = generatePostHTML({
        title,
        category,
        excerpt: excerpt || '',
        content,
        image: image || '',
        date: date || new Date().toISOString(),
      });

      // Commit post HTML
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `site/posts/${slug}.html`,
        message: `Add blog post: ${title}`,
        content: Buffer.from(postHTML).toString('base64'),
      });

      // Fetch current posts.json
      let posts = [];
      let postsSHA = undefined;
      try {
        const existing = await octokit.repos.getContent({
          owner,
          repo,
          path: 'site/data/posts.json',
        });
        posts = JSON.parse(Buffer.from(existing.data.content, 'base64').toString('utf-8'));
        postsSHA = existing.data.sha;
      } catch (err) {
        // File doesn't exist yet
      }

      // Add new post to index
      posts.unshift({
        slug,
        title,
        category,
        excerpt,
        date: date || new Date().toISOString(),
        image: image || '',
      });

      // Commit updated posts.json
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'site/data/posts.json',
        message: `Update blog posts index`,
        content: Buffer.from(JSON.stringify(posts, null, 2)).toString('base64'),
        sha: postsSHA,
      });

      return res.status(201).json({ slug, title });
    } catch (err) {
      console.error('POST error:', err);
      return res.status(500).json({ error: 'Failed to create post' });
    }
  }

  // PUT /api/posts?slug=x — update post
  if (method === 'PUT') {
    const { slug } = query;
    const { title, category, excerpt, content, image, date } = req.body;

    if (!slug) {
      return res.status(400).json({ error: 'Missing slug' });
    }

    try {
      const postHTML = generatePostHTML({
        title,
        category,
        excerpt: excerpt || '',
        content,
        image: image || '',
        date: date || new Date().toISOString(),
      });

      // Get existing post SHA for update
      const existing = await octokit.repos.getContent({
        owner,
        repo,
        path: `site/posts/${slug}.html`,
      });

      // Update post HTML
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: `site/posts/${slug}.html`,
        message: `Update blog post: ${title}`,
        content: Buffer.from(postHTML).toString('base64'),
        sha: existing.data.sha,
      });

      // Update posts.json
      const postsResp = await octokit.repos.getContent({
        owner,
        repo,
        path: 'site/data/posts.json',
      });
      let posts = JSON.parse(Buffer.from(postsResp.data.content, 'base64').toString('utf-8'));
      posts = posts.map((p) =>
        p.slug === slug ? { slug, title, category, excerpt, date, image: image || '' } : p
      );

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'site/data/posts.json',
        message: `Update blog posts index`,
        content: Buffer.from(JSON.stringify(posts, null, 2)).toString('base64'),
        sha: postsResp.data.sha,
      });

      return res.status(200).json({ slug, title });
    } catch (err) {
      console.error('PUT error:', err);
      return res.status(500).json({ error: 'Failed to update post' });
    }
  }

  // DELETE /api/posts?slug=x — delete post
  if (method === 'DELETE') {
    const { slug } = query;

    if (!slug) {
      return res.status(400).json({ error: 'Missing slug' });
    }

    try {
      // Delete post HTML
      const existing = await octokit.repos.getContent({
        owner,
        repo,
        path: `site/posts/${slug}.html`,
      });

      await octokit.repos.deleteFile({
        owner,
        repo,
        path: `site/posts/${slug}.html`,
        message: `Delete blog post: ${slug}`,
        sha: existing.data.sha,
      });

      // Update posts.json
      const postsResp = await octokit.repos.getContent({
        owner,
        repo,
        path: 'site/data/posts.json',
      });
      let posts = JSON.parse(Buffer.from(postsResp.data.content, 'base64').toString('utf-8'));
      posts = posts.filter((p) => p.slug !== slug);

      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: 'site/data/posts.json',
        message: `Update blog posts index`,
        content: Buffer.from(JSON.stringify(posts, null, 2)).toString('base64'),
        sha: postsResp.data.sha,
      });

      return res.status(200).json({ deleted: slug });
    } catch (err) {
      console.error('DELETE error:', err);
      return res.status(500).json({ error: 'Failed to delete post' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
