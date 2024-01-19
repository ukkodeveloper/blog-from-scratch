import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto max-w-xl">{children}</div>;
};

export default Layout;
