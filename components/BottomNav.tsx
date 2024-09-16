'use client';

import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';

const BottomNav = () => {
  const segments = useSelectedLayoutSegments();
  const isWrks = segments.includes('photograph');

  return (
    <div className="z-100 fixed bottom-5 left-10 flex border-spacing-1 gap-3 rounded-xl border-neutral-300 bg-white p-4 drop-shadow-2xl">
      <Link
        href="/"
        className={`text-sm font-semibold ${isWrks ? 'text-gray-700' : 'bg-neutral-800 text-white'}`}
      >
        _blog
      </Link>
      <span className="px-2">|</span>
      <Link
        href="/photograph"
        className={`text-sm font-semibold ${isWrks ? 'bg-neutral-800 text-white' : 'text-gray-700'}`}
      >
        _wrks
      </Link>
      <span className="px-2">|</span>
    </div>
  );
};

export default BottomNav;
