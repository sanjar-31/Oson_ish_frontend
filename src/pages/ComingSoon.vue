<template>
  <div class="coming-soon">
    <h1>Bu sahifa tez orada qo'shiladi</h1>
    <router-link to="/">Bosh sahifaga qaytish</router-link>
  </div>
</template>

<style scoped>
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Inter', sans-serif;
  text-align: center;
  background: #f8f9fa;
}

h1 {
  color: #111827;
  margin-bottom: 20px;
}

a {
  color: #009BB4;
  text-decoration: none;
  font-weight: 600;
}

a:hover {
  text-decoration: underline;
}
</style>
