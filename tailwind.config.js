/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FDF1E8",
          100: "#FBE2D2",
          200: "#F6BF9F",
          300: "#F29C6C",
          400: "#ED7940",
          500: "#F0641E",
          600: "#C85218",
          700: "#A04113",
          800: "#782F0D",
          900: "#501E08",
        },
        secondary: {
          50:  '#e4eef0',
          100: '#c7dbde',
          200: '#a6c5ca',
          300: '#83aeb4',
          400: '#5c979e',
          500: '#3e7d86',  // Alternative lisible au fond
          600: '#2f616a',
          700: '#20464d',
          800: '#102f36',
          900: '#0d3640',  // Couleur originale
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-up-delay': 'fadeInUp 1s ease-out 0.3s forwards',
        'fade-in-up-delay-2': 'fadeInUp 1s ease-out 0.6s forwards',
        'fade-in-up-delay-3': 'fadeInUp 1s ease-out 0.9s forwards',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    },
  },
  plugins: [],
};