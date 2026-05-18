<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { Sparkles, X } from 'lucide-vue-next';

const activeTab = ref('all');
const showHelper = ref(true);

const tabs = [
    { id: 'all', label: 'Barchasi', count: 0 },
    { id: 'incoming', label: 'Kelib tushgan takliflar', count: 0 },
    { id: 'sent', label: 'Yuborilgan takliflar', count: 0 },
    { id: 'accepted', label: 'Taklif qabul qilingan', count: 0 },
    { id: 'interview', label: 'Suxbat', count: 0 },
    { id: 'hired', label: 'Ishga qabul qilingan', count: 0 },
    { id: 'rejected', label: 'Rad etilgan', count: 0 },
];
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
                <span class="breadcrumb-current">Takliflar</span>
            </nav>

            <!-- Title -->
            <h1 class="page-title">Takliflar</h1>

            <!-- Tabs -->
            <div class="tabs-wrapper">
                <div class="tabs-inner">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                        :class="['tab-btn', activeTab === tab.id ? 'tab-btn--active' : '']">
                        {{ tab.label }}
                        <span class="tab-count">{{ tab.count }}</span>
                        <span v-if="activeTab === tab.id" class="tab-indicator" />
                    </button>
                </div>
            </div>

            <!-- Empty State -->
            <div class="empty-state">
                <h2 class="empty-title">Hozircha bu bo'limda hech narsa yo'q</h2>
                <p class="empty-desc">
                    Vakansiyalarga taklif yuborish orqali ish topishingiz mumkin.
                </p>
                <router-link to="/" class="cta-btn">Vakansiyalarni ko'rish</router-link>
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
                    <Sparkles :size="28" color="#ffffff" />
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
    min-height: calc(100vh - 80px);
    background: #f8fafb;
    font-family: 'Inter', sans-serif;
    padding-bottom: 80px;
    box-sizing: border-box;
}

/* ── Container ── */
.container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    box-sizing: border-box;
}

/* ── Breadcrumb ── */
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 20px 0 12px;
    font-size: 13px;
    font-weight: 500;
    list-style: none;
    margin: 0;
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
}

/* ── Title ── */
.page-title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    margin: 4px 0 24px;
    letter-spacing: -0.4px;
}

/* ── Tabs ── */
.tabs-wrapper {
    border-bottom: 1.5px solid #e5e7eb;
    margin-bottom: 60px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.tabs-wrapper::-webkit-scrollbar {
    display: none;
}

.tabs-inner {
    display: flex;
    align-items: center;
    min-width: max-content;
}

.tab-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 0 20px 14px;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s;
}

.tab-btn:first-child {
    padding-left: 0;
}

.tab-btn:hover {
    color: #374151;
}

.tab-btn--active {
    color: #00b4cc;
    font-weight: 600;
}

.tab-count {
    font-size: 14px;
    font-weight: inherit;
}

.tab-indicator {
    position: absolute;
    bottom: -1.5px;
    left: 0;
    right: 0;
    height: 2.5px;
    background: #00b4cc;
    border-radius: 2px 2px 0 0;
}

.tab-btn:first-child .tab-indicator {
    left: 0;
}

/* ── Empty State ── */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 16px 60px;
}

.empty-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 12px;
}

.empty-desc {
    font-size: 14px;
    color: #9ca3af;
    font-weight: 400;
    max-width: 300px;
    margin: 0 0 28px;
    line-height: 1.7;
}

.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    padding: 0 32px;
    border-radius: 10px;
    background: #00b4cc;
    color: #ffffff;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 15px;
    text-decoration: none;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 180, 204, 0.30);
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

/* ════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════ */

/* Tablet */
@media (max-width: 1024px) {
    .container {
        padding: 0 24px;
    }

    .page-title {
        font-size: 26px;
    }

    .tab-btn {
        padding: 0 16px 14px;
        font-size: 13px;
    }
}

/* Mobile */
@media (max-width: 640px) {
    .container {
        padding: 0 16px;
    }

    .breadcrumb {
        padding: 14px 0 10px;
    }

    .page-title {
        font-size: 22px;
        margin-bottom: 18px;
    }

    .tabs-wrapper {
        margin-bottom: 36px;
        margin-left: -16px;
        margin-right: -16px;
        padding-left: 16px;
    }

    .tabs-inner {
        padding-right: 16px;
    }

    .tab-btn {
        font-size: 13px;
        padding: 0 14px 12px;
    }

    .tab-btn:first-child {
        padding-left: 0;
    }

    .empty-state {
        padding: 24px 8px 48px;
    }

    .empty-title {
        font-size: 18px;
    }

    .empty-desc {
        font-size: 13px;
    }

    .cta-btn {
        width: 100%;
        max-width: 320px;
        font-size: 14px;
        height: 46px;
    }

    .helper {
        bottom: 16px;
        right: 16px;
    }

    .helper-bubble {
        max-width: 200px;
        padding: 12px;
    }

    .helper-fab {
        width: 50px;
        height: 50px;
    }
}

/* Small phones */
@media (max-width: 380px) {
    .page-title {
        font-size: 20px;
    }

    .tab-btn {
        font-size: 12px;
        padding: 0 10px 12px;
    }

    .empty-title {
        font-size: 16px;
    }

    .empty-desc {
        font-size: 12px;
    }
}
</style>