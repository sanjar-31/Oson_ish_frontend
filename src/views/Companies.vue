<script setup>
import Header from "@/components/Header.vue";
import CompaniesSection from '@/components/Companies_section.vue';
import FooterSection from '@/components/Footer.vue';
</script>

<template>
  <div class="page-container">
    <Header />
    <main>
      <CompaniesSection />
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.page-container {
  background-color: #ffffff;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}
</style>
