<script setup lang="ts">

const props = defineProps<{
  skill: Object,
}>();

// const targetLevel = ref<number>(0);

const increaseTargetLevel = () => {
  const maxLevel = props.skill.levels.length;
  // if (targetLevel.value < maxLevel) {
    // targetLevel.value++;
  // }
  if (!props.skill.targetLevel) {
    props.skill.targetLevel = 0;
  }
  if (props.skill.targetLevel < maxLevel) {
    props.skill.targetLevel++;
  }
};
const decreaseTargetLevel = () => {
  const maxLevel = props.skill.levels.length;
  // if (targetLevel.value > 0) {
    // targetLevel.value--;
  // }
  if (!props.skill.targetLevel) {
    props.skill.targetLevel = 0;
  }
  if (props.skill.targetLevel > 0) {
    props.skill.targetLevel--;
  }
};

</script>

<template>
  <div class="grid grid-cols-5 border-2 rounded-md p-4 w-full">
    
    <div class="col-span-3 flex flex-col gap-4">
      <h3>{{ skill.name }}</h3>
      <UDivider />
      <p>{{ skill.description }}</p>
    </div>

    <div class="col-span-2 flex flex-col gap-4">
      <h3>Level</h3>
      <UDivider />
      <span>{{ skill.targetLevel ? skill.targetLevel : 0 }} / {{ skill.levels.length }}</span>
      <span class="flex flex-row gap-4">
        <UButton @click="increaseTargetLevel">+</UButton>
        <UButton @click="decreaseTargetLevel">-</UButton>
      </span>
    </div>

  </div>
</template>