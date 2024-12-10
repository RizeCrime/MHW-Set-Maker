export default function (selectedSkills, eqByType): Build[] {

  const selectedSkillIds: string[] = selectedSkills.map((skill: Object) => skill.id);

  return [];

  // console.log(
  //   "Calculating Equipment from " + 
  //   equipmentWithMatchingSkills.value.length + 
  //   " potential Pieces."
  // );

  // allHelmets.value = equipmentWithMatchingSkills.value.filter(
  //   eqPiece => eqPiece.itemType === "Head"
  // );
  // allChests.value = equipmentWithMatchingSkills.value.filter(
  //   eqPiece => eqPiece.itemType === "Chest"
  // );
  // allArms.value = equipmentWithMatchingSkills.value.filter(
  //   eqPiece => eqPiece.itemType === "Arms"
  // );
  // allWaists.value = equipmentWithMatchingSkills.value.filter(
  //   eqPiece => eqPiece.itemType === "Waist"
  // );
  // allLegs.value = equipmentWithMatchingSkills.value.filter(
  //   eqPiece => eqPiece.itemType === "Legs"
  // );

  // validBuilds.value = [];

  // allHelmets.value.forEach(helmet => {
  //   allChests.value.forEach(chest => {
  //     allArms.value.forEach(arms => {
  //       allWaists.value.forEach(waist => {
  //         allLegs.value.forEach(legs => {

  //           const build: Build = {
  //             weapon: null,
  //             helmet: helmet,
  //             chest: chest,
  //             arms: arms,
  //             waist: waist,
  //             legs: legs
  //           };

  //           let skillTally = getBuildSkillTally(build);

  //           if (props.selectedSkills.every(skill => {

  //             let targetLevel = skill.targetLevel || 0;
  //             let currentLevel = skillTally[skill.id] || 0;

  //             return currentLevel >= targetLevel;

  //           })) {
  //             validBuilds.value.push(build);
  //           }

  //           selectedEquipment.value = validBuilds.value[0];

  //         });
  //       });
  //     });
  //   });
  // });

  // console.log("Found " + validBuilds.value.length + " valid builds.");

};