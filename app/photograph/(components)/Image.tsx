'use client';

import Image from 'next/image';
import ImageModal from './ImageModal';
import { useState } from 'react';

interface Props {
  image: string;
}

const ImageWithModal = ({ image }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      key={image}
      className="group relative flex w-full flex-shrink-0"
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true);
        }
      }}
    >
      <Image
        width={650}
        height={1400}
        src={image}
        alt={`Gallery image ${image}`}
        className="w-full object-cover transition duration-500 group-hover:scale-90"
      />
      {isOpen && (
        <ImageModal
          src={image}
          isOpen={isOpen}
          close={() => {
            console.log(isOpen);
            setIsOpen(false);
          }}
        />
      )}
    </button>
  );
};

export default ImageWithModal;
