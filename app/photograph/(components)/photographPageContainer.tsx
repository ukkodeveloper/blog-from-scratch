import Txt from '@/components/Txt';
import { OverlayProvider } from '@toss/use-overlay';
import Link from 'next/link';
import { ReactNode } from 'react';

const PhotographPageContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="h-[100svh] overflow-y-hidden ">
      <div className="w-max-[650px] transition-color group duration-500 ease-in-out  hover:bg-black">
        <Link href="/photograph">
          <Txt
            as="h1"
            fontSize="2xl"
            className="transition-color group px-4 py-2 duration-500 group-hover:text-white"
          >
            {title}
          </Txt>
        </Link>
        <div className="h-[100svh] overflow-y-auto">{children}</div>
        <Txt
          fontSize="sm"
          className="absolute bottom-4 right-16 font-wSans text-white"
        >
          KIM YOOKWON
        </Txt>
      </div>
    </div>
  );
};

export default PhotographPageContainer;
