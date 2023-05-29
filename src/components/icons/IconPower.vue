<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="props.color"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-power"
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" x2="12" y1="2" y2="12"></line>
  </svg>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "currentColor",
  },
});
</script>
