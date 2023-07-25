import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "asadatomoya-common/utils";
import { db } from "asadatomoya-common/utils/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials:", credentials);
        console.log("req:", req);
        const username = credentials?.username;
        const password = credentials?.password;

        if (!username || !password) return null;

        return { id: "aaa" };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      // if (token) {
      //   session.user.id = token.id;
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      //   session.user.image = token.picture;
      //   session.user.username = token.username;
      // }

      return session;
    },
    async jwt({ token, user }) {
      // const dbUser = await db.user.findFirst({
      //   where: {
      //     username: token.username,
      //   },
      // });

      // if (!dbUser) {
      //   token.id = user!.id;
      //   return token;
      // }

      // if (!dbUser.username) {
      //   await db.user.update({
      //     where: {
      //       id: dbUser.id,
      //     },
      //     data: {
      //       username: "SampleUser",
      //     },
      //   });
      // }

      // return {
      //   id: dbUser.id,
      //   name: dbUser.name,
      //   email: dbUser.email,
      //   picture: dbUser.image,
      //   username: dbUser.username,
      // };
      return {
        id: "jwt-sample",
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
