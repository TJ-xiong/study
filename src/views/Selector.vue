<template>
  <div class="container">
    <div class="row">
      <label class="label">
        <span>账号</span> <input data-required type="text">
      </label>
    </div>
    <div class="row">
      <label class="label">
        <span>密码</span> <input type="text">
      </label>
    </div>
    <p class="content">
      the sun dipped below the horizon, casting a golden glow over the quiet countryside. A gentle breeze rustled
      through the trees, carrying the scent of blooming flowers and fresh earth. Birds chirped their evening songs,
      creating a melody that blended harmoniously with the whisper of the wind. In the distance, a small cottage stood
      nestled among rolling hills, its windows glowing warmly against the approaching dusk. Inside, a writer sat at an
      old wooden desk, pen in hand, lost in thought. Words flowed onto the paper, capturing the essence of the
      moment—fleeting, yet eternal.
    </p>

    <p>focus-within：它自身聚焦或是子元素被聚焦，都会触发</p>
    <p>has(选择器)：对之前选中的元素进一步约束</p>
    <p>first-letter：选中第一个字符</p>
    <p>selection：表示被选中的内容</p>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  width: 300px;
  margin: 10px 0;
  padding: 10px 20px;
}

.row:focus-within {
  background: aquamarine;
}

.label span:has(+input[data-required])::after {
  content: '*';
  color: red;
}

.content {
  width: 50%;
}

.content::first-letter {
  font-size: 4em;
  text-transform: uppercase;
  float: left;
  line-height: 1;
  margin-right: 10px;
}

.content::selection {
  background: #cccccc;
  color: darkkhaki;
  text-decoration: underline;
}
</style>