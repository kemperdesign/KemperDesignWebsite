/**
 * Kemper Design Services - Common UI Components & Logic
 * This file handles global modals, navigation logic, and shared interactivity.
 */

(function() {
    // 1. Inject Global Modals HTML
    const modalsHTML = `
        <!-- AI Readiness Assessment Modal -->
        <div id="aai-modal" class="aai-modal" role="dialog" aria-modal="true" aria-label="AI Readiness Assessment">
            <div class="aai-inner">
                <button class="aai-close" onclick="closeAssessment()" aria-label="Close assessment">✕</button>
                <div class="aai-progress-track">
                    <div class="aai-progress-fill" id="aai-progress"></div>
                </div>
                <div class="aai-body" id="aai-body">
                    <!-- Step 1 -->
                    <div class="aai-step" data-key="industry">
                        <div class="aai-cat">1 of 5 — YOUR BUSINESS</div>
                        <h2 class="aai-q">Tell us about your business to tailor results</h2>
                        <div class="aai-grid">
                            <button class="aai-chip" data-val="Healthcare">🏥 Healthcare</button>
                            <button class="aai-chip" data-val="Professional Services">💼 Prof. Services</button>
                            <button class="aai-chip" data-val="Retail">🛍️ Retail</button>
                            <button class="aai-chip" data-val="Food">🍽️ Food</button>
                            <button class="aai-chip" data-val="Construction">🏗️ Construction</button>
                            <button class="aai-chip" data-val="Real Estate">🏠 Real Estate</button>
                            <button class="aai-chip" data-val="Finance">💰 Finance</button>
                            <button class="aai-chip" data-val="Education">🎓 Education</button>
                            <button class="aai-chip" data-val="Tech">💻 Tech</button>
                            <button class="aai-chip" data-val="Other">⋯ Other</button>
                        </div>
                    </div>
                    <!-- Step 2 -->
                    <div class="aai-step" data-key="bottleneck">
                        <div class="aai-cat">2 of 5 — OPERATIONS</div>
                        <h2 class="aai-q">Biggest operational headache right now?</h2>
                        <div class="aai-list">
                            <button class="aai-opt" data-val="Manual data entry">Manual data entry and copy-paste work</button>
                            <button class="aai-opt" data-val="Scheduling">Scheduling, booking and confirmations</button>
                            <button class="aai-opt" data-val="Customer follow-up">Customer follow-up and communication</button>
                            <button class="aai-opt" data-val="Creating documents">Creating documents, proposals and reports</button>
                            <button class="aai-opt" data-val="Managing email">Managing email and client inquiries</button>
                        </div>
                    </div>
                    <!-- Step 3 -->
                    <div class="aai-step" data-key="team_size">
                        <div class="aai-cat">3 of 5 — YOUR TEAM</div>
                        <h2 class="aai-q">How many people are on your team?</h2>
                        <div class="aai-list">
                            <button class="aai-opt" data-val="Solo">Just me (solo operator)</button>
                            <button class="aai-opt" data-val="2-5">2–5 team members</button>
                            <button class="aai-opt" data-val="6-20">6–20 team members</button>
                            <button class="aai-opt" data-val="21+">21+ team members</button>
                        </div>
                    </div>
                    <!-- Step 4 -->
                    <div class="aai-step" data-key="ai_readiness">
                        <div class="aai-cat">4 of 5 — AI READINESS</div>
                        <h2 class="aai-q">Current relationship with AI tools?</h2>
                        <div class="aai-list">
                            <button class="aai-opt" data-val="Daily use">Using AI tools daily</button>
                            <button class="aai-opt" data-val="Mixed results">Tried a few tools with mixed results</button>
                            <button class="aai-opt" data-val="Curious">Curious but haven't started yet</button>
                            <button class="aai-opt" data-val="Not sure">Not sure where AI would fit</button>
                        </div>
                    </div>
                    <!-- Step 5 -->
                    <div class="aai-step aai-step--contact" data-key="contact">
                        <div class="aai-cat">5 of 5 — YOUR RESULTS</div>
                        <h2 class="aai-q">Where should we send your AI roadmap?</h2>
                        <p class="aai-sub">Sent directly to your inbox based on your precise answers.</p>
                        <form class="aai-form" id="aai-form" onsubmit="submitAssessment(event)">
                            <input type="hidden" name="industry" id="aai-h-industry">
                            <input type="hidden" name="bottleneck" id="aai-h-bottleneck">
                            <input type="hidden" name="team_size" id="aai-h-team_size">
                            <input type="hidden" name="ai_readiness" id="aai-h-ai_readiness">
                            <div class="aai-form-row">
                                <div>
                                    <label for="aai-name" style="color: white; font-size: 0.85rem; margin-bottom: 4px; display: block;">Full Name</label>
                                    <input id="aai-name" class="aai-input" type="text" name="name" placeholder="Full Name" required>
                                </div>
                                <div>
                                    <label for="aai-company" style="color: white; font-size: 0.85rem; margin-bottom: 4px; display: block;">Company Name</label>
                                    <input id="aai-company" class="aai-input" type="text" name="company" placeholder="Company Name">
                                </div>
                            </div>
                            <div>
                                <label for="aai-email" style="color: white; font-size: 0.85rem; margin-bottom: 4px; display: block;">Work Email</label>
                                <input id="aai-email" class="aai-input" type="email" name="email" placeholder="Work Email" required>
                            </div>
                            <button type="submit" class="aai-submit-btn">Get My AI Roadmap →</button>
                        </form>
                    </div>
                </div>
                <div class="aai-nav" id="aai-nav">
                    <button class="aai-back" id="aai-back" onclick="aaiBack()">← Back</button>
                </div>
            </div>
        </div>

        <!-- Contact Modal -->
        <div class="aai-modal" id="contact-modal">
            <div class="aai-inner contact-inner glass" style="max-width: 1000px; padding: 0; display: flex; overflow: hidden; flex-direction: row; flex-wrap: wrap; position: relative;">
                <button class="aai-close" onclick="closeContactModal()" style="z-index: 100; right: 20px; top: 20px; background: rgba(0,0,0,0.6); width: 40px; height: 40px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.1);">✕</button>
                
                <div class="contact-hero-side" style="flex: 1 1 400px; position: relative; min-height: 400px; padding: 40px; display: flex; flex-direction: column; justify-content: flex-end; overflow: hidden;">
                    <video autoplay muted loop playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;">
                        <source src="assets/video/ai-workflow-showcase.mp4" type="video/mp4">
                    </video>
                    <h1 style="color: white; font-size: 3rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; text-shadow: 0 4px 20px rgba(0,0,0,0.5);">We can turn your dream project into reality</h1>
                </div>

                <div class="contact-form-side" style="flex: 1 1 500px; padding: 40px; background: rgba(20,20,25,0.95); display: flex; flex-direction: column; overflow-y: auto; max-height: 90vh;">
                    <div style="margin-bottom: 24px;">
                        <p style="color: var(--text-secondary); margin-bottom: 8px; font-size: 0.9rem;">Mail us at</p>
                        <a href="mailto:damian@kemperdesignservices.com" style="color: var(--accent-1); text-decoration: none; font-size: 1.1rem; font-weight: 500;">damian@kemperdesignservices.com</a>
                    </div>

                    <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin-bottom: 24px;">

                    <form id="contact-form" onsubmit="submitContactForm(event)" style="display: flex; flex-direction: column; gap: 16px;">
                        <p style="color: var(--text-secondary); margin-bottom: 4px; font-size: 0.95rem;">Leave us a brief message</p>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div>
                                <label for="contact-name" style="color: white; font-size: 0.9rem; margin-bottom: 8px; display: block;">Your name</label>
                                <input id="contact-name" type="text" name="name" required style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); padding: 12px 14px; color: white; outline: none; font-family: var(--font-body);">
                            </div>
                            <div>
                                <label for="contact-email" style="color: white; font-size: 0.9rem; margin-bottom: 8px; display: block;">Email</label>
                                <input id="contact-email" type="email" name="email" required style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); padding: 12px 14px; color: white; outline: none; font-family: var(--font-body);">
                            </div>
                        </div>

                        <div>
                            <label for="contact-message" style="color: white; font-size: 0.9rem; margin-bottom: 8px; display: block;">Briefly describe your project idea</label>
                            <textarea id="contact-message" name="message" required rows="3" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); padding: 12px 14px; color: white; resize: vertical; outline: none; font-family: var(--font-body);"></textarea>
                        </div>

                        <div style="margin-top: 10px; margin-bottom: 10px;">
                            <p style="color: var(--text-secondary); margin-bottom: 12px; font-size: 0.9rem;">I'm looking for...</p>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> Website</label>
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> AI Workflow</label>
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> AI Chatbot</label>
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> Brand Strategy</label>
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> App Dev</label>
                                <label style="color: white; font-size: 0.85rem; display: flex; align-items: center; gap: 8px; cursor: pointer;"><input type="checkbox"> Other</label>
                            </div>
                        </div>

                        <button type="submit" class="aai-submit-btn" style="margin-top: 10px; padding: 14px; border-radius: 8px;">Send a message</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Service Modal -->
        <div class="aai-modal" id="service-modal">
            <div class="aai-inner" style="padding: 0; overflow: hidden; max-width: 900px; max-height: 85vh; display: flex; flex-direction: row; flex-wrap: wrap; border-radius: 28px; background: #0a0a0f;">
                <button class="aai-close" onclick="closeServiceModal()" style="z-index: 10; background: rgba(0,0,0,0.5); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; top: 20px; right: 20px; color: white;">✕</button>
                
                <div id="sm-image" style="flex: 1 1 400px; position: relative; min-height: 450px; overflow: hidden; background-size: cover; background-position: center;">
                    <video id="sm-video" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; background: #000;" playsinline preload="auto" autoplay>
                        <source id="sm-video-source" src="" type="video/mp4">
                    </video>
                </div>
                
                <div style="flex: 1 1 400px; padding: 60px 50px; display: flex; flex-direction: column; justify-content: center; background: #0a0a0f;">
                    <div class="aai-cat" style="color: var(--text-secondary); opacity: 0.6; font-size: 0.75rem; letter-spacing: 2px;">KEMPER DESIGN SERVICES</div>
                    <h2 id="sm-title" class="aai-q" style="margin-bottom: 24px; font-size: 2.2rem; font-weight: 700; letter-spacing: -0.02em;">Service Title</h2>
                    <p id="sm-desc" style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 40px; font-size: 1.05rem;">Service Description goes here.</p>
                    <a href="javascript:void(0)" onclick="closeServiceModal(); openContactModal(currentServiceName);" class="aai-submit-btn" style="text-align: center; text-decoration: none; display: inline-block; cursor: pointer; padding: 18px 32px; border-radius: 12px; font-weight: 600;">Book a Free Discovery Call</a>
                </div>
            </div>
        </div>

        <!-- Certifications Modal -->
        <div class="aai-modal" id="certifications-modal">
            <div class="aai-inner glass" style="padding: 60px; overflow-y: auto; max-width: 1100px; max-height: 85vh; border-radius: 28px;">
                <button class="aai-close" onclick="closeCertificationsModal()" style="z-index: 10; background: rgba(0,0,0,0.5); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; top: 20px; right: 20px; color: white; position: absolute;">✕</button>

                <h2 style="font-size: 2.4rem; font-weight: 700; margin-bottom: 16px; color: white;">Certifications & Digital Credentials</h2>
                <p style="color: var(--text-secondary); margin-bottom: 48px; line-height: 1.7;">Demonstrated expertise across AI systems, cloud platforms, instructional design, and technical content development.</p>

                <h3 style="font-size: 1.6rem; color: var(--accent-1); margin-bottom: 12px; margin-top: 40px;">AI, Automation & Systems</h3>
                <div class="badges-grid" id="ai-badges" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-bottom: 40px;"></div>

                <h3 style="font-size: 1.6rem; color: var(--accent-1); margin-bottom: 12px; margin-top: 40px;">Cloud & Infrastructure</h3>
                <div class="badges-grid" id="cloud-badges" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-bottom: 40px;"></div>

                <h3 style="font-size: 1.6rem; color: var(--accent-1); margin-bottom: 12px; margin-top: 40px;">IT & Systems Management</h3>
                <div class="badges-grid" id="it-badges" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-bottom: 40px;"></div>

                <h3 style="font-size: 1.6rem; color: var(--accent-1); margin-bottom: 12px; margin-top: 40px;">Instructional Design</h3>
                <div class="badges-grid" id="id-badges" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-bottom: 40px;"></div>

                <h3 style="font-size: 1.6rem; color: var(--accent-1); margin-bottom: 12px; margin-top: 40px;">eLearning Tools & Platforms</h3>
                <div class="badges-grid" id="elearning-badges" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 20px; margin-bottom: 40px;"></div>
            </div>
        </div>

        <!-- Badge Lightbox Modal -->
        <div class="aai-modal" id="badge-lightbox-modal" style="background: rgba(0, 0, 0, 0.85); z-index: 100005;">
            <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; padding: 20px;">
                <button class="aai-close" onclick="closeBadgeLightbox()" style="z-index: 10; background: rgba(255,255,255,0.1); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; top: 20px; right: 20px; color: white; position: absolute; border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px);">✕</button>
                <img id="lightbox-image" src="" alt="Certificate" style="max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 12px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);">
            </div>
        </div>

        <!-- About Modal -->
        <div class="aai-modal" id="about-modal">
            <div class="aai-inner" style="padding: 60px 40px; max-width: 950px; border: 1px solid rgba(139, 92, 246, 0.2); max-height: 90vh; overflow-y: auto;">
                <button class="aai-close" onclick="closeAboutModal()">✕</button>
                
                <div style="display: flex; gap: 40px; align-items: flex-start; margin-bottom: 40px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 300px;">
                        <div class="aai-cat" style="color: var(--accent-1); letter-spacing: 2px;">FOUNDER & PRINCIPAL DESIGNER</div>
                        <h2 class="aai-q" style="font-size: 2.8rem; margin-bottom: 10px; font-family: 'Outfit';">Damian Kemper</h2>
                        <p style="color: var(--text-secondary); line-height: 1.8; font-size: 1.1rem; max-width: 650px;">
                            Accomplished **Instructional Designer** and **Technical Writer/Editor** with deep expertise in creating high-fidelity AI, cloud, and IT training experiences for enterprise clients. A lifelong native and local of **St. Augustine, Florida**, Damian combines world-class technical skills with a deep commitment to his community.
                        </p>
                        <div style="display: flex; gap: 15px; margin-top: 20px; flex-wrap: wrap;">
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ AI Certified</span>
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ Instructional Designer</span>
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ Graphic Designer</span>
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ App Designer</span>
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ Former Teacher</span>
                            <span style="background: rgba(139, 92, 246, 0.1); color: var(--accent-1); padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.2);">✓ Web Designer</span>
                        </div>
                    </div>
                    <div style="width: 200px; height: 200px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1)); border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); flex-shrink: 0;">
                        <img src="assets/logos/logo-white.png" alt="KDS Logo" style="width: 110px; opacity: 0.8; filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.3));">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px;">
                    <div>
                        <h3 style="color: white; margin-bottom: 25px; font-family: 'Outfit'; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-1)" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                          Professional Experience
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 24px; position: relative; padding-left: 10px;">
                            <div style="position: absolute; left: 17px; top: 10px; bottom: 10px; width: 1px; background: rgba(255,255,255,0.1);"></div>
                            
                            <div style="position: relative; padding-left: 35px;">
                                <div style="position: absolute; left: 0; top: 5px; width: 15px; height: 15px; background: var(--accent-1); border-radius: 50%; border: 3px solid #0a0a0f;"></div>
                                <div style="color: var(--accent-1); font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">2021 – PRESENT</div>
                                <div style="color: white; font-weight: 600; font-size: 1.05rem; margin-bottom: 6px;">Technical Learning Specialist | Skillable</div>
                                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Producing enterprise-grade AI, cloud, and IT training labs for **Google, Microsoft, AWS, and CompTIA**. Applying deep technical writing and debugging skills to validate complex AI-related lab environments.</p>
                            </div>

                            <div style="position: relative; padding-left: 35px;">
                                <div style="position: absolute; left: 0; top: 5px; width: 15px; height: 15px; background: rgba(255,255,255,0.3); border-radius: 50%; border: 3px solid #0a0a0f;"></div>
                                <div style="color: rgba(255,255,255,0.5); font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">2019 – 2021</div>
                                <div style="color: white; font-weight: 600; font-size: 1.05rem; margin-bottom: 6px;">Instructional Systems Designer II | A. Harold & Associates</div>
                                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Led Subject Matter Expert (SME) coordination for the **Navy Sailor 2025 initiative**. Developed detailed course outlines and multi-platform instructional strategies.</p>
                            </div>

                            <div style="position: relative; padding-left: 35px;">
                                <div style="position: absolute; left: 0; top: 5px; width: 15px; height: 15px; background: rgba(255,255,255,0.3); border-radius: 50%; border: 3px solid #0a0a0f;"></div>
                                <div style="color: rgba(255,255,255,0.5); font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">2017 – 2018</div>
                                <div style="color: white; font-weight: 600; font-size: 1.05rem; margin-bottom: 6px;">Instructional Designer | Education Corp of America</div>
                                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">Designed comprehensive educational materials and assessments, utilizing adult learning principles to deliver effective training programs.</p>
                            </div>

                            <div style="position: relative; padding-left: 35px;">
                                <div style="position: absolute; left: 0; top: 5px; width: 15px; height: 15px; background: rgba(255,255,255,0.3); border-radius: 50%; border: 3px solid #0a0a0f;"></div>
                                <div style="color: rgba(255,255,255,0.5); font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">2005 – 2008</div>
                                <div style="color: white; font-weight: 600; font-size: 1.05rem; margin-bottom: 6px;">Graphic Design & Printing Instructor | First Coast Tech</div>
                                <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">**Former Teacher** and advanced Graphic Design instructor. Coached students in professional Adobe Creative Suite workflows and industry standards.</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: white; margin-bottom: 25px; font-family: 'Outfit'; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-2)" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                          Academic Foundation
                        </h3>
                        <div style="display: flex; flex-direction: column; gap: 15px;">
                            <div style="padding: 18px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px;">
                                <div style="color: white; font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">M.A. Instructional Design & Tech</div>
                                <div style="color: var(--accent-2); font-size: 0.85rem; font-weight: 600; margin-bottom: 4px;">Specialization in Online Education</div>
                                <div style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Ashford University</div>
                            </div>
                            <div style="padding: 18px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px;">
                                <div style="color: white; font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">B.A. Communications</div>
                                <div style="color: var(--accent-2); font-size: 0.85rem; font-weight: 600; margin-bottom: 4px;">Journalism, Public Relations & Broadcasting</div>
                                <div style="color: rgba(255,255,255,0.5); font-size: 0.75rem;">Flagler College</div>
                            </div>
                        </div>

                        <h3 style="color: white; margin: 40px 0 25px; font-family: 'Outfit'; font-size: 1.3rem; display: flex; align-items: center; gap: 10px;">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                          Foundations & Ventures
                        </h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div style="padding: 15px; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.1); border-radius: 15px; text-align: center;">
                                <div style="color: #f59e0b; font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">FOUNDER</div>
                                <div style="color: white; font-weight: 600; font-size: 0.9rem;">Old City Computer</div>
                            </div>
                            <div style="padding: 15px; background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.1); border-radius: 15px; text-align: center;">
                                <div style="color: #f59e0b; font-weight: 700; font-size: 0.8rem; margin-bottom: 4px;">FOUNDER</div>
                                <div style="color: white; font-weight: 600; font-size: 0.9rem;">Fiction Donuts</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 50px; display: flex; gap: 20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 30px; flex-wrap: wrap;">
                    <a href="javascript:void(0)" onclick="closeAboutModal(); openContactModal('Project Discussion with Damian');" class="aai-submit-btn" style="text-align: center; text-decoration: none; display: inline-block; cursor: pointer; padding: 16px 35px; border-radius: 15px; flex: 1; min-width: 250px;">Book a Strategy Session →</a>
                    <a href="javascript:void(0)" onclick="closeAboutModal()" class="aai-submit-btn" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 16px 35px; border-radius: 15px; flex: 0.5; min-width: 150px; text-align: center; text-decoration: none;">Close Profile</a>
                </div>
            </div>
        </div>

        <!-- FAQ Modal -->
        <div class="aai-modal" id="faq-modal">
            <div class="aai-inner" style="padding: 50px 40px; max-width: 700px; max-height: 85vh; display: flex; flex-direction: column; overflow: hidden;">
                <button class="aai-close" onclick="closeFaqModal()">✕</button>
                <h2 class="aai-q">FAQ</h2>
                <div style="flex: 1; overflow-y: auto;" id="faq-items-container">
                    <!-- FAQ Items will be here -->
                </div>
            </div>
        </div>

        <!-- Legal Modals (Terms/Privacy) -->
        <div class="aai-modal" id="terms-modal">
            <div class="aai-inner" style="padding: 50px 40px; max-width: 700px; max-height: 85vh; overflow-y: auto;">
                <button class="aai-close" onclick="closeTermsModal()">✕</button>
                <h2 class="aai-q">Terms & Conditions</h2>
                <div id="terms-content"></div>
            </div>
        </div>
        <div class="aai-modal" id="privacy-modal">
            <div class="aai-inner" style="padding: 50px 40px; max-width: 700px; max-height: 85vh; overflow-y: auto;">
                <button class="aai-close" onclick="closePrivacyModal()">✕</button>
                <h2 class="aai-q">Privacy Policy</h2>
                <div id="privacy-content"></div>
            </div>
        </div>
    `;

    // 2. Data Objects
    window.currentServiceName = null;
    window.serviceData = {
        // AI Services
        "AI Workflow Automation": { desc: "We map out your manual processes and build automated workflows that tie your existing software stack together.", video: "assets/video/Services - AI Integrations.mp4" },
        "AI Consulting": { desc: "Expert guidance on adopting AI technologies, identifying high-impact use cases, and creating a roadmap for success.", video: "assets/video/ai audit_00001_.mp4" },
        "Custom Integrations": { desc: "Seamlessly connect your CRM, email, and internal tools so data flows automatically across your business.", video: "assets/video/system integration.mp4" },
        "AI Enablement": { desc: "Empowering your team with the tools and access needed to leverage AI in their daily workflows securely.", video: "assets/video/Services - Local AI Deployment.mp4" },
        "AI Training & Education": { desc: "Comprehensive training programs designed to upskill your staff on the latest AI tools and best practices.", video: "assets/video/ai education.mp4" },
        "AI Implementation": { desc: "End-to-end deployment of custom AI solutions, from initial setup to full-scale operations.", video: "assets/video/Custom Internal AI Tools_00002_.mp4" },
        "AI Audits": { desc: "A thorough review of your current tech stack to identify inefficiencies and opportunities for AI-driven optimization.", video: "assets/video/ai audit_00001_.mp4" },
        
        // Additional Services
        "Custom Applications": { desc: "Custom-built applications designed specifically for your business workflows.", video: "assets/video/Services - Custom Applications.mp4" },
        "Custom Websites": { desc: "High-performance, beautifully designed websites that convert visitors into leads.", video: "assets/video/web design_00001_.mp4" },
        "Graphic Design": { desc: "Professional graphic design services that communicate your brand's message.", video: "assets/video/Services - Graphic Design.mp4" },
        "Instructional Design": { desc: "Development of clear SOPs, training modules, and knowledge bases.", video: "assets/video/isd.mp4" },
        "Notary Services": { desc: "Professional notary services for all your important legal and business documentation.", video: "assets/video/notary.mp4" },
        
        // Legacy/Other Keys
        "AI Workflow Integration": { desc: "We map out your manual processes and build automated workflows.", video: "assets/video/Services - AI Integrations.mp4" },
        "AI Chatbots & Assistants": { desc: "Custom-trained AI agents that know your business operations inside and out.", video: "assets/video/chatbots_00001_.mp4" },
        "AI Auto-Scheduler": { desc: "An intelligent scheduling agent that coordinates meetings automatically.", video: "assets/video/ai autoscheduler.mp4" },
        "Document Processing": { desc: "Turn unstructured documents into clean, usable data automatically.", video: "assets/video/Services - Document Processing.mp4" },
        "Local AI Deployment": { desc: "Run powerful AI models on your own servers.", video: "assets/video/Services - Local AI Deployment.mp4" },
        "Custom Internal AI Tools": { desc: "Purpose-built AI tools designed specifically for your internal operations.", video: "assets/video/Custom Internal AI Tools_00002_.mp4" },
        "System Integrations": { desc: "Seamlessly connect all your business systems.", video: "assets/video/system integration.mp4" },
        "UI/UX Design": { desc: "User-centered design that creates intuitive, beautiful interfaces.", video: "assets/video/Services - UI UX.mp4" },
        "Frontend Development": { desc: "Expert front-end development.", video: "assets/video/frontend development_00001_.mp4" },
        "IT Infrastructure": { desc: "Robust IT infrastructure design and implementation.", video: "assets/video/it infrastructure.mp4" },
        "Cybersecurity Solutions": { desc: "Comprehensive security strategy.", video: "assets/video/CyberSecurity.mp4" }
    };

    window.serviceToCheckbox = {
        "AI Workflow Integration": "AI Workflow",
        "AI Chatbots & Assistants": "AI Chatbot",
        "Custom Websites": "Website",
        "AI Audits": "AI Workflow"
    };

    window.badgeFiles = {
        cloud: ['AWS Cloud Practitioner 2020 Cloud Economics.png', 'Microsoft AI Fundamentals Certification.png'],
        it: ['Kaseya Certified Technician in Datto RMM.png'],
        id: ['Agile Instructional Design.png'],
        elearning: ['Certifications - Adobe Certified Professional - Adobe Captivate certificate.png']
    };

    // 3. Modal Functions
    window.openContactModal = function(serviceName) {
        const modal = document.getElementById('contact-modal');
        if (!modal) return;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if(serviceName && window.serviceToCheckbox[serviceName]) {
            const checkboxValue = window.serviceToCheckbox[serviceName];
            const checkboxes = document.querySelectorAll('#contact-form input[type="checkbox"]');
            checkboxes.forEach(cb => {
                cb.checked = cb.nextElementSibling && cb.nextElementSibling.textContent.includes(checkboxValue);
            });
        }
    };
    window.closeContactModal = function() {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
            const video = modal.querySelector('video');
            if (video) { video.pause(); video.currentTime = 0; }
        }
    };

    window.openServiceModal = function(serviceName) {
        const modal = document.getElementById('service-modal');
        if (!modal) return;
        window.currentServiceName = serviceName;
        const data = window.serviceData[serviceName] || { desc: "Custom " + serviceName + " solutions." };
        document.getElementById('sm-title').textContent = serviceName;
        document.getElementById('sm-desc').textContent = data.desc;
        const video = document.getElementById('sm-video');
        const source = document.getElementById('sm-video-source');
        if (data.video) {
            source.src = data.video;
            video.load();
            video.play().catch(() => { video.muted = true; video.play(); });
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };
    window.closeServiceModal = function() {
        const modal = document.getElementById('service-modal');
        if (modal) {
            modal.classList.remove('open');
            document.body.style.overflow = '';
            const video = document.getElementById('sm-video');
            if (video) { video.pause(); }
        }
    };

    window.openAboutModal = function() { document.getElementById('about-modal').classList.add('open'); document.body.style.overflow = 'hidden'; };
    window.closeAboutModal = function() { document.getElementById('about-modal').classList.remove('open'); document.body.style.overflow = ''; };

    window.openCertificationsModal = function() { document.getElementById('certifications-modal').classList.add('open'); document.body.style.overflow = 'hidden'; populateBadges(); };
    window.closeCertificationsModal = function() { document.getElementById('certifications-modal').classList.remove('open'); document.body.style.overflow = ''; };

    window.openFaqModal = function() { document.getElementById('faq-modal').classList.add('open'); document.body.style.overflow = 'hidden'; };
    window.closeFaqModal = function() { document.getElementById('faq-modal').classList.remove('open'); document.body.style.overflow = ''; };

    window.openTermsModal = function() { document.getElementById('terms-modal').classList.add('open'); document.body.style.overflow = 'hidden'; };
    window.closeTermsModal = function() { document.getElementById('terms-modal').classList.remove('open'); document.body.style.overflow = ''; };

    window.openPrivacyModal = function() { document.getElementById('privacy-modal').classList.add('open'); document.body.style.overflow = 'hidden'; };
    window.closePrivacyModal = function() { document.getElementById('privacy-modal').classList.remove('open'); document.body.style.overflow = ''; };

    // 4. Injection & Initialization
    document.addEventListener('DOMContentLoaded', function() {
        const div = document.createElement('div');
        div.id = 'kds-common-ui-container';
        div.innerHTML = modalsHTML;
        document.body.appendChild(div);

        // Close on backdrop click
        document.querySelectorAll('.aai-modal').forEach(m => {
            m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); document.body.style.overflow = ''; });
        });
    });

    // 5. Shared Logic
    window.submitContactForm = function(e) {
        e.preventDefault();
        e.target.innerHTML = '<div style="text-align: center; padding: 40px;"><h3 style="color: white;">Message Sent!</h3><p style="color: var(--text-secondary);">We will be in touch shortly.</p></div>';
    };

})();
