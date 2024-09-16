'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ImageModalProps {
  src: string;
  close: () => void;
  isOpen: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, close, isOpen }) => {
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
            alt="Modal image"
            className="max-h-[80vh] w-auto rounded-lg object-contain"
            width={1200}
            height={800}
          />
        </div>

        <div className="pointer-events-auto absolute right-5 top-5 z-30 flex gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded bg-white p-2 text-black hover:bg-neutral-300"
          >
            download
          </button>
          <button
            type="button"
            onClick={close}
            className="rounded-full bg-white p-2 text-black hover:bg-neutral-300"
          >
            <XMarkIcon width={24} height={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
