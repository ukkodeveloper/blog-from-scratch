import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="mx-auto my-6 h-max min-h-screen  max-w-screen-lg px-3 sm:my-10 sm:px-4">
      {children}
    </main>
  );
}
