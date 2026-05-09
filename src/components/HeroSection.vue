<script setup>
import { ref, onUnmounted, computed } from 'vue'
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

// Navigation for autocomplete
const activeProfIndex = ref(-1)
const activeLocIndex = ref(-1)

let profDebounce = null
let locDebounce = null

// --- Mock Data ---
const professionsList = [] // Empty as requested, API not ready
const allLocations = []    // Empty as requested, API not ready

// --- Autocomplete Logic ---
const handleProfInput = (e) => {
  const val = e.target.value
  profession.value = val
  activeProfIndex.value = -1
  // Mock logic for future API connection
  if (val.length >= 2) {
    // profResults.value = professionsList.filter(p => p.toLowerCase().includes(val.toLowerCase())).slice(0, 8)
    // showProfDropdown.value = profResults.value.length > 0
  } else {
    profResults.value = []
    showProfDropdown.value = false
  }
}

const handleLocInput = (e) => {
  const val = e.target.value
  location.value = val
  activeLocIndex.value = -1
  // Mock logic for future API connection
  if (val.length >= 2) {
    // locResults.value = allLocations.filter(l => l.toLowerCase().includes(val.toLowerCase())).slice(0, 8)
    // showLocDropdown.value = locResults.value.length > 0
  } else {
    locResults.value = []
    showLocDropdown.value = false
  }
}

const handleProfKeydown = (e) => {
  if (!showProfDropdown.value) return
  if (e.key === 'ArrowDown') {
    activeProfIndex.value = (activeProfIndex.value + 1) % profResults.value.length
  } else if (e.key === 'ArrowUp') {
    activeProfIndex.value = (activeProfIndex.value - 1 + profResults.value.length) % profResults.value.length
  } else if (e.key === 'Enter' && activeProfIndex.value >= 0) {
    handleProfSelect(profResults.value[activeProfIndex.value])
  } else if (e.key === 'Escape') {
    showProfDropdown.value = false
  }
}

const handleLocKeydown = (e) => {
  if (!showLocDropdown.value) return
  if (e.key === 'ArrowDown') {
    activeLocIndex.value = (activeLocIndex.value + 1) % locResults.value.length
  } else if (e.key === 'ArrowUp') {
    activeLocIndex.value = (activeLocIndex.value - 1 + locResults.value.length) % locResults.value.length
  } else if (e.key === 'Enter' && activeLocIndex.value >= 0) {
    handleLocSelect(locResults.value[activeLocIndex.value])
  } else if (e.key === 'Escape') {
    showLocDropdown.value = false
  }
}

const handleProfSelect = (val) => {
  profession.value = val
  showProfDropdown.value = false
  activeProfIndex.value = -1
}

const handleLocSelect = (val) => {
  location.value = val
  showLocDropdown.value = false
  activeLocIndex.value = -1
}

const handleSearch = () => {
  router.push('/search')
}

onUnmounted(() => {
  clearTimeout(profDebounce)
  clearTimeout(locDebounce)
})

const brands = ['elmakon', 'AgroBaza', 'alif shop', 'uzum', 'artel', 'korzinka', 'asaxiy']

