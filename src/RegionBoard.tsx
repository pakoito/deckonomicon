import { CSSProperties } from "react";
import { Deck, CardId, RegionId } from "./logic/api";
import { Card } from "./Card";
import { Box, Flex, HStack } from "@chakra-ui/react";

export type Props = {
  state: Deck;
  regionId: RegionId;
  onClickRegion: (id: RegionId) => void;
  onClickCard: (id: RegionId, card: CardId) => void;
};

const RegionBoard = (props: Props) => {
  const region = props.state.regions[props.regionId]!;

  const borderRadius = 16;
  const distance = 12;
  const innerRadius = borderRadius - distance;

  const boxContainerStyle: CSSProperties = {
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #3498db",
    borderRadius: `${borderRadius}px`,
    backgroundColor: "white",
    transition: "all 0.3s ease",
    padding: `${distance}px`,
  };

  const cardRectangleStyle = {
    width: "250px",
    height: "100%",
    backgroundColor: "#3498db",
    borderRadius: `${innerRadius}px`,
    transition: "opacity 0.3s ease",
  };

  return (
    <Flex
      style={{
        ...boxContainerStyle,
        position: "relative",
      }}
      onClick={() => {
        region.deck.length === 0 && props.onClickRegion(props.regionId);
      }}
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

      {region.deck.length > 0 && (
        <Box
          width={"100%"}
          height={"350px"}
          flexDirection={"row"}
          overflowX="scroll"
          padding="12px"
        >
          <HStack height={"350px"} gap="10px" minWidth="min-content">
            {region.deck.map((cardId) => {
              const card = props.state.cards[cardId]!;
              return (
                <Box
                  key={cardId}
                  width={"250px"}
                  height={"100%"}
                  style={cardRectangleStyle}
                  onClick={() => {
                    props.onClickCard(props.regionId, cardId);
                  }}
                >
                  <Card cardState={card} />
                </Box>
              );
            })}
          </HStack>
        </Box>
      )}
    </Flex>
  );
};

export default RegionBoard;
