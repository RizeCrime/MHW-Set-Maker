<script setup lang="ts">

const props = defineProps<{
  equipment?: EqPiece
}>();

const eqSkills = computed(() => {
  return props.equipment ? Object.entries(props.equipment.skills) : null;
});

</script>

<template>
  <div class="flex flex-col gap-4 border-2 rounded-md p-4 w-full">

    <h3>{{ equipment?.name }}</h3>
    
    <UDivider />
    
    <p>Defense</p>
    <p v-for="defValue in equipment?.defense">- {{ defValue }}</p>
    
    <UDivider />

    <p>Skills</p>
    <p v-for="skill in eqSkills">- {{ skill[0] }} : {{ skill[1] }}</p>
    
    <UDivider />

    <p>Slots</p>
    <p v-for="slot in equipment?.slots">- Lvl: {{ slot }}</p>
  
 </div>
</template>