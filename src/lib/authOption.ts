import { prisma } from "@/config/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    email?: string;
    name?: string ;
    role?: "ADMIN" | "USER";
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email?: string;
    role?: "ADMIN" | "USER";
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Missing email or password");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const passwordsMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordsMatch) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`.trim(),
            role: user.role ?? "USER",
          };
        } catch {
          return null;
        }
      },
    }),

  ],

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        try {
          if (!user.email) {
            return false;
          }

          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            existingUser = await prisma.user.create({
              data: {
                firstName: user.name?.split(" ")[0] || "Unknown",
                lastName: user.name?.split(" ")[1] || null,
                email: user.email,
                password: "",
                profilePhoto: user.image || null,
                role: "USER",
                city: null,
                street: null,
                dateOfBirth: null,
                gender: null,
              },
            });
          }
        } catch {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.role = user.role ?? "USER";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email ?? undefined;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.role = token.role as "ADMIN" | "USER";
      }
      return session;
    },
  },
};

export default authOptions;



