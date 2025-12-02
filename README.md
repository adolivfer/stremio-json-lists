# 🎬 Stremio JSON Lists

Addon de Stremio para servir catálogos personalizados de películas usando archivos JSON alojados en GitHub Pages.

## 📋 Catálogos Disponibles

- **Top 100** - Las 100 mejores películas según crítica y audiencia
- **Recientes** - Películas destacadas de los últimos 4 años
- **Certified Fresh** - Películas con certificación Rotten Tomatoes
- **Cine de Culto** - Películas de culto y clásicos alternativos

## 🚀 Instalación

### Opción 1: Usar el addon desplegado (GitHub Pages)

```
https://adolivfer.github.io/stremio-json-lists/manifest.json
```

1. Abre Stremio
2. Ve a **Addons** → **Community Addons**
3. Pega la URL del manifest
4. Haz clic en **Install**

### Opción 2: Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/adolivfer/stremio-json-lists.git
cd stremio-json-lists

# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

El addon estará disponible en: `http://localhost:7000/manifest.json`

## 📁 Estructura del Proyecto

```
stremio-json-lists/
├── addon.js              # Lógica principal del addon
├── server.js             # Servidor HTTP para el addon
├── manifest.json         # Configuración del addon
├── package.json          # Dependencias y scripts
├── top100.json           # Catálogo Top 100
├── recientes.json        # Catálogo Recientes
├── certified_fresh.json  # Catálogo Certified Fresh
├── cult.json             # Catálogo Cine de Culto
└── README.md            # Este archivo
```

## 🔧 Cómo Funciona

1. Los archivos JSON contienen listas de IDs de IMDb
2. El addon lee estos archivos desde GitHub Pages
3. Stremio usa los IDs para obtener metadatos (póster, título, etc.) desde Cinemeta
4. Los catálogos aparecen en tu interfaz de Stremio

## 📝 Agregar Nuevas Películas

Para agregar películas a un catálogo:

1. Edita el archivo JSON correspondiente (ej: `top100.json`)
2. Agrega el ID de IMDb de la película:

```json
{
  "imdb_id": "tt0111161"
}
```

3. Guarda y haz commit
4. GitHub Pages actualizará automáticamente

### ¿Cómo encontrar el ID de IMDb?

1. Ve a IMDb.com
2. Busca la película
3. La URL tendrá el formato: `https://www.imdb.com/title/tt0111161/`
4. El ID es la parte `tt0111161`

## 🌐 Desplegar en GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En **Source**, selecciona la rama `main` (o `master`)
4. Guarda los cambios
5. Tu addon estará disponible en: `https://[usuario].github.io/stremio-json-lists/manifest.json`

## 🛠️ Desarrollo

```bash
# Modo desarrollo con auto-reload
npm install -g nodemon
npm run dev
```

## 📊 Características

- ✅ Catálogos personalizados curados manualmente
- ✅ Cache para mejorar el rendimiento
- ✅ Paginación automática
- ✅ Manejo de errores robusto
- ✅ Fácil de actualizar (solo editar JSONs)
- ✅ Alojamiento gratuito en GitHub Pages

## 🤝 Contribuir

¿Tienes ideas para nuevos catálogos o mejoras? ¡Las pull requests son bienvenidas!

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nuevo-catalogo`)
3. Haz commit de tus cambios (`git commit -am 'Agregar nuevo catálogo'`)
4. Push a la rama (`git push origin feature/nuevo-catalogo`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - siéntete libre de usar y modificar este proyecto.

## 🔗 Enlaces Útiles

- [Stremio](https://www.stremio.com/)
- [Stremio Addon SDK](https://github.com/Stremio/stremio-addon-sdk)
- [IMDb](https://www.imdb.com/)

---

Hecho con ❤️ por [adolivfer](https://github.com/adolivfer)
