<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { isDark } from "../../composables/useTheme";
import Divider from "../Divider.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({
  activeTheme: String,
  glowIntensity: Number,
});

const getThemeColor = () => {
  if (props.activeTheme === "techno") return "6, 182, 212";
  if (props.activeTheme === "viking") return "220, 38, 38";
  if (props.activeTheme === "happy") return "236, 72, 153";
  return "255, 255, 255";
};

const { t, locale } = useI18n();
// انیمیشن بر اساس IntersectionObserver
const sectionVisibility = ref([false, false, false, false, false, false]);
const sectionRefs = ref([]); // ذخیرهٔ رفرنس هر المان
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const idx = sectionRefs.value.indexOf(target);
        if (isIntersecting && idx >= 0) {
          sectionVisibility.value[idx] = true;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.2 },
  );
  sectionRefs.value.forEach((el) => el && observer.observe(el));
});

onUnmounted(() => {
  observer.disconnect();
});

const WEB3FORMS_ACCESS_KEY = "47772d95-1a04-4142-ba31-34d773c16d15";

const name = ref("");
const email = ref("");
const message = ref("");
const phone = ref("");
const showThankYouMessage = ref(false);
const thankYouText = ref("");

const submitForm = async () => {
  thankYouText.value = message.value.trim() ? t("contact.thanks") : t("contact.empty");
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    }),
  });

  const result = await response.json();
  if (result.success) {
    console.log(result);
    showThankYouMessage.value = true; // نمایش پیام
    setTimeout(() => {
      showThankYouMessage.value = false; // محو کردن پیام بعد از 2 ثانیه
    }, 4000);
  }
};

const handlePhoneInput = (e) => {
  let input = e.target.value;
  const hasPlusAtStart = input.charAt(0) === "+";

  if (hasPlusAtStart) {
    input = "+" + input.slice(1).replace(/[^\d]/g, "");
  } else {
    input = input.replace(/\D/g, "");
  }

  input = input.substring(0, 15);

  phone.value = input;
};
</script>

