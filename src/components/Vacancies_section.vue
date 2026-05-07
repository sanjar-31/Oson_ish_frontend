<template>
  <div class="vacancies-container">
    <div class="main-layout">
      <!-- Left Column -->
      <div class="left-column">
        <h1 class="page-title">Vakansiyalar</h1>

        <div class="search-row">
          <div class="input-wrapper">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Kasb, lavozim nomi" />
          </div>
          <button class="search-btn">Izlash</button>
        </div>

        <button class="mobile-filter-btn" @click="toggleMobileFilter">Filtrlar</button>

        <div class="results-row">
          <span class="results-text">15151 ta e'lon 46315 vakansiya topildi</span>
          <div class="sort-dropdown">
            Yangi vakansiyalar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="#00B5B5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>

        <Cards />
      </div>

      <!-- Right Column -->
      <div class="right-column" :class="{ 'mobile-hidden': !isFilterOpen }">
        <div class="filter-panel">
          <div class="filter-header">
            <span class="filter-title">Filtrlar</span>
            <button class="reset-btn" @click="resetFilters">Tozalash</button>
          </div>
          <hr class="filter-divider" />

          <!-- Filter 1 -->
          <div class="filter-group">
            <label class="filter-label">Hudud</label>
            <div class="select-wrapper">
              <select v-model="hudud">
                <option value="">Barcha hududlar</option>
              </select>
            </div>
          </div>

          <!-- Filter 2 -->
          <div class="filter-group">
            <label class="filter-label">Tuman / Shahar</label>
            <div class="select-wrapper">
              <select v-model="tuman">
                <option value="">Barcha tumanlar</option>
              </select>
            </div>
          </div>

          <!-- Filter 3 -->
          <div class="filter-group">
            <label class="filter-label">Lavozim yoki kasb</label>
            <div class="select-wrapper">
              <input type="text" class="custom-input" v-model="lavozim" placeholder="Tanlang yoki yozing..." />
            </div>
          </div>

          <!-- Filter 4 -->
          <div class="filter-group">
            <label class="filter-label">Sohalar</label>
            <div class="select-wrapper">
              <select v-model="soha">
                <option value="">Barchasi</option>
              </select>
            </div>
          </div>

          <!-- Filter 5 (Dynamic) -->
          <div class="filter-group dynamic-group">
            <div class="dynamic-header">
              <span class="filter-label">Til bilish</span>
              <button class="add-btn" @click="addLanguage">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Til qo'shish
              </button>
            </div>
            
            <p v-if="languages.length === 0" class="empty-text">Til tanlanmagan</p>
            
            <div v-for="lang in languages" :key="lang.id" class="dynamic-row">
              <div class="select-wrapper flex-1">
                <select v-model="lang.value" class="sm-select">
                  <option value="">Tanlang</option>
                </select>
              </div>
              <button class="remove-btn" @click="removeLanguage(lang.id)">&times;</button>
            </div>
          </div>

          <!-- Filter 6 -->
          <div class="filter-group">
            <label class="filter-label">To'lov shakli</label>
            <div class="select-wrapper">
              <select v-model="tolovShakli">
                <option value="">Barcha to'lov shakllari</option>
              </select>
            </div>
          </div>

          <!-- Filter 7 -->
          <div class="filter-group">
            <label class="filter-label">Maosh</label>
            <div class="range-inputs">
              <input type="number" min="0" v-model="maoshDan" placeholder="dan" />
              <input type="number" min="0" v-model="maoshGacha" placeholder="gacha" :class="{ 'invalid-input': maoshInvalid }" />
            </div>
            <p v-if="maoshInvalid" class="error-text">Yuqori chegara pastki chegaradan kichik bo'lishi mumkin emas</p>
          </div>

          <!-- Filter 8 -->
          <div class="filter-group">
            <label class="filter-label">Ish tajribasi</label>
            <div class="radio-list">
              <label v-for="opt in tajribaOptions" :key="opt" class="radio-item">
                <input type="radio" name="tajriba" :value="opt" v-model="tajriba" />
                <span class="custom-radio"></span>
                <span class="radio-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 9 -->
          <div class="filter-group">
            <label class="filter-label">Ma'lumot darajasi</label>
            <div class="checkbox-list">
              <label v-for="opt in malumotDarajasiOptions" :key="opt" class="checkbox-item">
                <input type="checkbox" :value="opt" v-model="malumotDarajasi" />
                <span class="custom-checkbox">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 10 -->
          <div class="filter-group">
            <label class="filter-label">Bandlik turi</label>
            <div class="checkbox-list">
              <label v-for="opt in bandlikTuriOptions" :key="opt" class="checkbox-item">
                <input type="checkbox" :value="opt" v-model="bandlikTuri" />
                <span class="custom-checkbox">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 11 -->
          <div class="filter-group">
            <label class="filter-label">Ish usuli (rejimi)</label>
            <div class="checkbox-list">
              <label v-for="opt in ishUsuliOptions" :key="opt" class="checkbox-item">
                <input type="checkbox" :value="opt" v-model="ishUsuli" />
                <span class="custom-checkbox">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 12 -->
          <div class="filter-group">
            <label class="filter-label">Ish kunlari</label>
            <div class="select-wrapper">
              <select v-model="ishKunlari">
                <option value="">Tanlang</option>
              </select>
            </div>
          </div>

          <!-- Filter 13 -->
          <div class="filter-group">
            <label class="filter-label">Ish kimlar uchun</label>
            <div class="checkbox-list">
              <label v-for="opt in ishKimlarUchunOptions" :key="opt" class="checkbox-item">
                <input type="checkbox" :value="opt" v-model="ishKimlarUchun" />
                <span class="custom-checkbox">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 14 -->
          <div class="filter-group">
            <label class="filter-label">Jins</label>
            <div class="radio-list">
              <label v-for="opt in jinsOptions" :key="opt" class="radio-item">
                <input type="radio" name="jins" :value="opt" v-model="jins" />
                <span class="custom-radio"></span>
                <span class="radio-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 15 -->
          <div class="filter-group">
            <label class="filter-label">Ijtimoiy toifalar</label>
            <div class="checkbox-list">
              <label v-for="opt in ijtimoiyToifalarOptions" :key="opt" class="checkbox-item">
                <input type="checkbox" :value="opt" v-model="ijtimoiyToifalar" />
                <span class="custom-checkbox">
                  <svg viewBox="0 0 14 14" fill="none">
                    <path d="M3 7L6 10L11 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="checkbox-label">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Filter 16 -->
          <div class="filter-group">
            <label class="filter-label">Yosh</label>
            <div class="range-inputs">
              <input type="number" min="14" max="99" v-model="yoshDan" placeholder="dan" @input="sanitizeYosh" />
              <input type="number" min="14" max="99" v-model="yoshGacha" placeholder="gacha" :class="{ 'invalid-input': yoshInvalid }" @input="sanitizeYosh" />
            </div>
            <p v-if="yoshInvalid" class="error-text">Yuqori yosh pastki yoshdan kichik bo'lishi mumkin emas</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Cards from './Cards.vue'

