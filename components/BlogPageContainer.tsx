import { ReactNode } from 'react';
import NavBar from './NavBar';
import BottomNav from './BottomNav';

interface Props {
  children: ReactNode;
}

export default function BlogPageContainer({ children }: Props) {
  return (
    <main className="relative h-[100svh] min-h-screen overflow-y-auto">
      <div className="mx-auto w-[650px]">{children}</div>
      <BottomNav />
    </main>
  );
}
