import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

export type Props = {
  h: number;
  x: number;
  y: number;
  url: string;
  rows: number;
  columns: number;
};

const CardsheetImage = (props: Props) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [{ width, height }, setImageSize] = useState({ width: 0, height: 0 });

  const { h, x, y, url, rows, columns } = props;

  // Calculate the size of each sprite
  const spriteWidth = 100 / (rows - 1);
  const spriteHeight = 100 / (columns - 1);

  // Calculate the position of the sprite in the spritesheet
  const positionX = x * spriteWidth;
  const positionY = y * spriteHeight;

  const cardW = width / rows;
  const cardH = height / columns;

  const ratio = cardW / cardH;

  const w = h * ratio;

  return (
    <>
      {hasLoaded && (
        <Box
          backgroundImage={url}
          height={`${h}px`}
          width={`${w}px`}
          backgroundSize={`${rows * 100}%`}
          backgroundRepeat="no-repeat"
          backgroundPosition={`${positionX}% ${positionY}%`}
        />
      )}
      {!hasLoaded && (
        <Image
          visibility={"hidden"}
          src={url}
          width={`${w}px`}
          onLoad={(img) => {
            setHasLoaded(true);
            setImageSize({
              width: img.currentTarget.naturalWidth,
              height: img.currentTarget.naturalHeight,
            });
          }}
        />
      )}
    </>
  );
};

export default CardsheetImage;
