<template>
  <div class="login-page">
    <Header />
    <main class="login-content">
      <LoginSection />
    </main>
    <Footer />
  </div>
</template>

<script>
import LoginSection from '@/components/Login_section.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Login',
  components: {
    Header,
    LoginSection,
    Footer
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}

.login-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

@media (max-width: 768px) {
  .login-content {
    padding: 16px;
    align-items: flex-start;
  }
}
</style>
