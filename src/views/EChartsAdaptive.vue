<template>
  <div class="echarts">
    <p style="width: 100%; text-align: center;font-size: 20px">✅ 方法二 效果最好</p>
    <div ref="chartRef" class="chart-container"></div>
    <div ref="chartRef1" class="chart-container"></div>
    <div ref="chartRef2" class="chart"></div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

// 初始化图表
const initChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    const option = {
      title: {
        text: '✅ 方法一：使用 resize 监听容器变化'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    chartInstance.setOption(option);
  }
};

// 监听窗口变化进行自适应
const resizeChart = () => {
  chartInstance?.resize();
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', resizeChart);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeChart);
});

const chartRef1 = ref<HTMLElement | null>(null);
let chartInstance1: echarts.ECharts | null = null;
let observer: ResizeObserver | null = null;

const initChart1 = () => {
  if (chartRef1.value) {
    chartInstance1 = echarts.init(chartRef1.value);
    const option = {
      title: {
        text: '✅ 方法二：使用 observer 监听容器变化'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    };
    chartInstance1.setOption(option);

    // 使用 ResizeObserver 监听变化
    observer = new ResizeObserver(() => {
      chartInstance1?.resize();
    });
    observer.observe(chartRef1.value);
  }
};

onMounted(() => {
  initChart1();
});

onUnmounted(() => {
  observer?.disconnect();
});

const chartRef2 = ref<HTMLElement | null>(null);

onMounted(() => {
  if (chartRef2.value) {
    const chartInstance = echarts.init(chartRef2.value);
    chartInstance.setOption({
      title: { text: '✅ 方法三：使用 CSS flex 或 grid 布局' },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }]
    });

    window.addEventListener('resize', () => chartInstance.resize());
  }
});
</script>

<style scoped>
.echarts {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150vh;
}

.chart-container {
  width: 100%;
  height: 400px;
}

.chart {
  flex: 1;
}
</style>