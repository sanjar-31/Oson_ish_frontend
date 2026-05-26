<template>
  <div class="page">
    <div class="container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Bosh sahifa
        </router-link>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">Takliflar</span>
      </nav>

      <!-- Title -->
      <h1 class="page-title">Takliflar</h1>

      <!-- Two-column layout -->
      <div class="layout">
        <!-- Left sidebar tabs (desktop) -->
        <aside class="sidebar">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['tab-item', { 'tab-active': activeTab === tab.id, 'tab-disabled': tab.disabled }]"
            :disabled="tab.disabled"
            @click="setTab(tab)"
          >
            <span class="tab-label">{{ tab.label }}</span>
            <span class="tab-count">{{ tab.count }}</span>
          </button>
        </aside>

        <!-- Mobile horizontal tabs -->
        <div class="mobile-tabs">
          <button
            v-for="tab in tabs"
            :key="'m-' + tab.id"
            :class="['mtab', { 'mtab-active': activeTab === tab.id, 'mtab-disabled': tab.disabled }]"
            :disabled="tab.disabled"
            @click="setTab(tab)"
          >
            {{ tab.label }}
            <span class="mtab-count">{{ tab.count }}</span>
          </button>
        </div>

        <!-- Right content -->
        <main class="content">
          <!-- Search & filter bar -->
          <div class="search-row">
            <div class="search-wrap">
              <input type="text" v-model="searchQuery" placeholder="Nomzod ismi, rezyume nomi" class="search-input" />
            </div>
            <button class="btn-search">Izlash</button>
            <button class="btn-filters" @click="openDrawer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" />
                <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
                <circle cx="8" cy="18" r="2" fill="currentColor" stroke="none" />
              </svg>
              Filtrlar
            </button>
          </div>

          <!-- Sort row -->
          <div class="sort-row">
            <div class="sort-left">
              <span class="sort-label">Saralash:</span>
              <button class="sort-btn">Sana bo'yicha <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
              <button class="sort-btn">Jinsi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
              <button class="sort-btn">Yoshi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></button>
            </div>
            <label class="check-wrap">
              <input type="checkbox" v-model="onlyNew" />
              <span class="check-box"><svg viewBox="0 0 14 14" fill="none"><path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span class="check-text">Faqat yangilarini ko'rsatish</span>
            </label>
          </div>

          <!-- Empty state -->
          <div class="empty">
            <h2 class="empty-title">Hozircha bu bo'limda hech narsa yo'q</h2>
            <p class="empty-desc">Rezyumelarga taklif yuborish orqali nomzod topishingiz mumkin.</p>
            <button class="btn-cta">Rezyumalarni ko'rish</button>
          </div>
        </main>
      </div>
    </div>

    <!-- FAB -->
    <button class="fab">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
        <path fill-rule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z" clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Drawer overlay -->
    <Transition name="overlay">
      <div v-if="drawerOpen" class="overlay" @click="closeDrawer"></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer">
      <aside v-if="drawerOpen" class="drawer">
        <div class="drawer-content">
          <div class="field">
            <label class="field-label">Hudud</label>
            <div class="sel-wrap">
              <select v-model="filters.hudud">
                <option value="">Tanlang</option>
                <option value="Qoraqalpog'iston Respublikasi">Qoraqalpog'iston Respublikasi</option>
                <option value="Toshkent shahri">Toshkent shahri</option>
                <option value="Toshkent viloyati">Toshkent viloyati</option>
              </select>
              <svg class="sel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="field">
            <label class="field-label">Lavozim</label>
            <div class="sel-wrap">
              <select v-model="filters.lavozim">
                <option value="">Tanlang</option>
                <option value="Dasturchi">Dasturchi</option>
                <option value="Dizayner">Dizayner</option>
                <option value="Menejer">Menejer</option>
              </select>
              <svg class="sel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="field">
            <label class="field-label">Ish tajribasi</label>
            <div class="sel-wrap">
              <select v-model="filters.tajriba">
                <option value="">Tanlang</option>
                <option value="Tajribasiz">Tajribasiz</option>
                <option value="1-3 yil">1-3 yil</option>
                <option value="3-5 yil">3-5 yil</option>
                <option value="5+ yil">5+ yil</option>
              </select>
              <svg class="sel-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
          <div class="field">
            <label class="field-label">Maosh (so'm)</label>
            <div class="salary-row">
              <input type="number" v-model="filters.maoshDan" placeholder="Dan" class="salary-input" />
              <input type="number" v-model="filters.maoshGacha" placeholder="Gacha" class="salary-input" />
            </div>
          </div>
        </div>
        <div class="drawer-footer">
          <button class="btn-clear" @click="clearFilters">Tozalash</button>
          <button class="btn-apply" @click="applyFilters">Qo'llash</button>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const tabs = ref([
  { id: 'all', label: 'Barchasi', count: 0, disabled: false },
  { id: 'incoming', label: 'Kelib tushgan', count: 0, disabled: false },
  { id: 'sent', label: 'Yuborilgan', count: 0, disabled: false },
  { id: 'accepted', label: 'Qabul qilingan', count: 0, disabled: false },
  { id: 'interview', label: 'Suxbatga chaqirilgan', count: 0, disabled: false },
  { id: 'hired', label: 'Ishga qabul qilingan', count: 0, disabled: true },
  { id: 'rejected', label: 'Rad etilgan', count: 0, disabled: false },
])

