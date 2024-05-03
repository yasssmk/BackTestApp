
const cacheName = 'V2'
const cacheAssets =[
    './offline.html'
]


// Call Install Event

self.addEventListener('install', (e) =>{
    console.log('Service worker Installed')
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
    )

})

// Call Activate Event
self.addEventListener('activate', (e) =>{
    console.log('Service worker Activated')
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache != cacheName) {
                        console.log('CLearng old cache')
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

//Call Fetch Event

self.addEventListener('fetch', e=>{
    console.log("Service worker fetching 123");
    e.respondWith(
        fetch(e.request).catch(() => caches.match('./offline.html'))
    )
})

