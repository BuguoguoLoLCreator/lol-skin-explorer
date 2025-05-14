/**
 * 图片代理API，用于解决跨域问题
 * 主要用于代理img.crawler.qq.com的图片，避免跨域下载失败
 */
export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    const urlObj = new URL(decodedUrl);
    
    // 安全检查：只允许特定的主机名
    if (urlObj.hostname !== 'img.crawler.qq.com') {
      return res.status(403).json({ error: 'Not allowed host' });
    }
    
    // 安全检查：强制使用HTTPS协议
    if (urlObj.protocol !== 'https:') {
      return res.status(403).json({ error: 'HTTPS protocol required' });
    }
    
    // 安全检查：限制路径起始
    if (!urlObj.pathname.startsWith('/lolwebschool/0/')) {
      return res.status(403).json({ error: 'Not allowed path' });
    }

    const response = await fetch(decodedUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to retrieve the image' });
    }

    const contentType = response.headers.get('content-type');
    
    if (!contentType || !contentType.startsWith('image/')) {
      return res.status(403).json({ error: 'Only image content types are allowed' });
    }
    
    if (contentType !== 'image/png') {
      return res.status(403).json({ error: 'Only PNG images are allowed' });
    }
    
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error('Internal server error', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}