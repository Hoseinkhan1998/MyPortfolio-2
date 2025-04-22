<script setup>
import { ref, onMounted, onUnmounted } from "vue";
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

const currentSection = ref("");
// ۲) اسکرول ۲۰۰px بالاتر و ست کردن currentSection
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

// ۳) هنگام اسکرول دستی، بخش فعال رو تشخیص می‌دهیم
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
    // قبل از بخش aboutMe یا روی TopSection هستیم
    currentSection.value = "";
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="grid grid-cols-12 bg-neutral-200 text-neutral-900 dark:text-neutral-100 dark:bg-neutral-950">
    <div class="col-span-full z-20 sticky top-0 lg:block hidden">
      <div class="bg-[#00000050] text-white px-5 py-4 backdrop-blur-sm">
        <Header :currentSection="currentSection" @handleDisplay="handleDisplay" />
      </div>
    </div>
    <div class="col-span-full z-20 sticky top-0 lg:hidden block">
      <div class="text-white px-5 py-4">
        <HeaderMob :currentSection="currentSection" @handleDisplay="handleDisplay" />
      </div>
    </div>
    <div class="col-span-full lg:block hidden -mt-24">
      <TopSection @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block -mt-[12vh]" style="height: 80vh">
      <TopSectionMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mt-24 mb-28 playtable" id="aboutMe">
      <AboutMe @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mt-24 playtable" id="aboutMeMob">
      <AboutMeMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="skills">
      <Skills @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block" id="skillsMob">
      <SkillsMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="projects">
      <Projects @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mb-28" id="projectsMob">
      <ProjectsMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:block hidden mb-28" id="contact">
      <ContactMe @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full lg:hidden block mb-28" id="contactMob">
      <ContactMeMob @handleDisplay="handleDisplay" />
    </div>
    <div class="col-span-full" id="contact">
      <Footer @handleDisplay="handleDisplay" />
    </div>
  </div>
  <!-- scroll to top button -->
  <button v-if="showScrollToTop" @click="scrollToTop" class="fixed bottom-4 z-30 left-4">
    <div class="bg-neutral-700 text-white p-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
      </svg>
    </div>
  </button>
</template>

<style>
.playtable {
  scroll-margin-top: 16px;
}
</style>
