import { Box, Image } from "@chakra-ui/react";
import { useState } from "react";

export type Props = {
  height: number;
  row: number;
  column: number;
  url: string;
  rows: number;
  columns: number;
};

const defaultRatio = 2.5 / 3.5;

const CardsheetImage = (props: Props) => {
  const { height, row, column, url, rows, columns } = props;

  const [hasLoaded, setHasLoaded] = useState(false);
  const [{ imageWidth, imageHeight }, setImageSize] = useState({
    imageWidth: 0,
    imageHeight: 0,
  });

  const cardWidth = imageWidth / rows;
  const cardHeight = imageHeight / columns;
  const ratio = cardWidth / cardHeight;
  const width = height * ratio;

  const percentWidth = 100 / (rows - 1);
  const percentHeight = 100 / (columns - 1);

  const positionPercentX = row * percentWidth;
  const positionPecentY = column * percentHeight;

  return (
    <>
      {hasLoaded && (
        <Box
          backgroundImage={url}
          height={`${height}px`}
          width={`${width}px`}
          backgroundSize={`${rows * 100}%`}
          backgroundRepeat="no-repeat"
          backgroundPosition={`${positionPercentX}% ${positionPecentY}%`}
        />
      )}
      {!hasLoaded && (
        <Image
          borderRadius={"4px"}
          visibility={hasLoaded ? "hidden" : "visible"}
          src={url}
          height={`${height}px`}
          width={`${width}px`}
          fallbackSrc={`https://placehold.co/${Math.round(
            height * defaultRatio
          )}x${height}?text=Failed+to+load`}
          onLoad={(img) => {
            setHasLoaded(true);
            setImageSize({
              imageWidth: img.currentTarget.naturalWidth,
              imageHeight: img.currentTarget.naturalHeight,
            });
          }}
        />
      )}
    </>
  );
};

export default CardsheetImage;
