<template>
  <header class="site-header">
    <div class="site-header__shell">
      <div class="site-header__inner">
        <!-- Left: Brand + Desktop Nav -->
        <div class="site-header__left">
          <router-link to="/" class="brand-link">
            <img
              class="brand-logo"
              :src="BRAND_LOGO_SRC"
              :alt="text.logoAlt"
              width="32"
              height="32"
            />
            <div class="brand-text">
              <span class="brand-title">{{ text.brand }}</span>
              <span class="brand-slogan">{{ text.slogan }}</span>
            </div>
          </router-link>

          <nav class="site-header__nav site-header__nav--desktop" aria-label="main">
            <router-link to="/" class="nav-link">
              {{ text.vacanciesNav }}
            </router-link>
            <router-link to="/" class="nav-link">
              {{ text.resumesNav }}
            </router-link>
            <router-link to="/companies" class="nav-link">
              {{ text.organizationsNav }}
            </router-link>
          </nav>
        </div>

        <!-- Right: Actions + Hamburger -->
        <div class="site-header__tail">
          <div class="site-header__actions-scroll">
            <div class="site-header__actions">
              <button type="button" class="help-btn" :aria-label="text.helpAria">?</button>

              <div ref="dropdownRef" class="lang-dropdown">
                <button
                  type="button"
                  class="lang-trigger"
                  @click="langOpen = !langOpen"
                >
                  <span class="lang-trigger__label">{{ activeLangLabel }}</span>
                  <svg
                    class="lang-trigger__chev"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    aria-hidden="true"
                  >
                    <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                  </svg>
                </button>

                <div v-if="langOpen" class="lang-panel" role="listbox">
                  <button
                    v-for="option in langOptions"
                    :key="option.code"
                    type="button"
                    :class="['lang-option', lang === option.code ? 'lang-option--active' : '']"
                    role="option"
                    :aria-selected="lang === option.code"
                    @click="handleSelectLang(option.code)"
                  >
                    <span class="lang-option__text">{{ option.label }}</span>
                    <span v-if="lang === option.code" class="lang-option__check" aria-hidden="true">✓</span>
                  </button>
                </div>
              </div>

              <router-link to="/saved" class="heart-link">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </router-link>

              <router-link to="/register" class="login-btn">
                {{ text.login }}
              </router-link>
            </div>
          </div>

          <button
            type="button"
            class="nav-toggle"
            :aria-expanded="mobileNavOpen"
            :aria-label="menuAriaLabel"
            @click="mobileNavOpen = !mobileNavOpen"
          >
            <span class="nav-toggle__bar" />
            <span class="nav-toggle__bar" />
            <span class="nav-toggle__bar" />
          </button>
        </div>
      </div>

      <Teleport to="body">
        <div
          v-if="mobileNavOpen && isMobileLayout"
          class="site-header__drawer-backdrop"
          @click="mobileNavOpen = false"
        >
          <aside
            class="site-header__drawer"
            role="navigation"
            :aria-label="text.mainNav"
            @click.stop
          >
            <div class="site-header__drawer-header">
              <button
                type="button"
                class="drawer-close"
                :aria-label="text.ariaCloseMenu"
                @click="mobileNavOpen = false"
              >
                ✕
              </button>
            </div>

            <nav class="site-header__drawer-nav" aria-label="main">
              <router-link to="/" class="nav-link nav-link--drawer">
                {{ text.vacanciesNav }}
              </router-link>
              <router-link to="/" class="nav-link nav-link--drawer">
                {{ text.resumesNav }}
              </router-link>
              <router-link to="/companies" class="nav-link nav-link--drawer">
                {{ text.organizationsNav }}
              </router-link>
            </nav>

            <div class="drawer-lang" role="group" aria-label="language selector">
              <button
                v-for="option in langOptions"
                :key="`drawer-${option.code}`"
                type="button"
                :class="['drawer-lang__option', lang === option.code ? 'drawer-lang__option--active' : '']"
                @click="handleSelectLang(option.code)"
              >
                <span>{{ option.label }}</span>
                <span v-if="lang === option.code" aria-hidden="true">✓</span>
              </button>
            </div>

            <router-link
              to="/register"
              class="login-btn drawer-login-btn drawer-login-link"
            >
              {{ text.login }}
            </router-link>
          </aside>
        </div>
      </Teleport>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const BRAND_LOGO_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2304afc3'/%3E%3Cpath fill='none' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' d='M9 16l5 5 9-10'/%3E%3C/svg%3E"

const FALLBACK_TEXT = {
  brand: 'OSON ISH',
  slogan: 'BIZ BILAN BARCHASI OSON',
  logoAlt: 'OSON ISH logo',
  vacanciesNav: "Bo'sh ish o'rinlari",
  resumesNav: 'Rezyumelar',
  organizationsNav: 'Tashkilotlar',
  helpAria: 'Yordam',
  login: 'Kirish',
  langOptionUzb: "O'zb",
  langOptionRus: 'Рус',
  langOptionEng: 'Eng',
  ariaOpenMenu: 'Open menu',
  ariaCloseMenu: 'Close menu',
  mainNav: 'Main navigation',
}

