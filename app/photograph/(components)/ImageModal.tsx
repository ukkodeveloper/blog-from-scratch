'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowDownOnSquareStackIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';

interface ImageModalProps {
  src: string;
  close: () => void;
  isOpen: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, close, isOpen }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    close();
  };

  return (
    <>
      <div
        className="pointer-events-auto fixed inset-0 z-10 bg-black bg-opacity-90"
        onClick={close}
      />

      <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center">
        <div className="pointer-events-auto relative max-h-[90vh] max-w-[90vw]">
          <Image
            src={src}
            onLoad={() => {
              setIsLoaded(true);
            }}
            alt="Modal image"
            className="max-h-[80vh] w-auto rounded-lg object-contain"
            width={1200}
            height={800}
          />
        </div>

        {isLoaded && (
          <div className="pointer-events-auto absolute top-10 z-30 flex w-full justify-center gap-6">
            <button
              type="button"
              onClick={handleDownload}
              className="text-white"
            >
              <ArrowDownOnSquareStackIcon width={30} height={30} />
            </button>
            <button className="text-white" onClick={close}>
              <ArrowUturnLeftIcon width={30} height={30} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageModal;
