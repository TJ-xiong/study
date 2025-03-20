<script setup lang="ts">
import router from "@/router";

function toPage(url: string) {
  router.push(url);
}
</script>

<template>
  <main style="height: 100%; width: 100%;">
    <div class="container">
      <div class="item" @click="toPage('/draggableSort')">
        拖拽
      </div>
      <div class="item" @click="toPage('/flipAnimation')">
        FLIP动画(元素结构发生变化的动画)
      </div>
      <div class="item" @click="toPage('/throttle_debounce')">
        节流throttle和防抖debounce
      </div>
      <div class="item" @click="toPage('/selector')">
        特殊的选择器
      </div>
      <div class="item" @click="toPage('/musicScroll')">
        歌词滚动+音频可视化
      </div>
      <div class="item" @click="toPage('/flexboxHeterogeneousLayout')">
        弹性盒的异性布局
      </div>
      <div class="item" @click="toPage('/echartsAutoY')">
        Echarts动态Y轴
      </div>
      <div class="item" @click="toPage('/eChartsAdaptive')">
        Echarts大小自适应
      </div>
      <div class="item" @click="toPage('/echartsSetThePositionOfAxisPointer')">
        Echarts手动设置axisPointer的位置
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: start;
}

.item {
  cursor: pointer;
  background-color: aquamarine;
  height: 10vh;
  min-width: 10vw;
  font-size: 24px;
  text-align: center;
  line-height: 10vh;
  text-wrap: nowrap;
  padding: 0 1rem;
  margin: 20px;
  border-radius: 10px;
}
</style>
