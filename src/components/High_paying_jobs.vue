<script setup>
import { ref, computed } from 'vue';

const currentIndex = ref(0);
const cardWidth = 280;
const gap = 20;

const jobs = [
  {
    id: 1,
    title: "IT-специалисты",
    salary: "8 000 000 dan 60 000 000 so'mgacha",
    location: "Toshkent shahri",
    company: '"УЗБЕКИСТОН СОЛИК МАС..."',
    logo: "https://via.placeholder.com/32x32/008080/ffffff?text=U"
  },
  {
    id: 2,
    title: "Terapevt",
    salary: "15 000 000 dan 20 000 000 so'mgacha",
    location: "Toshkent shahri",
    company: '"HI TECH LABORATORIES" M...',
    logo: "https://via.placeholder.com/32x32/0000ff/ffffff?text=H"
  },
  {
    id: 3,
    title: "Buxgalter-ekspert",
    salary: "6 000 000 dan 20 000 000 so'mgacha",
    location: "Surxondaryo viloyati",
    company: 'BIRLASHMA SHAKLIDAGI "S..."',
    logo: "https://via.placeholder.com/32x32/008000/ffffff?text=B"
  },
  {
    id: 4,
    title: "Auditor",
    salary: "5 000 000 dan 18 000 000 so'mgacha",
    location: "Samarqand viloyati",
    company: '"FAR PHARM" MChJ',
    logo: "https://via.placeholder.com/32x32/ffa500/ffffff?text=F"
  },
  {
    id: 5,
    title: "Dasturchi (Backend)",
    salary: "10 000 000 dan 40 000 000 so'mgacha",
    location: "Toshkent shahri",
    company: '"TECH SOLUTIONS" MChJ',
    logo: "https://via.placeholder.com/32x32/800080/ffffff?text=T"
  },
  {
    id: 6,
    title: "Moliyachi-tahlilchi",
    salary: "7 000 000 dan 25 000 000 so'mgacha",
    location: "Farg'ona viloyati",
    company: '"AGRO INVEST" MChJ',
    logo: "https://via.placeholder.com/32x32/006400/ffffff?text=A"
  }
];

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * (cardWidth + gap)}px)`
}));

const next = () => {
  if (currentIndex.value < jobs.length - 3) {
    currentIndex.value++;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

<template>
  <section class="high-paying-jobs">
    <div class="container">
      <div class="content-wrapper">
        <!-- Left Block -->
        <div class="left-block">
          <h2 class="section-title">Yuqori maoshli ishlar</h2>
          
          <a href="#" target="_blank" class="view-all-link">
            Barchasini ko'rish
            <span class="arrow-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#0097A7"/>
                <path d="M11 8L15 12L11 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <div class="nav-buttons">
            <button @click="prev" class="nav-btn" :class="{ disabled: currentIndex === 0 }">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18L9 12L15 6" />
              </svg>
            </button>
            <button @click="next" class="nav-btn" :class="{ disabled: currentIndex >= jobs.length - 3 }">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18L15 12L9 6" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Carousel Block -->
        <div class="carousel-block">
          <div class="cards-track" :style="trackStyle">
            <a v-for="job in jobs" :key="job.id" href="#" @click.prevent class="job-card">
              <div class="card-content">
                <h3 class="job-title">{{ job.title }}</h3>
                <p class="salary-text">{{ job.salary }}</p>
                
                <hr class="divider">
                
                <div class="location-row">
                  <div class="location-info">
                    <svg class="pin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0097A7" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span class="location-text">{{ job.location }}</span>
                  </div>
                  <button class="heart-btn" @click.stop.prevent>
                    <svg class="heart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cccccc" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <hr class="divider">

                <div class="company-row">
                  <img :src="job.logo" alt="Company Logo" class="company-logo">
                  <span class="company-name">{{ job.company }}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.high-paying-jobs {
  background-color: #f4f6f9;
  padding: 60px 0;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 40px;
}

.left-block {
  flex-shrink: 0;
  width: 280px;
}

.section-title {
  color: #1a1a2e;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0097A7;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 40px;
}

.arrow-icon {
  display: flex;
  align-items: center;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
  color: #1a1a2e;
}

.nav-btn:hover:not(.disabled) {
  border-color: #0097A7;
  color: #0097A7;
}

.nav-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-block {
  flex-grow: 1;
  overflow: hidden;
}

.cards-track {
  display: flex;
  gap: 20px;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.job-card {
  flex-shrink: 0;
  width: 280px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.08);
}

.job-title {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 44px;
}

.salary-text {
  color: #555555;
  font-size: 14px;
  margin: 0 0 16px 0;
}

.divider {
  border: none;
  border-top: 1px solid #f0f0f0;
  margin: 16px 0;
}

.location-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #555555;
  font-size: 14px;
}

.location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.heart-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.heart-icon {
  transition: stroke 0.2s ease, fill 0.2s ease;
}

.heart-btn:hover .heart-icon {
  stroke: #e53935;
  fill: rgba(229, 57, 53, 0.1);
}

.company-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.company-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
}

.company-name {
  color: #777777;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
