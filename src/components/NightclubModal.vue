<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  isLocked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "selectTheme", "unlock"]);

// Snapshot the locked state when modal opens so background timer changes never auto-flip an already open modal
const isModalLocked = ref(false);

// Teaser state when locked: 'question' | 'yes' | 'no'
const teaserStep = ref("question");

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      // Freeze the current lock state at the exact moment of opening
      isModalLocked.value = props.isLocked;
      teaserStep.value = "question";
    }
  },
  { immediate: true }
);

const handleConfirm = () => {
  emit("selectTheme", "techno");
};

const handleUnlockAndEnter = () => {
  emit("unlock");
  isModalLocked.value = false;
  teaserStep.value = "question";
};
</script>

<template>
  <Teleport to="body">
    <Transition name="nightclub-modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl select-none"
        @click.self="$emit('close')">
        <!-- Modal Card Container -->
        <div class="relative w-full max-w-lg bg-neutral-950/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.25)] overflow-hidden transition-all">
          <!-- Top Neon Animated Line -->
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div>

          <!-- Ambient Glow Spheres in background -->
          <div class="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Close Cross Button -->
          <button
            @click="$emit('close')"
            class="absolute top-4 right-4 text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-purple-900/40 p-2 rounded-full border border-neutral-800 hover:border-purple-500/40 transition-all duration-300 z-10"
            title="Close">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Smooth Step Transition Wrapper -->
          <Transition name="step-fade" mode="out-in">
            
            <!-- BRANCH 1: UNLOCKED STATE (Main Nightclub Modal) -->
            <div v-if="!isModalLocked" key="unlocked-main">
              <!-- System Header Badge -->
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-[11px] font-mono tracking-wider mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <span class="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                [SYSTEM_PROMPT] &gt;&gt; NIGHTCLUB_ACCESS
              </div>

              <!-- Animated Equalizer / Music Icon -->
              <div class="flex justify-center my-3">
                <div class="relative flex items-center justify-center size-20 rounded-full bg-purple-950/40 border border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                  <!-- Animated Equalizer Waves -->
                  <div class="flex items-end justify-center gap-1.5 h-8">
                    <span class="w-1.5 bg-cyan-400 rounded-full animate-eq-1"></span>
                    <span class="w-1.5 bg-purple-400 rounded-full animate-eq-2"></span>
                    <span class="w-1.5 bg-pink-500 rounded-full animate-eq-3"></span>
                    <span class="w-1.5 bg-purple-400 rounded-full animate-eq-2"></span>
                    <span class="w-1.5 bg-cyan-400 rounded-full animate-eq-1"></span>
                  </div>
                </div>
              </div>

              <!-- Main Title -->
              <h2 class="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-300 mt-2 tracking-wide uppercase">
                Ready to Drop the Beat?
              </h2>
              <p class="text-xs sm:text-sm font-mono text-neutral-400 text-center mt-1">
                Initiate full cyberpunk audiovisual experience
              </p>

              <!-- Secret Hint Box -->
              <div class="mt-6 p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 to-neutral-950 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative">
                <div class="flex items-start gap-3">
                  <div class="p-2 rounded-xl bg-purple-900/40 border border-purple-500/40 text-purple-300 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 animate-bounce">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
                      SURPRISE_HINT // HIDDEN_SECRETS
                    </h4>
                    <p class="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed mt-1">
                      Keep your eyes peeled across every corner of the site! Search card margins and secret keyboard combinations... multiple hidden easter eggs are waiting to be uncovered! 👁️✨
                    </p>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-6 flex flex-col sm:flex-row gap-3 font-mono">
                <button
                  @click="handleConfirm"
                  class="flex-1 py-3.5 px-6 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 border border-purple-400/40 shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group uppercase tracking-wider">
                  <span>ENTER NIGHTCLUB</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="size-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>

                <button
                  @click="$emit('close')"
                  class="py-3.5 px-6 rounded-xl font-medium text-neutral-400 hover:text-white text-sm bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all duration-300 uppercase tracking-wider">
                  NOT YET
                </button>
              </div>
            </div>

            <!-- BRANCH 2: LOCKED STATE (Early Access Teaser Flow) -->
            <div v-else key="locked-teaser">
              
              <!-- Teaser Step 1: Question ("Woah, Sneaky Dev!") -->
              <div v-if="teaserStep === 'question'" key="step-question">
                <!-- System Header Badge -->
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[11px] font-mono tracking-wider mb-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  [SYSTEM_ALERT] &gt;&gt; EARLY_ACCESS_ATTEMPT
                </div>

                <!-- Eye Icon -->
                <div class="flex justify-center my-3">
                  <div class="relative flex items-center justify-center size-20 rounded-full bg-amber-950/40 border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                    <span class="text-3xl animate-pulse">👁️</span>
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300 mt-2 tracking-wide uppercase">
                  WOAH, SNEAKY DEV! 👁️
                </h2>
                <p class="text-xs sm:text-sm font-mono text-neutral-400 text-center mt-1">
                  You already know the secret shortcut?
                </p>

                <!-- Message Box -->
                <div class="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-neutral-950 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  <p class="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed text-center">
                    Hold tight! The matrix engines & video streams are currently initializing in the background... Do you actually know what happens in here? 😏
                  </p>
                </div>

                <!-- Buttons -->
                <div class="mt-6 flex flex-col sm:flex-row gap-3 font-mono">
                  <button
                    @click="teaserStep = 'yes'"
                    class="flex-1 py-3.5 px-6 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-amber-600 via-pink-600 to-purple-600 hover:from-amber-500 hover:via-pink-500 hover:to-purple-500 border border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-wider">
                    YES, I KNOW THE SECRET! 🔥
                  </button>

                  <button
                    @click="teaserStep = 'no'"
                    class="py-3.5 px-6 rounded-xl font-medium text-neutral-400 hover:text-white text-sm bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all duration-300 uppercase tracking-wider">
                    NO, JUST TESTING
                  </button>
                </div>
              </div>

              <!-- Teaser Step 2: Yes ("Bravo, Agent!") -->
              <div v-else-if="teaserStep === 'yes'" key="step-yes">
                <!-- System Header Badge -->
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                  [SYSTEM_STATUS] &gt;&gt; ACCESS_ACKNOWLEDGED
                </div>

                <!-- Rocket Icon -->
                <div class="flex justify-center my-3">
                  <div class="relative flex items-center justify-center size-20 rounded-full bg-cyan-950/40 border border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <span class="text-3xl animate-bounce">🚀</span>
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-400 mt-2 tracking-wide uppercase">
                  BRAVO, AGENT! 🚀
                </h2>
                <p class="text-xs sm:text-sm font-mono text-neutral-400 text-center mt-1">
                  Impressive memory!
                </p>

                <!-- Message Box -->
                <div class="mt-6 p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-neutral-950 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <p class="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed text-center">
                    The background video streams are finalizing right now. You can force-unlock access right now or wait a second and hit <span class="text-cyan-300 font-bold">Ctrl + Shift + D</span> again!
                  </p>
                </div>

                <!-- Buttons -->
                <div class="mt-6 flex flex-col sm:flex-row gap-3 font-mono">
                  <button
                    @click="handleUnlockAndEnter"
                    class="flex-1 py-3.5 px-6 rounded-xl font-bold text-white text-sm bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 hover:from-cyan-500 hover:via-purple-500 hover:to-pink-500 border border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 transition-all duration-300 uppercase tracking-wider">
                    FORCE UNLOCK & ENTER 🎧
                  </button>

                  <button
                    @click="$emit('close')"
                    class="py-3.5 px-6 rounded-xl font-medium text-neutral-400 hover:text-white text-sm bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 active:scale-95 transition-all duration-300 uppercase tracking-wider">
                    STAND BY (CLOSE)
                  </button>
                </div>
              </div>

              <!-- Teaser Step 3: No ("Adios, Amigo!") -->
              <div v-else-if="teaserStep === 'no'" key="step-no">
                <!-- System Header Badge -->
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-[11px] font-mono tracking-wider mb-4 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                  <span class="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
                  [SYSTEM_STATUS] &gt;&gt; STANDING_DOWN
                </div>

                <!-- Wave Icon -->
                <div class="flex justify-center my-3">
                  <div class="relative flex items-center justify-center size-20 rounded-full bg-pink-950/40 border border-pink-500/40 shadow-[0_0_30px_rgba(236,72,153,0.4)]">
                    <span class="text-3xl animate-pulse">👋</span>
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-2xl sm:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 mt-2 tracking-wide uppercase">
                  ADIOS, AMIGO! 👋
                </h2>
                <p class="text-xs sm:text-sm font-mono text-neutral-400 text-center mt-1">
                  See you around the matrix
                </p>

                <!-- Message Box -->
                <div class="mt-6 p-4 rounded-2xl bg-gradient-to-br from-pink-950/30 to-neutral-950 border border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
                  <p class="text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed text-center">
                    No problem! Take your time exploring the portfolio. The full nightclub experience will be waiting for you once initialization finishes!
                  </p>
                </div>

                <!-- Buttons -->
                <div class="mt-6 flex justify-center font-mono">
                  <button
                    @click="$emit('close')"
                    class="w-full sm:w-auto py-3.5 px-8 rounded-xl font-bold text-white text-sm bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 active:scale-95 transition-all duration-300 uppercase tracking-wider">
                    BACK TO PORTFOLIO
                  </button>
                </div>
              </div>

            </div>

          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@keyframes eq-1 {
  0%, 100% { height: 8px; }
  50% { height: 28px; }
}
@keyframes eq-2 {
  0%, 100% { height: 24px; }
  50% { height: 10px; }
}
@keyframes eq-3 {
  0%, 100% { height: 14px; }
  50% { height: 32px; }
}

.animate-eq-1 {
  animation: eq-1 0.8s ease-in-out infinite;
}
.animate-eq-2 {
  animation: eq-2 0.7s ease-in-out infinite;
}
.animate-eq-3 {
  animation: eq-3 0.9s ease-in-out infinite;
}

.nightclub-modal-enter-active,
.nightclub-modal-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nightclub-modal-enter-from,
.nightclub-modal-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.step-fade-enter-active,
.step-fade-leave-active {
  transition: all 0.3s ease-out;
}
.step-fade-enter-from,
.step-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>