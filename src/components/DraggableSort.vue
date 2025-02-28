<template>
  <div class="container">
    <div class="item" draggable="true">1</div>
    <div class="item" draggable="true">2</div>
    <div class="item" draggable="true">3</div>
    <div class="item" draggable="true">4</div>
    <div class="item" draggable="true">5</div>
  </div>
</template>
<script setup lang="ts">
import {onMounted} from "vue";

let source: HTMLElement | null = null;

onMounted(() => {
  const container: HTMLElement | null = document.querySelector('.container');
  if (!container) return;
  container.ondragstart = (e) => {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move';
    }
    // 强制类型转换，告诉 TypeScript e.target 是 HTMLElement
    source = e.target as HTMLElement; // 被拖动的东西
    setTimeout(() => {
      source?.classList.add('moving');
    }, 0)
    // 改变鼠标样式
  }

  container.ondragenter = (e) => {
    e.preventDefault();
    if (!source) return; // 边界值处理
    const target = e.target as HTMLElement; // 拖拽进入的东西
    if (target === container || target === source) return; // 进入的是父元素和自身则不做处理
    // 拖拽的元素的下标
    const sourceIndex = Array.from(container.children).indexOf(source);
    // 进入的元素的下标
    const targetIndex = Array.from(container.children).indexOf(target);
    if (sourceIndex < targetIndex) {
      console.log('向下')
      container.insertBefore(target, source);
    } else {
      console.log('向上')
      container.insertBefore(source, target);
    }
  }

  container.ondragend = (e) => {
    let target = e.target as HTMLElement;
    target.classList.remove('moving');
    source = null;
  }

  container.ondragover = (e) => {
    // 阻止默认行为
    e.preventDefault();
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.item {
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: dodgerblue;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
}

.item.moving {
  background: #ccc;
  color: transparent;
}
</style>