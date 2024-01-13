import './globals.css';
import Header from '@/components/Header';
import { gmarketSans, wantedSans } from '@/styles/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${wantedSans.variable} ${gmarketSans.variable}`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
