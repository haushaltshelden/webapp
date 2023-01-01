<template>
  <div>
    <span class="rounded-full bg-hh-red px-1 py-1 text-xs text-white">{{ member.points }}</span>
    {{ member.name }}
  </div>
  
</template>

<script setup>
const props = defineProps({member: Object})
</script>