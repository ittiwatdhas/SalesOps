// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase.js');
importScripts('https://www.gstatic.com/firebasejs/4.10.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase-messaging.js');

var config = {
  apiKey: "AIzaSyCPoSBua03ucMuZMNA0ERyqVWM7TFII3pg",
  authDomain: "checkin-c8308.firebaseapp.com",
  databaseURL: "https://checkin-c8308.firebaseio.com",
  projectId: "checkin-c8308",
  storageBucket: "checkin-c8308.appspot.com",
  messagingSenderId: "568572886518",
  appId: "appid",
  measurementId: ""
};

// messagingSenderId': 'xxxxxxxxxxxxxx',
//   'apiKey': "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//   'authDomain': "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//   'databaseURL': "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
//   'projectId': "xxxxxxxxxxxxxx",
//   'storageBucket': "xxxxxxxxxxxxxx",
//   'messagingSenderId': "599149435887",
//   'appId': "x:xxxxxxxxxxxxxx:xxx:xxxxxxxxxxxxxx",
//   'measurementId': "xxxxxxxxxxxxxx"

firebase.initializeApp(config);

var messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  //console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var dat = JSON.parse(payload.data.data);

  //console.log('service worker', playload);

  var notificationTitle = dat.title;
  var notificationOptions = {
    body: dat.message,
    icon: '/SalesOpsIcon.png'
  };

  //if(dat.noti_cfg == 1)
    return self.registration.showNotification(notificationTitle, notificationOptions);
  //else
  //  return true;
});
// [END background_handler]
