<template>
  <div class="flex justify-center py-3 border-t-4 border-hh-darkred textShadow fixed bottom-0 w-screen bg-secondary">
    <span class="mx-3" @click="btnClicked('overview')">Übersicht</span>
    <span class="mx-3" @click="btnClicked('challenges')">Aufgaben</span>
    <span class="mx-3" @click="btnClicked('rewards')">Belohnungen</span>
  </div>
</template>

<script setup>
import { useDashboardStore } from '@/stores/useDashboard';
import { storeToRefs } from 'pinia';

const { currentPage } = storeToRefs(useDashboardStore())

const btnClicked = (target) => {
  currentPage.value = target;
}
</script>

<style>
.textShadow {
  text-shadow: 0px 1px 6px #FE4A49;
}
</style>