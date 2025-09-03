import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma"; // Assure-toi que ce chemin est correct

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    // Pour inclure l'ID de l'utilisateur dans la session
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/dashboard/auth", // Redirige les utilisateurs vers notre page personnalisée
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email et mot de passe requis");
        }

        // On utilise le modèle Account pour trouver l'utilisateur
        const account = await prisma.account.findUnique({
          include: {
            user: true,
          },
          where: {
            provider_providerAccountId: {
              provider: "credentials",
              providerAccountId: credentials.email,
            },
          },
        });

        if (!account || !account.password) {
          throw new Error("Aucun utilisateur trouvé avec cet email.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          account.password,
        );

        if (!isPasswordValid) {
          throw new Error("Mot de passe incorrect.");
        }

        return account.user;
      },
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      name: "Credentials",
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
