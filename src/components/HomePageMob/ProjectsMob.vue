<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
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

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { t } = useI18n();

const projects = [
  {
    skills: ["Nuxt 4", "TypeScript", "Supabase", "Pinia", "Nuxt Image", "Tailwind 4"],
    img: "mazzinshop.webp",
    link: "https://mazzinshop.ir",
    descriptionKey: "mazzinshop",
  },
  {
    skills: ["React", "TypeScript", "AI Analysis", "React Query", "Supabase", "Framer Motion", "Zod", "Medical Imaging"],
    img: "lab-ai.webp",
    link: "https://app.snapcyte.com",
    descriptionKey: "labAi",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "mywebsite.webp",
    link: "https://www.hoseinmazinani.ir",
    descriptionKey: "mywebsite",
  },
  {
    skills: ["React", "Tailwind", "Syncfusion", "Eslint"],
    img: "dashboard.webp",
    link: "https://dashboard-five-flax.vercel.app/",
    descriptionKey: "dashboard",
  },
  {
    skills: ["NEXT.JS", "React", "Mongo db", "SWR", "Html&Css"],
    img: "event.webp",
    link: "https://nextjs-tutorial-coral-three.vercel.app/",
    descriptionKey: "event",
  },
  {
    skills: ["React", "MUI", "Axios", "Emotion"],
    img: "clone.webp",
    link: "https://youtube-clone-xi-five.vercel.app/",
    descriptionKey: "clone",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "octopus.webp",
    link: "https://octopus-website-ten.vercel.app/",
    descriptionKey: "octopus",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "yekmovie.webp",
    link: "https://yek-movie-hosein-khan.vercel.app/",
    descriptionKey: "yekmovie",
  },
];

const sectionVisibility = ref(Array(projects.length).fill(false));
const cardRefs = ref([]);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const idx = cardRefs.value.indexOf(target);
        if (idx !== -1 && isIntersecting) {
          sectionVisibility.value[idx] = true;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cardRefs.value.forEach((el) => {
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
    <div class="col-span-full flex justify-center">
      <div
        :class="[
          'uppercase px-14 py-3 text-xl font-semibold transition-all duration-500',
          activeTheme
            ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
            : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
        ]">
        {{ activeTheme ? t('projects.sysTitle') : t('projects.title') }}
      </div>
    </div>

    <!-- Project Cards Grid -->
    <div
      class="col-span-full mt-14 flex justify-center px-4 w-full"
      :class="{ 'nightclub-mode': activeTheme }"
      :style="activeTheme ? { '--glow-intensity': glowIntensity, '--theme-rgb': getThemeColor() } : {}">
      <div class="w-full max-w-md flex flex-col gap-8 relative z-10">
        <div
          v-for="(project, index) in projects"
          :key="index"
          :ref="(el) => { if (el) cardRefs[index] = el; }"
          class="mobile-project-card w-full rounded-2xl overflow-hidden bg-neutral-300/80 dark:bg-neutral-900/90 border border-neutral-400/50 dark:border-neutral-800 shadow-lg shadow-neutral-400/40 dark:shadow-neutral-950/80 flex flex-col"
          :class="[
            sectionVisibility[index] ? 'card-visible' : 'card-hidden',
            activeTheme ? 'nightclub-project-border' : '',
          ]">
          <div v-if="activeTheme" class="scanlines pointer-events-none"></div>

          <!-- Image Container with Image Tag -->
          <div class="relative w-full h-52 bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
            <img
              :src="`/images/${project.img}`"
              :alt="project.descriptionKey"
              class="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 pointer-events-none"></div>

            <!-- Floating Direct Visit Badge -->
            <a
              :href="project.link"
              target="_blank"
              class="visit-floating-btn absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white bg-black/60 backdrop-blur-md border border-white/30 hover:bg-black/80 active:scale-95 transition-all shadow-md z-10">
              <span>{{ t('projects.visit') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>

          <!-- Card Content Body -->
          <div class="p-4 flex flex-col flex-grow justify-between gap-3.5 relative z-10">
            <!-- Skill Tags -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="(skill, skillIndex) in project.skills"
                :key="skillIndex"
                class="skill-chip text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-neutral-200/90 dark:bg-neutral-800/90 text-neutral-800 dark:text-neutral-200 border border-neutral-400/50 dark:border-neutral-700/60 transition-colors">
                {{ skill }}
              </span>
            </div>

            <!-- Project Description (Exact Desktop Text) -->
            <p class="project-desc text-xs sm:text-sm font-normal text-neutral-800 dark:text-neutral-300 leading-relaxed text-justify">
              {{ t('projects.items.' + project.descriptionKey + '.desc') }}
            </p>

            <!-- Bottom CTA Button -->
            <a
              :href="project.link"
              target="_blank"
              class="mobile-visit-btn mt-1 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-[0.98]">
              <span>{{ t('projects.visit') }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Divider -->
    <div
      class="col-span-full flex justify-center mb-10"
      :class="{
        'font-mono text-cyan-400/90 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]': activeTheme,
      }">
      <Divider />
    </div>
  </div>
</template>

<style scoped>
.mobile-project-card {
  will-change: transform, opacity;
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.card-hidden {
  opacity: 0;
  transform: translateY(35px);
}

.card-visible {
  opacity: 1;
  transform: translateY(0);
}

.mobile-visit-btn {
  background-color: #171717;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

:root.dark .mobile-visit-btn,
.dark .mobile-visit-btn {
  background-color: #262626;
  color: #f5f5f5;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.mobile-visit-btn:hover {
  background-color: #000000;
}

:root.dark .mobile-visit-btn:hover,
.dark .mobile-visit-btn:hover {
  background-color: #404040;
}

/* ========================================= */
/* Nightclub Mode: Holographic CRT Monitors  */
/* ========================================= */

.nightclub-mode .mobile-project-card {
  background-color: rgb(15, 15, 15) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8) !important;
  border: 1px solid rgba(var(--theme-rgb), 0.2) !important;
}

.nightclub-mode .scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 255, 0, 0.04));
  background-size:
    100% 4px,
    3px 100%;
  z-index: 5;
  opacity: calc(0.2 + var(--glow-intensity) * 0.6);
}

.nightclub-mode .project-desc {
  color: #d4d4d4;
  font-family: monospace;
}

.nightclub-mode .skill-chip {
  border-color: rgba(var(--theme-rgb), 0.6) !important;
  color: rgb(var(--theme-rgb)) !important;
  background-color: rgba(var(--theme-rgb), 0.08) !important;
  font-family: monospace;
  font-weight: bold;
}

.nightclub-mode .mobile-visit-btn,
.nightclub-mode .visit-floating-btn {
  border-color: rgb(var(--theme-rgb)) !important;
  color: #fff !important;
  background-color: rgba(var(--theme-rgb), 0.3) !important;
  font-family: monospace;
  letter-spacing: 1px;
}

.nightclub-mode .mobile-visit-btn:active,
.nightclub-mode .mobile-visit-btn:hover {
  background-color: rgb(var(--theme-rgb)) !important;
  color: #000 !important;
  box-shadow: 0 0 20px rgb(var(--theme-rgb));
}

@property --border-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.nightclub-project-border::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  padding: 3px;
  background: conic-gradient(from var(--border-angle), #ff007f, #00f3ff, #39ff14, #bd00ff, #ffe600, #ff007f);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 20;
  animation: spinProjectBorder 6s linear infinite;
}

@keyframes spinProjectBorder {
  0% {
    --border-angle: 0deg;
  }
  100% {
    --border-angle: 360deg;
  }
}
</style>
