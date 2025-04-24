import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#222222', // Dark black text color
          blue: '#00A699', // Brand blue
          dark: '#333333', // Dark text & background color
          error: '#D9534F', // Error color (dark red)
          lightGray: '#F7F7F7', // Background light gray
          mediumGray: '#DDDDDD', // Medium gray
          shadowGray: '#EBEBEB', // Light shadow gray
          red: '#FF5A5F', // Primary brand red
          redHoverLight: '#FF385C', // Hover light red
          redHoverDark: '#E61E4D', // Hover dark red
          success: '#4BB543', // Success green
          light: '#FFFFFF', // Light text color
          textLight: '#6a6a6a', // Light text color
          borderGray: '#8c8c8c', // Border gray
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
