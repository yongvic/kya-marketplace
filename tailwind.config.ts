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
      // Animations personnalisées
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'slide': 'slide 20s linear infinite',
        'orbit': 'spin 20s linear infinite',
      },
      borderRadius: {
        'wave': '100%'
      },
      // Keyframes personnalisés
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reverse-spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)'},
        },
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      // Backgrounds personnalisés
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
