<script setup>
import { ref, reactive } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Cards from '@/components/Cards.vue';

const searchQuery = ref('');
const hudud = ref('');
const tuman = ref('');
const maoshDan = ref(null);
const maoshGacha = ref(null);
const tajriba = ref('Hammasi');
const jinsi = ref('Ahamiyatsiz');
const yoshDan = ref(null);
const yoshGacha = ref(null);
const tillar = ref([]);

const malumot = reactive({
  orta: false,
  bakalavr: false,
  magistr: false,
  phd: false
});

const bandlik = reactive({
  doimiy: false,
  mavsumiy: false,
  kunlik: false
});

const ishUsuli = reactive({
  odatiy: false,
  smenali: false,
  masofaviy: false,
  gibrid: false,
  kasanachilik: false,
  mobil: false
});

const qoshimcha = reactive({
  nogironligi: false,
  talabalar: false
});

const regions = [
  'Toshkent shahri', 'Toshkent viloyati', 'Andijon viloyati', 'Buxoro viloyati',
  'Farg\'ona viloyati', 'Jizzax viloyati', 'Xorazm viloyati', 'Namangan viloyati',
  'Navoiy viloyati', 'Qashqadaryo viloyati', 'Samarqand viloyati', 'Sirdaryo viloyati',
  'Surxondaryo viloyati', 'Qoraqalpog\'iston Respublikasi'
];

const tajribaOptions = ['Hammasi', 'Talab etilmaydi', '1 yilgacha', '1-3 yil', '3-5 yil', '5 yildan ortiq'];
const jinsiOptions = ['Ahamiyatsiz', 'Erkak', 'Ayol'];
const languages = ['O\'zbek', 'Rus', 'Ingliz', 'Nemis', 'Fransuz', 'Xitoy', 'Arab', 'Turk'];

const resumeCards = [
  { id: 167915, name: 'Yordamchi ishchi', age: 17, maosh: '1 850 000 so\'m', tajriba: 'Ish tajribasi yo\'q', hudud: 'Surxondaryo viloyati, Qumqo\'rg\'on tumani', sana: '06.05.2026' },
  { id: 203847, name: 'Dasturchi (Frontend)', age: 24, maosh: '5 000 000 so\'m', tajriba: '1-3 yil', hudud: 'Toshkent shahri, Yunusobod tumani', sana: '05.05.2026' },
  { id: 198234, name: 'Buxgalter', age: 31, maosh: '3 200 000 so\'m', tajriba: '3-5 yil', hudud: 'Samarqand viloyati, Samarqand shahri', sana: '04.05.2026' },
  { id: 175610, name: 'Haydovchi', age: 28, maosh: '2 500 000 so\'m', tajriba: '5 yildan ortiq', hudud: 'Farg\'ona viloyati, Marg\'ilon shahri', sana: '03.05.2026' },
  { id: 211098, name: 'Savdo menejeri', age: 22, maosh: '2 000 000 so\'m', tajriba: '1 yilgacha', hudud: 'Andijon viloyati, Andijon shahri', sana: '02.05.2026' },
  { id: 189456, name: 'Ombor boshqaruvchisi', age: 35, maosh: '4 100 000 so\'m', tajriba: '5 yildan ortiq', hudud: 'Namangan viloyati, Namangan shahri', sana: '01.05.2026' }
];

const tozalash = () => {
  searchQuery.value = '';
  hudud.value = '';
  tuman.value = '';
  maoshDan.value = null;
  maoshGacha.value = null;
  tajriba.value = 'Hammasi';
  jinsi.value = 'Ahamiyatsiz';
  yoshDan.value = null;
  yoshGacha.value = null;
  tillar.value = [];
  
  Object.keys(malumot).forEach(k => malumot[k] = false);
  Object.keys(bandlik).forEach(k => bandlik[k] = false);
  Object.keys(ishUsuli).forEach(k => ishUsuli[k] = false);
  Object.keys(qoshimcha).forEach(k => qoshimcha[k] = false);
};

const tilQoshish = () => {
  tillar.value.push({ id: Date.now(), value: '' });
};

