<script setup>
import { ref } from 'vue';

const activeCategoryId = ref(2);

const categories = [
  {
    id: 1,
    title: "Nogironligi bo'lgan shaxslar uchun",
    vacancies: 2041,
    icon: 'wheelchair'
  },
  {
    id: 2,
    title: "Talaba va bitiruvchilar uchun",
    vacancies: 5342,
    icon: 'student'
  },
  {
    id: 3,
    title: "Ayollar uchun",
    vacancies: 9620,
    icon: 'women'
  },
  {
    id: 4,
    title: "Zaxiralangan ish o'rinlari",
    vacancies: 2746,
    icon: 'reserved'
  }
];

const handleCategoryClick = (id) => {
  activeCategoryId.value = id;
  console.log('Navigation event:', id);
};
</script>

<template>
  <!-- Special Categories Section -->
  <section class="special-categories">
    <div class="container">
      <h2 class="section-title">Alohida toifalar uchun ishlar</h2>
      
      <div class="categories-grid">
        <div 
          v-for="cat in categories" 
          :key="cat.id"
          class="category-card"
          :class="{ active: activeCategoryId === cat.id }"
          @click="handleCategoryClick(cat.id)"
        >
          <div class="illustration-box">
            <!-- SVG Wheelchair -->
            <svg v-if="cat.icon === 'wheelchair'" width="80" height="80" viewBox="0 0 100 100">
              <circle cx="50" cy="65" r="18" fill="none" stroke="#1a1a2e" stroke-width="2"/>
              <circle cx="50" cy="65" r="14" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="1"/>
              <path d="M40 40 Q40 30 50 30 Q60 30 60 40 L60 65 L40 65 Z" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="2"/>
              <circle cx="50" cy="20" r="10" fill="#f5dcc0" stroke="#1a1a2e" stroke-width="2"/>
              <path d="M30 50 H70" stroke="#0097a7" stroke-width="4" stroke-linecap="round"/>
              <circle cx="50" cy="65" r="4" fill="#1a1a2e"/>
            </svg>

            <!-- SVG Student -->
            <svg v-if="cat.icon === 'student'" width="80" height="80" viewBox="0 0 100 100">
              <path d="M35 50 Q35 40 50 40 Q65 40 65 50 L65 85 H35 Z" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="2"/>
              <circle cx="50" cy="25" r="12" fill="#f5dcc0" stroke="#1a1a2e" stroke-width="2"/>
              <rect x="68" y="45" width="22" height="6" rx="2" fill="#0097a7" stroke="#1a1a2e" stroke-width="1"/>
              <rect x="68" y="54" width="22" height="6" rx="2" fill="#1a1a2e" stroke="#1a1a2e" stroke-width="1"/>
              <rect x="68" y="63" width="22" height="6" rx="2" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="1"/>
              <path d="M30 55 Q20 55 20 75 Q20 85 35 85" fill="none" stroke="#0097a7" stroke-width="3"/>
            </svg>

            <!-- SVG Women -->
            <svg v-if="cat.icon === 'women'" width="80" height="80" viewBox="0 0 100 100">
              <path d="M50 25 C40 25 35 30 35 40 C35 50 40 55 50 55 C60 55 65 50 65 40 C65 30 60 25 50 25" fill="#f5dcc0" stroke="#1a1a2e" stroke-width="2"/>
              <path d="M35 35 Q30 35 30 25 Q30 15 50 15 Q70 15 70 25 Q70 35 65 35" fill="none" stroke="#1a1a2e" stroke-width="3"/>
              <path d="M35 60 Q30 60 25 70 L25 90 H75 L75 70 Q70 60 65 60 Z" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="2"/>
              <path d="M55 70 L55 85" stroke="#1a1a2e" stroke-width="1.5"/>
              <path d="M55 65 L62 58 A5 5 0 1 1 70 65 L62 72 A5 5 0 1 1 55 65" fill="#0097a7" stroke="#1a1a2e" stroke-width="1"/>
              <circle cx="62" cy="65" r="2" fill="#1a1a2e"/>
            </svg>

            <!-- SVG Reserved -->
            <svg v-if="cat.icon === 'reserved'" width="80" height="80" viewBox="0 0 100 100">
              <path d="M20 70 Q20 65 30 65 L60 65 Q70 65 80 75 L75 80 Q65 70 30 70" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="2"/>
              <path d="M50 45 C50 40 40 30 50 25 C60 20 70 30 70 30 C70 30 80 20 90 25 C100 30 90 40 90 45 L70 65 L50 45 Z" fill="#0097a7" stroke="#1a1a2e" stroke-width="1.5"/>
              <path d="M25 75 L35 85 H15 Z" fill="#f0f0f0" stroke="#1a1a2e" stroke-width="1.5"/>
            </svg>
          </div>
          
          <h3 class="category-title">{{ cat.title }}</h3>
          <p class="category-count">Vakansiyalar: {{ cat.vacancies }}</p>
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

/* Special Categories Styles */
.special-categories {
  background-color: #f8f9fa;
  padding: 60px 0 80px 0;
}

.special-categories .section-title {
  margin-bottom: 40px;
  text-align: left;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.category-card {
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 16px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 240px;
}

.category-card:hover {
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  transform: translateY(-5px);
}

.category-card.active {
  border-color: #0097a7;
  box-shadow: 0 10px 25px rgba(0, 151, 167, 0.1);
}

.illustration-box {
  margin-bottom: 24px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.category-title {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 12px 0;
  text-align: left;
}

.category-count {
  color: #888888;
  font-size: 14px;
  margin: 0;
}

/* Responsive design */
@media (max-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    padding: 24px;
    min-height: auto;
  }
}
</style>
