import type { ReactNode } from 'react';
import Txt from '@/components/Txt';

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative inline-block w-fit py-2">
      <span
        aria-disabled
        className="absolute left-0.5 top-1 w-[110%] rotate-3 rounded-bl-[45%] rounded-br-[59%] rounded-tl-[32%] rounded-tr-[40%] bg-primary-600 p-5 opacity-50 md:p-6"
      ></span>
      <Txt as="h2" fontSize="xl" className="relative inline-block text-white">
        {children}
      </Txt>
    </div>
  );
};

export default Title;
