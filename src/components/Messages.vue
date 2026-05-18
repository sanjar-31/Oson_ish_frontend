<template>
  <div v-if="modelValue" class="messages-overlay">
    <div class="messages-modal" :style="modalStyle">
      <!-- HEADER -->
      <div 
        class="modal-header" 
        @mousedown="startDrag"
      >
        <div class="header-left">
          <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
          </svg>
          <span class="header-title">Chatlar</span>
        </div>
        <div class="header-right">
          <button @click="toggleExpand" class="header-btn" title="Kengaytirish">
            <svg v-if="!isExpanded" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
            </svg>
          </button>
          <button @click="closeModal" class="header-btn" title="Yopish">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- BODY -->
      <div class="modal-body">
        <!-- LEFT COLUMN -->
        <div class="col-left">
          <div class="left-header">
            <h2 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 700; color: #111827;">Chatlar</h2>
            <div class="search-row" style="display: flex !important; align-items: center !important; gap: 8px !important; width: 100% !important; flex-wrap: nowrap !important;">
              <div class="search-input-wrapper" style="position: relative !important; flex: 1 !important; min-width: 0 !important;">
                <svg class="search-icon" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #9ca3af; pointer-events: none; z-index: 2;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  placeholder="Qidirish..." 
                  style="width: 100% !important; height: 40px !important; background: #f3f4f6 !important; border: none !important; border-radius: 12px !important; padding: 0 12px 0 36px !important; font-size: 14px !important; color: #1f2937 !important; outline: none !important; position: relative; z-index: 1;"
                />
              </div>
              <button 
                class="sidebar-filter-btn" 
                style="flex: 0 0 40px !important; width: 40px !important; height: 40px !important; display: flex !important; align-items: center !important; justify-content: center !important; background: #f3f4f6 !important; border: none !important; border-radius: 12px !important; cursor: pointer !important; color: #6b7280 !important; flex-shrink: 0 !important;"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" y1="8" x2="20" y2="8"></line>
                  <line x1="7" y1="12" x2="17" y2="12"></line>
                  <line x1="10" y1="16" x2="14" y2="16"></line>
                </svg>
              </button>
            </div>
          </div>
          <div class="left-content">
            <div class="empty-state-left">
              <div class="empty-icon-wrapper-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
                </svg>
              </div>
              <p>Suhbatlar yo'q</p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="col-right">
          <!-- MESSAGES AREA -->
          <div class="chat-messages">
            <div class="empty-state-right">
              <div class="empty-icon-wrapper-right">
                <svg viewBox="0 0 24 24" fill="none" stroke="#00a3bf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path>
                </svg>
              </div>
              <h3>Suhbat tanlang</h3>
              <p>Xabar yuborish uchun chapdan suhbatni tanlang</p>
            </div>
          </div>

          <!-- BOTTOM BAR -->
          <div class="bottom-bar">
            <div class="message-input-container">
              <input 
                v-model="messageInput" 
                type="text" 
                placeholder="Xabarni yozing..." 
                @keyup.enter="handleSend"
              />
              <button @click="handleSend" class="send-action-btn" title="Yuborish">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'send']);

const messageInput = ref('');

// Validation logic
const validateMessage = () => {
  if (!messageInput.value.trim()) return false;
  return true;
};

const handleSend = () => {
  if (validateMessage()) {
    emit('send', messageInput.value);
    messageInput.value = '';
  }
};

// Expand logic
const isExpanded = ref(false);
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const closeModal = () => {
  emit('update:modelValue', false);
};

// Dragging logic
const isDragging = ref(false);
const modalLeft = ref(null); 
const startX = ref(0);
const initialLeft = ref(0);

const startDrag = (e) => {
  if (isExpanded.value) return;
  isDragging.value = true;
  
  if (modalLeft.value === null) {
    const modalWidth = window.innerWidth >= 900 ? 900 : window.innerWidth * 0.95;
    modalLeft.value = (window.innerWidth - modalWidth) / 2;
  }
  
  startX.value = e.clientX;
  initialLeft.value = modalLeft.value;
  
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
};

const onDrag = (e) => {
  if (!isDragging.value) return;
  
  let newLeft = initialLeft.value + (e.clientX - startX.value);
  const modalWidth = 900;
  const minLeft = 0;
  const maxLeft = Math.max(0, window.innerWidth - modalWidth);
  
  if (newLeft < minLeft) newLeft = minLeft;
  if (newLeft > maxLeft) newLeft = maxLeft;
  
  modalLeft.value = newLeft;
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
};

const modalStyle = computed(() => {
  if (isExpanded.value) {
    return {
      top: '90px',
      left: '0px',
      width: '100vw',
      height: 'calc(100vh - 90px)',
      transform: 'none',
      borderRadius: '0',
      zIndex: 1000
    };
  }
  
  if (modalLeft.value === null) {
    return {
      top: '90px',
      bottom: '10px',
      left: '50%',
      width: '900px',
      transform: 'translateX(-50%)',
      borderRadius: '12px',
      zIndex: 1000
    };
  }

  return {
    top: '90px',
    bottom: '10px',
    left: `${modalLeft.value}px`,
    width: '900px',
    transform: 'none',
    borderRadius: '12px',
    zIndex: 1000
  };
});
</script>

<style scoped>
.messages-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 2000;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.messages-modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  pointer-events: auto;
  transition: width 0.3s ease, height 0.3s ease, top 0.3s ease, left 0.3s ease, transform 0.3s ease, border-radius 0.3s ease;
}

.modal-header {
  height: 52px;
  background: #00a3bf;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  color: #ffffff;
  cursor: move;
  flex-shrink: 0;
  user-select: none;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-left .icon-chat {
  width: 20px;
  height: 20px;
}
.header-title {
  font-weight: 600;
  font-size: 15px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
}

.modal-body {
  display: flex;
  flex: 1;
  min-height: 0;
}

.col-left {
  width: 340px;
  flex-shrink: 0;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

.left-header {
  padding: 20px 20px 12px;
}

.sidebar-filter-btn:hover {
  background: #e5e7eb !important;
}

.left-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-state-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.empty-icon-wrapper-left {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d1d5db;
}
.empty-state-left p {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

.col-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.empty-state-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.empty-icon-wrapper-right {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #f3f4f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.empty-state-right h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
}
.empty-state-right p {
  font-size: 14px;
  color: #9ca3af;
  margin: 0;
}

.bottom-bar {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
}

.message-input-container {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 4px 4px 4px 16px;
  gap: 8px;
}

.message-input-container input {
  flex: 1;
  height: 40px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  color: #1f2937;
}

.send-action-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #00a3bf;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.send-action-btn:hover {
  background: #008fa8;
}

.send-action-btn:active {
  transform: scale(0.95);
}

.send-action-btn svg {
  width: 18px;
  height: 18px;
  transform: translateX(1px);
}
</style>
