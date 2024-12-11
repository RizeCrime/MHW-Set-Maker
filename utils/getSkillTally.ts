import { isMiniEqPiece } from "./Types";

export default function (build?: Build, eqPiece?: EqPiece | MiniEqPiece): SkillTally {

  const skillTally: SkillTally = {};

  // console.log(`getSkillTally(build?, eqPiece?)\n  build: ${JSON.stringify(build, null, 2)}\n  eqPiece: ${JSON.stringify(eqPiece, null, 2)}`);

  if (build) {
    console.log(`isBuild(): ${isBuild(build)}`);
    console.log(`build.helmet: `, build.helmet);
  }
  else if (eqPiece) {
    console.log(`isEqPiece(): ${isEqPiece(eqPiece)}`);
    console.log(`isMiniEqPiece(): ${isMiniEqPiece(eqPiece)}`);
    console.log(`eqPiece.skills: `, Object.fromEntries(eqPiece.skills));
  }

  if (build && isBuild(build)) {
    getEqPieceSkillTally(skillTally, build.helmet);
    getEqPieceSkillTally(skillTally, build.chest);
    getEqPieceSkillTally(skillTally, build.arms);
    getEqPieceSkillTally(skillTally, build.waist);
    getEqPieceSkillTally(skillTally, build.legs);
  }

  if (!!eqPiece) {
    if (isEqPiece(eqPiece)) {
      getEqPieceSkillTally(skillTally, eqPiece);
    }
    if (isMiniEqPiece(eqPiece)) {
      console.log('Mini Eq Piece found: ', eqPiece);
    }
  }

  return skillTally;

}

function getEqPieceSkillTally(skillTally: SkillTally, eqPiece: EqPiece) {
  
  if (!eqPiece) { 
    console.log('No eqPiece found.');
    return; 
  }

  // console.log('eqPiece: ', eqPiece);

  Object.entries(eqPiece.skills).forEach(([skill, level]) => {
    // console.log('skill:', skill, 'level:', level);
    if (skillTally[skill]) {
      skillTally[skill] += level;
    } else {
      skillTally[skill] = level;
    }
  });

}