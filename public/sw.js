try {

    const addResourcesToCache = async (resources) => {
        const cache = await caches.open("v0");
        await cache.addAll(resources);
    };

    self.addEventListener("install", (event) => {

        event.waitUntil(
            
            addResourcesToCache([

                "/",

                "/news.json",

                "/icons/placeholder-image.jpg",

                "/svg/boldo-dual.svg",

                "/svg/empty-transaction.svg"

            ])
        );
    });

    self.addEventListener("fetch", event => {
        
        event.respondWith(
            caches.match(event.request)
            .then(cachedResponse => {

                console.log(cachedResponse, event?.request);

              // It can update the cache to serve updated content on the next request
                return cachedResponse || fetch(event?.request);
            }
          )
         )

    });
    

} catch (e) {

    console.log(e);

}
