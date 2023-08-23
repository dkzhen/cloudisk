/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lora: ["'Lora', serif"],
        Dancing: ["'Dancing Script', cursive"],
        Adam: ["'ADLaM Display', cursive"],
        AmerType: ["'AmerType' 'Md' 'BT'"],
      },
    },
  },
  plugins: [],
};
