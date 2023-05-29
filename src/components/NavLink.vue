<template>
  <router-link class="nav-link" :to="`/tab/${props.id}`">
    <CustomIcon :name="icon" />
    {{ props.title }}
  </router-link>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import CustomIcon from "@/components/CustomIcon.vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.nav-link {
  position: relative;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: $color-black;
  text-decoration: none;
}

.router-link-exact-active {
  background-color: $color-white;
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0.3rem;
    background-color: $color-blocked;
  }
}
</style>
