<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Divider from "../Divider.vue";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({});

const isDark = useDark();
const toggleDark = useToggle(isDark);
const { t } = useI18n();
// اضافه کردن منطق انیمیشن اسکرول
const sectionVisibility = ref(Array(12).fill(false)); // 5 بخش: توضیحات + 4 مهارت

const handleScroll = () => {
  const sections = document.querySelectorAll(".animate-section");
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && !sectionVisibility.value[index]) {
      sectionVisibility.value[index] = true; // بخش نمایش داده شده
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
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full flex justify-center">
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">{{ t('projects.title') }}</div>
    </div>
    <!-- skils -->
    <div class="col-span-full mt-20 flex justify-center">
      <div class="container">
        <div v-for="(project, index) in projects" :key="index" class="w-full rounded-[10px] bg-neutral-300 shadow-lg shadow-neutral-400 dark:shadow-neutral-800 dark:bg-neutral-800">
          <div class="skill1" :style="{ backgroundImage: `url(/images/${project.img})` }">
            <div class="content w-full flex flex-col px-6">
              <div class="flex flex-wrap justify-center gap-2" style="padding: 15% 12%; height: 200px">
                <div
                  v-for="(skill, skillIndex) in project.skills"
                  :key="skillIndex"
                  class="flex justify-center items-center font-extralight text-white px-4 bg-transparent rounded-lg"
                  style="border: solid 1px white; height: 23px">
                  {{ skill }}
                </div>
              </div>
              <div class="w-3/12 lg:w-3/12">
                <a
                  :href="project.link"
                  target="_blank"
                  class="flex text-white font-semibold py-1 justify-center items-center rounded-lg mb-6"
                  style="background-color: rgba(5, 5, 5, 0.5); border: solid 2px white">
                  {{ t('projects.visit') }}
                </a>
              </div>
            </div>
          </div>
          <div class="text-[14px] mt-2 pl-3 font-medium pb-2">
            <p>{{ t('projects.items.' + project.descriptionKey + '.descMob') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-full flex justify-center">
      <Divider />
    </div>
  </div>
</template>

<style scoped>
.animate-section {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animate-section.visible {
  opacity: 1;
  transform: translateY(0);
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
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: rgb(0, 0, 0);
  border-radius: 10px 10px 0px 0px;
  transition: box-shadow 0.5s;
}

.skill1:hover {
  box-shadow: inset 0 500px rgba(5, 5, 5, 0.75);
}

.content {
  opacity: 0;
}

.content:hover {
  opacity: 1;
  transition: opacity 2s;
}
</style>
