<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import SplashCursor from "./components/SplashCursor.vue";
import { useI18n } from 'vue-i18n';
import { setDocumentDirection } from './i18n.js';

const showSplashCursor = ref(false);
const { locale } = useI18n();

watch(locale, (newLocale) => {
  setDocumentDirection(newLocale);
  localStorage.setItem('user-locale', newLocale);
});

const handleKeyDown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.code === "KeyF" || e.key === "F" || e.key === "f")) {
    e.preventDefault();
    showSplashCursor.value = !showSplashCursor.value;
    return;
  }

  if (e.code === "Escape" && showSplashCursor.value) {
    e.preventDefault();
    showSplashCursor.value = false;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <div class="grid grid-cols-12 relative overflow-x-clip">
    <div class="col-span-full">
      <router-view></router-view>
    </div>
    <SplashCursor v-if="showSplashCursor" />
  </div>
</template>


<style>
@font-face {
  font-family: "IRANSansX";
  src: url("/IRANSansX-Regular.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
body {
  font-family: "IRANSansX", sans-serif;
}
html.dark {
  color-scheme: dark;
}
</style>
