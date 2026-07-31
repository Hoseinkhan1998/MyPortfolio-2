<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark } from "@vueuse/core";
import TopSection from "./TopSection.vue";
import Header from "./Header.vue";
import AboutMe from "./AboutMe.vue";
import Skills from "./Skills.vue";
import Projects from "./Projects.vue";
import ContactMe from "./ContactMe.vue";
import Footer from "./Footer.vue";
import HeaderMob from "../HomePageMob/HeaderMob.vue";
import TopSectionMob from "../HomePageMob/TopSectionMob.vue";
import AboutMeMob from "../HomePageMob/AboutMeMob.vue";
import SkillsMob from "../HomePageMob/SkillsMob.vue";
import ProjectsMob from "../HomePageMob/ProjectsMob.vue";
import ContactMeMob from "../HomePageMob/ContactMeMob.vue";
import NightclubModal from "../NightclubModal.vue";

const currentSection = ref("");

function handleDisplay(targetId) {
  console.log("Target ID:", targetId);
  const el = document.getElementById(targetId);
  if (el) {
    setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 100, behavior: "smooth" });
    }, 300);
  } else {
    console.error("Element not found for ID:", targetId);
  }
}

const props = defineProps({
  isMobile: Boolean,
});

const showScrollToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const sectionIds = ["aboutMe", "skills", "projects", "contact", "aboutMeMob", "skillsMob", "projectsMob", "contactMob"];
const handleScroll = () => {
  const playtableElement = document.querySelector(".playtable");
  if (playtableElement) {
    const { top } = playtableElement.getBoundingClientRect();
    showScrollToTop.value = window.scrollY > top;
  }
  let found = false;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const { top } = el.getBoundingClientRect();
    if (top <= 200 && top + el.offsetHeight > 200) {
      currentSection.value = id;
      found = true;
      break;
    }
  }
  if (!found) {
    currentSection.value = "";
  }
};

// --- Nightclub Logic ---
const isNightclubOpen = ref(false);
const showWelcomeAnimation = ref(false);
const activeTheme = ref(null);
const savedUserTheme = ref(false);

const isShortcutLocked = ref(true);
const welcomeVideoSrc = ref("");
const welcomeVideoRef = ref(null);

const audioRef = ref(null);
const glowIntensity = ref(0);
const frequencyBars = ref(new Array(40).fill(0));

let audioCtx = null;
let analyser = null;
let dataArray = null;
let animationId = null;

const triggerNightclubEasterEgg = () => {
  if (isNightclubOpen.value || activeTheme.value) return;
  isNightclubOpen.value = true;
};

const handleKeyboardShortcut = (e) => {
  if (e.code === "Escape" && activeTheme.value) {
    e.preventDefault();
    exitNightclub();
    return;
  }

  if (e.ctrlKey && e.shiftKey && e.code === "KeyD") {
    e.preventDefault();
    if (isShortcutLocked.value) return;
    triggerNightclubEasterEgg();
  }
};

const closeNightclubModal = () => {
  isNightclubOpen.value = false;
};

const handleThemeSelection = (theme) => {
  isNightclubOpen.value = false;
  activeTheme.value = theme;

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  playWelcomeAnimation();
};

const playWelcomeAnimation = () => {
  showWelcomeAnimation.value = true;
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (welcomeVideoRef.value) {
    welcomeVideoRef.value.currentTime = 2;
    welcomeVideoRef.value.play();
  }
};

const onWelcomeVideoEnded = () => {
  showWelcomeAnimation.value = false;
  startNightclubExperience();
};

const startNightclubExperience = () => {
  if (!audioRef.value) return;

  audioRef.value.src = `/audio/${activeTheme.value}.mp3`;

  if (audioCtx && !audioRef.value.dataset.connected) {
    const source = audioCtx.createMediaElementSource(audioRef.value);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    audioRef.value.dataset.connected = "true";
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  audioRef.value.play();

  const isDark = useDark();
  savedUserTheme.value = isDark.value;
  isDark.value = true;

  visualizeAudio();
};

const visualizeAudio = () => {
  if (!analyser) return;
  animationId = requestAnimationFrame(visualizeAudio);
  analyser.getByteFrequencyData(dataArray);

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += dataArray[i];
  }
  const averageBass = sum / 10;
  glowIntensity.value = averageBass / 255;

  const step = Math.floor(dataArray.length / 40) || 1;
  for (let i = 0; i < 40; i++) {
    frequencyBars.value[i] = dataArray[i * step] / 255;
  }
};

const exitNightclub = () => {
  if (!activeTheme.value) return;

  if (audioRef.value) {
    audioRef.value.pause();
    audioRef.value.currentTime = 0;
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  glowIntensity.value = 0;
  frequencyBars.value = new Array(40).fill(0);

  const isDark = useDark();
  isDark.value = savedUserTheme.value;

  activeTheme.value = null;
};

// --- Lifecycle Hooks ---
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyboardShortcut);

  setTimeout(() => {
    isShortcutLocked.value = false;
    welcomeVideoSrc.value = "/video/welcome2.mp4";
  }, 4000);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeyboardShortcut);
  if (animationId) cancelAnimationFrame(animationId);
  if (audioCtx) audioCtx.close();
});
</script>

