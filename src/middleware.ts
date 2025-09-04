import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// 1. Définis ici les chemins que tu veux protéger
const protectedAdminRoutes = [
  "/dashboard/user",
  "/dashboard/user/devices",
  "/dashboard/user/downloads",
  "/dashboard/user/licenses",
  "/dashboard/user/settings",
]; // Adapte ces chemins à ta structure

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 2. Vérifie si la route actuelle est une route admin protégée
  const isAdminRoute = protectedAdminRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isAdminRoute) {
    // 3. Récupère le token de session. C'est l'équivalent de getServerSession pour le middleware.
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    // 4. Si pas de token, redirige vers la page de connexion
    if (!token) {
      const loginUrl = new URL("/dashboard/auth", request.url); // Adapte '/auth' si ta page de connexion est ailleurs
      // Ajoute un paramètre pour rediriger l'utilisateur vers la page demandée après la connexion
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // BONUS : Vérification du rôle (si tu as des rôles dans ton token)
    // if (token.role !== 'ADMIN') {
    //   const unauthorizedUrl = new URL('/unauthorized', request.url);
    //   return NextResponse.redirect(unauthorizedUrl);
    // }
  }

  const handleI18nRouting = createIntlMiddleware(routing);
  return handleI18nRouting(request);
}

export const config = {
  // Le matcher s'applique à tous les chemins SAUF ceux qui commencent par :
  // - api/ (Routes API)
  // - trpc/ (Routes tRPC)
  // - _next/ (Fichiers internes de Next.js)
  // - _vercel/ (Fichiers de déploiement Vercel)
  // - images/ (Votre dossier d'images)
  // Et SAUF les chemins qui contiennent un point (ex: favicon.ico, logo.png, photo.jpg),
  // ce qui exclut toutes les images et autres fichiers statiques.
  matcher: [
    "/((?!api|trpc|_next|_vercel|images|.*\\..*).*)",
  ],
};

/*
 *const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/dashboard/auth"); // Si pas de session, on renvoie vers la page de connexion
  }
 * */
