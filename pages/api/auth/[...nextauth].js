import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email";

import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import Auth0Provider from "next-auth/providers/auth0";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../lib/mongodb";

import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updatedDoc, deleteDoc, runTransaction } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgyuWsqUU_8S8HncgnDjoJnoZHNOdbhY8",
  authDomain: "nextauth-email.firebaseapp.com",
  projectId: "nextauth-email",
  storageBucket: "nextauth-email.appspot.com",
  messagingSenderId: "269300248406",
  appId: "1:269300248406:web:03081c7e4c25934e27f0f7"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();


export default NextAuth({ 
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
  // adapter: FirebaseAdapter({
  //   db, collection, query, getDocs, where, limit, doc, getDoc, addDoc, updatedDoc, deleteDoc, runTransaction
  // }),
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/signin"
  }
}) 