<script setup>
defineProps({
  isOpen: Boolean
});

const emit = defineEmits(["close", "selectTheme"]);

const handleSelection = (theme) => {
  emit("selectTheme", theme);
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
      >
        <div class="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(139,92,246,0.15)] relative overflow-hidden">
          
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500"></div>

          <h2 class="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 text-center">
            Ready to Drop the Beat?
          </h2>
          <p class="text-neutral-400 text-sm text-center mb-8">
            Select your vibe and let the nightclub take over the matrix.
          </p>

          <div class="flex flex-col gap-4">
            <button 
              @click="handleSelection('techno')" 
              class="group relative px-6 py-3 font-bold text-white rounded-lg bg-neutral-900 border border-green-500/20 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all"
            >
              TECHNO
            </button>
            
            <button 
              @click="handleSelection('viking')" 
              class="group relative px-6 py-3 font-bold text-white rounded-lg bg-neutral-900 border border-red-600/20 hover:border-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
            >
              VIKING
            </button>
            
            <button 
              @click="handleSelection('happy')" 
              class="group relative px-6 py-3 font-bold text-white rounded-lg bg-neutral-900 border border-yellow-400/20 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all"
            >
              HAPPY
            </button>
          </div>

          <div class="mt-6 text-center">
            <button 
              @click="$emit('close')" 
              class="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              Not yet, take me back.
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>