<template>
  <div class="flex justify-center border-b-4 border-hh-darkred py-2 relative">
    Übersicht
    <AppPoints class="absolute right-2 text-xs" />
  </div>
  <div class="mx-3 mt-3">
    <div class="mx-3 p-2">
      Mitglieder:
      <AppOverviewMember
        v-for="member in getMyHouseholdResult.getMyHousehold.members"
        :member="member"
        class="mt-1"
      />
    </div>
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
      <div>
        <AppButton @click="logout" class="mt-10">Ausloggen</AppButton>
        <div class="text-xs mt-3">Version: 0.0.6</div>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import AppButton from '../General/AppButton.vue';
import AppPoints from '../Points/AppPoints.vue';
import AppOverviewCreate from './AppOverviewCreate.vue';
import AppOverviewHousehold from './AppOverviewHousehold.vue';
import AppOverviewLastChallenges from './AppOverviewLastChallenges.vue';
import AppOverviewLastRewards from './AppOverviewLastRewards.vue';
import AppOverviewMember from './AppOverviewMember.vue';
import {
  getHouseholds,
  getLastChallenges,
  getLastRewards,
} from '@/apollo/queries';
import { getMyHousehold as getMyHouseholdQuery } from '@/apollo/queries';
import apolloClient from '@/plugins/apollo';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { getMyHousehold, leaveHousehold, logout } = useUserStore();
getMyHousehold();

const { user } = storeToRefs(useUserStore());

const { data } = await apolloClient.query({ query: getHouseholds });

const { data: getMyHouseholdResult } = await apolloClient.query({
  query: getMyHouseholdQuery,
  cache: 'no-cache',
});

const { data: getLastChallengesResult } = await apolloClient.query({
  query: getLastChallenges,
});
const { data: getLastRewardsResult } = await apolloClient.query({
  query: getLastRewards,
});
</script>
