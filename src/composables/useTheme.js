import { useDark, useToggle } from "@vueuse/core";

// Clear any previous light mode cache from localStorage so site always starts in dark mode
if (typeof window !== "undefined") {
  localStorage.removeItem("vueuse-color-scheme");
}

export const isDark = useDark({
  initialValue: "dark",
  storageKey: null, // Always defaults to dark mode on every reload/boot
  valueDark: "dark",
  valueLight: "",
});

export const toggleDark = useToggle(isDark);
