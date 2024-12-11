<script setup lang="ts">

const debug = true;
const allEqIndex = ref(31);

const props = defineProps<{
  selectedSkills: Object[]
}>();

const allEquipment: EqPiece[] = await getAllEquipment();
let equipmentByType = computed(() => {
  
  const eqByTypeMap = new Map();  
  allEquipment.forEach(eqPiece => {

    const eqId = eqPiece.id;
    const eqType = eqPiece.itemType;
    const eqSkillMap = new Map();
    Object.entries(eqPiece.skills).forEach(([skillId, skillLevel]) => {
      eqSkillMap.set(skillId, skillLevel);
    });
    
    if (eqByTypeMap.has(eqType)) {
      eqByTypeMap.get(eqType)?.push({ eqId, skills: eqSkillMap });
    } else {
      eqByTypeMap.set(eqType, [{ eqId, skills: eqSkillMap }]);
    }
  });

  return eqByTypeMap;
});

// const selectedEquipment = ref<Build | null>(null);
const selectedEquipment = computed<Build>(() => {
  return {
    weapon: null as unknown as EqPiece,
    helmet: allEquipment.find(eqPiece => eqPiece.id === selectedEquipment.value?.helmet.id),
    // helmet: equipmentByType.value.get('Head').find(eqPiece => eqPiece.id === selectedEquipment.value?.helmet.id),
    chest: equipmentByType.value.get('Chest')[0],
    arms: equipmentByType.value.get('Arms')[0],
    waist: equipmentByType.value.get('Waist')[0],
    legs: equipmentByType.value.get('Legs')[0],
    // helmet: (allEquipment.find(eqPiece => eqPiece.itemType === 'Head') as EqPiece),
    // chest: (allEquipment.find(eqPiece => eqPiece.itemType === 'Chest') as EqPiece),
    // arms: (allEquipment.find(eqPiece => eqPiece.itemType === 'Arms') as EqPiece),
    // waist: (allEquipment.find(eqPiece => eqPiece.itemType === 'Waist') as EqPiece),
    // legs: (allEquipment.find(eqPiece => eqPiece.itemType === 'Legs') as EqPiece),
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

    <EquipmentSlot title="Weapon" :equipment="selectedEquipment?.weapon"></EquipmentSlot>
    <EquipmentSlot title="Helmet" :equipment="selectedEquipment?.helmet"></EquipmentSlot>
    <EquipmentSlot title="Chest" :equipment="selectedEquipment?.chest"></EquipmentSlot>
    <EquipmentSlot title="Arms" :equipment="selectedEquipment?.arms"></EquipmentSlot>
    <EquipmentSlot title="Waist" :equipment="selectedEquipment?.waist"></EquipmentSlot>
    <EquipmentSlot title="Legs" :equipment="selectedEquipment?.legs"></EquipmentSlot>

  </div>

  <div class="flex flex-row gap-4 w-full">
    <h2>Equipment Skills</h2>
    <pre>Skill Tally: {{ skillTally }}</pre>
    <!-- <template v-if="skillTally"> -->
      <span v-for="skill in Object.entries(skillTally)">
        {{ skill[0] }} : {{ skill[1] }}
      </span>
    <!-- </template> -->
  </div>

  <!-- Debug -->
  <div v-if="debug">
    <h3>Debug Section</h3>
    <pre>
      Selected Equipment:
      <pre v-for="eq in Object.entries(selectedEquipment)">
        {{ eq[0] }} : {{ (eq[1] as EqPiece)?.name || 'null' }}
      </pre>
    </pre>
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
    <UDivider />
    <div>
      <p>Equipment by Type:</p>
      <!-- <pre>{{ Object.fromEntries(equipmentByType) }}</pre> -->
      <pre>equipmentByType['Head']: {{ equipmentByType.get('Head')[0] }}</pre>
      <pre>equipmentByType['Chest']: {{ equipmentByType.get('Chest')[0] }}</pre>
      <pre>equipmentByType['Arms']: {{ equipmentByType.get('Arms')[0] }}</pre>
      <pre>equipmentByType['Waist']: {{ equipmentByType.get('Waist')[0] }}</pre>
      <pre>equipmentByType['Legs']: {{ equipmentByType.get('Legs')[0] }}</pre>
    </div>
  </div>
  <!-- !Debug -->

</template>
      