import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className="flex items-center justify-between bg-neutral-800 px-1 py-2.5 lg:py-3.5">
        <Link className="inline-block " href={'/tech/example'}>
          <Image
            alt={'로고'}
            src={'/logo.svg'}
            width={144}
            height={25.88}
            className="w-32 lg:w-48"
          />
        </Link>
        <div className="flex items-end gap-4 text-xs font-light text-neutral-50 lg:text-base">
          <Link href={'/tech/example'}>블로그</Link>
          <Link href={'/tech/example'}>나에 대해</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
