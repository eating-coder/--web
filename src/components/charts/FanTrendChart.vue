<template>
  <div class="fan-trend-chart">
    <svg viewBox="0 0 400 150" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#4F46E5" stop-opacity="0"/>
        </linearGradient>
      </defs>
      
      <g class="grid-lines">
        <line v-for="i in 5" :key="'h'+i" x1="0" :y1="i * 30" x2="400" :y2="i * 30" stroke="#E5E7EB" stroke-width="1"/>
        <line v-for="i in 7" :key="'v'+i" :x1="(i - 1) * 57.14" y1="0" :x2="(i - 1) * 57.14" y2="150" stroke="#E5E7EB" stroke-width="1"/>
      </g>
      
      <path :d="areaPath" fill="url(#fanGradient)"/>
      <path :d="linePath" fill="none" stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      
      <g v-for="(point, index) in points" :key="'dot'+index">
        <circle :cx="point.x" :cy="point.y" r="4" fill="#FFFFFF" stroke="#4F46E5" stroke-width="2"/>
      </g>
    </svg>
    
    <div class="chart-labels">
      <span v-for="item in data" :key="item.date" class="label">{{ item.date }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FanTrend } from '@/data/mockData'

const props = defineProps<{
  data: FanTrend[]
}>()

const maxValue = computed(() => {
  return Math.max(...props.data.map(item => item.count)) * 1.1
})

const points = computed(() => {
  const width = 400
  const height = 140
  const padding = 5
  
  return props.data.map((item, index) => ({
    x: padding + (index * (width - padding * 2)) / (props.data.length - 1),
    y: height - (item.count / maxValue.value) * (height - padding * 2)
  }))
})

const linePath = computed(() => {
  if (points.value.length === 0) return ''
  
  return points.value.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')
})

const areaPath = computed(() => {
  if (points.value.length === 0) return ''
  
  const line = linePath.value
  const lastX = points.value[points.value.length - 1].x
  const firstX = points.value[0].x
  
  return `${line} L ${lastX} 140 L ${firstX} 140 Z`
})
</script>

<style lang="scss" scoped>
.fan-trend-chart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
}

.label {
  font-size: 11px;
  color: #6B7280;
}
</style>
