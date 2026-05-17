<template>
  <div class="monitoring-container">
    <h1 class="page-title">Monitoring</h1>

    <!-- Tabs Navigation -->
    <div class="tabs-nav">
      <div class="tabs-list">
        <!-- FIXED: [PROBLEM 1] Tabs container -->
        <button 
          class="tab-item left-tab" 
          :class="{ 'active': activeTab === 'faol' }"
          @click="switchTab('faol')"
        >
          Faol vakansiyalar
          <div class="tab-indicator" v-if="activeTab === 'faol'"></div>
        </button>
        <button 
          class="tab-item right-tab" 
          :class="{ 'active': activeTab === 'yopilgan' }"
          @click="switchTab('yopilgan')"
        >
          Yopilgan vakansiyalar
          <div class="tab-indicator" v-if="activeTab === 'yopilgan'"></div>
        </button>
      </div>
      <!-- FIXED: [PROBLEM 2] Single full-width animated underline indicator -->
      <div class="tab-indicator-full" :style="indicatorStyle"></div>
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
          <!-- FIXED: [PROBLEM 3] Converted to native select with default option -->
          <select v-model="selectedFilter" class="filter-select">
            <option value="">Barchasi</option>
            <option value="dynamic">{{ dynamicFilterLabel }}</option>
          </select>
          <svg class="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
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
// FIXED: [PROBLEM 3] Default value is empty string
const selectedFilter = ref('');

// Reset to defaults on mount
onMounted(() => {
  activeTab.value = 'faol';
  selectedRegion.value = 'Barchasi';
  selectedYear.value = '2026';
  // FIXED: [PROBLEM 3] Reset to empty string on mount
  selectedFilter.value = '';
});

// Logic
const switchTab = (tab) => {
  activeTab.value = tab;
};

// FIXED: [PROBLEM 2] Dynamic indicator style computed property
const indicatorStyle = computed(() => {
  if (activeTab.value === 'faol') {
    return { background: 'linear-gradient(to right, #14b8a6 50%, #d1d5db 50%)' };
  } else {
    return { background: 'linear-gradient(to right, #d1d5db 50%, #14b8a6 50%)' };
  }
});

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
/* ============================================================
   BASE STYLES (Desktop-first, 1280px–1920px)
   ============================================================ */

.monitoring-container {
  padding: 40px;
  background-color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1f2937;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
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
  white-space: nowrap;
}

.tab-item.active {
  color: #14b8a6;
}

/* Original desktop internal tab indicator */
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