const activeTab = ref('all')
const searchQuery = ref('')
const onlyNew = ref(false)
const drawerOpen = ref(false)

const filters = reactive({
  hudud: "Qoraqalpog'iston Respublikasi",
  lavozim: 'Dasturchi',
  tajriba: 'Tajribasiz',
  maoshDan: null,
  maoshGacha: null,
})

const setTab = (tab) => {
  if (!tab.disabled) activeTab.value = tab.id
}

const openDrawer = () => { drawerOpen.value = true }
const closeDrawer = () => { drawerOpen.value = false }

const clearFilters = () => {
  filters.hudud = ''
  filters.lavozim = ''
  filters.tajriba = ''
  filters.maoshDan = null
  filters.maoshGacha = null
}

const applyFilters = () => { drawerOpen.value = false }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* { box-sizing: border-box; }

.page {
  min-height: calc(100vh - 80px);
  background: #f8fafb;
  font-family: 'Inter', sans-serif;
  padding-bottom: 80px;
}

/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 0 12px;
  font-size: 13px;
  font-weight: 500;
}
.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb-link:hover { color: #6b7280; }
.breadcrumb-sep { color: #d1d5db; }
.breadcrumb-current { color: #374151; }

/* Title */
.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #111827;
  margin: 4px 0 24px;
  letter-spacing: -0.4px;
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 32px;
  align-items: flex-start;
}

/* Mobile tabs — hidden on desktop */
.mobile-tabs {
  display: none;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tab-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border: none;
  border-radius: 10px;
  background: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.tab-item:hover:not(.tab-disabled) { background: #f3f4f6; }
.tab-active {
  background: #e0f2f1 !important;
  color: #111827;
  font-weight: 600;
}
.tab-disabled {
  color: #c4c9d0;
  cursor: not-allowed;
}
.tab-count {
  font-size: 14px;
  color: inherit;
}

/* Content */
.content { min-width: 0; }

/* Search row */
.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}
.search-wrap { flex: 1; }
.search-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: #0096b1; }
.btn-search {
  height: 48px;
  padding: 0 28px;
  background: #0096b1;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-search:hover { background: #007d96; }
.btn-filters {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: #374151;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  white-space: nowrap;
}
.btn-filters:hover { background: #f3f4f6; border-color: #d1d5db; }

/* Sort row */
.sort-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.sort-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.sort-label {
  font-size: 14px;
  font-weight: 600;
  color: #0096b1;
}
.sort-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  padding: 0;
  transition: color 0.2s;
}
.sort-btn:hover { color: #374151; }
.sort-btn svg { color: #9ca3af; }

/* Checkbox */
.check-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}
.check-wrap input { position: absolute; opacity: 0; pointer-events: none; }
.check-box {
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s, border-color 0.15s;
}
.check-box svg { width: 12px; height: 12px; opacity: 0; }
.check-wrap input:checked + .check-box {
  background: #0096b1;
  border-color: #0096b1;
}
.check-wrap input:checked + .check-box svg { opacity: 1; }
.check-text {
  font-size: 14px;
  color: #6b7280;
}

/* Empty state */
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 80px 16px 60px;
}
.empty-title {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px;
}
.empty-desc {
  font-size: 14px;
  color: #9ca3af;
  max-width: 360px;
  line-height: 1.7;
  margin: 0 0 28px;
}
.btn-cta {
  height: 48px;
  padding: 0 32px;
  background: #0096b1;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 150, 177, 0.3);
  transition: background 0.2s, transform 0.1s;
}
.btn-cta:hover { background: #007d96; }
.btn-cta:active { transform: scale(0.97); }

/* FAB */
.fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 50;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0096b1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 150, 177, 0.38);
  transition: background 0.2s, transform 0.2s;
}
.fab:hover { background: #007d96; transform: scale(1.06); }

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 200;
}

/* Drawer */
.drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 380px;
  max-width: 100vw;
  background: #fff;
  z-index: 201;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.08);
}
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Fields */
.field { display: flex; flex-direction: column; gap: 8px; }
.field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.sel-wrap {
  position: relative;
}
.sel-wrap select {
  width: 100%;
  height: 48px;
  padding: 0 40px 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  color: #111827;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.sel-wrap select:focus { border-color: #0096b1; }
.sel-arrow {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.salary-row { display: flex; gap: 12px; }
.salary-input {
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s;
}
.salary-input:focus { border-color: #0096b1; }
.salary-input::placeholder { color: #9ca3af; }

/* Drawer footer */
.drawer-footer {
  display: flex;
  gap: 12px;
  padding: 20px 24px;
  border-top: 1px solid #f3f4f6;
}
.btn-clear {
  flex: 1;
  height: 48px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-clear:hover { background: #f9fafb; }
.btn-apply {
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 10px;
  background: #0096b1;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-apply:hover { background: #007d96; }

/* Transitions */
.overlay-enter-active, .overlay-leave-active { transition: opacity 0.3s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }
.drawer-enter-active, .drawer-leave-active { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }

/* ══════════════════════════════════════
   RESPONSIVE
   ══════════════════════════════════════ */

/* Large screens — keep centered */
@media (min-width: 1441px) {
  .container { max-width: 1400px; }
}

/* Tablet — sidebar becomes horizontal tabs */
@media (max-width: 1024px) {
  .container { padding: 0 24px; }
  .page-title { font-size: 26px; }

  .layout {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .sidebar { display: none; }
  .mobile-tabs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: none;
    -ms-overflow-style: none;
    margin-bottom: 8px;
  }
  .mobile-tabs::-webkit-scrollbar { display: none; }
  .mtab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    background: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  .mtab:hover:not(.mtab-disabled) { border-color: #0096b1; color: #0096b1; }
  .mtab-active {
    background: #e0f2f1 !important;
    border-color: #0096b1 !important;
    color: #111827 !important;
    font-weight: 600;
  }
  .mtab-disabled { color: #c4c9d0; cursor: not-allowed; border-color: #f3f4f6; }
  .mtab-count { font-size: 13px; color: inherit; }
}

/* Mobile */
@media (max-width: 640px) {
  .container { padding: 0 16px; }
  .breadcrumb { padding: 14px 0 10px; }
  .page-title { font-size: 22px; margin-bottom: 18px; }

  .search-row { flex-wrap: wrap; gap: 10px; }
  .search-wrap { flex: 1 1 100%; }
  .search-input { height: 46px; }
  .btn-search { flex: 1; height: 46px; padding: 0 16px; }
  .btn-filters { flex: 1; height: 46px; justify-content: center; }

  .sort-row { flex-direction: column; align-items: flex-start; gap: 12px; }
  .sort-left { gap: 12px; }

  .empty { padding: 40px 8px 48px; }
  .empty-title { font-size: 18px; }
  .empty-desc { font-size: 13px; }
  .btn-cta { width: 100%; max-width: 320px; font-size: 14px; height: 46px; }

  .fab { bottom: 16px; right: 16px; width: 50px; height: 50px; }
  .drawer { width: 100vw; }
}

/* Small phones */
@media (max-width: 380px) {
  .page-title { font-size: 20px; }
  .mtab { font-size: 12px; padding: 8px 12px; }
  .empty-title { font-size: 16px; }
  .empty-desc { font-size: 12px; }
}
</style>
