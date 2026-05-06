<script setup>
import { ref, computed } from 'vue';

const emit = defineEmits(['card-clicked', 'employer-clicked']);

// Active tab state
const activeTab = ref(1); // 1 = Taniqli ish beruvchilar, 2 = Eng faol ish beruvchilar

// Slider state for Section A
const currentIndex = ref(0);
const visibleCards = 4;

// Sample Data for Section A (Taniqli ish beruvchilar)
const popularEmployers = [
  {
    id: 1,
    name: '"AKFA BUILDING MATERIALS..."',
    logo: 'https://companieslogo.com/img/orig/AKFA.UZ-f8f9e6f5.png?t=1659616441',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    vacancies: 7
  },
  {
    id: 2,
    name: '"TEXNOPARK" MAS\'ULIYATI ...',
    logo: 'https://texnopark.uz/upload/iblock/0a3/0a3b6f8f8f8f8f8f8f8f8f8f8f8f8f8f.png',
    bgImage: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=600',
    vacancies: 6
  },
  {
    id: 3,
    name: '"UNITEL" MAS\'ULIYATI CHEK...',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Beeline.svg/1200px-Beeline.svg.png',
    bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
    vacancies: 6
  },
  {
    id: 4,
    name: '"DISCOVER INVEST" MAS\'UL...',
    logo: 'https://di.uz/images/logo.png',
    bgImage: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=600',
    vacancies: 4
  },
  {
    id: 5,
    name: '"ORIGINAL TEXTILE AND PRI...',
    logo: 'https://via.placeholder.com/64x32/ff0000/ffffff?text=BONITO',
    bgImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
    vacancies: 3
  },
  {
    id: 6,
    name: '"ANGLESEY FOOD" MAS\'ULI...',
    logo: 'https://korzinka.uz/images/logo.png',
    bgImage: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=600',
    vacancies: 2
  },
  {
    id: 7,
    name: '"MADINA-QANDOLAT" MAS\'...',
    logo: 'https://safiabakery.uz/images/logo.png',
    bgImage: 'https://images.unsplash.com/photo-1551248429-4285544d7c6a?auto=format&fit=crop&q=80&w=600',
    vacancies: 2
  },
  {
    id: 8,
    name: '"UNIVERSAL MOBILE SYSTE...',
    logo: 'https://mobi.uz/images/logo_en.png',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
    vacancies: 1
  }
];

// Sample Data for Section B (Eng faol ish beruvchilar)
const activeEmployers = [
  { id: 101, name: '"DAVR DIZAYN SANOAT" MAS\'ULI...', vacancies: 60, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 102, name: '"SARDOBA TUMANI TIBBIYOT BIR...', vacancies: 54, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 103, name: 'SERGELI TUMANI TIBBIYOT BIRLA...', vacancies: 43, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 104, name: '"SHOMANAY RAYONI MEDICINALI...', vacancies: 42, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 105, name: '"OQOLTIN TUMAN TIBBIYOT BIRL...', vacancies: 39, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 106, name: 'MIRISHKOR TUMAN TIBBIYOT BIR...', vacancies: 39, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 107, name: '"TAXTAKO\'PIR TUMANI TIBBIYOT ...', vacancies: 37, logo: 'https://via.placeholder.com/40?text=Logo' },
  { id: 108, name: '"KITOB TUMAN KELAJAK MARKAZ...', vacancies: 32, logo: 'https://via.placeholder.com/40?text=Logo' }
];

// Slider Logic
const sliderTrackStyle = computed(() => {
  const cardWidth = 280; // card width
  const gap = 20; // gap
  return {
    transform: `translateX(-${currentIndex.value * (cardWidth + gap)}px)`,
    transition: 'transform 0.4s ease'
  };
});

