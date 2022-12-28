<template>
  <div class="flex justify-center border-b-4 border-hh-darkred py-2">
    Belohnungen
  </div>
  <AppReward
    v-for="reward in rewards"
    :index="reward._id"
    :reward="reward"
    class="relative"
    @reward-collected="rewardCollected"
  />
  <AppButton class="ml-3" @click="createDialogOpen = !createDialogOpen"
    >Belohnung anlegen</AppButton
  >
  <div v-if="createDialogOpen">
    <AppRewardCreate @reward-created="rewardCollected" />
  </div>
</template>

<script setup>
import AppRewardCreate from './AppRewardCreate.vue';
import AppReward from './AppReward.vue';

import apolloClient from '@/plugins/apollo';
import { getRewards } from '@/apollo/queries';

import { ref } from 'vue';
import AppButton from '../General/AppButton.vue';

const createDialogOpen = ref(false);

const rewards = ref();

const { data } = await apolloClient.query({
  query: getRewards,
  fetchPolicy: 'no-cache',
});

rewards.value = data.getRewards;

const rewardCollected = async () => {
  const { data } = await apolloClient.query({
    query: getRewards,
    fetchPolicy: 'no-cache',
  });

  rewards.value = data.getRewards;
};
</script>
