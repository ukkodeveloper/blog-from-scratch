import type { Config } from 'tailwindcss';
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
        primary: colors.green,
        neutral: colors.zinc,
      },
      typography: require('./typography'),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
