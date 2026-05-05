<template>
  <div class="settings-page">
    <h1 class="page-title">设置</h1>
    
    <div class="settings-section">
      <h2 class="section-title">👤 账号信息</h2>
      <div class="account-info">
        <div class="avatar-wrap">
          <div class="avatar">👤</div>
          <button class="upload-btn">更换头像</button>
        </div>
        <div class="info-form">
          <div class="form-item">
            <label>昵称</label>
            <input type="text" value="涨粉达人" />
          </div>
          <div class="form-item">
            <label>平台主页链接</label>
            <input type="text" value="https://xiaohongshu.com/user/xxx" placeholder="输入你的主页链接" />
          </div>
        </div>
      </div>
    </div>
    
    <div class="settings-section">
      <h2 class="section-title">🔔 通知偏好</h2>
      <div class="notification-options">
        <div class="option-item">
          <span class="option-label">邮件通知</span>
          <span class="option-desc">接收周报和重要通知</span>
          <switch :checked="emailNotify" @change="emailNotify = !emailNotify" />
        </div>
        <div class="option-item">
          <span class="option-label">站内信通知</span>
          <span class="option-desc">接收平台消息推送</span>
          <switch :checked="inAppNotify" @change="inAppNotify = !inAppNotify" />
        </div>
      </div>
    </div>
    
    <div class="settings-section">
      <h2 class="section-title">📝 内容默认设置</h2>
      <div class="content-settings">
        <div class="form-item">
          <label>常用平台</label>
          <div class="platform-options">
            <button 
              v-for="platform in platforms" 
              :key="platform.key" 
              class="platform-btn"
              :class="{ active: selectedPlatforms.includes(platform.key) }"
              @click="togglePlatform(platform.key)"
            >
              {{ platform.icon }} {{ platform.name }}
            </button>
          </div>
        </div>
        <div class="form-item">
          <label>内容风格</label>
          <select class="style-select">
            <option value="professional">专业严谨</option>
            <option value="casual">轻松活泼</option>
            <option value="humorous">幽默风趣</option>
            <option value="emotional">情感共鸣</option>
          </select>
        </div>
        <div class="form-item">
          <label>标签偏好</label>
          <div class="tag-preferences">
            <span 
              v-for="tag in tagOptions" 
              :key="tag" 
              class="tag-item"
              :class="{ active: selectedTags.includes(tag) }"
              @click="toggleTag(tag)"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="settings-section">
      <h2 class="section-title">📄 导出格式</h2>
      <div class="export-options">
        <button 
          v-for="format in exportFormats" 
          :key="format.key" 
          class="export-btn"
          :class="{ active: selectedExport === format.key }"
          @click="selectedExport = format.key"
        >
          {{ format.icon }} {{ format.name }}
        </button>
      </div>
    </div>
    
    <div class="settings-section">
      <h2 class="section-title">🎨 主题</h2>
      <div class="theme-options">
        <button 
          class="theme-btn"
          :class="{ active: theme === 'light' }"
          @click="theme = 'light'"
        >
          ☀️ 浅色模式
        </button>
        <button 
          class="theme-btn"
          :class="{ active: theme === 'dark' }"
          @click="theme = 'dark'"
        >
          🌙 深色模式
        </button>
      </div>
      <p class="theme-note">注：深色模式正在开发中，即将上线</p>
    </div>
    
    <div class="settings-section">
      <h2 class="section-title">ℹ️ 关于</h2>
      <div class="about-info">
        <p>版本号：v1.0.0</p>
        <p>服务协议 | 隐私政策</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emailNotify = ref(true)
const inAppNotify = ref(true)
const theme = ref('light')
const selectedExport = ref('pdf')
const selectedPlatforms = ref(['xiaohongshu', 'douyin'])
const selectedTags = ref(['运营', '干货', '技巧'])

const platforms = [
  { key: 'xiaohongshu', icon: '📕', name: '小红书' },
  { key: 'douyin', icon: '🎵', name: '抖音' },
  { key: 'weibo', icon: '📱', name: '微博' },
  { key: 'bilibili', icon: '📺', name: 'B站' }
]

const tagOptions = ['运营', '干货', '技巧', '测评', '教程', '日常', '好物', '穿搭', '美食', '旅行']

const exportFormats = [
  { key: 'pdf', icon: '📄', name: 'PDF' },
  { key: 'image', icon: '🖼️', name: '图片' }
]

const togglePlatform = (key: string) => {
  const index = selectedPlatforms.value.indexOf(key)
  if (index > -1) {
    selectedPlatforms.value.splice(index, 1)
  } else {
    selectedPlatforms.value.push(key)
  }
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}
</script>

<style lang="scss" scoped>
.settings-page {
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

.settings-section {
  background: #FFFFFF;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 16px;
}

.account-info {
  display: flex;
  gap: 20px;
}

.avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  background: #EEF2FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
}

.upload-btn {
  padding: 6px 14px;
  background: #F3F4F6;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #E5E7EB;
  }
}

.info-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  label {
    font-size: 13px;
    color: #6B7280;
  }
  
  input {
    padding: 10px 14px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #4F46E5;
    }
  }
}

.notification-options {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.option-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.option-label {
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
}

.option-desc {
  flex: 1;
  font-size: 13px;
  color: #6B7280;
}

.platform-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.platform-btn {
  padding: 8px 16px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #EEF2FF;
    border-color: #4F46E5;
  }
  
  &.active {
    background: #4F46E5;
    color: white;
    border-color: #4F46E5;
  }
}

.style-select {
  padding: 10px 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  background: #FFFFFF;
  cursor: pointer;
}

.tag-preferences {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  padding: 6px 14px;
  background: #F3F4F6;
  border-radius: 20px;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  
  &.active {
    background: #EEF2FF;
    color: #4F46E5;
  }
}

.export-options {
  display: flex;
  gap: 12px;
}

.export-btn {
  padding: 10px 24px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &.active {
    background: #4F46E5;
    color: white;
    border-color: #4F46E5;
  }
}

.theme-options {
  display: flex;
  gap: 12px;
}

.theme-btn {
  padding: 10px 24px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  
  &.active {
    background: #4F46E5;
    color: white;
    border-color: #4F46E5;
  }
}

.theme-note {
  margin-top: 12px;
  font-size: 12px;
  color: #9CA3AF;
}

.about-info {
  p {
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 4px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

switch {
  --active-color: #4F46E5;
  --inactive-color: #E5E7EB;
}
</style>
