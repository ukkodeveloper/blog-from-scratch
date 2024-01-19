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
    <section className="m-auto my-10 flex animate-slideDown flex-col items-center space-y-10 border-b-2">
      <Txt fontSize="sm" className="lowercase">
        {category}
      </Txt>
      <Txt fontSize="2xl" className="uppercase" as="h1">
        {currentValue}
      </Txt>
      <BadgesContainer>{children}</BadgesContainer>
    </section>
  );
};

export default BadgeListLayout;