/* Hide the mobile full-width animated underline indicator on desktop */
.tab-indicator-full {
  display: none;
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
  align-items: center;
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
  /* FIXED: [PROBLEM 4] Explicit height, padding, and line-height for vertical text alignment */
  height: 46px;
  line-height: 44px;
  padding: 0 36px 0 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14.5px;
  color: #6b7280;
  outline: none;
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
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
  flex-shrink: 0;
  align-self: flex-end;
  padding-bottom: 0px;
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
  -webkit-overflow-scrolling: touch;
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

/* ============================================================
   4K / ULTRA-WIDE (2560px and above)
   ============================================================ */
@media (min-width: 2560px) {
  .monitoring-container {
    max-width: 2200px;
    padding: 60px 80px;
  }

  .page-title {
    font-size: 42px;
    margin-bottom: 40px;
  }

  .tabs-list {
    gap: 48px;
  }

  .tab-item {
    font-size: 18px;
    padding: 0 24px 16px 24px;
  }

  .tabs-nav {
    margin-bottom: 44px;
  }

  .filters-row {
    margin-bottom: 32px;
    gap: 24px;
  }

  .left-filters {
    gap: 20px;
  }

  .search-box {
    width: 320px;
  }

  .filter-input {
    width: 320px;
    height: 56px;
    font-size: 16px;
    border-radius: 14px;
  }

  .select-box {
    min-width: 220px;
  }

  .dynamic-select {
    min-width: 320px;
  }

  .filter-select,
  .custom-select {
    height: 56px;
    font-size: 16px;
    border-radius: 14px;
  }

  .placeholder-label {
    font-size: 16px;
  }

  .right-info {
    font-size: 16px;
  }

  .monitoring-table th {
    padding: 40px 28px;
    font-size: 16px;
  }

  .monitoring-table th:first-child {
    padding-left: 48px;
  }

  .monitoring-table th:last-child {
    padding-right: 48px;
  }

  .empty-state {
    padding: 140px 0;
    font-size: 17px;
  }

  .table-card {
    border-radius: 24px;
  }
}

/* ============================================================
   LARGE DESKTOP (1920px — 1440px) — already covered by base,
   just fine-tune max-width container centering
   ============================================================ */
@media (min-width: 1440px) and (max-width: 2559px) {
  .monitoring-container {
    max-width: 1440px;
    padding: 48px 56px;
  }

  .page-title {
    font-size: 34px;
  }

  .left-filters {
    gap: 16px;
  }

  .search-box {
    width: 260px;
  }

  .filter-input {
    width: 260px;
  }

  .dynamic-select {
    min-width: 280px;
  }
}

/* ============================================================
   STANDARD DESKTOP (1280px — 1024px)
   ============================================================ */
@media (min-width: 1024px) and (max-width: 1439px) {
  .monitoring-container {
    padding: 36px 40px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 26px;
  }

  .tabs-list {
    gap: 24px;
  }

  .tab-item {
    font-size: 14px;
    padding: 0 12px 11px 12px;
  }

  .filters-row {
    gap: 12px;
    flex-wrap: wrap;
  }

  .left-filters {
    gap: 10px;
  }

  .search-box {
    width: 200px;
  }

  .filter-input {
    width: 200px;
    height: 44px;
    font-size: 13.5px;
  }

  .select-box {
    min-width: 150px;
  }

  .dynamic-select {
    min-width: 210px;
  }

  .filter-select,
  .custom-select {
    height: 44px;
    font-size: 13.5px;
  }

  .placeholder-label {
    font-size: 13.5px;
  }

  .right-info {
    font-size: 12.5px;
  }

  .monitoring-table th {
    padding: 26px 16px;
    font-size: 13px;
  }

  .monitoring-table th:first-child {
    padding-left: 24px;
  }

  .monitoring-table th:last-child {
    padding-right: 24px;
  }
}

/* ============================================================
   SMALL LAPTOPS / LARGE TABLETS LANDSCAPE (769px — 1023px)
   ============================================================ */
@media (min-width: 769px) and (max-width: 1023px) {
  .monitoring-container {
    padding: 28px 28px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 22px;
  }

  .tabs-list {
    gap: 20px;
  }

  .tab-item {
    font-size: 13.5px;
    padding: 0 10px 10px 10px;
  }

  .tabs-nav {
    margin-bottom: 24px;
  }

  .filters-row {
    flex-wrap: wrap;
    gap: 10px;
    align-items: flex-start;
  }

  .left-filters {
    gap: 8px;
    flex: 1 1 100%;
  }

  .right-info {
    flex: 0 0 auto;
    font-size: 12px;
    align-self: center;
  }

  .search-box {
    width: 190px;
  }

  .filter-input {
    width: 190px;
    height: 44px;
    font-size: 13px;
  }

  .select-box {
    min-width: 140px;
  }

  .dynamic-select {
    min-width: 185px;
  }

  .filter-select,
  .custom-select {
    height: 44px;
    font-size: 13px;
  }

  .placeholder-label {
    font-size: 13px;
  }

  /* Table becomes scrollable */
  .table-card {
    border-radius: 16px;
    position: relative;
  }

  .table-wrapper {
    overflow-x: auto;
    /* Subtle right-edge fade hint */
    background:
      linear-gradient(to right, #ffffff 0%, transparent 40px) left center,
      linear-gradient(to left, #f1f5f9 0%, transparent 40px) right center;
    background-attachment: local, scroll;
    background-size: 40px 100%, 40px 100%;
    background-repeat: no-repeat;
  }

  .monitoring-table {
    min-width: 800px;
  }

  .monitoring-table th {
    padding: 22px 14px;
    font-size: 12.5px;
  }

  .monitoring-table th:first-child {
    padding-left: 20px;
  }

  .monitoring-table th:last-child {
    padding-right: 20px;
  }

  .empty-state {
    padding: 80px 0;
    font-size: 13.5px;
  }
}

/* ============================================================
   TABLETS PORTRAIT (481px — 768px)
   ============================================================ */
@media (min-width: 481px) and (max-width: 768px) {
  .monitoring-container {
    padding: 22px 20px;
  }

  .page-title {
    font-size: 22px;
    margin-bottom: 20px;
  }

  /* Tabs: compact, no wrap */
  .tabs-list {
    gap: 12px;
  }

  .tab-item {
    font-size: 13px;
    padding: 0 8px 10px 8px;
  }

  .tabs-nav {
    margin-bottom: 20px;
  }

  /* Filters: full-width stack */
  .filters-row {
    display: block !important;
    width: 100% !important;
    margin-bottom: 20px !important;
  }

  .left-filters {
    display: block !important;
    width: 100% !important;
  }

  .left-filters > div {
    margin-bottom: 12px !important;
  }

  .search-box {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
  }

  .filter-input {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    height: 46px;
    font-size: 13.5px;
    box-sizing: border-box;
  }

  .select-box,
  .dynamic-select {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    box-sizing: border-box;
  }

  .filter-select,
  .custom-select {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    height: 46px;
    font-size: 13.5px;
    box-sizing: border-box;
  }

  .right-info {
    display: block !important;
    width: 100% !important;
    font-size: 12px;
    text-align: center !important;
    white-space: normal !important;
    margin-top: 12px !important;
  }

  /* Table: scrollable with shadow hint */
  .table-card {
    border-radius: 14px;
    position: relative;
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* Right-edge fade shadow to hint scroll */
  .table-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(203, 213, 225, 0.35));
    pointer-events: none;
    border-radius: 0 14px 14px 0;
  }

  .monitoring-table {
    min-width: 700px;
  }

  .monitoring-table th {
    padding: 20px 12px;
    font-size: 12px;
  }

  .monitoring-table th:first-child {
    padding-left: 16px;
  }

  .monitoring-table th:last-child {
    padding-right: 16px;
  }

  .empty-state {
    padding: 70px 0;
    font-size: 13px;
  }
}

/* ============================================================
   ALL MOBILE DEVICES (480px and below)
   ============================================================ */
@media (max-width: 480px) {
  .monitoring-container {
    padding: 16px 14px;
    width: 100%;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    box-sizing: border-box;
  }

  .page-title {
    font-size: 22px;
    font-weight: 800;
    margin-bottom: 16px;
    word-break: break-word;
    overflow-wrap: break-word;
    width: 100%;
  }

  /* -- Tabs (BUG 3 FIX) -- */
  .tabs-nav {
    position: relative;
    margin-bottom: 16px;
    padding-bottom: 2px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .tabs-list {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center;
    gap: 0;
    width: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }

  .tab-item {
    flex: 1 !important;
    padding: 12px 0 14px 0;
    font-size: 16px !important;
    font-weight: 500;
    white-space: nowrap !important;
    word-break: normal !important;
    letter-spacing: 0;
    position: relative;
    box-sizing: border-box;
  }

  .left-tab {
    text-align: left !important;
  }

  .right-tab {
    text-align: right !important;
  }

  /* Hide the desktop internal indicators on mobile */
  .tab-indicator {
    display: none !important;
  }

  /* Show and style the full-width animated indicator on mobile */
  .tab-indicator-full {
    display: block !important;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    border-radius: 2px 2px 0 0;
    z-index: 2;
    transition: background 0.3s ease;
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

  /* -- Filters Row (BUG 1 & 2 FIX) -- */
  .filters-row {
    display: block !important;
    width: 100% !important;
    margin-bottom: 24px !important;
  }

  .left-filters {
    display: block !important;
    width: 100% !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .left-filters > div {
    margin-bottom: 12px !important;
  }

  /* Force every input and select to exactly 100% width */
  .search-box,
  .select-box,
  .dynamic-select {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .filter-input,
  .filter-select,
  .custom-select {
    display: block !important;
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    height: 48px !important;
    font-size: 14px !important;
    border-radius: 10px !important;
    box-sizing: border-box !important;
    margin: 0 !important;
  }

  .filter-input::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .placeholder-label {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 32px);
  }

  /* -- Info Text (BUG 2 FIX) -- */
  .right-info {
    display: block !important;
    width: 100% !important;
    font-size: 12px !important;
    text-align: center !important;
    white-space: normal !important;
    word-break: break-word !important;
    line-height: 1.5 !important;
    margin: 16px 0 0 0 !important;
    padding: 0 !important;
    clear: both !important;
  }

  /* -- Table Container -- */
  .table-card {
    width: 100% !important;
    max-width: 100% !important;
    border-radius: 12px;
    position: relative;
    overflow: hidden !important; 
    box-sizing: border-box !important;
  }

  .table-wrapper {
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }

  .monitoring-table {
    min-width: 600px; /* Keep this so table scrolls, but wrapper must hide overflow */
  }

  .table-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(203, 213, 225, 0.4));
    pointer-events: none;
    border-radius: 0 12px 12px 0;
    z-index: 3;
  }

  .monitoring-table th {
    padding: 14px 10px;
    font-size: 11.5px;
    white-space: normal;
  }

  .monitoring-table th:first-child {
    padding-left: 12px;
  }

  .monitoring-table th:last-child {
    padding-right: 12px;
  }

  .empty-state {
    padding: 50px 10px;
    font-size: 13px;
    text-align: center;
  }
}

/* ============================================================
   PREVENT PAGE-LEVEL HORIZONTAL SCROLL
   ============================================================ */
.monitoring-container {
  overflow-x: hidden;
}
</style>
