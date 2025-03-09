<!--音频可视化-->
<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script setup lang="ts">
// 父组件传入
import {onMounted, watchEffect} from "vue";

const {audioEle} = defineProps(['audioEle']);
let cvs: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null | undefined = null;
let isInit = false;
let analyser: AnalyserNode | null = null, buffer: Uint8Array | null = null;

watchEffect(() => {
  if (audioEle) {
    audioEle.addEventListener('play', () => {
      if (isInit) return;
      // 初始化
      const audioCtx = new AudioContext(); // 音频上下文
      const source = audioCtx.createMediaElementSource(audioEle); // 音频源节点
      analyser = audioCtx.createAnalyser(); // 音频分析节点
      source.connect(analyser); // 音频源连接分析器
      // 使用频域图的数据来显示
      analyser.fftSize = 512;
      buffer = new Uint8Array(analyser.frequencyBinCount); // 类型化数组 analyser.frequencyBinCount === 512 / 2
      analyser.connect(audioCtx.destination); // 分析器连接到输出
      isInit = true;
      initCvs();
    })
  }
})

function draw() {
  requestAnimationFrame(draw);
  if (!isInit || !analyser || !buffer || !cvs || !ctx) return;
  // 清空画布
  const {width, height} = cvs;
  ctx.clearRect(0, 0, width, height);
  analyser.getByteFrequencyData(buffer);
  const len = buffer.length / 2.5; // 忽略后面高频段的数据
  const count = len * 2; // 镜像，画的柱状图的数量
  const barWidth = width / count; // 单个柱状图的宽度
  ctx.fillStyle = '#78C5F7';
  for (let i = 0; i < len; i++) {
    // 画柱状图
    const v = buffer[i];
    const barHeight = (v / 255) * height;
    const x1 = i * barWidth + width / 2;
    const x2 = width / 2 - (i + 1) * barWidth;
    const y = height - barHeight;
    ctx.fillRect(x1, y, barWidth - 2, barHeight);
    ctx.fillRect(x2, y, barWidth - 2, barHeight);
  }
}

function initCvs(): void {
  if (!cvs) return;
  cvs.width = window.innerWidth * devicePixelRatio / 2;
  cvs.height = (window.innerHeight / 2) * devicePixelRatio;
  draw();
}

onMounted(() => {
  cvs = document.querySelector('canvas');
  ctx = cvs?.getContext('2d');
})
</script>