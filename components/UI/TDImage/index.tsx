import React, { ImgHTMLAttributes } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

interface ImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  useNextImage?: boolean;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  src: string | Blob;
  alt: string;
}

const TDImage: React.FC<ImageProps> = ({
  useNextImage = false,
  fill = false,
  style,
  width,
  height,
  src,
  alt,
  priority = false,
  quality = 75,
  ...props
}) => {
  if (useNextImage && typeof src === 'string') {
    return (
      <div
        style={{
          position: 'relative',
          width: width || '100%',
          height: height || 'auto',
          overflow: 'hidden',
          ...style,
        }}
      >
        <NextImage
          {...(props as NextImageProps)}
          src={src}
          alt={alt}
          fill={fill}
          priority={priority}
          width={Number(width)}
          height={Number(height)}
          quality={quality}
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        />
      </div>
    );
  }

  const imgSrc = src instanceof Blob ? URL.createObjectURL(src) : src;
  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      style={{
        width: width || '100%',
        height: height || 'auto',
        ...style,
      }}
    />
  );
};

export default TDImage;
