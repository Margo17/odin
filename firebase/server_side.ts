import { LiteServerSide } from './server'

export const server = new LiteServerSide({
  cloud: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '',
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL ?? '',
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '',
  },
})
