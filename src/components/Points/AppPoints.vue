<template>
  <div class="bg-hh-darkred rounded-full p-1 px-2">{{ points }}</div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { points } = storeToRefs(useUserStore());
</script>