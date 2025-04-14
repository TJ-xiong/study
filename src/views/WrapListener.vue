<template>
  <div>
    <div ref="contentRef">First：元素参与 transtion 的初始状态。Last：元素的最终状态。Invert：这让元素看起来仍然在初始的位置，所以元素并没有达到最终的位置。</div>
    <div style="margin: 20px">{{ isWrap ? '换行了' : '不换行' }}</div>

    <highlight-code code-id="wrapListener"/>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, onUnmounted, ref} from "vue";
import HighlightCode from "@/views/HighlightCode.vue";

const isWrap = ref<boolean>(false);
const contentRef = ref();

const resizeHandler = () => {
  if (contentRef.value) {
    const el = contentRef.value;
    let lineHeight = parseFloat(getComputedStyle(el).lineHeight);
    // 如果拿不到行高（是 normal），用 fontSize 的 1.2 倍来估算
    if (isNaN(lineHeight)) {
      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      lineHeight = fontSize * 1.2 // 根据经验，一般 normal 大约是 1.2~1.4 倍字体
    }
    const lines = Math.round(el.clientHeight / lineHeight);

    console.log('行数为：', lines);
    isWrap.value = lines > 1;
    if (isWrap.value) {
      console.log('文字换行了');
    } else {
      console.log('没有换行');
    }
  }
}

onMounted(() => {
  resizeHandler();
  window.addEventListener('resize', resizeHandler);
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHandler);
})
</script>