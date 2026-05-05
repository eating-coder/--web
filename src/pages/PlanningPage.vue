<template>
  <div class="planning-page">
    <h1 class="page-title">内容规划</h1>
    
    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.key" 
        class="tab-btn" 
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div v-show="activeTab === 'topics'" class="tab-content">
      <div class="topics-header">
        <button class="ai-btn">🤖 AI推荐选题</button>
        <input type="text" class="search-input" placeholder="搜索选题..." />
      </div>
      <div class="topics-grid">
        <div v-for="topic in topicsList" :key="topic.id" class="topic-card">
          <h3 class="topic-title">{{ topic.title }}</h3>
          <p class="topic-angle">{{ topic.angle }}</p>
          <div class="topic-tags">
            <span v-for="tag in topic.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="topic-actions">
            <button class="use-btn">使用</button>
            <button class="edit-btn">编辑</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-show="activeTab === 'calendar'" class="tab-content">
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="nav-btn" @click="prevMonth">◀</button>
          <span class="month-title">{{ currentMonth }}</span>
          <button class="nav-btn" @click="nextMonth">▶</button>
        </div>
        <div class="calendar-weekdays">
          <span v-for="day in weekdays" :key="day">{{ day }}</span>
        </div>
        <div class="calendar-grid">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index" 
            class="calendar-day"
            :class="{ 
              'other-month': !day.currentMonth,
              'has-content': day.hasContent,
              'today': day.isToday
            }"
            @click="showDayDetail(day)"
          >
            <span class="day-number">{{ day.date }}</span>
            <span v-if="day.hasContent" class="content-dot"></span>
          </div>
        </div>
        <div class="golden-time">
          <span class="golden-icon">⭐</span>
          <span>今日黄金发布时段：18:00 - 20:00</span>
        </div>
      </div>
    </div>
    
    <div v-show="activeTab === 'materials'" class="tab-content">
      <div class="materials-header">
        <div class="filter-tags">
          <button v-for="tag in materialTags" :key="tag" class="filter-tag" :class="{ active: activeFilter === tag }" @click="activeFilter = tag">
            {{ tag }}
          </button>
        </div>
        <button class="upload-btn">📤 上传素材</button>
      </div>
      <div class="upload-area">
        <div class="upload-placeholder">
          <span class="upload-icon">📁</span>
          <p>拖拽文件到这里上传</p>
        </div>
      </div>
      <div class="materials-grid">
        <div v-for="material in filteredMaterials" :key="material.id" class="material-card">
          <div v-if="material.type === 'image'" class="material-image">
            <img :src="material.content" alt="素材" />
          </div>
          <div v-else class="material-text">
            <p>{{ material.content }}</p>
          </div>
          <div class="material-info">
            <span class="material-category">{{ material.category }}</span>
            <button class="optimize-btn">AI优化</button>
          </div>
        </div>
      </div>
    </div>
    
    <div v-show="activeTab === 'inspiration'" class="tab-content">
      <div class="inspiration-header">
        <div class="link-input-wrap">
          <input type="text" class="link-input" placeholder="粘贴竞品链接..." />
          <button class="analyze-btn">🔍 立即拆解</button>
        </div>
      </div>
      
      <div class="analysis-result" v-if="showAnalysis">
        <h3>🔍 竞品分析结果</h3>
        <div class="analysis-card">
          <div class="analysis-section">
            <h4>🔥 爆款原因分析</h4>
            <ul>
              <li>标题使用数字吸引眼球，激发用户好奇心</li>
              <li>内容结构清晰，层层递进引导阅读</li>
              <li>视觉呈现精美，符合平台审美</li>
              <li>互动引导话术巧妙，提升参与度</li>
            </ul>
          </div>
          <div class="analysis-section">
            <h4>🏷️ 关键词提取</h4>
            <div class="keyword-tags">
              <span v-for="keyword in keywords" :key="keyword" class="keyword-tag">{{ keyword }}</span>
            </div>
          </div>
          <div class="analysis-section">
            <h4>💡 可借鉴点</h4>
            <ul>
              <li>学习标题写作技巧</li>
              <li>优化内容结构设计</li>
              <li>提升视觉呈现质量</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="trend-section">
        <h3>📈 热点趋势</h3>
        <div class="word-cloud">
          <span 
            v-for="(word, index) in hotKeywords" 
            :key="word" 
            class="cloud-word"
            :style="{ 
              fontSize: getFontSize(index) + 'px',
              color: getColor(index)
            }"
          >
            {{ word }}
          </span>
        </div>
      </div>
    </div>
    
    <view v-if="showDayModal" class="day-modal" @click.self="showDayModal = false">
      <div class="day-modal-content">
        <h3>{{ selectedDay?.date }}日内容安排</h3>
        <div v-if="selectedDay?.contents?.length" class="day-contents">
          <div v-for="(content, index) in selectedDay?.contents" :key="index" class="day-content-item">
            <span class="content-title">{{ content.title }}</span>
            <span class="content-status" :class="content.status">{{ content.status }}</span>
            <span class="content-platform">{{ content.platform }}</span>
          </div>
        </div>
        <div v-else>
          <p>暂无安排</p>
        </div>
        <button class="close-modal" @click="showDayModal = false">关闭</button>
      </div>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { topicsList, materialsList, hotKeywords } from '@/data/mockData'

