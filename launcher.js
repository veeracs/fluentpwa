if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/' })
    .then((registration) => {
        console.log('Service worker is registered!!!');
    })
    .catch(error => {
        console.log('Service worker is not registered');
    })
}