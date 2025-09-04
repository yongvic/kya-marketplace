import "next-auth";
import "next-auth/jwt";

// On déclare ce que contiendra notre token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    // Tu peux ajouter d'autres propriétés ici, comme le rôle
    // role?: 'ADMIN' | 'USER';
  }
}

// On déclare ce que contiendra notre session
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]; // Conserve les propriétés par défaut (name, email, image)
  }

  // On peut aussi étendre le type User si besoin, bien que ce soit moins courant
  interface User {
    id: string;
  }
}