<template>
  <audio ref="audioRef" class="hidden" loop></audio>

  <!-- اکولایزرهای ضخیم دو طرف صفحه با ترانزیشن رنگی روان و شدو متصل به بیس -->
  <div v-if="activeTheme" class="fixed inset-y-0 left-0 w-6 z-50 pointer-events-none flex items-center justify-start pl-3">
    <div
      class="w-3 h-[66vh] rounded-r-xl transition-all duration-75 animate-neon-chroma"
      :style="{
        boxShadow: `0 0 ${20 + glowIntensity * 70}px currentColor, inset 0 0 15px currentColor`,
      }"></div>
  </div>

  <div v-if="activeTheme" class="fixed inset-y-0 right-0 w-6 z-50 pointer-events-none flex items-center justify-end pr-3">
    <div
      class="w-3 h-[66vh] rounded-l-xl transition-all duration-75 animate-neon-chroma"
      :style="{
        boxShadow: `0 0 ${20 + glowIntensity * 70}px currentColor, inset 0 0 15px currentColor`,
      }"></div>
  </div>

  <div
    :class="[
      'grid grid-cols-12 transition-colors duration-1000 relative z-20',
      activeTheme ? 'bg-black/90 text-white' : 'bg-neutral-200 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-950',
    ]">
    <div class="col-span-full z-20 sticky top-0 lg:block hidden">
      <div class="bg-[#00000050] text-white px-5 py-4 backdrop-blur-sm">
        <Header :currentSection="currentSection" :activeTheme="activeTheme" :frequencyBars="frequencyBars" @handleDisplay="handleDisplay" />
      </div>
    </div>
    <div class="col-span-full z-20 sticky top-0 lg:hidden block">
      <div class="text-white px-5 py-4">
        <HeaderMob :currentSection="currentSection" @handleDisplay="handleDisplay" />
      </div>
    </div>
    <div class="col-span-full lg:block hidden -mt-24">
      <TopSection :activeTheme="activeTheme" :showWelcomeAnimation="showWelcomeAnimation" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block -mt-[12vh]" style="height: 80vh">
      <TopSectionMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mt-24 mb-28 playtable" id="aboutMe">
      <div class="col-span-full">
        <div class="flex justify-center">
          <div
            :class="[
              'uppercase py-3 px-16 text-xl font-semibold transition-all duration-500',
              activeTheme
                ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
                : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
            ]">
            {{ activeTheme ? "SYSTEM_OVERRIDE // ABOUT_ME" : "About Me" }}
          </div>
        </div>
      </div>
      <AboutMe :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mt-24 playtable" id="aboutMeMob">
      <AboutMeMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="skills">
      <div class="col-span-full flex justify-center">
        <div
          :class="[
            'uppercase px-16 py-3 text-xl font-semibold transition-all duration-500',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          {{ activeTheme ? "CORE_MODULES // SKILLS" : "skills" }}
        </div>
      </div>
      <Skills :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block" id="skillsMob">
      <SkillsMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="projects">
      <div class="col-span-full flex justify-center">
        <div
          :class="[
            'uppercase px-16 py-3 text-xl font-semibold transition-all duration-500',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          {{ activeTheme ? "DATABASE // ARCHIVES" : "Projects" }}
        </div>
      </div>
      <Projects :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mb-28" id="projectsMob">
      <ProjectsMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="contact">
      <div class="col-span-full flex justify-center">
        <div
          :class="[
            'uppercase px-14 py-3 text-xl font-semibold transition-all duration-500',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          {{ activeTheme ? "SECURE_COMMLINK // CONTACT" : "Contact" }}
        </div>
      </div>
      <ContactMe :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mb-28" id="contactMob">
      <ContactMeMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full" id="contact">
      <Footer :currentSection="currentSection" :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
  </div>

  <button v-if="showScrollToTop" @click="scrollToTop" class="fixed bottom-4 z-30 left-4">
    <div class="bg-neutral-700 text-white p-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    </div>
  </button>
  <NightclubModal :isOpen="isNightclubOpen" @close="closeNightclubModal" @selectTheme="handleThemeSelection" />

  <Teleport to="body">
    <Transition name="image-fade">
      <div v-show="showWelcomeAnimation" class="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm">
        <video
          ref="welcomeVideoRef"
          :src="welcomeVideoSrc"
          muted
          playsinline
          preload="auto"
          @ended="onWelcomeVideoEnded"
          class="max-w-3xl w-full drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] rounded-xl"></video>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.playtable {
  scroll-margin-top: 16px;
}
.image-fade-enter-active,
.image-fade-leave-active {
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}
.image-fade-enter-from,
.image-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
}

@keyframes neonChromaShift {
  0% {
    background-color: #ff007f;
    color: #ff007f;
  }
  14% {
    background-color: #00f3ff;
    color: #00f3ff;
  }
  28% {
    background-color: #39ff14;
    color: #39ff14;
  }
  42% {
    background-color: #bd00ff;
    color: #bd00ff;
  }
  56% {
    background-color: #ffe600;
    color: #ffe600;
  }
  70% {
    background-color: #ff003c;
    color: #ff003c;
  }
  84% {
    background-color: #0044ff;
    color: #0044ff;
  }
  100% {
    background-color: #ff6c00;
    color: #ff6c00;
  }
}

.animate-neon-chroma {
  animation: neonChromaShift 12s linear infinite;
}
</style>
