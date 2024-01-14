import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.svg';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-800 py-4">
      <nav className="m-auto flex max-w-screen-laptop items-center justify-between px-6  ">
        <Link className="inline-block " href={'/tech/example'}>
          <Image alt={'로고'} src={logo} className="lg:w-48 w-32" />
        </Link>
        <div className="flex gap-4 text-neutral-50">
          <Link href={'/tech/example'}>블로그</Link>
          <Link href={'/tech/example'}>나에 대해</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
