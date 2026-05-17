<!-- src/components/Company_section.vue -->
<!-- Add to index.html <head>: <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"> -->
<template>
  <div class="layout-container">
    
    <!-- LEFT COLUMN -->
    <div class="left-column">
      
      <!-- Section 1: Search -->
      <div class="search-row">
        <div class="input-container">
          <div class="input-wrapper">
            <i class="ti ti-search input-icon"></i>
            <input 
              type="text" 
              class="search-input" 
              placeholder="Kasb, lavozim nomi" 
              v-model="searchQuery"
            />
          </div>
          <span v-if="searchError" class="error-msg">{{ searchError }}</span>
        </div>

        <div class="select-wrapper">
          <select v-model="searchType" class="custom-select">
            <option value="rezyume">Rezyume</option>
            <option value="vakansiya">Vakansiya</option>
          </select>
          <i class="ti ti-chevron-down select-icon"></i>
        </div>

        <button class="search-btn" @click="handleSearch">
          Izlash
        </button>
      </div>

      <!-- Section 2: Banner -->
      <div class="banner-card">
        <div class="banner-content">
          <h2 class="banner-title">Xodimlarni tez va qulay topish</h2>
          <p class="banner-subtitle">Sizning kelajakdagi xodimlaringiz shu yerda</p>
          <!-- TODO: add route when ready -->
          <button class="banner-btn">Vakansiyalarni boshqarish</button>
        </div>
        <div class="banner-img-wrapper">
          <!-- TODO: replace with actual image -->
          <img v-if="bannerImage" :src="bannerImage" alt="banner" />
        </div>
      </div>

      <!-- Section 3: Stats -->
      <div class="stats-section">
        <h3 class="section-title">Vakansiyalar statistikasi</h3>
        <div class="stats-grid">
          <!-- TODO: add route when ready -->
          <div class="stat-card">
            <i class="ti ti-briefcase stat-icon"></i>
            <span class="stat-label">Faol vakansiyalar</span>
          </div>
          <!-- TODO: add route when ready -->
          <div class="stat-card">
            <i class="ti ti-file-description stat-icon"></i>
            <span class="stat-label">Takliflar (nomzodlar)</span>
          </div>
        </div>
      </div>

      <!-- Section 4: Bottom Cards -->
      <div class="bottom-cards-row">
        
        <!-- Card A: Asosiy bo'lim -->
        <div class="info-card">
          <h3 class="card-title">Asosiy bo'lim</h3>
          <div class="nav-rows">
            <!-- TODO: add route when ready -->
            <div class="nav-row">
              <i class="ti ti-heart nav-row-icon text-teal"></i>
              <span class="nav-row-text text-teal">Saqlanganlar</span>
            </div>
            <!-- TODO: add route when ready -->
            <div class="nav-row">
              <i class="ti ti-message nav-row-icon text-teal"></i>
              <span class="nav-row-text text-teal">Xabarlar</span>
            </div>
            <!-- TODO: add route when ready -->
            <div class="nav-row">
              <i class="ti ti-bell nav-row-icon text-teal"></i>
              <span class="nav-row-text text-gray">Bildirishnomalar</span>
            </div>
          </div>
        </div>

        <!-- Card B: Yordam kerakmi? -->
        <div class="info-card">
          <h3 class="card-title">Yordam kerakmi?</h3>
          <div class="contact-info">
            <div class="contact-phone">+998 (71) 203-01-40</div>
            <div class="contact-phone">+998 (91) 595-89-08</div>
            <!-- TODO: implement call request logic -->
            <div class="contact-link" @click="handleCallRequest">
              Qo'ng'iroq buyurtma qilish
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div class="right-column">
      <div class="sidebar-panel">
        
        <div class="sidebar-header">
          <!-- TODO: replace with dynamic company name -->
          <div class="company-name">""</div>
          <!-- TODO: replace with dynamic INN -->
          <div class="inn-badge">INN: </div>
        </div>

        <div class="sidebar-divider"></div>

        <div class="sidebar-list">
          <!-- TODO: add route when ready -->
          <div class="sidebar-item">
            <span class="sidebar-item-label">Nomzodlar</span>
            <div class="sidebar-item-right">
              <span class="sidebar-item-count">0</span>
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>

          <!-- TODO: add route when ready -->
          <div class="sidebar-item">
            <span class="sidebar-item-label">Tashkilot ma'lumotlari</span>
            <div class="sidebar-item-right">
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>

          <!-- TODO: add route when ready -->
          <div class="sidebar-item">
            <span class="sidebar-item-label">Manzillar (Filiallar)</span>
            <div class="sidebar-item-right">
              <span class="sidebar-item-count">0</span>
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>

          <!-- Item -->
          <div class="sidebar-item">
            <span class="sidebar-item-label">HR menejerlar</span>
            <div class="sidebar-item-right">
              <span class="sidebar-item-count">0</span>
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>

          <!-- Item -->
          <div class="sidebar-item">
            <span class="sidebar-item-label">Hamkor XBA tashkilotlar</span>
            <div class="sidebar-item-right">
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>

          <!-- Active Router Link -->
          <div class="sidebar-item" @click="goToMonitoring">
            <span class="sidebar-item-label">Monitoring</span>
            <div class="sidebar-item-right">
              <i class="ti ti-chevron-right sidebar-item-icon"></i>
            </div>
          </div>
        </div>

        <div class="logout-container">
          <button class="logout-btn" @click="handleLogout">
            <span>Chiqish</span>
            <i class="ti ti-logout logout-icon"></i>
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// State
const searchQuery = ref('');
const searchType = ref('rezyume');
const searchError = ref('');
const bannerImage = ref('https://img.magnific.com/free-photo/still-life-office-chair-indoors_23-2151108728.jpg?semt=ais_hybrid&w=740&q=80');

