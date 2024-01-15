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
        primary: { ...colors.green, DEFAULT: colors.green[600] },
        neutral: { ...colors.zinc, DEFAULT: colors.zinc[500] },
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
