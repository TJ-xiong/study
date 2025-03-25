<template>
  <div class="container" ref="containerRef" :style="{ width: `${totalWidth}px` }">
    <div class="axis">
      <div
        v-for="(value, index) in visibleValues"
        :key="value"
        class="tick-mark"
        :style="{ left: `${(index * gapSize)}px` }"
        @click="handleValueClick(value)"
      >
        <div 
          class="tick-value"
          :class="{ 'tick-value-active': isActiveValue(value) }"
        >
          {{ value }}
        </div>
      </div>
    </div>

    <div
      class="ball"
      :style="{ left: `${ballPosition}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, type Ref} from 'vue'

// 定义组件的 props 类型
interface SliderProps {
  values: number[]
  totalWidth: number
  gapSize: number
  itemsPerPage?: number
}

const props = defineProps<SliderProps>()

const emits = defineEmits<{
  (e: 'update:currentValue', value: number): void
}>()

const currentValue:Ref<number> = ref(props.values[0])
const ballPosition = ref(0)
const startIndex = ref(0)

const endIndex = computed<number>(() => startIndex.value + (props.itemsPerPage || 7))
const visibleValues = computed<number[]>(() => props.values.slice(startIndex.value, endIndex.value))

const isActiveValue = (value: number): boolean => {
  if (!currentValue.value) return true;
  return Math.abs(currentValue.value - value) < 0.1
}

const updateBallPosition = (moveToStart = true) => {
  const relativeIndex = visibleValues.value.indexOf(currentValue.value)
  if (relativeIndex !== -1) {
    ballPosition.value = relativeIndex * props.gapSize
  } else {
    if (moveToStart) {
      currentValue.value = visibleValues.value[0]
      ballPosition.value = 0
    } else {
      currentValue.value = visibleValues.value[visibleValues.value.length - 1]
      ballPosition.value = (visibleValues.value.length - 1) * props.gapSize
    }
  }
  emits('update:currentValue', currentValue.value)
}

const handleValueClick = (value: number) => {
  currentValue.value = value
  updateBallPosition()
}

const prevPage = (): void => {
  if (startIndex.value > 0) {
    startIndex.value -= 1
    updateBallPosition(false)
  }
}

const nextPage = (): void => {
  if (endIndex.value < props.values.length) {
    startIndex.value += 1
    updateBallPosition(true)
  }
}

defineExpose({ prevPage, nextPage })

// Ensure the ball position is correctly initialized on mount
onMounted(() => {
  updateBallPosition()
})
</script>

<style scoped>
.container {
  position: relative;
  height: 100px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.axis {
  position: relative;
  width: 100%;
  height: 60px;
}

.tick-mark {
  position: absolute;
  transform: translateX(-50%);
}

.tick-value {
  font-size: 14px;
  text-align: center;
  color: #666;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1;
  line-height: 16px;
  cursor: pointer;
}

.tick-value-active {
  transform: translateY(-20px);
  color: #000000;
  font-weight: bold;
}

.ball {
  position: absolute;
  top: 4px;
  width: 16px;
  height: 16px;
  background-color: red;
  border-radius: 50%;
  transform: translateX(-50%);
  transition: left 0.2s ease;
  pointer-events: none;
}
</style> 