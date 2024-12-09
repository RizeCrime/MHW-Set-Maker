<script setup lang="ts">

const props = defineProps<{
  selectedSkills: Object[]
}>();
// const emit = defineEmits(['update:selectedSkills']);

let skillSearchInput = ref<string>("");

const allSkills: Object[] = (await queryContent('/skills').findOne()).body;
const filteredSkills = computed((): Object[] => {
  return allSkills.filter(skill => {
    if (skill.name.toLowerCase().includes(skillSearchInput.value.toLowerCase())) {
      if (!props.selectedSkills.find(selectedSkill => selectedSkill.id === skill.id)) {
        return skill;
      }
    }
  });
});

const addSkillToSelection = (skill) => {
  console.log("Adding Skill: " + skill.name);
  props.selectedSkills.push(skill);

  // let newSelectedSkills: Object[] = [];
  // if (props.selectedSkills) {
  //   newSelectedSkills = props.selectedSkills;
  // }
  // newSelectedSkills.push(skill);
  // emit('update:selectedSkills', newSelectedSkills);
};

</script>

<template>
  <div class="border-2 rounded-md p-4">

    <UInput v-model="skillSearchInput" />

    <!-- Debug -->
    <!-- {{ props }} -->
    <!-- <p>Skill Search Input: {{ skillSearchInput }}</p> -->
    <!-- <br>
    Selected Skills: {{ selectedSkills }} -->
    <!-- <br>
    {{ allSkills[64] }}
    <br> -->
    <!-- <p>Filtered Skills: {{ filteredSkills }}</p> -->
    <br>

    <template v-for="skill in filteredSkills">
      <UCard v-if="skill" @click="addSkillToSelection(skill)">{{ skill.name }}</UCard>
    </template>
    
  </div>
</template>