const props = defineProps({
  t: { type: Object, default: () => ({}) },
  lang: { type: String, default: 'uz' },
  setLang: { type: Function, default: () => {} },
})

const router = useRouter()
const route = useRoute()

const text = computed(() => ({ ...FALLBACK_TEXT, ...props.t }))

const langOpen = ref(false)
const mobileNavOpen = ref(false)
const isMobileLayout = ref(false)
const dropdownRef = ref(null)

const langOptions = computed(() => [
  { code: 'uz', label: text.value.langOptionUzb },
  { code: 'ru', label: text.value.langOptionRus },
  { code: 'en', label: text.value.langOptionEng },
])

const activeLangLabel = computed(() => {
  const found = langOptions.value.find((o) => o.code === props.lang)
  return found ? found.label : text.value.langOptionUzb
})

const menuAriaLabel = computed(() =>
  mobileNavOpen.value ? text.value.ariaCloseMenu : text.value.ariaOpenMenu
)



function handleSelectLang(code) {
  props.setLang(code)
  langOpen.value = false
}

function updateLayoutFlags() {
  isMobileLayout.value = window.matchMedia('(max-width: 1023px)').matches
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape' && mobileNavOpen.value) {
    mobileNavOpen.value = false
  }
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    langOpen.value = false
  }
}

