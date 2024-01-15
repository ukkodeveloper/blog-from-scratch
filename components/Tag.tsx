import Link from 'next/link';

interface TagProps {
  name: string;
  link?: string;
  shape?: keyof typeof VARIANT;
}

const Tag = ({ name, link, shape = 'FULL' }: TagProps) => {
  const className = `border border-2 border-neutral-800 px-3 py-1 text-xs ${VARIANT[shape]}`;

  return link ? (
    <Link href={link} className={className}>
      {name}
    </Link>
  ) : (
    <span className={className}>{name}</span>
  );
};

export default Tag;

const VARIANT = {
  SQUARE: 'rounded-md hover:bg-primary-200',
  FULL: 'rounded-full hover:bg-neutral-200',
};
