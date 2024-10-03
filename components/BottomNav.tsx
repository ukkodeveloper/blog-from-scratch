'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';
import Txt from './Txt';

const BottomNav = () => {
  const pathName = usePathname();
  const isBlog = pathName == '/';
  const isPhotographPage = pathName === '/photograph';

  const linkClass = (isActive: boolean) =>
    twMerge(
      'transition-color rounded-xl p-1 text-xs font-semibold text-gray-700 duration-300 hover:bg-gray-200 md:text-sm',
      isActive
        ? 'bg-gray-400 cursor-default hover:bg-gray-400'
        : 'cursor-pointer'
    );

  return (
    <div className="z-100 fixed bottom-4 left-5 flex items-center rounded-xl border border-neutral-200 bg-white px-2 py-1 text-xs drop-shadow-2xl">
      <Link href="/" className={linkClass(isBlog)}>
        <Txt fontSize="sm" className="hidden sm:inline">
          _blog
        </Txt>
        <Txt fontSize="sm" className="p-0 sm:hidden">
          _b
        </Txt>
      </Link>
      <span className="px-2">|</span>
      <Link
        href="/photograph"
        className={linkClass(isPhotographPage)}
        onClick={(e) => isPhotographPage && e.preventDefault()}
      >
        <Txt fontSize="sm" className="hidden sm:inline">
          _wrks
        </Txt>
        <Txt fontSize="sm" className="p-0 sm:hidden ">
          _w
        </Txt>
      </Link>
      <span className="px-2">|</span>
    </div>
  );
};

export default BottomNav;
