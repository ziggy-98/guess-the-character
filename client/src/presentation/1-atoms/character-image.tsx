import React from "react";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface Props {
  url: string;
  alt: string;
}

export const CharacterImage: FC<Props> = ({ url, alt }) => {
  return (
    <div className="characterImageContainer">
      <figure>
        <LazyLoadImage src={url} alt={alt} effect={"blur"} />
        <figcaption>{alt}</figcaption>
      </figure>
    </div>
  );
};
