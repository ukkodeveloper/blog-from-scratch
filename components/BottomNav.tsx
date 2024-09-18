'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

const BottomNav = () => {
  const pathName = usePathname();
  const isBlog = pathName == '/';
  const isPhotographPage = pathName === '/photograph';

  const linkClass = (isActive: boolean) =>
    twMerge(
      'transition-color rounded-md p-2 text-xs font-semibold text-gray-700 duration-300 hover:bg-gray-800 hover:text-white md:text-sm',
      isActive ? 'bg-gray-800 text-white cursor-default' : 'cursor-pointer'
    );

  return (
    <div className="z-100 fixed bottom-4 left-5 flex items-center rounded-xl border border-neutral-200 bg-white px-2 py-1 text-xs drop-shadow-2xl">
      <Link href="/" className={linkClass(isBlog)}>
        <span className="hidden sm:inline">_blog</span>
        <span className="sm:hidden">_b</span>
      </Link>
      <span className="px-2">|</span>
      <Link
        href="/photograph"
        className={linkClass(isPhotographPage)}
        onClick={(e) => isPhotographPage && e.preventDefault()}
      >
        <span className="hidden sm:inline">_wrks</span>
        <span className="sm:hidden">_w</span>
      </Link>
      <span className="px-2">|</span>
    </div>
  );
};

export default BottomNav;
