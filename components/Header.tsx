import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';
import { TagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-700/30 backdrop-blur-lg backdrop-filter ">
      <nav className="laptop:py-2.5 m-auto flex max-w-screen-xl items-end justify-between px-6 py-2">
        <Link href="/">
          <Image alt="로고" src={logo} className="w-44 xl:w-56" />
        </Link>
        <div className="flex items-end gap-4 text-neutral-50">
          <Link href="/" className=" border-spacing-1.5 rounded-lg pb-1">
            <TagIcon className="h-6 w-6 text-neutral-50" />
          </Link>
          <Link href="/" className=" border-spacing-1.5 rounded-lg pb-1">
            <MagnifyingGlassIcon className="h-6 w-6 text-neutral-50" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
