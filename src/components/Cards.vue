<template>
  <div class="resume-card">
    <div class="card-header">
      <div class="avatar-container">
        <div class="avatar-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill="#E5E7EB"/>
            <path d="M12 14C9.33333 14 4 15.3333 4 18V20H20V18C20 15.3333 14.6667 14 12 14Z" fill="#E5E7EB"/>
          </svg>
        </div>
        <div class="user-info">
          <h3 class="name">{{ card.name }}</h3>
          <p class="age">{{ card.age }} yosh</p>
        </div>
      </div>
      <button class="heart-btn" @click="isLiked = !isLiked">
        <svg v-if="!isLiked" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="#FF4B55" stroke="#FF4B55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </div>

    <div class="info-rows">
      <div class="info-row">
        <span class="label">Oylik maosh:</span>
        <span class="value">{{ card.maosh }}</span>
      </div>
      <div class="info-row">
        <span class="label">Ish tajribasi:</span>
        <span class="value">{{ card.tajriba }}</span>
      </div>
      <div class="info-row">
        <span class="label">Yashash hududi:</span>
        <span class="value">{{ card.hudud }}</span>
      </div>
    </div>

    <div class="card-footer">
      <button class="offer-btn">Taklif yuborish</button>
      <div class="meta-info">
        <span class="id">ID:{{ card.id }}</span>
        <span class="date">Rezyume yangilangan: {{ card.sana }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
});

const isLiked = ref(false);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.resume-card {
  background: #FFFFFF;
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  transition: box-shadow 0.2s;
}

.resume-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.avatar-container {
  display: flex;
  gap: 16px;
  align-items: center;
}

.avatar-placeholder {
  width: 68px;
  height: 68px;
  background: #F3F4F6;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-info .name {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.user-info .age {
  font-size: 15px;
  color: #6B7280;
  margin: 0;
}

.heart-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-rows {
  margin-bottom: 24px;
}

.info-row {
  display: flex;
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.info-row .label {
  color: #9CA3AF;
  width: 120px;
  flex-shrink: 0;
}

.info-row .value {
  color: #374151;
  font-weight: 500;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.offer-btn {
  background: #0096B1;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.offer-btn:hover {
  background: #008199;
}

.meta-info {
  text-align: right;
}

.meta-info .id {
  display: block;
  font-size: 13px;
  color: #9CA3AF;
  margin-bottom: 2px;
}

.meta-info .date {
  display: block;
  font-size: 13px;
  color: #9CA3AF;
}
</style>
