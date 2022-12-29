<template>
  <div
    class="m-3 flex justify-between border-secondary bg-hh-darkred p-2 text-xs rounded-lg"
  >
    <div>
      <div><span class="text-primary">Name: </span>{{ reward.name }}</div>
      <!-- <div v-if="challenge.last_done">
        <span class="text-primary">Zuletzt erledigt: </span
        >{{ moment(challenge.last_done).fromNow() }}
      </div> -->
    </div>
    <div>
      <AppButton @click="doneBtnClicked" class="mt-1 max-h-full" v-if="reward.costs < points">Einlösen</AppButton>
      <AppButton class="mt-1 max-h-full" v-else>Zu wenig Punkte</AppButton>
    </div>
    <div
      class="absolute left-0 -mt-5 -ml-2 rounded-full bg-hh-red px-2 py-1 text-white"
    >
      {{ reward.costs }}
    </div>
  </div>
</template>

<script setup>
import { collectReward } from '@/apollo/mutations';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import apolloClient from '@/plugins/apollo';
import AppButton from '../General/AppButton.vue';
import moment from 'moment';

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
