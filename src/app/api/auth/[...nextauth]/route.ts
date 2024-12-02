import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
export const options: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "https://exam.elevateegy.com/api/v1/auth/signin",
            {
              email: credentials?.userName,
              password: credentials?.password,
            }
          );
          console.log("response =>>>>>", response);
          if (response.status === 200) {
            return {
              id: response.data.user.id,
              name: response.data.user.name,
            }; // Return the user object if successful
          }

          throw new Error(response.data.message || "Invalid credentials");
        } catch (error: any) {
          throw new Error("Wrong Email Or Password");
        }
      },
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
};
const handler = NextAuth(options);

export { handler as GET, handler as POST };
