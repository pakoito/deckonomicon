import stringify from "safe-stable-stringify";
import { TTSCustomDeck, TTSObject } from "./types";
import { customDeckSchema, saveFileSchema } from "./validators";

export const parseDecksTTS = (jsonObject: unknown): TTSCustomDeck[] => {
  const safe = saveFileSchema.safeParse(jsonObject);
  if (safe.success === false) {
    return [];
  }
  const decks: Set<string> = new Set();
  const objectTraversal = (objects: TTSObject[]) => {
    for (const object of objects) {
      if (object.CustomDeck) {
        Object.values(object.CustomDeck).forEach((e) => {
          decks.add(stringify(e));
        });
      }
      if (object.ChildObjects) {
        objectTraversal(object.ChildObjects);
      }
      if (object.ContainedObjects) {
        objectTraversal(object.ContainedObjects);
      }
    }
  };
  objectTraversal(safe.data.ObjectStates);
  return [...decks].flatMap((v) => {
    const reparsed = customDeckSchema.safeParse(JSON.parse(v));
    return reparsed.success ? [reparsed.data] : [];
  });
};
