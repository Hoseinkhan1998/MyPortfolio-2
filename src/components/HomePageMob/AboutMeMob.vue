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
const sectionVisibility = ref([false, false, false, false, false]); // 5 بخش: توضیحات + 4 مهارت

const handleScroll = () => {
  const sections = document.querySelectorAll(".animate-section");
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8 && !sectionVisibility.value[index]) {
      sectionVisibility.value[index] = true; // بخش نمایش داده شده
    }
  });
};

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
    <div class="col-span-full">
      <div class="flex justify-center">
        <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">About Me</div>
      </div>
    </div>
    <div class="col-span-full mt-10">
      <div class="flex justify-center px-5">
        <div class="w-full text-center animate-section" :class="{ visible: sectionVisibility[0] }">
          <p>
            a 26-year-old Front-End Developer with a passion for clean code and creative user interfaces. With one year of hands-on experience and three years of coding journey, I
            thrive on solving problems and debugging with precision. I'm a responsible and curious developer who truly loves learning and building.
          </p>
          <!-- explore -->
          <div class="flex justify-center mt-20">
            <div class="border-x-[4px] font-semibold border-neutral-900 dark:border-neutral-100 px-10 uppercase h-10 text-center flex items-center border-solid">explore</div>
          </div>
          <Divider />
        </div>
      </div>
    </div>
    <div class="col-span-full flex items-center justify-center">
      <div class="grid w-full grid-cols-12 gap-y-10 px-5">
        <!-- Clean Code & Bug Fixing -->
        <div class="col-span-full mt-10 animate-section" :class="{ visible: sectionVisibility[1] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 opacity-15">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
              <p class="text-xl font-semibold capitalize">Clean Code & Bug Fixing</p>
            </div>
            <p class="text-start text-sm mt-3">
              I'm meticulous in debugging and passionate about writing clean, maintainable code. I don’t just fix bugs — I prevent them with solid practices.
            </p>
          </div>
        </div>
        <!-- Precision Implementation -->
        <div class="col-span-full mt-10 animate-section" :class="{ visible: sectionVisibility[2] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg
                class="size-12 opacity-15"
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="512.000000pt"
                height="512.000000pt"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                  <path
                    d="M78 5099 c-41 -21 -78 -81 -78 -124 0 -50 248 -1003 284 -1091 78 -192 98 -216 614 -735 259 -261 472 -479 472 -484 0 -6 -292 -302 -649 -660 -703 -703 -692 -690 -714 -821 -8 -47 -8 -82 0 -130 23 -135 29 -143 467 -580 437 -438 445 -444 580 -467 48 -8 83 -8 130 0 131 22 118 11 821 714 358 357 655 649 660 649 6 0 276 -266 600 -591 325 -325 618 -610 652 -635 72 -52 163 -95 254 -120 88 -25 289 -25 379 0 213 57 396 207 490 401 59 122 74 190 74 335 0 179 -40 308 -138 443 -25 34 -310 327 -635 652 -325 324 -591 594 -591 600 0 5 292 302 649 660 703 703 692 690 714 821 8 47 8 82 0 130 -23 135 -29 143 -467 580 -437 438 -445 444 -580 467 -48 8 -83 8 -130 0 -131 -22 -118 -11 -821 -714 -358 -357 -654 -649 -660 -649 -5 0 -219 209 -475 464 -382 381 -480 474 -550 519 -103 66 -144 87 -236 120 -94 34 -1014 267 -1050 267 -16 -1 -46 -10 -66 -21z m4354 -666 c402 -402 406 -406 379 -471 -7 -16 -46 -62 -87 -103 l-74 -74 -238 237 c-130 130 -247 241 -259 247 -12 6 -43 11 -70 11 -54 0 -95 -22 -124 -66 -24 -37 -25 -120 -3 -154 9 -14 121 -130 248 -257 l231 -233 -115 -115 -114 -115 -136 134 c-112 112 -141 135 -173 141 -110 21 -201 -73 -177 -182 7 -28 37 -65 142 -170 l133 -133 -117 -117 -118 -118 -247 247 c-276 274 -280 277 -368 243 -71 -27 -105 -91 -90 -172 6 -33 40 -72 251 -283 l244 -245 -115 -115 -115 -114 -128 126 c-70 70 -140 132 -155 137 -126 48 -244 -70 -196 -196 5 -15 67 -85 137 -155 l126 -128 -112 -113 -112 -112 -237 237 c-131 130 -248 241 -260 247 -12 6 -43 11 -70 11 -54 0 -95 -22 -124 -66 -24 -37 -25 -120 -3 -154 9 -14 121 -130 248 -257 l231 -233 -115 -115 -114 -115 -136 134 c-112 112 -141 135 -173 141 -110 21 -201 -73 -177 -182 7 -28 37 -65 142 -170 l133 -133 -117 -117 -118 -118 -247 247 c-276 274 -280 277 -368 243 -71 -27 -105 -91 -90 -172 6 -33 40 -72 251 -283 l244 -245 -115 -115 -115 -114 -128 126 c-70 70 -140 132 -155 137 -126 48 -244 -70 -196 -196 5 -15 67 -85 137 -155 l126 -128 -74 -75 c-40 -41 -86 -79 -102 -86 -65 -27 -70 -23 -470 378 -250 251 -379 387 -384 406 -3 15 -3 39 0 55 5 18 570 590 1809 1831 991 991 1816 1812 1832 1823 22 14 41 18 69 14 36 -4 68 -34 418 -383z m-3723 241 c373 -95 445 -119 546 -186 75 -48 245 -202 245 -221 0 -16 -631 -647 -647 -647 -19 0 -171 169 -221 245 -25 38 -58 101 -73 140 -21 55 -199 724 -199 749 0 10 -4 10 349 -80z m1276 -884 l260 -260 -328 -328 -327 -327 -262 263 -263 262 325 325 c179 179 327 325 330 325 3 0 122 -117 265 -260z m1862 -1862 c172 -172 313 -317 313 -323 0 -13 -632 -645 -645 -645 -6 0 -152 142 -325 315 l-315 315 325 325 c179 179 327 325 330 325 3 0 146 -141 317 -312z m714 -716 c195 -198 229 -251 251 -379 39 -232 -114 -464 -343 -518 -82 -19 -133 -19 -219 1 -101 23 -172 74 -360 260 l-165 163 325 326 c179 179 328 325 331 325 4 0 85 -80 180 -178z" />
                </g>
              </svg>
              <p class="text-xl font-semibold capitalize">Precision Implementation</p>
            </div>
            <p class="text-start text-sm mt-3">
              I turn designs into pixel-perfect, responsive websites. You give me the design — I’ll bring it to life with precision and attention to detail.
            </p>
          </div>
        </div>
        <!-- Dedicated Development -->
        <div class="col-span-full mt-10 animate-section" :class="{ visible: sectionVisibility[3] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg class="size-12 fill-current opacity-15" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
                <path
                  d="M 5 2 C 3.355469 2 2 3.355469 2 5 L 2 35 C 2 36.644531 3.355469 38 5 38 L 19 38 L 19 40 L 10 40 C 9.96875 40 9.9375 40 9.90625 40 C 9.636719 40.027344 9.386719 40.160156 9.21875 40.375 L 4.21875 46.375 C 3.976563 46.675781 3.929688 47.085938 4.097656 47.433594 C 4.265625 47.78125 4.617188 48 5 48 L 45 48 C 45.382813 48 45.734375 47.78125 45.902344 47.433594 C 46.070313 47.085938 46.023438 46.675781 45.78125 46.375 L 40.78125 40.375 C 40.589844 40.136719 40.304688 40 40 40 L 31 40 L 31 38 L 45 38 C 46.644531 38 48 36.644531 48 35 L 48 5 C 48 3.355469 46.644531 2 45 2 Z M 5 4 L 45 4 C 45.554688 4 46 4.445313 46 5 L 46 35 C 46 35.554688 45.554688 36 45 36 L 5 36 C 4.445313 36 4 35.554688 4 35 L 4 5 C 4 4.445313 4.445313 4 5 4 Z M 6 6 L 6 34 L 44 34 L 44 6 Z M 8 8 L 42 8 L 42 32 L 8 32 Z M 19.28125 11.28125 L 11.28125 19.28125 L 10.59375 20 L 11.28125 20.71875 L 19.28125 28.71875 L 20.71875 27.28125 L 13.4375 20 L 20.71875 12.71875 Z M 30.71875 11.28125 L 29.28125 12.71875 L 36.5625 20 L 29.28125 27.28125 L 30.71875 28.71875 L 38.71875 20.71875 L 39.40625 20 L 38.71875 19.28125 Z M 21 38 L 29 38 L 29 42 L 21 42 Z M 10.46875 42 L 19 42 L 19 44 L 31 44 L 31 42 L 39.53125 42 L 42.875 46 L 7.125 46 Z"></path>
              </svg>
              <p class="text-xl font-semibold capitalize">Dedicated Development</p>
            </div>
            <p class="text-start text-sm mt-3">
              Driven and committed, I ensure every project progresses smoothly. I care deeply about quality, deadlines, and delivering the best possible result.
            </p>
          </div>
        </div>
        <!-- AI-Driven Solutions -->
        <div class="col-span-full mt-10 animate-section" :class="{ visible: sectionVisibility[4] }">
            <div class="flex flex-col items-start">
              <div class="flex items-center gap-2">
                <svg class=" fill-neutral-900 dark:fill-neutral-100 size-12 opacity-15" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                  <path
                    d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
                </svg>
                <p class="text-xl font-semibold capitalize">AI-Driven Solutions</p>
              </div>
              <p class="text-start text-sm mt-3">
                I'm skilled in leveraging Artificial Intelligence to enhance my development process. From crafting precise prompts to using AI for bug fixing, I understand how to
                harness its power effectively to streamline projects and deliver top-quality results.
              </p>
            </div>
          </div>
        </div>
    </div>
    <div class="col-span-full mb-20">
      <div class="flex justify-center">
        <div class="w-4/6 text-center">
          <Divider />
        </div>
      </div>
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
