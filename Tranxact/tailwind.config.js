/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        neurial: ["Neurial Grotesk-regular", "sans-serif"],
        "neurial-medium": ["Neurial Grotesk-medium", "sans-serif"],
        "neurial-bold": ["Neurial Grotesk-bold", "sans-serif"],

        poppins: ["Poppins-Regular", "sans-serif"], 
        "poppins-medium": ["Poppins-Medium", "sans-serif"],
        "poppins-semibold": ["Poppins-SemiBold", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        "poppins-italic": ["Poppins-Italic", "sans-serif"], 

        termina: ["Termina-Regular", "sans-serif"],
        "termina-medium": ["Termina-Medium", "sans-serif"],
        "termina-bold": ["Termina-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
