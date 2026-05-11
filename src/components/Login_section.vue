<template>
  <div class="login-container" :class="{ 'expanded': selectedRole !== null }">
    <div class="login-card">
      <div class="login-grid">
        <!-- Left Column: Role Selection -->
        <div class="role-section">
          <h2 class="section-title">Foydalanuvchi rolini tanlang</h2>
          
          <div class="role-buttons">
            <button 
              class="role-btn" 
              :class="{ 'active': selectedRole === 'seeker' }"
              @click="selectRole('seeker')"
            >
              <div class="role-btn-content">
                <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <circle cx="12" cy="14" r="2"></circle>
                    <path d="M16 21v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1"></path>
                  </svg>
                </div>
                <span class="role-text">Ish izlovchi sifatida kirish</span>
              </div>
              <svg v-if="selectedRole !== 'seeker'" class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <button 
              class="role-btn" 
              :class="{ 'active': selectedRole === 'employer' }"
              @click="selectRole('employer')"
            >
              <div class="role-btn-content">
                <div class="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <circle cx="18" cy="11" r="3"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M19 8a4 4 0 0 0-3-3.87"></path>
                  </svg>
                </div>
                <span class="role-text">Ish beruvchi sifatida kirish</span>
              </div>
              <svg v-if="selectedRole !== 'employer'" class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        <!-- Right Column: Registration Form -->
        <transition name="fade-slide">
          <div v-if="selectedRole" class="form-section">
            <div class="divider-v"></div>
            <div class="form-content">
              <h2 class="form-title">Ro'yxatdan o'tish</h2>
              
              <div class="tabs-wrapper">
                <div class="tabs">
                  <button 
                    class="tab-btn" 
                    :class="{ 'active': activeTab === 'phone' }"
                    @click="switchTab('phone')"
                  >
                    Telefon raqami
                  </button>
                  <button 
                    class="tab-btn" 
                    :class="{ 'active': activeTab === 'email' }"
                    @click="switchTab('email')"
                  >
                    Elektron pochta
                  </button>
                </div>
              </div>

              <div class="form-body">
                <transition name="fade-fast" mode="out-in">
                  <!-- Phone Form Content -->
                  <div v-if="activeTab === 'phone'" key="phone" class="tab-pane">
                    <div class="input-container">
                      <label class="label">Telefon raqami</label>
                      <div class="phone-box" :class="{ 'error': phoneError, 'success': isPhoneComplete }">
                        <div class="phone-prefix">
                          <span class="flag">🇺🇿</span>
                          <span class="code">+998</span>
                        </div>
                        <input 
                          type="text" 
                          v-model="phone"
                          @input="handlePhoneInput"
                          placeholder="— — — — — — —"
                          class="phone-field"
                        />
                      </div>
                      <p v-if="phoneError" class="error-msg">{{ phoneError }}</p>
                    </div>

                    <div class="input-container">
                      <label class="label">Kodni olish usuli</label>
                      <div class="radio-row">
                        <label class="radio-item">
                          <input type="radio" v-model="codeMethod" value="sms" name="method">
                          <span class="radio-dot"></span>
                          <span class="radio-text">SMS-kod</span>
                        </label>
                        <label class="radio-item">
                          <input type="radio" v-model="codeMethod" value="telegram" name="method">
                          <span class="radio-dot"></span>
                          <span class="radio-text">Telegram-kod</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Email Form Content -->
                  <div v-else key="email" class="tab-pane">
                    <div class="input-container">
                      <label class="label">Elektron pochta</label>
                      <input 
                        type="email" 
                        v-model="email"
                        @input="handleEmailInput"
                        placeholder="example@email.com"
                        class="email-field"
                        :class="{ 'error': emailError, 'success': isEmailValidFormat && email.length > 0 }"
                      />
                      <p v-if="emailError" class="error-msg">{{ emailError }}</p>
                    </div>
                  </div>
                </transition>

                <!-- Actions Section -->
                <div class="actions-stack">
                  <button class="primary-btn" @click="handleSendCode">
                    Kodni yuborish
                  </button>

                  <div class="text-divider">
                    <span class="divider-text">yaki</span>
                  </div>

                  <button class="social-auth-btn google-auth">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <div class="text-divider">
                    <span class="divider-text">yoki e-imzo orqali</span>
                  </div>

                  <div class="info-notice">
                    <div class="info-icon-box">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <p class="info-text">
                      Yuqoridagi usullar orqali kirsangiz, hisobingiz tasdiqlanmagan bo'ladi. To'liq imkoniyatlar uchun e-imzo orqali tasdiqlang.
                    </p>
                  </div>

                  <button class="social-auth-btn oneid-auth">
                    <div class="auth-icon oneid-logo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" fill="#00a3bf" />
                        <path d="M11 17h2v-6h-2v6zm0-8h2V7h-2v2z" fill="white" />
                      </svg>
                    </div>
                    <span>OneID orqali kirish</span>
                  </button>

                  <button class="social-auth-btn eri-auth">
                    <div class="auth-icon eri-logo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00a3bf" stroke-width="2">
                        <path d="M15 7a2 2 0 0 1 2 2m4 0a6 6 0 0 1-7.74 5.74L11 17H9v2H7v2H4a1 1 0 0 1-1-1v-3l3.26-3.26A6 6 0 1 1 21 9z" />
                      </svg>
                    </div>
                    <span>ERI orqali kirish</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginSection',
  data() {
    return {
      selectedRole: null,
      activeTab: 'phone',
      phone: '',
      email: '',
      codeMethod: 'sms',
      phoneError: '',
      emailError: ''
    }
  },
  computed: {
    isPhoneComplete() {
      return this.phone.length === 7;
    },
    isEmailValidFormat() {
      if (!this.email) return false;
      if (this.email.includes(' ')) return false;
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(this.email);
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      // Always default to phone tab when selecting a role
      this.activeTab = 'phone';
      this.resetForms();
    },
    switchTab(tab) {
      this.activeTab = tab;
      this.resetForms();
    },
    resetForms() {
      this.phone = '';
      this.email = '';
      this.phoneError = '';
      this.emailError = '';
    },
    handlePhoneInput(e) {
      // Stripping non-digits and limiting to 7 digits
      const cleaned = e.target.value.replace(/\D/g, '').slice(0, 7);
      this.phone = cleaned;
      this.phoneError = '';
    },
    handleEmailInput() {
      this.emailError = '';
    },
    validatePhone() {
      if (this.phone.length < 7) {
        this.phoneError = "Telefon raqami to'liq kiritilishi kerak (7 ta raqam)";
        return false;
      }
      return true;
    },
    validateEmail() {
      if (!this.email) {
        this.emailError = "Elektron pochta manzilini kiriting";
        return false;
      }
      if (this.email.includes(' ')) {
        this.emailError = "Bo'shliqlar bo'lmasligi kerak";
        return false;
      }
      if (!this.isEmailValidFormat) {
        this.emailError = "Noto'g'ri elektron pochta formati";
        return false;
      }
      return true;
    },
    handleSendCode() {
      if (this.activeTab === 'phone') {
        if (this.validatePhone()) {
          console.log('Sending SMS to:', this.phone);
        }
      } else {
        if (this.validateEmail()) {
          console.log('Sending Email to:', this.email);
        }
      }
    }
  }
}
</script>

