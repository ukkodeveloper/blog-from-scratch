import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TxtProps<C extends React.ElementType> {
  as?: C;
  color?: keyof typeof COLOR_VARIANT;
  fontSize?: keyof typeof SIZE_VARIANT;
}

const Txt = <C extends React.ElementType = 'span'>({
  as,
  color = 'black',
  fontSize,
  className,
  ...props
}: TxtProps<C> & Omit<React.ComponentProps<C>, keyof TxtProps<C>>) => {
  const Component = as || 'span';
  return (
    <Component
      className={twMerge(
        className,
        COLOR_VARIANT[color],
        fontSize && SIZE_VARIANT[fontSize]
      )}
      {...props}
    />
  );
};

export default Txt;

const SIZE_VARIANT = {
  '2xl': 'xl:text-6xl md:text-5xl text-4xl font-bold',
  xl: 'xl:text-5xl md:text-4xl text-3xl font-bold',
  lg: 'xl:text-4xl md:text-3xl text-2xl font-bold',
  md: 'xl:text-3xl md:text-2xl text-xl',
  p: '',
};

const COLOR_VARIANT = {
  black: 'text-black',
  white: 'text-white',
  neutral: 'text-neutral',
  primary: 'text-primary',
};