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
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-16 py-3 text-xl font-semibold">skills</div>
    </div>
    <!-- skils -->
    <div class="col-span-full flex mt-20 justify-center mb-20">
      <div class="grid grid-cols-12 gap-16">
        <!-- Html -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[0] }">
          <svg class="size-16" width="85" height="100" viewBox="0 0 85 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.015625 0L7.68491 90L42.1215 100L76.546 90.0062L84.2273 0H0.015625Z" fill="#FF5722" />
            <path
              d="M67.5955 29.4316H42.1215H27.2341L28.1965 40.7379H42.1215H66.6331L63.7399 74.6379L42.1215 80.9066L42.1035 80.9129L20.4972 74.6379L18.9874 56.9066H29.574L30.362 66.1066L42.1095 69.4254L42.1215 69.4191L53.8811 66.1004L55.1082 51.7816H42.1215H18.5543L15.7031 18.4004H42.1215H68.5339L67.5955 29.4316Z"
              fill="#FAFAFA" />
          </svg>
          <p class="text-sm">HTML5</p>
        </div>
        <!-- Css -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[1] }">
          <svg class="size-16" width="85" height="100" viewBox="0 0 85 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.00976562 0L7.67267 90L42.0806 100L76.4765 90.0062L84.1514 0H0.00976562Z" fill="#2196F3" />
            <path
              d="M67.7674 29.4311L66.7998 40.7374L63.8789 74.6311L42.0802 80.8999L42.0622 80.9061L20.2755 74.6311L18.7549 56.9061H29.4289L30.2222 66.0999L42.0682 69.4249L42.0742 69.4186L53.9382 66.0936L55.5549 50.7749L18.2441 50.8811L17.1863 40.4061L56.4504 39.9249L57.2437 28.7124L16.1345 28.8311L15.4434 18.3999H42.0802H68.717L67.7674 29.4311Z"
              fill="#FAFAFA" />
          </svg>

          <p class="text-sm">CSS3</p>
        </div>
        <!-- Vue -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[2] }">
          <svg
            class="size-16"
            viewBox="0 -17.5 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
            fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M204.8,0 L256,0 L128,220.8 L0,0 L50.56,0 L97.92,0 L128,51.2 L157.44,0 L204.8,0 Z" fill="#41B883"></path>
                <path d="M0,0 L128,220.8 L256,0 L204.8,0 L128,132.48 L50.56,0 L0,0 Z" fill="#41B883"></path>
                <path d="M50.56,0 L128,133.12 L204.8,0 L157.44,0 L128,51.2 L97.92,0 L50.56,0 Z" fill="#35495E"></path>
              </g>
            </g>
          </svg>

          <p class="text-sm">Vue</p>
        </div>
        <!-- java script -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[3] }">
          <svg class="size-16" width="97" height="100" viewBox="0 0 97 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H96.242V100H0V0Z" fill="#F7DF1E" />
            <path
              d="M25.3058 83.5671L32.6709 78.9358C34.0917 81.5534 35.3843 83.7682 38.4846 83.7682C41.4565 83.7682 43.3302 82.5602 43.3302 77.8618V45.9095H52.3745V77.9947C52.3745 87.728 46.8835 92.1583 38.8724 92.1583C31.6373 92.1583 27.4374 88.2649 25.3056 83.5663"
              fill="black" />
            <path
              d="M57.2868 82.5603L64.651 78.13C66.5896 81.4195 69.1091 83.8359 73.5665 83.8359C77.314 83.8359 79.7037 81.889 79.7037 79.204C79.7037 75.9819 77.2489 74.8406 73.1142 72.9617L70.8537 71.9541C64.3284 69.0682 59.9998 65.4435 59.9998 57.7909C59.9998 50.7427 65.168 45.3724 73.2437 45.3724C78.9935 45.3724 83.1281 47.4535 86.0995 52.8908L79.0577 57.5894C77.5071 54.7032 75.8279 53.5622 73.2439 53.5622C70.5951 53.5622 68.9153 55.3075 68.9153 57.5894C68.9153 60.4087 70.5951 61.5502 74.4709 63.2955L76.7318 64.3024C84.4197 67.726 88.7483 71.2162 88.7483 79.0697C88.7483 87.5281 82.3527 92.1593 73.7605 92.1593C65.3621 92.1593 59.9353 87.9978 57.287 82.5603"
              fill="black" />
          </svg>

          <p class="text-sm">JAVASCRIPT</p>
        </div>
        <!-- REACT -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[4] }">
          <svg class="size-16" width="106" height="100" viewBox="0 0 106 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 49.5504C0 57.9044 7.80178 65.7033 20.1019 70.0992C17.6457 83.0286 19.6617 93.4496 26.3955 97.5103C33.3171 101.684 43.6286 98.7949 53.4155 89.8497C62.9556 98.4337 72.5975 101.812 79.325 97.7398C86.2399 93.5542 88.3432 82.4263 85.819 69.0933C98.6303 64.6644 105.797 58.0144 105.797 49.5504C105.797 41.39 97.9803 34.3302 85.846 29.9624C88.5634 16.0784 86.2609 5.91019 79.2484 1.68185C72.4877 -2.39453 62.7338 1.15845 53.0534 9.96729C42.9826 0.617401 33.325 -2.23724 26.3193 2.00343C19.5651 6.09141 17.6378 16.7018 20.1019 29.8706C8.21711 34.2034 0 41.4226 0 49.5504Z"
              fill="white" />
            <path
              d="M83.2748 34.2996C82.3001 33.9488 81.2901 33.6169 80.2502 33.303C80.4212 32.5737 80.578 31.8537 80.7175 31.146C83.007 19.5254 81.5101 10.1638 76.3983 7.08156C71.4968 4.12609 63.4807 7.20764 55.3849 14.5745C54.6064 15.2829 53.8257 16.0329 53.0453 16.819C52.5254 16.2989 52.0063 15.7963 51.4885 15.3156C43.0038 7.43846 34.4992 4.11892 29.3925 7.21009C24.4956 10.1741 23.0455 18.9749 25.1064 29.9879C25.3054 31.0516 25.5381 32.1379 25.8011 33.2424C24.5975 33.5996 23.4355 33.9805 22.3237 34.3857C12.3763 38.0119 6.02344 43.6952 6.02344 49.5902C6.02344 55.6786 12.8432 61.7854 23.2042 65.4883C24.0218 65.7805 24.8703 66.0568 25.7446 66.3191C25.4608 67.5136 25.2139 68.6842 25.0067 69.8259C23.0416 80.6477 24.5762 89.2406 29.46 92.1859C34.5046 95.2276 42.9707 92.1011 51.2145 84.5663C51.8661 83.9707 52.52 83.3391 53.1751 82.677C54.0242 83.532 54.8719 84.3411 55.7152 85.1C63.7003 92.2849 71.5869 95.1862 76.4662 92.2326C81.5057 89.1822 83.1435 79.9514 81.0172 68.7206C80.8548 67.8628 80.6658 66.9865 80.4536 66.0947C81.0481 65.9109 81.6318 65.7212 82.2009 65.5239C92.9722 61.7924 99.9803 55.7599 99.9803 49.5902C99.9803 43.6738 93.4225 37.9523 83.2748 34.2996Z"
              fill="#53C1DE" />
            <path
              d="M80.9386 61.5405C80.4249 61.7183 79.8977 61.8902 79.3605 62.0569C78.1715 58.1207 76.5666 53.9352 74.6027 49.6109C76.4768 45.3895 78.0196 41.2575 79.1754 37.3469C80.1365 37.6378 81.0694 37.9445 81.9683 38.2682C90.6629 41.3978 95.9665 46.025 95.9665 49.5904C95.9665 53.3882 90.2388 58.3183 80.9386 61.5405ZM77.0797 69.5358C78.0199 74.502 78.1542 78.9919 77.5314 82.5019C76.9718 85.6558 75.8465 87.7586 74.455 88.6008C71.494 90.3929 65.1619 88.0634 58.3329 81.9189C57.55 81.2145 56.7615 80.4624 55.9704 79.6664C58.6179 76.6389 61.2638 73.1193 63.8462 69.2104C68.3883 68.789 72.6796 68.1 76.5711 67.1594C76.7628 67.9678 76.933 68.7607 77.0797 69.5358ZM38.0555 88.2911C35.1625 89.3594 32.8584 89.39 31.4656 88.5503C28.502 86.7629 27.2699 79.8636 28.9505 70.6088C29.143 69.549 29.3721 68.4602 29.6362 67.3474C33.4851 68.2373 37.7449 68.8776 42.2979 69.2636C44.8977 73.0885 47.62 76.6042 50.3635 79.6826C49.7641 80.2877 49.167 80.8637 48.5733 81.4065C44.9279 84.7383 41.2749 87.1022 38.0555 88.2911ZM24.5024 61.5172C19.9209 59.8799 16.1374 57.7519 13.544 55.4298C11.2137 53.3431 10.0371 51.2714 10.0371 49.5904C10.0371 46.0131 15.1378 41.4503 23.6449 38.3489C24.6771 37.9726 25.7577 37.618 26.879 37.2849C28.0547 41.2838 29.597 45.4647 31.4583 49.6925C29.573 53.9831 28.0088 58.2307 26.8215 62.2765C26.0221 62.0362 25.2476 61.7834 24.5024 61.5172ZM29.0455 29.1821C27.2797 19.7465 28.4524 12.6286 31.4034 10.8425C34.5467 8.93977 41.4975 11.6527 48.8233 18.4542C49.2916 18.889 49.7617 19.344 50.2332 19.8147C47.5033 22.8797 44.8059 26.369 42.2292 30.1714C37.8103 30.5996 33.5804 31.2875 29.6914 32.2088C29.4469 31.1804 29.2303 30.17 29.0455 29.1821ZM69.5742 39.6461C68.6445 37.967 67.6901 36.3276 66.7171 34.733C69.7149 35.1293 72.5871 35.6553 75.2844 36.299C74.4746 39.0126 73.4653 41.8498 72.2772 44.7584C71.4249 43.0666 70.5235 41.3607 69.5742 39.6461ZM53.0467 22.8141C54.8981 24.9113 56.7521 27.2528 58.5757 29.7933C56.7381 29.7025 54.8777 29.6553 53.0019 29.6553C51.1438 29.6553 49.2971 29.7015 47.4709 29.7907C49.2963 27.2738 51.1664 24.9354 53.0467 22.8141ZM36.4133 39.6752C35.4846 41.359 34.5999 43.0556 33.761 44.7553C32.5922 41.8568 31.5922 39.0066 30.7754 36.2545C33.4562 35.6273 36.3148 35.1144 39.2936 34.7257C38.3068 36.335 37.3445 37.9864 36.4133 39.6748V39.6752ZM39.3794 64.7546C36.3018 64.3956 33.4001 63.9091 30.7201 63.2991C31.5499 60.4979 32.5719 57.5868 33.7656 54.626C34.6066 56.3245 35.4948 58.0218 36.4292 59.7092H36.4294C37.3812 61.4284 38.3672 63.1124 39.3794 64.7546ZM53.1577 76.6627C51.2554 74.5165 49.3578 72.1425 47.5046 69.5888C49.3037 69.6626 51.1378 69.7004 53.0019 69.7004C54.917 69.7004 56.8102 69.6553 58.6736 69.5685C56.8439 72.1682 54.9966 74.5459 53.1577 76.6627ZM72.3155 54.4751C73.5713 57.4679 74.6299 60.3638 75.4705 63.1173C72.7463 63.7671 69.805 64.2905 66.706 64.6794C67.6814 63.0632 68.6442 61.3957 69.5903 59.6804C70.5474 57.945 71.4562 56.207 72.3155 54.4751ZM66.1135 57.5837C64.6448 60.2464 63.1369 62.7883 61.6061 65.1877C58.8181 65.3962 55.9376 65.5035 53.0019 65.5035C50.078 65.5035 47.2339 65.4086 44.4951 65.2227C42.9026 62.7918 41.362 60.2424 39.9027 57.6066H39.903C38.4475 54.978 37.1079 52.3271 35.894 49.6912C37.1075 47.049 38.4436 44.3952 39.8908 41.7713L39.8905 41.7718C41.3414 39.1409 42.8685 36.6039 44.4463 34.1883C47.2406 33.9674 50.1059 33.8522 53.0017 33.8522H53.0019C55.9107 33.8522 58.7798 33.9683 61.5732 34.1911C63.1269 36.5891 64.6436 39.1178 66.1003 41.7491C67.5735 44.4099 68.9268 47.0461 70.1507 49.6315C68.9305 52.2614 67.5802 54.9241 66.1135 57.5837ZM74.3935 10.7177C77.5398 12.6148 78.7633 20.2661 76.7865 30.2992C76.6604 30.9394 76.5184 31.5915 76.3642 32.2523C72.4662 31.3119 68.2333 30.612 63.8015 30.1773C61.2198 26.3331 58.5444 22.8384 55.859 19.8128C56.581 19.0866 57.302 18.3941 58.02 17.7406C64.9565 11.4287 71.4396 8.93662 74.3935 10.7177Z"
              fill="white" />
            <path
              d="M53.0033 40.8179C57.6369 40.8179 61.3933 44.7454 61.3933 49.5905C61.3933 54.4355 57.6369 58.3632 53.0033 58.3632C48.3697 58.3632 44.6133 54.4355 44.6133 49.5905C44.6133 44.7454 48.3697 40.8179 53.0033 40.8179Z"
              fill="#53C1DE" />
          </svg>

          <p class="text-sm">REACT</p>
        </div>
        <!-- GIT -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[5] }">
          <svg class="size-16" width="97" height="100" viewBox="0 0 97 100" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="96.242" height="100" fill="url(#pattern0_1_765)" />
            <defs>
              <pattern id="pattern0_1_765" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlink:href="#image0_1_765" transform="matrix(0.00271292 0 0 0.00261097 -0.0195239 0)" />
              </pattern>
              <image
                id="image0_1_765"
                width="383"
                height="383"
                preserveAspectRatio="none"
                xlink:href="data:image/png;base64,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" />
            </defs>
          </svg>

          <p class="text-sm">GIT</p>
        </div>
        <!-- Next.js -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[6] }">
          <svg class="size-16" fill="#000000" viewBox="-2.4 -2.4 28.80 28.80" role="img" xmlns="http://www.w3.org/2000/svg" stroke="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(1.92,1.92), scale(0.84)">
              <rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#ffffff" strokewidth="0"></rect>
            </g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g>
            <g id="SVGRepo_iconCarrier">
              <title>Next.js icon</title>
              <path
                d="M17.813 22.502c-.089.047-.084.066.005.021a.228.228 0 0 0 .07-.047c0-.016-.002-.014-.075.026zm.178-.094c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.071c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.07c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.162-.105c-.082.052-.108.087-.035.047.052-.03.136-.094.122-.096a.466.466 0 0 0-.087.049zM11.214.006c-.052.005-.216.021-.364.033-3.408.307-6.601 2.146-8.623 4.973a11.876 11.876 0 0 0-2.118 5.243c-.096.659-.108.854-.108 1.748s.012 1.088.108 1.748c.652 4.506 3.859 8.292 8.208 9.695.779.251 1.6.422 2.533.525.364.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.206-.106.246-.134.218-.157a231.73 231.73 0 0 1-1.954-2.62l-1.919-2.592-2.404-3.558a332.01 332.01 0 0 0-2.421-3.556c-.009-.002-.019 1.579-.023 3.509-.007 3.38-.009 3.516-.052 3.596a.424.424 0 0 1-.206.213c-.075.038-.141.045-.495.045H7.81l-.108-.068a.442.442 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.34 12.34 0 0 0 2.465-2.163 11.94 11.94 0 0 0 2.824-6.134c.096-.659.108-.854.108-1.748s-.012-1.088-.108-1.748c-.652-4.506-3.859-8.292-8.208-9.695a12.552 12.552 0 0 0-2.498-.523c-.225-.023-1.776-.049-1.97-.03zm4.912 7.258a.471.471 0 0 1 .237.277c.019.061.023 1.365.019 4.304l-.007 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.009-3.096.023-3.15a.484.484 0 0 1 .232-.296c.096-.049.131-.054.5-.054.347 0 .408.005.486.047z"></path>
            </g>
          </svg>

          <p class="text-sm">Next.js</p>
        </div>
        <!-- FIGMA -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[7] }">
          <svg class="size-16" width="70" height="100" viewBox="0 0 70 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_767)">
              <path
                d="M17.3753 100C26.9632 100 34.7447 92.5335 34.7447 83.3335V66.6668H17.3753C7.78742 66.6668 0.00592041 74.1335 0.00592041 83.3335C0.00592041 92.5335 7.78742 100 17.3753 100Z"
                fill="#0ACF83" />
              <path
                d="M0.00592041 49.9999C0.00592041 40.7999 7.78742 33.3332 17.3753 33.3332H34.7447V66.6665H17.3753C7.78742 66.6665 0.00592041 59.1999 0.00592041 49.9999Z"
                fill="#A259FF" />
              <path
                d="M0.00390625 16.6667C0.00390625 7.46667 7.7854 7.62939e-06 17.3733 7.62939e-06H34.7427V33.3333H17.3733C7.7854 33.3333 0.00390625 25.8667 0.00390625 16.6667Z"
                fill="#F24E1E" />
              <path
                d="M34.7458 7.62939e-06H52.1152C61.7031 7.62939e-06 69.4846 7.46667 69.4846 16.6667C69.4846 25.8667 61.7031 33.3333 52.1152 33.3333H34.7458V7.62939e-06Z"
                fill="#FF7262" />
              <path
                d="M69.4846 49.9999C69.4846 59.1999 61.7031 66.6665 52.1152 66.6665C42.5273 66.6665 34.7458 59.1999 34.7458 49.9999C34.7458 40.7999 42.5273 33.3332 52.1152 33.3332C61.7031 33.3332 69.4846 40.7999 69.4846 49.9999Z"
                fill="#1ABCFE" />
            </g>
            <defs>
              <clipPath id="clip0_1_767">
                <rect width="69.4915" height="100" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p class="text-sm">FIGMA</p>
        </div>
        <!-- Tailwind Css -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[8] }">
          <svg class="size-16 fill-neutral-900 dark:fill-neutral-100 stroke-neutral-900 dark:stroke-neutral-100" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" xml:space="preserve">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.036c-2.667 0-4.333 1.325-5 3.976 1-1.325 2.167-1.822 3.5-1.491.761.189 1.305.738 1.906 1.345C13.387 10.855 14.522 12 17 12c2.667 0 4.333-1.325 5-3.976-1 1.325-2.166 1.822-3.5 1.491-.761-.189-1.305-.738-1.907-1.345-.98-.99-2.114-2.134-4.593-2.134zM7 12c-2.667 0-4.333 1.325-5 3.976 1-1.326 2.167-1.822 3.5-1.491.761.189 1.305.738 1.907 1.345.98.989 2.115 2.134 4.594 2.134 2.667 0 4.333-1.325 5-3.976-1 1.325-2.167 1.822-3.5 1.491-.761-.189-1.305-.738-1.906-1.345C10.613 13.145 9.478 12 7 12z"></path>
            </g>
          </svg>

          <p class="text-sm">Tailwind Css</p>
        </div>
        <!-- Vuetify -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[9] }">
          <svg class="size-16" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="2.668 10.668 122.664 106.258" width="1em">
            <path d="m65.3 34.414-24.46 42.376 23.16 40.136 30.672-53.13 30.66-53.128h-46.332zm0 0" fill="#1697f6" />
            <path d="m33.34 63.797 1.605 2.793 22.88-39.649 9.402-16.273h-64.559zm0 0" fill="#aeddff" />
            <path d="m79 10.668c11.594 38.152-15 106.258-15 106.258l-23.16-40.137zm0 0" fill="#1867c0" />
            <path d="m67.227 10.668c-48.844 0-32.282 55.922-32.282 55.922zm0 0" fill="#7bc6ff" />
          </svg>

          <p class="text-sm">Vuetify</p>
        </div>
        <!-- Material Ui -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[10] }">
          <svg
            class="size-16"
            viewBox="0 -26 256 256"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            preserveAspectRatio="xMidYMid"
            fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <polygon fill="#00B0FF" points="0 110.848 0 0 96 55.424 96 92.3733333 32 55.424 32 129.322667"></polygon>
                <polygon fill="#0081CB" points="96 55.424 192 0 192 110.848 128 147.797333 96 129.322667 160 92.3733333 160 55.424 96 92.3733333"></polygon>
                <polygon fill="#00B0FF" points="96 129.322667 96 166.272 160 203.221333 160 166.272"></polygon>
                <path
                  d="M160,203.221333 L256,147.797333 L256,73.8986667 L224,92.3733333 L224,129.322667 L160,166.272 L160,203.221333 Z M224,55.424 L224,18.4746667 L256,5.68434189e-14 L256,36.9493333 L224,55.424 Z"
                  fill="#0081CB"></path>
              </g>
            </g>
          </svg>

          <p class="text-sm">MUI</p>
        </div>
        <!-- Swiper -->
        <div class="col-span-3 hover:!scale-110 transition-all duration-300 gap-4 flex flex-col justify-center items-center animate-section" :class="{ visible: sectionVisibility[11] }">
          <svg class="size-16" xmlns="http://www.w3.org/2000/svg" width="129" height="129" viewBox="0 0 129 129">
            <path
              d="M97.5869496,9.51093626 C115.83804,20.7848256 128,40.9721238 128,64 C128,99.346224 99.346224,128 64,128 C56.2920179,128 48.9022945,126.637372 42.0606106,124.137797 L41.3296807,123.865645 L42.5199148,123.48344 L44.0499006,122.981598 L44.8047554,122.729449 L44.8047554,122.729449 L45.5528525,122.476476 L47.0287766,121.968044 L48.477679,121.456268 L49.8995657,120.941118 L51.2944429,120.422561 L51.9817549,120.161995 L53.3361292,119.638268 C54.7663971,119.077773 56.1505947,118.511327 57.4887554,117.938757 L58.4837445,117.508179 L59.7032082,116.966702 C60.2391997,116.725238 60.7672019,116.482694 61.2872173,116.239057 L62.0612505,115.87278 L63.1998411,115.320271 L63.7590314,115.042615 L63.7590314,115.042615 L64.3114862,114.76402 L65.3961918,114.203997 C74.5017145,109.427674 80.6883363,104.239002 83.9729034,98.5499653 C90.9321253,86.4962393 84.8542511,73.6150855 67.4065187,60.4830885 L65.9866432,59.4185495 L65.1241488,58.7570907 L64.2867532,58.1006716 L63.4743719,57.4492672 L62.6869203,56.8028527 L62.3025167,56.4815088 L62.3025167,56.4815088 L61.9243138,56.161403 L61.1864678,55.5248932 L60.6492814,55.0507377 L60.6492814,55.0507377 L60.1259396,54.5793364 L59.4496246,53.9550673 L58.7977741,53.3356509 L58.1703034,52.7210621 L57.865684,52.4155703 L57.865684,52.4155703 L57.5671278,52.1112761 L56.9881629,51.5062679 C50.0910281,44.1742986 48.550875,37.8976624 51.6821025,32.4742173 C53.275799,29.713854 56.0387768,26.999998 59.9662039,24.3569485 L60.4430842,24.040124 L61.1940488,23.5569049 C61.5336196,23.3425039 61.8809347,23.1285905 62.2359916,22.9151777 L62.7743828,22.5954356 L63.603739,22.1172522 L64.4592124,21.6408141 L65.1179529,21.2846511 L65.1179529,21.2846511 L65.7913778,20.9295026 L66.7121153,20.4575739 C67.4124544,20.1043216 68.1348104,19.7526404 68.8791706,19.4025938 L69.6308651,19.0530944 L70.6559388,18.5888147 L71.1782513,18.3574212 L72.2424237,17.8961475 L72.7842819,17.6662758 L73.887538,17.2080833 L74.4489343,16.9797709 L75.5912592,16.5247346 L76.1721862,16.2980192 L77.353565,15.8462143 L78.5609715,15.3966054 L79.174433,15.1726349 L80.4208685,14.7263826 L81.6933149,14.2824097 L82.9917658,13.8407497 L83.6507409,13.6207974 L84.9881859,13.1826691 L86.3516187,12.7469371 L87.7410327,12.3136347 L89.1564212,11.8827954 L90.5977776,11.4544525 L92.4359804,10.9225852 L94.3147346,10.394736 L96.6227494,9.76671243 L97.5869496,9.51093626 Z M64,0 C71.7830114,0 79.2415381,1.38928435 86.1411179,3.93339103 L86.8782091,4.21038217 L86.4108627,4.35186467 L84.1313124,5.0545346 L83.3848908,5.2905768 L81.9121853,5.76541455 L80.4663248,6.24395126 L79.0473024,6.72622031 L77.6551115,7.21225509 L76.2897456,7.70208898 L75.6171199,7.94844102 L73.9648828,8.56854028 L72.3545311,9.19471909 L71.0963985,9.70008321 L70.4773795,9.95425044 L69.2594321,10.4655761 C56.8123589,15.7699668 48.6548341,21.7176 44.7538993,28.4742173 C37.9453585,40.2669559 44.1208291,52.9796592 61.5702618,66.1081375 L62.9900625,67.1727537 L63.8522936,67.8346365 L64.6892575,68.491774 L65.09829,68.8185721 L65.8975078,69.468645 L66.4804703,69.9531308 L66.4804703,69.9531308 L67.0493707,70.4349994 L67.7860906,71.0734406 L68.1451248,71.3909334 L68.8445933,72.0224812 C69.2263095,72.3720718 69.5965761,72.7195512 69.9554568,73.0649416 L70.4852463,73.5814631 L71.248012,74.3504059 L71.9726186,75.1123909 C78.8402712,82.495364 80.3081527,88.8974997 77.0447002,94.5499653 C74.933031,98.2074836 70.9013706,101.807999 64.958951,105.303275 L64.4134675,105.620736 L63.5293583,106.121564 L62.6189315,106.620891 C62.1058295,106.897871 61.5805462,107.174142 61.0430864,107.449677 L60.227765,107.862426 L59.2252746,108.356245 L58.1964941,108.848418 L57.1414295,109.338914 L56.6040425,109.583523 L55.5095633,110.071443 L54.3888152,110.557607 L53.2418044,111.041982 L52.6584524,111.283488 L51.4720589,111.76512 L50.869019,112.005238 L50.869019,112.005238 L50.259418,112.244884 L49.0205357,112.722748 L47.755418,113.19868 L46.4640712,113.672647 L45.1465013,114.144619 L43.8027143,114.614564 L43.1209914,114.848766 L41.7378904,115.315609 L41.0365138,115.548243 L39.6141124,116.011914 L38.1655184,116.47343 L36.3179518,117.047246 L34.4294807,117.617582 L32.8892605,118.071305 L30.739698,118.689489 C12.3072163,107.455464 0,87.1649844 0,64 C0,28.653776 28.653776,0 64,0 Z"
              transform="translate(.335 .835)"
              fill="#0080FF" />
          </svg>

          <p class="text-sm">Swiper</p>
        </div>
      </div>
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
  transition: opacity 1s ease-out, transform 1s ease-out; /* فقط برای اسکرول */
}

.animate-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.animate-section:hover {
  transition: scale 0.3s ease-out, transform 0.3s ease-out; /* جدا کردن transition برای scale */
}
</style>
