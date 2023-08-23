/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: "AIzaSyD5GvJvNuzGSsA0BixK-8F4a86Lc89wIsA",
    AUTH_DOMAIN: "zhen-702f1.firebaseapp.com",
    PROJECT_ID: "zhen-702f1",
    STORAGE_BUCKET: "zhen-702f1.appspot.com",
    MESSAGING_SENDER_ID: "277503513519",
    APP_ID: "1:277503513519:web:00388e161340280553155a",
    MEASUREMENT_ID: "G-5ZEXJT1KC6",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
