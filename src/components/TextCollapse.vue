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
        <template v-else-if="isStringContent">{{ content }}</template>
      </div>
    </div>

    <!-- 按钮始终在右下角 -->
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
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, isVNode } from 'vue'
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'

// 通过 props 获取数据
const props = defineProps({
  content: {
    type: [String, Object, Array],
    required: true
  },
  lineClamp: {
    type: Number,
    default: 2
  }
})

const isShowBtn = ref(false)
const state = ref(false)
const textHeight = ref(null)
const textInitialHeight = ref(0)
const textLineHeight = ref(22) // 默认行高
const textCollapseRef = ref(null)
const isVNodeContent = ref(false)
const isVNodeArrayContent = ref(false)
const isStringContent = ref(false)

let observer = null

function init() {
  // 判断 content 是不是 VNode 类型的内容
  isVNodeContent.value = isVNode(props.content)
  isVNodeArrayContent.value = Array.isArray(props.content) && props.content.length > 0 && props.content.every(isVNode)
  isStringContent.value = typeof props.content === 'string'
}

onMounted(() => {
  if (!textCollapseRef.value) return
  const el = textCollapseRef.value
  // 使用 ResizeObserver 监听内容区域的大小变化
  observer = new ResizeObserver(() => {
    const style = window.getComputedStyle(el)
    const height = el.scrollHeight
    const lineHeight = parseInt(style.lineHeight) || textLineHeight.value
    textInitialHeight.value = height
    textLineHeight.value = lineHeight
    const collapsedHeight = lineHeight * props.lineClamp
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
  textHeight.value = val ? textInitialHeight.value : textLineHeight.value * props.lineClamp
})

watch(() => props.content, (val) => {
  init();
})

const handleClick = () => {
  state.value = !state.value
}
</script>

<style scoped lang="scss">
.desc {
  position: relative;
  display: flex;
  flex-direction: row; /* 左右布局 */
  justify-content: flex-start; /* 左对齐 */
  align-items: flex-end; /* 顶部对齐 */
  margin-top: 11px;
  margin-bottom: 8px;

  .text {
    flex: 1; /* 使文本部分占据剩余的空间 */
    position: relative;
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-align: justify;
    transition: height 0.3s ease;

    .content {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      white-space: normal;
      word-break: break-word;
      &.expanded {
        display: block;
        overflow: visible;
      }
    }
  }

  /* 右侧的展开收起按钮 */
  .toggle-btn {
    background: linear-gradient(to right, transparent 0%, #fff 30%);
    padding-left: 10px;
    font-size: 14px;
    color: #0e6eb8;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
  }
}
</style>
