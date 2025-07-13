<template>
  <div class="desc">
    <div
        ref="textCollapseRef"
        class="text"
        :style="{ height: textHeight ? textHeight + 'px' : 'auto' }"
    >
      <!-- 内容区域 -->
      <div class="content" :class="{ expanded: state }">
        <template v-if="isVNodeArrayContent">
          <component v-for="(vnode, idx) in content" :is="vnode" :key="idx" />
        </template>
        <component v-else-if="isVNodeContent" :is="content" />
        <template v-else>{{ content }}</template>
      </div>

      <!-- 按钮始终在最后行末尾 -->
      <span
          class="toggle-btn"
          v-if="isShowBtn"
          @click="handleClick"
      >
        {{ state ? '收起' : '展开' }}
        <el-icon style="color: #0e6eb8;">
          <component :is="state ? CaretTop : CaretBottom" />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, isVNode, type VNode } from 'vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'

const props = defineProps<{
  content: string | VNode | VNode[]
  lineClamp?: number
}>()

const lineClamp = props.lineClamp ?? 2

const isShowBtn = ref(false)
const state = ref(false)
const textHeight = ref<number | null>(null)
const textInitialHeight = ref(0)
const textLineHeight = ref(22) // 默认行高
const textCollapseRef = ref<HTMLElement | null>(null)
const isVNodeContent = ref(false)
const isVNodeArrayContent = ref(false)

let observer: ResizeObserver | null = null

onMounted(() => {
  isVNodeContent.value = isVNode(props.content)
  isVNodeArrayContent.value = Array.isArray(props.content) && props.content.length > 0 && props.content.every(isVNode)

  if (!textCollapseRef.value) return

  const el = textCollapseRef.value

  observer = new ResizeObserver(() => {
    const style = window.getComputedStyle(el)
    const height = el.scrollHeight
    const lineHeight = parseInt(style.lineHeight) || textLineHeight.value

    textInitialHeight.value = height
    textLineHeight.value = lineHeight

    const collapsedHeight = lineHeight * lineClamp

    console.log('height:', height, 'collapsedHeight:', collapsedHeight);

    if (height > collapsedHeight + 1) {
      isShowBtn.value = true
      textHeight.value = state.value ? height : collapsedHeight
    } else {
      isShowBtn.value = false
      textHeight.value = height
    }
  })

  observer.observe(el)
})

onBeforeUnmount(() => {
  if (observer && textCollapseRef.value) {
    observer.unobserve(textCollapseRef.value)
    observer.disconnect()
  }
})

watch(state, (val) => {
  textHeight.value = val ? textInitialHeight.value : textLineHeight.value * lineClamp
})

const handleClick = () => {
  state.value = !state.value
}
</script>

<style scoped lang="scss">
.desc {
  position: relative;
  margin-top: 11px;
  margin-bottom: 8px;
  display: flex;

  .text {
    position: relative;
    font-size: 14px;
    color: #333;
    line-height: 22px;
    overflow: hidden;
    text-align: justify;
    transition: height 0.3s ease;

    .content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
      &.expanded {
        display: block;
        -webkit-line-clamp: unset;
        overflow: visible;
      }
    }

    .toggle-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent 0%, #fff 30%);
      padding-left: 10px;
      font-size: 14px;
      color: #0e6eb8;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }
  }
}
</style>