const tabs = [
  { key: 'topics', label: '选题库' },
  { key: 'calendar', label: '内容日历' },
  { key: 'materials', label: '素材库' },
  { key: 'inspiration', label: '灵感板' }
]

const activeTab = ref('topics')
const activeFilter = ref('全部')
const materialTags = ['全部', '风景', '工作', '生活', '金句']
const showAnalysis = ref(false)
const keywords = ['短视频', '运营技巧', '爆款', '粉丝增长', '内容创作']

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const currentMonthNum = ref(currentDate.getMonth())

const showDayModal = ref(false)
const selectedDay = ref<{ date: number; contents?: { title: string; status: string; platform: string }[] } | null>(null)

const currentMonth = computed(() => {
  return `${currentYear.value}年${currentMonthNum.value + 1}月`
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonthNum.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startDay = firstDay.getDay()
  
  const days: { date: number; currentMonth: boolean; hasContent: boolean; isToday: boolean }[] = []
  
  for (let i = startDay - 1; i >= 0; i--) {
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    days.push({
      date: prevMonthLastDay - i,
      currentMonth: false,
      hasContent: false,
      isToday: false
    })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()
    const hasContent = [1, 5, 10, 15, 20, 25, 30].includes(i)
    days.push({
      date: i,
      currentMonth: true,
      hasContent,
      isToday
    })
  }
  
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      hasContent: false,
      isToday: false
    })
  }
  
  return days
})

const filteredMaterials = computed(() => {
  if (activeFilter.value === '全部') return materialsList
  return materialsList.filter(item => item.category === activeFilter.value)
})

const prevMonth = () => {
  if (currentMonthNum.value === 0) {
    currentMonthNum.value = 11
    currentYear.value--
  } else {
    currentMonthNum.value--
  }
}

const nextMonth = () => {
  if (currentMonthNum.value === 11) {
    currentMonthNum.value = 0
    currentYear.value++
  } else {
    currentMonthNum.value++
  }
}

const showDayDetail = (day: { date: number; currentMonth: boolean }) => {
  if (!day.currentMonth) return
  selectedDay.value = {
    date: day.date,
    contents: [
      { title: '短视频脚本', status: '待发布', platform: '抖音' },
      { title: '图文笔记', status: '草稿', platform: '小红书' }
    ]
  }
  showDayModal.value = true
}

const getFontSize = (index: number): number => {
  return 14 + (index % 5) * 4
}

const getColor = (index: number): string => {
  const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  return colors[index % colors.length]
}
</script>