// Search Validation Logic
const validateSearch = () => {
  let val = searchQuery.value.trim();
  
  if (!val) {
    searchError.value = "Maydonni to'ldiring";
    return false;
  }
  
  if (val.length < 2) {
    searchError.value = "Kamida 2 ta belgi kiriting";
    return false;
  }
  
  if (val.length > 100) {
    searchError.value = "100 ta belgidan oshmasin";
    return false;
  }
  
  const dangerPattern = /<|>|script|onclick|onerror|javascript:/i;
  if (dangerPattern.test(val)) {
    searchError.value = "Noto'g'ri belgilar kiritildi";
    return false;
  }
  
  // Sanitize
  val = val.replace(/<[^>]*>?/gm, '');
  searchQuery.value = val;
  searchError.value = '';
  return true;
};

// Handlers
const handleSearch = () => {
  if (validateSearch()) {
    console.log('Valid Search:', searchQuery.value, searchType.value);
    // TODO: implement search
  }
};

const handleCallRequest = () => {
  console.log('call request');
};

const handleLogout = () => {
  console.log('logout');
};

const goToMonitoring = () => {
  router.push('/monitoring');
};
</script>

<style scoped>
/* ==============================
   GLOBAL & LAYOUT (Mobile First)
============================== */
* {
  box-sizing: border-box;
}

.layout-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.left-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

.right-column {
  width: 100%;
  flex-shrink: 0;
}

/* ==============================
   SECTION 1: Search Bar
============================== */
.search-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  height: clamp(44px, 5vh, 48px);
  padding: 0 16px 0 44px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: clamp(14px, 1.2vw, 15px);
  color: #1f2937;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #009cb8;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: clamp(18px, 1.5vw, 20px);
}

.error-msg {
  color: #ef4444;
  font-size: 13px;
  margin-top: 6px;
}

.select-wrapper {
  position: relative;
  width: 100%;
}

.custom-select {
  width: 100%;
  height: clamp(44px, 5vh, 48px);
  padding: 0 40px 0 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: clamp(14px, 1.2vw, 15px);
  color: #4b5563;
  outline: none;
  appearance: none;
  background: white;
  cursor: pointer;
}

