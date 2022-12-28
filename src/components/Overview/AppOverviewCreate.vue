<template>
   <div>
      <div>Haushalt erstellen:</div>
      <form @submit.prevent="onSubmit">
         <input
            type="text"
            placeholder="Name des Haushalts"
            v-model="name"
            class="bg-secondary border-hh-darkred mr-2 mt-2 border-2 p-1 pl-2"
         />
         <AppButton class="" @click="btnClicked">Erstellen</AppButton>
      </form>
   </div>
</template>

<script setup>
import { ref } from 'vue';
import apolloClient from '@/plugins/apollo';
import { createHousehold } from '@/apollo/mutations';

import AppButton from '../General/AppButton.vue';

const name = ref('');

const btnClicked = async () => {
   await apolloClient.mutate({
      mutation: createHousehold,
      variables: {
         name: name.value,
      },
   });
};
</script>
