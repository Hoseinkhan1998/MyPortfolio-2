<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import Divider from "../Divider.vue";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({
  isMobile: Boolean,
});

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
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-full flex justify-center">
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">Projects</div>
    </div>
    <!-- skils -->
    <div class="col-span-full flex mt-20 justify-center mb-20">
      <p class="col-span-6">coming soon....</p>
    </div>
    <div class="col-span-full flex justify-center mb-20">
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
</style>
