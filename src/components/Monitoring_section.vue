<template>
  <div class="monitoring-container">
    <h1 class="page-title">Monitoring</h1>

    <!-- Tabs Navigation -->
    <div class="tabs-nav">
      <div class="tabs-list">
        <button 
          class="tab-item" 
          :class="{ 'active': activeTab === 'faol' }"
          @click="switchTab('faol')"
        >
          Faol vakansiyalar
          <div class="tab-indicator" v-if="activeTab === 'faol'"></div>
        </button>
        <button 
          class="tab-item" 
          :class="{ 'active': activeTab === 'yopilgan' }"
          @click="switchTab('yopilgan')"
        >
          Yopilgan vakansiyalar
          <div class="tab-indicator" v-if="activeTab === 'yopilgan'"></div>
        </button>
      </div>
      <div class="tabs-divider"></div>
    </div>

    <!-- Filters Row -->
    <div class="filters-row">
      <div class="left-filters">
        <!-- Search Input -->
        <div class="search-box">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Vakansiya nomi"
            class="filter-input"
          />
        </div>

        <!-- Region Dropdown -->
        <div class="select-box">
          <select v-model="selectedRegion" class="filter-select">
            <option value="Barchasi">Barchasi</option>
          </select>
          <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Year Dropdown -->
        <div class="select-box">
          <select v-model="selectedYear" class="filter-select">
            <option value="2026">2026</option>
          </select>
          <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        <!-- Dynamic Filter Dropdown -->
        <div class="select-box dynamic-select">
          <div class="custom-select">
            <span class="placeholder-label">{{ dynamicFilterLabel }}</span>
            <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div class="right-info">
        Ko'rsatilmoqda: <span class="stats-bold">0-0</span> ta tashkilot. Jami <span class="stats-bold">0</span> ta
      </div>
    </div>

    <!-- Data Table Card -->
    <div class="table-card">
      <div class="table-wrapper">
        <table class="monitoring-table">
          <thead>
            <tr>
              <th v-for="(col, index) in tableColumns" :key="index" :style="{ width: getColWidth(index) }">
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :colspan="tableColumns.length" class="empty-state">
                Ma'lumot topilmadi
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// State
const activeTab = ref('faol');
const searchQuery = ref('');
const selectedRegion = ref('Barchasi');
const selectedYear = ref('2026');
const selectedFilter = ref('Barchasi');

// Reset to defaults on mount
onMounted(() => {
  activeTab.value = 'faol';
  selectedRegion.value = 'Barchasi';
  selectedYear.value = '2026';
  selectedFilter.value = 'Barchasi';
});

// Logic
const switchTab = (tab) => {
  activeTab.value = tab;
};

const dynamicFilterLabel = computed(() => {
  if (activeTab.value === 'faol') {
    return "Moslik bo'yicha filtr";
  } else {
    return "Mos rezyumelar va takliflar (10...";
  }
});

const tableColumns = computed(() => {
  if (activeTab.value === 'faol') {
    return [
      'Tashkilotlar',
      'Hudud',
      'Vakansiyalar soni',
      'Mos rezyumelar va takliflar (100%-71%)',
      'Mos rezyumelar va takliflar (70%-51%)',
      'Mos rezyumelar va takliflar (50%-30%)',
      'Vakansiya e\'lon qilingan sana'
    ];
  } else {
    return [
      'Tashkilotlar',
      'Hudud',
      'Vakansiyalar soni',
      'Bo\'sh ish o\'rinlari soni',
      'Tizim orqali xodim ishga olingan',
      'Vakansiya e\'lon qilingan sana',
      'Vakansiya yopilgan sana'
    ];
  }
});

// Column width helper for better replication
const getColWidth = (index) => {
  if (index === 0) return '280px';
  return 'auto';
}
</script>

<style scoped>
.monitoring-container {
  padding: 40px;
  background-color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1f2937;
  max-width: 1440px;
  margin: 0 auto;
}

.page-title {
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 30px;
  color: #111827;
  letter-spacing: -0.01em;
}

/* Tabs */
.tabs-nav {
  position: relative;
  margin-bottom: 32px;
}

.tabs-list {
  display: flex;
  gap: 32px;
}

.tab-item {
  padding: 0 16px 12px 16px;
  font-size: 15px;
  font-weight: 500;
  color: #9ca3af;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.tab-item.active {
  color: #14b8a6;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #14b8a6;
  border-radius: 2px 2px 0 0;
  z-index: 2;
}

.tabs-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #cbd5e1;
  z-index: 1;
}

/* Filters */
.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
}

.left-filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  width: 220px;
  flex-shrink: 0;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.filter-input {
  box-sizing: border-box;
  width: 220px;
  height: 46px;
  padding: 0 16px 0 42px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14.5px;
  color: #111827;
  outline: none;
  transition: all 0.2s ease;
}

.filter-input::placeholder {
  color: #9ca3af;
}

.filter-input:focus {
  border-color: #14b8a6;
  background: #fff;
}

.select-box {
  position: relative;
  min-width: 175px;
}

.filter-select {
  width: 100%;
  height: 46px;
  padding: 0 40px 0 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14.5px;
  color: #6b7280;
  outline: none;
  appearance: none;
  cursor: pointer;
}

.custom-select {
  position: relative;
  width: 100%;
  height: 46px;
  padding: 0 40px 0 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dynamic-select {
  min-width: 240px;
}

.placeholder-label {
  font-size: 14.5px;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chevron-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.right-info {
  font-size: 13.5px;
  color: #9ca3af;
  white-space: nowrap;
}

.stats-bold {
  font-weight: 600;
  color: #6b7280;
}

/* Table Card */
.table-card {
  background: #ffffff;
  border: 2px solid #d1d5db;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.monitoring-table {
  width: 100%;
  border-collapse: collapse;
}

.monitoring-table th {
  padding: 32px 20px;
  font-size: 14.5px;
  font-weight: 500;
  color: #9ca3af;
  text-align: center;
  line-height: 1.5;
  border-bottom: 2px solid #cbd5e1;
}

.monitoring-table th:first-child {
  text-align: left;
  padding-left: 32px;
}

.monitoring-table th:last-child {
  text-align: right;
  padding-right: 32px;
}

.empty-state {
  padding: 100px 0;
  text-align: center;
  font-size: 14.5px;
  color: #9ca3af;
  background: #fff;
}
</style>
