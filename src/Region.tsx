import { CSSProperties } from "react";
import { RegionId } from "./logic/api";
import { StateT } from "./State";
import { Card } from "./Card";

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

  return (
    <div
      style={{
        ...boxContainerStyle,
        position: "relative",
      }}
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
          borderRadius: "4px",
        }}
      >
        {region.region.label}
      </div>

      <div style={innerRectangleStyle}>
        {topCard && <Card cardState={topCard} />}
      </div>
    </div>
  );
};

export default Region;
