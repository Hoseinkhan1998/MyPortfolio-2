<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { isDark } from "../../composables/useTheme";
import { useI18n } from "vue-i18n";
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

const { t, locale } = useI18n();
// --- متغیرهای پری بخش About Me ---
const fairyVideoRef = ref(null);
const fairyAboutTriggered = ref(false);
const fairyAboutLanded = ref(false);
const fairyAboutExiting = ref(false);
const showAboutBox = ref(false);
const fairyAboutClickable = ref(false);
const fairyAboutText = ref("");
const fullAboutText = computed(() => t('fairy.about'));
let typingAboutInterval = null;

const playFairyVideo = () => {
  if (!isDark.value || activeTheme.value || fairyAboutTriggered.value || !fairyVideoRef.value) return;
  fairyAboutTriggered.value = true;
  fairyVideoRef.value.currentTime = 1;
  fairyVideoRef.value.play();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fairyAboutLanded.value = true;
    });
  });

  // پس از 3.5 ثانیه (زمان رسیدن پری به مقصد)، دیالوگ با فید ظاهر و تایپ شروع می‌شود
  setTimeout(() => {
    if (!fairyAboutExiting.value && !activeTheme.value) {
      showAboutBox.value = true;
      startAboutTyping();
    }
  }, 3500);
};

const startAboutTyping = () => {
  if (typingAboutInterval || fairyAboutText.value !== "") return;
  let i = 0;
  const textToType = fullAboutText.value;
  typingAboutInterval = setInterval(() => {
    if (i < textToType.length) {
      fairyAboutText.value += textToType.charAt(i);
      i++;
    } else {
      clearInterval(typingAboutInterval);
      fairyAboutClickable.value = true;
    }
  }, 35);
};

// کنترل زمان، توقف و تایپ متن پری About Me
const handleAboutFairyTimeUpdate = () => {
  if (!fairyVideoRef.value) return;
  if (!fairyAboutExiting.value && fairyVideoRef.value.currentTime >= 9) {
    fairyVideoRef.value.pause();
  }
};

const handleAboutFairyClick = () => {
  if (!fairyAboutClickable.value || fairyAboutExiting.value || !fairyVideoRef.value) return;
  fairyAboutClickable.value = false;
  showAboutBox.value = false;
  fairyVideoRef.value.currentTime = 0;
  fairyVideoRef.value.play();

  setTimeout(() => {
    fairyAboutExiting.value = true;
  }, 800);
};

const fairySkillsVideoRef = ref(null);
const fairySkillsTriggered = ref(false);
const fairySkillsLanded = ref(false);
const fairySkillsExiting = ref(false);
const showSkillsBox = ref(false);
const fairySkillsClickable = ref(false);
const fairySkillsText = ref("");
const fullSkillsText = computed(() => t('fairy.skills'));
let typingSkillsInterval = null;

const playSkillsFairy = () => {
  if (!isDark.value || activeTheme.value || fairySkillsTriggered.value || !fairySkillsVideoRef.value) return;
  fairySkillsTriggered.value = true;
  fairySkillsVideoRef.value.currentTime = 1;
  fairySkillsVideoRef.value.play();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fairySkillsLanded.value = true;
    });
  });

  setTimeout(() => {
    if (!fairySkillsExiting.value && !activeTheme.value) {
      showSkillsBox.value = true;
      startSkillsTyping();
    }
  }, 3500);
};

const startSkillsTyping = () => {
  if (typingSkillsInterval || fairySkillsText.value !== "") return;
  let i = 0;
  const textToType = fullSkillsText.value;
  typingSkillsInterval = setInterval(() => {
    if (i < textToType.length) {
      fairySkillsText.value += textToType.charAt(i);
      i++;
    } else {
      clearInterval(typingSkillsInterval);
      fairySkillsClickable.value = true;
    }
  }, 35);
};

const handleSkillsFairyTimeUpdate = () => {
  if (!fairySkillsVideoRef.value) return;
  if (!fairySkillsExiting.value && fairySkillsVideoRef.value.currentTime >= 9) {
    fairySkillsVideoRef.value.pause();
  }
};

