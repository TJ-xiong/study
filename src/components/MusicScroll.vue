<script setup lang="ts">
import audioFile from '@/assets/music/gudao.mp3';
import {musicEncData} from '@/assets/music/MusicEnc'
import {onMounted, ref} from "vue";
import AudioVisualization from "@/components/AudioVisualization.vue";

interface MusicEnc {
  time: number,
  lyrics: string
}

const lyricsData: MusicEnc[] = [];
const lyricsSplit = musicEncData.split("\n");
lyricsSplit.forEach(lyric => {
  let strings = lyric.split("]");
  const time = strings[0].substring(1).split(':');
  lyricsData.push({
    time: +time[0] * 60 + +time[1],
    lyrics: strings[1],
  })
})

const audioRef = ref();
const lyricsUlRef = ref();
const lyricsContainer = ref();
let middle: number = 0; // ul元素的高度一半
let itemHeight: number = 0;  // 每一行歌词的高度

/**
 * 初始化歌词
 */
function initLyrics(): void {
  let fragment = document.createDocumentFragment();
  lyricsData.forEach(lyric => {
    let element = document.createElement('li');
    element.textContent = lyric.lyrics;
    element.classList.add('lyrics_li');
    fragment.appendChild(element);
  })
  lyricsUlRef.value.appendChild(fragment);
  itemHeight = lyricsUlRef.value.children[0].clientHeight;
}

/**
 * 获取当前播放到哪一句歌词
 */
function findIndex(): number {
  let currentTime = audioRef.value.currentTime;
  for (let i = 0; i < lyricsData.length; i++) {
    const lyric = lyricsData[i];
    const nextlyric = lyricsData[i + 1];
    if (!nextlyric) return i;
    if (lyric.time < currentTime && nextlyric.time > currentTime) {
      return i;
    }
  }
  return 0;
}

/**
 * 滚动歌词
 */
function scrollLyrics(): void {
  const idx: number = findIndex();
  const currentItemHeight = ((idx - 1) * itemHeight) + itemHeight / 2;
  const distance: number = currentItemHeight - middle;
  if (distance > 0) {
    lyricsUlRef.value.style.transform = `translateY(${-distance}px)`;
    let lastItem = lyricsUlRef.value.querySelector('.lyrics_action');
    if (lastItem) {
      lastItem.classList.remove('lyrics_action');
    }
    lyricsUlRef.value.children[idx].classList.add('lyrics_action');
  }
}

onMounted(() => {
  lyricsContainer.value = document.querySelector('.lyrics');
  middle = lyricsContainer.value.clientHeight / 2;
  lyricsUlRef.value = document.querySelector('.lyrics ul');
  audioRef.value = document.querySelector("audio");
  audioRef.value.addEventListener('timeupdate', () => {
    scrollLyrics();
  })
  initLyrics();
})
</script>

<template>
  <div class="container">
    <div class="left">
      <!--    音频可视化-->
      <AudioVisualization :audio-ele="audioRef"/>
      <audio :ref="audioRef" :src="audioFile" controls></audio>
    </div>

    <div class="lyrics" :ref="lyricsContainer">
      <ul :ref="lyricsUlRef" class="lyrics_ul">
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  background: #181818;
  text-align: center;
  display: flex; /* 启用 Flexbox */
  justify-content: space-between; /* 子元素之间平均分布 */
}

.left {
  padding: 10px;
  flex: 1; /* 让所有子元素平分父容器 */
}

audio {
  width: 500px;
  margin: 20px 0;
}

.lyrics {
  flex: 1; /* 让所有子元素平分父容器 */
  height: 100%;
  overflow: hidden;
}

.lyrics_ul {
  transition: 0.5s;
}

/**
❌ 如果 scoped 存在，那么 Vue 只会对 当前组件的静态元素 作用，动态创建的 li 不会被影响。
✅ 解决方案：去掉 scoped 或使用 deep 选择器：
 */
:deep(.lyrics_li) {
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  padding: 10px 0;
  list-style: none;
  color: darkgrey;
  transition: 0.5s;
}

:deep(.lyrics_action) {
  color: white;
  transform: scale(1.4);
}
</style>