/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{njk,js,html,md,yml,yaml}"],
  theme: {
    extend: {
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
