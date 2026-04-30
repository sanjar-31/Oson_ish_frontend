<script setup>
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// --- State ---
const profession = ref('')
const location = ref('')
const profResults = ref([])
const locResults = ref([])
const showProfDropdown = ref(false)
const showLocDropdown = ref(false)
const profError = ref('')
const locError = ref('')

let profDebounce = null
let locDebounce = null

// --- Mock AI Data ---
const professionsList = [
  'Dasturchi', 'Buxgalter', 'Menejer', 'Sotuvchi', 'Haydovchi', 'Oshpaz', 
  'Hamshira', 'Shifokor', 'O\'qituvchi', 'Muhandis', 'Dizayner', 'Marketolog',
  'Logist', 'Arxitektor', 'Huquqshunos', 'Iqtisodchi', 'Tarjimon', 'Jurnalist'
]

const allLocations = [
  'Toshkent', 'Samarqand', 'Farg\'ona', 'Andijon', 'Namangan', 'Buxoro', 
  'Xorazm', 'Qashqadaryo', 'Surxondaryo', 'Sirdaryo', 'Jizzax', 'Navoiy', 
  'Qoraqalpog\'iston Respublikasi', 'Urganch', 'Qarshi', 'Termiz', 'Guliston', 
  'Nukus', 'Chirchiq', 'Olmaliq', 'Angren', 'Bekobod', 'Marg\'ilon', 'Qo\'qon'
]

// --- Validation Utilities ---
const FORBIDDEN_KEYWORDS = [
  '<script', 'SELECT', 'DROP', 'INSERT', 'UPDATE', 'DELETE', 'OR', 'AND',
  'eval', 'alert', 'document', 'window', 'onload', 'onerror'
]

const containsForbidden = (val) => FORBIDDEN_KEYWORDS.some(kw => val.toUpperCase().includes(kw.toUpperCase()))

