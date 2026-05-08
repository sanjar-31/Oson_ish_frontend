<template>
  <footer class="site-footer">

    <!-- ── SECTION 1: TOP AREA ─────────────────────────────── -->
    <div class="footer-top">

      <!-- LEFT: Logo block -->
      <router-link to="/" class="footer-logo-link">
        <div class="footer-logo-icon">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="21" fill="#00b4cc"/>
            <path d="M12 21.5L18.5 28L30.5 15" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="footer-logo-text">
          <span class="footer-logo-title">OSON ISH</span>
          <span class="footer-logo-sub">BIZ BILAN BARCHASI OSON</span>
        </div>
      </router-link>

      <!-- RIGHT: Two columns -->
      <div class="footer-right-cols">

        <!-- Column 1: Contact info -->
        <div class="footer-col">
          <p class="footer-col-heading">Biz bilan bog'laning:</p>

          <!-- Phone numbers -->
          <div class="contact-row">
            <!-- Phone icon -->
            <span class="contact-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1C5.92 21 1 16.08 1 10a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.21z" fill="#00b4cc"/>
              </svg>
            </span>
            <div class="phone-list">
              <a href="tel:+998712000140" class="contact-phone">+998 (71) 200-01-40</a>
              <a href="tel:+998712030140" class="contact-phone">+998 (71) 203-01-40</a>
              <a href="tel:+998712040140" class="contact-phone">+998 (71) 204-01-40</a>
            </div>
          </div>

          <!-- Email -->
          <div class="contact-row contact-row--email">
            <span class="contact-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#00b4cc" stroke-width="2" fill="none"/>
                <path d="M2 8l10 7 10-7" stroke="#00b4cc" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </span>
            <a href="mailto:info@mehnat.uz" class="contact-email">info@mehnat.uz</a>
          </div>
        </div>

        <!-- Column 2: Social media -->
        <div class="footer-col">
          <p class="footer-col-heading">Ijtimoiy tarmoqlarda kuzating:</p>

          <!-- Social icons row -->
          <div class="social-icons-row">
            <!-- Telegram -->
            <a href="https://t.me/quliyev_sanjar" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Telegram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.94 4.45L18.73 19.6c-.23 1.03-.85 1.28-1.72.8l-4.75-3.5-2.29 2.2c-.25.25-.47.46-.97.46l.34-4.83 8.82-7.97c.38-.34-.08-.53-.59-.19L6.12 14.53l-4.67-1.46c-1.02-.32-1.04-1.02.21-1.51L20.41 3c.85-.31 1.59.19 1.53 1.45z" fill="#ffffff"/>
              </svg>
            </a>
            <!-- Twitter/X -->
            <a href="#" class="social-btn" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#ffffff"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="#" class="social-btn" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#ffffff" stroke-width="2"/>
                <circle cx="12" cy="12" r="5" stroke="#ffffff" stroke-width="2"/>
                <circle cx="17.5" cy="6.5" r="1.5" fill="#ffffff"/>
              </svg>
            </a>
            <!-- Facebook -->
            <a href="#" class="social-btn" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>

          <!-- Moderator button -->
          <a href="#" class="moderator-btn">Moderator sifatida kirish</a>
        </div>

      </div>
    </div>

    <!-- ── SECTION 2: DIVIDER ──────────────────────────────── -->
    <div class="footer-divider"></div>

    <!-- ── SECTION 3: BOTTOM BAR ──────────────────────────── -->
    <div class="footer-bottom">
      <span class="footer-copy">© Barcha huquqlar himoyalangan 2025</span>
      <div class="footer-bottom-links">
        <a href="#" class="footer-link">Maxfiylik siyosati</a>
        <a href="#" class="footer-link">Foydalanuvchi kelishuvi</a>
      </div>
    </div>

  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* ── Root ─────────────────────────────────────────────────── */
.site-footer {
  background-color: #152433;
  font-family: 'Inter', sans-serif;
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px 16px 0 0; /* Fix 9: Rounded top-left and top-right corners */
}

/* ── Section 1: Top Area ──────────────────────────────────── */
.footer-top {
  max-width: 1280px;
  margin: 0 auto;
  padding: 52px 32px 44px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}

/* ── Logo ─────────────────────────────────────────────────── */
.footer-logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  flex-shrink: 0;
}

.footer-logo-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.footer-logo-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.footer-logo-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.06em;
  line-height: 1;
  text-transform: uppercase;
}

.footer-logo-sub {
  font-size: 9px;
  font-weight: 400;
  color: #8fa5ba;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1;
}

/* ── Right columns container ──────────────────────────────── */
.footer-right-cols {
  display: flex;
  gap: 72px;
  align-items: flex-start;
}

/* ── Column shared ────────────────────────────────────────── */
.footer-col {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-col-heading {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

/* ── Contact rows ─────────────────────────────────────────── */
.contact-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.contact-row--email {
  align-items: center;
}

.contact-icon {
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
  flex-shrink: 0;
}

.contact-row--email .contact-icon {
  padding-top: 0;
  align-items: center;
}

.phone-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-phone {
  font-size: 13px;
  font-weight: 400;
  color: #ccd8e4;
  text-decoration: none;
  line-height: 1.55;
  transition: color 0.3s ease;
}

.contact-phone:hover {
  color: #00b4cc;
}

.contact-email {
  font-size: 13px;
  font-weight: 400;
  color: #ccd8e4;
  text-decoration: none;
  transition: color 0.3s ease;
  line-height: 1;
}

.contact-email:hover {
  color: #00b4cc;
}

/* ── Social icons ─────────────────────────────────────────── */
.social-icons-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background-color: #1e3248;
  text-decoration: none;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
}

.social-btn:hover {
  background-color: #274260;
}

/* ── Moderator button ─────────────────────────────────────── */
.moderator-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border: 1px solid #3a5068;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #ccd8e4;
  text-decoration: none;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease;
  align-self: flex-start;
  white-space: nowrap;
  font-family: 'Inter', sans-serif;
}

.moderator-btn:hover {
  border-color: #00b4cc;
  color: #00b4cc;
  background-color: rgba(0, 180, 204, 0.06);
}

/* ── Section 2: Divider ───────────────────────────────────── */
.footer-divider {
  width: 100%;
  height: 1px;
  background-color: #243547;
  margin: 0;
}

/* ── Section 3: Bottom Bar ────────────────────────────────── */
.footer-bottom {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;   
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.footer-copy {
  font-size: 12px;
  font-weight: 400;
  color: #5b7489;
  line-height: 1;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.footer-link {
  font-size: 12px;
  font-weight: 400;
  color: #00b4cc;
  text-decoration: none;
  line-height: 1;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #33cce0;
}

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 900px) {
  .footer-top {
    flex-direction: column;
    gap: 36px;
    padding: 40px 24px 32px;
  }

  .footer-right-cols {
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 24px;
  }
}

@media (max-width: 480px) {
  .footer-top {
    padding: 32px 16px 28px;
  }

  .footer-bottom {
    padding: 16px;
  }

  .footer-bottom-links {
    gap: 18px;
  }
}
</style>
