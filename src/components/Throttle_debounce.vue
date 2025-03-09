<template>
  <div class="container">
    <div>num: {{ num }}</div>

    <div class="btn" @click="onclickThrottle">节流 num + 1</div>
    <div class="btn" @click="onclickDebounced">防抖 num + 1</div>
  </div>
</template>
<script setup lang="ts">
import {type Ref, ref} from "vue";

const num: Ref<number> = ref(0);

function onclickThrottle() {
  throttleAdd(1);
}

function onclickDebounced() {
  debounceAdd(1);
}

/**
 * 防抖
 * 延迟执行传入的方法
 * @param fun
 * @param time
 */
function debounce<T extends (...args: any[]) => void>(fun: T, time: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, time);
  } as T;
}

const debounceAdd = debounce((num1) => {
  num.value += num1;
}, 1000);

/**
 * 节流
 * 指定时间内只能执行一次传入的方法
 * @param fun
 * @param time
 */
function throttle<T extends (...args: any[]) => void>(fun: T, time: number): T {
  let lastTime: number | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    if (lastTime === null || now - lastTime > time) {
      lastTime = now;
      fun.apply(this, args);
    }
  } as T;
}

const throttleAdd = throttle((num1) => {
  num.value += num1;
}, 1000);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container div:nth-child(2n) {
  margin: 10px 0;
}

.btn {
  cursor: pointer;
  display: inline-block;
  background: aquamarine;
  padding: 10px 20px;
  border-radius: 16px;
}
</style>