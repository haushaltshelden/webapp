<template>
  <div
    class="border-secondary bg-hh-darkred p-2 text-xs rounded-md relative w-[100%] mb-3"
  >
    <div class="flex justify-between">
      <div>
        <div>
          <span class="text-primary">Name: </span>{{ challenge.user.name }}
        </div>
      </div>
      <div>
        <div>
          {{ challenge.challenge.name }}
        </div>
      </div>
      <div
        class="absolute left-0 -mt-5 -ml-2 rounded-full bg-hh-red px-2 py-1 text-white"
      >
        {{ challenge.challenge.points }}
      </div>
    </div>
    <div>{{ moment(challenge.createdAt).subtract(1, 'second').fromNow() }}</div>
  </div>
</template>

<script setup>
import moment from 'moment';

moment.locale('de');

const props = defineProps({ challenge: Object });
</script>