watch(langOpen, (val) => {
  if (val) {
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

watch(isMobileLayout, (val) => {
  if (!val) mobileNavOpen.value = false
})

watch(() => route.path, () => {
  mobileNavOpen.value = false
})

watch(
  [mobileNavOpen, isMobileLayout],
  ([navOpen, isMobile]) => {
    document.body.style.overflow = navOpen && isMobile ? 'hidden' : ''
  }
)

onMounted(() => {
  updateLayoutFlags()
  window.addEventListener('resize', updateLayoutFlags)
  document.addEventListener('keydown', onDocumentKeydown)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateLayoutFlags)
  document.removeEventListener('keydown', onDocumentKeydown)
  document.removeEventListener('mousedown', handleClickOutside)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.site-header {
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --color-nav-underline: #6366f1;
  --color-text: #1a1a1a;
  --color-text-secondary: #2d3742;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-teal: #00a3bf;
  --color-teal-dark: #0891b2;
  --header-pad-x: clamp(4px, 1.6vw, 0.6cm);
  --brand-copy-width: 15ch;

  width: 100%;
  border-bottom: 1px solid var(--color-border);
  background: #f3f4f6;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.site-header__shell {
  width: 100%;
  max-width: min(1420px, 96vw);
  margin-inline: auto;
}

.site-header__inner {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(1.35rem, 3vw, 2.6rem);
  min-height: calc(clamp(3.65rem, 5.5vw, 4.25rem) + 20px);
  padding-inline: var(--header-pad-x);
  padding-block: clamp(0.35rem, 1vw, 0.6rem);
}

.site-header__left {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(1.2rem, 2.6vw, 2.4rem);
  min-width: 0;
  flex: 0 1 auto;
}

.brand-link {
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(0.5rem, 1.25vw, 0.65rem);
  min-width: 0;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
  max-width: 50%;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.brand-logo {
  display: block;
  flex-shrink: 0;
  width: clamp(2.15rem, 3.75vw, 2.5rem);
  height: clamp(2.15rem, 3.75vw, 2.5rem);
}

.brand-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: var(--brand-copy-width);
  max-width: var(--brand-copy-width);
  min-width: var(--brand-copy-width);
  text-align: left;
}

.brand-title {
  display: block;
  align-self: flex-start;
  width: var(--brand-copy-width);
  max-width: var(--brand-copy-width);
  font-size: clamp(1.3rem, 1.05vw + 0.9rem, 1.6rem);
  font-weight: 800;
  letter-spacing: -0.028em;
  color: var(--color-text);
  line-height: 1.12;
  white-space: nowrap;
}

.brand-slogan {
  display: block;
  align-self: flex-start;
  width: var(--brand-copy-width);
  max-width: var(--brand-copy-width);
  min-width: var(--brand-copy-width);
  margin-top: 0.14em;
  font-size: 7px;
  font-weight: 500;
  letter-spacing: 0.012em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  line-height: 1.25;
  white-space: nowrap;
}

.site-header__nav--desktop {
  display: none;
  align-items: center;
  gap: clamp(1rem, 2.2vw, 1.9rem);
}

@media (min-width: 1024px) {
  .site-header__nav--desktop {
    display: flex;
  }
}

.nav-link {
  position: relative;
  display: inline-block;
  padding-bottom: 0.2em;
  font-size: clamp(0.8125rem, 0.32vw + 0.7rem, 0.875rem);
  font-weight: 500;
  letter-spacing: -0.011em;
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--color-nav-underline);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.28s ease;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link:hover {
  color: #0f766e;
}

.nav-link--drawer {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: 0.65rem 0;
  font-size: clamp(1rem, 0.4vw + 0.88rem, 1.12rem);
}

.site-header__tail {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(1rem, 2.3vw, 1.8rem);
  margin-left: auto;
  min-width: 0;
  flex: 1 1 auto;
  justify-content: flex-end;
}

@media (min-width: 1024px) {
  .site-header__tail {
    flex: 0 0 auto;
  }
}

.site-header__actions-scroll {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  justify-content: flex-end;
}

@media (max-width: 479px) {
  .site-header__actions-scroll {
    overflow-x: auto;
    scrollbar-width: none;
    mask-image: linear-gradient(to right, #000 92%, transparent 100%);
  }
  .site-header__actions-scroll::-webkit-scrollbar { display: none; }
}

.site-header__actions {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: clamp(1.3rem, 2.35vw, 2rem);
  margin-left: auto;
}

.help-btn {
  width: clamp(2.15rem, 4vw, 2.45rem);
  height: clamp(2.15rem, 4vw, 2.45rem);
  border: 1px solid #d1d5db;
  border-radius: 50%;
  background: #fff;
  color: var(--color-text-secondary);
  font-size: clamp(0.9375rem, 0.3vw + 0.85rem, 1.0625rem);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.help-btn:hover {
  border-color: var(--color-teal-dark);
  color: var(--color-teal-dark);
  background: #f8fafc;
}

.lang-dropdown { position: relative; }

.lang-trigger {
  display: inline-flex;
  align-items: center;
  gap: clamp(0.12rem, 0.45vw, 0.28rem);
  padding: 0.35em 0;
  border: none;
  background: transparent;
  font-size: clamp(0.9375rem, 0.32vw + 0.82rem, 1rem);
  font-weight: 500;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: color 0.2s ease;
}

.lang-trigger:hover { color: var(--color-teal-dark); }

.lang-panel {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: clamp(8.5rem, 22vw, 10rem);
  padding: 6px 0;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);
  z-index: 50;
}

.lang-option {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: none;
  background: transparent;
  font-size: clamp(0.875rem, 0.28vw + 0.8rem, 0.9375rem);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
}

.lang-option:hover { background: #f8fafc; }

.lang-option--active .lang-option__text { color: #178cf9; }
.lang-option__check { color: #178cf9; font-size: 14px; }

.heart-link {
  display: inline-flex;
  color: var(--color-text-secondary);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: color 0.2s ease;
}

.heart-link:hover { color: var(--color-teal-dark); }

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: clamp(2.15rem, 4vw, 2.45rem);
  min-width: clamp(5.25rem, 18vw, 6.25rem);
  padding-inline: clamp(1.1rem, 3vw, 1.45rem);
  border: 1px solid var(--color-teal);
  border-radius: 10px;
  background: var(--color-teal);
  color: #fff;
  font-size: clamp(0.9375rem, 0.32vw + 0.82rem, 1rem);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  white-space: nowrap;
}

.login-btn:hover { transform: translateY(-2px); }

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: clamp(2.75rem, 6vw, 3rem);
  height: clamp(2.75rem, 6vw, 3rem);
  border: 1px solid #c5cdd6;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
}

@media (max-width: 1023px) {
  .nav-toggle { display: inline-flex; }
  .site-header__actions-scroll { display: none; }
}

.nav-toggle__bar {
  display: block;
  width: 55%;
  height: 2px;
  margin-inline: auto;
  background: #1f2b36;
  border-radius: 1px;
}

.site-header__drawer {
  width: min(88vw, 360px);
  height: 100dvh;
  margin-left: auto;
  background: #f3f4f6;
  border-left: 1px solid var(--color-border);
  padding: clamp(0.5rem, 2vw, 0.85rem) clamp(12px, 3.8vw, 20px);
  display: flex;
  flex-direction: column;
}

.site-header__drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  background: rgba(15, 23, 42, 0.35);
}

.site-header__drawer-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.drawer-close {
  width: 44px;
  height: 44px;
  border: 1px solid #c5cdd6;
  border-radius: 10px;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
}

.site-header__drawer-nav {
  display: flex;
  flex-direction: column;
}

.drawer-lang {
  margin-top: 0.55rem;
  border-top: 1px solid var(--color-border);
  padding-top: 0.55rem;
}

.drawer-lang__option {
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  font-size: clamp(0.95rem, 0.35vw + 0.82rem, 1.05rem);
  cursor: pointer;
}

.drawer-lang__option--active { color: #178cf9; }

.drawer-login-btn {
  width: 100%;
  margin-top: auto;
  min-height: 44px;
}
</style>
