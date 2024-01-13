import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');
import colors from 'tailwindcss/colors';
import { wantedSans } from '@/styles/fonts';

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
        primary: colors.green,
        neutral: colors.zinc,
      },
      fontFamily: {
        wSans: ['var(--font-wanted)', ...fontFamily.sans],
        gSans: ['var(--font-gmarket)', ...fontFamily.sans],
      },
      typography: require('./typography'),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
