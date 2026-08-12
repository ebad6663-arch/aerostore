import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";


export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({


  adapter: PrismaAdapter(prisma),


  providers: [


    Google({

      clientId: process.env.AUTH_GOOGLE_ID!,

      clientSecret: process.env.AUTH_GOOGLE_SECRET!,

    }),



    Credentials({

      id: "admin",

      name: "Admin Login",


      credentials: {

        username: {
          label: "Username",
          type: "text",
        },


        password: {
          label: "Password",
          type: "password",
        },

      },


      async authorize(credentials) {


        const username = String(
          credentials?.username ?? ""
        );


        const password = String(
          credentials?.password ?? ""
        );



        const adminUsername =
          process.env.ADMIN_USERNAME ?? "";


        const adminPassword =
          process.env.ADMIN_PASSWORD ?? "";



        console.log("ADMIN LOGIN CHECK:", {
          username,
          envUsername: adminUsername,
          passwordLength: password.length,
          envPasswordLength: adminPassword.length,
        });



        if(
          username !== adminUsername ||
          password !== adminPassword
        ){

          return null;

        }



        return {

          id: "admin",

          name: "Admin",

          email: "admin@local",

        };


      },


    }),


  ],



  session: {

    strategy: "jwt",

  },



  secret: process.env.AUTH_SECRET,


  trustHost: true,


});