let cacheName = 'restaurant_reviews';

//Install site assets

self.addEventListener('install', function(event){
   event.waitUntil(
       caches.open(cacheName)
           .then(cache=>{
               return cache
                   .addAll([
                       '/',
                       '/index.html',
                       '/restaurant.html',
                       '/css/styles.css',
                       '/data/restaurants.json',
                       'img/1.jpg',
                       'img/2.jpg',
                       'img/3.jpg',
                       'img/4.jpg',
                       'img/5.jpg',
                       'img/6.jpg',
                       'img/7.jpg',
                       'img/8.jpg',
                       'img/9.jpg',
                       'img/10.jpg',
                       '/js/dbhelper.js',
                       '/js/main.js',
                       '/js/restaurant_info.js',
                       '/js/register_sw.js',

            ])
                   .catch(error => {
                       console.log("Caches open failed " + error)
                   })
           })

   );
});

//Intercept Web Page requests
self.addEventListener('fetch', event=>{
    let cacheRequest = event.request;
    let cacheUrlObj = new URL(event.request.url);

    if (event.request.url.indexOf('restaurant.html') > -1){
        const cacheURL = 'restaurant.html';
        cacheRequest = new Request(cacheURL);
    }
    if (cacheUrlObj.hostname !== "localhost"){
        event.request.mode = "no-cors";
    }

    //console.log(`Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(cacheRequest)
            .then(response=>{
                return response || fetch(event.request)
                    .then(fetchResponse =>{
                        return caches.open(cacheName).then(cache =>{
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse
                        });
                    })

            })
    );
});
