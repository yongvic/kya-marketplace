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
      // Ajout de nos animations et keyframes personnalisés
      animation: {
        'slide': 'slide 20s linear infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Vous pouvez ajouter d'autres extensions de thème ici
      // par exemple, des couleurs, des polices, etc.
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