const tilOchirish = (id) => {
  tillar.value = tillar.value.filter(t => t.id !== id);
};
</script>

<template>
  <div class="resumes-view">
    <Header />
    
    <main class="main-content">
      <h1 class="page-title">Rezyumelar</h1>
      
      <div class="layout-grid">
        <!-- Left Column -->
        <div class="main-column">
          <div class="search-box">
            <div class="search-input-wrapper">
              <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input type="text" v-model="searchQuery" placeholder="Kasb, lavozim nomi" />
            </div>
            <button class="search-btn">Izlash</button>
          </div>

          <p class="result-count">159091 ta rezyume topildi</p>

          <div class="cards-list">
            <Cards v-for="card in resumeCards" :key="card.id" :card="card" />
          </div>
        </div>

        <!-- Right Column (Filters) -->
        <aside class="filters-sidebar">
          <div class="filters-panel">
            <div class="filters-header">
              <span class="filters-title">Filtrlar</span>
              <button class="clear-btn" @click="tozalash">Tozalash</button>
            </div>

            <div class="filter-group">
              <label>Hudud</label>
              <div class="select-wrapper">
                <select v-model="hudud">
                  <option value="">Barcha hududlar</option>
                  <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
                </select>
                <svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <div class="filter-group">
              <label>Tuman / Shahar</label>
              <div class="select-wrapper">
                <select v-model="tuman">
                  <option value="">Barcha tumanlar</option>
                </select>
                <svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>

            <div class="filter-group">
              <label>Maosh</label>
              <div class="input-row">
                <input type="number" v-model="maoshDan" placeholder="dan" />
                <input type="number" v-model="maoshGacha" placeholder="gacha" />
              </div>
            </div>

            <hr class="separator" />

            <div class="filter-group">
              <label>Ish tajribasi</label>
              <div class="radio-list">
                <label v-for="opt in tajribaOptions" :key="opt" class="radio-item">
                  <input type="radio" :value="opt" v-model="tajriba" />
                  <span class="radio-mark"></span>
                  <span class="radio-label">{{ opt }}</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Jinsi</label>
              <div class="radio-list">
                <label v-for="opt in jinsiOptions" :key="opt" class="radio-item">
                  <input type="radio" :value="opt" v-model="jinsi" />
                  <span class="radio-mark"></span>
                  <span class="radio-label">{{ opt }}</span>
                </label>
              </div>
            </div>

            <hr class="separator" />

            <div class="filter-group">
              <label>Yosh</label>
              <div class="input-row">
                <div class="number-input-wrapper">
                  <input type="number" v-model="yoshDan" placeholder="dan" />
                </div>
                <div class="number-input-wrapper">
                  <input type="number" v-model="yoshGacha" placeholder="gacha" />
                </div>
              </div>
            </div>

            <div class="filter-group">
              <div class="flex-header">
                <label>Til bilish</label>
                <button class="add-lang-btn" @click="tilQoshish">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Til qo'shish
                </button>
              </div>
              <div v-if="tillar.length === 0" class="empty-text">Til tanlanmagan</div>
              <div v-else class="lang-list">
                <div v-for="til in tillar" :key="til.id" class="lang-row">
                  <div class="select-wrapper flex-grow">
                    <select v-model="til.value">
                      <option value="">Tilni tanlang</option>
                      <option v-for="l in languages" :key="l" :value="l">{{ l }}</option>
                    </select>
                    <svg class="select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <button class="remove-lang-btn" @click="tilOchirish(til.id)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="filter-group">
              <label>Ma'lumot darajasi</label>
              <div class="checkbox-list">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="malumot.orta" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">O'rta-maxsus</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="malumot.bakalavr" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Oliy (bakalavr)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="malumot.magistr" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Oliy (magistratura)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="malumot.phd" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Oliy (PhD/DSc)</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Bandlik turi</label>
              <div class="checkbox-list">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="bandlik.doimiy" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Doimiy (shtat asosida)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="bandlik.mavsumiy" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Mavsumiy</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="bandlik.kunlik" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Kunlik</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Ish usuli (rejimi)</label>
              <div class="checkbox-list">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.odatiy" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Odatiy (ish joyida)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.smenali" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Smenali ish</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.masofaviy" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Masofaviy</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.gibrid" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Gibrid (ish joyi + masofaviy)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.kasanachilik" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Kasanachilik (uyda)</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="ishUsuli.mobil" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Ish joyi o'zgaruvchan (mobil ishchi)</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Qo'shimcha ma'lumotlar</label>
              <div class="checkbox-list">
                <label class="checkbox-item">
                  <input type="checkbox" v-model="qoshimcha.nogironligi" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Nogironligi bor shaxslar</span>
                </label>
                <label class="checkbox-item">
                  <input type="checkbox" v-model="qoshimcha.talabalar" />
                  <span class="checkbox-mark"></span>
                  <span class="checkbox-label">Talabalar</span>
                </label>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
    
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.resumes-view {
  background: #F9FAFB;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

.main-content {
  width: 100%;
  padding: 40px 32px;
  max-width: 1440px; /* Optional: limit max width for very large screens */
  margin: 0 auto;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 24px 0;
}

.layout-grid {
  display: grid;
  grid-template-columns: 7.8fr 2.2fr;
  gap: 32px;
  align-items: flex-start;
}

.main-column {
  min-width: 0;
}

.search-box {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.search-input-wrapper {
  flex-grow: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input-wrapper input {
  width: 100%;
  height: 52px;
  padding: 0 16px 0 48px;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  background: #FFFFFF;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
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
}

.result-count {
  font-size: 14px;
  color: #9CA3AF;
  margin-bottom: 24px;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Filters Sidebar */
.filters-sidebar {
  height: fit-content;
}

.filters-panel {
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  border-radius: 16px;
  padding: 24px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.filters-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.clear-btn {
  background: none;
  border: none;
  color: #FF4B55;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
}

.filter-group {
  margin-bottom: 24px;
}

.filter-group > label {
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #6B7280;
  margin-bottom: 12px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
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
}

.select-arrow {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-row {
  display: flex;
  gap: 12px;
}

.input-row input, .number-input-wrapper input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #F3F4F6;
  border-radius: 10px;
  background: #F9FAFB;
  font-size: 14px;
  outline: none;
}

.separator {
  border: none;
  border-top: 1px solid #F2F2F2;
  margin: 24px 0;
}

/* Radio Buttons */
.radio-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
}

.radio-item input {
  position: absolute;
  opacity: 0;
}

.radio-mark {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E7EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.radio-item input:checked ~ .radio-mark {
  border-color: #0096B1;
}

.radio-mark::after {
  content: "";
  width: 10px;
  height: 10px;
  background: #0096B1;
  border-radius: 50%;
  display: none;
}

.radio-item input:checked ~ .radio-mark::after {
  display: block;
}

.radio-label {
  font-size: 15px;
  color: #111827;
}

/* Checkboxes */
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
}

.checkbox-item input {
  position: absolute;
  opacity: 0;
}

.checkbox-mark {
  width: 20px;
  height: 20px;
  border: 2px solid #E5E7EB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox-item input:checked ~ .checkbox-mark {
  border-color: #0096B1;
  background-color: #0096B1;
}

.checkbox-mark::after {
  content: "";
  width: 10px;
  height: 6px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  display: none;
  margin-top: -2px;
}

.checkbox-item input:checked ~ .checkbox-mark::after {
  display: block;
}

.checkbox-label {
  font-size: 15px;
  color: #111827;
}

/* Til Bilish */
.flex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.add-lang-btn {
  background: none;
  border: none;
  color: #0096B1;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.empty-text {
  font-size: 14px;
  color: #9CA3AF;
}

.lang-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lang-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.flex-grow {
  flex-grow: 1;
}

.remove-lang-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .layout-grid {
    grid-template-columns: 1fr;
  }
  
  .filters-sidebar {
    order: 2;
  }
  
  .main-content {
    padding: 20px 16px;
  }
}
</style>
