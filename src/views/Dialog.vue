<template>
  <div>
    <div class="btn">
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog" target="_blank">MDN文档</a>
      <button onclick="dog.show()">普通弹窗</button>
      <button onclick="dog.showModal()">模态弹窗</button>
    </div>
    <dialog id="dog">
      <div>
        <p>弹窗</p>
        <p>showModel弹窗才能设置蒙层效果和毛玻璃（backdrop）</p>
        <p>
          <input type="text"/>
        </p>
        <p>
          <input type="text"/>
        </p>
        <button onclick="dog.close()">关闭</button>
      </div>
    </dialog>
    <HighlightCode code-id="dialog"/>
  </div>
</template>

<script setup lang="ts">

import HighlightCode from "@/views/HighlightCode.vue";
</script>

<style scoped>
dialog {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 50px;
}

dialog::backdrop {
  background: rgba(23, 234, 100, 0.5);
  backdrop-filter: blur(5px);
}

.btn {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>