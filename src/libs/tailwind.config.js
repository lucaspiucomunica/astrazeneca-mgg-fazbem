/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../*",
    "../*/*"
  ],
  theme: {
    extend: {
      colors: {
        azul: {
          'principal': "#3B4B8F",
          50: "#F2F6FC",
          100: "#E2EAF7",
          200: "#CCDAF1",
          300: "#A9C3E7",
          400: "#80A4DA",
          900: "#344274",
        },
        rosa: {
          'principal': "#DD214D",
          50: "#FFF1F2",
          100: "#FEE5E7",
          200: "#FDCED5",
          500: "#F25C78",
          700: "#BA1641",
          800: "#9C153C",
        },
        'amarelo': '#F2CB05',
        'neutro': '#4F4F4F',
      },
      fontFamily: {
        'display': ['VAG Rounded Next', 'sans-serif'],
        'body': ['Roboto Flex', 'sans-serif'],
      },
      backgroundImage: {
        'hero': "url('/src/img/bg-hero.webp')",
      },
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          DEFAULT: '100%',
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '1408px',
        },
      },
      lineHeight: {
        'normal': '148%',
        'tight': '120%',
      },
    },
  },
  plugins: [],
}

