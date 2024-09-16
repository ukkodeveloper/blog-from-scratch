import Link from 'next/link';
import {
  HashtagIcon,
  HomeIcon,
  RectangleGroupIcon,
} from '@heroicons/react/24/outline';

export function NavBar() {
  return (
    <nav className="sticky top-4 z-10 my-4 flex w-full justify-end space-x-2">
      <Link
        href={'/series'}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60"
      >
        <RectangleGroupIcon width="24" height="24" color="white" />
      </Link>
      <Link
        href={'/tags'}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60"
      >
        <HashtagIcon width="24" height="24" color="white" />
      </Link>
      <Link
        href={'/'}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800/30 hover:bg-neutral-800/60"
      >
        <HomeIcon width="24" height="24" color="white" />
      </Link>
    </nav>
  );
}

export default NavBar;
