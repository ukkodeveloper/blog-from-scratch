'use client';

import Image from 'next/image';
import ImageModal from './ImageModal';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowPathRoundedSquareIcon,
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
} from '@heroicons/react/24/outline';
import Txt from '@/components/Txt';

interface Props {
  images: string[];
}

const ImageList = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const isOpen = selectedImage !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleRandomImage = () => {
    const remainingImages = images.filter((img) => img !== selectedImage);
    const randomImage =
      remainingImages[Math.floor(Math.random() * remainingImages.length)];
    setSelectedImage(randomImage);
  };

  const handleDownload = (image: string) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = '@yookwon';
    link.click();
  };

  return (
    <div>
      {images.map((image, index) => (
        <button
          type="button"
          key={image + index}
          className="group relative flex w-full flex-shrink-0"
          onClick={() => {
            setSelectedImage(image);
          }}
        >
          <Image
            width={650}
            height={1400}
            src={image}
            alt={`Gallery image ${image}`}
            className="w-full object-cover transition duration-500 group-hover:scale-90"
          />
        </button>
      ))}

      {isOpen &&
        createPortal(
          <div className="relative">
            <div
              className="fixed inset-0 z-10 bg-black bg-opacity-90"
              onClick={() => setSelectedImage(null)}
            />
            <div className="fixed inset-0 z-20 flex items-center justify-center">
              <div className="relative max-h-[90vh] max-w-[90vw]">
                <Image
                  src={selectedImage}
                  alt="Modal image"
                  className="max-h-[80vh] w-auto rounded-xl object-contain"
                  width={1200}
                  height={800}
                />
              </div>
              <div className="absolute bottom-4 right-4 flex items-center justify-center gap-4 px-4">
                <button type="button">
                  <ArrowUturnLeftIcon
                    width={32}
                    height={32}
                    className="rounded-lg bg-white px-2 opacity-90"
                    onClick={() => setSelectedImage(null)}
                  />
                </button>

                <button type="button">
                  <ArrowDownTrayIcon
                    width={32}
                    height={32}
                    className="rounded-lg bg-white px-2 opacity-90"
                    onClick={() => handleDownload(selectedImage as string)}
                  />
                </button>

                <button type="button">
                  <ArrowPathRoundedSquareIcon
                    width={32}
                    height={32}
                    className="rounded-lg bg-white px-2 opacity-90"
                    onClick={handleRandomImage}
                  />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ImageList;
