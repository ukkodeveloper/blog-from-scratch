import Link from 'next/link';
import React from 'react';
import { TagIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <nav className="m-auto flex w-full max-w-screen-lg justify-end gap-4 p-2 px-6 text-primary">
      <Link href={'/series'}>
        <RectangleStackIcon className="h-7 w-7 text-primary" />
      </Link>
      <Link href={'/tags'}>
        <TagIcon className="h-7 w-7 text-primary" />
      </Link>
    </nav>
  );
};

export default Header;
