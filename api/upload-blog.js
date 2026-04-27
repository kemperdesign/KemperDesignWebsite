const sharp = require('sharp');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, filename, fileType } = req.body;

    if (!file || !filename) {
      return res.status(400).json({ error: 'Missing file or filename' });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GITHUB_TOKEN not configured' });
    }

    const GITHUB_OWNER = 'kemperdesign';
    const GITHUB_REPO = 'KemperDesignWebsite';
    const GITHUB_BRANCH = 'main';

    // Decode base64 file
    const buffer = Buffer.from(file, 'base64');

    // Resize images if needed
    let finalBuffer = buffer;
    if (fileType.startsWith('image/')) {
      try {
        finalBuffer = await sharp(buffer)
          .resize(1000, 1000, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({ quality: 85 })
          .toBuffer();
      } catch (err) {
        console.error('Image resize error:', err);
        finalBuffer = buffer;
      }
    }

    // Prepare for GitHub commit
    const filepath = `assets/images/blog/${filename}`;
    const content = finalBuffer.toString('base64');

    // Get current file to find SHA (needed for updates)
    let sha = null;
    try {
      const getResponse = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filepath}?ref=${GITHUB_BRANCH}`,
        {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );
      if (getResponse.ok) {
        const data = await getResponse.json();
        sha = data.sha;
      }
    } catch (err) {
      console.error('Error checking existing file:', err);
    }

    // Commit to GitHub
    const commitPayload = {
      message: `Add blog media: ${filename}`,
      content: content,
      branch: GITHUB_BRANCH
    };

    if (sha) {
      commitPayload.sha = sha;
    }

    const commitResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filepath}`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commitPayload)
      }
    );

    if (!commitResponse.ok) {
      const errorData = await commitResponse.json();
      console.error('GitHub error:', errorData);
      return res.status(400).json({
        error: 'GitHub commit failed',
        details: errorData.message || 'Unknown error'
      });
    }

    const responseData = await commitResponse.json();

    return res.status(200).json({
      success: true,
      path: `/${filepath}`,
      filename: filename
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      error: 'Upload failed',
      message: error.message || 'Unknown error'
    });
  }
};
