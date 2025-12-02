const { serveHTTP } = require("stremio-addon-sdk");
const addonInterface = require("./addon");

const PORT = process.env.PORT || 7000;

serveHTTP(addonInterface, { port: PORT });

console.log(`
🎬 Stremio JSON Lists Addon
===========================
Servidor corriendo en: http://localhost:${PORT}
Manifest URL: http://localhost:${PORT}/manifest.json

Para agregar el addon a Stremio:
1. Abre Stremio
2. Ve a Addons
3. Pega esta URL: http://localhost:${PORT}/manifest.json
`);
