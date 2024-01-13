import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className="flex items-center bg-neutral-800 px-1 py-2.5 lg:py-3.5">
        <Link className="inline-block " href={'/tech/example'}>
          <Image
            alt={'로고'}
            src={'/logo.png'}
            width={192}
            height={100}
            className="w-32 lg:w-48"
          />
        </Link>
        <Link className="inline-block" href={'/tech/example'}>
          블로그
        </Link>
      </nav>
    </header>
  );
};

export default Header;
