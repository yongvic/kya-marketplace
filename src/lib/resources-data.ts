
export const resourcesDataEn = [
  {
    id: 1,
    title: "Quickstart: KYA Installation Guide",
    category: "Documentation",
    description: "A comprehensive guide to installing and configuring your first instance of KYA Marketplace.",
    link: "/docs/installation",
    imageUrl: "/im.jpg",
  },
  {
    id: 2,
    title: "Video: Discover Key Features",
    category: "Video",
    description: "Explore the main features of KYA in under 10 minutes.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images.jpeg",
  },
  {
    id: 3,
    title: "Tutorial: Customize Your Dashboard",
    category: "Tutorial",
    description: "Learn how to tailor your dashboard for quick access to your favorite tools.",
    link: "/tutorials/customize-dashboard",
    imageUrl: "/images2.jpeg",
  },
  {
    id: 4,
    title: "Best Practices for License Management",
    category: "Documentation",
    description: "Discover how to effectively manage software licenses for your team.",
    link: "/docs/license-management",
    imageUrl: "/images (1).jpeg",
  },
  {
    id: 5,
    title: "Webinar: Optimize Your Marketplace Sales",
    category: "Video",
    description: "A recording of our latest webinar with industry experts.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/im.jpg",
  },
  {
    id: 6,
    title: "Tutorial: Integrating with Third-Party APIs",
    category: "Tutorial",
    description: "Step-by-step guide to connecting KYA with your favorite external services.",
    link: "/tutorials/api-integration",
    imageUrl: "/images.jpeg",
  },
    {
    id: 7,
    title: "Advanced User Guide",
    category: "Documentation",
    description: "Dive into the advanced features and configuration options of KYA.",
    link: "/docs/advanced-guide",
    imageUrl: "/images2.jpeg",
  },
  {
    id: 8,
    title: "Video: What's New in Version 2.0",
    category: "Video",
    description: "An overview of the latest improvements and new features of the platform.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images (1).jpeg",
  },
  {
    id: 9,
    title: "Tutorial: Create and Publish Your First Software",
    category: "Tutorial",
    description: "From creating your seller account to publishing your software.",
    link: "/tutorials/publishing-guide",
    imageUrl: "/im.jpg",
  },
];

export const categoriesEn = ["All", "Documentation", "Video", "Tutorial"];

export const resourcesDataFr = [
  {
    id: 1,
    title: "Démarrage rapide : Guide d'installation de KYA",
    category: "Documentation",
    description: "Un guide complet pour installer et configurer votre première instance de KYA Marketplace.",
    link: "/docs/installation",
    imageUrl: "/im.jpg",
  },
  {
    id: 2,
    title: "Vidéo : Découverte des fonctionnalités clés",
    category: "Vidéo",
    description: "Explorez les fonctionnalités principales de KYA en moins de 10 minutes.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images.jpeg",
  },
  {
    id: 3,
    title: "Tutoriel : Personnaliser votre tableau de bord",
    category: "Tutoriel",
    description: "Apprenez à adapter votre tableau de bord pour un accès rapide à vos outils préférés.",
    link: "/tutorials/customize-dashboard",
    imageUrl: "/images2.jpeg",
  },
  {
    id: 4,
    title: "Bonnes pratiques pour la gestion des licences",
    category: "Documentation",
    description: "Découvrez comment gérer efficacement les licences logicielles pour votre équipe.",
    link: "/docs/license-management",
    imageUrl: "/images (1).jpeg",
  },
  {
    id: 5,
    title: "Webinaire : Optimiser vos ventes sur la Marketplace",
    category: "Vidéo",
    description: "Un enregistrement de notre dernier webinaire avec des experts du secteur.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/im.jpg",
  },
  {
    id: 6,
    title: "Tutoriel : Intégration avec des API tierces",
    category: "Tutoriel",
    description: "Guide pas à pas pour connecter KYA à vos services externes favoris.",
    link: "/tutorials/api-integration",
    imageUrl: "/images.jpeg",
  },
    {
    id: 7,
    title: "Guide de l'utilisateur avancé",
    category: "Documentation",
    description: "Plongez dans les fonctionnalités avancées et les options de configuration de KYA.",
    link: "/docs/advanced-guide",
    imageUrl: "/images2.jpeg",
  },
  {
    id: 8,
    title: "Vidéo : Nouveautés de la version 2.0",
    category: "Vidéo",
    description: "Un aperçu des dernières améliorations et nouvelles fonctionnalités de la plateforme.",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images (1).jpeg",
  },
  {
    id: 9,
    title: "Tutoriel : Créer et publier votre premier logiciel",
    category: "Tutoriel",
    description: "De la création de votre compte vendeur à la publication de votre logiciel.",
    link: "/tutorials/publishing-guide",
    imageUrl: "/im.jpg",
  },
];

export const categoriesFr = ["Tous", "Documentation", "Vidéo", "Tutoriel"];

export const getResourcesData = (locale: string) => {
  switch (locale) {
    case 'fr':
      return { resources: resourcesDataFr, categories: categoriesFr };
    case 'en':
      return { resources: resourcesDataEn, categories: categoriesEn };
    default:
      return { resources: resourcesDataEn, categories: categoriesEn };
  }
};
