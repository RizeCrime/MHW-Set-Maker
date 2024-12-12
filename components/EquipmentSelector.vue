<script setup lang="ts">

const debug = true;
const allEqIndex = ref(31);
const eqByTypeIndex = ref(-1);

const props = defineProps<{
  selectedSkills: Object[]
}>();

const allEquipment: EqPiece[] = await getAllEquipment();
let equipmentByType = computed(() => {
  
  const eqByTypeDict = {};  
  allEquipment.forEach(eqPiece => {

    if (!eqByTypeDict[eqPiece.itemType]) {
      eqByTypeDict[eqPiece.itemType] = [];
    }

    eqByTypeDict[eqPiece.itemType].push(eqPiece);

  });

  return eqByTypeDict;
});
let eqSkillsByType = computed(() => {

  // if (props.selectedSkills.length <= 0) { return; }

  const eqSkillsByTypeDict = {};
  allEquipment.forEach(eqPiece => {

    if (!eqSkillsByTypeDict[eqPiece.itemType]) {
      eqSkillsByTypeDict[eqPiece.itemType] = [];
    }

    eqSkillsByTypeDict[eqPiece.itemType].push(eqPiece.skills);

  });

  return eqSkillsByTypeDict;

});

// const selectedEquipment = ref<Build | null>(null);
const selectedEquipment = computed<Build>(() => {
  return {
    weapon: null as unknown as EqPiece,
    helmet: (allEquipment.find(eqPiece => eqPiece.itemType === 'Head') as EqPiece),
    chest: (allEquipment.find(eqPiece => eqPiece.itemType === 'Chest') as EqPiece),
    arms: (allEquipment.find(eqPiece => eqPiece.itemType === 'Arms') as EqPiece),
    waist: (allEquipment.find(eqPiece => eqPiece.itemType === 'Waist') as EqPiece),
    legs: (allEquipment.find(eqPiece => eqPiece.itemType === 'Legs') as EqPiece),
  };
});
console.log('selectedEquipment.value:', selectedEquipment.value);
const skillTally = computed(() => selectedEquipment.value ? getSkillTally((selectedEquipment.value as Build)) : "beepy");
console.log('skillTally.value:', skillTally.value);

let validBuilds = ref<Build[] | null>(null);
// let currentBuild = computed(() => validBuilds.value ? validBuilds.value[0] : null);
// let skillTally = computed(() => currentBuild ? getSkillTally(currentBuild) : null);

const calculateEquipment = () => {
 
  console.log('selectedSkills:', props.selectedSkills);
  console.log('equipmentByType:', equipmentByType.value);

  validBuilds.value = getValidBuilds(props.selectedSkills, equipmentByType.value);
  selectedEquipment.value = validBuilds.value ? validBuilds.value[0] : null;

  console.log('validBuilds:', validBuilds.value);

};

</script>

<template>

  <div class="flex flex-row gap-4 w-full">

    <h2>Equipment</h2>
    <UButton label="Calculate" @click="calculateEquipment" />

  </div>

  <div class="flex flex-row gap-4 w-full">

    <!-- <EquipmentSlot title="Weapon" :equipment="selectedEquipment?.weapon"></EquipmentSlot> -->
    <EquipmentSlot title="Helmet" :equipment="selectedEquipment?.helmet"></EquipmentSlot>
    <EquipmentSlot title="Chest" :equipment="selectedEquipment?.chest"></EquipmentSlot>
    <EquipmentSlot title="Arms" :equipment="selectedEquipment?.arms"></EquipmentSlot>
    <EquipmentSlot title="Waist" :equipment="selectedEquipment?.waist"></EquipmentSlot>
    <EquipmentSlot title="Legs" :equipment="selectedEquipment?.legs"></EquipmentSlot>

  </div>

  <div class="flex flex-row gap-4 w-full">
    <h2>Equipment Skills</h2>
    <!-- <template v-if="skillTally"> -->
      <span v-for="skill in Object.entries(skillTally)">
        {{ skill[0] }} : {{ skill[1] }}
      </span>
    <!-- </template> -->
  </div>

  <!-- Debug -->
  <div v-if="debug">
    <h3>Debug Section</h3>
    <!-- <div>
      Selected Equipment:
      <pre v-for="eq in Object.entries(selectedEquipment)">
        {{ eq[0] }} : {{ (eq[1] as EqPiece)?.name || 'null' }}
      </pre>
    </div> -->
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
    <!-- <UDivider />
    <UButton label="+" @click="allEqIndex++" />
    <UButton label="-" @click="allEqIndex--" />
    <pre v-if="allEquipment">allEquipment[{{ allEqIndex }}]: {{ allEquipment[allEqIndex] }}</pre> -->
    <UDivider />
    <div>
      <p>Equipment by Type @ Index {{ eqByTypeIndex }}:</p>
      <UButton label="+" @click="eqByTypeIndex++" />
      <UButton label="-" @click="eqByTypeIndex--" />

      <div class="flex flex-row gap-4">

        <div>
          <pre>equipmentByType['Head']: {{ equipmentByType['Head'][eqByTypeIndex] }}</pre>
          <pre>equipmentByType['Chest']: {{ equipmentByType['Chest'][eqByTypeIndex] }}</pre>
          <pre>equipmentByType['Arms']: {{ equipmentByType['Arms'][eqByTypeIndex] }}</pre>
          <pre>equipmentByType['Waist']: {{ equipmentByType['Waist'][eqByTypeIndex] }}</pre>
          <pre>equipmentByType['Legs']: {{ equipmentByType['Legs'][eqByTypeIndex] }}</pre>
        </div>

        <div>
          <pre>eqSkillsByType['Head']: {{ eqSkillsByType['Head'][eqByTypeIndex] }}</pre>
          <pre>eqSkillsByType['Chest']: {{ eqSkillsByType['Chest'][eqByTypeIndex] }}</pre>
          <pre>eqSkillsByType['Arms']: {{ eqSkillsByType['Arms'][eqByTypeIndex] }}</pre>
          <pre>eqSkillsByType['Waist']: {{ eqSkillsByType['Waist'][eqByTypeIndex] }}</pre>
          <pre>eqSkillsByType['Legs']: {{ eqSkillsByType['Legs'][eqByTypeIndex] }}</pre>
        </div>

      </div>

    </div>
    <UDivider />
  </div>
  <!-- !Debug -->

</template>
      