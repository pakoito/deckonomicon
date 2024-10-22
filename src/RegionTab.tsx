import { Flex, Box } from "@chakra-ui/react";
import { safeEntries } from "./logic/utils";
import RegionBoard from "./RegionBoard";
import RegionStack from "./RegionStack";
import { StateT } from "./State";
import { CardId, RegionId } from "./logic/api";

export type Props = {
  state: StateT;
  onClick: (regionId: RegionId, cardId: CardId | undefined) => void;
};

const RegionTab = (props: Props) => {
  const { onClick, state } = props;
  return (
    <Flex gap="20px" direction={"column"}>
      {safeEntries(state.regions).map(([regionId]) => {
        const region = state.regions[regionId]!;
        return (
          <Box key={`${regionId}-stack`}>
            {region.region.config.rtype === "stack" && (
              <RegionStack
                key={`${regionId}-stack`}
                state={state}
                regionId={regionId}
                onClick={() => onClick(regionId, region.deck[0])}
              />
            )}
            {region.region.config.rtype === "board" && (
              <RegionBoard
                key={`${regionId}-board`}
                state={state}
                regionId={regionId}
                onClickRegion={() => onClick(regionId, region.deck[0])}
                onClickCard={(_, cardId) => onClick(regionId, cardId)}
              />
            )}
          </Box>
        );
      })}
    </Flex>
  );
};

export default RegionTab;
