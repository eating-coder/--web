<template>
  <div class="plans-page">
    <h1 class="page-title">方案库</h1>
    
    <div class="filters-bar">
      <div class="category-tabs">
        <button 
          v-for="tab in categoryTabs" 
          :key="tab.key" 
          class="category-tab"
          :class="{ active: activeCategory === tab.key }"
          @click="activeCategory = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div class="search-sort">
        <input type="text" class="search-input" placeholder="搜索方案..." />
        <select class="sort-select">
          <option value="newest">最新优先</option>
          <option value="oldest">最早优先</option>
        </select>
      </div>
    </div>
    
    <div class="view-toggle">
      <button class="toggle-btn" :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">📋</button>
      <button class="toggle-btn" :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">📦</button>
    </div>
    
    <div v-if="viewMode === 'list'" class="list-view">
      <div v-for="plan in filteredPlans" :key="plan.id" class="list-item">
        <div class="list-content">
          <span class="plan-type" :class="plan.type">{{ getTypeLabel(plan.type) }}</span>
          <h3 class="plan-title">{{ plan.title }}</h3>
          <p class="plan-date">创建于 {{ plan.date }}</p>
        </div>
        <div class="list-actions">
          <button class="action-btn view">查看</button>
          <button class="action-btn regenerate">重新生成</button>
          <button class="action-btn delete">删除</button>
        </div>
      </div>
    </div>
    
    <div v-else class="grid-view">
      <div v-for="plan in filteredPlans" :key="plan.id" class="grid-card">
        <div class="card-header">
          <span class="plan-type" :class="plan.type">{{ getTypeLabel(plan.type) }}</span>
        </div>
        <h3 class="plan-title">{{ plan.title }}</h3>
        <p class="plan-date">{{ plan.date }}</p>
        <div class="card-actions">
          <button class="action-btn view">查看</button>
          <button class="action-btn regenerate">重新生成</button>
          <button class="action-btn delete">删除</button>
        </div>
      </div>
    </div>
    
    <div v-if="filteredPlans.length === 0" class="empty-state">
      <span class="empty-icon">📂</span>
      <p>暂无{{ activeCategory === 'all' ? '' : getCategoryLabel(activeCategory) }}方案</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { planList } from '@/data/mockData'

const categoryTabs = [
  { key: 'all', label: '全部' },
  { key: 'topic', label: '选题方案' },
  { key: 'report', label: '诊断报告' },
  { key: 'suggestion', label: '优化建议' },
  { key: 'template', label: '模板' }
]

const activeCategory = ref('all')
const viewMode = ref<'list' | 'grid'>('list')

const filteredPlans = computed(() => {
  if (activeCategory.value === 'all') return planList
  return planList.filter(item => item.type === activeCategory.value)
})

const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    topic: '选题方案',
    report: '诊断报告',
    suggestion: '优化建议',
    template: '模板'
  }
  return labels[type] || type
}

const getCategoryLabel = (category: string): string => {
  const tab = categoryTabs.find(t => t.key === category)
  return tab?.label || ''
}
</script>

<style lang="scss" scoped>
.plans-page {
  padding: 24px;
  min-height: 100vh;
  background: #F8F9FA;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 20px;
}

.filters-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-tabs {
  display: flex;
  gap: 8px;
}

.category-tab {
  padding: 8px 16px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #F3F4F6;
  }
  
  &.active {
    background: #4F46E5;
    color: white;
    border-color: #4F46E5;
  }
}

.search-sort {
  display: flex;
  gap: 12px;
}

.search-input {
  padding: 8px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
}

.sort-select {
  padding: 8px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  background: #FFFFFF;
  cursor: pointer;
}

.view-toggle {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.toggle-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  
  &.active {
    background: #4F46E5;
    border-color: #4F46E5;
    color: white;
  }
}

.list-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.list-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.plan-type {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  
  &.topic {
    background: #EEF2FF;
    color: #4F46E5;
  }
  
  &.report {
    background: #FEF3C7;
    color: #D97706;
  }
  
  &.suggestion {
    background: #D1FAE5;
    color: #059669;
  }
  
  &.template {
    background: #FCE7F3;
    color: #EC4899;
  }
}

.plan-title {
  font-size: 15px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 4px;
}

.plan-date {
  font-size: 12px;
  color: #6B7280;
}

.list-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.action-btn.view {
  background: #EEF2FF;
  color: #4F46E5;
  
  &:hover {
    background: #E0E7FF;
  }
}

.action-btn.regenerate {
  background: #F3F4F6;
  color: #374151;
  
  &:hover {
    background: #E5E7EB;
  }
}

.action-btn.delete {
  background: #FEE2E2;
  color: #EF4444;
  
  &:hover {
    background: #FECACA;
  }
}

.grid-view {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.grid-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-header {
  margin-bottom: 12px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  
  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 15px;
    color: #6B7280;
  }
}
</style>
