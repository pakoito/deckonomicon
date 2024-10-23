import { Image } from "@chakra-ui/react";
import * as iawk from "./../assets-tts/iawk.json";
import { parseDecksTTS } from "./tts";
import { useState } from "react";

const decks = parseDecksTTS(iawk);

const TTSImage = () => {
  const { FaceURL, NumWidth, NumHeight } = decks[0];
  const [x, y] = [0, 0];
  const [{ width, height }, setImageSize] = useState({ width: 0, height: 0 });

  // Calculate the size of each sprite
  const spriteWidth = width / NumWidth;
  const spriteHeight = height / NumHeight;

  // Calculate the position of the sprite in the spritesheet
  const positionX = x * spriteWidth;
  const positionY = y * spriteHeight;

  return (
    <>
      <a href={FaceURL} target="_blank" rel="noopener noreferrer">
        {`[${NumWidth}, ${NumHeight}] - [${spriteWidth}, ${spriteHeight}] - [${positionX}, ${positionY}]`}
      </a>
      <Image
        src={FaceURL}
        width={"100%"}
        height={spriteHeight}
        alt={`Sprite at position (${x}, ${y})`}
        onLoad={(img) => {
          setImageSize({
            width: img.currentTarget.naturalWidth,
            height: img.currentTarget.naturalHeight,
          });
        }}
        objectFit="none"
        objectPosition={`-${positionX}px -${positionY}px`}
      />
    </>
  );
};

export default TTSImage;
