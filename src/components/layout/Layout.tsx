import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full h-24' />
      <div className='p-8 absolute top-0 w-full'>{children}</div>
    </div>
  );
};

export default Layout;
