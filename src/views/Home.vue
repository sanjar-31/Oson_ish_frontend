<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import HeroSection from "@/components/HeroSection.vue";
import High_paying_jobs from '@/components/High_paying_jobs.vue';
import EmployersSection from "@/components/EmployersSection.vue";
import TelegramBanner from '@/components/TelegramBanner.vue';
import FaqSection from '@/components/FaqSection.vue';
import FooterSection from '@/components/Footer.vue';

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

const articles = [
  {
    id: 1,
    title: "Suhbatdan muvaffaqiyatli o'tish bo'yicha foydali maslahatlar",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "IELTS lug'at boyligini o'rganish va qo'llash sirlari",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Xorijiy tillarni o'rganish bo'yicha 10 ta maslahat",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "CV/Rezyumeni qanday yozish kerak?",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  }
];

const goToArticle = (id) => {
  console.log('article id:', id);
};
</script>

<template>
  <Header />
  <HeroSection />

  <High_paying_jobs />

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

  <EmployersSection />

  <!-- Useful Articles Section -->
  <section class="useful-articles">
    <div class="container">
      <h2 class="section-title">Foydali maqolalar</h2>
      <div class="articles-grid">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="article-card"
          @click="goToArticle(article.id)"
        >
          <div class="article-image-wrapper">
            <img :src="article.image" :alt="article.title" class="article-image">
            <div class="article-overlay"></div>
            <div class="article-content">
              <h3 class="article-card-title">{{ article.title }}</h3>
              <button class="article-btn" @click.stop="goToArticle(article.id)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <TelegramBanner />
  <FaqSection />
  <FooterSection />
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

/* Useful Articles Styles */
.useful-articles {
  padding: 60px 0 100px 0;
  background-color: #ffffff;
}

.useful-articles .section-title {
  margin-bottom: 40px;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.article-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 320px;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.article-card:hover {
  transform: translateY(-10px);
}

.article-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
}

.article-content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.article-card-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
}

.article-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #00acc1;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
}

.article-btn:hover {
  background-color: #0097a7;
}

/* Article Responsive */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
  
  .article-card {
    height: 280px;
  }
}
</style>