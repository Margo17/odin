import { ClientSideConfig } from "./client";

export const config: ClientSideConfig = {
  credentials: {
    options: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    },
    // vapidKey: process.env.NEXT_FIREBASE_MESSAGING_VAPID_KEY ?? '',
    // search: {
    //   algolia: {
    //     api_key: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? '',
    //     app_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
    //   },
    // },
  },
  // analyticsSettings: {
  //   algolia: {
  //     api_key: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ?? '',
  //     app_id: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? '',
  //   },
  //   development: JSON.parse(process.env.NEXT_PUBLIC_DEVELOPMENT ?? 'false'),
  // },

  // emailLoginData: {
  //   // url: 'https://lastmile.lt/login',
  //   url: 'http://localhost:8100/login', /// for testing
  //   dynamicLinkDomain: 'lastmileapp.page.link',
  //   packageName: 'lt.lastmile.client',
  //   minimumVersion: '2.5.0',
  //   installApp: true,
  // },
};
