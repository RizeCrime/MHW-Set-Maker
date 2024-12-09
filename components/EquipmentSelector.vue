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
  );
  allChests.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Chest"
  );
  allArms.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Arms"
  );
  allWaists.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Waist"
  );
  allLegs.value = equipmentWithMatchingSkills.value.filter(
    eqPiece => eqPiece.itemType === "Legs"
  );

  validBuilds.value = [];

  allHelmets.value.forEach(helmet => {
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
  });

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
      