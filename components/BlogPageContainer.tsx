import { ReactNode } from 'react';
import NavBar from './NavBar';
import BottomNav from './BottomNav';

interface Props {
  children: ReactNode;
}

export default function BlogPageContainer({ children }: Props) {
  return (
    <main className="relative h-[100svh] min-h-screen overflow-y-auto">
      <div className="w-max-[650px] mx-auto w-screen px-10 py-4">
        {children}
      </div>
      <BottomNav />
    </main>
  );
}
