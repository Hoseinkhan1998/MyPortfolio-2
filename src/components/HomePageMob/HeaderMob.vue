<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useDark, useToggle } from "@vueuse/core";

const emit = defineEmits(["handleDisplay"]);

function handleDisplay(item) {
  emit("handleDisplay", item);
}

const props = defineProps({
  currentSection: String,
});

const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

const isDark = useDark();
const toggleDark = useToggle(isDark);
const menuRef = ref(null); // Ref برای منوی دراپ‌دون
const buttonRef = ref(null); // Ref برای دکمه همبرگر

function handleClickOutside(event) {
  if (menuRef.value && !menuRef.value.contains(event.target) && buttonRef.value && !buttonRef.value.contains(event.target)) {
    isMenuOpen.value = false;
  }
}

// اضافه کردن و حذف event listener هنگام باز/بسته شدن منو
watch(isMenuOpen, (isOpen) => {
  if (isOpen) {
    document.addEventListener("click", handleClickOutside);
  } else {
    document.removeEventListener("click", handleClickOutside);
  }
});

// حذف event listener هنگام unmount شدن کامپوننت
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-6">
      <div class="flex justify-start">
        <div class="cursor-pointer text-neutral-900 dark:text-neutral-100">
          <label class="swap !z-30 swap-rotate">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" @click="toggleDark()" />

            <!-- sun icon -->
            <svg class="swap-off h-8 mt-2 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            <!-- moon icon -->
            <svg class="swap-on h-8 mt-2 w-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
    <div class="col-span-6 flex justify-end">
      <div class="relative">
        <!-- تغییر در دکمه همبرگر -->
        <button ref="buttonRef" class="mt-2 z-30 text-neutral-900 dark:text-neutral-100 swap swap-rotate" @click="toggleMenu">
          <input type="checkbox" :checked="isMenuOpen" />
          <!-- آیکون همبرگر -->
          <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
          <!-- آیکون بستن -->
          <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </button>

        <!-- منوی دراپ‌دون -->
        <Transition name="menu">
          <div
            v-if="isMenuOpen"
            ref="menuRef"
            class="fixed top-0 left-0 right-0 text-neutral-900 dark:text-neutral-100 bg-neutral-100 text-center flex justify-center dark:bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-out z-10">
            <div class="pt-20 pb-5 text-2xl text-center flex flex-col justify-center">
              <button
                @click="
                  handleDisplay('aboutMeMob');
                  toggleMenu();
                "
                :class="['rounded-xl w-36', props.currentSection === 'aboutMeMob' ? 'bg-neutral-100 text-neutral-900' : '']"
                class="block capitalize text-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                about me
              </button>
              <button
                @click="
                  handleDisplay('skillsMob');
                  toggleMenu();
                "
                :class="['rounded-xl w-36', props.currentSection === 'skillsMob' ? 'bg-neutral-100 text-neutral-900' : '']"
                class="block capitalize w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                skills
              </button>
              <button
                @click="
                  handleDisplay('projectsMob');
                  toggleMenu();
                "
                :class="['rounded-xl w-36', props.currentSection === 'projectsMob' ? 'bg-neutral-100 text-neutral-900' : '']"
                class="block capitalize w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                projects
              </button>
              <button
                @click="
                  handleDisplay('contactMob');
                  toggleMenu();
                "
                :class="['rounded-xl w-36', props.currentSection === 'contactMob' ? 'bg-neutral-100 text-neutral-900' : '']"
                class="block capitalize w-full text-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
                contact
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* انیمیشن باز شدن منو */
.menu-enter-active,
.menu-leave-active {
  transition: transform 0.3s ease-out, opacity 0.2s ease-out;
}

.menu-enter-from,
.menu-leave-to {
  transform: translateY(-70px);
  opacity: 0;
}

.menu-enter-to,
.menu-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
