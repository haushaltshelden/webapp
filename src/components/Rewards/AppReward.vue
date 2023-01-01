<template>
  <div
    class="m-3 flex justify-between border-secondary bg-hh-darkred p-2 text-xs rounded-lg"
  >
    <div><span class="text-primary">Name: </span>{{ reward.name }}</div>
    <AppButton
      @click="doneBtnClicked"
      v-if="reward.costs < points"
      >Einlösen</AppButton
    >
    <span class="mt-1 max-h-full" v-else>Zu wenig Punkte</span>
    <div
      class="absolute left-0 -mt-5 -ml-2 rounded-full bg-hh-red px-2 py-1 text-white"
    >
      {{ reward.costs }}
    </div>
  </div>
</template>

<script setup>
import AppButton from '../General/AppButton.vue';
import { collectReward } from '@/apollo/mutations';
import apolloClient from '@/plugins/apollo';
import { useUserStore } from '@/stores/user';
import moment from 'moment';
import { storeToRefs } from 'pinia';

const { points } = storeToRefs(useUserStore());

const props = defineProps({
  reward: Object,
});

moment.locale('de');

const emit = defineEmits(['rewardCollected']);

const doneBtnClicked = async () => {
  const { data } = await apolloClient.mutate({
    mutation: collectReward,
    variables: {
      id: props.reward._id,
    },
  });

  if (data.collectReward.success) {
    emit('rewardCollected');
  }
};
</script>
