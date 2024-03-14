import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="px-10">{children}</div>;
};

export default Layout;
