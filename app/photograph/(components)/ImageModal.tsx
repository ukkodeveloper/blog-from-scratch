import Image from 'next/image';

interface ImageModalProps {
  src: string;
  close: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, close }) => {
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
            className="max-h-[80vh] w-auto rounded-xl object-contain"
            width={1200}
            height={800}
          />
        </div>
      </div>
    </>
  );
};

export default ImageModal;
