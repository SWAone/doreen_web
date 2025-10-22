// Firebase Service Worker for push notifications
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize Firebase with your web app config
firebase.initializeApp({
  apiKey: 'AIzaSyA6uBNKd20AvMMp03SFiYNxU650YdCpk2w',
  authDomain: 'dorween.firebaseapp.com',
  projectId: 'dorween',
  storageBucket: 'dorween.firebasestorage.app',
  messagingSenderId: '331204951933',
  appId: '1:331204951933:web:af8481a082f1dfbb455614',
  measurementId: 'G-1W0LZMFF5Y'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'إشعار جديد من لوحة التحكم';
  const notificationOptions = {
    body: payload.notification?.body || 'لديك إشعار جديد',
    icon: '/favicon.png',
    badge: '/favicon.png',
    tag: 'admin-notification',
    data: payload.data,
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'عرض',
        icon: '/favicon.png'
      },
      {
        action: 'dismiss',
        title: 'إغلاق'
      }
    ]
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'view') {
    // Open the admin dashboard
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});
