const Code = {
    code_1: "console.log('test');✅",
    code_echartsSetThePositionOfAxisPointer: "<template>\n" +
        "  <div class=\"echarts\">\n" +
        "    <div id=\"main\" class=\"chart\"></div>\n" +
        "  </div>\n" +
        "</template>\n" +
        "\n" +
        "<script setup lang=\"ts\">\n" +
        "import * as echarts from 'echarts';\n" +
        "import { onMounted } from 'vue';\n" +
        "\n" +
        "let chartInstance: echarts.ECharts | null = null;\n" +
        "\n" +
        "const initChart = () => {\n" +
        "  const chartDom = document.getElementById('main');\n" +
        "  chartInstance = echarts.init(chartDom);\n" +
        "\n" +
        "  const option = {\n" +
        "    title: {\n" +
        "      text: 'AxisPointer 手动控制'\n" +
        "    },\n" +
        "    tooltip: {\n" +
        "      trigger: 'axis',\n" +
        "      axisPointer: {\n" +
        "        type: 'line'\n" +
        "      }\n" +
        "    },\n" +
        "    xAxis: {\n" +
        "      type: 'category',\n" +
        "      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n" +
        "    },\n" +
        "    yAxis: {\n" +
        "      type: 'value'\n" +
        "    },\n" +
        "    series: [\n" +
        "      {\n" +
        "        data: [120, 200, 150, 80, 70, 110, 130],\n" +
        "        type: 'line'\n" +
        "      }\n" +
        "    ]\n" +
        "  };\n" +
        "\n" +
        "  chartInstance.setOption(option);\n" +
        "\n" +
        "  // 模拟在随机数据点位置显示 axisPointer\n" +
        "  setInterval(() => {\n" +
        "    setAxisPointer(new Date().getTime() % 7);" +
        "  }, 2000);\n" +
        "};\n" +
        "\n" +
        "// 设置 axisPointer 位置的方法\n" +
        "const setAxisPointer = (index: number) => {\n" +
        "  if (chartInstance) {\n" +
        "    chartInstance.dispatchAction({\n" +
        "      type: 'showTip', // 显示 tooltip\n" +
        "      seriesIndex: 0,\n" +
        "      dataIndex: index\n" +
        "    });\n" +
        "\n" +
        "    chartInstance.dispatchAction({\n" +
        "      type: 'updateAxisPointer', // 更新 axisPointer\n" +
        "      seriesIndex: 0,\n" +
        "      dataIndex: index\n" +
        "    });\n" +
        "  }\n" +
        "};\n" +
        "\n" +
        "onMounted(() => {\n" +
        "  initChart();\n" +
        "});\n" +
        "</script>\n" +
        "\n" +
        "<style scoped>\n" +
        ".chart {\n" +
        "  width: 100%;\n" +
        "  height: 30vh;\n" +
        "}\n" +
        "</style>",
}

export {
    Code,
}