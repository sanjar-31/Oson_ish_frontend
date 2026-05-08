<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import VacanciesSection from '../components/Vacancies_section.vue';
</script>

<template>
  <div class="vacancies-view">
    <Header />
    <VacanciesSection />
    <Footer />
  </div>
</template>

<style scoped>
.vacancies-view {
  min-height: 100vh;
  background: #F9FAFB;
  padding: 0; /* Fix 1: Removed all outer page spacing */
  margin: 0;
}
</style>
