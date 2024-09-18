import { ReactNode } from 'react';

import BottomNav from './BottomNav';

interface Props {
  children: ReactNode;
}

export default function BlogPageContainer({ children }: Props) {
  return (
    <main className="relative h-[100svh] min-h-screen overflow-y-auto">
      <div className="mx-auto w-screen max-w-[650px] px-3 py-4">{children}</div>
      <BottomNav />
    </main>
  );
}
