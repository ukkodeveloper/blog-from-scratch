import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  name: string;
  variant: 'TAG' | 'SERIES';
  selected?: boolean;
}

const Badge = ({ name, variant, selected = false }: BadgeProps) => {
  const baseStyle = `border border-2 border-neutral-800 px-2 py-1 text-[10px] uppercase ${SHAPE[variant]}`;
  const link =
    variant === 'TAG'
      ? encodeURI(`/tags/${name}`)
      : encodeURI(`/series/${name}`);

  return (
    <Link
      href={link}
      className={twMerge(baseStyle, selected && 'bg-neutral-800 text-white')}
    >
      {name}
    </Link>
  );
};

export default Badge;

const SHAPE = {
  TAG: 'rounded-full hover:bg-yellow-300',
  SERIES: 'rounded-md hover:bg-primary-300',
};