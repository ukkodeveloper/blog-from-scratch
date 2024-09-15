import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_VARIANT;
  size?: keyof typeof SIZE_VARIANT;
}

const Button = ({
  size = 'md',
  variant = 'outline',
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        base,
        SIZE_VARIANT[size],
        BUTTON_VARIANT[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

const base = 'px-4 py-2 rounded-md flex';

const SIZE_VARIANT = {
  lg: 'px-4 py-2 text-lg',
  md: 'px-3 py-1.5 text-md',
  sm: 'px-2 py-1 text-sm',
};

const BUTTON_VARIANT = {
  outline:
    'border border-primary text-primary hover:bg-primary-600 hover:text-white ',
  ghost: 'text-primary hover:bg-primary-50',
};
