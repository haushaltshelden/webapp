<template>
  <div
    class="m-3 flex justify-between border-secondary bg-hh-darkred p-2 text-xs rounded-md"
  >
    <div>
      <div><span class="text-primary">Name: </span></div>
    </div>
    <div>
      <AppButton @click="btnClicken" class="mt-1 max-h-full">Erledigt</AppButton
      >
    </div>
    <div
      class="absolute left-0 -mt-5 -ml-2 rounded-full bg-hh-red px-2 py-1 text-white"
    >
      {{ challenge.points }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['btnClicken']);
</script>
