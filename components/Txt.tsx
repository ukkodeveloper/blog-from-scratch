import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TxtProps<C extends React.ElementType> {
  as?: C;
  color?: keyof typeof COLOR_VARIANT;
  fontSize?: keyof typeof SIZE_VARIANT;
}

const Txt = <C extends React.ElementType = 'p'>({
  as,
  color = 'black',
  fontSize,
  className,
  ...props
}: TxtProps<C> & Omit<React.ComponentProps<C>, keyof TxtProps<C>>) => {
  const Component = as || 'p';
  return (
    <Component
      className={twMerge(
        COLOR_VARIANT[color],
        fontSize && SIZE_VARIANT[fontSize],
        className
      )}
      {...props}
    />
  );
};

export default Txt;

const SIZE_VARIANT = {
  '2xl': 'md:text-3xl text-2xl font-bold',
  xl: 'md:text-2xl text-xl font-bold',
  lg: 'md:text-xl text-lg font-bold',
  md: 'text-base',
  sm: 'text-sm',
};

const COLOR_VARIANT = {
  black: 'text-primary',
  neutral: 'text-neutral-500',
};
