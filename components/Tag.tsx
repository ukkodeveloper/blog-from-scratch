import Link from 'next/link';

interface TagProps {
  name: string;
  link?: string;
  shape?: keyof typeof VARIANT;
}

const Tag = ({ name, link, shape = 'FULL' }: TagProps) => {
  const className = `border border-2 border-neutral-800 px-1 py-0.5 text-[10px] my-1 mx-0.5 ${VARIANT[shape]}`;

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
  SQUARE: 'rounded-md hover:bg-primary-300',
  FULL: 'rounded-full hover:bg-neutral-300',
};