<style lang="scss" scoped>
.planning-page {
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

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
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

.tab-content {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.topics-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.ai-btn {
  padding: 10px 20px;
  background: #EEF2FF;
  color: #4F46E5;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #E0E7FF;
  }
}

.search-input {
  padding: 10px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  width: 200px;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.topic-card {
  background: #F8F9FA;
  border-radius: 10px;
  padding: 16px;
}

.topic-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 6px;
}

.topic-angle {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 10px;
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.tag {
  padding: 3px 10px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  font-size: 12px;
  color: #6B7280;
}

.topic-actions {
  display: flex;
  gap: 8px;
}

.use-btn, .edit-btn {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.use-btn {
  background: #4F46E5;
  color: white;
  
  &:hover {
    background: #4338CA;
  }
}

.edit-btn {
  background: #F3F4F6;
  color: #374151;
  
  &:hover {
    background: #E5E7EB;
  }
}

.calendar-container {
  max-width: 800px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: #F3F4F6;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background: #E5E7EB;
  }
}

.month-title {
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  margin-bottom: 8px;
  
  span {
    text-align: center;
    font-size: 13px;
    color: #6B7280;
    padding: 8px 0;
  }
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  aspect-ratio: 1;
  background: #F8F9FA;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  
  &:hover {
    background: #EEF2FF;
  }
  
  &.other-month {
    opacity: 0.4;
  }
  
  &.has-content {
    background: #EEF2FF;
  }
  
  &.today {
    border: 2px solid #4F46E5;
  }
}

.day-number {
  font-size: 14px;
  color: #1F2937;
}

.content-dot {
  width: 6px;
  height: 6px;
  background: #4F46E5;
  border-radius: 50%;
  margin-top: 4px;
}

.golden-time {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 12px 16px;
  background: #FEF3C7;
  border-radius: 8px;
  font-size: 14px;
  color: #D97706;
}

.golden-icon {
  font-size: 18px;
}

.materials-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filter-tags {
  display: flex;
  gap: 8px;
}

.filter-tag {
  padding: 6px 14px;
  background: #F3F4F6;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  
  &.active {
    background: #4F46E5;
    color: white;
  }
}

.upload-btn {
  padding: 8px 16px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
}

.upload-area {
  margin-bottom: 20px;
}

.upload-placeholder {
  border: 2px dashed #E5E7EB;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  
  &:hover {
    border-color: #4F46E5;
  }
}

.upload-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.upload-placeholder p {
  font-size: 14px;
  color: #6B7280;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.material-card {
  background: #F8F9FA;
  border-radius: 10px;
  overflow: hidden;
}

.material-image {
  aspect-ratio: 4/3;
  background: #E5E7EB;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.material-text {
  padding: 16px;
  min-height: 100px;
  
  p {
    font-size: 13px;
    color: #374151;
    line-height: 1.5;
  }
}

.material-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #E5E7EB;
}

.material-category {
  font-size: 12px;
  color: #6B7280;
}

.optimize-btn {
  padding: 4px 12px;
  background: #EEF2FF;
  color: #4F46E5;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.inspiration-header {
  margin-bottom: 20px;
}

.link-input-wrap {
  display: flex;
  gap: 12px;
  max-width: 500px;
}

.link-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
}

.analyze-btn {
  padding: 12px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #4338CA;
  }
}

.analysis-result {
  margin-bottom: 24px;
}

.analysis-card {
  background: #F8F9FA;
  border-radius: 10px;
  padding: 20px;
}

.analysis-section {
  margin-bottom: 20px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      padding: 6px 0;
      font-size: 13px;
      color: #374151;
    }
  }
}

.keyword-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-tag {
  padding: 6px 14px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 20px;
  font-size: 13px;
}

.trend-section {
  background: #F8F9FA;
  border-radius: 10px;
  padding: 20px;
}

.trend-section h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
}

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.cloud-word {
  padding: 8px 16px;
  background: #FFFFFF;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

.day-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.day-modal-content {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  width: 400px;
  
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 16px;
  }
}

.day-contents {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.day-content-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
}

.content-title {
  flex: 1;
  font-size: 14px;
  color: #1F2937;
}

.content-status {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  
  &.待发布 {
    background: #FEF3C7;
    color: #D97706;
  }
  
  &.草稿 {
    background: #E0E7FF;
    color: #4F46E5;
  }
  
  &.已发布 {
    background: #D1FAE5;
    color: #059669;
  }
}

.content-platform {
  font-size: 12px;
  color: #6B7280;
}

.close-modal {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
</style>
