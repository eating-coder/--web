<template>
  <div class="engagement-chart">
    <svg viewBox="0 0 400 150" preserveAspectRatio="none">
      <g class="grid-lines">
        <line v-for="i in 5" :key="'h'+i" x1="0" :y1="i * 30" x2="400" :y2="i * 30" stroke="#E5E7EB" stroke-width="1"/>
        <line v-for="i in 7" :key="'v'+i" :x1="(i - 1) * 57.14" y1="0" :x2="(i - 1) * 57.14" y2="150" stroke="#E5E7EB" stroke-width="1"/>
      </g>
      
      <g v-for="(item, index) in data" :key="'bar'+index">
        <rect 
          :x="index * 57.14 + 10" 
          :y="140 - (item.likes / maxLikes) * 130" 
          width="15" 
          :height="(item.likes / maxLikes) * 130" 
          fill="#4F46E5" 
          rx="3"
        />
        <rect 
          :x="index * 57.14 + 28" 
          :y="140 - (item.comments / maxLikes) * 130" 
          width="15" 
          :height="(item.comments / maxLikes) * 130" 
          fill="#10B981" 
          rx="3"
        />
      </g>
    </svg>
    
    <div class="chart-labels">
      <span v-for="item in data" :key="item.date" class="label">{{ item.date }}</span>
    </div>
    
    <div class="legend">
      <span class="legend-item"><span class="legend-color" style="background: #4F46E5"></span> 点赞</span>
      <span class="legend-item"><span class="legend-color" style="background: #10B981"></span> 评论</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EngagementTrend } from '@/data/mockData'

const props = defineProps<{
  data: EngagementTrend[]
}>()

const maxLikes = computed(() => {
  return Math.max(...props.data.map(item => Math.max(item.likes, item.comments))) * 1.1
})
</script>

<style lang="scss" scoped>
.engagement-chart {
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

.legend {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #6B7280;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
</style>
