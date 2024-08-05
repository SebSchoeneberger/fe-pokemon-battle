/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "valentine",
      "retro",
      "dracula",
      "cmyk",
      "sunset",
      "cyberpunk",
    ],
  },
  plugins: [require("daisyui")],
};
