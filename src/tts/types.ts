/**
 * Data of a TTS save file.
 * Not complete, as it only contains information required by this tool.
 */
export interface SaveFile {
  SaveName: string;
  ObjectStates: TTSObject[];
  [other: string]: unknown;
}

/**
 * Data of a TTS object.
 * Not complete, as it only contains information required by this tool.
 */
export type TTSObject = {
  Name: string;
  ChildObjects?: TTSObject[];
  ContainedObjects?: TTSObject[];
  CustomDeck?: Record<string, TTSCustomDeck>;
};

export type TTSCustomDeck = {
  FaceURL: string;
  BackURL: string;
  NumWidth: number;
  NumHeight: number;
  BackIsHidden: boolean;
  UniqueBack: boolean;
};
