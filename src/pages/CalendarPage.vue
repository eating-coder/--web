<template>
  <div class="calendar-page">
    <div class="page-header">
      <h1 class="page-title">发布日历</h1>
      <button class="add-btn">➕ 添加发布任务</button>
    </div>
    
    <div class="calendar-main">
      <div class="calendar-left">
        <div class="calendar-nav">
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
              'selected': selectedDate && selectedDate.date === day.date && day.currentMonth,
              'today': day.isToday
            }"
            @click="selectDay(day)"
          >
            <span class="day-number">{{ day.date }}</span>
            <div v-if="day.contents?.length" class="day-contents">
              <div 
                v-for="(content, idx) in day.contents.slice(0, 2)" 
                :key="idx" 
                class="content-item"
                :class="content.status"
              >
                {{ content.title.slice(0, 6) }}
              </div>
              <span v-if="day.contents.length > 2" class="more">{{ day.contents.length - 2 }}+</span>
            </div>
          </div>
        </div>
        
        <div class="tips-bar">
          <span class="tip-icon">⏰</span>
          <span>今日建议发布时间 18:00-20:00</span>
        </div>
      </div>
      
      <div class="calendar-right">
        <h3 class="sidebar-title">今日待发布</h3>
        <div v-if="todayTasks.length" class="task-list">
          <div v-for="task in todayTasks" :key="task.id" class="task-item">
            <div class="task-header">
              <span class="task-title">{{ task.title }}</span>
              <span class="task-status" :class="task.status">{{ task.status }}</span>
            </div>
            <p class="task-platform">{{ task.platform }}</p>
            <div class="task-time">🕐 {{ task.time }}</div>
            <div class="task-actions">
              <button class="action-btn edit">编辑</button>
              <button class="action-btn publish">发布</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <span class="empty-icon">📝</span>
          <p>今日暂无待发布内容</p>
          <button class="add-task-btn">添加任务</button>
        </div>
        
        <div class="status-legend">
          <div class="legend-item">
            <span class="legend-dot draft"></span>
            <span>草稿</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot pending"></span>
            <span>待发布</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot published"></span>
            <span>已发布</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const currentDate = new Date()
const currentYear = ref(currentDate.getFullYear())
const currentMonthNum = ref(currentDate.getMonth())
const selectedDate = ref<{ date: number; contents?: { title: string; status: string }[] } | null>(null)

interface Task {
  id: string
  title: string
  status: 'draft' | 'pending' | 'published'
  platform: string
  time: string
}

const todayTasks = ref<Task[]>([
  { id: '1', title: '夏季护肤攻略', status: 'pending', platform: '小红书', time: '18:00' },
  { id: '2', title: '新品开箱视频', status: 'pending', platform: '抖音', time: '19:00' },
  { id: '3', title: '一周穿搭合集', status: 'draft', platform: '微博', time: '20:00' }
])

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
  
  const days: { date: number; currentMonth: boolean; isToday: boolean; contents?: { title: string; status: string }[] }[] = []
  
  for (let i = startDay - 1; i >= 0; i--) {
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    days.push({
      date: prevMonthLastDay - i,
      currentMonth: false,
      isToday: false
    })
  }
  
  const contentDays: Record<number, { title: string; status: string }[]> = {
    1: [{ title: '短视频脚本', status: 'published' }, { title: '图文笔记', status: 'pending' }],
    5: [{ title: '直播预告', status: 'draft' }],
    10: [{ title: '产品测评', status: 'pending' }, { title: '粉丝互动', status: 'pending' }, { title: '干货分享', status: 'draft' }],
    15: [{ title: '月度总结', status: 'draft' }],
    20: [{ title: '新品发布', status: 'pending' }],
    25: [{ title: '教程视频', status: 'published' }],
    30: [{ title: 'Q&A问答', status: 'pending' }, { title: 'vlog日常', status: 'draft' }]
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()
    days.push({
      date: i,
      currentMonth: true,
      isToday,
      contents: contentDays[i]
    })
  }
  
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: i,
      currentMonth: false,
      isToday: false
    })
  }
  
  return days
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

const selectDay = (day: { date: number; currentMonth: boolean }) => {
  if (!day.currentMonth) return
  selectedDate.value = day
}
</script>

<style lang="scss" scoped>
.calendar-page {
  padding: 24px;
  min-height: 100vh;
  background: #F8F9FA;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
}

.add-btn {
  padding: 10px 20px;
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

.calendar-main {
  display: flex;
  gap: 24px;
}

.calendar-left {
  flex: 1;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.calendar-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.nav-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: #F3F4F6;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  
  &:hover {
    background: #E5E7EB;
  }
}

.month-title {
  font-size: 20px;
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
    font-size: 14px;
    color: #6B7280;
    padding: 12px 0;
    font-weight: 500;
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
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: #EEF2FF;
  }
  
  &.other-month {
    opacity: 0.4;
  }
  
  &.selected {
    background: #4F46E5;
    
    .day-number {
      color: white;
    }
    
    .content-item {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .more {
      color: white;
    }
  }
  
  &.today {
    border: 2px solid #4F46E5;
  }
}

.day-number {
  font-size: 14px;
  color: #1F2937;
  margin-bottom: 4px;
}

.day-contents {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.content-item {
  padding: 2px 4px;
  border-radius: 4px;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &.draft {
    background: #E0E7FF;
    color: #4F46E5;
  }
  
  &.pending {
    background: #FEF3C7;
    color: #D97706;
  }
  
  &.published {
    background: #D1FAE5;
    color: #059669;
  }
}

.more {
  font-size: 10px;
  color: #6B7280;
  text-align: center;
}

.tips-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 14px 16px;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-radius: 10px;
  font-size: 14px;
  color: #D97706;
}

.tip-icon {
  font-size: 18px;
}

.calendar-right {
  width: 320px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  height: fit-content;
  position: sticky;
  top: 24px;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  background: #F8F9FA;
  border-radius: 10px;
  padding: 14px;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.task-title {
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
}

.task-status {
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 11px;
  
  &.draft {
    background: #E0E7FF;
    color: #4F46E5;
  }
  
  &.pending {
    background: #FEF3C7;
    color: #D97706;
  }
  
  &.published {
    background: #D1FAE5;
    color: #059669;
  }
}

.task-platform {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 8px;
}

.task-time {
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 10px;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 6px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.action-btn.edit {
  background: #F3F4F6;
  color: #374151;
  
  &:hover {
    background: #E5E7EB;
  }
}

.action-btn.publish {
  background: #4F46E5;
  color: white;
  
  &:hover {
    background: #4338CA;
  }
}

.empty-state {
  text-align: center;
  padding: 32px 0;
  
  .empty-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }
  
  p {
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 16px;
  }
}

.add-task-btn {
  padding: 10px 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.status-legend {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #6B7280;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 4px;
  
  &.draft {
    background: #E0E7FF;
  }
  
  &.pending {
    background: #FEF3C7;
  }
  
  &.published {
    background: #D1FAE5;
  }
}
</style>
