<template>
  <div class="vacancies-container">
    <h1 class="page-title">Vakansiyalar</h1>

    <div class="main-layout">
      <!-- Left Column -->
      <div class="left-column">

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
          <select class="sort-dropdown" v-model="sortOrder" @change="handleSortChange">
            <option value="">Yangi vakansiyalar</option>
            <!-- Boshqa optionlarni bu yerga qo'shishingiz mumkin -->
          </select>
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
const sortOrder = ref('')
const isFilterOpen = ref(false)

const toggleMobileFilter = () => {
  isFilterOpen.value = !isFilterOpen.value
}

const handleSortChange = () => {
  // Sorting logikasi bu yerda yoziladi
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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.vacancies-container {
  background: #F9FAFB;
  min-height: 100vh;
  padding: 40px 0;
  max-width: 1409px;
  margin: 0 auto;
  overflow-x: hidden;
}

.main-layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 32px;
  align-items: flex-start;
}

/* Left Column */
.left-column {
  min-width: 0;
  overflow: hidden;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.search-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.input-wrapper {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.input-wrapper input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: #FFFFFF;
  font-size: 16px;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  border-color: #0096B1;
}

.search-btn {
  background: #0096B1;
  color: white;
  border: none;
  padding: 0 32px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
  height: 52px;
  font-family: inherit;
}

.search-btn:hover {
  opacity: 0.9;
}

.mobile-filter-btn {
  display: none;
  width: 100%;
  height: 48px;
  background: #0096B1;
  color: white;
  border: none;
  border-radius: 12px;
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
  margin-bottom: 24px;
}

.results-text {
  font-size: 14px;
  color: #9CA3AF;
}

.sort-dropdown {
  color: #0096B1;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  border: none;
  background: transparent;
  padding: 4px 24px 4px 8px;
  outline: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%230096B1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right center;
  font-family: inherit;
}

/* Right Column (Filter Panel) */
.right-column {
  position: sticky;
  top: 24px;
  align-self: flex-start;
  height: fit-content;
}

.filter-panel {
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  padding: 24px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filter-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.reset-btn {
  background: none;
  border: none;
  color: #FF4B55;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

.filter-divider {
  border: none;
  border-top: 1px solid #F2F2F2;
  margin: 24px 0;
}

/* Filter Fields */
.filter-group {
  margin-bottom: 24px;
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
  width: 100%;
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

.select-wrapper select,
.custom-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #F3F4F6;
  border-radius: 10px;
  background: #F9FAFB;
  font-size: 14px;
  color: #111827;
  appearance: none;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.select-wrapper select:focus,
.custom-input:focus {
  border-color: #0096B1;
}

.custom-input {
  padding: 0 16px; 
}
.select-wrapper .custom-input + ::after {
  display: none;
}

/* Dynamic Language Group */
.dynamic-group {
  margin-bottom: 24px;
}

.dynamic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.dynamic-header .filter-label {
  margin-bottom: 0;
}

.add-btn {
  background: none;
  border: none;
  color: #0096B1;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-family: inherit;
}

.empty-text {
  font-size: 14px;
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
  height: 48px !important;
}

.remove-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  font-size: 20px;
  color: #9CA3AF;
  line-height: 1;
}

/* Range Inputs */
.range-inputs {
  display: flex;
  gap: 12px;
}

.range-inputs input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #F3F4F6;
  border-radius: 10px;
  background: #F9FAFB;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;
}

.range-inputs input:focus {
  border-color: #0096B1;
}

.range-inputs input.invalid-input {
  border-color: #FF4B55;
}

.error-text {
  color: #FF4B55;
  font-size: 12px;
  margin: 4px 0 0 0;
}

/* Radios and Checkboxes */
.radio-list, .checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-item, .checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
}

.radio-item input, .checkbox-item input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-radio {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E7EB;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: border-color 0.2s;
  box-sizing: border-box;
}

.radio-item input:checked + .custom-radio {
  border-color: #0096B1;
}

.radio-item input:checked + .custom-radio::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #0096B1;
  border-radius: 50%;
}

.custom-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  transition: border-color 0.2s, background-color 0.2s;
  box-sizing: border-box;
}

.custom-checkbox svg {
  width: 12px;
  height: 12px;
  opacity: 0;
}

.checkbox-item input:checked + .custom-checkbox {
  background: #0096B1;
  border-color: #0096B1;
}

.checkbox-item input:checked + .custom-checkbox svg {
  opacity: 1;
}

.radio-label, .checkbox-label {
  font-size: 15px;
  color: #111827;
}

/* Responsive Rules */
@media (max-width: 1439px) {
  .vacancies-container { padding: 32px 24px; }
  .main-layout { gap: 24px; }
}

@media (max-width: 1024px) {
  .page-title { font-size: 28px; }
  .main-layout {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .right-column { 
    width: 100%;
    position: static;
    margin-top: 0;
    order: 2;
  }
  .left-column {
    order: 1;
  }
  
  .mobile-hidden {
    display: none;
  }
  
  .mobile-filter-btn {
    display: block;
    width: 100%;
    height: 48px;
    margin-bottom: 24px;
  }
}

@media (max-width: 768px) {
  .vacancies-container { padding: 24px 20px; }
  .main-layout { gap: 20px; }
  .page-title { font-size: 24px; }
  
  .filter-label, .radio-label, .checkbox-label { font-size: 14px; }
  .results-text { font-size: 13px; }
  
  .search-row {
    flex-direction: column;
    gap: 10px;
  }
  .search-btn {
    width: 100%;
    height: 52px;
  }
  
  .input-wrapper input, 
  .select-wrapper select, 
  .custom-input, 
  .range-inputs input {
    min-height: 44px;
  }
  
  .radio-item, .checkbox-item {
    min-height: 44px;
  }
  .custom-radio, .custom-checkbox {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
  
  .remove-btn {
    min-width: 36px;
    min-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reset-btn, .add-btn {
    min-height: 44px;
  }
}

@media (max-width: 480px) {
  .vacancies-container { padding: 20px 16px; }
  .main-layout { gap: 16px; }
  .page-title { font-size: 20px; }
  
  .filter-label, .radio-label, .checkbox-label { 
    font-size: 13px; 
    line-height: 1.5; 
    word-break: break-word; 
  }
  
  .mobile-filter-btn {
    height: 44px;
    font-size: 14px;
  }
  
  .results-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .results-text { font-size: 12px; }
  .sort-dropdown { font-size: 13px; }
  
  .filter-panel {
    padding: 16px;
    border-radius: 12px;
  }
}

@media (max-width: 400px) {
  .range-inputs {
    flex-direction: column;
  }
}

@media (max-width: 380px) {
  .dynamic-header {
    flex-wrap: wrap;
    gap: 8px;
  }
}

@media (max-width: 375px) {
  .vacancies-container { padding: 16px 12px; }
  .main-layout { gap: 12px; }
  
  .input-wrapper input {
    height: 48px;
    font-size: 14px;
  }
  .select-wrapper select, 
  .custom-input, 
  .range-inputs input {
    height: 48px;
    font-size: 13px;
  }
}
</style>
