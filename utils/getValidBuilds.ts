export default function (selectedSkills: Skill[], eqByType): Build[] {

  const selectedSkillIds: string[] = selectedSkills.map((skill: Object) => skill.id);

  if (selectedSkillIds.length === 0) {
    return [];
  }

  selectedSkills.forEach((skill: Skill) => {

    console.log('Checking for Skill: ', skill);

    const relevantHelmetSkillLevels = eqByType.Head.map((eqPiece: EqPiece) => eqPiece.skills[skill.id]);
    const relevantChestSkillLevels = eqByType.Chest.map((eqPiece: EqPiece) => eqPiece.skills[skill.id]);
    const relevantArmsSkillLevels = eqByType.Arms.map((eqPiece: EqPiece) => eqPiece.skills[skill.id]);
    const relevantWaistSkillLevels = eqByType.Waist.map((eqPiece: EqPiece) => eqPiece.skills[skill.id]);
    const relevantLegsSkillLevels = eqByType.Legs.map((eqPiece: EqPiece) => eqPiece.skills[skill.id]);
    console.log('relevantHelmetSkillLevels:', relevantHelmetSkillLevels);

    const validCombinations: Record<string, number>[] = [];

    relevantHelmetSkillLevels.forEach((helmetIndex, helmetSkillLevel) => {
      relevantChestSkillLevels.forEach((chestIndex, chestSkillLevel) => {
        relevantArmsSkillLevels.forEach((armsIndex, armsSkillLevel) => {
          relevantWaistSkillLevels.forEach((waistIndex, waistSkillLevel) => {
            relevantLegsSkillLevels.forEach((legsIndex, legsSkillLevel) => {

              let skillSum = helmetSkillLevel + chestSkillLevel + 
                armsSkillLevel + waistSkillLevel + legsSkillLevel;

              if (!(skillSum >= skill.targetLevel)) { return; }

              validCombinations.push({
                'Head': helmetIndex,
                'Chest': chestIndex,
                'Arms': armsIndex,
                'Waist': waistIndex,
                'Legs': legsIndex
              });

            });
          });
        });
      });
    });

    console.log('validCombinations:', validCombinations);

  });

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