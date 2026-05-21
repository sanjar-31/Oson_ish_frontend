<script setup>
import { ref } from 'vue'

const companies = [
  { id: 1, name: '"DAVR DIZAYN SANOAT" MAS\'ULIYATI CHEKLANGAN JAMIYAT', vacancies: 60, logo: null },
  { id: 2, name: '"SARDOBA TUMANI TIBBIYOT BIRLASHMASI" DAVLAT MUASSASASI', vacancies: 54, logo: null },
  { id: 3, name: 'SERGELI TUMANI TIBBIYOT BIRLASHMASI-MARKAZIY KO\'P TARMOQLI POLIKLINIKASI', vacancies: 43, logo: null },
];

const searchQuery = ref('')
const searchError = ref('')
const selectedRegion = ref('')
const selectedDistrict = ref('')
const stirValue = ref('')
const stirError = ref('')

const handleSearch = () => {
  if (searchQuery.value.length < 2) {
    searchError.value = 'Kamida 2 ta belgi kiriting'
  } else {
    searchError.value = ''
    // Perform search logic
  }
}

const clearFilters = () => {
  selectedRegion.value = ''
  selectedDistrict.value = ''
  stirValue.value = ''
  stirError.value = ''
}

const validateStir = () => {
  if (stirValue.value && (!/^\d{9}$/.test(stirValue.value))) {
    stirError.value = "STIR 9 ta raqamdan iborat bo'lishi kerak"
  } else {
    stirError.value = ''
  }
}

const clearStirError = () => {
  stirError.value = ''
}
</script>

<template>
  <section class="main-content">
    <h1 class="page-title">Tashkilotlar</h1>

    <div class="main-layout">
      <!-- Left Column -->
      <section class="content-column">
        <div class="search-row">
          <div class="search-input-wrapper">
            <span class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <input v-model="searchQuery" type="text" placeholder="Korxona yoki tashkilot nomi" class="search-input"
              @input="searchError = ''" />
            <p v-if="searchError" class="error-text search-error">{{ searchError }}</p>
          </div>
          <button @click="handleSearch" class="search-button">Qidirish</button>
        </div>

        <p class="results-count">27399 ta korxona va tashkilotlar topildi</p>

        <div class="company-list">
          <div v-for="company in companies" :key="company.id" class="company-card">
            <div class="card-content">
              <div class="card-left">
                <h2 class="company-name">{{ company.name }}</h2>
                <div class="vacancy-badge">
                  Vakansiyalar: {{ company.vacancies }}
                </div>
              </div>
              <div class="card-right">
                <div v-if="!company.logo" class="building-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 21H21M3 7V21M3 7L12 3L21 7M21 7V21M9 21V11M15 21V11M9 11H15M7 14H7.01M7 17H7.01M17 14H17.01M17 17H17.01"
                      stroke="#009BB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <img v-else src="" alt="logo" class="company-logo"
                  @error="(e) => e.target.src = 'https://via.placeholder.com/24?text=logo'" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Column: Sidebar -->
      <aside class="filters-sidebar">
        <div class="sidebar-header">
          <span class="sidebar-title">Filtrlar</span>
          <button @click="clearFilters" class="clear-button">Tozalash</button>
        </div>

        <div class="filter-group">
          <label class="filter-label">Hudud</label>
          <div class="select-wrapper">
            <select v-model="selectedRegion" class="filter-select">
              <option value="">Barcha hududlar</option>
            </select>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">Tuman / Shahar</label>
          <div class="select-wrapper">
            <select v-model="selectedDistrict" class="filter-select">
              <option value="">Barcha tumanlar</option>
            </select>
          </div>
        </div>

        <div class="filter-group">
          <label class="filter-label">STIR</label>
          <input v-model="stirValue" type="text" placeholder="STIRni kiriting" class="filter-input"
            @blur="validateStir" @focus="clearStirError" />
          <p v-if="stirError" class="error-text">{{ stirError }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.main-content {
  max-width: 1409px;
  margin: 0 auto;
  padding: 40px 0;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: flex-start;
}

.content-column {
  min-width: 0;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  position: relative;
}

.search-input-wrapper {
  position: relative;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: #FFFFFF;
  font-size: 16px;
  color: #111827;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.search-input::placeholder {
  color: #9CA3AF;
}

.search-input:focus {
  border-color: #0096B1;
}

.search-button {
  height: 52px;
  padding: 0 32px;
  background: #0096B1;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.search-button:hover {
  opacity: 0.9;
}

.results-count {
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 24px;
}

.company-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.company-card {
  background: #ffffff;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.company-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.card-left {
  flex: 1;
}

.card-right {
  flex-shrink: 0;
}

.company-name {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.vacancy-badge {
  display: inline-flex;
  align-items: center;
  background-color: #E6F7F9;
  color: #0096B1;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.company-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.building-icon {
  width: 48px;
  height: 48px;
  background: #F9FAFB;
  border: 1px solid #F2F2F2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sidebar Styling */
.filters-sidebar {
  position: sticky;
  top: 24px;
  align-self: flex-start;
  height: fit-content;
  background: #ffffff;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  padding: 24px;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.clear-button {
  background: none;
  border: none;
  color: #FF4B55;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.filter-group {
  margin-bottom: 24px;
  position: relative;
}

.filter-label {
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 12px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

.filter-select {
  width: 100%;
  height: 48px;
  padding: 0 32px 0 16px;
  border: 1px solid #F3F4F6;
  border-radius: 10px;
  background: #F9FAFB;
  font-size: 14px;
  color: #111827;
  appearance: none;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: #0096B1;
}

.filter-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #F3F4F6;
  border-radius: 10px;
  background: #F9FAFB;
  font-size: 14px;
  color: #111827;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.filter-input:focus {
  border-color: #0096B1;
}

.filter-input::placeholder {
  color: #9CA3AF;
}

.error-text {
  color: #FF4B55;
  font-size: 12px;
  margin-top: 4px;
}

.search-error {
  position: absolute;
  left: 0;
  bottom: -20px;
}

/* Responsive */
@media (max-width: 1024px) {
  .main-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .filters-sidebar {
    position: static;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }
  .search-button {
    width: 100%;
  }
  .main-content {
    padding: 20px 0;
  }
}
</style>
