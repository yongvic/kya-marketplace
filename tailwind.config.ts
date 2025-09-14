// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // Indique à Tailwind de scanner tous les fichiers pertinents dans votre projet
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Nous laissons cette section vide car vos animations
      // et keyframes sont définis dans votre fichier CSS principal, ce qui est parfait.

      // Vous pouvez garder cette partie si vous en avez besoin ailleurs
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config