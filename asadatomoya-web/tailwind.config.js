/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "black-gradient": "radial-gradient(#000000, #191919)",
        "white-gradient": "radial-gradient(#ffffff, #f0f0f0)",
        overlay: "linear-gradient(to right bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))",
      },
      keyframes: {
        in: {
          "0%": { left: "100%", opacity: 0 },
          "100%": { left: "50%", opacity: 1 },
        },
      },
      height: {
        "screen1/2": "50vh",
      },
      animation: {
        in: "in 0.3s ease-in-out",
      },
      fontFamily: {
        "sans-jp": ["var(--noto-sans-jp)"],
        "serif-jp": ["var(--noto-serif-jp)"],
        passion: ["var(--passion-one)"],
        montserrat: ["var(--montserrat)"],
      },
    },
    container: {
      center: true,
    },
  },
};
