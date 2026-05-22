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
    description:
      "A modern e-commerce platform built with Nuxt 4 and TypeScript, featuring a powerful product search engine, category-based filtering, Supabase integration, Pinia state management, optimized images with Nuxt Image, and a clean responsive UI powered by Tailwind CSS.",
  },
  {
    skills: ["React", "TypeScript", "AI Analysis", "React Query", "Supabase", "Framer Motion", "Zod", "Medical Imaging"],
    img: "lab-ai.webp",
    link: "https://app.snapcyte.com",
    description:
      "AI-powered laboratory platform developed for a Canadian company, focused on scientific image processing and life science data analysis. Features advanced medical image interpretation, AI-assisted workflows, custom model integration, efficient state management with React Query, and interactive UI components for research environments.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "mywebsite.webp",
    link: "https://www.hoseinmazinani.ir",
    description:
      "a CV website for Hosein Mazinani, showcasing my skills using Vue.js and Tailwind CSS. The site highlights my expertise and experience in a clean and modern design.",
  },
  {
    skills: ["React", "Tailwind", "Syncfusion", "Eslint"],
    img: "dashboard.webp",
    link: "https://dashboard-five-flax.vercel.app/",
    description: "Data-rich React dashboard built with Syncfusion components and styled with Tailwind CSS.",
  },
  {
    skills: ["NEXT.JS", "React", "Mongo db", "SWR", "Html&Css"],
    img: "event.webp",
    link: "https://nextjs-tutorial-coral-three.vercel.app/",
    description: "Dynamic event list app built using Next.js, React, MongoDB, and SWR for data management.",
  },
  {
    skills: ["React", "MUI", "Axios", "Emotion"],
    img: "clone.webp",
    link: "https://youtube-clone-xi-five.vercel.app/",
    description: "YouTube clone app built in React with MUI for a sleek UI and Axios for data management.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "octopus.webp",
    link: "https://octopus-website-ten.vercel.app/",
    description: "Octopus Company website to introduce the company and the modules they offer.",
  },
  {
    skills: ["vue", "daisyui", "vuetify", "Tailwind", "Swiper"],
    img: "yekmovie.webp",
    link: "https://yek-movie-hosein-khan.vercel.app/",
    description: "A Persian site for downloading the latest movies and series.",
  },
];

const sectionVisibility = ref(projects.map(() => false));
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full flex justify-center">
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">Projects</div>
    </div>
    <!-- skils -->
    <div class="col-span-full mt-20 flex justify-center">
      <div class="container">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="project-card w-full rounded-[10px] bg-neutral-300 shadow-lg shadow-neutral-400 dark:shadow-neutral-800 dark:bg-neutral-800"
          :class="[index % 2 === 0 ? 'project-card-right' : 'project-card-left', sectionVisibility[index] ? 'project-card-visible' : '']">
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
    <div class="col-span-full flex justify-center mb-20">
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
