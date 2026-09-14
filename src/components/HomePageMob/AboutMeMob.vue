<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { isDark } from "../../composables/useTheme";
import Divider from "../Divider.vue";
import BorderGlow from "../BorderGlow.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({
  isMobile: Boolean,
  activeTheme: String,
  glowIntensity: Number,
});

const { t } = useI18n();

const sectionVisibility = ref([false, false, false, false, false, false, false]);
const sectionRefs = ref([]);
let observer;

const easterEggWords = ["press", "ctrl", "shift", "F"];
const activeWordIndex = ref(-1);

const handleEasterEggMouseMove = (e) => {
  const container = e.currentTarget;
  if (!container) return;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const wordCount = easterEggWords.length;
  const index = Math.floor((x / rect.width) * wordCount);
  activeWordIndex.value = Math.max(0, Math.min(wordCount - 1, index));
};

const handleEasterEggMouseLeave = () => {
  activeWordIndex.value = -1;
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const idx = sectionRefs.value.indexOf(target);
        if (idx !== -1 && isIntersecting) {
          sectionVisibility.value[idx] = true;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sectionRefs.value.forEach((el) => {
    if (el) observer.observe(el);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <div class="grid grid-cols-12">
    <!-- Header Title -->
    <div class="col-span-full">
      <div class="flex justify-center">
        <div
          :class="[
            'uppercase py-3 px-14 text-xl font-semibold transition-all duration-500',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          {{ activeTheme ? t('aboutMe.sysTitle') : t('aboutMe.title') }}
        </div>
      </div>
    </div>

    <!-- Bio Section -->
    <div class="col-span-full mt-10">
      <div class="flex justify-center px-4">
        <div
          class="w-full max-w-lg text-center animate-section transition-all duration-500"
          :ref="(el) => { if (el) sectionRefs[0] = el; }"
          :class="{
            visible: sectionVisibility[0],
            'font-mono text-cyan-400/90 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]': activeTheme,
          }">
          <p class="leading-relaxed text-sm sm:text-base text-neutral-800 dark:text-neutral-200" v-html="t('aboutMe.bio')"></p>
          
          <!-- Explore Button -->
          <div class="flex justify-center mt-12 mb-6">
            <div
              :class="[
                'font-semibold px-8 uppercase h-10 text-center flex items-center justify-center transition-all duration-300',
                activeTheme
                  ? 'border-x-2 border-purple-500 font-mono text-purple-400'
                  : 'border-x-[4px] border-neutral-900 dark:border-neutral-100 border-solid',
              ]"
              :style="activeTheme ? { boxShadow: `0 0 ${10 + (glowIntensity || 0) * 30}px rgba(168,85,247, ${0.3 + (glowIntensity || 0) * 0.7})` } : {}">
              {{ activeTheme ? t('aboutMe.sysExplore') : t('aboutMe.explore') }}
            </div>
          </div>
          <Divider />
        </div>
      </div>
    </div>

    <!-- 6 Core Pillars Cards -->
    <div class="col-span-full flex items-center justify-center mt-6">
      <div class="w-full max-w-lg px-4 flex flex-col gap-6">

        <!-- 1. Front-End Architecture -->
        <div
          :ref="(el) => { if (el) sectionRefs[1] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[1] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  height="44px"
                  width="44px"
                  version="1.1"
                  class="fill-current flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-cyan-400' : 'opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #06b6d4)` } : {}"
                  viewBox="0 0 295.239 295.239">
                  <path
                    d="M244.352,239.382l-6.91-6.557c-0.348,0.367-0.729,0.695-1.081,1.057l-39.614-129.643     c5.005-6.448,8.014-14.514,8.014-23.286c0-21.005-17.09-38.095-38.095-38.095V25.372c1.267,0.195,2.524,0.329,3.79,0.562     l1.738-9.367c-1.957-0.362-3.91-0.595-5.867-0.867c-1.59-8.905-9.352-15.7-18.71-15.7c-9.358,0-17.117,6.796-18.707,15.701     c-1.957,0.276-3.91,0.505-5.867,0.867l1.738,9.367c1.267-0.233,2.524-0.367,3.79-0.562v17.486     c-21.005,0-38.095,17.09-38.095,38.095c0,8.771,3.01,16.838,8.01,23.281L58.871,233.877c-0.352-0.362-0.733-0.69-1.081-1.057     l-6.91,6.557c1.557,1.638,3.214,3.19,4.857,4.757l-7.914,25.905l-0.205,25.2l27.91-20.933l3.757-12.295     c1.014,0.61,2.005,1.281,3.024,1.852l4.662-8.305c-1.624-0.914-3.214-1.952-4.819-2.952l17.533-57.367h95.862l17.529,57.371     c-1.605,1-3.19,2.038-4.819,2.952l4.662,8.305c1.024-0.576,2.01-1.248,3.024-1.852l3.757,12.295l27.919,20.929V270.72     l-8.124-26.581C241.138,242.572,242.8,241.02,244.352,239.382z" />
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-cyan-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysArchTitle') : t('aboutMe.archTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-cyan-500/40 pl-3' : ''">
                {{ t('aboutMe.archDesc') }}
              </p>
            </div>
          </BorderGlow>
        </div>

        <!-- 2. Pixel-Perfect UI Development -->
        <div
          :ref="(el) => { if (el) sectionRefs[2] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[2] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  class="size-10 flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-cyan-400' : 'fill-current opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #06b6d4)` } : {}"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                    <path d="M78 5099 c-41 -21 -78 -81 -78 -124 0 -50 248 -1003 284 -1091 78 -192 98 -216 614 -735 259 -261 472 -479 472 -484 0 -6 -292 -302 -649 -660 -703 -703 -692 -690 -714 -821 -8 -47 -8 -82 0 -130 23 -135 29 -143 467 -580 437 -438 445 -444 580 -467 48 -8 83 -8 130 0 131 22 118 11 821 714 358 357 655 649 660 649 6 0 276 -266 600 -591 325 -325 618 -610 652 -635 72 -52 163 -95 254 -120 88 -25 289 -25 379 0 213 57 396 207 490 401 59 122 74 190 74 335 0 179 -40 308 -138 443 -25 34 -310 327 -635 652 -325 324 -591 594 -591 600 0 5 292 302 649 660 703 703 692 690 714 821 8 47 8 82 0 130 -23 135 -29 143 -467 580 -437 438 -445 444 -580 467 -48 8 -83 8 -130 0 -131 -22 -118 -11 -821 -714 -358 -357 -654 -649 -660 -649 -5 0 -219 209 -475 464 -382 381 -480 474 -550 519 -103 66 -144 87 -236 120 -94 34 -1014 267 -1050 267 -16 -1 -46 -10 -66 -21z" />
                  </g>
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-cyan-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysPixelTitle') : t('aboutMe.pixelTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-cyan-500/40 pl-3' : ''">
                {{ t('aboutMe.pixelDescDesktop') }}
              </p>
            </div>
          </BorderGlow>
        </div>

        <!-- 3. Modern JavaScript Ecosystem -->
        <div
          :ref="(el) => { if (el) sectionRefs[3] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[3] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  class="size-10 fill-current flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-cyan-400' : 'opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #06b6d4)` } : {}"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50">
                  <path d="M 5 2 C 3.355469 2 2 3.355469 2 5 L 2 35 C 2 36.644531 3.355469 38 5 38 L 19 38 L 19 40 L 10 40 C 9.96875 40 9.9375 40 9.90625 40 C 9.636719 40.027344 9.386719 40.160156 9.21875 40.375 L 4.21875 46.375 C 3.976563 46.675781 3.929688 47.085938 4.097656 47.433594 C 4.265625 47.78125 4.617188 48 5 48 L 45 48 C 45.382813 48 45.734375 47.78125 45.902344 47.433594 C 46.070313 47.085938 46.023438 46.675781 45.78125 46.375 L 40.78125 40.375 C 40.589844 40.136719 40.304688 40 40 40 L 31 40 L 31 38 L 45 38 C 46.644531 38 48 36.644531 48 35 L 48 5 C 48 3.355469 46.644531 2 45 2 Z M 5 4 L 45 4 C 45.554688 4 46 4.445313 46 5 L 46 35 C 46 35.554688 45.554688 36 45 36 L 5 36 C 4.445313 36 4 35.554688 4 35 L 4 5 C 4 4.445313 4.445313 4 5 4 Z M 6 6 L 6 34 L 44 34 L 44 6 Z M 8 8 L 42 8 L 42 32 L 8 32 Z M 19.28125 11.28125 L 11.28125 19.28125 L 10.59375 20 L 11.28125 20.71875 L 19.28125 28.71875 L 20.71875 27.28125 L 13.4375 20 L 20.71875 12.71875 Z M 30.71875 11.28125 L 29.28125 12.71875 L 36.5625 20 L 29.28125 27.28125 L 30.71875 28.71875 L 38.71875 20.71875 L 39.40625 20 L 38.71875 19.28125 Z M 21 38 L 29 38 L 29 42 L 21 42 Z M 10.46875 42 L 19 42 L 19 44 L 31 44 L 31 42 L 39.53125 42 L 42.875 46 L 7.125 46 Z"></path>
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-cyan-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysJsTitle') : t('aboutMe.jsTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-cyan-500/40 pl-3' : ''">
                {{ t('aboutMe.jsDesc') }}
              </p>
            </div>
          </BorderGlow>
        </div>

        <!-- 4. Tailwind & Design Systems -->
        <div
          :ref="(el) => { if (el) sectionRefs[4] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[4] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  class="size-10 flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-cyan-400' : 'fill-current opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #06b6d4)` } : {}"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z" />
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-cyan-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysTailwindTitle') : t('aboutMe.tailwindTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-cyan-500/40 pl-3' : ''">
                {{ t('aboutMe.tailwindDesc') }}
              </p>
            </div>
          </BorderGlow>
        </div>

        <!-- 5. Problem Solving & Debugging -->
        <div
          :ref="(el) => { if (el) sectionRefs[5] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[5] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-10 flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-cyan-400' : 'opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #06b6d4)` } : {}">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-cyan-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysDebugTitle') : t('aboutMe.debugTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-cyan-500/40 pl-3' : ''">
                {{ t('aboutMe.debugDesc') }}
              </p>
            </div>
          </BorderGlow>
        </div>

        <!-- 6. AI-Assisted Development / AI-Driven Solutions -->
        <div
          :ref="(el) => { if (el) sectionRefs[6] = el; }"
          class="animate-section"
          :class="{ visible: sectionVisibility[6] }">
          <BorderGlow :enabled="Boolean(activeTheme)" class-name="p-5 rounded-2xl" :glow-intensity="0.8 + (glowIntensity || 0)" animated>
            <div class="flex flex-col items-start p-5 rounded-2xl bg-neutral-300/40 dark:bg-neutral-900/60 border border-neutral-400/30 dark:border-neutral-800/80 shadow-sm">
              <div class="flex items-center gap-3">
                <svg
                  class="size-10 flex-shrink-0"
                  :class="['transition-all duration-75', activeTheme ? 'text-purple-400 fill-purple-400' : 'fill-current opacity-25 text-neutral-950 dark:text-neutral-100']"
                  :style="activeTheme ? { opacity: 0.2 + (glowIntensity || 0) * 0.8, filter: `drop-shadow(0 0 ${(glowIntensity || 0) * 15}px #a855f7)` } : {}"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50">
                  <path
                    d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z" />
                </svg>
                <p :class="['text-base sm:text-lg font-semibold capitalize transition-all duration-300', activeTheme ? 'font-mono text-purple-400 uppercase tracking-wider text-[15px]' : '']">
                  {{ activeTheme ? t('aboutMe.sysAiTitle') : t('aboutMe.aiTitle') }}
                </p>
              </div>
              <p
                class="text-start text-xs sm:text-sm mt-2.5 transition-all duration-500 leading-relaxed text-neutral-700 dark:text-neutral-300"
                :class="activeTheme ? 'font-mono text-neutral-400/90 text-[12px] border-l-2 border-purple-500/40 pl-3' : ''">
                {{ t('aboutMe.aiDescDesktop') }}
              </p>

              <!-- Nightclub Mode Easter Egg for Mobile -->
              <div
                v-if="activeTheme"
                class="mt-6 pt-3 pb-1 w-full flex items-center justify-center gap-2 select-none cursor-pointer min-h-[44px] rounded-lg transition-all duration-500 hover:bg-purple-950/20"
                @mousemove="handleEasterEggMouseMove"
                @mouseleave="handleEasterEggMouseLeave">
                <div
                  v-for="(word, index) in easterEggWords"
                  :key="index"
                  @touchstart="activeWordIndex = index"
                  class="transition-all duration-700 ease-out font-mono text-xs font-bold tracking-widest px-2 py-0.5 rounded-md"
                  :class="[
                    activeWordIndex === index
                      ? 'opacity-100 scale-110 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.95)] bg-purple-900/40 border border-purple-500/50'
                      : 'opacity-40 text-purple-400/30 border border-transparent'
                  ]">
                  {{ word }}
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>

      </div>
    </div>

    <!-- Bottom Divider -->
    <div class="col-span-full mb-20 mt-10">
      <div class="flex justify-center">
        <div
          class="w-4/6 text-center"
          :class="{
            'font-mono text-cyan-400/90 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]': activeTheme,
          }">
          <Divider />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-section {
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
  will-change: transform, opacity;
}

.animate-section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
