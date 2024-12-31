import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";

const login = async (credentials) => {
  try {
    connectToDB();

    const user = await User.findOne({ email: credentials.email });

    if (!user) throw new Error("Invalid credentials");

    const isPwdCorrect = credentials.password === user.password;

    if (!isPwdCorrect) throw new Error("Invalid credentials");

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
});