const nextSlide = () => {
  if (currentIndex.value < popularEmployers.length - visibleCards) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const handleCardClick = (id) => {
  if (activeTab.value === 1) {
    emit('card-clicked', id);
  } else {
    emit('employer-clicked', id);
  }
};
</script>

<template>
  <section class="employers-section">
    <div class="container">
      <!-- Section Header Area [IMAGE 1] -->
      <div class="header-area">
        <div class="left-group">
          <h2 class="title">Ish beruvchilar</h2>
          <div class="toggle-buttons">
            <button 
              class="toggle-btn" 
              :class="{ active: activeTab === 1 }"
              @click="activeTab = 1"
            >
              Taniqli ish beruvchilar
            </button>
            <button 
              class="toggle-btn" 
              :class="{ active: activeTab === 2 }"
              @click="activeTab = 2"
            >
              Eng faol ish beruvchilar
            </button>
          </div>
        </div>
        <div class="right-group">
          <a href="#" class="view-all">
            Barchasini ko'rish
            <span class="arrow-circle">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>
      </div>

      <!-- Card Section A (Slider) [IMAGE 2, 3] -->
      <div v-if="activeTab === 1" class="slider-container">
        <div class="slider-viewport">
          <div class="slider-track" :style="sliderTrackStyle">
            <div 
              v-for="employer in popularEmployers" 
              :key="employer.id" 
              class="employer-card-a"
              @click="handleCardClick(employer.id)"
            >
              <div class="card-image" :style="{ backgroundImage: `url(${employer.bgImage})` }">
                <div class="overlay">
                  <div class="logo-box">
                    <img :src="employer.logo" :alt="employer.name" class="company-logo">
                  </div>
                  <div class="card-info">
                    <h3 class="company-name">{{ employer.name }}</h3>
                    <p class="vacancy-count">Vakansiyalar: {{ employer.vacancies }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slider Navigation [IMAGE 2] -->
        <div class="slider-nav">
          <button @click="prevSlide" class="nav-btn" :disabled="currentIndex === 0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>
          <button @click="nextSlide" class="nav-btn" :disabled="currentIndex >= popularEmployers.length - visibleCards">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18L15 12L9 6" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Card Section B (Grid) [IMAGE 4] -->
      <div v-else class="grid-container">
        <div class="employers-grid">
          <div 
            v-for="employer in activeEmployers" 
            :key="employer.id" 
            class="employer-card-b"
            @click="handleCardClick(employer.id)"
          >
            <div class="card-b-content">
              <div class="logo-row">
                <img :src="employer.logo" alt="logo" class="mini-logo">
              </div>
              <h3 class="company-name-b">{{ employer.name }}</h3>
              <p class="vacancy-count-b">Vakansiyalar: {{ employer.vacancies }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

.employers-section {
  font-family: 'Inter', sans-serif;
  background-color: #F8F9FA;
  padding: 60px 0;
  overflow: hidden;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Area [IMAGE 1] */
.header-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.left-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: #1A1A2E;
  margin: 0;
}

.toggle-buttons {
  display: flex;
  gap: 12px;
}

.toggle-btn {
  padding: 10px 24px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

/* Active style: Teal background, white text */
.toggle-btn.active {
  background-color: #129AA6;
  color: #FFFFFF;
}

/* Inactive style: White background, Teal text */
.toggle-btn:not(.active) {
  background-color: #FFFFFF;
  color: #129AA6;
}

.right-group .view-all {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #129AA6;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
}

.arrow-circle {
  width: 24px;
  height: 24px;
  background-color: #129AA6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card Section A (Slider) [IMAGE 2, 3] */
.slider-container {
  position: relative;
}

.slider-viewport {
  overflow: hidden;
  margin: 0 -10px; /* Counteract card margins */
}

.slider-track {
  display: flex;
  padding: 10px;
}

.employer-card-a {
  flex: 0 0 280px;
  height: 380px;
  margin: 0 10px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.employer-card-a:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.card-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
}

.logo-box {
  margin-bottom: 12px;
}

.company-logo {
  max-width: 140px;
  max-height: 48px;
  object-fit: contain;
}

.company-name {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 4px 0;
  line-height: 1.2;
  text-transform: uppercase;
}

.vacancy-count {
  font-size: 13px;
  opacity: 0.8;
  margin: 0;
}

/* Slider Nav Buttons [IMAGE 2] */
.slider-nav {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #1A1A2E;
}

.nav-btn:hover:not(:disabled) {
  border-color: #129AA6;
  color: #129AA6;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Card Section B (Grid) [IMAGE 4] */
.employers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.employer-card-b {
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.employer-card-b:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}

.card-b-content {
  display: flex;
  flex-direction: column;
}

.logo-row {
  margin-bottom: 20px;
}

.mini-logo {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}

.company-name-b {
  font-size: 15px;
  font-weight: 700;
  color: #1A1A2E;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 42px;
}

.vacancy-count-b {
  font-size: 13px;
  color: #888888;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .employers-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .header-area {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .right-group {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}

@media (max-width: 600px) {
  .employers-grid {
    grid-template-columns: 1fr;
  }
  
  .employer-card-a {
    flex: 0 0 calc(100% - 20px);
  }
}
</style>
