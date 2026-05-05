<template>
  <section class="telegram-banner-wrapper">
    <div class="telegram-banner">
      <!-- Telegram Icon -->
      <div class="tg-icon-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="36"
          height="36"
          fill="none"
        >
          <path
            d="M5.5 23.5L41.5 8.5L29.5 40.5L22.5 29.5L35.5 17.5L14.5 27.5L5.5 23.5Z"
            fill="white"
            stroke="white"
            stroke-width="1.5"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
          <path
            d="M22.5 29.5L27.5 34.5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <!-- Text Block -->
      <div class="tg-text">
        <h2 class="tg-heading">So'nggi vakansiyalar endi Telegram kanalimizda!</h2>
        <p class="tg-subtext">Obuna bo'ling va so'nggi ish takliflarini kuzatib boring!</p>
      </div>

      <!-- CTA Button -->
      <button class="tg-button" @click="openTelegram">Obuna bo'lish</button>
    </div>
  </section>
</template>

<script setup>
const openTelegram = () => {
  window.open('https://t.me/quliyev_sanjar', '_blank')
}
</script>

<style scoped>
.telegram-banner-wrapper {
  background-color: #f4f6f9;
  padding: 0 0 60px 0;
}

.telegram-banner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  background-color: #2bbfbf;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px 40px;
}

.tg-icon-circle {
  flex-shrink: 0;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tg-text {
  flex: 1;
}

.tg-heading {
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.3;
}

.tg-subtext {
  color: rgba(255, 255, 255, 0.82);
  font-size: 15px;
  font-weight: 400;
  margin: 0;
  line-height: 1.4;
}

.tg-button {
  flex-shrink: 0;
  background-color: #ffffff;
  color: #1a1a2e;
  border: none;
  border-radius: 10px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.tg-button:hover {
  background-color: #e8f9f9;
}

@media (max-width: 600px) {
  .telegram-banner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 28px 24px;
    gap: 20px;
  }

  .tg-text {
    width: 100%;
  }

  .tg-heading {
    font-size: 18px;
  }

  .tg-button {
    width: 100%;
    padding: 14px 24px;
  }
}
</style>
