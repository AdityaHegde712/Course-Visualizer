// Eagerly load `meta` named exports for card display
const metas = import.meta.glob("./artifacts/*.jsx", { eager: true, import: "meta" });

// Lazy loaders for the default (component) export
const loaders = import.meta.glob("./artifacts/*.jsx");

function filenameToId(path) {
  const name = path.split("/").pop().replace(".jsx", "");
  return name.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
}

export const artifactEntries = Object.entries(loaders).map(([path, loader]) => {
  const name = path.split("/").pop().replace(".jsx", "");
  const meta = metas[path] || {};
  return {
    id: meta.id || filenameToId(path),
    title: meta.title || name,
    description: meta.description || "",
    icon: meta.icon || "◈",
    meta,
    loader,
  };
});