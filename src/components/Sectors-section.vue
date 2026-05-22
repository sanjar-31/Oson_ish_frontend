<script setup>
const sectors = [
  { id: 1, title: "Sanoat va ishlab chiqarish", vacancies: 16256, icon: 'factory' },
  { id: 2, title: "Xizmatlar", vacancies: 12412, icon: 'tools' },
  { id: 3, title: "Ta'lim, madaniyat, sport", vacancies: 6562, icon: 'education' },
  { id: 4, title: "Sog'liqni saqlash", vacancies: 4949, icon: 'health' },
  { id: 5, title: "Qurilish", vacancies: 2925, icon: 'construction' },
  { id: 6, title: "Moliya, iqtisod, boshqaruv", vacancies: 2796, icon: 'finance' },
  { id: 7, title: "Transport", vacancies: 1151, icon: 'transport' },
  { id: 8, title: "Qishloq xo'jaligi", vacancies: 952, icon: 'agriculture' },
  { id: 9, title: "Savdo va marketing", vacancies: 573, icon: 'marketing' },
  { id: 10, title: "Axborot texnologiyalari", vacancies: 251, icon: 'it' }
];
</script>

<template>
  <!-- Sectors Section -->
  <section class="sectors-section">
    <div class="container">
      <h2 class="section-title">Sohalar bo'yicha</h2>
      <div class="sectors-grid">
        <div v-for="sector in sectors" :key="sector.id" class="sector-card">
          <div class="sector-icon-wrapper">
            <svg class="hexagon" width="48" height="48" viewBox="0 0 100 100">
              <path d="M50 5 L93.3 30 L93.3 70 L50 95 L6.7 70 L6.7 30 Z" fill="#0097a7" />
              <!-- Icons -->
              <g fill="white" transform="translate(25, 25) scale(0.5)">
                <path v-if="sector.icon === 'factory'" d="M10 90 V40 L40 60 V40 L70 60 V40 L90 40 V90 H10 Z M20 70 H30 V80 H20 V70 Z" />
                <path v-if="sector.icon === 'tools'" d="M85 15 L70 30 M30 70 L15 85 M20 20 L80 80 M80 20 L20 80" stroke="white" stroke-width="8" />
                <path v-if="sector.icon === 'education'" d="M10 40 L50 20 L90 40 L50 60 Z M20 50 V70 Q50 90 80 70 V50" stroke="white" stroke-width="6" fill="none" />
                <path v-if="sector.icon === 'health'" d="M30 40 H70 V80 H30 Z M50 20 V40 M40 60 H60" stroke="white" stroke-width="6" fill="none" />
                <path v-if="sector.icon === 'construction'" d="M20 90 V20 H40 V40 H60 V20 H80 V90 M30 40 H40 M30 60 H40" stroke="white" stroke-width="4" fill="none" />
                <path v-if="sector.icon === 'finance'" d="M20 30 H80 V70 H20 Z M40 50 H60" stroke="white" stroke-width="4" fill="none" />
                <path v-if="sector.icon === 'transport'" d="M10 60 H70 L90 80 H10 Z M20 80 A10 10 0 1 1 20 81 M60 80 A10 10 0 1 1 60 81" fill="white" />
                <path v-if="sector.icon === 'agriculture'" d="M50 20 Q80 40 50 90 Q20 40 50 20 Z" fill="white" />
                <path v-if="sector.icon === 'marketing'" d="M20 20 L30 80 H80 L90 30 Z M40 90 A5 5 0 1 1 40 91 M70 90 A5 5 0 1 1 70 91" stroke="white" stroke-width="4" fill="none" />
                <path v-if="sector.icon === 'it'" d="M30 30 L10 50 L30 70 M70 30 L90 50 L70 70 M45 80 L55 20" stroke="white" stroke-width="6" fill="none" />
              </g>
            </svg>
          </div>
          <div class="sector-info">
            <h4 class="sector-name">{{ sector.title }}</h4>
            <p class="sector-vacancies">Vakansiyalar: {{ sector.vacancies }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-title {
  color: #1a1a2e;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 16px 0;
}

/* Sectors Section Styles */
.sectors-section {
  background-color: #ffffff;
  padding: 60px 0;
}

.sectors-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

.sector-card {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.sector-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.sector-icon-wrapper {
  flex-shrink: 0;
}

.hexagon {
  display: block;
}

.sector-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sector-name {
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  line-height: 1.2;
}

.sector-vacancies {
  color: #888888;
  font-size: 12px;
  margin: 0;
}

@media (max-width: 1200px) {
  .sectors-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .sectors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .sectors-grid {
    grid-template-columns: 1fr;
  }
}
</style>
