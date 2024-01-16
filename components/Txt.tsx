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
  '2xl': 'xl:text-6xl  md:text-5xl text-4xl font-bold',
  xl: 'xl:text-4xl md:text-3xl text-2xl font-bold',
  lg: 'xl:text-3xl text-2xl font-bold',
  md: 'xl:text-xl text-lg font-bold',
  sm: 'text-sm font-light',
};

const COLOR_VARIANT = {
  black: 'text-black',
  white: 'text-white',
  neutral: 'text-neutral',
  primary: 'text-primary',
};
