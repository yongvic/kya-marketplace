import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Le matcher s'applique à tous les chemins SAUF ceux qui commencent par :
  // - api/ (Routes API)
  // - trpc/ (Routes tRPC)
  // - _next/ (Fichiers internes de Next.js)
  // - _vercel/ (Fichiers de déploiement Vercel)
  // - images/ (Votre dossier d'images)
  // Et SAUF les chemins qui contiennent un point (ex: favicon.ico, logo.png, photo.jpg), 
  // ce qui exclut toutes les images et autres fichiers statiques.
  matcher: ['/((?!api|trpc|_next|_vercel|images|.*\\..*).*)'],
};