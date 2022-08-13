import React, { FC, useState } from "react";
import useChangeWidth from "../hooks/useChangWidth";
import LazyImage from "./LazyImage";

interface NImageProps {
  src: string;
  handleClick?: Function;
  alt: string;
}

const NImage: FC<NImageProps> = ({ src, handleClick, alt }) => {
  const [ratio, setRatio] = useState(440 / 264); // default to 16:9
  const windowSize = useChangeWidth();
  const width = windowSize > 768 ? 440 : 300;
  return (
    <LazyImage
      src={src}
      alt={alt}
      width={width}
      height={width / ratio}
      layout='fixed'
      onLoadingComplete={({ naturalWidth, naturalHeight }) =>
        setRatio(naturalWidth / naturalHeight)
      }
    />
  );
};

export default NImage;
