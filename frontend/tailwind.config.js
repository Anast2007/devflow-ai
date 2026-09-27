/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1117",
        panel: "#11161d",
        panel2: "#161c25",
        line: "#232b36",
        accent: "#3ddc97",
        accent2: "#5fb0ff",
        warn: "#f2a65a",
        danger: "#f2555a",
        muted: "#8b96a5",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
