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
// انیمیشن بر اساس IntersectionObserver
const sectionVisibility = ref([false, false, false, false, false, false]);
const sectionRefs = ref([]); // ذخیرهٔ رفرنس هر المان
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        const idx = sectionRefs.value.indexOf(target);
        if (isIntersecting && idx >= 0) {
          sectionVisibility.value[idx] = true;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.2 }
  );
  sectionRefs.value.forEach((el) => el && observer.observe(el));
});

onUnmounted(() => {
  observer.disconnect();
});

const WEB3FORMS_ACCESS_KEY = "47772d95-1a04-4142-ba31-34d773c16d15";

const name = ref("");
const email = ref("");
const message = ref("");
const phone = ref("");
const showThankYouMessage = ref(false);
const thankYouText = ref("");

const submitForm = async () => {
  thankYouText.value = message.value.trim() ? "Thanks for your message" : "Thanks for your empty message";
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    }),
  });

  const result = await response.json();
  if (result.success) {
    console.log(result);
    showThankYouMessage.value = true; // نمایش پیام
    setTimeout(() => {
      showThankYouMessage.value = false; // محو کردن پیام بعد از 2 ثانیه
    }, 4000);
  }
};

const handlePhoneInput = (e) => {
  let input = e.target.value;
  const hasPlusAtStart = input.charAt(0) === "+";

  if (hasPlusAtStart) {
    input = "+" + input.slice(1).replace(/[^\d]/g, "");
  } else {
    input = input.replace(/\D/g, "");
  }

  input = input.substring(0, 15);

  phone.value = input;
};
</script>

<template>
  <div class="grid grid-cols-12 px-5">
    <div class="col-span-full flex justify-center">
      <div class="border-[6px] uppercase border-neutral-900 dark:border-neutral-100 border-solid px-14 py-3 text-xl font-semibold">Contact</div>
    </div>
    <!-- skils -->
    <div :ref="(el) => (sectionRefs[0] = el)" class="col-span-full flex mt-20 justify-center animate-section" :class="{ visible: sectionVisibility[0] }">
      <p class=" col-span-full text-center">
        Ready to bring your ideas to life? Let's discuss how I can help make your project a success. Reach out to me and let's
        <span class="text-lg font-semibold"> get started!</span>
      </p>
    </div>
    <div :ref="(el) => (sectionRefs[1] = el)" class="col-span-full flex justify-center mb-20 animate-section" :class="{ visible: sectionVisibility[1] }">
      <Divider />
    </div>
    <div class="col-span-full flex justify-center mb-20">
      <form @submit.prevent="submitForm" class="flex flex-col w-full gap-10">
        <div :ref="(el) => (sectionRefs[2] = el)" class="animate-section" :class="{ visible: sectionVisibility[2] }">
          <input
            class="border-l-4 border-b-4 border-neutral-900 dark:border-neutral-100 border-solid w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none"
            placeholder="Name"
            type="text"
            name="name"
            v-model="name"
            required
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[3] = el)" class="animate-section" :class="{ visible: sectionVisibility[3] }">
          <input
            class="border-l-4 border-b-4 border-neutral-900 dark:border-neutral-100 border-solid w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none autofill:bg-neutral-900"
            placeholder="Email"
            type="email"
            name="email"
            v-model="email"
            required
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[4] = el)" class="animate-section" :class="{ visible: sectionVisibility[4] }">
          <input
            @input="handlePhoneInput"
            class="border-l-4 border-b-4 border-neutral-900 dark:border-neutral-100 border-solid w-full ps-5 pb-2 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none autofill:bg-neutral-900"
            placeholder="phone"
            type="text"
            name="phone"
            v-model="phone"
            autocomplete="off" />
        </div>
        <div :ref="(el) => (sectionRefs[5] = el)" class="animate-section" :class="{ visible: sectionVisibility[5] }">
          <textarea
            class="border-l-4 border-b-4 border-neutral-900 dark:border-neutral-100 border-solid w-full ps-5 placeholder-neutral-700 dark:placeholder-neutral-500 focus:outline-none"
            placeholder="Message"
            name="message"
            rows="5"
            v-model="message"
            autocomplete="off"></textarea>
        </div>
        <div class="flex justify-center items-center h-20 flex-col">
          <div class="h-2/3 w-1/2">
            <button type="submit" role="button" class="button-send w-full !text-neutral-900 dark:!text-neutral-100 !border-neutral-900 dark:!border-neutral-100">Send Message</button>
          </div>
          <div v-show="showThankYouMessage" class="thank-you-message text-center h-1/3 mt-6 flex items-center justify-center gap-2" :class="{ visible: showThankYouMessage }">
            <p class="text-sm">{{ thankYouText }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-5 fill-red-600">
              <path
                d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
            </svg>
          </div>
        </div>
      </form>
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

.button-send {
  --b: 3px; /* border thickness */
  --s: 0.45em; /* size of the corner */
  --color: currentColor; /* color of the button */

  padding: calc(0.5em + var(--s)) calc(0.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background: conic-gradient(from 90deg at var(--b) var(--b), #0000 90deg, var(--color) 0) var(--_p) var(--_p) / calc(100% - var(--b) - 2 * var(--_p))
    calc(100% - var(--b) - 2 * var(--_p));
  transition: 0.3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: 0.6em;
  font-size: 16px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-send:hover,
.button-send:focus-visible {
  --_p: 0px;
  outline-color: var(--color);
  outline-offset: 0.05em;
}

.button-send:active {
  background: var(--color);
  color: #fff;
}

.thank-you-message {
  opacity: 0;
  transform: translateY(-10px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.thank-you-message.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s ease-in, transform 0.5s ease-in;
}
</style>
