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
  box-sizing: border-box;
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

  /* Filters: 2×2 grid */
  .filters-row {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .left-filters {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .search-box {
    width: 100%;
    grid-column: span 1;
  }

  .filter-input {
    width: 100%;
    height: 46px;
    font-size: 13.5px;
  }

  .select-box {
    min-width: unset;
    width: 100%;
  }

  .dynamic-select {
    min-width: unset;
    width: 100%;
    grid-column: span 1;
  }

  .filter-select,
  .custom-select {
    height: 46px;
    font-size: 13.5px;
    width: 100%;
  }

  .right-info {
    font-size: 12px;
    text-align: right;
    white-space: normal;
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
   LARGE MOBILE (376px — 480px)
   ============================================================ */
@media (min-width: 376px) and (max-width: 480px) {
  .monitoring-container {
    padding: 18px 16px;
  }

  .page-title {
    font-size: 20px;
    margin-bottom: 18px;
  }

  /* Tabs: compact side-by-side, scale text */
  .tabs-list {
    gap: 6px;
  }

  .tab-item {
    font-size: 12px;
    padding: 0 6px 9px 6px;
  }

  .tabs-nav {
    margin-bottom: 18px;
  }

  /* Filters: full-width stack */
  .filters-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .left-filters {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .search-box {
    width: 100%;
  }

  .filter-input {
    width: 100%;
    height: 48px;
    font-size: 14px;
    border-radius: 12px;
  }

  .select-box {
    min-width: unset;
    width: 100%;
  }

  .dynamic-select {
    min-width: unset;
    width: 100%;
  }

  .filter-select,
  .custom-select {
    height: 48px;
    font-size: 14px;
    width: 100%;
    border-radius: 12px;
  }

  .placeholder-label {
    font-size: 14px;
  }

  .right-info {
    font-size: 11.5px;
    text-align: right;
    white-space: normal;
  }

  /* Table: scrollable with fade hint */
  .table-card {
    border-radius: 12px;
    position: relative;
    overflow: hidden;
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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
  }

  .monitoring-table {
    min-width: 640px;
  }

  .monitoring-table th {
    padding: 18px 10px;
    font-size: 11.5px;
  }

  .monitoring-table th:first-child {
    padding-left: 14px;
  }

  .monitoring-table th:last-child {
    padding-right: 14px;
  }

  .empty-state {
    padding: 60px 0;
    font-size: 13px;
  }
}

/* ============================================================
   SMALL MOBILE (375px and below)
   ============================================================ */
@media (max-width: 375px) {
  .monitoring-container {
    padding: 14px 12px;
    /* Guarantee no element punches past the viewport */
    width: 100%;
    box-sizing: border-box;
  }

  /* ── Title ── */
  .page-title {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 16px;
    /* Never let it overflow */
    word-break: break-word;
    overflow-wrap: break-word;
  }

  /* ── Tabs: stack vertically ── */
  .tabs-nav {
    position: relative;   /* MUST stay relative — divider is absolute inside it */
    margin-bottom: 16px;
    padding-bottom: 2px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .tabs-list {
    display: flex;
    flex-direction: column;   /* stack vertically */
    align-items: stretch;     /* each button full width */
    gap: 0;
    width: 100%;
  }

  .tab-item {
    width: 100%;
    padding: 10px 0 14px 0;         /* 14px bottom gives space for 2px indicator */
    font-size: 13px;
    font-weight: 500;
    white-space: normal !important; /* override base nowrap */
    word-break: break-word;
    text-align: left;
    letter-spacing: 0;
    position: relative;
    box-sizing: border-box;
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

  /* tabs-divider stays absolute — anchors to tabs-nav (position:relative) */
  .tabs-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #cbd5e1;
    z-index: 1;
  }

  /* ── Filters: every element full-width, vertical stack ── */
  .filters-row {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    margin-bottom: 20px;
  }

  .left-filters {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  /* Search box wrapper — must be block-level full width */
  .search-box {
    display: block;
    width: 100% !important;   /* override base 220px */
    min-width: 0 !important;
    flex-shrink: 0;
    box-sizing: border-box;
    position: relative;
  }

  /* Input fills wrapper exactly */
  .filter-input {
    display: block;
    width: 100% !important;   /* fill wrapper, not the base 220px */
    min-width: 0 !important;
    height: 48px;
    font-size: 14px;
    border-radius: 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  .filter-input::placeholder {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* BUG 1 FIX: All select wrappers — same full width, cancel every inherited min-width */
  .select-box {
    min-width: 0 !important;   /* override base 175px */
    width: 100%;
    box-sizing: border-box;
  }

  .dynamic-select {
    min-width: 0 !important;   /* override base 240px */
    width: 100%;
    box-sizing: border-box;
  }

  /* BUG 1 FIX: Selects fill their wrappers exactly */
  .filter-select {
    width: 100%;
    min-width: 0;
    height: 48px;
    font-size: 14px;
    border-radius: 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
  }

  .custom-select {
    width: 100%;
    min-width: 0;
    height: 48px;
    font-size: 14px;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .placeholder-label {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 32px); /* leave room for chevron icon */
  }

  /* Info text — must never overflow */
  .right-info {
    font-size: 11.5px;
    text-align: center;
    white-space: normal !important;   /* override base white-space:nowrap */
    flex-shrink: 1 !important;        /* override base flex-shrink:0 */
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow-wrap: break-word;
    word-break: break-word;
    line-height: 1.5;
  }

  /* ── Table: scrollable container with right-edge fade hint ── */
  .table-card {
    border-radius: 10px;
    position: relative;
    overflow: hidden;  /* clips the ::after fade overlay */
  }

  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    /* Scrollbar always accessible but thin */
    scrollbar-width: thin;
    scrollbar-color: #cbd5e1 transparent;
  }

  /* Right-edge gradient fade = "scroll hint" */
  .table-card::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 36px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(203, 213, 225, 0.5));
    pointer-events: none;
    border-radius: 0 10px 10px 0;
    z-index: 3;
  }

  /* Table itself has a minimum width so columns don't crush */
  .monitoring-table {
    min-width: 580px;
  }

  .monitoring-table th {
    padding: 14px 8px;
    font-size: 11px;
    line-height: 1.4;
    white-space: normal;  /* let header text wrap inside its cell */
  }

  .monitoring-table th:first-child {
    padding-left: 12px;
    text-align: left;
  }

  .monitoring-table th:last-child {
    padding-right: 12px;
    text-align: right;
  }

  /* Empty state always centered */
  .empty-state {
    padding: 50px 16px;
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
