const { addonBuilder } = require("stremio-addon-sdk");

const base = "https://adolivfer.github.io/stremio-json-lists/";

const catalogs = {
    top100: "top100.json",
    recientes: "recientes.json",
    certified_fresh: "certified_fresh.json",
    cult: "cult.json"
};

const builder = new addonBuilder({
    id: "com.adolivfer.jsonlists",
    version: "1.0.0",
    name: "Adoliv Stremio JSON Lists",
    catalogs: [
        { type: "movie", id: "top100", name: "Top 100" },
        { type: "movie", id: "recientes", name: "Recientes" },
        { type: "movie", id: "certified_fresh", name: "Certified Fresh" },
        { type: "movie", id: "cult", name: "Cine de Culto" }
    ],
    resources: ["catalog"],
    types: ["movie"]
});

builder.defineCatalogHandler(async ({ id }) => {
    const res = await fetch(base + catalogs[id]);
    const json = await res.json();

    const metas = json.map(item => ({
        id: item.imdb_id,
        type: "movie"
    }));

    return { metas };
});

module.exports = builder.getInterface();
