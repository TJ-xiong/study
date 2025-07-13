<script setup lang="ts">
import TextCollapse from "@/components/TextCollapse.vue";
import {h} from "vue";

const content = "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "这是一段很长的文本内容，用于测试文本折叠效果。" +
    "再加一段内容，确保超过三行。";

const content1 = h('div', {
  style: {
    color: "green",
  }
}, "这是一段很长的文本内容，用于测试文本折叠效果.这是一段很长的文本内容，用于测试文本折叠效果.这是一段很长的文本内容，用于测试文本折叠效果");

const content2 = [
  h('div', {
  style: {
    color: "green",
  }
},
"这是一段很长的文本内容，用于测试文本折叠效果."
),
h('div', {
  style: {
    color: "green",
  }
},
"这是一段很长的文本内容，"
)
]
</script>

<template>
  <div>
    <div style="width: 300px">
      <TextCollapse :content="content2" :line-clamp="2"/>
    </div>
  </div>
</template>

<style scoped>

</style>