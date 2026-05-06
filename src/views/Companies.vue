<script setup>
import { ref } from 'vue'
import Header from "@/components/Header.vue";
import FooterSection from '@/components/Footer.vue'
const companies = [
  { id: 1, name: '"DAVR DIZAYN SANOAT" MAS\'ULIYATI CHEKLANGAN JAMIYAT', vacancies: 60, logo: null },
  { id: 2, name: '"SARDOBA TUMANI TIBBIYOT BIRLASHMASI" DAVLAT MUASSASASI', vacancies: 54, logo: null },
  { id: 3, name: 'SERGELI TUMANI TIBBIYOT BIRLASHMASI-MARKAZIY KO\'P TARMOQLI POLIKLINIKASI', vacancies: 43, logo: null },
]

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
  <div class="page-container">
    <Header />
    
    <main class="main-layout">
      <!-- Left Column -->
      <section class="content-column">
        <h1 class="page-title">Tashkilotlar</h1>
        
        <div class="search-row">
          <div class="search-input-wrapper">
            <span class="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#BDBDBD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Korxona yoki tashkilot nomi" 
              class="search-input"
              @input="searchError = ''"
            />
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
                    <path d="M3 21H21M3 7V21M3 7L12 3L21 7M21 7V21M9 21V11M15 21V11M9 11H15M7 14H7.01M7 17H7.01M17 14H17.01M17 17H17.01" stroke="#009BB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <img v-else src="" alt="logo" class="company-logo" @error="(e) => e.target.src = 'https://via.placeholder.com/24?text=logo'"/>
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
          <input 
            v-model="stirValue" 
            type="text" 
            placeholder="STIRni kiriting" 
            class="filter-input"
            @blur="validateStir"
            @focus="clearStirError"
          />
          <p v-if="stirError" class="error-text">{{ stirError }}</p>
        </div>
      </aside>
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.page-container {
  background-color: #ffffff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.main-layout {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  gap: 24px;
}

.content-column {
  flex-grow: 1;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
  margin-top: 0;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.search-input-wrapper {
  position: relative;
  flex-grow: 1;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 14px;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 48px;
  background: #F8F9FA;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  padding: 0 16px 0 44px;
  font-size: 14px;
  color: #111827;
  outline: none;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: #BDBDBD;
}

.search-button {
  height: 48px;
  padding: 0 32px;
  background: #009BB4;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.search-button:hover {
  opacity: 0.9;
}

.results-count {
  font-size: 14px;
  color: #828282;
  margin-bottom: 16px;
}

.company-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.company-card {
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.company-name {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.vacancy-badge {
  display: inline-block;
  background-color: #E6F7F9;
  color: #009BB4;
  padding: 6px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
}

.company-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.building-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Sidebar Styling */
.filters-sidebar {
  width: 300px;
  flex-shrink: 0;
  background: #ffffff;
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  padding: 24px;
  height: fit-content;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.sidebar-title {
  font-weight: 700;
  font-size: 16px;
  color: #111827;
}

.clear-button {
  background: none;
  border: none;
  color: #F43F5E;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-label {
  display: block;
  font-size: 14px;
  color: #4B5563;
  margin-bottom: 8px;
}

.select-wrapper {
  position: relative;
}

.filter-select, .filter-input {
  width: 100%;
  height: 44px;
  background: #F8F9FA;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  color: #111827;
  outline: none;
  box-sizing: border-box;
}

.filter-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%3CDBDBDB' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.filter-input::placeholder {
  color: #BDBDBD;
}

.error-text {
  color: #F43F5E;
  font-size: 12px;
  margin-top: 4px;
}

.search-error {
  position: absolute;
  left: 0;
  bottom: -20px;
}
</style>
