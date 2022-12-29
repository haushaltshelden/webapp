<template>
  <div class="mb-12 bg-primary min-h-[94.3vh] pb-5">
    <AppOverview v-if="currentPage === 'overview'"/>
    <AppChallenges v-if="currentPage === 'challenges'" />
    <AppRewards v-if="currentPage === 'rewards'" />
  </div>
  <AppHeader class="max-w-[800px] min-w-[300px]"/>
</template>

<script setup>
import { useDashboardStore } from '@/stores/useDashboard';
import { storeToRefs } from 'pinia';

import AppHeader from './AppHeader.vue';
import AppOverview from '../Overview/AppOverview.vue';
import AppChallenges from '../Challenges/AppChallenges.vue';
import AppRewards from '../Rewards/AppRewards.vue';

const { currentPage } = storeToRefs(useDashboardStore())

</script>
