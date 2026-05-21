<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const currentIndex = ref(0);
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);

// Responsive card dimensions
const cardWidth = computed(() => {
  if (windowWidth.value <= 480) return windowWidth.value - 36;
  if (windowWidth.value <= 640) return 270;
  if (windowWidth.value <= 768) return 260;
  if (windowWidth.value <= 1024) return 210;
  return 230;
});

const gap = computed(() => {
  if (windowWidth.value <= 480) return 16;
  if (windowWidth.value <= 768) return 16;
  return 20;
});

const visibleCards = computed(() => {
  if (windowWidth.value <= 480) return 1;
  if (windowWidth.value <= 640) return 1.3;
  if (windowWidth.value <= 768) return 2;
  if (windowWidth.value <= 1024) return 3;
  return 3;
});

const maxIndex = computed(() => {
  const max = Math.ceil(jobs.length - Math.floor(visibleCards.value));
  return Math.max(0, max);
});

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
  transform: `translateX(-${currentIndex.value * (cardWidth.value + gap.value)}px)`
}));

const next = () => {
  if (currentIndex.value < maxIndex.value) {
    currentIndex.value++;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Touch swipe support
const touchStartX = ref(0);
const touchEndX = ref(0);

const onTouchStart = (e) => {
  touchStartX.value = e.changedTouches[0].screenX;
};

const onTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].screenX;
  const diff = touchStartX.value - touchEndX.value;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      next();
    } else {
      prev();
    }
  }
};

// Resize handler
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <section class="high-paying-jobs">
    <div class="content-wrapper">
      <!-- Left Block -->
      <div class="left-block">
        <h2 class="section-title">Yuqori maoshli ishlar</h2>

        <router-link to="/vacancies" class="view-all-link">
          Barchasini ko'rish
          <span class="arrow-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#0097A7" />
              <path d="M11 8L15 12L11 16" stroke="white" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </span>
        </router-link>

        <div class="nav-buttons">
          <button @click="prev" class="nav-btn" :class="{ disabled: currentIndex === 0 }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button @click="next" class="nav-btn" :class="{ disabled: currentIndex >= maxIndex }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Carousel Block -->
      <div class="carousel-block" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div class="cards-track" :style="trackStyle">
          <a v-for="job in jobs" :key="job.id" href="#" @click.prevent class="job-card"
            :style="{ width: cardWidth + 'px' }">
            <div class="card-content">
              <div class="top-section">
                <h3 class="job-title">{{ job.title }}</h3>
                <p class="salary-text">{{ job.salary }}</p>
              </div>

              <div class="bottom-section">
                <hr class="divider">

                <div class="location-row">
                  <div class="location-info">
                    <svg class="pin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0097A7"
                      stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span class="location-text">{{ job.location }}</span>
                  </div>
                  <button class="heart-btn" @click.stop.prevent>
                    <svg class="heart-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888888"
                      stroke-width="1.5">
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <hr class="divider">

                <div class="company-row">
                  <div class="company-logo-wrapper">
                    <!-- Beautiful SVG logos matching Image 2 perfectly -->
                    <div v-if="job.id === 1" class="company-logo-circle-green">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" fill="#e0f2f1" />
                        <circle cx="12" cy="12" r="7" fill="#0097A7" />
                        <path d="M10 12l2 2 4-4" stroke="white" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </div>
                    <div v-else class="company-logo-building-blue">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0097A7" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" fill="#e0f7fa" />
                        <path d="M9 22V16h6v6" />
                        <path d="M8 6h2v2H8zm6 0h2v2h-2zm-6 4h2v2H8zm6 0h2v2h-2z" />
                      </svg>
                    </div>
                  </div>
                  <span class="company-name">{{ job.company }}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== BASE STYLES (Desktop — matches Image 2) ===== */
.high-paying-jobs {
  background-color: #f4f6f9;
  padding: 60px 0;
  overflow: hidden;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  width: 100%;
}

.content-wrapper {
  display: flex;
  align-items: flex-start;
  padding-left: 16px;
  padding-right: 0;
  gap: 28px;
  width: 100%;
}

.left-block {
  flex-shrink: 0;
  width: 170px;
  padding-left: 0;
}

.section-title {
  color: #1a1a2e;
  font-size: 32px;
  font-weight: 800;
  line-height: 1.25;
  margin: 0 0 16px 0;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0097A7;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 0;
}

.view-all-link:hover {
  opacity: 0.85;
}

.arrow-icon {
  display: flex;
  align-items: center;
}

.nav-buttons {
  display: flex;
  gap: 10px;
  margin-top: 56px;
}

.nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  color: #1a1a2e;
}

.nav-btn:hover:not(.disabled) {
  border-color: #0097A7;
  color: #0097A7;
  box-shadow: 0 4px 10px rgba(0, 151, 167, 0.1);
}

.nav-btn.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.carousel-block {
  flex: 1 1 0%;
  overflow: hidden;
  min-width: 0;
}

