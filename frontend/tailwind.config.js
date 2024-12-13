module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the paths if your files are in different locations
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
};