<script setup>
import { Sparkles, X } from 'lucide-vue-next';
import Navbar from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';

const showHelper = ref(true);
</script>

<template>
    <Navbar />

    <main class="page">
        <div class="container">

            <!-- Breadcrumb -->
            <nav class="breadcrumb">
                <router-link to="/" class="breadcrumb-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Bosh sahifa
                </router-link>
                <span class="breadcrumb-sep">/</span>
                <span class="breadcrumb-current">Vakansiyalar</span>
            </nav>

            <!-- Title -->
            <h1 class="page-title">Saqlanganlar</h1>

            <!-- Empty State -->
            <div class="empty-state">
                <h2 class="empty-title">Saqlanganlarda hali hech narsa yo'q</h2>
                <p class="empty-desc">
                    Vakansiya yonidagi <span class="heart">❤</span> belgisini bosib, uni saqlashingiz mumkin.
                </p>
                <router-link to="/vacancies" class="cta-btn">Vakansiyalar</router-link>
            </div>

        </div>

        <!-- Floating Helper -->
        <Transition name="helper">
            <div v-if="showHelper" class="helper">
                <div class="helper-bubble">
                    <button class="helper-close" @click="showHelper = false">
                        <X :size="12" />
                    </button>
                    <p class="helper-text">Sizga mos ishni topishda yordam kerakmi?</p>
                    <div class="helper-arrow" />
                </div>
                <button class="helper-fab">
                    <Sparkles :size="26" color="#ffffff" />
                </button>
            </div>
        </Transition>
    </main>

    <Footer />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* ── Base ── */
.page {
    min-height: 100vh;
    background: #ffffff;
    font-family: 'Inter', sans-serif;
    padding-bottom: 80px;
    box-sizing: border-box;
}

/* ── Container — одинаковый отступ на всех размерах ── */
.container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px;
    box-sizing: border-box;
}

/* ── Breadcrumb ── */
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 24px 0 14px;
    font-size: 13px;
    font-weight: 500;
    margin: 0;
    list-style: none;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #9ca3af;
    text-decoration: none;
    transition: color 0.2s;
}

.breadcrumb-link:hover {
    color: #6b7280;
}

.breadcrumb-sep {
    color: #d1d5db;
}

.breadcrumb-current {
    color: #374151;
    font-weight: 600;
}

/* ── Title ── */
.page-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 0;
    letter-spacing: -0.4px;
}

/* ── Empty State ── */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 120px 16px 60px;
}

.empty-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 14px;
}

.empty-desc {
    font-size: 15px;
    color: #6b7280;
    font-weight: 400;
    max-width: 420px;
    margin: 0 0 32px;
    line-height: 1.7;
}

.heart {
    color: #e53e3e;
    font-style: normal;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 48px;
    border-radius: 8px;
    background: #00b4cc;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    border: none;
}

.cta-btn:hover {
    background: #009ab0;
}

.cta-btn:active {
    transform: scale(0.97);
}

/* ── Floating Helper ── */
.helper {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
}

.helper-bubble {
    position: relative;
    background: #ffffff;
    padding: 14px 16px;
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.13);
    border: 1px solid #f0f0f0;
    max-width: 220px;
}

.helper-close {
    position: absolute;
    top: -9px;
    right: -9px;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    border: 1px solid #e5e7eb;
    color: #9ca3af;
    cursor: pointer;
    transition: color 0.2s;
}

.helper-close:hover {
    color: #374151;
}

.helper-text {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
    line-height: 1.5;
    margin: 0;
}

.helper-arrow {
    position: absolute;
    bottom: -7px;
    right: 22px;
    width: 14px;
    height: 14px;
    background: #ffffff;
    border-bottom: 1px solid #f0f0f0;
    border-right: 1px solid #f0f0f0;
    transform: rotate(45deg);
}

.helper-fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #00b4cc;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(0, 180, 204, 0.38);
    transition: background 0.2s, transform 0.2s;
}

.helper-fab:hover {
    background: #009ab0;
    transform: scale(1.06);
}

/* ── Transitions ── */
.helper-enter-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.helper-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.helper-enter-from,
.helper-leave-to {
    opacity: 0;
    transform: translateY(12px) scale(0.95);
}

/* ════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════ */

/* Tablet ≤ 1024px */
@media (max-width: 1024px) {
    .container {
        padding: 0 32px;
    }

    .page-title {
        font-size: 26px;
    }

    .empty-state {
        padding: 100px 16px 60px;
    }
}

/* Mobile ≤ 768px */
@media (max-width: 768px) {
    .container {
        padding: 0 24px;
    }

    .page-title {
        font-size: 24px;
    }

    .empty-state {
        padding: 80px 16px 48px;
    }

    .empty-title {
        font-size: 18px;
    }

    .empty-desc {
        font-size: 14px;
        max-width: 320px;
    }
}

/* Small mobile ≤ 480px */
@media (max-width: 480px) {
    .container {
        padding: 0 20px;
    }

    .breadcrumb {
        padding: 16px 0 12px;
        font-size: 12px;
    }

    .page-title {
        font-size: 22px;
    }

    .empty-state {
        padding: 60px 0 40px;
    }

    .empty-title {
        font-size: 17px;
    }

    .empty-desc {
        font-size: 13px;
        max-width: 280px;
    }

    .cta-btn {
        width: 100%;
        max-width: 100%;
        font-size: 15px;
        height: 50px;
        border-radius: 10px;
        padding: 0 24px;
    }

    .helper {
        bottom: 16px;
        right: 16px;
    }

    .helper-bubble {
        max-width: 190px;
        padding: 12px;
    }

    .helper-fab {
        width: 50px;
        height: 50px;
    }
}

/* Very small ≤ 360px */
@media (max-width: 360px) {
    .container {
        padding: 0 16px;
    }

    .page-title {
        font-size: 20px;
    }

    .empty-title {
        font-size: 15px;
    }

    .empty-desc {
        font-size: 12px;
    }
}
</style>