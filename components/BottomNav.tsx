import Link from 'next/link';

const BottomNav = () => {
  return (
    <div className="z-100 fixed bottom-4 left-5 flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-4 py-2 drop-shadow-2xl">
      <Link
        href="/"
        className="transition-color rounded-md p-2 text-xs font-semibold text-gray-700 duration-300 hover:bg-gray-800 hover:text-white md:text-sm"
      >
        _blog
      </Link>
      <span className="px-2">|</span>
      <Link
        href="/photograph"
        className="transition-color rounded-md p-2 text-xs font-semibold text-gray-700 duration-300 hover:bg-gray-800 hover:text-white md:text-sm"
      >
        _wrks
      </Link>
      <span className="px-2">|</span>
    </div>
  );
};

export default BottomNav;
