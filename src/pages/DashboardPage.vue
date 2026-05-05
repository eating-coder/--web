<template>
  <div class="dashboard-page">
    <div class="page-header">
      <h1 class="page-title">数据看板</h1>
      <button class="review-btn" @click="showReviewReport = true">
        🤖 AI一键复盘
      </button>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-info">
          <p class="stat-value">{{ formatNumber(stats.followers) }}</p>
          <p class="stat-label">粉丝数</p>
          <p class="stat-change" :class="stats.followersChange >= 0 ? 'positive' : 'negative'">
            {{ stats.followersChange >= 0 ? '+' : '' }}{{ stats.followersChange }} 较昨日
          </p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <p class="stat-value">{{ stats.engagementRate }}%</p>
          <p class="stat-label">近7天互动率</p>
          <p class="stat-change" :class="stats.engagementChange >= 0 ? 'positive' : 'negative'">
            {{ stats.engagementChange >= 0 ? '+' : '' }}{{ stats.engagementChange }}%
          </p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📝</div>
        <div class="stat-info">
          <p class="stat-value">{{ stats.postsThisMonth }}</p>
          <p class="stat-label">本月发布数</p>
          <p class="stat-change neutral">较上月 +3</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👀</div>
        <div class="stat-info">
          <p class="stat-value">{{ formatNumber(stats.profileViews) }}</p>
          <p class="stat-label">主页访问量</p>
          <p class="stat-change" :class="stats.profileViewsChange >= 0 ? 'positive' : 'negative'">
            {{ stats.profileViewsChange >= 0 ? '+' : '' }}{{ stats.profileViewsChange }}
          </p>
        </div>
      </div>
    </div>
    
    <div class="charts-row">
      <div class="chart-card">
        <h3 class="chart-title">7天粉丝增长趋势</h3>
        <div class="chart-container">
          <FanTrendChart :data="fanTrendData" />
        </div>
      </div>
      
      <div class="chart-card">
        <h3 class="chart-title">30天互动趋势</h3>
        <div class="chart-container">
          <EngagementChart :data="engagementTrendData" />
        </div>
      </div>
    </div>
    
    <div class="content-section">
      <h3 class="section-title">最近表现最佳的内容</h3>
      <div class="content-list">
        <div v-for="item in topContents" :key="item.id" class="content-item">
          <div class="content-thumbnail">🖼️</div>
          <div class="content-info">
            <h4 class="content-title">{{ item.title }}</h4>
            <div class="content-metrics">
              <span class="metric">❤️ {{ formatNumber(item.likes) }}</span>
              <span class="metric">💬 {{ item.comments }}</span>
              <span class="metric">🔗 {{ item.shares }}</span>
            </div>
          </div>
          <button class="optimize-btn">AI优化</button>
        </div>
      </div>
    </div>
    
    <view v-if="showReviewReport" class="report-modal" @click.self="showReviewReport = false">
      <div class="report-content">
        <div class="report-header">
          <h2>📊 本周运营复盘报告</h2>
          <button class="close-btn" @click="showReviewReport = false">✕</button>
        </div>
        
        <div class="report-section">
          <h3>✨ 数据亮点</h3>
          <ul>
            <li v-for="(item, index) in report.highlights" :key="index">{{ item }}</li>
          </ul>
        </div>
        
        <div class="report-section">
          <h3>📈 内容分析</h3>
          <ul>
            <li v-for="(item, index) in report.contentAnalysis" :key="index">{{ item }}</li>
          </ul>
        </div>
        
        <div class="report-section">
          <h3>💡 改进建议</h3>
          <ul>
            <li v-for="(item, index) in report.suggestions" :key="index">{{ item }}</li>
          </ul>
        </div>
        
        <div class="report-section">
          <h3>🎯 下周选题推荐</h3>
          <div class="topic-tags">
            <span v-for="(topic, index) in report.nextTopics" :key="index" class="topic-tag">{{ topic }}</span>
          </div>
        </div>
        
        <div class="report-actions">
          <button class="export-btn">📄 导出报告</button>
          <button class="save-btn">💾 保存到方案库</button>
        </div>
      </div>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { accountStats, fanTrendData, engagementTrendData, topContents, reviewReport } from '@/data/mockData'
import FanTrendChart from '@/components/charts/FanTrendChart.vue'
import EngagementChart from '@/components/charts/EngagementChart.vue'

const stats = ref(accountStats)
const showReviewReport = ref(false)
const report = ref(reviewReport)

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toString()
}
</script>

<style lang="scss" scoped>
.dashboard-page {
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

.review-btn {
  padding: 10px 20px;
  background: linear-gradient(135deg, #FFB6C1, #FFC0CB);
  color: #1F2937;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 182, 193, 0.4);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 52px;
  height: 52px;
  background: #EEF2FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #6B7280;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  
  &.positive {
    color: #10B981;
  }
  
  &.negative {
    color: #EF4444;
  }
  
  &.neutral {
    color: #6B7280;
  }
}

.charts-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.chart-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.chart-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
}

.chart-container {
  height: 200px;
}

.content-section {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F8F9FA;
  border-radius: 8px;
}

.content-thumbnail {
  width: 64px;
  height: 64px;
  background: #E5E7EB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.content-info {
  flex: 1;
}

.content-title {
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 6px;
}

.content-metrics {
  display: flex;
  gap: 16px;
}

.metric {
  font-size: 12px;
  color: #6B7280;
}

.optimize-btn {
  padding: 6px 16px;
  background: #EEF2FF;
  color: #4F46E5;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background: #E0E7FF;
  }
}

.report-modal {
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

.report-content {
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.report-header h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1F2937;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #F3F4F6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  color: #6B7280;
}

.report-section {
  margin-bottom: 20px;
  
  h3 {
    font-size: 15px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    padding: 8px 12px;
    background: #F8F9FA;
    border-radius: 6px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #374151;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.topic-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-tag {
  padding: 6px 14px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 20px;
  font-size: 13px;
}

.report-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
}

.export-btn, .save-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-btn {
  background: #F3F4F6;
  color: #374151;
  
  &:hover {
    background: #E5E7EB;
  }
}

.save-btn {
  background: #4F46E5;
  color: white;
  
  &:hover {
    background: #4338CA;
  }
}
</style>
