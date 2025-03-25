<template>
  <div>
    <SliderComponent
      ref="sliderRef"
      :values="myValues"
      :totalWidth="400"
      :gapSize="50"
      :itemsPerPage="7"
      @update:currentValue="handleCurrentValueUpdate"
    />
    <div class="button-container">
      <button @click="prevPage">前一页</button>
      <button @click="nextPage">后一页</button>
    </div>
    <HighlightCode code-id="sliderComponent"/>
    <HighlightCode code-id="echartsSlideX"/>
  </div>
</template>

<script setup lang="ts">
import {type ComponentPublicInstance, ref} from 'vue';
import HighlightCode from "@/views/HighlightCode.vue";
import SliderComponent from "@/components/SliderComponent.vue";

const myValues = Array.from({ length: 30 }, (_, i) => i * 10)

const handleCurrentValueUpdate = (newValue: any) => {
  console.log('当前值:', newValue)
}

const sliderRef = ref<SliderInstance | null>(null)

// 定义类型，假设 SliderComponent 有 prevPage 方法
type SliderInstance = ComponentPublicInstance<{
  prevPage: () => void;
  nextPage: () => void;
}>;

const prevPage = (): void => {
  if (sliderRef.value) {
    sliderRef.value.prevPage()
  }
}

const nextPage = (): void => {
  if (sliderRef.value) {
    sliderRef.value.nextPage()
  }
}
</script>

<style scoped>
.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

button {
  margin: 0 5px;
}
</style>