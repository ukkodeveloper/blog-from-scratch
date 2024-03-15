import type { ReactNode } from 'react';
import Txt from '@/components/Txt';

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative inline-block w-fit py-2">
      <span
        aria-disabled
        className="absolute left-5 top-3 w-full rotate-3 rounded-bl-[45%] rounded-br-[59%] rounded-tl-[32%] rounded-tr-[40%] bg-primary-200 p-5 opacity-50 md:p-6"
      ></span>
      <Txt as="h2" fontSize="xl" className="relative inline-block">
        {children}
      </Txt>
    </div>
  );
};

export default Title;