<style scoped>
/* Design tokens based on images */
.login-container {
  --color-teal: #00a3bf;
  --color-teal-light: #e6f6f8;
  --color-bg-card: #ffffff;
  --color-bg-page: #f8fafc;
  --color-border: #e5e7eb;
  --color-text-dark: #003d4d;
  --color-text-grey: #6b7280;
  --color-text-muted: #9ca3af;
  --color-error: #ef4444;
  --color-success: #10b981;
  --color-warning-bg: #fff8e6;
  --color-warning-border: #ffe58f;
  --color-warning-text: #856404;
  
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  transition: max-width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-container.expanded {
  max-width: 960px;
}

.login-card {
  background: var(--color-bg-card);
  border-radius: 24px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
  padding: 40px;
  min-height: 500px;
}

.login-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  transition: all 0.4s ease;
}

.expanded .login-grid {
  grid-template-columns: 1fr 1fr;
}

/* Titles */
.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-dark);
  text-align: center;
  margin-bottom: 40px;
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-dark);
  text-align: center;
  margin-bottom: 32px;
}

/* Role Selector */
.role-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.role-btn {
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.25s ease;
}

.role-btn:hover {
  border-color: var(--color-teal);
  background: var(--color-bg-page);
}

.role-btn.active {
  background: var(--color-teal-light);
  border: 1px solid var(--color-teal);
  border-width: 1px;
}

