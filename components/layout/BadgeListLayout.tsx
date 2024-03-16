import type { ReactNode } from 'react';
import Txt from '@/components/Txt';
import BadgesContainer from '@/components/BadgesContainer';

interface BadgeListLayoutProps {
  category: string;
  currentValue: string;
  children: ReactNode;
}

const BadgeListLayout = ({
  category,
  currentValue,
  children,
}: BadgeListLayoutProps) => {
  return (
    <section className="mx-auto mt-24  flex flex-col items-center space-y-16 pb-10">
      <Txt fontSize="sm" className="animate-slideDown lowercase">
        {category}
      </Txt>
      <Txt fontSize="2xl" className="animate-slideDown uppercase" as="h1">
        {currentValue}
      </Txt>
      <div className="px-2">
        <BadgesContainer>{children}</BadgesContainer>
      </div>
    </section>
  );
};

export default BadgeListLayout;