<template>
  <div class="grid grid-cols-12">
    <!-- <div class="col-span-full flex justify-center">
      <div
        :class="[
          'uppercase px-14 py-3 text-xl font-semibold transition-all duration-500',
          activeTheme
            ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
            : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
        ]">
        {{ activeTheme ? t('contact.sysTitle') : t('contact.title') }}
      </div>
    </div> -->
    <!-- skils -->
    <div :ref="(el) => (sectionRefs[0] = el)" class="col-span-full flex mt-20 justify-center animate-section" :class="{ visible: sectionVisibility[0] }">
      <p
        :class="[
          'col-span-3 w-1/2 text-center transition-all duration-500',
          activeTheme ? 'font-mono text-cyan-400/80 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] tracking-wide' : 'text-neutral-700 dark:text-neutral-300',
        ]">
        {{ t('contact.desc1') }}
        <span :class="[activeTheme ? 'text-white font-bold ' : 'text-lg font-semibold']">{{ t('contact.desc2') }}</span>
      </p>
    </div>
    <div class="col-span-full flex justify-center mb-20 mt-20 relative">
      <div v-if="activeTheme" class="absolute inset-0 radar-bg pointer-events-none"></div>

      <form
        @submit.prevent="submitForm"
        class="flex flex-col w-1/3 gap-10 relative z-10 p-8 rounded-xl transition-all duration-300"
        :class="{ 'nightclub-mode': activeTheme }"
        :style="activeTheme ? { '--glow-intensity': glowIntensity, '--theme-rgb': getThemeColor() } : {}">
        <div :ref="(el) => (sectionRefs[2] = el)" class="animate-section" :class="{ visible: sectionVisibility[2] }">
          <input
            :class="[
              'w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none transition-all duration-300',
              activeTheme
                ? 'terminal-input'
                : (locale === 'fa' ? 'border-r-4 border-b-4' : 'border-l-4 border-b-4') + ' border-neutral-900 dark:border-neutral-100 border-solid bg-transparent',
            ]"
            :placeholder="t('contact.name')"
            type="text"
            name="name"
            v-model="name"
            required
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[3] = el)" class="animate-section" :class="{ visible: sectionVisibility[3] }">
          <input
            :class="[
              'w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none transition-all duration-300',
              activeTheme
                ? 'terminal-input'
                : (locale === 'fa' ? 'border-r-4 border-b-4' : 'border-l-4 border-b-4') + ' border-neutral-900 dark:border-neutral-100 border-solid bg-transparent',
            ]"
            :placeholder="t('contact.email')"
            type="email"
            name="email"
            v-model="email"
            required
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[4] = el)" class="animate-section" :class="{ visible: sectionVisibility[4] }">
          <input
            @input="handlePhoneInput"
            :class="[
              'w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none transition-all duration-300',
              activeTheme
                ? 'terminal-input'
                : (locale === 'fa' ? 'border-r-4 border-b-4' : 'border-l-4 border-b-4') + ' border-neutral-900 dark:border-neutral-100 border-solid bg-transparent',
            ]"
            :placeholder="t('contact.phone')"
            type="text"
            name="phone"
            v-model="phone"
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[5] = el)" class="animate-section" :class="{ visible: sectionVisibility[5] }">
          <textarea
            :class="[
              'w-full ps-5 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none transition-all duration-300',
              activeTheme
                ? 'terminal-input'
                : (locale === 'fa' ? 'border-r-4 border-b-4' : 'border-l-4 border-b-4') + ' border-neutral-900 dark:border-neutral-100 border-solid bg-transparent',
            ]"
            :placeholder="t('contact.message')"
            name="message"
            rows="5"
            v-model="message"
            autocomplete="off"></textarea>
        </div>

        <div class="flex justify-center items-center h-20 flex-col mt-4">
          <div class="h-2/3 w-1/2">
            <button
              type="submit"
              role="button"
              class="button-send w-full"
              :class="activeTheme ? 'terminal-btn' : '!text-neutral-900 dark:!text-neutral-100 !border-neutral-900 dark:!border-neutral-100'">
              {{ activeTheme ? t('contact.sysSend') : t('contact.send') }}
            </button>
          </div>
          <div
            v-show="showThankYouMessage"
            class="thank-you-message text-center h-1/3 mt-6 flex items-center justify-center gap-2"
            :class="{ visible: showThankYouMessage, 'terminal-success': activeTheme }">
            <p class="text-sm">{{ activeTheme ? t('contact.sysThanks') : thankYouText }}</p>
            <svg v-if="!activeTheme" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-5 fill-red-600">
              <path
                d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
            </svg>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.animate-section {
  opacity: 0;
  transform: translateY(50px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.animate-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.button-send {
  --b: 3px; /* border thickness */
  --s: 0.45em; /* size of the corner */
  --color: currentColor; /* color of the button */

  padding: calc(0.5em + var(--s)) calc(0.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background: conic-gradient(from 90deg at var(--b) var(--b), #0000 90deg, var(--color) 0) var(--_p) var(--_p) / calc(100% - var(--b) - 2 * var(--_p))
    calc(100% - var(--b) - 2 * var(--_p));
  transition:
    0.3s linear,
    color 0s,
    background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: 0.6em;
  font-size: 16px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-send:hover,
.button-send:focus-visible {
  --_p: 0px;
  outline-color: var(--color);
  outline-offset: 0.05em;
}

.button-send:active {
  background: var(--color);
  color: #fff;
}

.thank-you-message {
  opacity: 0;
  transform: translateY(-10px);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

.thank-you-message.visible {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s ease-in,
    transform 0.5s ease-in;
}

form:not(.nightclub-mode) .w-full:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* ========================================= */
/* Nightclub Mode: Secure Commlink Terminal  */
/* ========================================= */

.nightclub-mode {
  background-color: rgba(10, 10, 10, 0.6);
  border: 1px solid rgba(var(--theme-rgb), 0.2);
  box-shadow: 0 0 calc(20px + var(--glow-intensity) * 30px) rgba(var(--theme-rgb), 0.1);
}

/* پس‌زمینه رادار فرم */
.radar-bg {
  background-image: linear-gradient(rgba(var(--theme-rgb), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--theme-rgb), 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: calc(0.2 + var(--glow-intensity) * 0.5);
  mask-image: radial-gradient(circle, black 30%, transparent 70%);
}

/* استایل فیلدهای فرم (ترمینال) */
.terminal-input {
  background-color: rgba(0, 0, 0, 0.5) !important;
  border: none;
  border-bottom: 2px solid rgba(var(--theme-rgb), 0.5);
  border-left: 2px solid rgba(var(--theme-rgb), 0.5);
  color: rgb(var(--theme-rgb));
  font-family: monospace;
  letter-spacing: 1px;
}

.terminal-input::placeholder {
  color: rgba(var(--theme-rgb), 0.4);
  font-family: monospace;
}

.terminal-input:focus {
  background-color: rgba(var(--theme-rgb), 0.1) !important;
  border-color: rgb(var(--theme-rgb));
  /* تقویت شدید سایه نئونی فیلد هنگام فوکوس با ضریب بالاتر */
  box-shadow:
    0 0 calc(15px + var(--glow-intensity) * 35px) rgba(var(--theme-rgb), calc(0.4 + var(--glow-intensity) * 0.6)),
    0 0 calc(5px + var(--glow-intensity) * 10px) #fff,
    inset 0 0 calc(10px + var(--glow-intensity) * 20px) rgba(var(--theme-rgb), 0.3);
  /* یک ترانزیشن فوق‌العاده سریع برای اینکه کوبش بیس بی‌معطلی روی سایه بنشیند */
  transition: box-shadow 0.05s ease-out;
}

/* تغییر رنگ پس‌زمینه فیلدهای اتوفیل مرورگر */
.terminal-input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px rgba(10, 10, 10, 1) inset !important;
  -webkit-text-fill-color: rgb(var(--theme-rgb)) !important;
}

/* دکمه Send (ترمینال) */
.terminal-btn {
  --color: rgb(var(--theme-rgb));
  color: var(--color) !important;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 2px;
  /* درخشش دکمه با موزیک */
  box-shadow: 0 0 calc(var(--glow-intensity) * 25px) rgba(var(--theme-rgb), 0.8);
}

.terminal-btn:hover {
  background-color: rgba(var(--theme-rgb), 0.2);
  text-shadow: 0 0 8px rgb(var(--theme-rgb));
}

.terminal-btn:active {
  background-color: rgb(var(--theme-rgb));
  color: #000 !important;
}

/* پیام موفقیت (گلیچ هکری) */
.terminal-success {
  color: #39ff14; /* سبز فسفری */
  font-family: monospace;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(57, 255, 20, 0.8);
  letter-spacing: 1px;
}
</style>
