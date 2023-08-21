/** @type {import('tailwindcss').Config} */

const tailwindColors = require("./node_modules/tailwindcss/colors")
const colorSafeList = []

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = ["lightBlue", "warmGray", "trueGray", "coolGray", "blueGray"]

for (const colorName in tailwindColors) {
  if (deprecated.includes(colorName)) {
    continue;
  }

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

  const pallette = tailwindColors[colorName]

  if (typeof pallette === "object") {
    shades.forEach((shade) => {
      if (shade in pallette) {
        colorSafeList.push(`text-${colorName}-${shade}`)
        colorSafeList.push(`border-${colorName}-${shade}`)
        colorSafeList.push(`bg-${colorName}-${shade}`)
        colorSafeList.push(`from-${colorName}-${shade}`)
        colorSafeList.push(`to-${colorName}-${shade}`)
      }
    })
  }
}

module.exports = {
  jit: true,
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: colorSafeList,
  important: true,
  theme: {
    extend: {
      colors: tailwindColors,
    },
  },
}