.cards-track {
  display: flex;
  gap: 20px;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.job-card {
  flex-shrink: 0;
  width: 230px;
  height: 310px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: block;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.job-title {
  color: #1a1a2e;
  font-size: 19px;
  font-weight: 700;
  margin: 0 0 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 48px;
  line-height: 1.3;
}

.salary-text {
  color: #555555;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.divider {
  border: none;
  border-top: 1px solid #f3f3f3;
  margin: 12px 0;
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
  color: #666666;
  font-size: 13px;
  font-weight: 500;
}

.location-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
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
  gap: 8px;
}

.company-logo-wrapper {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-logo-circle-green,
.company-logo-building-blue {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.company-name {
  color: #777777;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ===== LARGE DESKTOPS & TV SCREENS (1400px+) ===== */
@media (min-width: 1400px) {
  .content-wrapper {
    padding-left: 28px;
    gap: 32px;
  }

  .left-block {
    width: 180px;
  }
}

/* ===== EXTRA LARGE SCREENS (1800px+) ===== */
@media (min-width: 1800px) {
  .content-wrapper {
    max-width: 1600px;
    margin: 0 auto;
    padding-left: 36px;
  }
}

/* ===== STANDARD DESKTOP (1025px – 1399px) ===== */
@media (min-width: 1025px) and (max-width: 1399px) {
  .content-wrapper {
    padding-left: 20px;
    gap: 28px;
  }

  .left-block {
    width: 170px;
  }
}

/* ===== TABLET LANDSCAPE (769px – 1024px) ===== */
@media (max-width: 1024px) {
  .high-paying-jobs {
    padding: 48px 0;
  }

  .content-wrapper {
    padding-left: 20px;
    padding-right: 0;
    gap: 20px;
  }

  .left-block {
    width: 155px;
    padding-left: 0;
  }

  .section-title {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .view-all-link {
    font-size: 15px;
  }

  .nav-buttons {
    margin-top: 40px;
    gap: 8px;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .cards-track {
    gap: 16px;
  }

  .job-card {
    height: 290px;
    padding: 18px;
    border-radius: 14px;
  }

  .job-title {
    font-size: 17px;
    min-height: 44px;
  }

  .salary-text {
    font-size: 14px;
  }
}

/* ===== TABLET PORTRAIT (≤768px) ===== */
@media (max-width: 768px) {
  .high-paying-jobs {
    padding: 40px 0;
    overflow: visible;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding-left: 24px;
    padding-right: 24px;
    gap: 20px;
  }

  .left-block {
    width: 100%;
    padding-left: 0;
    flex: 0 0 auto;
    order: 2;
  }

  .section-title {
    display: none;
  }

  .view-all-link {
    display: none;
  }

  .nav-buttons {
    margin-top: 8px;
    gap: 8px;
    justify-content: flex-start;
  }

  .nav-btn {
    width: 40px;
    height: 40px;
  }

  .carousel-block {
    display: block;
    width: 100%;
    min-width: 0;
    flex: 0 0 auto;
    overflow: hidden;
    order: 1;
  }

  .cards-track {
    display: flex;
    gap: 16px;
  }

  .job-card {
    flex: 0 0 260px;
    width: 260px;
    height: 290px;
    padding: 18px;
    border-radius: 14px;
    scroll-snap-align: start;
  }

  .job-title {
    font-size: 17px;
    min-height: 44px;
  }

  .salary-text {
    font-size: 14px;
  }

  .location-text {
    max-width: 120px;
  }
}

/* ===== SMALL TABLETS & LARGE PHONES (481px – 600px) ===== */
@media (max-width: 600px) {
  .high-paying-jobs {
    padding: 32px 0;
  }

  .content-wrapper {
    padding-left: 20px;
    padding-right: 20px;
    gap: 20px;
  }

  .section-title {
    font-size: 24px;
  }

  .view-all-link {
    font-size: 14px;
  }

  .nav-btn {
    width: 38px;
    height: 38px;
  }

  .nav-btn svg {
    width: 18px;
    height: 18px;
  }

  .job-card {
    height: 280px;
    padding: 16px;
    border-radius: 12px;
  }

  .job-title {
    font-size: 16px;
    min-height: 42px;
  }

  .salary-text {
    font-size: 13px;
  }

  .location-info {
    font-size: 12px;
  }

  .company-name {
    font-size: 12px;
  }
}

/* ===== MOBILE PHONES (≤480px) ===== */
@media (max-width: 480px) {
  .high-paying-jobs {
    padding: 28px 0;
  }

  .content-wrapper {
    flex-direction: column;
    padding-left: 16px;
    padding-right: 16px;
    gap: 16px;
  }

  .left-block {
    width: 100%;
    padding-left: 0;
  }

  .section-title {
    font-size: 22px;
    margin-bottom: 6px;
  }

  .view-all-link {
    font-size: 14px;
    margin-bottom: 12px;
    gap: 6px;
  }

  .view-all-link .arrow-icon svg {
    width: 18px;
    height: 18px;
  }

  .nav-buttons {
    margin-top: 0;
    gap: 6px;
  }

  .nav-btn {
    width: 36px;
    height: 36px;
  }

  .nav-btn svg {
    width: 16px;
    height: 16px;
  }

  .carousel-block {
    width: 100%;
  }

  .cards-track {
    gap: 16px;
  }

  .job-card {
    height: auto;
    min-height: 270px;
    padding: 18px;
    border-radius: 14px;
  }

  .job-title {
    font-size: 17px;
    min-height: auto;
  }

  .salary-text {
    font-size: 14px;
  }

  .divider {
    margin: 10px 0;
  }

  .location-info {
    font-size: 13px;
  }

  .location-text {
    max-width: none;
  }

  .company-name {
    font-size: 12px;
  }

  .company-logo-wrapper {
    width: 28px;
    height: 28px;
  }

  .company-logo-circle-green,
  .company-logo-building-blue {
    width: 28px;
    height: 28px;
  }
}

/* ===== VERY SMALL PHONES (≤360px) ===== */
@media (max-width: 360px) {
  .content-wrapper {
    padding-left: 12px;
    padding-right: 12px;
  }

  .section-title {
    font-size: 20px;
  }

  .view-all-link {
    font-size: 13px;
  }

  .nav-btn {
    width: 34px;
    height: 34px;
  }

  .job-card {
    padding: 14px;
  }

  .job-title {
    font-size: 16px;
  }

  .salary-text {
    font-size: 13px;
  }
}
</style>
