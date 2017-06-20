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

// Push Notifications
function pushAskPermission() {
  return new Promise(function(resolve, reject) {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });
 
    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
  });
}

 
// Subscribe a User
function pushSubscribeUser() {
  navigator.serviceWorker.getRegistration().then(
      function(registration) {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('<REPLACE WITH PUBLIC KEY>')
        };
        return registration.pushManager.subscribe(subscribeOptions);
  })
  .then(function(pushSubscription) {
    console.log('Push Subscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
}

