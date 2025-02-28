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
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}

.item {
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
