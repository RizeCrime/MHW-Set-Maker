export function testGetSkillTally(): boolean {

  const weapon: EqPiece = null; 
  const helmet: EqPiece = {
    id: 1,
    itemType: "Head",
    rarity: 1,
    name: "Helmet",
    defense: [1, 1, 1, 1],
    fireResist: 1,
    waterResist: 1,
    thunderResist: 1,
    iceResist: 1,
    dragonResist: 1,
    skills: new Map([["skill1", 1], ["skill2", 1]]),
    slots: [1, 1, 1],
    tags: ["tag1", "tag2"]
  };
  const chest: EqPiece = {
    id: 2,
    itemType: "Chest",
    rarity: 2,
    name: "Chest",
    defense: [2, 2, 2, 2],
    fireResist: 2,
    waterResist: 2,
    thunderResist: 2,
    iceResist: 2,
    dragonResist: 2,
    skills: new Map([["skill2", 1], ["skill3", 1]]),
    slots: [2, 2, 2],
    tags: ["tag2", "tag3"]
  };
  const arms: EqPiece = {
    id: 3,
    itemType: "Arms",
    rarity: 3,
    name: "Arms",
    defense: [3, 3, 3, 3],
    fireResist: 3,
    waterResist: 3,
    thunderResist: 3,
    iceResist: 3,
    dragonResist: 3,
    skills: new Map([["skill3", 1], ["skill4", 1]]),
    slots: [3, 3, 3],
    tags: ["tag3", "tag4"]
  };
  const waist: EqPiece = {
    id: 4,
    itemType: "Waist",
    rarity: 4,
    name: "Waist",
    defense: [4, 4, 4, 4],
    fireResist: 4,
    waterResist: 4,
    thunderResist: 4,
    iceResist: 4,
    dragonResist: 4,
    skills: new Map([["skill4", 1], ["skill3", 1]]),
    slots: [4, 4, 4],
    tags: ["tag4", "tag5"]
  };
  const legs: EqPiece = {
    id: 5,
    itemType: "Legs",
    rarity: 5,
    name: "Legs",
    defense: [5, 5, 5, 5],
    fireResist: 5,
    waterResist: 5,
    thunderResist: 5,
    iceResist: 5,
    dragonResist: 5,
    skills: new Map([["skill5", 1], ["skill6", 1]]),
    slots: [5, 5, 5],
    tags: ["tag5", "tag6"]
  };

  const build: Build = {
    weapon: weapon,
    helmet: helmet,
    chest: chest,
    arms: arms,
    waist: waist,
    legs: legs
  };

  console.log('Helmet Test Piece: ', helmet);
  const eqPieceSkillTally = getSkillTally(undefined, helmet);
  console.log('eqPieceSkillTally: ', eqPieceSkillTally);

  const buildSkillTally = getSkillTally(build);

  if (eqPieceSkillTally["skill1"] !== 1) { 
    console.log("eqPieceSkillTally[\"skill1\"] !== 1");
    return false; 
  }
  // if (buildSkillTally["skill3"] !== 3) { 
  //   console.log("buildSkillTally[\"skill3\"] !== 3");
  //   return false; 
  // }

  return true;
}

export function testIsBuild(): boolean {

  return false;
}