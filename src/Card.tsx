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
  switch (face.ctype) {
    case "text":
      return (
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
      );
    case "image-local":
      return <img alt={cardState.card.hover} src={face.blob}></img>;
    case "image-remote":
      return (
        <img
          style={innerRectangleStyle}
          alt={cardState.card.hover}
          src={face.url}
        ></img>
      );
    default:
      return <div>Unknown card type: {face}</div>;
  }
};
