import Link from 'next/link';

const Header = () => {
  return (
    <header>
      <nav className="flex h-60 bg-cyan-300">
        <Link className="inline-block bg-amber-500" href={'/tech/example'}>
          로고
        </Link>
        <Link className="inline-block" href={'/tech/example'}>
          블로그
        </Link>
      </nav>
    </header>
  );
};

export default Header;
