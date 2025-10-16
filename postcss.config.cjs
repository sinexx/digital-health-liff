module.exports = {
  // Using Tailwind via CDN fallback; disable Tailwind PostCSS plugin to avoid build errors.
  // Re-enable with `@tailwindcss/postcss` once Tailwind is installed locally.
  plugins: {
    autoprefixer: {},
  },
};
