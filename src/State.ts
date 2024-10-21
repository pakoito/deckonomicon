import { createContext } from "react";
import { Deck } from "./logic/api";

export type StateT = Deck;

export const State: StateT = {
  regions: {
    deck: {
      region: {
        id: "1",
        label: "Deck",
        hover: "Hover over this region",
        config: { facing: "back", angle: "up", rtype: "stack" },
      },
      deck: [],
    },
    hand: {
      region: {
        id: "1",
        label: "Hand",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up", rtype: "board" },
      },
      deck: ["1", "2", "3", "4"],
    },
    play: {
      region: {
        id: "1",
        label: "Play",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up", rtype: "board" },
      },
      deck: [],
    },
    discard: {
      region: {
        id: "1",
        label: "Discard",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up", rtype: "stack" },
      },
      deck: [],
    },
    destroy: {
      region: {
        id: "1",
        label: "Removed from game",
        hover: "Hover over this region",
        config: { facing: "front", angle: "up", rtype: "stack" },
      },
      deck: [],
    },
  },
  cards: {
    "1": {
      card: {
        id: "1",
        front: {
          label: "The card uno",
          description: "Some awesome card 1",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "This is card 1" },
        },
        back: {
          label: "Sum Card",
          description: "Some awesome card",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "CARDMANCER BITCH" },
        },
      },
      facing: "front",
      angle: "up",
    },
    "2": {
      card: {
        id: "2",
        front: {
          label: "Card 2",
          hover: "Tegminate",
          description: "Destroy target boo boo",
          content: {
            ctype: "image-remote",
            url: "https://cards.scryfall.io/large/front/0/4/0476ea45-ee6d-41c6-93b8-50f92cb37b78.jpg?1673305697",
          },
        },
        back: {
          label: "Sum Card",
          description: "Some awesome card",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "CARDMANCER BITCH" },
        },
      },
      facing: "front",
      angle: "up",
    },
    "3": {
      card: {
        id: "3",
        front: {
          label: "The card 3",
          description: "Some awesome card 3",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "This is card 3" },
        },
        back: {
          label: "Sum Card",
          description: "Some awesome card",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "CARDMANCER BITCH" },
        },
      },
      facing: "front",
      angle: "up",
    },
    "4": {
      card: {
        id: "4",
        front: {
          label: "The card 4",
          description: "Some awesome card 4",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "This is card 4" },
        },
        back: {
          label: "Sum Card",
          description: "Some awesome card",
          hover: "Check this awesome card",
          content: { ctype: "text", text: "CARDMANCER BITCH" },
        },
      },
      facing: "front",
      angle: "up",
    },
  },
};

export const StateContext = createContext(State);