// --- Logic ---
const validateProfession = (val) => {
  if (containsForbidden(val)) {
    profession.value = ''
    profError.value = 'Noto\'g\'ri belgilar kiritildi'
    return false
  }
  if (/[^a-zA-Zа-яА-ЯёЁuz\'\-\s0-9]/.test(val)) {
    profession.value = val.replace(/[^a-zA-Zа-яА-ЯёЁuz\'\-\s0-9]/g, '')
    return false
  }
  if (/(.)\1\1\1/.test(val)) return false
  if (val.length > 100) profession.value = val.substring(0, 100)
  
  profError.value = ''
  return true
}

const validateLocation = (val) => {
  if (containsForbidden(val)) {
    location.value = ''
    locError.value = 'Noto\'g\'ri belgilar kiritildi'
    return false
  }
  if (/[^a-zA-Zа-яА-ЯёЁuz\'\s]/.test(val)) {
    location.value = val.replace(/[^a-zA-Zа-яА-ЯёЁuz\'\s]/g, '')
    return false
  }
  if (val.length > 60) location.value = val.substring(0, 60)
  
  locError.value = ''
  return true
}

const mockAI = (query, list, targetRef, dropdownRef, shortcuts = {}) => {
  if (query.length < 2) {
    targetRef.value = []
    dropdownRef.value = false
    return
  }
  const q = query.toLowerCase()
  let results = []
  Object.keys(shortcuts).forEach(key => {
    if (q.includes(key)) results.push(shortcuts[key])
  })
  const filtered = list.filter(item => item.toLowerCase().includes(q) && !results.includes(item))
  results = [...results, ...filtered].slice(0, 8)
  targetRef.value = results
  dropdownRef.value = results.length > 0
}

// --- Event Handlers ---
const handleProfInput = (e) => {
  const val = e.target.value
  if (validateProfession(val)) {
    clearTimeout(profDebounce)
    profDebounce = setTimeout(() => mockAI(val, professionsList, profResults, showProfDropdown, { 'prog': 'Dasturchi', 'bux': 'Buxgalter' }), 300)
  } else {
    profResults.value = []
    showProfDropdown.value = false
  }
}

const handleLocInput = (e) => {
  const val = e.target.value
  if (validateLocation(val)) {
    clearTimeout(locDebounce)
    locDebounce = setTimeout(() => mockAI(val, allLocations, locResults, showLocDropdown, { 'tosh': 'Toshkent', 'sam': 'Samarqand', 'farg': 'Farg\'ona' }), 300)
  } else {
    locResults.value = []
    showLocDropdown.value = false
  }
}

const handleProfFocus = () => {
  if (profResults.value.length) showProfDropdown.value = true
}

const handleLocFocus = () => {
  if (locResults.value.length) showLocDropdown.value = true
}

const handleProfSelect = (val) => {
  profession.value = val
  showProfDropdown.value = false
  profError.value = ''
}

const handleLocSelect = (val) => {
  location.value = val
  showLocDropdown.value = false
  locError.value = ''
}

const handleSearch = () => {
  let valid = true
  if (profession.value.trim().length < 2) {
    profError.value = 'Minimal 2 ta harf kiritilishi shart'
    valid = false
  }
  if (location.value.trim().length < 2) {
    locError.value = 'Minimal 2 ta harf kiritilishi shart'
    valid = false
  }
  if (location.value && !allLocations.includes(location.value)) {
    locError.value = 'Faqat ro\'yxatdagi hududlarni tanlang'
    valid = false
  }
  if (valid) router.push('/search')
}



onUnmounted(() => {
  clearTimeout(profDebounce)
  clearTimeout(locDebounce)
})

const brands = ['artel', 'korzinka', 'asaxiy', 'paynet', 'baraka market', 'Crafers', 'MEDIAPARK', 'elmakon', 'AgroBaza']
</script>

<template>
  <section class="hero-section">
    <div class="hero-overlay"></div>

    <div class="container">
      <div class="top-banner">
        <p>Ish qidiruvchi va ish beruvchilar uchun<br>platformadan foydalanish bepul</p>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          Ish beruvchi va ish qidiruvchilar uchun<br>ishonchli raqamli platforma!
        </h1>

        <div class="search-panel">
          <div class="input-group">
            <div class="input-wrapper" :class="{ 'has-error': profError }">
              <span class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              <input 
                type="text" 
                v-model="profession" 
                placeholder="Kasb, lavozim nomi" 
                @input="handleProfInput"
                @focus="handleProfFocus"
              />
            </div>
            <div v-if="showProfDropdown" class="dropdown">
              <div 
                v-for="res in profResults" 
                :key="res" 
                class="dropdown-item"
                @click="handleProfSelect(res)"
              >
                {{ res }}
              </div>
            </div>
            <p v-if="profError" class="error-msg">{{ profError }}</p>
          </div>

          <div class="input-group">
            <div class="input-wrapper" :class="{ 'has-error': locError }">
              <span class="icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <input 
                type="text" 
                v-model="location" 
                placeholder="O'zbekiston bo'ylab" 
                @input="handleLocInput"
                @focus="handleLocFocus"
              />
              <span class="chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </div>
            <div v-if="showLocDropdown" class="dropdown">
              <div 
                v-for="res in locResults" 
                :key="res" 
                class="dropdown-item"
                @click="handleLocSelect(res)"
              >
                {{ res }}
              </div>
            </div>
            <p v-if="locError" class="error-msg">{{ locError }}</p>
          </div>

          <button class="btn-search" @click="handleSearch">Qidirish</button>
        </div>

        <div class="spacer"></div>
        <hr class="divider" />

        <div class="warning-banner-container">
          <div class="warning-banner">
            Iltimos, saytga to'g'ri ma'lumot kiriting. Boshqalar vaqtini hurmat qiling.
          </div>
        </div>

        <div class="nav-buttons">
          <div class="nav-left">
            <router-link to="/resume/create" class="nav-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Rezyume joylash
            </router-link>
            <router-link to="/vacancy/create" class="nav-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Vakansiya joylash
            </router-link>
            <router-link to="/statistics" class="nav-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Statistika
            </router-link>
          </div>
          <div class="nav-right">
            <router-link to="/help" class="nav-btn light">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Yordam
            </router-link>
            <router-link to="/about" class="nav-btn light">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              Biz haqimizda
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="brand-carousel">
      <div class="carousel-track">
        <div v-for="brand in [...brands, ...brands]" :key="brand" class="brand-item">
          <span class="brand-name">{{ brand }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 800px;
  background: url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(17, 24, 39, 0.75);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.top-banner {
  position: absolute;
  right: 20px;
  top: -20px;
  background: #C84E5A;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(200, 78, 90, 0.3);
}

.hero-content {
  margin-top: 100px;
}

.hero-title {
  color: white;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 40px;
}

.search-panel {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.input-group {
  position: relative;
  flex: 1;
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 0 16px;
  height: 56px;
  transition: all 0.2s;
}

.input-wrapper.has-error {
  border: 1px solid #F43F5E;
}

.input-wrapper .icon {
  color: #9CA3AF;
  margin-right: 12px;
  display: flex;
}

.input-wrapper input {
  border: none;
  background: none;
  outline: none;
  flex: 1;
  font-size: 16px;
  color: #111827;
}

.input-wrapper input::placeholder {
  color: #9CA3AF;
}

.chevron {
  color: #9CA3AF;
  margin-left: 12px;
  display: flex;
}

.dropdown {
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 10;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
}

.dropdown-item:hover {
  background: #F3F4F6;
}

.error-msg {
  color: #F43F5E;
  font-size: 12px;
  margin-top: 6px;
  position: absolute;
}

.btn-search {
  background: #00A3BF;
  color: white;
  border: none;
  height: 56px;
  padding: 0 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.1s, opacity 0.2s;
}

.btn-search:hover {
  opacity: 0.9;
}

.btn-search:active {
  transform: scale(0.98);
}

.spacer {
  height: 150px;
}

.divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
}

.warning-banner-container {
  display: flex;
  justify-content: flex-end;
  margin-top: -20px;
}

.warning-banner {
  background: #C84E5A;
  color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  margin-top: 40px;
}

.nav-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;
}

.nav-left, .nav-right {
  display: flex;
  gap: 12px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #E5F6F8;
  color: #006B7D;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
}

.nav-btn.light {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  backdrop-filter: blur(5px);
}

.nav-btn:hover {
  opacity: 0.9;
}

.brand-carousel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(17, 24, 39, 0.4);
  backdrop-filter: blur(10px);
  padding: 20px 0;
  z-index: 2;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.carousel-track {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
}

.brand-carousel:hover .carousel-track {
  animation-play-state: paused;
}

.brand-item {
  padding: 0 40px;
  display: flex;
  align-items: center;
}

.brand-name {
  color: white;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (max-width: 1024px) {
  .search-panel {
    flex-direction: column;
  }
  .input-group, .btn-search {
    width: 100%;
  }
  .nav-buttons {
    flex-direction: column;
    gap: 20px;
  }
  .hero-title {
    font-size: 32px;
  }
}
</style>
