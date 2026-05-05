<template>
  <div class="chat-page">
    <div class="chat-container">
      <div class="chat-area">
        <div class="messages-container">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-item"
            :class="message.type"
          >
            <div class="avatar">
              {{ message.type === 'user' ? '👤' : '🤖' }}
            </div>
            <div class="message-content">
              <p>{{ message.content }}</p>
              <span class="message-time">{{ message.timestamp }}</span>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <button class="action-btn" @click="handleQuickAction('topic')">
            <span class="action-icon">🎯</span>
            <span>生成选题</span>
          </button>
          <button class="action-btn" @click="handleQuickAction('optimize')">
            <span class="action-icon">✍️</span>
            <span>优化文案</span>
          </button>
          <button class="action-btn" @click="handleQuickAction('review')">
            <span class="action-icon">📈</span>
            <span>复盘本周</span>
          </button>
          <button class="action-btn" @click="handleQuickAction('analyze')">
            <span class="action-icon">🔍</span>
            <span>拆解竞品</span>
          </button>
        </div>
        
        <div class="input-area">
          <input
            v-model="inputMessage"
            type="text"
            class="message-input"
            placeholder="输入你的问题..."
            @keyup.enter="sendMessage"
          />
          <button class="attach-btn">📎</button>
          <button class="send-btn" @click="sendMessage">发送</button>
        </div>
      </div>
      
      <div class="output-panel" :class="{ collapsed: panelCollapsed }">
        <div class="panel-header">
          <span class="panel-title">实时产出</span>
          <button class="collapse-btn" @click="togglePanel">
            {{ panelCollapsed ? '▶' : '◀' }}
          </button>
        </div>
        <div v-if="outputContent" class="output-content">
          <div class="output-card">
            <h4 class="card-title">{{ outputContent.title }}</h4>
            <div v-if="outputContent.type === 'topic'" class="topic-list">
              <div v-for="(topic, index) in outputContent.data" :key="index" class="topic-item">
                <span class="topic-num">{{ index + 1 }}</span>
                <span>{{ topic }}</span>
              </div>
            </div>
            <div v-else-if="outputContent.type === 'copywriting'" class="copy-content">
              <p>{{ outputContent.data }}</p>
            </div>
            <div v-else-if="outputContent.type === 'tags'" class="tags-list">
              <span v-for="(tag, index) in outputContent.data" :key="index" class="tag-item">{{ tag }}</span>
            </div>
            <div class="card-actions">
              <button class="copy-btn" @click="copyContent">📋 一键复制</button>
              <button class="save-btn" @click="saveToLibrary">💾 保存到方案库</button>
            </div>
          </div>
        </div>
        <div v-else class="empty-output">
          <p>AI产出的内容将显示在这里</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { initialMessages } from '@/data/mockData'

const messages = ref([...initialMessages])
const inputMessage = ref('')
const panelCollapsed = ref(false)

const outputContent = reactive({
  title: '',
  type: '',
  data: [] as string[] | string
})

const sendMessage = () => {
  if (!inputMessage.value.trim()) return
  
  const userMessage = {
    id: Date.now().toString(),
    type: 'user' as const,
    content: inputMessage.value,
    timestamp: '刚刚'
  }
  messages.value.push(userMessage)
  inputMessage.value = ''
  
  setTimeout(() => {
    const aiResponse = {
      id: (Date.now() + 1).toString(),
      type: 'ai' as const,
      content: '好的，我已经收到你的需求。根据你的输入，我为你生成了以下内容：\n\n这是一段示例回复，展示了AI助手的回答格式。实际应用中会根据你的具体需求提供专业的运营建议和内容创作支持。',
      timestamp: '刚刚'
    }
    messages.value.push(aiResponse)
    
    outputContent.title = '生成的选题建议'
    outputContent.type = 'topic'
    outputContent.data = [
      '如何提升账号曝光率',
      '短视频内容创作技巧',
      '粉丝互动运营策略',
      '爆款文案写作方法'
    ]
  }, 1000)
}

