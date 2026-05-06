<template>
  <section class="faq-section">
    <div class="faq-inner">
      <!-- LEFT: Heading -->
      <div class="faq-heading-col">
        <h2 class="faq-heading">Tez-tez so'raladigan savollar</h2>
      </div>

      <!-- RIGHT: Accordion cards -->
      <div class="faq-cards-col">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="faq-card"
        >
          <!-- Divider line at top of each card -->
          <div class="faq-divider"></div>

          <!-- Card header (clickable) -->
          <div
            class="faq-card-header"
            @click="toggle(index)"
            :class="{ 'is-open': openIndex === index }"
          >
            <!-- Number -->
            <span
              class="faq-number"
              :class="{ 'is-active': openIndex === index }"
            >
              {{ item.number }}
            </span>

            <!-- Question -->
            <span class="faq-question">{{ item.question }}</span>

            <!-- Chevron -->
            <span
              class="faq-chevron"
              :class="{ 'is-rotated': openIndex === index }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </div>

          <!-- Answer body (collapsible) -->
          <div
            class="faq-body"
            :class="{ 'is-open': openIndex === index }"
          >
            <div class="faq-body-inner">
              <p class="faq-answer">{{ answerText }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom divider after last card -->
        <div class="faq-divider"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const faqs = [
  { number: '01', question: "Tizimdan ro'yxatdan o'tish qanday amalga oshiriladi?" },
  { number: '02', question: 'Rezyumelarimni tizimga qanday joylashtiraman?' },
  { number: '03', question: 'Vakansiyalarni tizimga qanday joylashtiraman?' },
  { number: '04', question: 'Ish beruvchiga qanday taklif yuboraman?' },
  { number: '05', question: 'Ish qidiruvchiga qanday taklif yuboraman?' },
]

const answerText =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quod nisi. Culpa dolores esse molestiae velit fugiat placeat inventore a ducimus nobis architecto explicabo qui aliquid saepe optio sit obcaecati voluptas ipsam neque asperiores sequi odit fugit, dolorum reprehenderit modi! Doloribus beatae expedita temporibus, repudiandae dicta odio ullam earum dolore eligendi neque modi quae? Dolore dolor laborum, modi expedita vel quos, possimus iure eius consectetur necessitatibus tempora illo quas corporis. Molestias quae tenetur assumenda odit quo, officia expedita autem voluptas beatae reprehenderit velit ipsam totam obcaecati ab placeat similique est nulla saepe quia quam iste odio ipsa nam ex. Suscipit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quod nisi. Culpa dolores esse molestiae velit fugiat placeat inventore a ducimus nobis architecto explicabo qui aliquid saepe optio'

function toggle(index) {
  if (openIndex.value === index) {
    openIndex.value = null
  } else {
    openIndex.value = index
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ── Section wrapper ───────────────────────────────────────── */
.faq-section {
  width: 100%;
  background-color: #f4f5f7;
  padding: 72px 0;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

.faq-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: flex-start;
  gap: 48px;
}

/* ── LEFT column ───────────────────────────────────────────── */
.faq-heading-col {
  flex: 0 0 25%;
  min-width: 200px;
  padding-top: 20px;
}

.faq-heading {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
  color: #1a2332;
  margin: 0;
  letter-spacing: -0.01em;
}

/* ── RIGHT column ──────────────────────────────────────────── */
.faq-cards-col {
  flex: 1 1 0%;
}

/* ── Divider line ──────────────────────────────────────────── */
.faq-divider {
  width: 100%;
  height: 1px;
  background-color: #e0e1e3;
}

/* ── Card ──────────────────────────────────────────────────── */
.faq-card {
  /* no extra spacing — dividers are inside */
}

/* ── Card header ───────────────────────────────────────────── */
.faq-card-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 0;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}

.faq-card-header:hover .faq-question {
  color: #0f172a;
}

/* ── Number ────────────────────────────────────────────────── */
.faq-number {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: #5b8eb8;
  flex-shrink: 0;
  width: 24px;
  text-align: left;
  transition: color 0.3s ease;
  line-height: 1;
}

.faq-number.is-active {
  color: #b5632a;
}

/* ── Question text ─────────────────────────────────────────── */
.faq-question {
  flex: 1;
  font-size: 15px;
  font-weight: 400;
  color: #1f2937;
  line-height: 1.5;
  letter-spacing: -0.005em;
  transition: color 0.2s ease;
}

/* ── Chevron ───────────────────────────────────────────────── */
.faq-chevron {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: transform 0.3s ease, color 0.3s ease;
  line-height: 0;
}

.faq-chevron.is-rotated {
  transform: rotate(90deg);
  color: #b5632a;
}

/* ── Answer body ───────────────────────────────────────────── */
.faq-body {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 0.3s ease-in,
    opacity 0.3s ease-in;
}

.faq-body.is-open {
  max-height: 600px;
  opacity: 1;
  transition:
    max-height 0.4s ease-out,
    opacity 0.4s ease-out;
}

.faq-body-inner {
  padding-bottom: 24px;
  transform: translateY(-8px);
  transition: transform 0.4s ease-out;
}

.faq-body.is-open .faq-body-inner {
  transform: translateY(0);
}

.faq-answer {
  font-size: 14px;
  font-weight: 400;
  color: #4b5563;
  line-height: 1.75;
  margin: 0;
  padding-left: 48px; /* aligns under question text, past the number */
  letter-spacing: 0.01em;
}

/* ── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .faq-inner {
    flex-direction: column;
    gap: 32px;
    padding: 0 20px;
  }

  .faq-heading-col {
    flex: unset;
    min-width: unset;
    padding-top: 0;
  }

  .faq-heading {
    font-size: 18px;
  }

  .faq-answer {
    padding-left: 0;
  }
}
</style>
