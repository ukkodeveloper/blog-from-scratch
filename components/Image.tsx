import NextImage, { ImageProps } from 'next/image';

const ImageMDX = ({ src, alt }: ImageProps) => (
  <div className="relative w-full">
    {typeof src === 'string' && !src.startsWith('/') ? (
      <NextImage
        src={`\/${src}`}
        alt={alt}
        width={0}
        height={0}
        className="object-cover"
      />
    ) : (
      <NextImage
        src={src}
        alt={alt}
        width={0}
        height={0}
        className="object-cover"
      />
    )}
  </div>
);

export default ImageMDX;
