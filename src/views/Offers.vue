<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { Sparkles, X, ChevronRight } from 'lucide-vue-next';

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
            <div class="breadcrumb-wrapper">
                <nav class="breadcrumb">
                    <a href="#" class="breadcrumb-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        Bosh sahifa
                    </a>
                    <span class="breadcrumb-sep">/</span>
                    <span class="breadcrumb-current">Takliflar</span>
                </nav>
            </div>

            <div class="content-wrapper">
                <h1 class="page-title">Takliflar</h1>

                <div class="tabs-wrapper">
                    <div class="tabs-inner">
                        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                            :class="['tab-btn', activeTab === tab.id ? 'tab-btn--active' : '']">
                            {{ tab.label }}
                            <span class="tab-count">{{ tab.count }}</span>
                            <div v-if="activeTab === tab.id" class="tab-indicator" />
                        </button>
                    </div>
                </div>

                <div class="empty-card">
                    <div class="empty-illustration">
                        <div class="empty-circle">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#e2e8f0"
                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                <line x1="8" y1="21" x2="16" y2="21" />
                                <line x1="12" y1="17" x2="12" y2="21" />
                            </svg>
                        </div>
                        <div class="spinner-badge">
                            <div class="spinner" />
                        </div>
                    </div>

                    <h2 class="empty-title">Hozircha bu bo'limda hech narsa yo'q</h2>
                    <p class="empty-desc">Vakansiyalarga taklif yuborish orqali ish topishingiz mumkin.</p>

                    <button class="cta-btn">Vakansiyalarni ko'rish</button>
                </div>
            </div>
        </div>

        <Transition name="helper">
            <div v-if="showHelper" class="helper">
                <div class="helper-bubble">
                    <button @click="showHelper = false" class="helper-close">
                        <X :size="12" />
                    </button>
                    <p class="helper-text">Sizga mos ishni topishda yordam kerakmi?</p>
                    <div class="helper-arrow" />
                </div>
                <button class="helper-fab">
                    <Sparkles :size="32" color="#ffffff" />
                </button>
            </div>
        </Transition>
    </main>

    <Footer />
</template>

<style scoped>
/* ── Layout ── */
.page {
    min-height: 100vh;
    background: #f8fafb;
    padding-bottom: 80px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
}

/* ── Breadcrumb ── */
.breadcrumb-wrapper {
    padding: 16px 0;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 6px;
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

/* ── Content ── */
.content-wrapper {
    padding: 32px 0;
}

.page-title {
    font-size: 36px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 48px;
    letter-spacing: -0.5px;
}

/* ── Tabs ── */
.tabs-wrapper {
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 48px;
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
    gap: 40px;
    min-width: max-content;
}

.tab-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px;
    padding-bottom: 16px;
    font-size: 15px;
    font-weight: 500;
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: color 0.2s;
}

.tab-btn:hover {
    color: #6b7280;
}

.tab-btn--active {
    color: #00b4cc;
}

.tab-count {
    font-size: 15px;
    font-weight: 500;
}

.tab-indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #00b4cc;
    border-radius: 2px 2px 0 0;
}

