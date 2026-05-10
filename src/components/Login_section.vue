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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <circle cx="12" cy="14" r="2"></circle>
                    <path d="M16 21v-1a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1"></path>
                  </svg>
                </div>
                <span class="role-text">Ish izlovchi sifatida kirish</span>
              </div>
              <svg v-if="selectedRole !== 'seeker'" class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <circle cx="18" cy="11" r="3"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M19 8a4 4 0 0 0-3-3.87"></path>
                  </svg>
                </div>
                <span class="role-text">Ish beruvchi sifatida kirish</span>
              </div>
              <svg v-if="selectedRole !== 'employer'" class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              <h2 class="section-title">Ro'yxatdan o'tish</h2>
              
              <div class="tabs-container">
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
                <transition name="fade" mode="out-in">
                  <!-- Phone Form -->
                  <div v-if="activeTab === 'phone'" key="phone" class="tab-content">
                    <div class="input-group">
                      <label class="input-label">Telefon raqami</label>
                      <div class="phone-input-wrapper" :class="{ 'error': phoneError, 'success': isPhoneValid && !phoneError }">
                        <span class="prefix">🇺🇿 +998</span>
                        <input 
                          type="text" 
                          v-model="phone"
                          @input="onPhoneInput"
                          placeholder="__ ___-__-__"
                          class="phone-input"
                          maxlength="7"
                        />
                      </div>
                      <p v-if="phoneError" class="error-text">{{ phoneError }}</p>
                    </div>

                    <div class="input-group">
                      <label class="input-label">Kodni olish usuli</label>
                      <div class="radio-group">
                        <label class="radio-label">
                          <input type="radio" v-model="codeMethod" value="sms" class="radio-input" />
                          <span class="radio-custom"></span>
                          SMS-kod
                        </label>
                        <label class="radio-label">
                          <input type="radio" v-model="codeMethod" value="telegram" class="radio-input" />
                          <span class="radio-custom"></span>
                          Telegram-kod
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Email Form -->
                  <div v-else key="email" class="tab-content">
                    <div class="input-group">
                      <label class="input-label">Elektron pochta</label>
                      <input 
                        type="email" 
                        v-model="email"
                        placeholder="example@email.com"
                        class="text-input"
                        :class="{ 'error': emailError, 'success': isEmailValidFormat && !emailError && email.length > 0 }"
                        @input="validateEmailOnInput"
                      />
                      <p v-if="emailError" class="error-text">{{ emailError }}</p>
                    </div>
                  </div>
                </transition>

                <button class="submit-btn" @click="submitForm">Kodni yuborish</button>

                <div class="separator">
                  <span>yoki</span>
                </div>

                <button class="social-btn google-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </button>
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
    isPhoneValid() {
      return this.phone.length === 7;
    },
    isEmailValidFormat() {
      if (!this.email) return false;
      if (this.email.includes(' ')) return false;
      const parts = this.email.split('@');
      if (parts.length !== 2) return false;
      if (parts[0].length < 2) return false;
      const domainParts = parts[1].split('.');
      if (domainParts.length < 2 || domainParts.some(p => p.length === 0)) return false;
      return true;
    }
  },
  methods: {
    selectRole(role) {
      this.selectedRole = role;
      this.activeTab = 'phone';
      this.clearErrors();
    },
    switchTab(tab) {
      this.activeTab = tab;
      this.clearErrors();
      this.phone = '';
      this.email = '';
    },
    onPhoneInput(event) {
      // Allow only digits
      const val = event.target.value.replace(/\D/g, '');
      this.phone = val.slice(0, 7);
      
      // Real-time border update logic
      if (this.phone.length > 0 && this.phone.length < 7) {
        this.phoneError = ''; 
      } else if (this.phone.length === 7) {
        this.phoneError = '';
      }
    },
    validatePhone() {
      if (this.phone.length < 7) {
        this.phoneError = "Telefon raqami to'liq kiritilishi kerak (7 ta raqam)";
        return false;
      }
      this.phoneError = "";
      return true;
    },
    validateEmail() {
      if (!this.email) {
        this.emailError = "Email manzilni kiriting";
        return false;
      }
      if (this.email.includes(' ')) {
        this.emailError = "Email manzilda bo'shliq bo'lmasligi kerak";
        return false;
      }
      
      // Strict format: min 2 chars before @, domain with dot after @
      const parts = this.email.split('@');
      if (parts.length !== 2 || parts[0].length < 2) {
        this.emailError = "Email manzil noto'g'ri formatda";
        return false;
      }
      
      const domainParts = parts[1].split('.');
      if (domainParts.length < 2 || domainParts.some(p => p.length === 0)) {
        this.emailError = "Email manzil noto'g'ri formatda";
        return false;
      }
      
      this.emailError = "";
      return true;
    },
    validateEmailOnInput() {
      if (this.email.length > 0) {
        this.emailError = "";
      }
    },
    clearErrors() {
      this.phoneError = '';
      this.emailError = '';
    },
    submitForm() {
      let isValid = false;
      if (this.activeTab === 'phone') {
        isValid = this.validatePhone();
      } else {
        isValid = this.validateEmail();
      }

      if (isValid) {
        console.log('Form submitted successfully:', {
          role: this.selectedRole,
          tab: this.activeTab,
          data: this.activeTab === 'phone' ? this.phone : this.email,
          method: this.activeTab === 'phone' ? this.codeMethod : null
        });
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --color-primary: #1a9fa0;
  --color-primary-light: #e8f5f5;
  --color-heading: #1a3c4d;
  --color-page-bg: #f0f2f5;
  --color-card-bg: #ffffff;
  --color-border: #e2e8f0;
  --color-text-muted: #9e9e9e;
  --color-tab-bg: #f5f5f5;
  --color-error: #e53e3e;
  --color-success: #38a169;
}

.login-container {
  width: 100%;
  max-width: 480px;
  transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', sans-serif;
}

.login-container.expanded {
  max-width: 900px;
}

.login-card {
  background: var(--color-card-bg);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 40px;
  transition: all 0.4s ease;
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

.section-title {
  color: var(--color-heading);
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
}

/* Role Section Styles */
.role-section {
  display: flex;
  flex-direction: column;
}

.role-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.role-btn {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.role-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.role-btn.active {
  background: var(--color-primary-light);
  border: 1.5px solid var(--color-primary);
}

.role-btn-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-wrapper {
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.role-text {
  color: var(--color-primary);
  font-weight: 500;
  font-size: 15px;
}

.arrow-icon {
  color: var(--color-text-muted);
}

/* Form Section Styles */
.form-section {
  display: flex;
  position: relative;
}

.divider-v {
  width: 1px;
  background: var(--color-border);
  margin: 0 40px;
}

.form-content {
  flex: 1;
}

.tabs-container {
  background: var(--color-tab-bg);
  padding: 4px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
}

.tab-btn {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-muted);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: white;
  color: var(--color-primary);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 13px;
  color: #4a5568;
  margin-bottom: 8px;
}

.phone-input-wrapper {
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0 16px;
  height: 52px;
  transition: all 0.2s ease;
}

.phone-input-wrapper.error {
  border-color: var(--color-error);
}

.phone-input-wrapper.success {
  border-color: var(--color-success);
}

.prefix {
  font-size: 15px;
  color: #1a202c;
  margin-right: 8px;
  white-space: nowrap;
}

.phone-input {
  border: none;
  background: transparent;
  font-size: 15px;
  width: 100%;
  outline: none;
  letter-spacing: 1px;
}

.text-input {
  width: 100%;
  height: 52px;
  background: #f8fafc;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0 16px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;
}

.text-input:focus {
  border-color: var(--color-primary);
}

.text-input.error {
  border-color: var(--color-error);
}

.text-input.success {
  border-color: var(--color-success);
}

.error-text {
  color: var(--color-error);
  font-size: 12px;
  margin-top: 6px;
}

/* Radio Styles */
.radio-group {
  display: flex;
  gap: 24px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
  color: var(--color-heading);
}

.radio-input {
  display: none;
}

.radio-custom {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  position: relative;
  transition: all 0.2s ease;
}

.radio-input:checked + .radio-custom {
  border-color: var(--color-primary);
}

.radio-input:checked + .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
}

/* Buttons */
.submit-btn {
  width: 100%;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.2s ease;
}

.submit-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(26, 159, 160, 0.2);
}

.separator {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: var(--color-text-muted);
  font-size: 14px;
}

.separator::before,
.separator::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-border);
}

.separator span {
  padding: 0 12px;
}

.social-btn {
  width: 100%;
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.social-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Transitions */
.fade-slide-enter-active {
  transition: all 0.3s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container.expanded {
    max-width: 480px;
  }
  
  .expanded .login-grid {
    grid-template-columns: 1fr;
  }
  
  .divider-v {
    display: none;
  }
  
  .form-section {
    padding-top: 40px;
    border-top: 1px solid var(--color-border);
    margin-top: 40px;
  }
  
  .login-card {
    padding: 24px;
  }
  
  .section-title {
    font-size: 18px;
    margin-bottom: 24px;
  }
}
</style>