.role-btn-content {
  display: flex;
  align-items: center;
  gap: 14px;
}

.icon-wrapper {
  color: var(--color-text-dark);
}

.role-btn.active .icon-wrapper {
  color: var(--color-teal);
}

.role-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-dark);
}

.arrow-icon {
  color: var(--color-text-muted);
}

/* Form Section */
.form-section {
  display: flex;
}

.divider-v {
  width: 1px;
  background: #f1f5f9;
  margin: 0 48px;
}

.form-content {
  flex: 1;
  width: 100%;
}

/* Tabs */
.tabs-wrapper {
  background: #f1f5f9;
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-grey);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #fff;
  color: var(--color-teal);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Inputs */
.input-container {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-grey);
  margin-bottom: 8px;
}

.phone-box {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0 16px;
  height: 52px;
  transition: border-color 0.2s ease;
}

.phone-box.error { border-color: var(--color-error); }
.phone-box.success { border-color: var(--color-success); }

.phone-prefix {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-right: 12px;
  margin-right: 12px;
  border-right: 1px solid #e2e8f0;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-dark);
}

.phone-field {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 15px;
  outline: none;
  letter-spacing: 1px;
}

.email-field {
  width: 100%;
  height: 52px;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
}

.email-field:focus { border-color: var(--color-teal); }
.email-field.error { border-color: var(--color-error); }
.email-field.success { border-color: var(--color-success); }

.error-msg {
  color: var(--color-error);
  font-size: 12px;
  margin-top: 6px;
}

/* Radios */
.radio-row {
  display: flex;
  gap: 24px;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.radio-item input { display: none; }

.radio-dot {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  position: relative;
  transition: border-color 0.2s ease;
}

.radio-item input:checked + .radio-dot {
  border-color: var(--color-teal);
}

.radio-item input:checked + .radio-dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: var(--color-teal);
  border-radius: 50%;
}

.radio-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-dark);
}

/* Actions Stack */
.actions-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.primary-btn {
  width: 100%;
  background: var(--color-teal);
  color: #fff;
  border: none;
  border-radius: 10px;
  height: 52px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: transform 0.2s ease, filter 0.2s ease;
}

.primary-btn:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
}

.text-divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 11px;
  margin: 12px 0;
}

.text-divider::before,
.text-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #f1f5f9;
}

.divider-text {
  padding: 0 12px;
  text-transform: lowercase;
}

.social-auth-btn {
  width: 100%;
  height: 52px;
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.social-auth-btn:hover {
  background: #f8fafc;
  border-color: var(--color-teal);
}

.auth-icon {
  display: flex;
  align-items: center;
}

/* Info Notice */
.info-notice {
  background: var(--color-warning-bg);
  border: 1px solid var(--color-warning-border);
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  gap: 12px;
  margin: 8px 0;
}

.info-icon-box {
  color: var(--color-warning-text);
  flex-shrink: 0;
  margin-top: 2px;
}

.info-text {
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--color-warning-text);
  margin: 0;
}

/* Animations */
.fade-slide-enter-active {
  transition: all 0.4s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-fast-enter-active, .fade-fast-leave-active {
  transition: opacity 0.15s ease;
}
.fade-fast-enter-from, .fade-fast-leave-to {
  opacity: 0;
}

/* Responsive Logic */
@media (max-width: 1024px) {
  .login-container.expanded { max-width: 800px; }
  .divider-v { margin: 0 32px; }
}

@media (max-width: 768px) {
  .login-container, .login-container.expanded {
    max-width: 100%;
    padding: 0 16px;
  }
  
  .login-card {
    padding: 24px;
    border-radius: 20px;
  }
  
  .expanded .login-grid {
    grid-template-columns: 1fr;
  }
  
  .divider-v {
    display: none;
  }
  
  .form-section {
    flex-direction: column;
    margin-top: 40px;
    padding-top: 40px;
    border-top: 1px solid var(--color-border);
  }
}

@media (max-width: 480px) {
  .login-card { padding: 20px; }
  .section-title, .form-title { font-size: 20px; }
  .radio-row { flex-direction: column; gap: 12px; }
  .phone-prefix { gap: 4px; margin-right: 8px; padding-right: 8px; }
}
</style>
