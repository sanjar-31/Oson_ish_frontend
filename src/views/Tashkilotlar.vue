<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import TashkilotlarSection from '../components/Tashkilotlar_section.vue';
</script>

<template>
  <div class="tashkilotlar-view">
    <Header />
    <main>
      <TashkilotlarSection />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.tashkilotlar-view {
  min-height: 100vh;
  background: #F9FAFB;
  padding: 0;
  margin: 0;
}
</style>
