<template>
  <aside class="sidebar">
    <div class="logo">
      <span class="logo-icon">🚀</span>
      <span class="logo-text">涨粉社</span>
    </div>
    <nav class="nav-menu">
      <button
        v-for="item in menuItems"
        :key="item.key"
        class="nav-item"
        :class="{ active: currentPage === item.key }"
        @click="handleNavClick(item.key)"
      >
        <span class="nav-icon">{{ item.icon }}</span>
        <span class="nav-text">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: string
}>()

const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

const menuItems = [
  { key: 'chat', icon: '💬', label: '对话助手' },
  { key: 'dashboard', icon: '📊', label: '数据看板' },
  { key: 'planning', icon: '📝', label: '内容规划' },
  { key: 'calendar', icon: '📅', label: '发布日历' },
  { key: 'plans', icon: '📂', label: '方案库' },
  { key: 'knowledge', icon: '📚', label: '知识库' },
  { key: 'settings', icon: '⚙️', label: '设置' }
]

const handleNavClick = (page: string) => {
  emit('navigate', page)
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 24px 24px;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 16px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
}

.nav-menu {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: #F3F4F6;
  }
  
  &.active {
    background: #EEF2FF;
    color: #4F46E5;
    
    .nav-text {
      font-weight: 600;
    }
  }
}

.nav-icon {
  font-size: 20px;
}

.nav-text {
  font-size: 15px;
  color: #374151;
}
</style>
