import Link from 'next/link';
import Image from 'next/image';
import Txt from './Txt';
import { getPostsBySeries, seriesMap } from '@/lib/posts';

interface SeriesCardProps {
  series: string;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  const itemCount = getPostsBySeries(series).length;

  return (
    <Link
      href={`/series/${series}`}
      className="mb-4 max-w-64 flex-shrink-0 space-y-4 overflow-hidden rounded-md p-4 shadow-lg md:max-w-xs"
    >
      <Image
        className="w-full rounded-lg "
        src={`/images/series/${series.toLowerCase()}.png`}
        width={0}
        height={0}
        sizes="100vw"
        alt="Article image"
      />
      <Txt fontSize="md" as="h3">
        {series}
      </Txt>
      <Txt fontSize="sm" color="neutral" as="p" className="text-right">
        아티클 {itemCount}개
      </Txt>
    </Link>
  );
};

export default SeriesCard;
