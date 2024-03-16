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
    <section className="m-auto flex flex-col items-center space-y-12 pb-8">
      <Txt fontSize="sm" className="animate-slideDown lowercase">
        {category}
      </Txt>
      <Txt fontSize="2xl" className="animate-slideDown uppercase" as="h1">
        {currentValue}
      </Txt>
      <BadgesContainer>{children}</BadgesContainer>
    </section>
  );
};

export default BadgeListLayout;
