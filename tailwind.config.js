/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        web3: {
          gray: {
            100: "#379683",
            200: "#5D5C61",
            300: "#B1A296",
          },
          blue: {
            100: "#7395AE",
            200: "#557A95",
          },
        },
      },
      width: {
        "alco-md": "1200px",
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
