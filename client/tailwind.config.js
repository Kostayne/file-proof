/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  
  theme: {
    extend: {
      animation: {
        fadeout: 'fadeOut 0.2s ease-in-out',
        fadein: 'fadeIn 0.2s ease-in-out',
      },

      keyframes: ({
        fadeOut: {
          '0%': {
            opacity: 1,
          },

          '100%': {
            opacity: 0,
          },
        },

        fadeIn: {
          '0%': {
            opacity: 0,
          },

          '100%': {
            opacity: 1,
          },
        },
      }),
    },
  },

  plugins: [],
};
