import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgba(18, 45, 156, 1)",
        primary50: "rgba(68, 97, 242, 1)",
      },
      container: {
        center: true, // Center the container by default
        padding: {
          DEFAULT: "1rem", // Padding for all screen sizes
          sm: "2rem", // Padding for small screens
          lg: "4rem", // Padding for large screens
          xl: "4rem", // Padding for extra-large screens
          "2xl": "4rem", // Padding for 2XL screens
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
