<template>
  <div class="demo">
    <h2>字体大小调整</h2>
    <input
        type="range"
        min="12"
        max="28"
        v-model="fontSize"
    />
    <span class="font-label">{{ fontSize }}px</span>

    <h3>❌ 使用 px 限制 max-height（固定高度）</h3>
    <div class="text-box text-px" :style="pxStyle">
      {{ longText }}
    </div>

    <h3>✅ 使用 em 限制 max-height（随字体变化）</h3>
    <div class="text-box text-em" :style="emStyle">
      {{ longText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const fontSize = ref(16)

const longText = `
  这是一段比较长的中文文本，用于展示多行文字的截断效果。
  随着你拖动滑块改变字体大小，你可以观察到使用 em 的方式可以更加自适应和准确地控制最多显示两行。
  而使用 px 的方式在字体变大时就会出现被截断不准的问题。
`

const pxStyle = computed(() => ({
  fontSize: `${fontSize.value}px`,
  maxHeight: '40px', // 固定高度：约 2 行 @ 20px 字号
  lineHeight: '1.4',
}))

const emStyle = computed(() => ({
  fontSize: `${fontSize.value}px`,
  lineHeight: '1.4',
  maxHeight: `${1.4 * 2}em`, // 自适应 2 行
}))
</script>

<style scoped>
.demo {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}
input {
  width: 100%;
  margin-bottom: 10px;
}
.font-label {
  display: inline-block;
  margin-left: 8px;
}
.text-box {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 0;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
