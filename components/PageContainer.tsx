import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="mx-auto my-10  h-max  min-h-screen max-w-screen-lg px-6">
      {children}
    </main>
  );
}