// Search and mobile
const searchQuery = ref('')
const isFilterOpen = ref(false)

const toggleMobileFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}

// Selects and Texts
const hudud = ref('')
const tuman = ref('')
const lavozim = ref('')
const soha = ref('')
const tolovShakli = ref('')
const ishKunlari = ref('')

// Languages (Dynamic)
const languages = ref([])
const addLanguage = () => {
  languages.value.push({ id: Date.now(), value: '' })
}
const removeLanguage = (id) => {
  languages.value = languages.value.filter(l => l.id !== id)
}

// Number Ranges
const maoshDan = ref('')
const maoshGacha = ref('')
const maoshInvalid = computed(() => {
  if (maoshDan.value !== '' && maoshGacha.value !== '') {
    return parseInt(maoshGacha.value) < parseInt(maoshDan.value)
  }
  return false
})

const yoshDan = ref('')
const yoshGacha = ref('')

const sanitizeYosh = (e) => {
  let val = parseInt(e.target.value)
  if (val < 14) e.target.value = ''
  if (val > 99) e.target.value = 99
}

const yoshInvalid = computed(() => {
  if (yoshDan.value !== '' && yoshGacha.value !== '') {
    return parseInt(yoshGacha.value) < parseInt(yoshDan.value)
  }
  return false
})

