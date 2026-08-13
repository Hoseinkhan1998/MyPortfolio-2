<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import SplashCursor from "./components/SplashCursor.vue";

const showSplashCursor = ref(false);

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
  <div class="grid grid-cols-12 relative">
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