// Stats navigation
const navigateTo = (path) => {
  router.push(path)
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-overlay"></div>

    <div class="container">
      <!-- Top Right Banner -->
      <div class="top-banner">
        <p>Ish qidiruvchi va ish beruvchilar uchun<br>platformadan foydalanish bepul</p>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          Ish beruvchi va ish qidiruvchilar uchun<br>ishonchli raqamli platforma!
        </h1>

        <!-- Search Panel -->
        <div class="search-panel">
          <div class="input-group">
            <div class="input-wrapper">
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
                @keydown="handleProfKeydown"
                @focus="showProfDropdown = profResults.length > 0"
              />
            </div>
            <div v-if="showProfDropdown" class="dropdown">
              <div 
                v-for="(res, index) in profResults" 
                :key="res" 
                :class="['dropdown-item', { active: index === activeProfIndex }]"
                @click="handleProfSelect(res)"
              >
                {{ res }}
              </div>
            </div>
          </div>

          <div class="input-group">
            <div class="input-wrapper">
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
                @keydown="handleLocKeydown"
                @focus="showLocDropdown = locResults.length > 0"
              />
              <span class="chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </span>
            </div>
            <div v-if="showLocDropdown" class="dropdown">
              <div 
                v-for="(res, index) in locResults" 
                :key="res" 
                :class="['dropdown-item', { active: index === activeLocIndex }]"
                @click="handleLocSelect(res)"
              >
                {{ res }}
              </div>
            </div>
          </div>

          <button class="btn-search" @click="handleSearch">Qidirish</button>
        </div>

        <!-- Warning text and divider in correct order -->
        <div class="warning-section">
          <p class="warning-text">Iltimos, saytga to'g'ri ma'lumot kiriting. Boshqalar vaqtini hurmat qiling.</p>
          <hr class="thin-divider" />
        </div>

        <!-- Bottom Layout -->
        <div class="hero-bottom">
          <!-- Stats on bottom left -->
          <div class="stats-group">
            <div class="stat-card" @click="navigateTo('/vacancies')">
              <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <div class="stat-content">
                <span class="stat-number">46634</span>
                <span class="stat-label">Vakansiyalar</span>
              </div>
            </div>
            <div class="stat-card" @click="navigateTo('/resumes')">
              <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <div class="stat-content">
                <span class="stat-number">163695</span>
                <span class="stat-label">Rezyumelar</span>
              </div>
            </div>
            <div class="stat-card" @click="navigateTo('/companies')">
              <svg class="stat-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7M4 21V7m16 14V7"/>
              </svg>
              <div class="stat-content">
                <span class="stat-number">28919</span>
                <span class="stat-label">Tashkilotlar</span>
              </div>
            </div>
          </div>

          <!-- Action buttons on bottom right -->
          <div class="action-buttons">
            <router-link to="/resume/create" class="action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              Rezyume joylash
            </router-link>
            <router-link to="/vacancy/create" class="action-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Vakansiya joylash
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Carousel Section -->
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
  border-radius: 16px 16px 0 0; /* Increased top rounding */
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
  font-weight: 800; /* Bold geometric sans-serif */
  line-height: 1.2;
  margin-bottom: 40px;
}

.search-panel {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  margin-bottom: 30px;
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
  font-weight: 500;
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

.dropdown-item:hover, .dropdown-item.active {
  background: #F3F4F6;
}

.btn-search {
  background: #00BCD4; /* Updated primary teal */
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

.warning-section {
  margin-top: 20px;
}

.warning-text {
  background: #C84E5A;
  color: white;
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
}

.warning-section {
  margin-top: 20px;
  text-align: right;
}

.thin-divider {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  margin-top: 15px;
  margin-bottom: 30px;
}

.hero-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 20px;
  margin-bottom: 60px;
}

.stats-group {
  display: flex;
  gap: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  cursor: pointer;
  padding: 12px 20px;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-icon {
  opacity: 0.8;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  opacity: 0.7;
}

/* Hover Effect for Stats - Frosted glass style */
.stat-card:hover {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.stat-card:hover .stat-content {
  flex-direction: column;
}

/* Screenshot 4 style: rounded box appearance with icon on top */
@media (min-width: 768px) {
  .stat-card:hover {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    min-width: 140px;
  }
  .stat-card:hover .stat-icon {
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    opacity: 1;
  }
}

.action-buttons {
  display: flex;
  gap: 16px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(229, 246, 248, 0.9);
  color: #006B7D;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  transition: transform 0.2s;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.brand-carousel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1a2332; /* Dark navy background */
  padding: 24px 0;
  z-index: 2;
  border-radius: 0 0 12px 12px; /* Corner rounding as requested */
}

.carousel-track {
  display: flex;
  width: max-content;
  animation: scroll 30s linear infinite;
}

/* Auto-scroll behavior: continue scrolling even when hovered */
.brand-carousel:hover .carousel-track {
  animation-play-state: running; /* Explicitly keep running */
}

.brand-item {
  padding: 0 50px;
  display: flex;
  align-items: center;
}

.brand-name {
  color: white;
  font-size: 22px;
  font-weight: 700;
  opacity: 0.9;
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
  .hero-bottom {
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .stats-group {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
