import { CSSProperties, useCallback, useRef, useState } from "react";
import { RegionId } from "./logic/api";
import { StateT } from "./State";
import { Card } from "./Card";

type Props = {
  state: StateT;
  regionId: RegionId;
  onClick: () => void;
  onDoubleClick: () => void;
  onLongPress: () => void;
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

  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressDuration = 500; // milliseconds

  const longPress = props.onLongPress;
  const handleMouseDown = useCallback(() => {
    longPressTimer.current = setTimeout(() => {
      longPress();
    }, longPressDuration);
  }, [longPress]);

  const handleMouseUp = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    setIsHovered(false);
  }, []);

  return (
    <div
      style={{
        ...boxContainerStyle,
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={props.onClick}
      onDoubleClick={props.onDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
