'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function BackgroundChangeUtil() {
  const pathName = usePathname();
  const isPhotograph = pathName.includes('/photograph');

  useEffect(() => {
    document.body.style.backgroundColor = isPhotograph ? '#000' : '#fff';
    document.body.style.backgroundColor = isPhotograph ? '#000' : '#fff';
  }, [isPhotograph]);

  return <></>;
}

export default BackgroundChangeUtil;
