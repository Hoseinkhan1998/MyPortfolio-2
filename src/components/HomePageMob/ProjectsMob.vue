<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Divider from "../Divider.vue";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({});

const isDark = useDark();
const toggleDark = useToggle(isDark);
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
    skills: ["NEXT.JS", "React", "Tailwind", "Framer Motion"],
    img: "project2.png",
    link: "https://www.hoseinmazinani.ir",
    description: "Hossein's interactive CV built with Next.js and subtle animations in React & Tailwind.",
  },
  {
    skills: ["React", "Tailwind", "Syncfusion", "Eslint"],
    img: "dashboard.png",
    link: "https://dashboard-five-flax.vercel.app/",
    description: "Data-rich React dashboard built with Syncfusion components and styled with Tailwind CSS.",
  },
  {
    skills: ["NEXT.JS", "React", "Mongo db", "SWR", "Html&Css"],
    img: "event.png",
    link: "https://nextjs-tutorial-coral-three.vercel.app/",
    description: "Dynamic event list app built using Next.js, React, MongoDB, and SWR for data management.",
  },
  {
    skills: ["React", "MUI", "Axios", "Emotion"],
    img: "clone.png",
    link: "https://youtube-clone-xi-five.vercel.app/",
    description: "YouTube clone app built in React with MUI for a sleek UI and Axios for data management.",
  },
  {
    skills: ["React", "Tailwind", "Redux", "Next.js"],
    img: "shoppingcard.png",
    link: "https://shopping-card-coral.vercel.app/",
    description: "Interactive shopping cart built with Next.js, React and Redux for state management.",
  },
  {
    skills: ["mui-tel", "MUI", "React", "Tailwind", "swipeable views"],
    img: "fintech.png",
    link: "https://fintech-mobile-app-psi.vercel.app/",
    description: "A mobile fintech app built with React & MUI, inspired by Figma, featuring swipeable views.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "octopus.png",
    link: "https://octopus-website-ten.vercel.app/",
    description: "Octopus Company website to introduce the company and the modules they offer.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "yekmovie.png",
    link: "https://yek-movie-hosein-khan.vercel.app/",
    description: "A Persian site for downloading the latest movies and series.",
  },
];
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full flex justify-center">
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">Projects</div>
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
                  Visit
                </a>
              </div>
            </div>
          </div>
          <div class="text-[14px] mt-2 pl-3 font-medium pb-2">
            <p>{{ project.description }}</p>
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
