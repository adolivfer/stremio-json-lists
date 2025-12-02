const { addonBuilder } = require("stremio-addon-sdk");

// URL base donde están alojados los archivos JSON
const BASE_URL = "https://adolivfer.github.io/stremio-json-lists/";

// Mapeo de catálogos
const CATALOGS = {
    top100: {
        file: "top100.json",
        name: "Top 100",
        description: "Las 100 mejores películas según crítica y audiencia"
    },
    recientes: {
        file: "recientes.json",
        name: "Recientes (últimos 4 años)",
        description: "Películas destacadas de los últimos años"
    },
    certified_fresh: {
        file: "certified_fresh.json",
        name: "Certified Fresh",
        description: "Películas con certificación Rotten Tomatoes"
    },
    cult: {
        file: "cult.json",
        name: "Cine de culto",
        description: "Películas de culto y clásicos alternativos"
    }
};

// Definir el manifest del addon
const manifest = {
    id: "com.adolivfer.jsonlists",
    version: "1.0.0",
    name: "Adoliv Stremio JSON Lists",
    description: "Catálogos personalizados de películas curados manualmente",
    logo: "https://via.placeholder.com/256x256/4A90E2/FFFFFF?text=JSON+Lists",
    background: "https://via.placeholder.com/1920x1080/2C3E50/FFFFFF?text=JSON+Lists+Addon",
    
    // Tipos de contenido que soporta
    types: ["movie"],
    
    // Recursos que provee
    resources: ["catalog"],
    
    // Definir los catálogos
    catalogs: Object.entries(CATALOGS).map(([id, catalog]) => ({
        type: "movie",
        id: id,
        name: catalog.name,
        extra: [{ name: "skip" }]
    })),
    
    // Configuración del comportamiento
    behaviorHints: {
        configurable: false,
        configurationRequired: false
    }
};

// Crear el builder del addon
const builder = new addonBuilder(manifest);

// Cache simple para evitar hacer fetch repetidos
const cache = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hora

/**
 * Función para obtener datos del catálogo con cache
 */
async function getCatalogData(catalogId) {
    const now = Date.now();
    const cached = cache.get(catalogId);
    
    // Si existe en cache y no ha expirado, devolver del cache
    if (cached && (now - cached.timestamp) < CACHE_TTL) {
        return cached.data;
    }
    
    try {
        const catalogInfo = CATALOGS[catalogId];
        if (!catalogInfo) {
            throw new Error(`Catálogo no encontrado: ${catalogId}`);
        }
        
        const url = BASE_URL + catalogInfo.file;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} al obtener ${url}`);
        }
        
        const data = await response.json();
        
        // Guardar en cache
        cache.set(catalogId, {
            data: data,
            timestamp: now
        });
        
        return data;
    } catch (error) {
        console.error(`Error al obtener catálogo ${catalogId}:`, error.message);
        throw error;
    }
}

/**
 * Handler para las peticiones de catálogo
 */
builder.defineCatalogHandler(async ({ type, id, extra }) => {
    try {
        // Validar que el tipo sea movie
        if (type !== "movie") {
            return { metas: [] };
        }
        
        // Obtener los datos del catálogo
        const catalogData = await getCatalogData(id);
        
        // Convertir a formato de metas de Stremio
        const metas = catalogData.map(item => ({
            id: item.imdb_id,
            type: "movie"
        }));
        
        // Aplicar paginación si se proporciona skip
        const skip = parseInt(extra?.skip) || 0;
        const paginatedMetas = metas.slice(skip, skip + 100);
        
        console.log(`📚 Catálogo ${id}: ${paginatedMetas.length} películas (skip: ${skip})`);
        
        return { metas: paginatedMetas };
        
    } catch (error) {
        console.error(`❌ Error en catalogHandler:`, error.message);
        return { metas: [] };
    }
});

module.exports = builder.getInterface();
