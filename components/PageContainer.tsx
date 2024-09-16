import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <main className="h-[100svh] overflow-y-auto">
      <div className="relative mx-auto h-max min-h-screen max-w-[650px] space-y-6 px-3">
        {children}
      </div>
    </main>
  );
}
