// const allEquipment: Object[] = (await queryContent('/armor').findOne()).body.map(eqPiece => {
//   const skillsArray = eqPiece.skills.split(';').reduce((acc, skill) => {
//     const [name, level] = skill.split('-');
//     return { ...acc,
//       [name]: parseInt(level) 
//     };
//   }, {});
//   eqPiece.parsedSkills = skillsArray;
//   return eqPiece;
// });

export default async function (): Promise<EqPiece[]> {

  let allEquipment: EqPiece[] = [];

  const rawEquipment = (await queryContent('/armor').findOne()).body;

  rawEquipment?.forEach(rawEqPiece => {

    const eqDefense = rawEqPiece.defense.split(';').map(defense => parseInt(defense));

    const eqSkills = rawEqPiece.skills.split(';').reduce((acc, skill) => {
      const [id, level] = skill.split('-');
      return { ...acc, [id]: parseInt(level) };
    }, {});

    // const eqSlots = rawEqPiece.slots.split(';').map(slot => parseInt(slot));
    // console.log('eqSlots:', eqSlots);

    let eqSlots: number[] = [];
    if (rawEqPiece.slots) {

      if (typeof rawEqPiece.slots === 'number') {
        eqSlots.push(rawEqPiece.slots);
      }
      else if (typeof rawEqPiece.slots === 'string' && rawEqPiece.slots.includes(';')) {
        eqSlots = rawEqPiece.slots.split(';').map(slot => parseInt(slot));
      }
      else if (typeof rawEqPiece.slots === 'string' && !rawEqPiece.slots.includes(';')) {
        eqSlots.push(parseInt(rawEqPiece.slots));
      }
    }
    else {
      console.log('No Slots found for:', rawEqPiece.name);
    }
    
    const eqPiece: EqPiece = {
      id: rawEqPiece.id,
      itemType: rawEqPiece.itemType,
      rarity: rawEqPiece.rarity,
      name: rawEqPiece.name,
      defense: eqDefense,
      fireResist: rawEqPiece.fireResist,
      waterResist: rawEqPiece.waterResist,
      thunderResist: rawEqPiece.thunderResist,
      iceResist: rawEqPiece.iceResist,
      dragonResist: rawEqPiece.dragonResist,
      skills: eqSkills,
      slots: eqSlots,
      tags: rawEqPiece.tags.split(';')
    };

    allEquipment.push(eqPiece);

  });

  return allEquipment;

}