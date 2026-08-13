<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";

const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst, uAudioIntensity;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3 + uAudioIntensity * 0.1;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0 + uAudioIntensity * 1.8;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;

const props = defineProps({
  color: { type: String, default: "#fc42ff" },
  colorTwo: { type: String, default: "#42fcff" },
  speed: { type: Number, default: 1 },
  ringCount: { type: Number, default: 6 },
  attenuation: { type: Number, default: 10 },
  lineThickness: { type: Number, default: 2 },
  baseRadius: { type: Number, default: 0.35 },
  radiusStep: { type: Number, default: 0.1 },
  scaleRate: { type: Number, default: 0.1 },
  opacity: { type: Number, default: 1 },
  blur: { type: Number, default: 0 },
  noiseAmount: { type: Number, default: 0.1 },
  rotation: { type: Number, default: 0 },
  ringGap: { type: Number, default: 1.5 },
  fadeIn: { type: Number, default: 0.7 },
  fadeOut: { type: Number, default: 0.5 },
  followMouse: { type: Boolean, default: false },
  mouseInfluence: { type: Number, default: 0.2 },
  hoverScale: { type: Number, default: 1.2 },
  parallax: { type: Number, default: 0.05 },
  clickBurst: { type: Boolean, default: false },
  audioIntensity: { type: Number, default: 0 },
});

const mountRef = ref(null);
const clampAudio = (value) => Math.min(Math.max(Number(value) || 0, 0), 1);

let renderer;
let scene;
let camera;
let material;
let quad;
let io;
let ro;

let mouse = [0, 0];
let smoothMouse = [0, 0];
let hoverAmount = 0;
let isHovered = false;
let burst = 0;
let beatBurst = 0;
let smoothAudioIntensity = 0;
let audioBaseline = 0;
let previousAudioIntensity = 0;
let lastBeatAt = -Infinity;

let frameId = 0;
let isVisible = false;
let isPageVisible = !document.hidden;
let elapsed = 0;
let lastT = 0;

const resize = () => {
  const mount = mountRef.value;
  if (!mount || !renderer) return;
  const w = mount.clientWidth;
  const h = mount.clientHeight;
  const dpr = Math.min(window.devicePixelRatio, 2);
  renderer.setSize(w, h);
  renderer.setPixelRatio(dpr);
  material.uniforms.uResolution.value.set(w * dpr, h * dpr);
};

const onPointerMove = (e) => {
  const mount = mountRef.value;
  if (!mount) return;
  const rect = mount.getBoundingClientRect();

  const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  isHovered = isInside;

  if (!isInside) {
    mouse[0] = 0;
    mouse[1] = 0;
    return;
  }

  mouse[0] = (e.clientX - rect.left) / rect.width - 0.5;
  mouse[1] = -((e.clientY - rect.top) / rect.height - 0.5);
};

const onWindowBlur = () => {
  isHovered = false;
  mouse[0] = 0;
  mouse[1] = 0;
};

const onClick = (e) => {
  const mount = mountRef.value;
  if (!mount || !props.clickBurst) return;
  const rect = mount.getBoundingClientRect();
  const isInside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!isInside) return;
  burst = 1;
};

