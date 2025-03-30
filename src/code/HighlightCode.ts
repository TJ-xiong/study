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
    code_sliderComponent: "<template>\n" +
    "  <div class=\"container\" ref=\"containerRef\" :style=\"{ width: `${totalWidth}px` }\">\n" +
    "    <div class=\"axis\">\n" +
    "      <div\n" +
    "        v-for=\"(value, index) in visibleValues\"\n" +
    "        :key=\"value\"\n" +
    "        class=\"tick-mark\"\n" +
    "        :style=\"{ left: `${(index * gapSize)}px` }\"\n" +
    "        @click=\"handleValueClick(value, startIndex + index)\"\n" +
    "      >\n" +
    "        <div \n" +
    "          class=\"tick-value\"\n" +
    "          :class=\"{ 'tick-value-active': isActiveValue(value) }\"\n" +
    "        >\n" +
    "          {{ value }}\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div\n" +
    "      class=\"ball\"\n" +
    "      :style=\"{ left: `${ballPosition}px` }\"\n" +
    "    />\n" +
    "  </div>\n" +
    "</template>\n" +
    "\n" +
    "<script setup>\n" +
    "import { ref, computed, onMounted } from 'vue'\n" +
    "\n" +
    "const props = defineProps({\n" +
    "  values: {\n" +
    "    type: Array,\n" +
    "    required: true\n" +
    "  },\n" +
    "  totalWidth: {\n" +
    "    type: Number,\n" +
    "    required: true\n" +
    "  },\n" +
    "  gapSize: {\n" +
    "    type: Number,\n" +
    "    required: true\n" +
    "  },\n" +
    "  itemsPerPage: {\n" +
    "    type: Number,\n" +
    "    default: 7\n" +
    "  }\n" +
    "})\n" +
    "\n" +
    "const emits = defineEmits(['update:currentValue'])\n" +
    "\n" +
    "const currentValue = ref(props.values[0])\n" +
    "const ballPosition = ref(0)\n" +
    "const startIndex = ref(0)\n" +
    "\n" +
    "const endIndex = computed(() => startIndex.value + props.itemsPerPage)\n" +
    "const visibleValues = computed(() => props.values.slice(startIndex.value, endIndex.value))\n" +
    "\n" +
    "const isActiveValue = (value) => Math.abs(currentValue.value - value) < 0.1\n" +
    "\n" +
    "const updateBallPosition = (moveToStart = true) => {\n" +
    "  const relativeIndex = visibleValues.value.indexOf(currentValue.value)\n" +
    "  if (relativeIndex !== -1) {\n" +
    "    ballPosition.value = relativeIndex * props.gapSize\n" +
    "  } else {\n" +
    "    if (moveToStart) {\n" +
    "      currentValue.value = visibleValues.value[0]\n" +
    "      ballPosition.value = 0\n" +
    "    } else {\n" +
    "      currentValue.value = visibleValues.value[visibleValues.value.length - 1]\n" +
    "      ballPosition.value = (visibleValues.value.length - 1) * props.gapSize\n" +
    "    }\n" +
    "  }\n" +
    "  emits('update:currentValue', currentValue.value)\n" +
    "}\n" +
    "\n" +
    "const handleValueClick = (value) => {\n" +
    "  currentValue.value = value\n" +
    "  updateBallPosition()\n" +
    "}\n" +
    "\n" +
    "const prevPage = () => {\n" +
    "  if (startIndex.value > 0) {\n" +
    "    startIndex.value -= 1\n" +
    "    updateBallPosition(false)\n" +
    "  }\n" +
    "}\n" +
    "\n" +
    "const nextPage = () => {\n" +
    "  if (endIndex.value < props.values.length) {\n" +
    "    startIndex.value += 1\n" +
    "    updateBallPosition(true)\n" +
    "  }\n" +
    "}\n" +
    "\n" +
    "defineExpose({ prevPage, nextPage })\n" +
    "\n" +
    "// Ensure the ball position is correctly initialized on mount\n" +
    "onMounted(() => {\n" +
    "  updateBallPosition()\n" +
    "})\n" +
    "</script>\n" +
    "\n" +
    "<style scoped>\n" +
    ".container {\n" +
    "  position: relative;\n" +
    "  height: 100px;\n" +
    "  margin: 50px auto;\n" +
    "  display: flex;\n" +
    "  flex-direction: column;\n" +
    "  align-items: center;\n" +
    "}\n" +
    "\n" +
    ".axis {\n" +
    "  position: relative;\n" +
    "  width: 100%;\n" +
    "  height: 60px;\n" +
    "}\n" +
    "\n" +
    ".tick-mark {\n" +
    "  position: absolute;\n" +
    "  transform: translateX(-50%);\n" +
    "}\n" +
    "\n" +
    ".tick-value {\n" +
    "  font-size: 14px;\n" +
    "  text-align: center;\n" +
    "  color: #666;\n" +
    "  transition: transform 0.3s ease;\n" +
    "  position: relative;\n" +
    "  z-index: 1;\n" +
    "  line-height: 16px;\n" +
    "  cursor: pointer;\n" +
    "}\n" +
    "\n" +
    ".tick-value-active {\n" +
    "  transform: translateY(-20px);\n" +
    "  color: #000000;\n" +
    "  font-weight: bold;\n" +
    "}\n" +
    "\n" +
    ".ball {\n" +
    "  position: absolute;\n" +
    "  top: 4px;\n" +
    "  width: 16px;\n" +
    "  height: 16px;\n" +
    "  background-color: red;\n" +
    "  border-radius: 50%;\n" +
    "  transform: translateX(-50%);\n" +
    "  transition: left 0.2s ease;\n" +
    "  pointer-events: none;\n" +
    "}\n" +
    "</style> ",
    code_echartsSlideX: "<template>\n" +
        "  <div>\n" +
        "    <SliderComponent\n" +
        "      ref=\"sliderRef\"\n" +
        "      :values=\"myValues\"\n" +
        "      :totalWidth=\"400\"\n" +
        "      :gapSize=\"50\"\n" +
        "      :itemsPerPage=\"7\"\n" +
        "      @update:currentValue=\"handleCurrentValueUpdate\"\n" +
        "    />\n" +
        "    <div class=\"button-container\">\n" +
        "      <button @click=\"prevPage\">前一页</button>\n" +
        "      <button @click=\"nextPage\">后一页</button>\n" +
        "    </div>\n" +
        "  </div>\n" +
        "</template>\n" +
        "\n" +
        "<script setup lang=\"ts\">\n" +
        "import {type ComponentPublicInstance, ref} from 'vue';\n" +
        "import SliderComponent from \"@/components/SliderComponent.vue\";\n" +
        "\n" +
        "const myValues = Array.from({ length: 30 }, (_, i) => i * 10)\n" +
        "\n" +
        "const handleCurrentValueUpdate = (newValue: any) => {\n" +
        "  console.log('当前值:', newValue)\n" +
        "}\n" +
        "\n" +
        "const sliderRef = ref<SliderInstance | null>(null)\n" +
        "\n" +
        "// 定义类型，假设 SliderComponent 有 prevPage 方法\n" +
        "type SliderInstance = ComponentPublicInstance<{\n" +
        "  prevPage: () => void;\n" +
        "  nextPage: () => void;\n" +
        "}>;\n" +
        "\n" +
        "const prevPage = (): void => {\n" +
        "  if (sliderRef.value) {\n" +
        "    sliderRef.value.prevPage()\n" +
        "  }\n" +
        "}\n" +
        "\n" +
        "const nextPage = (): void => {\n" +
        "  if (sliderRef.value) {\n" +
        "    sliderRef.value.nextPage()\n" +
        "  }\n" +
        "}\n" +
        "</script>\n" +
        "\n" +
        "<style scoped>\n" +
        ".button-container {\n" +
        "  margin-top: 10px;\n" +
        "  display: flex;\n" +
        "  justify-content: center;\n" +
        "}\n" +
        "\n" +
        "button {\n" +
        "  margin: 0 5px;\n" +
        "}\n" +
        "</style>",
    code_dialog: "<template>\n" +
        "  <div>\n" +
        "    <div class=\"btn\">\n" +
        "      <a href=\"https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog\" target=\"_blank\">MDN文档</a>\n" +
        "      <button onclick=\"dog.show()\">普通弹窗</button>\n" +
        "      <button onclick=\"dog.showModal()\">模态弹窗</button>\n" +
        "    </div>\n" +
        "    <dialog id=\"dog\">\n" +
        "      <div>\n" +
        "        <p>弹窗</p>\n" +
        "        <p>showModel弹窗才能设置蒙层效果和毛玻璃（backdrop）</p>\n" +
        "        <p>\n" +
        "          <input type=\"text\"/>\n" +
        "        </p>\n" +
        "        <p>\n" +
        "          <input type=\"text\"/>\n" +
        "        </p>\n" +
        "        <button onclick=\"dog.close()\">关闭</button>\n" +
        "      </div>\n" +
        "    </dialog>\n" +
        "  </div>\n" +
        "</template>\n" +
        "\n" +
        "<script setup lang=\"ts\">\n" +
        "\n" +
        "</script>\n" +
        "\n" +
        "<style scoped>\n" +
        "dialog {\n" +
        "  border: 1px solid #ccc;\n" +
        "  border-radius: 10px;\n" +
        "  margin-top: 50px;\n" +
        "}\n" +
        "\n" +
        "dialog::backdrop {\n" +
        "  background: rgba(23, 234, 100, 0.5);\n" +
        "  backdrop-filter: blur(5px);\n" +
        "}\n" +
        "\n" +
        ".btn {\n" +
        "  width: 100%;\n" +
        "  height: 30px;\n" +
        "  line-height: 30px;\n" +
        "  display: flex;\n" +
        "  justify-content: space-around;\n" +
        "  align-items: center;\n" +
        "}\n" +
        "</style>",
    code_customRefDebounce: 'import {customRef} from "vue";\n' +
        '\n' +
        'export function debounceRef(value: any, delay = 1000) {\n' +
        '    let timeout = delay;\n' +
        '    return customRef((track, trigger) => {\n' +
        '        return {\n' +
        '            get() {\n' +
        '                track();\n' +
        '                return value;\n' +
        '            },\n' +
        '            set(newValue) {\n' +
        '                clearTimeout(timeout);\n' +
        '                timeout = setTimeout(() => {\n' +
        '                    value = newValue;\n' +
        '                    trigger();\n' +
        '                }, delay);\n' +
        '            }\n' +
        '        }\n' +
        '    })\n' +
        '}',
}

export {
    Code,
}