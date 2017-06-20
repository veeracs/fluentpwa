let swRegistration = null;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', { scope: '/' })
    .then((registration) => {
        swRegistration = registration;
        console.log('Service worker is registered!!!');
    })
    .catch(error => {
        console.log(error);
        console.log('Service worker is not registered');
    })
}

// Registering the Sync
function getEuroRate() {
    if ('SyncManager' in window) {
        swRegistration.sync.register('eurocheck');
    } else {
        // We need to do it the old fashion way
    }
}
