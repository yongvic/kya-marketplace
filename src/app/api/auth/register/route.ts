import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    // 1. Validation simple des données d'entrée
    if (!fullName || !email || !password) {
      return new NextResponse("Données manquantes", {
        status: 400,
      });
    }
    if (password.length < 8) {
      return new NextResponse(
        "Le mot de passe doit contenir au moins 8 caractères",
        {
          status: 400,
        },
      );
    }

    // 2. Vérifier si un compte avec cet email existe déjà
    const existingAccount = await prisma.account.findFirst({
      where: {
        provider: "credentials",
        providerAccountId: email,
      },
    });

    if (existingAccount) {
      return new NextResponse("Un utilisateur avec cet email existe déjà", {
        status: 409,
      }); // 409 Conflict
    }

    // 3. Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Créer l'utilisateur et le compte associé en une seule transaction
    // C'est la magie des "nested writes" de Prisma. C'est atomique.
    const newUser = await prisma.user.create({
      data: {
        accounts: {
          create: {
            password: hashedPassword,
            provider: "credentials",
            providerAccountId: email,
            type: "credentials",
          },
        },
        email,
        fullName,
      },
    });

    return NextResponse.json(newUser, {
      status: 201,
    }); // 201 Created
  } catch (error) {
    console.error("REGISTRATION_ERROR", error);
    return new NextResponse("Erreur interne du serveur", {
      status: 500,
    });
  }
}
