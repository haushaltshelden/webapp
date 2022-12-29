<template>
  <div class="flex justify-center border-b-4 border-hh-darkred py-2 relative">
    Übersicht
    <AppPoints class="absolute right-2 text-xs"/>
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
  <div v-else>
    <AppButton @click="leaveHousehold">Haushalt verlassen</AppButton>
  </div>
  <AppButton @click="logout">Ausloggen</AppButton>
  </div>
</template>

<script setup>
import { getHouseholds } from '@/apollo/queries';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import apolloClient from '@/plugins/apollo';
import AppButton from '../General/AppButton.vue';
import AppOverviewCreate from './AppOverviewCreate.vue';
import AppOverviewHousehold from './AppOverviewHousehold.vue';
import AppPoints from '../Points/AppPoints.vue';

const { getMyHousehold, leaveHousehold, logout } = useUserStore();
getMyHousehold();

const { user } = storeToRefs(useUserStore());

const { data } = await apolloClient.query({ query: getHouseholds });
</script>
