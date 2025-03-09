temp
<template>
  <div>
    <button style="width: 60px;margin-left: 400px;padding: 10px" @click="start">start</button>
    <div class="container">
      <div class="item" style="background: crimson">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
    </div>
  </div>
</template>

<script setup lang="ts">
function start() {
  let container = document.querySelector('.container') as HTMLElement;
  let elements = Array.from(container.children);
  if (elements.length === 0) return; // 处理空容器
  let first = elements[0] as HTMLElement;
  let startPos = first.offsetTop;
  // 移动元素到末尾
  container.appendChild(first);
  const distance = first.offsetTop - startPos;
  // 重置过渡并应用初始变换
  first.style.transition = 'none'; // 清除之前的过渡
  first.style.transform = `translateY(${-distance}px)`;
  // 启用过渡并触发动画
  requestAnimationFrame(() => {
    first.style.transition = 'transform 1s';
    first.style.transform = 'none';
  });
}
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
</style>