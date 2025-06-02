
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets:[require("nativewind/preset")],
  theme: {
    extend: {
      colors:{primary:"#161622",secondary:{default:"#FF9C01",100:"FF9001",200:"FF8E01"}, black:{default:"#000",100:"#1E1E2D",200:"232533"},grey:{100:"#CDCDE0"}},
      fontFamily:{
        pthin:["Poppins-Light","sans serif"],
        pesxtraLight:["poppins-ExtraLight", "sans-serif"],
        pLight:["Poppins-Light","sans-serif"],
        pregular:["Poppins-Regular","sans-serif"],
        pmedium:["Poppins-Medium","sans-serif"],
        psemiBold:["Poppins-Semibold","sans-serif"],
        pbold:["Poppins-Bold","sans-serif"],
        pextraBold:["Poppins-ExtraBold","sans-serif"],
        pblack:["Poppins-Black","sans-serif"],

      }
    },
  },
  plugins: [],
}




// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   // NOTE: Update this to include the paths to all of your component files.
//   content: ["./app/**/*.{js,jsx,ts,tsx}"],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
