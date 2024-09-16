import { ReactNode } from 'react';
import Txt from '@/components/Txt';
import Link from 'next/link';

interface Props {
  title: string;
  children: ReactNode;
}

export default function PhotographPageContainer({ title, children }: Props) {
  return (
    <main className="transition-color relative h-[100svh] min-h-screen  overflow-y-auto bg-black duration-500 hover:bg-white">
      <div className="transition-color w-max-[650px] group relative mx-auto w-screen px-10 duration-500 hover:bg-black">
        <Link href="/photograph">
          <Txt
            as="h2"
            fontSize="xl"
            className="transition-color group px-4 py-2 duration-500 group-hover:text-white "
          >
            {title}
          </Txt>
        </Link>
        {children}
      </div>

      <Txt
        fontSize="md"
        className="fixed bottom-4 flex w-full justify-center font-wSans text-white"
      >
        KIM YOOKWON
      </Txt>
    </main>
  );
}
