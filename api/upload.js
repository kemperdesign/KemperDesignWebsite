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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify JWT
  const user = verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { imageData, filename } = req.body;

  if (!imageData || !filename) {
    return res.status(400).json({ error: 'Missing imageData or filename' });
  }

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    // Remove data: prefix if present
    let base64Data = imageData;
    if (base64Data.includes(',')) {
      base64Data = base64Data.split(',')[1];
    }

    const filePath = `site/assets/images/blog/${filename}`;

    // Check if file exists
    let sha = undefined;
    try {
      const existing = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath,
      });
      sha = existing.data.sha;
    } catch (err) {
      // File doesn't exist yet, which is fine
    }

    // Commit file
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Upload blog image: ${filename}`,
      content: base64Data,
      sha,
    });

    return res.status(200).json({
      url: `/assets/images/blog/${filename}`,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
}
