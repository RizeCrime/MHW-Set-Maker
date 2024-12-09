<script setup lang="ts">
defineProps<{
  title: String,
  // probably need to change equipment to a custom type later on
  equipment?: Object
}>();
</script>

<template>
  <div class="flex flex-col gap-4 border-2 rounded-md p-4 w-full">
    <h3>{{ title }}</h3>
    <UDivider />
    <p>{{ equipment?.name }}</p>
  </div>
</template>