<script setup>
import Resumes_section from '@/components/Resumes_section.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="resumes-view">
    <Header />
    <Resumes_section />
    <Footer />
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
}

.resumes-view {
  min-height: 100vh;
}
</style>
