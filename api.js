const express = require('express');

const router = express.Router();

const CLIENT_ID = "365949788807757834";
const CLIENT_SECRET = "CeByXJkxi6m5fyC0hCyaImCSeixcg72Q";
const redirect = encodeURIComponent('http://localhost:50451/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

module.exports = router;