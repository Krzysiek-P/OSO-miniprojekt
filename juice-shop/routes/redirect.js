const express = require('express');
const router = express.Router();
const { escapeHtml } = require('escape-html');

router.get('/', (req, res) => {
  const safeUrls = ['/home', '/about'];
  const url = req.query.url;
  
  if (url && safeUrls.includes(url)) {
    const safeUrl = new URL(url, "https://example.com").toString(); res.redirect(safeUrl);;
  } else {
    const safeUrl = new URL(url, "https://example.com").toString(); res.redirect(safeUrl);;
  }
});

module.exports = router;
