<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  enabled: { type: Boolean, default: true },
  className: { type: String, default: "" },
  edgeSensitivity: { type: Number, default: 30 },
  glowColor: { type: String, default: "40 80 80" },
  backgroundColor: { type: String, default: "#120F17" },
  borderRadius: { type: Number, default: 28 },
  glowRadius: { type: Number, default: 40 },
  glowIntensity: { type: Number, default: 1 },
  coneSpread: { type: Number, default: 25 },
  animated: { type: Boolean, default: false },
  colors: {
    type: Array,
    default: () => ["#c084fc", "#f472b6", "#38bdf8"],
  },
  fillOpacity: { type: Number, default: 0.5 },
});

const cardRef = ref(null);
const isHovered = ref(false);
const cursorAngle = ref(45);
const edgeProximity = ref(0);
const sweepActive = ref(false);

const animationFrames = new Set();
const animationTimers = new Set();

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const layers = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ];

  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const opacity = Math.min(alpha * intensity, 100);
      return `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${opacity}%)`;
    })
    .join(", ");
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x) {
  return x * x * x;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
  const timer = window.setTimeout(() => {
    animationTimers.delete(timer);
    const startedAt = performance.now();

    const tick = (now) => {
      const t = Math.min((now - startedAt) / duration, 1);
      onUpdate(start + (end - start) * ease(t));

      if (t < 1) {
        const frame = requestAnimationFrame(tick);
        animationFrames.add(frame);
      } else if (onEnd) {
        onEnd();
      }
    };

    const frame = requestAnimationFrame(tick);
    animationFrames.add(frame);
  }, delay);

  animationTimers.add(timer);
}

function stopAnimations() {
  animationTimers.forEach((timer) => clearTimeout(timer));
  animationFrames.forEach((frame) => cancelAnimationFrame(frame));
  animationTimers.clear();
  animationFrames.clear();
}

function startSweep() {
  stopAnimations();
  const angleStart = 110;
  const angleEnd = 465;
  sweepActive.value = true;
  cursorAngle.value = angleStart;

  animateValue({ duration: 500, onUpdate: (value) => (edgeProximity.value = value / 100) });
  animateValue({
    ease: easeInCubic,
    duration: 1500,
    end: 50,
    onUpdate: (value) => (cursorAngle.value = (angleEnd - angleStart) * (value / 100) + angleStart),
  });
  animateValue({
    ease: easeOutCubic,
    delay: 1500,
    duration: 2250,
    start: 50,
    end: 100,
    onUpdate: (value) => (cursorAngle.value = (angleEnd - angleStart) * (value / 100) + angleStart),
  });
  animateValue({
    ease: easeInCubic,
    delay: 2500,
    duration: 1500,
    start: 100,
    end: 0,
    onUpdate: (value) => (edgeProximity.value = value / 100),
    onEnd: () => (sweepActive.value = false),
  });
}

watch(
  () => [props.enabled, props.animated],
  ([enabled, animated]) => {
    if (enabled && animated) startSweep();
    else {
      stopAnimations();
      sweepActive.value = false;
      edgeProximity.value = 0;
    }
  },
  { immediate: true },
);

onBeforeUnmount(stopAnimations);

const GRADIENT_POSITIONS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

