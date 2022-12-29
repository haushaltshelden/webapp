<template>
  <div>
    <div>Haushalt erstellen:</div>
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Name des Haushalts"
        v-model="name"
        class="mr-2 mt-2 border-2 border-hh-darkred bg-secondary p-1 pl-2"
      />
      <AppButton class="" @click="btnClicked">Erstellen</AppButton>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import apolloClient from '@/plugins/apollo';
import { createHousehold } from '@/apollo/mutations';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

import AppButton from '../General/AppButton.vue';

const name = ref('');

const btnClicked = async () => {
  const { user } = storeToRefs(useUserStore());

  const {data} = await apolloClient.mutate({
    mutation: createHousehold,
    variables: {
      name: name.value,
    },
  });

  if (data.createHousehold.success) {
    const { getMyHousehold } = useUserStore();

    getMyHousehold();
  }
};
</script>
