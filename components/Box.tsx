import type { PolymorphicComponentProp } from '@/app/types/polymorphic';
import { twMerge } from 'tailwind-merge';

export const Box = <C extends React.ElementType = 'span'>({
  as,
  children,
  className,
}: PolymorphicComponentProp<C, { className?: string }>) => {
  const Component = as || 'div';

  return (
    <Component
      className={twMerge(
        'relative space-y-4 rounded-xl bg-neutral-100 p-4',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Box;