const meshGradients = computed(() => {
  const gradients = [];
  for (let i = 0; i < 7; i += 1) {
    const color = props.colors[Math.min(COLOR_MAP[i], props.colors.length - 1)];
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${color} 0px, transparent 50%)`);
  }
  gradients.push(`linear-gradient(${props.colors[0]} 0 100%)`);
  return gradients;
});

const isVisible = computed(() => isHovered.value || sweepActive.value);
const angleDeg = computed(() => `${cursorAngle.value.toFixed(3)}deg`);
const borderOpacity = computed(() => {
  if (!isVisible.value) return 0;
  const colorSensitivity = props.edgeSensitivity + 20;
  return Math.max(0, (edgeProximity.value * 100 - colorSensitivity) / (100 - colorSensitivity));
});
const glowOpacity = computed(() => {
  if (!isVisible.value) return 0;
  return Math.max(0, (edgeProximity.value * 100 - props.edgeSensitivity) / (100 - props.edgeSensitivity));
});
const opacityTransition = computed(() => (isVisible.value ? "opacity 0.25s ease-out" : "opacity 0.75s ease-in-out"));

const cardStyle = computed(() => ({
  background: props.backgroundColor,
  borderRadius: `${props.borderRadius}px`,
  transform: "translate3d(0, 0, 0.01px)",
  boxShadow:
    "rgba(0,0,0,0.1) 0 1px 2px, rgba(0,0,0,0.1) 0 2px 4px, rgba(0,0,0,0.1) 0 4px 8px, rgba(0,0,0,0.1) 0 8px 16px, rgba(0,0,0,0.1) 0 16px 32px, rgba(0,0,0,0.1) 0 32px 64px",
}));

const borderStyle = computed(() => {
  const mask = `conic-gradient(from ${angleDeg.value} at center, black ${props.coneSpread}%, transparent ${props.coneSpread + 15}%, transparent ${100 - props.coneSpread - 15}%, black ${100 - props.coneSpread}%)`;
  return {
    border: "1px solid transparent",
    background: [
      `linear-gradient(${props.backgroundColor} 0 100%) padding-box`,
      "linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box",
      ...meshGradients.value.map((gradient) => `${gradient} border-box`),
    ].join(", "),
    opacity: borderOpacity.value,
    maskImage: mask,
    WebkitMaskImage: mask,
    transition: opacityTransition.value,
  };
});

const fillStyle = computed(() => {
  const masks = [
    "linear-gradient(to bottom, black, black)",
    "radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)",
    "radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)",
    "radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)",
    `conic-gradient(from ${angleDeg.value} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
  ].join(", ");

  return {
    border: "1px solid transparent",
    background: meshGradients.value.map((gradient) => `${gradient} padding-box`).join(", "),
    maskImage: masks,
    WebkitMaskImage: masks,
    maskComposite: "subtract, add, add, add, add, add",
    WebkitMaskComposite: "source-out, source-over, source-over, source-over, source-over, source-over",
    opacity: borderOpacity.value * props.fillOpacity,
    mixBlendMode: "soft-light",
    transition: opacityTransition.value,
  };
});

const glowStyle = computed(() => {
  const mask = `conic-gradient(from ${angleDeg.value} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`;
  return {
    inset: `${-props.glowRadius}px`,
    maskImage: mask,
    WebkitMaskImage: mask,
    opacity: glowOpacity.value,
    mixBlendMode: "plus-lighter",
    transition: opacityTransition.value,
  };
});

function getCenterOfElement(element) {
  const { width, height } = element.getBoundingClientRect();
  return [width / 2, height / 2];
}

function getEdgeProximity(element, x, y) {
  const [cx, cy] = getCenterOfElement(element);
  const dx = x - cx;
  const dy = y - cy;
  const kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
  const ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
  return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
}

function getCursorAngle(element, x, y) {
  const [cx, cy] = getCenterOfElement(element);
  const dx = x - cx;
  const dy = y - cy;
  if (dx === 0 && dy === 0) return 0;
  let degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  if (degrees < 0) degrees += 360;
  return degrees;
}

function handlePointerMove(event) {
  const card = cardRef.value;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  edgeProximity.value = getEdgeProximity(card, x, y);
  cursorAngle.value = getCursorAngle(card, x, y);
}
</script>

<template>
  <div
    v-if="enabled"
    ref="cardRef"
    :class="['relative grid isolate border border-white/15', className]"
    :style="cardStyle"
    @pointermove="handlePointerMove"
    @pointerenter="isHovered = true"
    @pointerleave="isHovered = false">
    <div class="absolute inset-0 rounded-[inherit] -z-[1]" :style="borderStyle"></div>
    <div class="absolute inset-0 rounded-[inherit] -z-[1]" :style="fillStyle"></div>

    <span class="absolute pointer-events-none z-[1] rounded-[inherit]" :style="glowStyle">
      <span
        class="absolute rounded-[inherit]"
        :style="{
          inset: `${glowRadius}px`,
          boxShadow: buildBoxShadow(glowColor, glowIntensity),
        }"></span>
    </span>

    <div class="flex flex-col relative overflow-auto z-[1]">
      <slot />
    </div>
  </div>
  <slot v-else />
</template>
