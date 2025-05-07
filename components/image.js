import NextImage from "next/image";
import { useState, useEffect } from "react";
import placeholder from "../assets/placeholder.svg";

export default function Image({ src, style, objectFit, objectPosition, fill, width, height, ...props }) {
  const [exists, setExists] = useState(true);
  useEffect(() => setExists(true), [src]);

  let actualSrc = exists ? src : placeholder;
  const mergedStyle = {
    ...((style && typeof style === 'object') ? style : {}),
    ...(style?.objectFit ? {} : (objectFit ? { objectFit } : {})),
    ...(style?.objectPosition ? {} : (objectPosition ? { objectPosition } : {})),
  };

  return (
    <NextImage
      src={actualSrc}
      {...props}
      style={mergedStyle}
      onError={() => setExists(false)}
      {...(fill ? { fill: true } : { width, height })}
    />
  );
}
