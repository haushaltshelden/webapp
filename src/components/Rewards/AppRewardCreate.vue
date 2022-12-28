<template>
  <div class="m-3">
    <div>Belohnung anlegen:</div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Name der Belohnung"
        v-model="name"
        class="mr-2 mt-2 border-2 border-hh-darkred bg-secondary p-1 pl-2"
      />
      <input
        type="number"
        placeholder="Kosten"
        v-model="costs"
        class="mr-2 mt-2 border-2 border-hh-darkred bg-secondary p-1 pl-2"
      />
      <AppButton class="" @click="btnClicked">Erstellen</AppButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apolloClient from '@/plugins/apollo';
import { createReward } from '@/apollo/mutations';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

import AppButton from '../General/AppButton.vue';

const name = ref('');
const costs = ref(0);

const emit = defineEmits(['rewardCreated'])

const btnClicked = async () => {
  const { data } = await apolloClient.mutate({
    mutation: createReward,
    variables: {
      name: name.value,
      costs: costs.value,
    },
  });

  emit('rewardCreated')
};
</script>
