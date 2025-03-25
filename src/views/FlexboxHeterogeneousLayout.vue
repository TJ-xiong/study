<template>
  <div class="container">
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/600?r=1" alt=""/>
        <img src="https://picsum.photos/400/400?r=01" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/300?r=2" alt=""/>
        <img src="https://picsum.photos/400/700?r=02" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/200?r=3" alt=""/>
        <img src="https://picsum.photos/400/300?r=03" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/500?r=4" alt=""/>
        <img src="https://picsum.photos/400/450?r=04" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/600?r=5" alt=""/>
        <img src="https://picsum.photos/400/350?r=05" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/650?r=6" alt=""/>
        <img src="https://picsum.photos/400/450?r=06" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/400?r=7" alt=""/>
        <img src="https://picsum.photos/400/700?r=07" alt=""/>
      </div>
    </div>
    <div class="columns">
      <div class="content">
        <img src="https://picsum.photos/400/650?r=8" alt=""/>
        <img src="https://picsum.photos/400/400?r=08" alt=""/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  width: 90%;
  margin: 2em auto;
  display: flex;
  justify-content: space-between;
  gap: 2vw;
}

.columns {
  flex: 1 1 0;
  display: flex;
  align-items: center;
}

.columns img {
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 0 3px #000;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2vw;
}
</style>