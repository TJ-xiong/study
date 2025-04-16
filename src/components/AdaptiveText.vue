<template>
  <div
      ref="textRef"
      class="adaptive-text"
      :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  minFontSize: {
    type: Number,
    default: 14,
  },
  maxFontSize: {
    type: Number,
    default: 20,
  },
  lineHeight: {
    type: [Number, String],
    default: undefined, // <== 如果没传，我们自动推算
  },
  lines: {
    type: Number,
    default: 2,
  },
})

const textRef = ref(null)
const estimatedLineHeight = ref(1.4) // 默认值

const computedStyle = computed(() => {
  return {
    fontSize: `clamp(${props.minFontSize}px, 2vw, ${props.maxFontSize}px)`,
    lineHeight: props.lineHeight ?? estimatedLineHeight.value,
    maxHeight: `${(Number(props.lineHeight) ?? estimatedLineHeight.value) * props.lines}em`,
  }
})

function estimateLineHeight() {
  if (!textRef.value) return

  const el = textRef.value
  const computed = window.getComputedStyle(el)
  const fontSize = parseFloat(computed.fontSize)

  // 获取 lineHeight，处理 normal 的情况
  let rawLineHeight = computed.lineHeight
  let lineHeightPx = 0

  if (rawLineHeight === 'normal') {
    lineHeightPx = fontSize * 1.2 // 估算
  } else {
    lineHeightPx = parseFloat(rawLineHeight)
  }

  // 更新 em 值（即 lineHeight）
  estimatedLineHeight.value = parseFloat((lineHeightPx / fontSize).toFixed(2))
}

onMounted(() => {
  nextTick(estimateLineHeight)
})
</script>

<style scoped>
.adaptive-text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
</style>
