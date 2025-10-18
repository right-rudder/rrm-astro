// Empty service worker to prevent 404 errors
// This file exists to satisfy service worker registration attempts
// from third-party scripts but doesn't actually do anything

self.addEventListener("install", (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

// Optional: Add a minimal fetch handler if needed
self.addEventListener("fetch", (event) => {
  // Pass through all requests without modification
  return;
});