/* ── Empty State Card ── */
.empty-card {
    background: #ffffff;
    border-radius: 40px;
    border: 1px solid #f1f5f9;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
    padding: 80px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.empty-illustration {
    position: relative;
    margin-bottom: 32px;
}

.empty-circle {
    width: 256px;
    height: 256px;
    border-radius: 50%;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner-badge {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 56px;
    height: 56px;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    border: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 4px solid rgba(0, 180, 204, 0.1);
    border-top-color: #00b4cc;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.empty-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.4px;
    color: #1a1a2e;
    margin: 0 0 16px;
}

.empty-desc {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 500;
    max-width: 340px;
    margin: 0 0 40px;
    line-height: 1.6;
}

.cta-btn {
    height: 56px;
    padding: 0 40px;
    border-radius: 12px;
    background: #00b4cc;
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 180, 204, 0.25);
    transition: background 0.2s, transform 0.1s;
}

.cta-btn:hover {
    background: #008ba3;
}

.cta-btn:active {
    transform: scale(0.97);
}

/* ── Floating Helper ── */
.helper {
    position: fixed;
    bottom: 32px;
    right: 32px;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
}

.helper-bubble {
    position: relative;
    background: #ffffff;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border: 1px solid #f3f4f6;
    max-width: 240px;
}

.helper-close {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 24px;
    height: 24px;
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
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    line-height: 1.4;
    margin: 0;
}

.helper-arrow {
    position: absolute;
    bottom: -8px;
    right: 24px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border-bottom: 1px solid #f3f4f6;
    border-right: 1px solid #f3f4f6;
    transform: rotate(45deg);
}

.helper-fab {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #00b4cc;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 12px 32px rgba(0, 180, 204, 0.35);
    transition: background 0.2s, transform 0.2s;
}

.helper-fab:hover {
    background: #008ba3;
    transform: scale(1.05);
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
    transform: translateY(16px) scale(0.95);
}

/* ════════════════════════════════════════
   RESPONSIVE
   ════════════════════════════════════════ */

/* ── Tablet (≤ 1024px) ── */
@media (max-width: 1024px) {
    .container {
        padding: 0 24px;
    }

    .page-title {
        font-size: 30px;
        margin-bottom: 36px;
    }

    .tabs-inner {
        gap: 28px;
    }

    .empty-card {
        padding: 60px 24px;
        border-radius: 32px;
    }

    .empty-circle {
        width: 200px;
        height: 200px;
    }

    .empty-circle svg {
        width: 96px;
        height: 96px;
    }

    .spinner-badge {
        bottom: 28px;
        right: 28px;
        width: 48px;
        height: 48px;
    }

    .empty-title {
        font-size: 24px;
    }

    .cta-btn {
        font-size: 16px;
        height: 52px;
        padding: 0 32px;
    }
}

/* ── Mobile (≤ 640px) ── */
@media (max-width: 640px) {
    .container {
        padding: 0 16px;
    }

    .breadcrumb-wrapper {
        padding: 12px 0;
    }

    .content-wrapper {
        padding: 20px 0;
    }

    .page-title {
        font-size: 24px;
        margin-bottom: 24px;
        letter-spacing: -0.3px;
    }

    /* Tabs: make them horizontally scrollable and tighter */
    .tabs-wrapper {
        margin-bottom: 24px;
        margin-left: -16px;
        margin-right: -16px;
        padding-left: 16px;
    }

    .tabs-inner {
        gap: 20px;
        padding-right: 16px;
    }

    .tab-btn {
        font-size: 13px;
        padding-bottom: 12px;
    }

    .tab-count {
        font-size: 13px;
    }

    /* Empty card: stack everything tighter */
    .empty-card {
        padding: 40px 20px;
        border-radius: 24px;
    }

    .empty-illustration {
        margin-bottom: 24px;
    }

    .empty-circle {
        width: 160px;
        height: 160px;
    }

    .empty-circle svg {
        width: 72px;
        height: 72px;
    }

    .spinner-badge {
        bottom: 16px;
        right: 16px;
        width: 40px;
        height: 40px;
        border-radius: 12px;
    }

    .spinner {
        width: 24px;
        height: 24px;
    }

    .empty-title {
        font-size: 20px;
        margin-bottom: 12px;
    }

    .empty-desc {
        font-size: 13px;
        margin-bottom: 28px;
    }

    .cta-btn {
        width: 100%;
        font-size: 15px;
        height: 48px;
        padding: 0 20px;
        border-radius: 10px;
    }

    /* Helper: tuck closer to edge on small screens */
    .helper {
        bottom: 16px;
        right: 16px;
    }

    .helper-bubble {
        max-width: 200px;
        padding: 12px;
    }

    .helper-text {
        font-size: 13px;
    }

    .helper-fab {
        width: 52px;
        height: 52px;
    }
}

/* ── Very small (≤ 380px) ── */
@media (max-width: 380px) {
    .page-title {
        font-size: 20px;
    }

    .empty-circle {
        width: 130px;
        height: 130px;
    }

    .empty-circle svg {
        width: 56px;
        height: 56px;
    }

    .spinner-badge {
        bottom: 8px;
        right: 8px;
        width: 34px;
        height: 34px;
    }

    .spinner {
        width: 20px;
        height: 20px;
        border-width: 3px;
    }

    .empty-title {
        font-size: 18px;
    }
}
</style>