.select-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: clamp(16px, 1.5vw, 18px);
  pointer-events: none;
}

.search-btn {
  width: 100%;
  height: clamp(44px, 5vh, 48px);
  padding: 0 32px;
  background-color: #009cb8;
  color: white;
  font-size: clamp(15px, 1.2vw, 16px);
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.search-btn:hover {
  background-color: #0087a1;
}

/* ==============================
   SECTION 2: Banner
============================== */
.banner-card {
  background-color: #e6f6f9;
  border-radius: 20px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  min-height: auto;
  position: relative;
  overflow: hidden;
  gap: 20px;
}

.banner-content {
  width: 100%;
  max-width: 100%;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
}

.banner-title {
  font-size: clamp(22px, 4vw, 29px);
  font-weight: 800;
  color: #111827;
  margin-bottom: 8px;
  margin-top: 0;
  word-break: break-word;
}

.banner-subtitle {
  font-size: clamp(14px, 2vw, 16px);
  color: #4b5563;
  margin-bottom: 24px;
  margin-top: 0;
}

.banner-btn {
  align-self: flex-start;
  background-color: #27272a;
  color: white;
  padding: clamp(12px, 2vh, 15px) clamp(20px, 3vw, 26px);
  font-size: clamp(16px, 1.5vw, 22px);
  font-weight: 500;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: normal;
  text-align: center;
}

.banner-btn:hover {
  background-color: #18181b;
}

.banner-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.banner-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0.3;
}

/* ==============================
   SECTION 3: Stats
============================== */
.section-title {
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.stats-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-card {
  flex: 1;
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 72px;
}

.stat-card:hover {
  border-color: #9ca3af;
}

.stat-icon {
  font-size: clamp(20px, 2vw, 24px);
  color: #6b7280;
}

.stat-label {
  font-size: clamp(14px, 1.2vw, 16px);
  color: #4b5563;
}

/* ==============================
   SECTION 4: Bottom Cards
============================== */
.bottom-cards-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-card {
  flex: 1;
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 16px;
  padding: 12px 16px 20px 16px;
}

.card-title {
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 600;
  color: #111827;
  margin-bottom: 16px;
}

.nav-rows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 14px;
  margin-left: -14px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  min-height: 44px;
}

.nav-row:hover {
  background-color: #f8fafc;
}

.nav-row-icon {
  font-size: clamp(18px, 1.5vw, 20px);
}

.nav-row-text {
  font-size: clamp(14px, 1.2vw, 15px);
  font-weight: 500;
}

.text-teal {
  color: #085a65;
}

.text-gray {
  color: #374151;
}

.contact-info {
  display: flex;
  flex-direction: column;
}

.contact-phone {
  font-size: clamp(14px, 1.2vw, 17px);
  color: #4b5563;
  margin-bottom: 18px;
  word-break: break-word;
}

.contact-link {
  color: #009cb8;
  font-size: clamp(13px, 1.2vw, 14px);
  font-weight: 500;
  cursor: pointer;
  margin-top: 8px;
  display: inline-block;
  min-height: 44px;
  line-height: 44px;
}

.contact-link:hover {
  text-decoration: underline;
}

/* ==============================
   RIGHT COLUMN: Sidebar Panel
============================== */
.sidebar-panel {
  background: white;
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.04);
}

.sidebar-header {
  text-align: center;
  margin-bottom: 24px;
}

.company-name {
  font-size: clamp(16px, 1.5vw, 18px);
  font-weight: 600;
  color: #111827;
  min-height: 24px;
  word-break: break-word;
}

.inn-badge {
  display: inline-block;
  background-color: #e0f2fe;
  color: #4b5563;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: clamp(12px, 1vw, 13px);
  font-weight: 500;
  margin-top: 8px;
}

.sidebar-divider {
  height: 1px;
  background-color: #f3f4f6;
  margin: 24px 0;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 48px;
}

