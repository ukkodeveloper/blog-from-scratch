import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="m-auto h-max  min-h-screen max-w-screen-xl px-6">
      {children}
    </main>
  );
}
