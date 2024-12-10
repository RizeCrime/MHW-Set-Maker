<script setup lang="ts">

const debug = true;
const allEqIndex = ref(0);

const props = defineProps<{
  selectedSkills: Object[]
}>();

const selectedEquipment = ref<Build | null>(null);
const skillTally = computed(() => selectedEquipment.value ? getBuildSkillTally(selectedEquipment.value) : null);

const allEquipment: EqPiece[] = await getAllEquipment();
const equipmentWithMatchingSkills = computed((): EqPiece[] => {
  return allEquipment.filter(eqPiece => {
    return props.selectedSkills.some(selectedSkill => {
      return selectedSkill.id in eqPiece.skills;
    });
  });
});

let allHelmets = ref<Object[] | null>(null);
let allChests = ref<Object[] | null>(null);
let allArms = ref<Object[] | null>(null);
let allWaists = ref<Object[] | null>(null);
let allLegs = ref<Object[] | null>(null);

let validBuilds = ref<Build[] | null>(null);
// let currentBuild = computed(() => validBuilds.value ? validBuilds.value[0] : null);
// let skillTally = computed(() => currentBuild ? getBuildSkillTally(currentBuild) : null);

const calculateEquipment = () => {

  console.log(
    "Calculating Equipment from " +
    equipmentWithMatchingSkills.value.length +
    " potential Pieces."
  );

  allHelmets.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Head"
  ).map(helmet => {
    const build: Build = {
      weapon: null,
      helmet: helmet,
      chest: null,
      arms: null,
      waist: null,
      legs: null
    };
    let skillTally = getBuildSkillTally(build);
    helmet.skills = skillTally;
    return helmet;
  });
  allChests.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Chest"
  ).map(chest => {
    const build: Build = {
      weapon: null,
      helmet: null,
      chest: chest,
      arms: null,
      waist: null,
      legs: null
    };
    let skillTally = getBuildSkillTally(build);
    chest.skills = skillTally;
    return chest;
  });
  allArms.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Arms"
  ).map(arms => {
    const build: Build = {
      weapon: null,
      helmet: null,
      chest: null,
      arms: arms,
      waist: null,
      legs: null
    };
    let skillTally = getBuildSkillTally(build);
    arms.skills = skillTally;
    return arms;
  });
  allWaists.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Waist"
  ).map(waist => {
    const build: Build = {
      weapon: null,
      helmet: null,
      chest: null,
      arms: null,
      waist: waist,
      legs: null
    };
    let skillTally = getBuildSkillTally(build);
    waist.skills = skillTally;
    return waist;
  });
  allLegs.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Legs"
  ).map(legs => {
    const build: Build = {
      weapon: null,
      helmet: null,
      chest: null,
      arms: null,
      waist: null,
      legs: legs
    };
    let skillTally = getBuildSkillTally(build);
    legs.skills = skillTally;
    return legs;
  });

  validBuilds.value = [];

  // allHelmets -> allTargetSkillLevelsOfHelmets
  let helmetTargetSkills = allHelmets.value.map(helmet => helmet.skills[props.selectedSkills[0].id]);
  let chestTargetSkills = allChests.value.map(chest => chest.skills[props.selectedSkills[0].id]);
  let armsTargetSkills = allArms.value.map(arms => arms.skills[props.selectedSkills[0].id]);
  let waistTargetSkills = allWaists.value.map(waist => waist.skills[props.selectedSkills[0].id]);
  let legsTargetSkills = allLegs.value.map(legs => legs.skills[props.selectedSkills[0].id]);
  
  let validCombinations = [];
  let testedCombinations = 0;
  let targetLevel = props.selectedSkills[0].targetLevel;
  
  helmetTargetSkills.forEach(helmet => {
    chestTargetSkills.forEach(chest => {
      armsTargetSkills.forEach(arms => {
        waistTargetSkills.forEach(waist => {
          legsTargetSkills.forEach(legs => {
            testedCombinations++;
            if (helmet + chest + arms + waist + legs >= targetLevel) {
              validCombinations.push({
                helmet: helmet,
                chest: chest,
                arms: arms,
                waist: waist,
                legs: legs
              });
            }
          })
        })
      })
    })
  })

  console.log("Tested " + testedCombinations + " combinations.");

  if (validCombinations.length > 0) {
    validCombinations.forEach(combination => {
      let helmet = allHelmets.value.find(h => h.skills[props.selectedSkills[0].id] === combination.helmet);
    let chest = allChests.value.find(c => c.skills[props.selectedSkills[0].id] === combination.chest);
    let arms = allArms.value.find(a => a.skills[props.selectedSkills[0].id] === combination.arms);
    let waist = allWaists.value.find(w => w.skills[props.selectedSkills[0].id] === combination.waist);
    let legs = allLegs.value.find(l => l.skills[props.selectedSkills[0].id] === combination.legs);
    const build: Build = {
      weapon: null,
      helmet: helmet,
      chest: chest,
      arms: arms,
      waist: waist,
      legs: legs
    };
    validBuilds.value.push(build);
    });
    
    selectedEquipment.value = validBuilds.value[0];
  } else {
    console.log("No valid combinations found.");
  }


  /* allHelmets.value.forEach(helmet => {
    allChests.value.forEach(chest => {
      allArms.value.forEach(arms => {
        allWaists.value.forEach(waist => {
          allLegs.value.forEach(legs => {

            const build: Build = {
              weapon: null,
              helmet: helmet,
              chest: chest,
              arms: arms,
              waist: waist,
              legs: legs
            };

            let skillTally = getBuildSkillTally(build);

            if (props.selectedSkills.every(skill => {

              let targetLevel = skill.targetLevel || 0;
              let currentLevel = skillTally[skill.id] || 0;

              return currentLevel >= targetLevel;

            })) {
              validBuilds.value.push(build);
            }

            selectedEquipment.value = validBuilds.value[0];

          });
        });
      });
    });
  }); */

  console.log("Found " + validBuilds.value.length + " valid builds.");

};