const animate = (t) => {
  frameId = requestAnimationFrame(animate);

  const dt = lastT === 0 ? 0 : Math.min(t - lastT, 100);
  lastT = t;
  const rawAudioIntensity = clampAudio(props.audioIntensity);
  const audioSmoothing = rawAudioIntensity > smoothAudioIntensity ? 0.48 : 0.12;
  smoothAudioIntensity += (rawAudioIntensity - smoothAudioIntensity) * audioSmoothing;

  // Track the song's moving bass floor and fire a click-like burst on each
  // distinct upward transient. The short cooldown prevents one kick from
  // being counted several times across consecutive animation frames.
  audioBaseline += (rawAudioIntensity - audioBaseline) * 0.025;
  const transient = rawAudioIntensity - audioBaseline;
  const beatThreshold = Math.max(0.025, audioBaseline * 0.1);
  const isRising = rawAudioIntensity > previousAudioIntensity + 0.004;

  if (rawAudioIntensity > 0.11 && transient > beatThreshold && isRising && t - lastBeatAt > 135) {
    beatBurst = 1.15;
    lastBeatAt = t;
  }
  previousAudioIntensity = rawAudioIntensity;

  elapsed += dt * 0.001 * props.speed * (1 + smoothAudioIntensity * 0.35);

  smoothMouse[0] += (mouse[0] - smoothMouse[0]) * 0.08;
  smoothMouse[1] += (mouse[1] - smoothMouse[1]) * 0.08;
  hoverAmount += ((isHovered ? 1 : 0) - hoverAmount) * 0.08;
  const frameRatio = dt > 0 ? dt / 16.667 : 1;
  burst *= Math.pow(0.92, frameRatio);
  beatBurst *= Math.pow(0.82, frameRatio);
  if (burst < 0.001) burst = 0;
  if (beatBurst < 0.001) beatBurst = 0;

  // Preserve smaller continuous bass movement between detected kicks, while
  // peaks receive the same expansion/flash used by Click Burst.
  const continuousAudioBurst = Math.pow(rawAudioIntensity, 1.65) * 0.72;
  const visualBurst = Math.max(props.clickBurst ? burst : 0, beatBurst, continuousAudioBurst);

  material.uniforms.uTime.value = elapsed;
  material.uniforms.uAttenuation.value = props.attenuation;
  material.uniforms.uColor.value.set(props.color);
  material.uniforms.uColorTwo.value.set(props.colorTwo);
  material.uniforms.uLineThickness.value = props.lineThickness * (1 + smoothAudioIntensity * 0.4);
  material.uniforms.uBaseRadius.value = props.baseRadius;
  material.uniforms.uRadiusStep.value = props.radiusStep;
  material.uniforms.uScaleRate.value = props.scaleRate;
  material.uniforms.uRingCount.value = props.ringCount;
  material.uniforms.uOpacity.value = props.opacity * (0.85 + smoothAudioIntensity * 0.45);
  material.uniforms.uNoiseAmount.value = props.noiseAmount;
  material.uniforms.uRotation.value = (props.rotation * Math.PI) / 180;
  material.uniforms.uRingGap.value = props.ringGap;
  material.uniforms.uFadeIn.value = props.fadeIn;
  material.uniforms.uFadeOut.value = props.fadeOut;
  material.uniforms.uMouse.value.set(smoothMouse[0], smoothMouse[1]);
  material.uniforms.uMouseInfluence.value = props.followMouse ? props.mouseInfluence : 0;
  material.uniforms.uHoverAmount.value = hoverAmount;
  material.uniforms.uHoverScale.value = props.hoverScale;
  material.uniforms.uParallax.value = props.parallax;
  material.uniforms.uBurst.value = visualBurst;
  material.uniforms.uAudioIntensity.value = smoothAudioIntensity;

  renderer.render(scene, camera);
};

const tryStart = () => {
  if (isVisible && isPageVisible && frameId === 0) {
    lastT = 0;
    frameId = requestAnimationFrame(animate);
  }
};

const tryStop = () => {
  if (frameId !== 0) {
    cancelAnimationFrame(frameId);
    frameId = 0;
  }
};

const onVisibility = () => {
  isPageVisible = !document.hidden;
  isPageVisible ? tryStart() : tryStop();
};

onMounted(() => {
  const mount = mountRef.value;
  if (!mount) return;

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true });
  } catch {
    return;
  }

  if (!renderer.capabilities.isWebGL2) {
    renderer.dispose();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
  camera.position.z = 1;

  const uniforms = {
    uTime: { value: 0 },
    uAttenuation: { value: 0 },
    uResolution: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color() },
    uColorTwo: { value: new THREE.Color() },
    uLineThickness: { value: 0 },
    uBaseRadius: { value: 0 },
    uRadiusStep: { value: 0 },
    uScaleRate: { value: 0 },
    uRingCount: { value: 0 },
    uOpacity: { value: 1 },
    uNoiseAmount: { value: 0 },
    uRotation: { value: 0 },
    uRingGap: { value: 1.6 },
    uFadeIn: { value: 0.5 },
    uFadeOut: { value: 0.75 },
    uMouse: { value: new THREE.Vector2() },
    uMouseInfluence: { value: 0 },
    uHoverAmount: { value: 0 },
    uHoverScale: { value: 1 },
    uParallax: { value: 0 },
    uBurst: { value: 0 },
    uAudioIntensity: { value: 0 },
  };

  material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
  quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(quad);

  resize();
  window.addEventListener("resize", resize);

  ro = new ResizeObserver(resize);
  ro.observe(mount);

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", onWindowBlur);
  window.addEventListener("click", onClick);

  io = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      isVisible ? tryStart() : tryStop();
    },
    { threshold: 0 },
  );
  io.observe(mount);

  document.addEventListener("visibilitychange", onVisibility);

  tryStart();
});

onBeforeUnmount(() => {
  tryStop();
  if (io) io.disconnect();
  document.removeEventListener("visibilitychange", onVisibility);
  window.removeEventListener("resize", resize);
  if (ro) ro.disconnect();

  const mount = mountRef.value;
  if (mount) {
    if (renderer) mount.removeChild(renderer.domElement);
  }

  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("blur", onWindowBlur);
  window.removeEventListener("click", onClick);

  if (renderer) renderer.dispose();
  if (quad) quad.geometry.dispose();
  if (material) material.dispose();
});
</script>

<template>
  <div ref="mountRef" class="w-full h-full" :style="blur > 0 ? { filter: `blur(${blur}px)` } : undefined"></div>
</template>
