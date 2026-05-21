<script setup>
import { ref } from 'vue';
import Header from "@/components/Header.vue";
import HeroSection from "@/components/HeroSection.vue";
import High_paying_jobs from '@/components/High_paying_jobs.vue';
import Separate_categories from '@/components/Separate_categories.vue';
import SectorsSection from '@/components/Sectors-section.vue';
import EmployersSection from "@/components/EmployersSection.vue";
import UsefulArticles from '@/components/useful-articles.vue';
import TelegramBanner from '@/components/TelegramBanner.vue';
import FaqSection from '@/components/FaqSection.vue';
import FooterSection from '@/components/Footer.vue';






</script>

<template>
  <Header />

  <main>
    <HeroSection />

    <High_paying_jobs />

    <Separate_categories />

    <SectorsSection />

    <EmployersSection />

    <UsefulArticles />

    <TelegramBanner />

    <FaqSection />
  </main>

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
</style>