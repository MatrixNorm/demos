
const VERSION = 'v1';

self.addEventListener('install', event =>{
  console.log("install");
});

self.addEventListener('activate', event =>{
  console.log('activate');
});

self.addEventListener('fetch', event => {
  const requestURL = new URL(event.request.url);
  if (requestURL.pathname.startsWith('/sw/')) {
    event.respondWith(new Response(requestURL.pathname));
  }  
});
