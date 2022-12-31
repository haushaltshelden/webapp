<template>
  <div class="flex justify-center border-b-4 border-hh-darkred py-2 relative">
    Übersicht
    <AppPoints class="absolute right-2 text-xs" />
  </div>
  <div class="mx-3 mt-3">
    <div v-if="!user.household">
      <AppOverviewCreate class="mb-4" />
      <AppOverviewHousehold
        v-for="(household, i) in data.getHouseholds"
        :index="household._id"
        :household="data.getHouseholds[i]"
        class="mb-4"
      />
    </div>
    <div v-else class="m-3">
        <div class="ml-3">Erledigte Aufgaben</div>
        <AppOverviewLastChallenges
          v-for="lastChallenge in getLastChallengesResult.getLastChallenges"
          :challenge="lastChallenge"
        />
      <div>
        <div class="ml-3">Erhaltene Belohnungen</div>
        <AppOverviewLastRewards
          v-for="lastReward in getLastRewardsResult.getLastRewards"
          :reward="lastReward"
        />
      </div>

      <AppButton @click="leaveHousehold">Haushalt verlassen</AppButton>
    </div>
    <AppButton @click="logout">Ausloggen</AppButton>
    <div class="text-xs mt-1">Version: 0.0.4</div>
  </div>
</template>

<script setup>
import AppButton from '../General/AppButton.vue';
import AppPoints from '../Points/AppPoints.vue';
import AppOverviewCreate from './AppOverviewCreate.vue';
import AppOverviewHousehold from './AppOverviewHousehold.vue';
import AppOverviewLastChallenges from './AppOverviewLastChallenges.vue';
import AppOverviewLastRewards from './AppOverviewLastRewards.vue';
import {
  getHouseholds,
  getLastChallenges,
  getLastRewards,
} from '@/apollo/queries';
import apolloClient from '@/plugins/apollo';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { getMyHousehold, leaveHousehold, logout } = useUserStore();
getMyHousehold();

const { user } = storeToRefs(useUserStore());

const { data } = await apolloClient.query({ query: getHouseholds });

const { data: getLastChallengesResult } = await apolloClient.query({
  query: getLastChallenges,
});
const { data: getLastRewardsResult } = await apolloClient.query({
  query: getLastRewards,
});

console.log(getLastRewardsResult);
</script>
