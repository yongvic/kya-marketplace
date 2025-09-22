
// src/lib/resources-data.ts

// Define a generic type for a translation function.
type TFunction = (key: string) => string;

// Base data for resources. This contains non-translatable information
// like IDs, links, and image URLs, along with keys for the translatable content.
const resourcesBaseData = [
  {
    id: 1,
    categoryKey: "documentation",
    link: "/docs/installation",
    imageUrl: "/im.jpg",
  },
  {
    id: 2,
    categoryKey: "video",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    imageUrl: "/images.jpeg",
  },
  {
    id: 3,
    categoryKey: "tutorial",
    link: "/tutorials/customize-dashboard",
    imageUrl: "/images2.jpeg",
  },
  // ... more resource data
];

/**
 * Merges the base resource data with translated content.
 * @param t - The translation function from `useTranslations`.
 * @returns An object containing the fully internationalized list of resources and categories.
 */
export const getResourcesData = (t: TFunction) => {
  // Map over the base data and add the translated title, description, and category.
  const resources = resourcesBaseData.map((resource, index) => ({
    ...resource,
    title: t(`resources.${index}.title`),
    description: t(`resources.${index}.description`),
    category: t(`categories.${resource.categoryKey}`),
  }));

  // Create a list of translated category names for filtering.
  const categories = [
    t('categories.all'),
    t('categories.documentation'),
    t('categories.video'),
    t('categories.tutorial'),
  ];

  return { resources, categories };
};
