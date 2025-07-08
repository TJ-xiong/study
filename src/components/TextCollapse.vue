<template>
  <div class="desc">
    <div ref="textCollapseRef" :class="['text', {'active': isShow}]"
         :style="{height: textHeight ? textHeight + 'px' : ''}">
      <span class="btn" v-if="isShowBtn && !state" @click="handleClick">
          展开
        <el-icon style="color: #0e6eb8;"><CaretBottom/></el-icon>
      </span>
      {{ title }}
      <span class="putItAway" v-if="state" @click="handleClick">
        收起
        <el-icon style="color: #0e6eb8;"><CaretTop/></el-icon>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, nextTick} from 'vue'
import {CaretBottom, CaretTop} from '@element-plus/icons-vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  lineClamp: {
    type: Number,
    default: 2, // 默认两行
  }
})

const isShow = ref(false) // 展开、收起状态
const isShowBtn = ref(false) // 展开、收起 是否展示
const state = ref(false) // 展开还是收起
const textHeight = ref<number | null>(null) // text 高度
const textInitialHeight = ref(0) // 元素初始高度
const textLineHeight = ref(0) // 元素行高
const textCollapseRef = ref<HTMLElement | null>(null)

onMounted(() => {
  nextTick(() => {
    if (!textCollapseRef.value) return

    const textStyle = window.getComputedStyle(textCollapseRef.value)
    const height = parseInt(textStyle.height)
    const lineHeight = parseInt(textStyle.lineHeight)

    textInitialHeight.value = height
    textLineHeight.value = lineHeight

    if (height > lineHeight * props.lineClamp + 1) {
      isShow.value = true
      isShowBtn.value = true
      textHeight.value = lineHeight * props.lineClamp
    } else {
      textHeight.value = height
    }
  })
})

watch(state, (val) => {
  textHeight.value = val ? textInitialHeight.value : textLineHeight.value * props.lineClamp
})

const handleClick = () => {
  isShow.value = !isShow.value
  state.value = !state.value
}
</script>

<style scoped lang="scss">
.desc {
  margin-top: 11px;
  margin-bottom: 8px;
  display: flex;

  .text {
    font-weight: 400;
    font-size: 14px;
    color: #333333;
    line-height: 22px;
    transition: height .3s ease;
    overflow: hidden;
    text-align: justify;

    .btn {
      cursor: pointer;
      margin-left: 12px;
      margin-right: -8px;
      float: right;
      clear: both;
      height: 22px;
      font-weight: 400;
      font-size: 14px;
      color: #0e6eb8;
      line-height: 22px;
      transform: translate(-6px, -4px);
    }

    .putItAway {
      margin-left: 6px;
      width: 50px;
      height: 22px;
      font-weight: 400;
      font-size: 14px;
      color: #0e6eb8;
      cursor: pointer;

      .icon {
        vertical-align: middle;
      }
    }
  }

  .text.active {
    display: -webkit-box;
    -webkit-line-clamp: v-bind('props.lineClamp'); // 使用 v-bind 绑定 props
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .text::before {
    content: '';
    float: right;
    height: calc(100% - 19px);
  }
}
</style>
