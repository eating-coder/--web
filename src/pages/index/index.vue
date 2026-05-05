<template>
  <div class="app-container">
    <Sidebar :currentPage="currentPage" @navigate="handleNavigate" />
    
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <ChatPage v-if="currentPage === 'chat'" />
        <DashboardPage v-else-if="currentPage === 'dashboard'" />
        <PlanningPage v-else-if="currentPage === 'planning'" />
        <CalendarPage v-else-if="currentPage === 'calendar'" />
        <PlansPage v-else-if="currentPage === 'plans'" />
        <KnowledgePage v-else-if="currentPage === 'knowledge'" />
        <SettingsPage v-else-if="currentPage === 'settings'" />
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import ChatPage from '@/pages/ChatPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import PlanningPage from '@/pages/PlanningPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import PlansPage from '@/pages/PlansPage.vue'
import KnowledgePage from '@/pages/KnowledgePage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const currentPage = ref('chat')

const handleNavigate = (page: string) => {
  currentPage.value = page
}
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #F8F9FA;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
