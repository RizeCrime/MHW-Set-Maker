export interface Build {
  weapon: Object,
  helmet: EqPiece,
  chest: EqPiece,
  arms: EqPiece,
  waist: EqPiece,
  legs: EqPiece
}

export interface EqPiece {
  id: number,
  itemType: string,
  rarity: number,
  name: string,
  defense: number[],
  fireResist: number,
  waterResist: number,
  thunderResist: number,
  iceResist: number,
  dragonResist: number,
  skills: Object,
  slotsRaw?: any | undefined,
  slots: number[],
  tags: string[],
}