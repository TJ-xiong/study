<template>
  <div class="container">
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from "vue";

type EChartsOption = echarts.EChartsOption;
let option: EChartsOption;

let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;

// 生成数据
let data = [[base, Math.random() * 300]];
for (let i = 1; i < 100; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}

// 动态计算视口数据的 min/max/interval
const calculateViewportRange = (startIndex: number, endIndex: number) => {
  let viewportData = data.slice(startIndex, endIndex);
  let yValues = viewportData.map(d => d[1]);

  let minY = Math.min(...yValues);
  let maxY = Math.max(...yValues);

  minY = +(minY * 0.8).toFixed(1);
  maxY = +(maxY * 1.1).toFixed(1);

  let range = maxY - minY;
  let interval = +(range / 5).toFixed(1); // 计算合适的间隔

  return { minY, maxY, interval };
};

// **初始化 Y 轴范围**
let { minY, maxY, interval } = calculateViewportRange(0, 10);

option = {
  title: {
    left: 'center',
    text: 'Large Area Chart'
  },
  xAxis: {
    type: 'time',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    min: minY,
    max: maxY,
    splitNumber: 5, // 5条刻度
    interval: interval
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20,
      zoomOnMouseWheel: true // 允许滚轮缩放
    }
  ],
  series: [
    {
      animation: false,
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'none',
      areaStyle: {},
      data: data
    }
  ]
};

// **绑定 dataZoom 事件，动态更新 Y 轴**
onMounted(() => {
  const chartDom = document.getElementById('main')!;
  const myChart = echarts.init(chartDom);
  myChart.setOption(option);

  myChart.on('dataZoom', (params: any) => {
    let startIndex = Math.floor((params.batch[0].start / 100) * data.length);
    let endIndex = Math.ceil((params.batch[0].end / 100) * data.length);

    let { minY, maxY, interval } = calculateViewportRange(startIndex, endIndex);

    myChart.setOption({
      yAxis: {
        min: minY,
        max: maxY,
        interval: interval
      }
    });
  });
});

</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>