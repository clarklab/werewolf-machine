self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});

self.addEventListener('fetch', (event) => {
    // Optional: Add fetch event listener for caching
});
