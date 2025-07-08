<script setup lang="ts">
import TextCollapse from "@/components/TextCollapse.vue";

const content = "这是一段很长的文本内容，用于测试文本折叠效果这是一段很长的文本内容，用于测试文本折叠效果。这是一段很长的文本内容，用于测试文本折叠效果。这是一段很长的文本内容，用于测试文本折叠效果。。";
</script>

<template>
  <div>
    <div style="width: 300px">
      <TextCollapse :title="content" :line-clamp="3"/>
    </div>
  </div>
</template>

<style scoped>

</style>