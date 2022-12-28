<template>
  <div class="flex justify-center border-b-4 border-hh-darkred py-2">
    Aufgaben
  </div>
  <AppChallenge
    v-for="challenge in challenges"
    :index="challenge._id"
    :challenge="challenge"
    class="relative"
    @challenge-done="challengeDone"
  />
  <AppButton class="ml-3" @click="createDialogOpen = !createDialogOpen"
    >Aufgabe erstellen</AppButton
  >
  <div v-if="createDialogOpen">
    <AppChallengeCreate @challenge-created="challengeDone"/>
  </div>
</template>

<script setup>
import AppChallengeCreate from './AppChallengeCreate.vue';
import AppChallenge from './AppChallenge.vue';

import apolloClient from '@/plugins/apollo';
import { getChallenges } from '@/apollo/queries';

import { ref } from 'vue';
import AppButton from '../General/AppButton.vue';

const createDialogOpen = ref(false);

const challenges = ref();

const { data } = await apolloClient.query({
  query: getChallenges,
  fetchPolicy: "no-cache"
});

challenges.value = data.getChallenges;

const challengeDone = async () => {
  const { data } = await apolloClient.query({
    query: getChallenges,
    fetchPolicy: "no-cache"
  });

  challenges.value = data.getChallenges;
};
</script>