const handleQuickAction = (action: string) => {
  const actionMap: Record<string, { prompt: string; output: { title: string; type: string; data: string[] | string } }> = {
    topic: {
      prompt: '帮我生成5个选题',
      output: {
        title: '生成的选题建议',
        type: 'topic',
        data: ['选题1：如何提升账号曝光率', '选题2：短视频内容创作技巧', '选题3：粉丝互动运营策略', '选题4：爆款文案写作方法', '选题5：数据分析入门指南']
      }
    },
    optimize: {
      prompt: '帮我优化文案',
      output: {
        title: '优化后的文案',
        type: 'copywriting',
        data: '这是优化后的文案内容。通过调整标题吸引力、增强内容结构、优化关键词布局，提升内容的整体质量和传播效果。'
      }
    },
    review: {
      prompt: '帮我复盘本周数据',
      output: {
        title: '本周复盘关键词',
        type: 'tags',
        data: ['粉丝增长', '互动提升', '内容优化', '发布时间', '平台算法']
      }
    },
    analyze: {
      prompt: '帮我拆解竞品链接',
      output: {
        title: '竞品分析结果',
        type: 'copywriting',
        data: '通过分析竞品内容，发现以下可借鉴点：\n1. 标题使用数字和符号吸引眼球\n2. 内容结构清晰，重点突出\n3. 互动引导话术设计巧妙\n4. 视觉呈现符合平台调性'
      }
    }
  }
  
  const actionData = actionMap[action]
  if (actionData) {
    inputMessage.value = actionData.prompt
    outputContent.title = actionData.output.title
    outputContent.type = actionData.output.type
    outputContent.data = actionData.output.data
    
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: actionData.prompt,
      timestamp: '刚刚'
    }
    messages.value.push(userMessage)
    inputMessage.value = ''
    
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: '已完成！我已经为你' + actionMap[action].prompt.replace('帮我', '') + '，结果已显示在右侧面板中。',
        timestamp: '刚刚'
      }
      messages.value.push(aiResponse)
    }, 800)
  }
}

const togglePanel = () => {
  panelCollapsed.value = !panelCollapsed.value
}

const copyContent = () => {
  uni.showToast({ title: '已复制', icon: 'success' })
}

const saveToLibrary = () => {
  uni.showToast({ title: '已保存', icon: 'success' })
}
</script>

<style lang="scss" scoped>
.chat-page {
  height: 100vh;
  display: flex;
}

.chat-container {
  flex: 1;
  display: flex;
  height: 100%;
}

.chat-area {
  flex: 0 0 70%;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  max-width: 70%;
  
  &.user {
    margin-left: auto;
    
    .message-content {
      background: #4F46E5;
      color: white;
      border-radius: 16px 16px 4px 16px;
    }
    
    .message-time {
      color: rgba(255, 255, 255, 0.7);
    }
  }
  
  &.ai {
    margin-right: auto;
    
    .message-content {
      background: #F3F4F6;
      color: #1F2937;
      border-radius: 16px 16px 16px 4px;
    }
    
    .message-time {
      color: #9CA3AF;
    }
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.message-content {
  padding: 12px 16px;
  max-width: calc(100% - 52px);
  
  p {
    margin-bottom: 6px;
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-word;
  }
}

.message-time {
  font-size: 12px;
}

.quick-actions {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #E5E7EB;
  background: #F8F9FA;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s ease;
  
  &:hover {
    background: #EEF2FF;
    border-color: #4F46E5;
    color: #4F46E5;
  }
}

.action-icon {
  font-size: 16px;
}

.input-area {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #E5E7EB;
  background: #FFFFFF;
}

.message-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #4F46E5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
}

.attach-btn {
  width: 44px;
  height: 44px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background: #FFFFFF;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #F3F4F6;
  }
}

.send-btn {
  padding: 0 24px;
  background: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4338CA;
  }
}

.output-panel {
  flex: 0 0 30%;
  background: #F8F9FA;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  
  &.collapsed {
    width: 48px;
    
    .panel-header {
      .panel-title {
        display: none;
      }
    }
    
    .output-content, .empty-output {
      display: none;
    }
  }
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #E5E7EB;
  background: #FFFFFF;
}

.panel-title {
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
}

.collapse-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #F3F4F6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.output-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}

.output-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 12px;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.topic-item {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
}

.topic-num {
  width: 20px;
  height: 20px;
  background: #4F46E5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

.copy-content {
  p {
    font-size: 13px;
    color: #374151;
    line-height: 1.6;
    white-space: pre-wrap;
  }
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 4px 12px;
  background: #EEF2FF;
  color: #4F46E5;
  border-radius: 20px;
  font-size: 12px;
}

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
}

.copy-btn, .save-btn {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.copy-btn {
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

.empty-output {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
}
</style>
