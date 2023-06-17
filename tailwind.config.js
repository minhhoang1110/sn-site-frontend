/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      zIndex: {
        100: "100",
        10000: "10000",
        100000: "100000",
      },
      translate: {
        "1/-2": "-50%",
      },
      spacing: {
        "1/-40px": "-40px",
      },
      margin: {
        "3/r": "-0.75rem",
      },
      maxWidth: {
        "120px": "120px",
        "460px": "460px",
        "184px": "184px",
        "240px": "240px",
        "156px": "156px",
        "300px": "300px",
        "1/2": "50%",
      },
      minWidth: {
        "120px": "120px",
        "460px": "460px",
        "184px": "184px",
        "240px": "240px",
        "156px": "156px",
        "300px": "300px",
        "1/2": "50%",
      },
      maxHeight: {
        "120px": "120px",
        "460px": "460px",
        "184px": "184px",
        "240px": "240px",
        "156px": "156px",
        "300px": "300px",
        "1/2": "50%",
      },
      minHeight: {
        "120px": "120px",
        "460px": "460px",
        "184px": "184px",
        "240px": "240px",
        "156px": "156px",
        "300px": "300px",
        "1/2": "50%",
      },
      scale: {
        60: "0.6",
      },
    },
  },
  plugins: [],
};
