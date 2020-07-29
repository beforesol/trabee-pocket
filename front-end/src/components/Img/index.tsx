import React, { useRef, useEffect } from 'react';
import { LAZY_LOAD_DEFAULT_IMAGE } from '@constants/type/image';
const IntersectionObserver = require('intersection-observer');

interface IntersectionObserverOptions {
  root?: HTMLElement;
  rootMargin?: string; // Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).
  threshold?: number | number[];
}

interface IOwnProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  isGifUsed?: boolean;
  imageratio?: number;
  setImageRef?: (ref: React.RefObject<HTMLImageElement>) => void;
  useLazyLoad?: boolean;
  lazyLoadOptions?: IntersectionObserverOptions;
  useCustomDefaultBackground?: boolean;
  imageLoadHandler?: any;
}

const Img: React.FC<IOwnProps> = ({
  src,
  fallbackSrc = LAZY_LOAD_DEFAULT_IMAGE,
  isGifUsed,
  imageratio,
  useLazyLoad,
  lazyLoadOptions,
  useCustomDefaultBackground = false,
  imageLoadHandler = null,
  ...restProps
}) => {
  const imgRef = useRef<any>(null);
  const isAvailableWindowIO = !!window.IntersectionObserver; // window IO 사용가능한지 체크, 불가능하다면 polyfill 사용

  if (isAvailableWindowIO) {
    const lazyLoadImage: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach((entry: any) => {
        const { target } = entry;

        if (entry.isIntersecting) {
          target.src = target.dataset.src;
          observer.unobserve(target);
        }
      });
    };

    useEffect(() => {
      if (useLazyLoad && imgRef) {
        const lazyLoadingIO: IntersectionObserver = isAvailableWindowIO ? new window.IntersectionObserver(lazyLoadImage, lazyLoadOptions) : IntersectionObserver(lazyLoadImage, lazyLoadOptions);

        lazyLoadingIO.observe(imgRef.current);
      }
    }, [imgRef]);
  } lazyLoadOptions;

  const imageSrc = useCustomDefaultBackground ? (src) : (src || fallbackSrc);

  const onError = () => {
    if (!useCustomDefaultBackground) imgRef.current.src = LAZY_LOAD_DEFAULT_IMAGE;
  };

  const defaultImageSrc = useCustomDefaultBackground ? '/assets/img/transparent.png' : LAZY_LOAD_DEFAULT_IMAGE;

  return (
    <img
      ref={imgRef}
      src={useLazyLoad ? defaultImageSrc : imageSrc}
      data-src={imageSrc}
      onError={onError}
      onLoad={imageLoadHandler}
      {...restProps}
    />
  );
};

export default Img;
