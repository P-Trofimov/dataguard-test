<template>
  <component :is="name" class="icon" :color="color" />
</template>

<script lang="ts">
import IconFinance from "./icons/IconFinance.vue";
import IconMarketing from "./icons/IconMarketing.vue";
import IconPeople from "./icons/IconPeople.vue";
import IconPower from "./icons/IconPower.vue";

export default {
  components: {
    IconFinance,
    IconMarketing,
    IconPeople,
    IconPower,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
    },
  },
};
</script>