</script>

<template>

  <div class="flex flex-row gap-4 w-full">

    <h2>Equipment</h2>
    <UButton label="Calculate" @click="calculateEquipment" />

  </div>

  <div class="flex flex-row gap-4 w-full">

    <EquipmentSlot title="Weapon" :equipment="selectedEquipment?.weapon"></EquipmentSlot>
    <EquipmentSlot title="Helmet" :equipment="selectedEquipment?.helmet"></EquipmentSlot>
    <EquipmentSlot title="Chest" :equipment="selectedEquipment?.chest"></EquipmentSlot>
    <EquipmentSlot title="Arms" :equipment="selectedEquipment?.arms"></EquipmentSlot>
    <EquipmentSlot title="Waist" :equipment="selectedEquipment?.waist"></EquipmentSlot>
    <EquipmentSlot title="Legs" :equipment="selectedEquipment?.legs"></EquipmentSlot>

  </div>

  <div class="flex flex-row gap-4 w-full">
    <h2>Equipment Skills</h2>
    <template v-if="skillTally">
      <span v-for="skill in Object.entries(skillTally)">
        {{ skill[0] }} : {{ skill[1] }}
      </span>
    </template>
  </div>

  <!-- Debug -->
  <div v-if="debug">
    <h3>Debug Section</h3>
    <!-- <pre>skillTally: {{ skillTally }}</pre> -->
    <!-- <UDivider /> -->
    <!-- <pre v-if="validBuilds">validBuilds: {{ validBuilds[0] }}</pre> -->
    <!-- <UDivider /> -->
    <!-- <pre v-if="equipmentWithMatchingSkills">equipmentWithMatchingSkills: {{ equipmentWithMatchingSkills }}</pre> -->
    <!-- <pre v-if="allHelmets">allHelmets[0]: {{ allHelmets[0]?.name }}</pre>
    <pre v-if="allChests">allChests[0]: {{ allChests[0]?.name }}</pre>
    <pre v-if="allArms">allArms[0]: {{ allArms[0]?.name }}</pre>
    <pre v-if="allWaists">allWaists[0]: {{ allWaists[0]?.name }}</pre>
    <pre v-if="allLegs">allLegs[0]: {{ allLegs[0]?.name }}</pre>
    <UDivider /> -->
    <UDivider />
    <UButton label="+" @click="allEqIndex++" />
    <UButton label="-" @click="allEqIndex--" />
    <pre v-if="allEquipment">allEquipment[{{ allEqIndex }}]: {{ allEquipment[allEqIndex] }}</pre>
  </div>
  <!-- !Debug -->

</template>