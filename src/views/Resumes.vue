<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ResumesSection from '@/components/Resumes_section.vue';
</script>

<template>
  <div class="resumes-view">
    <Header />
    <main>
      <ResumesSection />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.resumes-view {
  background: #F9FAFB;
  min-height: 100vh;
}
</style>
