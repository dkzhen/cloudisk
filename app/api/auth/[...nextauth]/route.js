import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      checks: ["none"],
    }),
  ],
  session: {
    jwt: true,
    // maxAge: 300, // 1 jam
    maxAge: 60 * 60 * 1, // 1 jam
  },
});

export { authOptions as GET, authOptions as POST };
