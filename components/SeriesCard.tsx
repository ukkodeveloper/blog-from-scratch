import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Link from 'next/link';
import Image from 'next/image';
import Txt from './Txt';

interface SeriesCardProps {
  imgSrc: StaticImport;
  title: string;
  itemCount: number;
}

const SeriesCard = ({ imgSrc, title, itemCount }: SeriesCardProps) => {
  return (
    <Link
      href="/"
      className="mb-4 max-w-64 flex-shrink-0 space-y-4 overflow-hidden rounded-md p-4 shadow-lg md:max-w-xs"
    >
      <Image className="w-full rounded-lg " src={imgSrc} alt="Article image" />
      <Txt fontSize="md" as="h3">
        {title}
      </Txt>
      <Txt fontSize="sm" color="neutral" as="p" className="text-right">
        아티클 {itemCount}개
      </Txt>
    </Link>
  );
};

export default SeriesCard;
