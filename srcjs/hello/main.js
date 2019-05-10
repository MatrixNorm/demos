
navigator.serviceWorker
  .register('/service-worker.js')
  .then(function(reg) {
    console.log('Registration successful, scope is:', reg.scope);
  })
  .catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });

function makeLink (url, text) {
  const a = document.createElement('a');
  a.appendChild(document.createTextNode(text));
  a.href = url;
  return a;
}

document.body.appendChild(makeLink('/sw/about', 'About'));
