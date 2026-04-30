# AI Blog Writer Skill: Kemper Design Services Edition

Use this skill whenever the USER asks to create a new blog post for the Kemper Design Services website.

## 1. Voice & Tone Guidelines (The "Damian" Voice)
- **Direct & Practical**: Skip the flowery intros. Get straight to why the reader should care.
- **Assistance vs. Automation**: Always emphasize that standard AI "assists" (gives you homework), while our approach "automates" (does the work for you).
- **No ChatGPT Clichés**: Avoid words like "unleash," "delve," "tapestry," "comprehensive guide," or "game-changer" (unless followed by a specific ROI).
- **SMB Angle**: Every post must answer: "How does this save a business with 5 employees money or time?"
- **The "Street-Smart" Professional**: Sound like someone who has actually built these systems, not a marketing copywriter. Use phrases like "here's the drill," "no lunch breaks," or "get your business flowing."

## 2. Content Structure Requirements
- **Engaging Headline**: SEO-optimized but punchy (e.g., "Stop Wasting Time on [X]: The [Y] Strategy").
- **Intro**: Identify a common manual headache or a "homework-heavy" AI tool.
- **The Tech**: Explain the concept (Google Flow, Remote Desktop, etc.) in plain English.
- **Trending Tasks**: A list of 5-10 practical things a business can do *today*.
- **The "Possibilities" Section**: One or two "future-tech" or creative use cases.
- **Integrations**: Mention how it fits into Google Workspace, CRMs (HubSpot/Salesforce), or SMS/Email pipelines.
- **The ROI**: Calculate (roughly) the hours or dollars saved by replacing a manual process with this automation.

## 3. SEO Requirements
- **Keywords**: Include at least 5 relevant long-tail keywords.
- **Meta Description**: 150-160 characters, high CTR focus.
- **Title Tag**: Under 60 characters.
- **Heading Hierarchy**: H1 for title, H2 for main sections, H3 for sub-points.

## 4. Technical Execution Steps (Automated)
When this skill is triggered:
1. **Generate Content**: Write the full article based on the guidelines above.
2. **Generate Image**: Call `generate_image` for a high-tech, branded hero image (no text in image).
3. **Create Directory**: `Blog/[slug]/`.
4. **Build HTML**: Use the standardized editorial template (inline image with float: right wrapping, title on top).
5. **Update JSON**: Add the entry to `blogs.json`.
6. **Update Fallback**: Add the entry to the `blogData` object in `index.html`.
7. **Deploy**: Push to GitHub.

## 5. Template Reference
Use the CSS and structure from `Blog/google-flow-business-guide-2026/index.html`.

---
**To use this skill**: "Run the AI-Blog-Writer-Skill for [Topic]"