// Radios
const tajribaOptions = ["Talab etilmaydi", "1 yilgacha", "1-3 yil", "3-5 yil", "5 yildan ortiq"]
const tajriba = ref(null)

const jinsOptions = ["Ahamiyatsiz", "Erkak", "Ayol"]
const jins = ref('Ahamiyatsiz')

// Checkboxes
const malumotDarajasiOptions = ["Ahamiyatga ega emas", "O'rta-maxsus", "Oliy(bakalavr)", "Oliy(magistratura)", "Oliy(PhD/DSc)"]
const malumotDarajasi = ref([])

const bandlikTuriOptions = ["Doimiy (shtat asosida)", "Mavsumiy", "Kunlik"]
const bandlikTuri = ref([])

const ishUsuliOptions = ["Odatiy (ish joyida)", "Smenali ish", "Masofaviy", "Gibrid (ish joyi + masofaviy)", "Kasanachilik (uyda)", "Ish joyi o'zgaruvchan (mobil ishchi)"]
const ishUsuli = ref([])

const ishKimlarUchunOptions = ["Nogironligi bor shaxslar uchun", "Bitiruvchilar uchun", "Talabalar uchun"]
const ishKimlarUchun = ref([])

const ijtimoiyToifalarOptions = [
  "Nogironligi bo'lgan shaxslar uchun", 
  "Oilaviy (maishiy) zo'ravonlikdan jabrlangan shaxslar uchun", 
  "Ijtimoiy reestrdagi oilalarning a'zolari uchun", 
  "Muqobil joylashtirish shakllarida tarbiyalangan yetim yoki ota-ona qaramog'idan mahrum bo'lgan shaxslar uchun", 
  "Jazoni ijro etish muassasalaridan ozod qilingan shaxslar uchun", 
  "Odam savdosidan jabrlangan shaxslar uchun"
]
const ijtimoiyToifalar = ref([])

// Reset
const resetFilters = () => {
  searchQuery.value = ''
  hudud.value = ''
  tuman.value = ''
  lavozim.value = ''
  soha.value = ''
  tolovShakli.value = ''
  ishKunlari.value = ''
  languages.value = []
  maoshDan.value = ''
  maoshGacha.value = ''
  tajriba.value = null
  malumotDarajasi.value = []
  bandlikTuri.value = []
  ishUsuli.value = []
  ishKimlarUchun.value = []
  jins.value = 'Ahamiyatsiz'
  ijtimoiyToifalar.value = []
  yoshDan.value = ''
  yoshGacha.value = ''
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.vacancies-container {
  font-family: 'Inter', sans-serif;
  max-width: 1440px;
  margin: 0 auto;
}

.main-layout {
  display: flex;
  gap: 24px;
}

/* Left Column */
.left-column {
  width: 70%;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #1A1A2E;
  margin: 0 0 20px 0;
}

.search-row {
  display: flex;
  gap: 12px;
}

.input-wrapper {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
}

.input-wrapper input {
  width: 100%;
  height: 48px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  padding-left: 40px;
  padding-right: 12px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #00B5B5;
}

.search-btn {
  width: 120px;
  height: 48px;
  background: #00B5B5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;
}

.search-btn:hover {
  background: #009999;
}

.mobile-filter-btn {
  display: none;
  width: 100%;
  height: 48px;
  background: #00B5B5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  margin-top: 12px;
  font-family: inherit;
}

.results-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 24px;
}

.results-text {
  font-size: 13px;
  color: #6B7280;
}

.sort-dropdown {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #00B5B5;
  font-size: 13px;
  cursor: pointer;
}

