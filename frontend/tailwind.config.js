/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FFD700",
        "bg": "#0D0D0D",
        "bg-secondary": "#1A1A1A",
        "text": "#F5F5F5",
        "text-muted": "#A0A0A0",
        "muted": "#A0A0A0",
        "accent": "#C0C0C0",
        "glass-border": "rgba(255,255,255,0.1)",
      },
      fontFamily: {
        "orbitron": ["Orbitron", "sans-serif"],
        "montserrat": ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, #0D0D0D, rgba(13,13,13,0.7), transparent)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade': 'fadeIn 0.8s ease forwards',
      },
      boxShadow: {
        'primary': '0 0 30px rgba(255, 215, 0, 0.3)',
        'primary-sm': '0 0 15px rgba(255, 215, 0, 0.2)',
      },
    },
  },
  plugins: [],
}
