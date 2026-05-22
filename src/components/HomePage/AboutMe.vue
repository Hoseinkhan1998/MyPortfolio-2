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
const sectionVisibility = ref([false, false, false, false, false, false, false]); // 5 بخش: توضیحات + 4 مهارت

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
    <div class="col-span-full mt-10 mb-20">
      <div class="flex justify-center">
        <div class="w-4/6 text-center animate-section" :class="{ visible: sectionVisibility[0] }">
          <p>
            I'm a Front-End Developer with over 4 years of experience building modern, responsive, and user-focused web applications. Over the years, I've worked with a wide range
            of technologies including JavaScript, TypeScript, Vue, React, Nuxt, Next.js, and Quasar, and I've developed a strong eye for clean UI implementation and scalable
            front-end architecture.
            <br /><br />
            I genuinely enjoy turning ideas and designs into polished digital experiences. Tailwind CSS is one of the tools I feel especially confident with, allowing me to craft
            fast, flexible, and visually refined interfaces with precision.
            <br /><br />
            Beyond coding, I'm someone who cares deeply about code quality, maintainability, performance, and continuous learning. I enjoy solving problems, improving user
            experiences, and building products that not only work well <span class="font-semibold"> but feel great to use.</span>
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
      <div class="grid w-full grid-cols-12">
        <!-- Front-End Architecture -->
        <div class="col-span-3"></div>
        <div class="col-span-4 mt-10 mb-20 animate-section" :class="{ visible: sectionVisibility[1] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="currentColor"
                height="60px"
                width="60px"
                version="1.1"
                class="fill-current opacity-15"
                id="Layer_1"
                viewBox="0 0 295.239 295.239"
                xml:space="preserve">
                <g>
                  <g>
                    <g>
                      <path
                        d="M244.352,239.382l-6.91-6.557c-0.348,0.367-0.729,0.695-1.081,1.057l-39.614-129.643     c5.005-6.448,8.014-14.514,8.014-23.286c0-21.005-17.09-38.095-38.095-38.095V25.372c1.267,0.195,2.524,0.329,3.79,0.562     l1.738-9.367c-1.957-0.362-3.91-0.595-5.867-0.867c-1.59-8.905-9.352-15.7-18.71-15.7c-9.358,0-17.117,6.796-18.707,15.701     c-1.957,0.276-3.91,0.505-5.867,0.867l1.738,9.367c1.267-0.233,2.524-0.367,3.79-0.562v17.486     c-21.005,0-38.095,17.09-38.095,38.095c0,8.771,3.01,16.838,8.01,23.281L58.871,233.877c-0.352-0.362-0.733-0.69-1.081-1.057     l-6.91,6.557c1.557,1.638,3.214,3.19,4.857,4.757l-7.914,25.905l-0.205,25.2l27.91-20.933l3.757-12.295     c1.014,0.61,2.005,1.281,3.024,1.852l4.662-8.305c-1.624-0.914-3.214-1.952-4.819-2.952l17.533-57.367h95.862l17.529,57.371     c-1.605,1-3.19,2.038-4.819,2.952l4.662,8.305c1.024-0.576,2.01-1.248,3.024-1.852l3.757,12.295l27.919,20.929V270.72     l-8.124-26.581C241.138,242.572,242.8,241.02,244.352,239.382z M166.667,52.382c15.757,0,28.571,12.814,28.571,28.571     c0,9.171-4.362,17.329-11.1,22.557c-2.79-9.433-9.138-17.333-17.49-22.176c0-0.129,0.019-0.252,0.019-0.381     c0-10.276-4.11-19.595-10.748-26.457C159.243,53.144,162.867,52.382,166.667,52.382z M165.086,91.73     c5.181,4.019,8.943,9.767,10.41,16.381c-2.782,0.909-5.744,1.414-8.829,1.414c-3.8,0-7.424-0.762-10.748-2.114     C160.138,103.049,163.324,97.697,165.086,91.73z M147.619,102.191c-4.362-3.919-7.524-9.138-8.833-15.062     c2.785-0.909,5.747-1.414,8.833-1.414s6.048,0.505,8.833,1.414C155.142,93.053,151.981,98.272,147.619,102.191z M147.619,76.191     c-3.205,0-6.3,0.443-9.276,1.19c0.876-6.985,4.286-13.18,9.276-17.666c4.99,4.481,8.4,10.676,9.276,17.662     C153.919,76.634,150.824,76.191,147.619,76.191z M139.319,107.411c-3.324,1.352-6.948,2.114-10.748,2.114     c-3.086,0-6.048-0.505-8.833-1.414c1.467-6.614,5.229-12.362,10.41-16.381C131.914,97.696,135.1,103.049,139.319,107.411z      M128.571,119.048c6.943,0,13.438-1.895,19.048-5.152c5.61,3.257,12.105,5.152,19.048,5.152c3.205,0,6.3-0.443,9.276-1.19     c-1.767,14.072-13.781,25-28.324,25c-14.543,0-26.557-10.929-28.324-25C122.271,118.606,125.366,119.048,128.571,119.048z      M138.095,19.049c0-5.252,4.271-9.524,9.524-9.524s9.524,4.271,9.524,9.524v25.062c-3.381,0.876-6.576,2.19-9.524,3.9     c-2.948-1.714-6.143-3.024-9.524-3.9V19.049z M128.571,52.382c3.8,0,7.424,0.762,10.748,2.114     c-6.638,6.862-10.748,16.181-10.748,26.457c0,0.129,0.019,0.252,0.019,0.381c-8.352,4.843-14.7,12.743-17.49,22.176     c-6.738-5.229-11.1-13.386-11.1-22.557C100,65.196,112.814,52.382,128.571,52.382z M67.329,268.549l-10.186,7.642v-4.052     l49.024-160.448c1.086,0.795,2.21,1.533,3.376,2.21c0,0.133-0.019,0.257-0.019,0.386c0,3.79,0.576,7.443,1.61,10.9     L67.329,268.549z M102.6,185.715l14.776-48.357c6.967,9.11,17.914,15.024,30.243,15.024c12.329,0,23.276-5.914,30.243-15.024     l14.776,48.357H102.6z M238.096,276.191L238.096,276.191l-10.187-7.638l-43.804-143.362c1.033-3.462,1.61-7.114,1.61-10.905     c0-0.129-0.019-0.252-0.019-0.381c1.167-0.676,2.29-1.419,3.376-2.21l49.024,160.443V276.191z" />
                      <path d="M208.3,28.882c-5.633-2.876-11.529-5.381-17.514-7.433l-3.081,9.014c5.557,1.9,11.029,4.224,16.262,6.9L208.3,28.882z" />
                      <path d="M262.886,80.568c-3.186-5.457-6.795-10.748-10.733-15.714l-7.462,5.914c3.662,4.619,7.014,9.529,9.971,14.595     L262.886,80.568z" />
                      <path d="M239.29,50.815c-4.605-4.357-9.552-8.419-14.714-12.067l-5.5,7.776c4.79,3.39,9.39,7.162,13.667,11.21L239.29,50.815z" />
                      <path d="M267.876,118.053l9.248-2.262c-1.505-6.157-3.476-12.252-5.852-18.133l-8.829,3.571     C264.652,106.687,266.481,112.349,267.876,118.053z" />
                      <path
                        d="M280.319,134.558l-9.476,0.919c0.386,4.019,0.586,8.1,0.586,12.143c0,1.857-0.038,3.7-0.119,5.538l9.514,0.419     c0.086-1.976,0.129-3.962,0.129-5.957C280.952,143.272,280.743,138.877,280.319,134.558z" />
                      <path d="M264.767,187.801l9.01,3.086c2.057-5.99,3.69-12.186,4.867-18.405l-9.362-1.767     C268.19,176.491,266.671,182.239,264.767,187.801z" />
                      <path d="M248.671,219.172l7.771,5.505c3.671-5.176,6.995-10.648,9.876-16.267l-8.471-4.352     C255.167,209.282,252.081,214.368,248.671,219.172z" />
                      <path d="M174.533,268.491l2.067,9.3c6.348-1.414,12.624-3.3,18.662-5.619l-3.414-8.89     C186.248,265.43,180.424,267.182,174.533,268.491z" />
                      <path
                        d="M147.614,271.43c-3.029-0.071-6.048-0.105-9.067-0.324l-0.695,9.495c3.19,0.238,6.414,0.352,9.581,0.352     c3.448,0.062,6.643-0.11,9.89-0.348l-0.686-9.495C153.676,271.325,150.638,271.43,147.614,271.43z" />
                      <path d="M99.924,272.153c6.067,2.329,12.343,4.219,18.657,5.619l2.062-9.3c-5.857-1.295-11.681-3.052-17.305-5.21L99.924,272.153     z" />
                      <path d="M107.681,30.415l-3.071-9.014c-5.995,2.038-11.9,4.533-17.543,7.419l4.333,8.481     C96.638,34.625,102.114,32.311,107.681,30.415z" />
                      <path d="M50.633,70.672l-7.457-5.924c-3.948,4.971-7.567,10.257-10.748,15.705l8.224,4.81     C43.605,80.196,46.967,75.291,50.633,70.672z" />
                      <path d="M28.857,208.287c2.881,5.629,6.2,11.1,9.862,16.281l7.776-5.505c-3.405-4.805-6.486-9.89-9.157-15.119L28.857,208.287z" />
                      <path d="M25.933,170.582l-9.362,1.757c1.171,6.233,2.8,12.424,4.848,18.414l9.014-3.076     C28.529,182.12,27.014,176.368,25.933,170.582z" />
                      <path
                        d="M23.81,147.615c0-4.09,0.2-8.229,0.6-12.281l-9.476-0.938c-0.433,4.371-0.648,8.819-0.648,13.224     c0,1.943,0.043,3.876,0.124,5.81l9.514-0.419C23.848,151.22,23.81,149.425,23.81,147.615z" />
                      <path d="M76.271,46.444l-5.495-7.776c-5.162,3.643-10.119,7.695-14.729,12.048l6.538,6.929     C66.871,53.601,71.476,49.834,76.271,46.444z" />
                      <path d="M32.843,101.106l-8.824-3.581c-2.376,5.857-4.352,11.952-5.871,18.11l9.243,2.281     C28.805,112.206,30.638,106.549,32.843,101.106z" />
                    </g>
                  </g>
                </g>
              </svg>
              <p class="text-xl font-semibold capitalize">Front-End Architecture</p>
            </div>
            <p class="text-start text-sm mt-3">
              I build scalable and maintainable front-end applications with a strong focus on clean structure, reusable components, and long-term readability. I care about writing
              code that teams can grow with comfortably.
            </p>
          </div>
        </div>
        <div class="col-span-5"></div>
        <!-- Pixel-Perfect UI Development -->
        <div class="col-span-6"></div>
        <div class="col-span-4 mt-10 animate-section" :class="{ visible: sectionVisibility[2] }">
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
              <p class="text-xl font-semibold capitalize">Pixel-Perfect UI Development</p>
            </div>
            <p class="text-start text-sm mt-3">
              I enjoy transforming designs into responsive and polished user interfaces with precision. From complex layouts to subtle interactions, I pay close attention to the
              small details that shape a great user experience.
            </p>
          </div>
        </div>
        <div class="col-span-2"></div>
        <div class="col-span-3"></div>
        <!-- Modern JavaScript Ecosystem -->
        <div class="col-span-4 mt-28 animate-section" :class="{ visible: sectionVisibility[3] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg class="size-12 fill-current opacity-15" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50">
                <path
                  d="M 5 2 C 3.355469 2 2 3.355469 2 5 L 2 35 C 2 36.644531 3.355469 38 5 38 L 19 38 L 19 40 L 10 40 C 9.96875 40 9.9375 40 9.90625 40 C 9.636719 40.027344 9.386719 40.160156 9.21875 40.375 L 4.21875 46.375 C 3.976563 46.675781 3.929688 47.085938 4.097656 47.433594 C 4.265625 47.78125 4.617188 48 5 48 L 45 48 C 45.382813 48 45.734375 47.78125 45.902344 47.433594 C 46.070313 47.085938 46.023438 46.675781 45.78125 46.375 L 40.78125 40.375 C 40.589844 40.136719 40.304688 40 40 40 L 31 40 L 31 38 L 45 38 C 46.644531 38 48 36.644531 48 35 L 48 5 C 48 3.355469 46.644531 2 45 2 Z M 5 4 L 45 4 C 45.554688 4 46 4.445313 46 5 L 46 35 C 46 35.554688 45.554688 36 45 36 L 5 36 C 4.445313 36 4 35.554688 4 35 L 4 5 C 4 4.445313 4.445313 4 5 4 Z M 6 6 L 6 34 L 44 34 L 44 6 Z M 8 8 L 42 8 L 42 32 L 8 32 Z M 19.28125 11.28125 L 11.28125 19.28125 L 10.59375 20 L 11.28125 20.71875 L 19.28125 28.71875 L 20.71875 27.28125 L 13.4375 20 L 20.71875 12.71875 Z M 30.71875 11.28125 L 29.28125 12.71875 L 36.5625 20 L 29.28125 27.28125 L 30.71875 28.71875 L 38.71875 20.71875 L 39.40625 20 L 38.71875 19.28125 Z M 21 38 L 29 38 L 29 42 L 21 42 Z M 10.46875 42 L 19 42 L 19 44 L 31 44 L 31 42 L 39.53125 42 L 42.875 46 L 7.125 46 Z"></path>
              </svg>
              <p class="text-xl font-semibold capitalize">Modern JavaScript Ecosystem</p>
            </div>
            <p class="text-start text-sm mt-3">
              Over the years, I've worked extensively with JavaScript, TypeScript, Vue, React, Nuxt, Next.js, and Quasar. I adapt quickly to different stacks and enjoy working with
              modern front-end tooling and workflows.
            </p>
          </div>
        </div>
        <div class="col-span-5"></div>
        <div class="col-span-6"></div>
        <!-- Tailwind & Design Systems -->
        <div class="col-span-4 mt-28 animate-section" :class="{ visible: sectionVisibility[4] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg class="fill-current opacity-15" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="60" height="60" viewBox="0 0 24 24" xml:space="preserve">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z" />
              </svg>
              <p class="text-xl font-semibold capitalize">Tailwind & Design Systems</p>
            </div>
            <p class="text-start text-sm mt-3">
              Tailwind CSS is one of the tools I feel most confident with. I use it to build fast, consistent, and scalable interfaces while maintaining clean styling architecture
              and smooth developer experience.
            </p>
          </div>
        </div>
        <div class="col-span-3"></div>
        <!-- Problem Solving & Debugging -->
        <div class="col-span-4 mt-28 animate-section" :class="{ visible: sectionVisibility[5] }">
          <div class="flex flex-col items-start">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 opacity-15">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
              </svg>
              <p class="text-xl font-semibold capitalize">Problem Solving & Debugging</p>
            </div>
            <p class="text-start text-sm mt-3">
              I genuinely enjoy solving technical challenges and debugging complex issues. Whether it's performance bottlenecks, UI inconsistencies, or unexpected edge cases, I
              stay patient and focused until the problem is fully understood and resolved.
            </p>
          </div>
        </div>
        <div class="col-span-6"></div>
        <!-- AI-Driven Solutions -->
        <div class="col-span-4 mt-28 animate-section" :class="{ visible: sectionVisibility[6] }">
          <div class="mt-10 mb-20">
            <div class="flex flex-col items-start">
              <div class="flex items-center gap-2">
                <svg
                  class="fill-neutral-900 dark:fill-neutral-100 size-12 opacity-15"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50">
                  <path
                    d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
                </svg>
                <p class="text-xl font-semibold capitalize">AI-Assisted Development</p>
              </div>
              <p class="text-start text-sm mt-3">
                I actively use AI tools to improve development speed, research solutions, and optimize workflows. I see AI as a practical assistant that helps me stay more
                productive while still keeping engineering decisions thoughtful and intentional.
              </p>
            </div>
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
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.animate-section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
