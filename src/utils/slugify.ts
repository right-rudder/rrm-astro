export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove non-word characters
}
