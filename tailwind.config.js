/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  safelist: [
    {
      pattern: /etbuy-/,
    },
  ],
  theme: {
    extend: {
      colors: {
        'topbar-bg': '#be4646',
        'etbuy-red-light': '#ff7676',
        'etbuy-red-dark': '#ee5858',
        'etbuy-red-darken': '#d9534f',
        'etbuy-white-transparent': 'rgba(255, 255, 255, 0.95)',
        'etbuy-white-transparent-light': 'rgba(255, 255, 255, 0.2)',
        'etbuy-white-transparent-hover': 'rgba(255, 255, 255, 0.3)',
        'etbuy-white-transparent-border': 'rgba(255, 255, 255, 0.8)',
        'etbuy-gray-placeholder': 'rgba(238, 88, 88, 0.6)',
        'soft-peach': '#f4c6c6',
        'light-salmon': '#fdbdbd',
        'etbuy-blue': '#2484C2',
        'etbuy-orange': '#FA8232',
        'etbuy-creamywhite': '#FDEDE8',
        'custom-etbuy-red-dark': '#8b0000',
        'etbuy-white': '#fff1f1',
        'etbuy-black': '#21201f', 
        'etbuy-dark-glass': 'rgba(0, 0, 0, 0.5)',
        'etbuy-telegram': '#006699',
        'etbuy-whatsapp': '#1ebe5d',
        'etbuy-dark-border': 'rgba(255, 255, 255, 0.15)',
        'etbuy-text-light': 'rgba(255, 255, 255, 0.95)',
        'etbuy-text-muted': 'rgba(255, 255, 255, 0.75)',
      },
      backgroundImage: {
        'etbuy-promo-background': 'linear-gradient(135deg, #7f0a0a, #4a0000)',
      },
      boxShadow: {
        'etbuy-light': '0 8px 32px rgba(238, 88, 88, 0.15)',
        'etbuy-light-hover': '0 12px 36px rgba(238, 88, 88, 0.2)',
        'etbuy-icon-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'etbuy-button': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'etbuy-footer-glow': '0 -4px 10px rgba(238, 88, 88, 0.25)',
      },
      borderRadius: {
        'logo': '32.5px 0 0 0',
        'full': '9999px',
        'footer': '12px',
      },
      height: {
        'topbar': '120px',
        'topbar-sm': '100px',
        'topbar-mobile': '140px',
        'topbar-sm-mobile': '160px',
        'search-bar': '50px',
        'search-bar-mobile': '55px',
        'etbuy-logo': '63px',
      },
      width: {
        'logo': '68px',
        'logo-text': '191px',
        'search-bar-lg': '646px',
        'search-bar-md': '600px',
        'search-bar-sm': '350px',
        'icon-lg': '32px',
        'icon-md': '28px',
        'icon-sm': '24px',
        'etbuy-logo': '72px',
      },
      fontFamily: {
        'public-sans': ['Public Sans', 'sans-serif'],
      },
      transitionProperty: {
        'filter': 'filter',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'spacing': 'margin, padding',
      },
      spacing: {
        '10vh': '10vh',
        '9vh': '9vh',
        'card-w': '450px',
        'card-h': '270px',
        'gap-vh': '1vh',
        'content-px': '32px',
        'content-py': '40px',
      },
      animation: {
        shimmer: 'shimmer 3s infinite',
        'scroll-left': 'scroll-left 20s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
