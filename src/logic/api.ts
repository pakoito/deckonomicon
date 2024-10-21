import { shuffleArray } from "./utils";

export type CardId = string;

export type Face =
  | { ctype: "image-remote"; url: string }
  | { ctype: "image-local"; blob: string }
  | { ctype: "text"; text: string };

export type Card = {
  id: CardId;
  label: string;
  description: string;
  hover: string;
  front: Face;
  back: Face;
};

export type Facing = "front" | "back";

export type Angle = "up" | "right" | "down" | "left";

export type Direction = "clockwise" | "counterclickwise";

const turnAngle = (angle: Angle, direction: Direction): Angle => {
  const clock = direction === "clockwise";
  switch (angle) {
    case "up":
      return clock ? "right" : "left";
    case "right":
      return clock ? "down" : "up";
    case "down":
      return clock ? "left" : "right";
    case "left":
      return clock ? "up" : "down";
    default:
      return angle;
  }
};

export type RegionConfig = { facing: Facing; angle: Angle };

export type RegionId = string;

export type Region = {
  id: RegionId;
  label: string;
  hover: string;
  config: RegionConfig;
};

export type RegionState = {
  region: Region;
  deck: CardId[];
};

export type CardState = {
  card: Card;
  facing: Facing;
  angle: Angle;
};

export type Game = {
  regions: Record<RegionId, RegionState>;
  cards: Record<CardId, CardState>;
};

export type GameState = {
  game: Game;
  enabled: boolean;
};

export type ApplicationState = Record<string, GameState>;

export const newGame = (state: Game): Game => {
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
): Game => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  const targetRegion = newGame.regions[targetRegionId]!;
  for (let i = options.amount; i > 0; i--) {
    if (originRegion.deck.length === 0) break;
    const oldCardId = originRegion.deck.pop()!;
    const oldCard = newGame.cards[oldCardId]!;
    oldCard.facing = options.facing ?? targetRegion.region.config.facing;
    oldCard.angle = targetRegion.region.config.angle;
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
): Game => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  const targetRegion = newGame.regions[targetRegionId]!;
  const newOldDeck = originRegion.deck.filter((c) => !cards.has(c));
  originRegion.deck = newOldDeck;
  cards.forEach((cardId) => {
    const oldCard = newGame.cards[cardId]!;
    oldCard.facing = options.facing ?? targetRegion.region.config.facing;
    oldCard.angle = targetRegion.region.config.angle;
    targetRegion.deck.push(cardId);
  });
  return newGame;
};

export const shuffleRegion = (state: Game, originRegionId: RegionId): Game => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[originRegionId]!;
  shuffleArray(originRegion.deck);
  return newGame;
};

export const flipCard = (
  state: Game,
  cardId: CardId,
  flip: "toggle" | Facing
): Game => {
  const newGame = structuredClone(state);
  const card = newGame.cards[cardId]!;
  if (flip === "toggle") {
    if (card.facing === "front") {
      card.facing = "back";
    } else {
      card.facing = "front";
    }
  } else {
    card.facing = flip;
  }
  return newGame;
};

export const flipTopRegion = (
  state: Game,
  regionId: RegionId,
  flip: "toggle" | Facing
): Game => {
  const originRegion = state.regions[regionId]!;
  if (originRegion.deck.length === 0) return state;
  return flipCard(state, originRegion.deck[originRegion.deck.length - 1], flip);
};

export const flipRegion = (
  state: Game,
  regionId: RegionId,
  flip: Facing
): Game => {
  const newGame = structuredClone(state);
  const originRegion = newGame.regions[regionId]!;
  originRegion.deck.forEach((cardId) => {
    const card = newGame.cards[cardId]!;
    card.facing = flip;
  });
  return newGame;
};

export const turnCard = (
  state: Game,
  cardId: CardId,
  direction: Direction
): Game => {
  const newGame = structuredClone(state);
  const card = newGame.cards[cardId]!;
  card.angle = turnAngle(card.angle, direction);
  return newGame;
};