.sidebar-item:hover {
  border-color: #e5e7eb;
  background-color: #f8fafc;
}

.sidebar-item-label {
  font-size: clamp(14px, 1.2vw, 15px);
  font-weight: 500;
  color: #374151;
}

.sidebar-item-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sidebar-item-count {
  font-size: clamp(13px, 1vw, 14px);
  color: #9ca3af;
}

.sidebar-item-icon {
  font-size: clamp(16px, 1.5vw, 18px);
  color: #9ca3af;
}

.logout-container {
  margin-top: 32px;
  text-align: center;
}

.logout-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;
  color: #ef4444;
  font-size: clamp(15px, 1.5vw, 16px);
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: opacity 0.2s;
  min-height: 48px;
}

.logout-btn:hover {
  opacity: 0.8;
}

.logout-icon {
  font-size: clamp(18px, 1.5vw, 20px);
}

/* ==============================
   MEDIA QUERIES
============================== */

/* 480px - Large phones */
@media (min-width: 480px) {
  .search-row {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .input-container {
    width: 100%;
  }
  .select-wrapper {
    width: calc(50% - 6px);
  }
  .search-btn {
    width: calc(50% - 6px);
  }
  .stats-grid {
    flex-direction: row;
  }
  .stat-card {
    width: 50%;
  }
  .banner-img-wrapper img {
    opacity: 0.5;
  }
}

/* 768px - Tablets portrait */
@media (min-width: 768px) {
  .layout-container {
    flex-direction: row;
    padding: 24px;
    gap: 24px;
  }
  .right-column {
    width: 300px;
  }
  .search-row {
    flex-wrap: nowrap;
  }
  .select-wrapper {
    width: 160px;
  }
  .search-btn {
    width: auto;
  }
  .banner-card {
    flex-direction: row;
    padding: 24px 32px;
    min-height: 200px;
  }
  .banner-content {
    max-width: 60%;
  }
  .banner-subtitle {
    margin-bottom: auto;
  }
  .banner-btn {
    margin-top: 24px;
  }
  .banner-img-wrapper img {
    opacity: 1; /* Full opacity on larger screens */
  }
  .bottom-cards-row {
    flex-direction: row;
    gap: 24px;
  }
}

/* 1024px - Tablets landscape / Small Laptops */
@media (min-width: 1024px) {
  .layout-container {
    padding: 32px;
    gap: 32px;
  }
  .right-column {
    width: 360px;
  }
  .select-wrapper {
    width: 260px;
  }
  .banner-card {
    min-height: 220px;
  }
}

/* 1280px - Standard Laptops/Desktops */
@media (min-width: 1280px) {
  .layout-container {
    max-width: 1440px;
    padding: 40px 64px;
    gap: 64px;
  }
  .right-column {
    width: 440px;
  }
  .left-column {
    gap: 32px;
  }
  .select-wrapper {
    width: 280px;
  }
  .info-card {
    padding: 12px 28px 20px 28px;
  }
  .stat-card {
    padding: 12px 28px 16px 28px;
  }
  .banner-card {
    min-height: 245px;
    padding: 16px 40px 24px 40px;
  }
}

/* 1920px - Full HD */
@media (min-width: 1920px) {
  .layout-container {
    max-width: 1800px;
    padding: 48px 80px;
    gap: 80px;
  }
  .right-column {
    width: 500px;
  }
  .left-column {
    gap: 40px;
  }
  .sidebar-panel {
    padding: 32px;
  }
}

/* 2560px - 2K/4K */
@media (min-width: 2560px) {
  .layout-container {
    max-width: 2400px;
    padding: 64px 120px;
    gap: 100px;
  }
  .right-column {
    width: 600px;
  }
  .left-column {
    gap: 48px;
  }
  .info-card {
    padding: 16px 36px 24px 36px;
  }
  .stat-card {
    padding: 16px 36px 20px 36px;
  }
  .banner-card {
    min-height: 320px;
    padding: 32px 64px;
  }
}
</style>


