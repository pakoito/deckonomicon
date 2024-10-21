import { CardState } from "./logic/api";
import { Text } from "@chakra-ui/react";

export type Props = {
  cardState: CardState;
};

export const Card = (props: Props) => {
  const { cardState } = props;
  const innerRectangleStyle = {
    width: "100%",
    height: "100%",
  };
  const face =
    cardState.facing === "front" ? cardState.card.front : cardState.card.back;
  switch (face.content.ctype) {
    case "text":
      return (
        <Text
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {face.content.text}
        </Text>
      );
    case "image-local":
      return <img alt={face.hover} src={face.content.blob}></img>;
    case "image-remote":
      return (
        <img
          style={innerRectangleStyle}
          alt={face.hover}
          src={face.content.url}
        ></img>
      );
    default:
      return <div>Unknown card type: {face.content}</div>;
  }
};
