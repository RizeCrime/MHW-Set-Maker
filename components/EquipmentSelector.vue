<script setup lang="ts">

const debug = true;
const allEqIndex = ref(0);

const props = defineProps<{
  selectedSkills: Object[]
}>();

const selectedEquipment = ref<Build | null>(null);
const skillTally = computed(() => selectedEquipment.value ? getBuildSkillTally(selectedEquipment.value) : null);

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

let validBuilds = ref<Build[] | null>(null);
// let currentBuild = computed(() => validBuilds.value ? validBuilds.value[0] : null);
// let skillTally = computed(() => currentBuild ? getBuildSkillTally(currentBuild) : null);

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
      