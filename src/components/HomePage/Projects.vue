<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Divider from "../Divider.vue";

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

const handleScroll = () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.82 && rect.bottom > 0 && !sectionVisibility.value[index]) {
      sectionVisibility.value[index] = true;
    }
  });
};

// بقیه بدون تغییر
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // بررسی اولیه
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const projects = [
  {
    skills: ["Nuxt 4", "TypeScript", "Supabase", "Pinia", "Nuxt Image", "Tailwind 4"],
    img: "mazzinshop.webp",
    link: "https://mazzinshop.ir",
    description: "A modern e-commerce platform built with Nuxt 4 and TypeScript. Features product search engine, Supabase, and dynamic store system.",
  },
  {
    skills: ["React", "TypeScript", "AI Analysis", "React Query", "Supabase", "Framer Motion", "Zod", "Medical Imaging"],
    img: "lab-ai.webp",
    link: "https://app.snapcyte.com",
    description: "AI-powered laboratory platform for medical imaging analysis. Features advanced model interpretation and scientific workflows.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "mywebsite.webp",
    link: "https://www.hoseinmazinani.ir",
    description: "a CV website for Hosein Mazinani, showcasing my skills using Vue.js and Tailwind CSS. The site highlights my experience in a clean design.",
  },
  {
    skills: ["React", "Tailwind", "Syncfusion", "Eslint"],
    img: "dashboard.webp",
    link: "https://dashboard-five-flax.vercel.app/",
    description: "Data-rich React dashboard system built for monitoring business stats. Styled with Tailwind CSS and advanced Syncfusion widgets.",
  },
  {
    skills: ["NEXT.JS", "React", "Mongo db", "SWR", "Html&Css"],
    img: "event.webp",
    link: "https://nextjs-tutorial-coral-three.vercel.app/",
    description: "Dynamic event list web application built using Next.js and MongoDB. Features real-time server-side data synchronization via SWR.",
  },
  {
    skills: ["React", "MUI", "Axios", "Emotion"],
    img: "clone.webp",
    link: "https://youtube-clone-xi-five.vercel.app/",
    description: "YouTube clone app built in React with Material UI framework. Integrated with third-party APIs using Axios for video stream feed.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "octopus.webp",
    link: "https://octopus-website-ten.vercel.app/",
    description: "Official landing page for Octopus Company to introduce modules. Showcases enterprise solutions with fully interactive preview panels.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "yekmovie.webp",
    link: "https://yek-movie-hosein-khan.vercel.app/",
    description: "A media streaming and entertainment platform for movie downloads. Designed with full Persian language localization and search system.",
  },
];

const sectionVisibility = ref(projects.map(() => false));
</script>

<template>
  <div class="grid grid-cols-12">
    <!-- <div class="col-span-full flex justify-center">
      <div
        :class="[
          'uppercase px-16 py-3 text-xl font-semibold transition-all duration-500',
          activeTheme
            ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
            : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
        ]">
        {{ activeTheme ? "DATABASE // ARCHIVES" : "Projects" }}
      </div>
    </div> -->
    <!-- skils -->
    <div
      class="col-span-full mt-20 flex justify-center"
      :class="{ 'nightclub-mode': activeTheme }"
      :style="activeTheme ? { '--glow-intensity': glowIntensity, '--theme-rgb': getThemeColor() } : {}">
      <div class="container relative z-10">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card w-full rounded-[10px] bg-neutral-300 shadow-lg shadow-neutral-400 dark:shadow-neutral-800 dark:bg-neutral-800 relative overflow-hidden"
          :class="[
            index % 2 === 0 ? 'project-card-right' : 'project-card-left',
            sectionVisibility[index] ? 'project-card-visible' : '',
            activeTheme ? 'nightclub-project-border' : '',
          ]">
          <div v-if="activeTheme" class="scanlines pointer-events-none"></div>

          <div class="skill1" :style="{ backgroundImage: `url(/images/${project.img})` }">
            <div class="content w-full flex flex-col px-6">
              <div class="flex flex-wrap justify-center gap-2" style="padding: 15% 12%; height: 150px">
                <div
                  v-for="(skill, skillIndex) in project.skills"
                  :key="skillIndex"
                  class="skill-tag flex justify-center items-center font-extralight text-white px-4 bg-transparent rounded-lg"
                  style="border: solid 1px white; height: 23px">
                  {{ skill }}
                </div>
              </div>
              <div class="w-3/12 lg:w-3/12">
                <a
                  :href="project.link"
                  target="_blank"
                  class="visit-btn flex text-white font-semibold py-1 justify-center items-center rounded-lg mb-6 -mt-3"
                  style="background-color: rgba(5, 5, 5, 0.5); border: solid 2px white">
                  Visit
                </a>
              </div>
            </div>
          </div>
          <div class="text-[14px] mt-2 pl-3 font-medium pb-2 pr-3 relative z-10">
            <p class="project-desc">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
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
.project-card {
  opacity: 0;
  transition:
    opacity 0.9s ease,
    transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.project-card-right {
  transform: translateX(160px);
}

.project-card-left {
  transform: translateX(-160px);
}

.project-card-visible {
  opacity: 1;
  transform: translateX(0);
}

.container {
  display: grid;
  grid-template-columns: 45% 45%;
  justify-content: center;
  gap: 40px;
}

@media only screen and (max-width: 800px) {
  .container {
    display: flex;
    flex-direction: column;
  }

  .project-card-right,
  .project-card-left {
    transform: translateY(40px);
  }

  .project-card-visible {
    transform: translateY(0);
  }
}

@media only screen and (max-width: 1024px) and (min-width: 800px) {
  .container {
    display: flex;
    padding: 0 10%;
    flex-direction: column;
  }
}

.skill-container {
  width: 100%;
  /* box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px; */
  border-radius: 10px;
  /* background-color: rgba(29, 29, 29, 0.164); */
}

.skill1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  color: rgb(0, 0, 0);
  border-radius: 10px 10px 0px 0px;
  transition: box-shadow 0.5s;
}

.skill1:hover {
  box-shadow: inset 0 500px rgba(5, 5, 5, 0.75);
}
.project-desc {
  height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content {
  opacity: 0;
}

.content:hover {
  opacity: 1;
  transition: opacity 2s;
}

/* ========================================= */
/* Nightclub Mode: Holographic CRT Monitors  */
/* ========================================= */

.nightclub-mode .project-card {
  background-color: rgb(15, 15, 15) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
  border: none !important; 
}

.nightclub-mode .skill1 {
  filter: sepia(0.3) hue-rotate(calc(var(--glow-intensity) * 90deg)) contrast(calc(1 + var(--glow-intensity) * 0.8));
  transition: box-shadow 0.5s ease-in-out !important; 
}

.nightclub-mode .skill1:hover {
  box-shadow: inset 0 500px rgba(5, 5, 5, 0.85) !important;
}

.nightclub-mode .scanlines {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.04), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.04));
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

.nightclub-mode .skill-tag {
  border-color: rgba(var(--theme-rgb), 0.6) !important;
  color: rgb(var(--theme-rgb)) !important;
  background-color: rgba(var(--theme-rgb), 0.08) !important;
  font-family: monospace;
  font-weight: bold;
}

.nightclub-mode .visit-btn {
  border-color: rgb(var(--theme-rgb)) !important;
  color: #fff !important;
  background-color: rgba(var(--theme-rgb), 0.3) !important;
  font-family: monospace;
  letter-spacing: 2px;
}

.nightclub-mode .visit-btn:hover {
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
  border-radius: 10px;
  padding: 4px;
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
