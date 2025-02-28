<script setup lang="ts">
import {RouterView} from 'vue-router'
import router from "@/router";
</script>

<template>
  <div>
    <div class="back" @click="router.back()">
      返回
    </div>
    <RouterView/>
  </div>
</template>

<style scoped>
.back {
  text-align: center;
  width: 50px;
  padding: 15px;
  border-radius: 15px;
  background: dodgerblue;
}
</style>
