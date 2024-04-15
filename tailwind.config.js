/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,js,html,md,yml,yaml}",
  ],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-invert-headings': theme('colors.gray[200]'),
            '--tw-prose-invert-links': theme('colors.teal[200]'),
            '--tw-prose-invert-bold': theme('colors.gray[200]'),
          },
        }, 
      }), 
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

