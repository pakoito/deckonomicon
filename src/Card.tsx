import { Tooltip } from "@chakra-ui/react";
import { CardState } from "./logic/api";

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
  const tooltipProps = {
    label: cardState.card.label,
  };
  switch (face.ctype) {
    case "text":
      return (
        <Tooltip {...tooltipProps}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {face.text}
          </div>
        </Tooltip>
      );
    case "image-local":
      return (
        <Tooltip {...tooltipProps}>
          <img alt={cardState.card.hover} src={face.blob}></img>
        </Tooltip>
      );
    case "image-remote":
      return (
        <Tooltip {...tooltipProps}>
          <img
            style={innerRectangleStyle}
            alt={cardState.card.hover}
            src={face.url}
          ></img>
        </Tooltip>
      );
    default:
      return <div>Unknown card type: {face}</div>;
  }
};
