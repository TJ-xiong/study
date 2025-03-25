<template>
  <div class="echarts">
    <div id="main" class="chart"></div>
    <HighlightCode code-id="echartsSetThePositionOfAxisPointer"/>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import HighlightCode from "@/views/HighlightCode.vue";

let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  const chartDom = document.getElementById('main');
  chartInstance = echarts.init(chartDom);

  const option = {
    title: {
      text: 'AxisPointer 手动控制'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
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
        type: 'line'
      }
    ]
  };

  chartInstance.setOption(option);

  // 模拟在随机数据点位置显示 axisPointer
  setInterval(() => {
    setAxisPointer(new Date().getTime() % 7);
  }, 2000);
};

// 设置 axisPointer 位置的方法
const setAxisPointer = (index: number) => {
  if (chartInstance) {
    chartInstance.dispatchAction({
      type: 'showTip', // 显示 tooltip
      seriesIndex: 0,
      dataIndex: index
    });

    chartInstance.dispatchAction({
      type: 'updateAxisPointer', // 更新 axisPointer
      seriesIndex: 0,
      dataIndex: index
    });
  }
};

onMounted(() => {
  initChart();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 30vh;
}
</style>