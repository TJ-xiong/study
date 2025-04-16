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
    code_wrapListener: '<template>\n' +
        '  <div>\n' +
        '    <div ref="contentRef">First：元素参与 transtion 的初始状态。Last：元素的最终状态。Invert：这让元素看起来仍然在初始的位置，所以元素并没有达到最终的位置。</div>\n' +
        '    <div>{{ isWrap ? \'换行了\' : \'不换行\' }}</div>\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<script lang="ts" setup>\n' +
        'import {onMounted, onUnmounted, ref} from "vue";\n' +
        '\n' +
        'const isWrap = ref<boolean>(false);\n' +
        'const contentRef = ref();\n' +
        '\n' +
        'const resizeHandler = () => {\n' +
        '  if (contentRef.value) {\n' +
        '    const el = contentRef.value;\n' +
        '    let lineHeight = parseFloat(getComputedStyle(el).lineHeight);\n' +
        '    // 如果拿不到行高（是 normal），用 fontSize 的 1.2 倍来估算\n' +
        '    if (isNaN(lineHeight)) {\n' +
        '      const fontSize = parseFloat(getComputedStyle(el).fontSize);\n' +
        '      lineHeight = fontSize * 1.2 // 根据经验，一般 normal 大约是 1.2~1.4 倍字体\n' +
        '    }\n' +
        '    const lines = Math.round(el.clientHeight / lineHeight);\n' +
        '\n' +
        '    console.log(\'行数为：\', lines);\n' +
        '    isWrap.value = lines > 1;\n' +
        '    if (isWrap.value) {\n' +
        '      console.log(\'文字换行了\');\n' +
        '    } else {\n' +
        '      console.log(\'没有换行\');\n' +
        '    }\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'onMounted(() => {\n' +
        '  resizeHandler();\n' +
        '  window.addEventListener(\'resize\', resizeHandler);\n' +
        '})\n' +
        '\n' +
        'onUnmounted(() => {\n' +
        '  window.removeEventListener(\'resize\', resizeHandler);\n' +
        '})\n' +
        '</script>',
    code_fontSizeAuto: '<template>\n' +
        '  <div class="container">\n' +
        '    <div class="text-box">\n' +
        '      这是一段可以根据屏幕宽度自动调整字体大小的文字，最多显示两行，超出部分自动显示省略号。\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<script setup lang="ts">\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '<style scoped>\n' +
        '.container {\n' +
        '  width: 100%;\n' +
        '}\n' +
        '\n' +
        '.text-box {\n' +
        '  width: 80%;\n' +
        '  background: darkkhaki;\n' +
        '  font-size: clamp(14px, 2vw, 20px); /* 随屏幕大小自适应 */\n' +
        '  line-height: 1.4;\n' +
        '  max-height: calc(1.4em * 2); /* 1.4 行高 × 2 行 */\n' +
        '  overflow: hidden;\n' +
        '  display: -webkit-box;\n' +
        '  -webkit-line-clamp: 2; /* 限制 2 行 */\n' +
        '  -webkit-box-orient: vertical;\n' +
        '  text-overflow: ellipsis;\n' +
        '}\n' +
        '</style>',
    code_adaptiveText: '<template>\n' +
        '  <div\n' +
        '      ref="textRef"\n' +
        '      class="adaptive-text"\n' +
        '      :style="computedStyle"\n' +
        '  >\n' +
        '    <slot />\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<script setup lang="ts">\n' +
        'import { ref, computed, onMounted, nextTick } from \'vue\'\n' +
        '\n' +
        'const props = defineProps({\n' +
        '  minFontSize: {\n' +
        '    type: Number,\n' +
        '    default: 14,\n' +
        '  },\n' +
        '  maxFontSize: {\n' +
        '    type: Number,\n' +
        '    default: 20,\n' +
        '  },\n' +
        '  lineHeight: {\n' +
        '    type: [Number, String],\n' +
        '    default: undefined, // <== 如果没传，我们自动推算\n' +
        '  },\n' +
        '  lines: {\n' +
        '    type: Number,\n' +
        '    default: 2,\n' +
        '  },\n' +
        '})\n' +
        '\n' +
        'const textRef = ref(null)\n' +
        'const estimatedLineHeight = ref(1.4) // 默认值\n' +
        '\n' +
        'const computedStyle = computed(() => {\n' +
        '  return {\n' +
        '    fontSize: `clamp(${props.minFontSize}px, 2vw, ${props.maxFontSize}px)`,\n' +
        '    lineHeight: props.lineHeight ?? estimatedLineHeight.value,\n' +
        '    maxHeight: `${(Number(props.lineHeight) ?? estimatedLineHeight.value) * props.lines}em`,\n' +
        '  }\n' +
        '})\n' +
        '\n' +
        'function estimateLineHeight() {\n' +
        '  if (!textRef.value) return\n' +
        '\n' +
        '  const el = textRef.value\n' +
        '  const computed = window.getComputedStyle(el)\n' +
        '  const fontSize = parseFloat(computed.fontSize)\n' +
        '\n' +
        '  // 获取 lineHeight，处理 normal 的情况\n' +
        '  let rawLineHeight = computed.lineHeight\n' +
        '  let lineHeightPx = 0\n' +
        '\n' +
        '  if (rawLineHeight === \'normal\') {\n' +
        '    lineHeightPx = fontSize * 1.2 // 估算\n' +
        '  } else {\n' +
        '    lineHeightPx = parseFloat(rawLineHeight)\n' +
        '  }\n' +
        '\n' +
        '  // 更新 em 值（即 lineHeight）\n' +
        '  estimatedLineHeight.value = parseFloat((lineHeightPx / fontSize).toFixed(2))\n' +
        '}\n' +
        '\n' +
        'onMounted(() => {\n' +
        '  nextTick(estimateLineHeight)\n' +
        '})\n' +
        '</script>\n' +
        '\n' +
        '<style scoped>\n' +
        '.adaptive-text {\n' +
        '  overflow: hidden;\n' +
        '  display: -webkit-box;\n' +
        '  -webkit-line-clamp: 2;\n' +
        '  -webkit-box-orient: vertical;\n' +
        '  text-overflow: ellipsis;\n' +
        '}\n' +
        '</style>\n',
    code_clamp:
        '```css\n' +
        'font-size: clamp(14px, 2vw, 20px);\n' +
        '```\n' +
        '\n' +
        '看起来简单，实际上背后藏着精妙的响应式逻辑。我们来**逐步拆解理解**：\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🎯 clamp() 是什么？\n' +
        '\n' +
        '`clamp(min, preferred, max)` 是一个 CSS 函数，用来定义一个值在一个**范围区间内响应变化**，它会：\n' +
        '\n' +
        '- **最小值 (`min`)：永远不会小于它**\n' +
        '- **最大值 (`max`)：永远不会大于它**\n' +
        '- **首选值 (`preferred`)：在 min 和 max 范围之间按需伸缩**\n' +
        '\n' +
        '### 🧠 它会自动选择一个值：\n' +
        '```text\n' +
        '最终值 = 在 min 和 max 之间，最接近 preferred 的那个值\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 👇 拆解这句：\n' +
        '\n' +
        '```css\n' +
        'font-size: clamp(14px, 2vw, 20px);\n' +
        '```\n' +
        '\n' +
        '| 参数 | 含义 |\n' +
        '|------|------|\n' +
        '| `14px` | 最小字体：不小于 14px，无论屏幕多窄 |\n' +
        '| `2vw` | 首选字体：根据视口宽度的 2% 进行缩放 |\n' +
        '| `20px` | 最大字体：不大于 20px，无论屏幕多宽 |\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 📱 示例分析（假设不同屏幕宽度）：\n' +
        '\n' +
        '| 视口宽度 | 计算出的 `2vw` | 最终字体大小 |\n' +
        '|----------|----------------|----------------|\n' +
        '| 300px    | 6px            | `14px`（因为太小，小于最小值） |\n' +
        '| 600px    | 12px           | `14px`（仍然小） |\n' +
        '| 800px    | 16px           | `16px`（在范围内）✅ |\n' +
        '| 1000px   | 20px           | `20px` ✅ |\n' +
        '| 1200px   | 24px           | `20px`（太大，限制为最大值） |\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## ✅ 总结：为什么这么写很香？\n' +
        '\n' +
        '1. **字体响应式变化：** 在小屏设备（手机）上字体自动变小，在大屏（PC）上字体自动变大。\n' +
        '2. **保底+封顶保护：** 保证不会太小看不清，也不会太大挤爆布局。\n' +
        '3. **简洁优雅替代媒体查询：** 无需写 `@media`，一行搞定自适应。\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🧪 Tips：clamp 还能干什么？\n' +
        '\n' +
        '除了 `font-size`，它还可以用于：\n' +
        '\n' +
        '- `padding: clamp(10px, 2vw, 40px)`\n' +
        '- `gap: clamp(8px, 1.5vw, 32px)`\n' +
        '- `margin`, `width`, `height`, `border-radius`……\n' +
        '\n' +
        '**一切长度单位都能用 `clamp()`！**\n' +
        '\n' +
        '---\n',
    code_em: '`em` 是一种相对单位，用于表示长度（比如字体大小、间距、宽高等）。它非常重要且常用于响应式设计，尤其在控制文字布局时非常灵活。\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 📐 `em` 是什么？\n' +
        '\n' +
        '> `1em = 当前元素的字体大小`\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🧠 举个例子：\n' +
        '\n' +
        '```css\n' +
        '.parent {\n' +
        '  font-size: 16px;\n' +
        '}\n' +
        '\n' +
        '.child {\n' +
        '  font-size: 2em; /* = 2 * 16px = 32px */\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '所以：\n' +
        '\n' +
        '- `em` 是 **相对于当前元素的字体大小**\n' +
        '- 如果你设置了 `font-size: 2em`，那就是 “两倍字体大小”\n' +
        '\n' +
        '---\n' +
        '\n' +
        '### 🔁 它是递归的（继承链生效）\n' +
        '\n' +
        '如果你嵌套了多个元素，而子元素的 `em` 会相对于它**父级元素**的字体大小：\n' +
        '\n' +
        '```css\n' +
        '.outer {\n' +
        '  font-size: 20px;\n' +
        '}\n' +
        '.inner {\n' +
        '  font-size: 0.5em; /* = 10px */\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## ✅ 常见用途：\n' +
        '\n' +
        '| 属性 | 用法 |\n' +
        '|------|------|\n' +
        '| `font-size` | 相对于父元素字体大小进行缩放 |\n' +
        '| `padding / margin` | 随着文字一起变大或变小 |\n' +
        '| `line-height` | 设置文字之间的行距（比如 `1.4em`）|\n' +
        '| `max-height` | 限制显示几行文本（配合 `line-height`）|\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## ✅ 和其他单位对比：\n' +
        '\n' +
        '| 单位 | 含义 | 适用场景 |\n' +
        '|------|------|----------|\n' +
        '| `px` | 绝对单位，像素 | 精准布局，不随屏幕缩放 |\n' +
        '| `em` | 相对当前字体大小 | 随字体缩放，用于文字、间距等 |\n' +
        '| `rem` | 相对于 root (`html`) 字体大小 | 更一致、适合全局响应式布局 |\n' +
        '| `%` | 相对父元素尺寸 | 用于宽高等 |\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🚀 Bonus：em 和多行截断结合示例\n' +
        '\n' +
        '```css\n' +
        '.line-clamp-2 {\n' +
        '  line-height: 1.4;\n' +
        '  max-height: 2.8em; /* 1.4em × 2 行 */\n' +
        '}\n' +
        '```\n' +
        '\n' +
        '这里使用 `em` 非常自然，因为它随字体大小变化，确保了“显示 2 行”这个目标不被破坏。\n' +
        '\n' +
        '---\n' +
        '\n',
    code_emDemo: '太棒啦😄！这就给你做一个 **小演示 demo**，帮助你直观理解 `em` 和它在**多行截断中的妙用**。\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 🎬 演示效果说明：\n' +
        '\n' +
        '我们将对比两种布局：\n' +
        '\n' +
        '1. **使用 `px` 限制高度**：一旦字体大小变了，就不准了 ❌  \n' +
        '2. **使用 `em` 限制高度**：随着字体大小自动适配 ✅\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## ✅ Vue 示例：`EmLineClampDemo.vue`\n' +
        '\n' +
        '```vue\n' +
        '<template>\n' +
        '  <div class="demo">\n' +
        '    <h2>字体大小调整</h2>\n' +
        '    <input\n' +
        '      type="range"\n' +
        '      min="12"\n' +
        '      max="28"\n' +
        '      v-model="fontSize"\n' +
        '    />\n' +
        '    <span class="font-label">{{ fontSize }}px</span>\n' +
        '\n' +
        '    <h3>❌ 使用 px 限制 max-height（固定高度）</h3>\n' +
        '    <div class="text-box text-px" :style="pxStyle">\n' +
        '      {{ longText }}\n' +
        '    </div>\n' +
        '\n' +
        '    <h3>✅ 使用 em 限制 max-height（随字体变化）</h3>\n' +
        '    <div class="text-box text-em" :style="emStyle">\n' +
        '      {{ longText }}\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</template>\n' +
        '\n' +
        '<script setup>\n' +
        'import { ref, computed } from \'vue\'\n' +
        '\n' +
        'const fontSize = ref(16)\n' +
        '\n' +
        'const longText = `\n' +
        '  这是一段比较长的中文文本，用于展示多行文字的截断效果。\n' +
        '  随着你拖动滑块改变字体大小，你可以观察到使用 em 的方式可以更加自适应和准确地控制最多显示两行。\n' +
        '  而使用 px 的方式在字体变大时就会出现被截断不准的问题。\n' +
        '`\n' +
        '\n' +
        'const pxStyle = computed(() => ({\n' +
        '  fontSize: `${fontSize.value}px`,\n' +
        '  maxHeight: \'40px\', // 固定高度：约 2 行 @ 20px 字号\n' +
        '  lineHeight: \'1.4\',\n' +
        '}))\n' +
        '\n' +
        'const emStyle = computed(() => ({\n' +
        '  fontSize: `${fontSize.value}px`,\n' +
        '  lineHeight: \'1.4\',\n' +
        '  maxHeight: `${1.4 * 2}em`, // 自适应 2 行\n' +
        '}))\n' +
        '</script>\n' +
        '\n' +
        '<style scoped>\n' +
        '.demo {\n' +
        '  max-width: 600px;\n' +
        '  margin: auto;\n' +
        '  font-family: sans-serif;\n' +
        '}\n' +
        'input {\n' +
        '  width: 100%;\n' +
        '  margin-bottom: 10px;\n' +
        '}\n' +
        '.font-label {\n' +
        '  display: inline-block;\n' +
        '  margin-left: 8px;\n' +
        '}\n' +
        '.text-box {\n' +
        '  overflow: hidden;\n' +
        '  text-overflow: ellipsis;\n' +
        '  display: -webkit-box;\n' +
        '  -webkit-box-orient: vertical;\n' +
        '  -webkit-line-clamp: 2;\n' +
        '  margin: 10px 0;\n' +
        '  padding: 8px;\n' +
        '  background: #f5f5f5;\n' +
        '  border-radius: 8px;\n' +
        '}\n' +
        '</style>\n' +
        '```\n' +
        '\n' +
        '---\n' +
        '\n' +
        '## 📸 演示重点：\n' +
        '\n' +
        '- 拖动滑块，增大字体；\n' +
        '- 看 “使用 px 限制高度” 的盒子溢出了，省略号错乱；\n' +
        '- 而 “使用 em 限制高度” 的盒子，始终恰好两行！\n' +
        '\n' +
        '---\n',
    code_fontSizeAutoDirective: 'import type { DirectiveBinding, ObjectDirective } from \'vue\'\n' +
        '\n' +
        'interface AdaptiveTextOptions {\n' +
        '    min?: number     // 最小字体\n' +
        '    max?: number     // 最大字体\n' +
        '    lines?: number   // 最多行数\n' +
        '    lineHeight?: number // 可选：自定义行高\n' +
        '}\n' +
        '\n' +
        'const adaptiveText: ObjectDirective = {\n' +
        '    mounted(el: HTMLElement, binding: DirectiveBinding<AdaptiveTextOptions>) {\n' +
        '        const options = binding.value || {}\n' +
        '\n' +
        '        const minFont = options.min ?? 14\n' +
        '        const maxFont = options.max ?? 20\n' +
        '        const lines = options.lines ?? 2\n' +
        '        const providedLineHeight = options.lineHeight\n' +
        '\n' +
        '        // 设置自适应字体大小\n' +
        '        el.style.fontSize = `clamp(${minFont}px, 2vw, ${maxFont}px)`\n' +
        '\n' +
        '        // 设置基础样式\n' +
        '        Object.assign(el.style, {\n' +
        '            display: \'-webkit-box\',\n' +
        '            WebkitBoxOrient: \'vertical\',\n' +
        '            WebkitLineClamp: lines.toString(),\n' +
        '            overflow: \'hidden\',\n' +
        '            textOverflow: \'ellipsis\',\n' +
        '        })\n' +
        '\n' +
        '        if (providedLineHeight) {\n' +
        '            // 用户提供了行高，直接使用\n' +
        '            el.style.lineHeight = String(providedLineHeight)\n' +
        '            el.style.maxHeight = `${providedLineHeight * lines}em`\n' +
        '        } else {\n' +
        '            // 没提供：动态获取行高\n' +
        '            requestAnimationFrame(() => {\n' +
        '                const computed = window.getComputedStyle(el)\n' +
        '                const fontSize = parseFloat(computed.fontSize)\n' +
        '                let lineHeightPx: number\n' +
        '\n' +
        '                if (computed.lineHeight === \'normal\') {\n' +
        '                    lineHeightPx = fontSize * 1.4 // 默认估算\n' +
        '                } else {\n' +
        '                    lineHeightPx = parseFloat(computed.lineHeight)\n' +
        '                }\n' +
        '\n' +
        '                const ratio = lineHeightPx / fontSize\n' +
        '                el.style.lineHeight = ratio.toFixed(2)\n' +
        '                el.style.maxHeight = `${ratio * lines}em`\n' +
        '            })\n' +
        '        }\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'export default adaptiveText\n' +
        '\n' +
        '// main.ts\n' +
        'import { createApp } from \'vue\'\n' +
        'import App from \'./App.vue\'\n' +
        'import adaptiveText from \'@/directives/AdaptiveText.ts\' // 导入指令\n' +
        '\n' +
        'const app = createApp(App)\n' +
        '\n' +
        '// 全局注册指令\n' +
        'app.directive(\'adaptive-text\', adaptiveText)\n' +
        '\n' +
        'app.mount(\'#app\')' +
        '\n' +
        '// 使用\n' +
        '<div class="text-box" v-adaptive-text="{ min: 16, max: 24, lines: 2, lineHeight: 1.5 }">\n' +
        '  这是一段可以根据屏幕宽度自动调整字体大小的文字，最多显示两行，超出部分自动显示省略号。\n' +
        '</div>',
}

export {
    Code,
}