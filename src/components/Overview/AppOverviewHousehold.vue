<template>
  <div class="flex justify-between border-4 border-hh-darkred p-2">
    <div>
      <div><span class="text-hh-red">Name: </span>{{ household.name }}</div>
      <div>
        <span class="text-hh-red">Mitglieder: </span>{{ household.membercount }}
      </div>
    </div>
    <AppButton @click="joinBtnClicked">Beitreten</AppButton>
  </div>
</template>

<script setup>
import apolloClient from '@/plugins/apollo';
import { joinHousehold } from '@/apollo/mutations';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

import AppButton from '../General/AppButton.vue';

const props = defineProps({
  household: Object,
});

const joinBtnClicked = async () => {
  const { data } = await apolloClient.mutate({
    mutation: joinHousehold,
    variables: { id: props.household._id },
  });

  if (!data.joinHousehold.success) console.log(data);
  else {
    const { user } = storeToRefs(useUserStore())
    user.value.household = props.household._id;
  }
};
</script>