const handleSkillsFairyClick = () => {
  if (!fairySkillsClickable.value || fairySkillsExiting.value || !fairySkillsVideoRef.value) return;
  fairySkillsClickable.value = false;
  showSkillsBox.value = false;
  fairySkillsVideoRef.value.currentTime = 0;
  fairySkillsVideoRef.value.play();

  setTimeout(() => {
    fairySkillsExiting.value = true;
  }, 800);
};

// --- متغیرها و منطق پری بخش Contact ---
const fairyContactVideoRef = ref(null);
const fairyContactTriggered = ref(false);
const fairyContactLanded = ref(false);
const fairyContactExiting = ref(false);
const showContactBox = ref(false);
const fairyContactClickable = ref(false);
const fairyContactText = ref("");
const fullContactText = computed(() => t('fairy.contact'));
let typingContactInterval = null;

const playContactFairy = () => {
  if (!isDark.value || activeTheme.value || fairyContactTriggered.value || !fairyContactVideoRef.value) return;
  fairyContactTriggered.value = true;
  fairyContactVideoRef.value.currentTime = 1;
  fairyContactVideoRef.value.play();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fairyContactLanded.value = true;
    });
  });

  setTimeout(() => {
    if (!fairyContactExiting.value && !activeTheme.value) {
      showContactBox.value = true;
      startContactTyping();
    }
  }, 3500);
};

const startContactTyping = () => {
  if (typingContactInterval || fairyContactText.value !== "") return;
  let i = 0;
  const textToType = fullContactText.value;
  typingContactInterval = setInterval(() => {
    if (i < textToType.length) {
      fairyContactText.value += textToType.charAt(i);
      i++;
    } else {
      clearInterval(typingContactInterval);
      fairyContactClickable.value = true;
    }
  }, 35);
};

const handleContactFairyTimeUpdate = () => {
  if (!fairyContactVideoRef.value) return;
  if (!fairyContactExiting.value && fairyContactVideoRef.value.currentTime >= 9) {
    fairyContactVideoRef.value.pause();
  }
};

watch(locale, () => {
  if (fairyAboutText.value !== "") fairyAboutText.value = fullAboutText.value;
  if (fairySkillsText.value !== "") fairySkillsText.value = fullSkillsText.value;
  if (fairyContactText.value !== "") fairyContactText.value = fullContactText.value;
});

const handleContactFairyClick = () => {
  if (!fairyContactClickable.value || fairyContactExiting.value || !fairyContactVideoRef.value) return;
  fairyContactClickable.value = false;
  showContactBox.value = false;
  fairyContactVideoRef.value.currentTime = 0;
  fairyContactVideoRef.value.play();

  setTimeout(() => {
    fairyContactExiting.value = true;
  }, 800);
};

