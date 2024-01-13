import localFont from 'next/font/local';

export const wantedSans = localFont({
  src: './fonts/WantedSansStd-Regular.ttf',
  display: 'block',
  variable: '--font-wanted',
});

export const gmarketSans = localFont({
  src: [
    {
      path: './fonts/GmarketSansTTFBold.ttf',
      weight: '700',
    },
    {
      path: './fonts/GmarketSansTTFMedium.ttf',
      weight: '500',
    },
    {
      path: './fonts/GmarketSansTTFLight.ttf',
      weight: '300',
    },
  ],
  display: 'block',
  variable: '--font-gmarket',
});
