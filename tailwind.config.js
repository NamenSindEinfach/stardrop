/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{njk,js,html,md,yml,yaml}"],
  theme: {
    extend: {
      colors: {
        stardrop: {
          light: colors.rose[100],
          DEFAULT: colors.rose[200],
          accent: colors.rose[300],
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-bullets": "var(--tw-prose-body)",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
