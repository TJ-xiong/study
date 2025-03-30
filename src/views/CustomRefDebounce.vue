<template>
  <div>
    <div class="customRefDebounce">
      <a href="https://cn.vuejs.org/api/reactivity-advanced.html#customref" target="_blank">vue官方实践Demo</a>
      <input v-model="text">
      {{text}}
    </div>
    <HighlightCode code-id="customRefDebounce"/>
  </div>
</template>

<script setup lang="ts">
import { debounceRef } from '@/util/debounceRef.ts'
import HighlightCode from "@/views/HighlightCode.vue";

const text = debounceRef('', 500);
</script>

<style scoped>
.customRefDebounce {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>