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
    
    <UCard>
      <template #header>
        <p>Defense</p>
      </template>
      <p v-for="defValue in equipment?.defense">{{ defValue }}</p>
    </Ucard>

    <UCard>
      <template #header>
        <p>Skills</p>
      </template>
      <p v-for="skill in eqSkills">{{ skill[0] }} : {{ skill[1] }}</p>
    </UCard>

    <UCard>
      <template #header>
        <p>Slots</p>
      </template>
      <p v-for="slot in equipment?.slots">Lvl: {{ slot }}</p>
    </UCard>
  
 </div>
</template>