<script setup lang="ts">

const debug = true;

const selectedSkills = ref<Object[]>([]);
const selectedSkillsLength = computed(() => { 
  return selectedSkills.value ? selectedSkills.value.length : 0 
});
const skillModalOpen = ref<boolean>(false);

</script>

<template>
  <UContainer class="py-4 grid grid-cols-5 gap-4" style="width: 100vw; height: 100vh;">
    <div class="flex flex-col gap-4 col-span-5">

      <!-- <div v-if="debug">
        <h1>Tests</h1>
        <div>testGetSkillTally() : {{ testGetSkillTally() }}</div>
        <UButton label="Test `getSkillTally()`" @click="testGetSkillTally()" />
      </div> -->

      <!-- Stats -->
      <h2>Stats</h2>
      <div class="flex flex-row gap-4 w-full">
        stats go here later
      </div>
      <!-- !Stats -->

      <UDivider />

      <!-- Equipment -->
      <EquipmentSelector :selectedSkills />
      <!-- !Equipment -->

      <UDivider />

      <!-- Skills -->
      <div class="flex flex-row gap-4">
        <h2>Skills ({{ selectedSkillsLength }})</h2>
        <UButton @click="skillModalOpen = true">Add Skills</UButton>
      </div>

      <div class="flex flex-row gap-4 w-full">
        <SkillSlot v-for="skill in selectedSkills" :skill />
      </div>
      <!-- !Skills -->

      <!-- Skill Select Modal -->
      <UModal v-model="skillModalOpen">
        <SkillSelector :selectedSkills />
      </UModal>
      <!-- !Skill Select Modal -->

      <!-- Debug -->
      <div v-if="debug" class="flex flex-col gap-4">
        <pre>skillModalOpen: {{ skillModalOpen }}</pre>
        <pre>selectedSkills: {{ selectedSkills }}</pre>
      </div>
      <!-- !Debug -->

    </div>
  </UContainer>
</template>

<style>
</style>