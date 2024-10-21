import { createContext } from "react";
import { Game } from "./logic/api";

export type StateT = Game;

export const State: StateT = {
  regions: {
    deck: {
      region: {
        id: "1",
        label: "Deck",
        hover: "Hover over this region",
        config: { facing: "back", angle: "up" },
      },
      deck: ["1", "2"],
    },
    hand: {
      region: {
        id: "1",
        label: "Hand",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up" },
      },
      deck: [],
    },
    play: {
      region: {
        id: "1",
        label: "Play",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up" },
      },
      deck: [],
    },
    discard: {
      region: {
        id: "1",
        label: "Discard",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up" },
      },
      deck: [],
    },
    destroy: {
      region: {
        id: "1",
        label: "Removed from game",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up" },
      },
      deck: [],
    },
  },
  cards: {
    "1": {
      card: {
        id: "1",
        label: "Sum Card",
        description: "Some awesome card 1",
        hover: "Check this awesome card",
        front: { ctype: "text", text: "This is card 1" },
        back: { ctype: "text", text: "CARDMANCER BITCH" },
      },
      facing: "back",
      angle: "up",
    },
    "2": {
      card: {
        id: "2",
        label: "Sum Card",
        hover: "Check this awesome card",
        description: "Some awesome card 2",
        front: {
          ctype: "image-remote",
          url: "https://cards.scryfall.io/large/front/0/4/0476ea45-ee6d-41c6-93b8-50f92cb37b78.jpg?1673305697",
        },
        back: { ctype: "text", text: "CARDMANCER BITCH" },
      },
      facing: "back",
      angle: "up",
    },
  },
};

export const StateContext = createContext(State);