function handleDisplay(targetId) {
  console.log("Target ID:", targetId);
  const el = document.getElementById(targetId);
  if (el) {
    setTimeout(() => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 300, behavior: "smooth" });
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
    if (top <= 400 && top + el.offsetHeight > 400) {
      currentSection.value = id;
      if (id === "aboutMe") playFairyVideo();
      if (id === "skills" && fairyAboutExiting.value) playSkillsFairy();
      if (id === "contact" && fairySkillsExiting.value) playContactFairy();
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
const fairyVideoSrc = ref("");

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

  isDark.value = savedUserTheme.value;

  activeTheme.value = null;
};

// --- Lifecycle Hooks ---
onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("keydown", handleKeyboardShortcut);

  try {
    const fairyRes = await fetch("/video/fairy.mp4");
    const fairyBlob = await fairyRes.blob();
    fairyVideoSrc.value = URL.createObjectURL(fairyBlob);
  } catch (e) {
    fairyVideoSrc.value = "/video/fairy.mp4";
  }

  try {
    const welcomeRes = await fetch("/video/welcome2.mp4");
    const welcomeBlob = await welcomeRes.blob();
    welcomeVideoSrc.value = URL.createObjectURL(welcomeBlob);
  } catch (e) {
    welcomeVideoSrc.value = "/video/welcome2.mp4";
  }

  setTimeout(() => {
    isShortcutLocked.value = false;
  }, 4000);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("keydown", handleKeyboardShortcut);
  if (animationId) cancelAnimationFrame(animationId);
  if (audioCtx) audioCtx.close();

  if (fairyVideoSrc.value && fairyVideoSrc.value.startsWith("blob:")) {
    URL.revokeObjectURL(fairyVideoSrc.value);
  }
  if (welcomeVideoSrc.value && welcomeVideoSrc.value.startsWith("blob:")) {
    URL.revokeObjectURL(welcomeVideoSrc.value);
  }
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
      'grid grid-cols-12 transition-colors duration-1000 relative z-20 overflow-x-clip',
      activeTheme ? 'bg-black/90 text-white' : 'bg-neutral-200 text-neutral-900 dark:text-neutral-100 dark:bg-black',
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
            id="aboutMeTitle"
            :class="[
              'uppercase py-3 px-16 text-xl font-semibold transition-all duration-500 relative',
              activeTheme
                ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
                : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
            ]">
            <Transition name="fade">
              <div
                v-if="isDark && !activeTheme && showAboutBox && !fairyAboutExiting"
                class="absolute bottom-[7rem] left-[-17rem] w-60 bg-neutral-900 border border-purple-500 text-neutral-100 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.6)] z-[60] font-mono text-xs leading-relaxed normal-case">
                {{ fairyAboutText }}<span v-if="!fairyAboutClickable" class="animate-pulse">_</span>
                <div class="absolute bottom-[-6px] right-8 w-3 h-3 bg-neutral-900 border-b border-r border-purple-500 transform rotate-45"></div>
              </div>
            </Transition>

            <video
              v-if="isDark && !activeTheme"
              v-show="fairyAboutTriggered"
              ref="fairyVideoRef"
              :src="fairyVideoSrc"
              muted
              playsinline
              controlsList="nodownload no-remote-playback noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              tabindex="-1"
              data-idm-disabled="true"
              idm-skip="true"
              @contextmenu.prevent
              @click="handleAboutFairyClick"
              @timeupdate="handleAboutFairyTimeUpdate"
              :class="[
                'absolute z-50 w-28 top-[-2.5rem] left-[-9.5rem]',
                fairyAboutClickable && !fairyAboutExiting ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none',
                !fairyAboutLanded && !fairyAboutExiting ? '-translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-out' : '',
                fairyAboutLanded && !fairyAboutExiting ? 'translate-x-0 translate-y-0 transition-all duration-[3500ms] ease-out' : '',
                fairyAboutExiting ? '-translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-in-out' : '',
              ]"></video>

            {{ activeTheme ? t('aboutMe.sysTitle') : t('aboutMe.title') }}
          </div>
        </div>
      </div>
      <AboutMe :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mt-24 playtable" id="aboutMeMob">
      <AboutMeMob :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>

    <div class="col-span-full lg:block hidden mb-28" id="skills">
      <div class="col-span-full flex justify-center">
        <div
          id="skillsTitle"
          :class="[
            'uppercase px-16 py-3 text-xl font-semibold transition-all duration-500 relative',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          <Transition name="fade">
            <div
              v-if="isDark && !activeTheme && showSkillsBox && !fairySkillsExiting"
              class="absolute bottom-[7rem] right-[-17rem] w-60 bg-neutral-900 border border-purple-500 text-neutral-100 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.6)] z-[10] font-mono text-xs leading-relaxed normal-case">
              {{ fairySkillsText }}<span v-if="!fairySkillsClickable" class="animate-pulse">_</span>
              <div class="absolute bottom-[-6px] left-8 w-3 h-3 bg-neutral-900 border-b border-l border-purple-500 transform rotate-45"></div>
            </div>
          </Transition>

          <video
            v-if="isDark && !activeTheme"
            v-show="fairySkillsTriggered"
            ref="fairySkillsVideoRef"
            :src="fairyVideoSrc"
            muted
            playsinline
            controlsList="nodownload no-remote-playback noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabindex="-1"
            data-idm-disabled="true"
            idm-skip="true"
            @contextmenu.prevent
            @click="handleSkillsFairyClick"
            @timeupdate="handleSkillsFairyTimeUpdate"
            :class="[
              'absolute z-50 w-28 top-[-2.5rem] right-[-9.5rem] -scale-x-100',
              fairySkillsClickable && !fairySkillsExiting ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none',
              !fairySkillsLanded && !fairySkillsExiting ? 'translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-out' : '',
              fairySkillsLanded && !fairySkillsExiting ? 'translate-x-0 translate-y-0 transition-all duration-[3500ms] ease-out' : '',
              fairySkillsExiting ? 'translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-in-out' : '',
            ]"></video>

          {{ activeTheme ? t('skills.sysTitle') : t('skills.title') }}
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
          {{ activeTheme ? t('projects.sysTitle') : t('projects.title') }}
        </div>
      </div>
      <Projects :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mb-28" id="projectsMob">
      <ProjectsMob :activeTheme="activeTheme" :glowIntensity="glowIntensity" @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="contact">
      <div class="col-span-full flex justify-center">
        <div
          id="contactTitle"
          :class="[
            'uppercase px-14 py-3 text-xl font-semibold transition-all duration-500 relative',
            activeTheme
              ? 'border-2 border-current animate-neon-chroma font-mono tracking-widest text-white shadow-[0_0_20px_currentColor]'
              : 'border-[6px] border-neutral-900 dark:border-neutral-100 border-solid',
          ]">
          <Transition name="fade">
            <div
              v-if="isDark && !activeTheme && showContactBox && !fairyContactExiting"
              class="absolute bottom-[7rem] left-[-17rem] w-60 bg-neutral-900 border border-purple-500 text-neutral-100 p-4 rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.6)] z-[60] font-mono text-xs leading-relaxed normal-case">
              {{ fairyContactText }}<span v-if="!fairyContactClickable" class="animate-pulse">_</span>
              <div class="absolute bottom-[-6px] right-8 w-3 h-3 bg-neutral-900 border-b border-r border-purple-500 transform rotate-45"></div>
            </div>
          </Transition>

          <video
            v-if="isDark && !activeTheme"
            v-show="fairyContactTriggered"
            ref="fairyContactVideoRef"
            :src="fairyVideoSrc"
            muted
            playsinline
            controlsList="nodownload no-remote-playback noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabindex="-1"
            data-idm-disabled="true"
            idm-skip="true"
            @contextmenu.prevent
            @click="handleContactFairyClick"
            @timeupdate="handleContactFairyTimeUpdate"
            :class="[
              'absolute z-50 w-28 top-[-2.5rem] left-[-9.5rem]',
              fairyContactClickable && !fairyContactExiting ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none',
              !fairyContactLanded && !fairyContactExiting ? '-translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-out' : '',
              fairyContactLanded && !fairyContactExiting ? 'translate-x-0 translate-y-0 transition-all duration-[3500ms] ease-out' : '',
              fairyContactExiting ? '-translate-x-[100vw] translate-y-[90px] transition-all duration-[3500ms] ease-in-out' : '',
            ]"></video>

          {{ activeTheme ? t('contact.sysTitle') : t('contact.title') }}
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
  <NightclubModal :isOpen="isNightclubOpen" :isLocked="isShortcutLocked" @close="closeNightclubModal" @selectTheme="handleThemeSelection" @unlock="isShortcutLocked = false" />

  <Teleport to="body">
    <Transition name="image-fade">
      <div v-show="showWelcomeAnimation" class="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm">
        <video
          ref="welcomeVideoRef"
          :src="welcomeVideoSrc"
          muted
          playsinline
          preload="auto"
          controlsList="nodownload no-remote-playback noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden="true"
          tabindex="-1"
          data-idm-disabled="true"
          idm-skip="true"
          @contextmenu.prevent
          @ended="onWelcomeVideoEnded"
          class="max-w-3xl w-full drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] rounded-xl pointer-events-none"></video>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-neon-chroma {
  animation: neonChromaShift 12s linear infinite;
}
</style>
