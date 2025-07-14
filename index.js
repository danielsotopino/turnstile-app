require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3005;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal: Generar token
app.get('/', (req, res) => {
  res.render('index', { SITE_KEY: process.env.SITE_KEY });
});

// Página para validar el token manualmente
app.get('/validate', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/validate.html'));
});

// POST para verificar el token
app.post('/verify', async (req, res) => {
  const token = req.body.token || req.body['cf-turnstile-response'];
  const remoteip = req.ip;

  try {
    const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify',
      new URLSearchParams({
        secret: process.env.SECRET_KEY,
        response: token,
        remoteip,
      })
    );

    const data = response.data;

    if (data.success) {
      res.send(`<h2>✅ Token válido</h2><pre>${JSON.stringify(data, null, 2)}</pre>`);
    } else {
      res.send(`<h2>❌ Token inválido</h2><pre>${JSON.stringify(data, null, 2)}</pre>`);
    }
  } catch (err) {
    res.send(`<h2>❌ Error en la verificación</h2><pre>${err.message}</pre>`);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor en: http://localhost:${PORT}`);
});
