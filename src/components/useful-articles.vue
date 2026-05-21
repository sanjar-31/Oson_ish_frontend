<script setup>
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