/* Right Column (Filter Panel) */
.right-column {
  width: 30%;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.right-column::-webkit-scrollbar {
  width: 6px;
}
.right-column::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 4px;
}

.filter-panel {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-title {
  font-size: 16px;
  font-weight: 700;
  color: #1A1A2E;
}

.reset-btn {
  font-size: 14px;
  color: #00B5B5;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.filter-divider {
  height: 1px;
  background-color: #C9A96E;
  border: none;
  margin: 12px 0;
}

/* Filter Fields */
.filter-group {
  margin-bottom: 16px;
}

.filter-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 6px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 6px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  pointer-events: none;
}

.select-wrapper select,
.custom-input {
  width: 100%;
  height: 42px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  color: #6B7280;
  padding: 0 32px 0 12px;
  appearance: none;
  outline: none;
  font-family: inherit;
  background: #FFFFFF;
  box-sizing: border-box;
}

.select-wrapper select:focus,
.custom-input:focus {
  border-color: #00B5B5;
}

.custom-input {
  padding: 0 12px; 
}
.select-wrapper .custom-input + ::after {
  display: none;
}

/* Dynamic Language Group */
.dynamic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.dynamic-header .filter-label {
  margin-bottom: 0;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #00B5B5;
  background: none;
  border: none;
  font-size: 13px;
  cursor: pointer;
  font-family: inherit;
}

.empty-text {
  font-size: 13px;
  color: #9CA3AF;
  margin: 0;
}

.dynamic-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.flex-1 {
  flex: 1;
}

.sm-select {
  height: 38px !important;
}

.remove-btn {
  color: #EF4444;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}

/* Range Inputs */
.range-inputs {
  display: flex;
  gap: 8px;
}

.range-inputs input {
  flex: 1;
  width: 0;
  height: 42px;
  border: 1px solid #D1D5DB;
  border-radius: 8px;
  font-size: 14px;
  padding: 0 10px;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.range-inputs input:focus {
  border-color: #00B5B5;
}

.range-inputs input.invalid-input {
  border-color: #EF4444;
}

.error-text {
  color: #EF4444;
  font-size: 12px;
  margin: 4px 0 0 0;
}

/* Radios and Checkboxes */
.radio-list, .checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-item, .checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-item input, .checkbox-item input {
  display: none;
}

.custom-radio {
  width: 18px;
  height: 18px;
  border: 2px solid #D1D5DB;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.2s;
  box-sizing: border-box;
}

.radio-item input:checked + .custom-radio {
  border-color: #00B5B5;
}

.radio-item input:checked + .custom-radio::after {
  content: "";
  width: 8px;
  height: 8px;
  background: #00B5B5;
  border-radius: 50%;
}

.custom-checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid #D1D5DB;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: all 0.2s;
  box-sizing: border-box;
}

.custom-checkbox svg {
  width: 10px;
  height: 10px;
  opacity: 0;
}

.checkbox-item input:checked + .custom-checkbox {
  background: #00B5B5;
  border-color: #00B5B5;
}

.checkbox-item input:checked + .custom-checkbox svg {
  opacity: 1;
}

.radio-label, .checkbox-label {
  font-size: 14px;
  color: #374151;
}

/* Responsive */
@media (max-width: 1279px) {
  .left-column { width: 65%; }
  .right-column { width: 35%; }
}

@media (max-width: 1024px) {
  .main-layout {
    flex-direction: column;
  }
  .left-column { width: 100%; }
  .right-column { 
    width: 100%;
    position: static;
    max-height: none;
  }
  .mobile-hidden {
    display: none;
  }
  .mobile-filter-btn {
    display: block;
  }
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }
  .search-btn {
    width: 100%;
  }
  .input-wrapper input, .search-btn, .mobile-filter-btn {
    min-height: 44px;
  }
  .select-wrapper select, .custom-input, .range-inputs input {
    min-height: 44px;
  }
  .sm-select {
    min-height: 44px !important;
  }
}
</style>
