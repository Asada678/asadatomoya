/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundImage: {
        "black-gradient": "radial-gradient(#000000, #191919)",
        "white-gradient": "radial-gradient(#ffffff, #f0f0f0)",
        overlay: "linear-gradient(to right bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))",
      },
      keyframes: {
        in: {
          "0%": { top: "55%", opacity: 0 },
          "100%": { top: "50%", opacity: 1 },
        },
      },
      animation: {
        in: "in 0.3s ease-in-out",
      },
    },
    container: {
      center: true,
    },
  },
};
