import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.payyng.app",
  appName: "payyng",
  webDir: "out", // Ensure this matches your Next.js output directory
  server: {
    url: "http://localhost:3000", // Optional, for development with live-reload
  },
  // webDir: 'public'
};

export default config;
