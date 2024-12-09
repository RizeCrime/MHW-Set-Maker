export default function (build: Build) {

  const skillTally = {};

  // console.log('build:', build);
  // console.log('skillTally:', skillTally);

  try {

    Object.entries(build).forEach(([slot, eqPiece]) => {
      if (!eqPiece) { return; }
      Object.entries(eqPiece.skills).forEach(([skillName, level]) => {
        skillTally[skillName] = (skillTally[skillName] || 0) + level;
      });
    });

  }
  catch (error) {
    console.error('Error in getBuildSkillTally:', error);
    console.log('build:', build);
  }

  return skillTally;

}
