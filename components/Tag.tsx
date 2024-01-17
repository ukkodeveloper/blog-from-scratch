import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface TagProps {
  name: string;
  selected?: boolean;
  link?: string;
  shape?: keyof typeof VARIANT;
}

const Tag = ({ name, link, selected = false, shape = 'FULL' }: TagProps) => {
  const className = `border border-2 border-neutral-800 px-1 py-0.5 text-[10px] my-1 mr-0.5 ${VARIANT[shape]}`;

  return link ? (
    <Link
      href={link}
      className={twMerge(className, selected && 'bg-neutral-800 text-white')}
    >
      {name}
    </Link>
  ) : (
    <span className={className}>{name}</span>
  );
};

export default Tag;

const VARIANT = {
  SQUARE: 'rounded-md hover:bg-primary-300',
  FULL: 'rounded-full hover:bg-yellow-300',
};
