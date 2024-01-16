import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import { screens } from 'tailwindcss/defaultTheme';

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
        primary: { ...colors.blue, DEFAULT: colors.blue[600] },
        neutral: { ...colors.zinc, DEFAULT: colors.zinc[500] },
      },
      fontFamily: {
        wSans: ['var(--font-wanted)', ...fontFamily.sans],
        gSans: ['var(--font-gmarket)', ...fontFamily.sans],
      },
      animation: {
        slideDown: 'slideDown 1s',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '40%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      typography: require('./typography'),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
