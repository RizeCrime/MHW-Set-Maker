export interface Build {
  weapon: Object | null,
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
  skills: Map<string, number>,
  slotsRaw?: any | undefined,
  slots: number[],
  tags: string[],
}

export interface MiniEqPiece {
  id: number,
  skills: Map<string, number>
}

export interface SkillTally {
  [key: string]: number
}

export function isBuild(build: any): build is Build {
  return (
    !!build && 
    'weapon' in build &&
    'helmet' in build &&
    'chest' in build &&
    'arms' in build &&
    'waist' in build &&
    'legs' in build
    // build &&
    // typeof build === 'object' &&
    // ('weapon' in build) && (build.weapon === null || isEqPiece(build.weapon)) &&
    // ('helmet' in build) && (build.helmet === null || isEqPiece(build.helmet)) &&
    // ('chest' in build) && (build.chest === null || isEqPiece(build.chest)) &&
    // ('arms' in build) && (build.arms === null || isEqPiece(build.arms)) &&
    // ('waist' in build) && (build.waist === null || isEqPiece(build.waist)) &&
    // ('legs' in build) && (build.legs === null || isEqPiece(build.legs))
  );
}

export function isEqPiece(eqPiece: any): eqPiece is EqPiece {
  return (
    !!eqPiece &&
    'id' in eqPiece &&
    'itemType' in eqPiece &&
    'rarity' in eqPiece &&
    'name' in eqPiece &&
    'defense' in eqPiece &&
    'fireResist' in eqPiece &&
    'waterResist' in eqPiece &&
    'thunderResist' in eqPiece &&
    'iceResist' in eqPiece &&
    'dragonResist' in eqPiece &&
    'skills' in eqPiece &&
    'slots' in eqPiece &&
    'tags' in eqPiece
    // !!eqPiece &&
    // !!eqPiece.id &&
    // !!eqPiece.itemType &&
    // !!eqPiece.rarity &&
    // !!eqPiece.name &&
    // !!eqPiece.defense &&
    // !!eqPiece.fireResist &&
    // !!eqPiece.waterResist &&
    // !!eqPiece.thunderResist &&
    // !!eqPiece.iceResist &&
    // !!eqPiece.dragonResist &&
    // !!eqPiece.skills &&
    // !!eqPiece.slots &&
    // !!eqPiece.tags
  );
}

export function isMiniEqPiece(miniEqPiece: any): boolean {
  return (
    !!miniEqPiece.id &&
    !!miniEqPiece.skills &&
    !(!!miniEqPiece.itemType)
  );
}