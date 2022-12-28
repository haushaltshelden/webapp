<template>
   <div class="border-hh-darkred flex justify-center border-b-4 py-2">
      Übersicht
   </div>
   <div class="m-3" v-if="!user.household">
    <AppOverviewCreate class="mb-4"/>
    <AppOverviewHousehold v-for="(household, i) in data.getHouseholds" :index="household._id" :household="data.getHouseholds[i]" class="mb-4"/>
   </div>
   <div v-else>
    <AppButton @click="leaveHousehold">Verlassen</AppButton>
   </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import apolloClient from '@/plugins/apollo';
import { getHouseholds } from '@/apollo/queries';

import AppOverviewCreate from './AppOverviewCreate.vue';
import AppOverviewHousehold from './AppOverviewHousehold.vue';
import AppButton from '../General/AppButton.vue';

const { getMyHousehold, leaveHousehold } = useUserStore();
getMyHousehold();

const { user } = storeToRefs(useUserStore());

const { data } = await apolloClient.query({ query: getHouseholds });

</script>
