import { shuffleArray } from "./utils";

type CardId = string;

type Card = {
  id: CardId;
  label: string;
  hover: string;
  content:
    | { ctype: "image-net"; url: string }
    | { ctype: "image-local"; blob: string }
    | { ctype: "text"; text: string };
};

type Facing = "up" | "down";

type RegionConfig = { facing: Facing };

type RegionId = string;

type Region = {
  id: RegionId;
  label: string;
  hover: string;
  config: RegionConfig;
};

type RegionState = {
  region: Region;
  deck: CardId[];
};

type CardState = {
  card: Card;
  facing: Facing;
};

export type Game = {
  regions: Record<RegionId, RegionState>;
  cards: Record<CardId, CardState>;
};

export const newGame = (state: Game) => {
  const newGame = structuredClone(state);
  return newGame;
};

export const moveByTop = (
  state: Game,
  originRegionId: RegionId,
  targetRegionId: RegionId,
  options: { amount: number; facing: Facing | null } = {
    amount: 1,
    facing: null,
  }
) => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  const targetRegion = newGame.regions[targetRegionId]!;
  for (let i = options.amount; i > 0; i--) {
    if (originRegion.deck.length === 0) break;
    const oldCardId = originRegion.deck.pop()!;
    const oldCard = newGame.cards[oldCardId]!;
    oldCard.facing = options.facing ?? targetRegion.region.config.facing;
    targetRegion.deck.push(oldCardId);
  }
  return newGame;
};

export const moveById = (
  state: Game,
  originRegionId: RegionId,
  targetRegionId: RegionId,
  cards: Set<CardId>,
  options: { facing: Facing | null } = {
    facing: null,
  }
) => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  const targetRegion = newGame.regions[targetRegionId]!;
  const newOldDeck = originRegion.deck.filter((c) => !cards.has(c));
  originRegion.deck = newOldDeck;
  cards.forEach((cardId) => {
    const oldCard = newGame.cards[cardId]!;
    oldCard.facing = options.facing ?? targetRegion.region.config.facing;
    targetRegion.deck.push(cardId);
  });
  return newGame;
};

export const shuffleRegion = (state: Game, originRegionId: RegionId) => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  shuffleArray(originRegion.deck);
  return newGame;
};

export const flipCard = (
  state: Game,
  cardId: CardId,
  flip: "toggle" | Facing
) => {
  const newGame = structuredClone(state);
  const card = newGame.cards[cardId];
  if (flip === "toggle") {
    if (card.facing === "up") {
      card.facing = "down";
    } else {
      card.facing = "up";
    }
  } else {
    card.facing = flip;
  }
  return newGame;
};
