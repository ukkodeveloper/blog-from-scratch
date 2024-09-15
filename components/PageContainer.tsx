import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="relative mx-auto my-6 h-max min-h-screen max-w-[650px] space-y-6 px-3 sm:my-10 sm:px-4">
      {children}
    </main>
  );
}
