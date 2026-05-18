<!-- src/views/Company.vue -->
<template>
  <div class="company-view">
    <Header/>
    <main>
      <CompanySection />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import CompanySection from '@/components/Company_section.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.company-view {
  min-height: 100vh;
  background: #F7F8FA;
}
</style>
