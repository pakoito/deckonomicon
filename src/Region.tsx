import { CSSProperties, useState } from "react";
import { CardState, RegionId } from "./logic/api";
import { StateT } from "./State";

type Props = {
  state: StateT;
  regionId: RegionId;
  onClick: () => void;
  onDoubleClick: () => void;
};

const Region = (props: Props) => {
  const region = props.state.regions[props.regionId]!;

  const topCardId =
    region.deck.length === 0 ? null : region.deck[region.deck.length - 1];

  const topCard = topCardId ? props.state.cards[topCardId] ?? null : null;

  const [isHovered, setIsHovered] = useState(false);
  const borderRadius = 16;
  const distance = 12;
  const innerRadius = borderRadius - distance;

  const boxContainerStyle: CSSProperties = {
    width: "250px",
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #3498db",
    borderRadius: `${borderRadius}px`,
    opacity: isHovered ? 0.5 : 1,
    transition: "all 0.3s ease",
    padding: `${distance}px`,
  };

  const innerRectangleStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: `${innerRadius}px`,
    transition: "opacity 0.3s ease",
  };

  function makeCard(topCard: CardState) {
    const face =
      topCard.facing === "front" ? topCard.card.front : topCard.card.back;
    switch (face.ctype) {
      case "text":
        return <div>{face.text}</div>;
      case "image-local":
        return <img alt={topCard.card.hover} src={face.blob}></img>;
      case "image-remote":
        return (
          <img
            style={innerRectangleStyle}
            alt={topCard.card.hover}
            src={face.url}
          ></img>
        );
      default:
        return <div>Unknown card type: {face}</div>;
    }
  }

  return (
    <div
      style={{
        ...boxContainerStyle,
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
    >
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#3498db",
          padding: "2px 6px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        {region.region.label}
      </div>
      <div style={innerRectangleStyle}>{topCard && makeCard(topCard)}</div>
    </div>
  );
};

export default Region;
