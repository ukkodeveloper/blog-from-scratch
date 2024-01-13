import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/images/hero.png"
        alt="Vercel Logo"
        fill
        priority
        className="z-0 opacity-50"
      />
    </main>
  );
}
