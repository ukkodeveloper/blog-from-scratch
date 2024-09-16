import Link from 'next/link';
import {
  HashtagIcon,
  HomeIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';

export function NavBar() {
  return (
    <nav className="top-4 z-10 my-4 flex w-full justify-end space-x-2">
      <Link
        href={'/series'}
        className="flex h-8 w-8  items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60 md:h-10 md:w-10"
      >
        <RectangleGroupIcon width="20" height="20" color="white" />
      </Link>
      <Link
        href={'/tags'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60 md:h-10 md:w-10"
      >
        <HashtagIcon width="20" height="20" color="white" />
      </Link>
      <Link
        href={'/'}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60 md:h-10 md:w-10"
      >
        <HomeIcon width="20" height="20" color="white" />
      </Link>
    </nav>
  );
}

export default NavBar;
