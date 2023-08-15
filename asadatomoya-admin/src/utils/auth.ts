import { redirect } from "next/navigation";

import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaAdapter } from "asadatomoya-common/utils";
import { db } from "asadatomoya-common/utils/db";

import { hashPassword, verifyPassword } from "./crypt";

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
        try {
          console.log("credentials:", credentials);
          // console.log("req:", req);
          const username = credentials?.username;
          const password = credentials?.password!;

          const hash = await hashPassword(password);
          console.log("hash:", hash);

          const verified = await verifyPassword(password, hash);
          console.log("verified:", verified);

          if (!username || !password) return null;
        } catch (error) {
          redirect("/login");
          // throw new Error("ログイン処理に失敗しました。");
        }

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
