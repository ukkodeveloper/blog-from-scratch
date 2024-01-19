import Link from 'next/link';
import Image from 'next/image';
import Txt from './Txt';
import { getPostsBySeries, seriesMap } from '@/lib/utils/posts';

interface SeriesCardProps {
  series: string;
}

const SeriesCard = ({ series }: SeriesCardProps) => {
  const itemCount = getPostsBySeries(series).length;

  return (
    <Link
      href={`/series/${series}`}
      className="group relative min-h-24 items-center overflow-hidden rounded-md shadow-lg"
    >
      <Image
        className="absolute w-full rounded-lg object-cover opacity-80 brightness-75 group-hover:blur-sm group-hover:brightness-50 md:-top-8"
        src={`/images/series/${series.toLowerCase()}.png`}
        alt="Picture of the article"
        sizes="100vw"
        width={500}
        height={500}
      />

      <Txt
        fontSize="lg"
        as="h3"
        color="white"
        className="absolute -left-0.5 -top-1.5"
      >
        {series}
      </Txt>
      <Txt
        fontSize="sm"
        color="white"
        as="p"
        className="absolute bottom-2 right-2 z-10 hidden rounded-lg border-2 border-white px-2 py-1 group-hover:block"
      >
        아티클 {itemCount}개
      </Txt>
    </Link>
  );
};

export default SeriesCard;
