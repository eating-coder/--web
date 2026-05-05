<template>
  <div class="knowledge-page">
    <h1 class="page-title">知识库</h1>
    
    <div class="knowledge-cards">
      <div 
        v-for="card in knowledgeCards" 
        :key="card.key" 
        class="knowledge-card"
        @click="activeCard = card.key"
      >
        <span class="card-icon">{{ card.icon }}</span>
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-desc">{{ card.desc }}</p>
      </div>
    </div>
    
    <div v-if="activeCard" class="content-area">
      <div class="content-header">
        <button class="back-btn" @click="activeCard = null">◀ 返回</button>
        <h2 class="content-title">{{ getCurrentCard?.title }}</h2>
        <button class="ai-btn">🤖 AI问答</button>
      </div>
      
      <div class="content-list">
        <div 
          v-for="item in currentKnowledge" 
          :key="item.id" 
          class="content-item"
          @click="selectedContent = item"
        >
          <h4 class="item-title">{{ item.title }}</h4>
          <p class="item-summary">{{ item.summary }}</p>
        </div>
      </div>
      
      <div v-if="selectedContent" class="content-detail">
        <h3>{{ selectedContent.title }}</h3>
        <div class="detail-content">
          <p>这是一篇关于「{{ selectedContent.title }}」的详细文章。</p>
          <p>在这里，你可以了解到相关的知识和技巧，帮助你更好地运营自己的账号。</p>
          <p>内容包括：</p>
          <ul>
            <li>核心概念和原理介绍</li>
            <li>实践操作指南</li>
            <li>常见问题解答</li>
            <li>进阶技巧分享</li>
          </ul>
        </div>
        <button class="close-detail" @click="selectedContent = null">关闭详情</button>
      </div>
    </div>
    
    <div class="floating-assistant" @click="showAssistant = true">
      <span class="assistant-icon">💬</span>
      <span class="assistant-text">不懂的运营术语？点我问 AI</span>
    </div>
    
    <view v-if="showAssistant" class="assistant-modal" @click.self="showAssistant = false">
      <div class="assistant-content">
        <div class="assistant-header">
          <h3>🤖 AI 问答助手</h3>
          <button class="close-btn" @click="showAssistant = false">✕</button>
        </div>
        <div class="assistant-messages">
          <div class="ai-message">
            <span class="avatar">🤖</span>
            <span class="message-text">你好！有什么运营相关的问题想问我吗？</span>
          </div>
        </div>
        <div class="assistant-input">
          <input type="text" placeholder="输入你的问题..." />
          <button class="send-btn">发送</button>
        </div>
      </div>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { knowledgeList } from '@/data/mockData'
import type { KnowledgeItem } from '@/data/mockData'

const knowledgeCards = [
  { key: 'platform', icon: '📋', title: '平台规则速查', desc: '了解各大平台社区规范' },
  { key: 'benchmark', icon: '📊', title: '数据基准参考', desc: '各领域KOL数据表现参考' },
  { key: 'case', icon: '🔍', title: '爆款案例分析', desc: '拆解成功案例的共性' },
  { key: 'methodology', icon: '📚', title: '运营方法论', desc: '系统化的运营策略' }
]

const activeCard = ref<string | null>(null)
const selectedContent = ref<KnowledgeItem | null>(null)
const showAssistant = ref(false)

const getCurrentCard = computed(() => {
  return knowledgeCards.find(card => card.key === activeCard.value)
})

const currentKnowledge = computed(() => {
  if (!activeCard.value) return []
  return knowledgeList.filter(item => item.category === activeCard.value)
})
</script>

<style lang="scss" scoped>
.knowledge-page {
  padding: 24px;
  min-height: 100vh;
  background: #F8F9FA;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 24px;
}

.knowledge-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.knowledge-card {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.card-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 6px;
}

.card-desc {
  font-size: 13px;
  color: #6B7280;
}

.content-area {
  margin-top: 24px;
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.content-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
}

.back-btn {
  padding: 8px 14px;
  background: #F3F4F6;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #E5E7EB;
  }
}

.content-title {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
}

.ai-btn {
  padding: 8px 16px;
  background: #EEF2FF;
  color: #4F46E5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #E0E7FF;
  }
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.content-item {
  padding: 14px 16px;
  background: #F8F9FA;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #EEF2FF;
  }
}

.item-title {
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 4px;
}

.item-summary {
  font-size: 13px;
  color: #6B7280;
}

.content-detail {
  margin-top: 20px;
  padding: 20px;
  background: #F8F9FA;
  border-radius: 10px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 16px;
  }
}

.detail-content {
  p {
    font-size: 14px;
    color: #374151;
    margin-bottom: 12px;
    line-height: 1.6;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      font-size: 14px;
      color: #374151;
      margin-bottom: 6px;
    }
  }
}

.close-detail {
  margin-top: 16px;
  padding: 8px 20px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #4338CA;
  }
}

.floating-assistant {
  position: fixed;
  right: 32px;
  bottom: 32px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #4F46E5;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  z-index: 100;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
  }
}

.assistant-icon {
  font-size: 20px;
}

.assistant-text {
  font-size: 14px;
}

.assistant-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
}

.assistant-content {
  width: 100%;
  max-width: 500px;
  background: #FFFFFF;
  border-radius: 16px 16px 0 0;
  padding: 20px;
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
}

.assistant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1F2937;
  }
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

.assistant-messages {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.ai-message {
  display: flex;
  gap: 10px;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #EEF2FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.message-text {
  padding: 10px 14px;
  background: #F3F4F6;
  border-radius: 16px 16px 16px 4px;
  font-size: 14px;
  color: #374151;
}

.assistant-input {
  display: flex;
  gap: 12px;
}

.assistant-input input {
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

.send-btn {
  padding: 0 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #4338CA;
  }
}
</style>
