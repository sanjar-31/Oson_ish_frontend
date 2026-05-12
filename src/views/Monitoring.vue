<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Monitoring_section from  '../components/Monitoring_section.vue'
</script>

<template>
  <div class="monitoring-view">
    <Header />
    <Monitoring_section />
    <Footer />
  </div>
</template>

<style scoped>
.monitoring-view {
  width: 100%;
}
</style>
