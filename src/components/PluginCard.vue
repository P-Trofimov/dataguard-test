<template>
  <div class="card" :class="{ disabled: props.disabled }">
    <header class="header">
      <h3>{{ props.title }}</h3>
      <ToggleSwitch :value="props.active" @input="toggleActive" />
    </header>
    <p class="text">{{ props.description }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function toggleActive(event: any) {
  console.log(event);
}
</script>

<style lang="scss" scoped>
.card {
  padding: 1rem;

  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
