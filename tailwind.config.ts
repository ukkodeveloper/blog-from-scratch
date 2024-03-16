import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: { ...colors.neutral, DEFAULT: colors.neutral[800] },
      },
      fontFamily: {
        wSans: ['var(--font-wanted)', ...fontFamily.sans],
        gSans: ['var(--font-gmarket)', ...fontFamily.sans],
      },
      animation: {
        slideDown: 'slideDown 0.8s',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '30%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        custom: `linear-gradient(101deg, #2f4164 23.73%, #C382DA 58.12%, #F9AB4F 82.09%, #F9AB4F 82.1%, #F9AB4F 82.1%, #F9AB4F 82.11%, #FFC540 99.48%)`,
      },
      typography: require('./typography'),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
