<template>
  <div
    class="m-3 flex justify-between border-secondary bg-hh-darkred p-2 text-xs rounded-md"
  >
    <div>
      <div><span class="text-primary">Name: </span>{{ challenge.name }}</div>
      <div v-if="challenge.last_done">
        <span class="text-primary">Zuletzt erledigt: </span
        >{{ moment(challenge.last_done).subtract(1, 'second').fromNow() }}
      </div>
    </div>
    <div>
      <AppButton @click="doneBtnClicked" class="mt-1 max-h-full"
        >Erledigt</AppButton
      >
    </div>
    <div
      class="absolute left-0 -mt-5 -ml-2 rounded-full bg-hh-red px-2 py-1 text-white"
    >
      {{ challenge.points }}
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'

import AppButton from '../General/AppButton.vue';
import { completeChallenge } from '@/apollo/mutations';
import apolloClient from '@/plugins/apollo';

const props = defineProps({
  challenge: Object,
});

moment.locale('de');

const emit = defineEmits(['challengeDone'])

const doneBtnClicked = async () => {
  const { data } = await apolloClient.mutate({
    mutation: completeChallenge,
    variables: {
      id: props.challenge._id,
    },
  });

  if (data.completeChallenge.success) {
    emit('challengeDone')
  }
};
</script>
