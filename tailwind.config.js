/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-Contrast Button System
        btnPrimary: "#C02F70",
        btnPrimaryHover: "#941E53",
        btnSecondary: "#7048A8",
        btnSecondaryHover: "#54347F",
        btnGold: "#E8B957",
        btnGoldHover: "#D6A33C",

        // Palette
        blushPink: "#F7C1D7",
        vibrantRose: "#E77AA5",
        royalRose: "#C02F70",
        deepBerry: "#76264F",
        richLavender: "#A88AE0",
        deepLavender: "#7048A8",
        royalGold: "#E8B957",
        roseGold: "#C58B73",
        deepPlum: "#382235",
        warmCream: "#FFF6F0",
        pureWhite: "#FFFFFF",

        // Compatibility Aliases
        bgPastel: "#FFF6F0",
        blush: "#F7C1D7",
        softRose: "#E77AA5",
        deepRose: "#C02F70",
        lavender: "#A88AE0",
        cream: "#FFF6F0",
        brandText: "#382235",
      },
      fontFamily: {
        heading: ["'Playfair Display'", 'Georgia', 'serif'],
        letter: ["'Cormorant Garamond'", 'Garamond', 'serif'],
        sans: ["'Poppins'", 'sans-serif'],
        handwritten: ["'Caveat'", 'cursive'],
      },
      boxShadow: {
        'btn-primary': '0 6px 20px -2px rgba(192, 47, 112, 0.45), 0 2px 6px rgba(56, 34, 53, 0.2)',
        'btn-secondary': '0 6px 20px -2px rgba(112, 72, 168, 0.45), 0 2px 6px rgba(56, 34, 53, 0.2)',
        'btn-gold': '0 6px 20px -2px rgba(232, 185, 87, 0.5), 0 2px 6px rgba(56, 34, 53, 0.2)',
        'glass': '0 12px 35px 0 rgba(118, 38, 79, 0.16)',
        '3d-card': '0 22px 45px -12px rgba(56, 34, 53, 0.25)',
      },
    },
  },
  plugins: [],
}
