import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';
import { TagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-700/30 backdrop-blur-lg backdrop-filter ">
      <nav className="m-auto flex max-w-screen-laptop items-end justify-between px-6 py-2 laptop:py-2.5">
        <Link href="/">
          <Image alt="로고" src={logo} className="w-44 laptop:w-56" />
        </Link>
        <div className="flex items-end gap-4 text-neutral-50">
          <Link href="/">만들기</Link>
          <Link href="/">학습하기</Link>
          <Link href="/">회고하기</Link>
          <Link href="/" className=" border-spacing-1.5 rounded-lg pb-1">
            <TagIcon className="h-5 w-5 text-neutral-50" />
          </Link>
          <Link href="/" className=" border-spacing-1.5 rounded-lg pb-1">
            <MagnifyingGlassIcon className="h-5 w-5 text-neutral-50" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
