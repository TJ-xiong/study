<template>
  <div class="container">
    <div class="toolbar">
      <div class="handle-btn" @click="showCode = !showCode">{{handleBtnCtn}}</div>
    </div>
    <highlightjs v-show="showCode" class="code" autodetect :code="code"/>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, type Ref, watch} from "vue";
import {Code} from "@/code/HighlightCode.ts";

const code: Ref<string> = ref('');
const props = withDefaults(defineProps<{ codeId: string }>(), { codeId: '1' });
const showCode = ref(false);
const handleBtnCtn = computed(() => (showCode.value ? "收起 ▲" : "查看源码 ▼"));


// function toggleHeight() {
//   const codeDom = document.querySelector('.code') as HTMLElement;
//   const targetHeight = showCode ? 0 : codeDom.scrollHeight;
//   animateHeight(codeDom, targetHeight);
// }
//
// function animateHeight(element: HTMLElement, targetHeight: number, duration = 500) {
//   const startHeight = element.clientHeight;
//   const startTime = performance.now();
//
//   function step(currentTime: number) {
//     const elapsed = currentTime - startTime;
//     const progress = Math.min(elapsed / duration, 1);
//     const newHeight = startHeight + (targetHeight - startHeight) * progress;
//     element.style.height = `${newHeight}px`;
//
//     if (progress < 1) {
//       requestAnimationFrame(step);
//     }
//   }
//
//   requestAnimationFrame(step);
// }

onMounted(() => {
  const codeKey = `code_${props.codeId}` as keyof typeof Code;
  code.value = Code[codeKey];
})
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  background-color: #282C34;
  margin: 2vh 10vw 10vh 10vw;
  padding: 1vh 0;
  border-radius: 20px;
  font-size: calc(10px + 1.3vmin);

  .toolbar {
    width: 92%;
    height: 60px;

    .handle-btn {
      background-color: #2c3e50;
      color: white;
      padding: 10px 20px;
      cursor: pointer;
      border-radius: 8px;
      display: inline-block;
      transition: background-color 0.3s;
    }
  }

  .handle-btn:hover {
    background-color: #5c6370;
  }

  .code {
    width: 90%;
  }
}
</style>