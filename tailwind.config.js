/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
  // Enable purging for production builds
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './src/app/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [
        // Keep dynamic classes that might be missed
        'bg-blue-500',
        'bg-green-500',
        'bg-red-500',
        'bg-yellow-500',
        'hover:bg-blue-600',
        'hover:bg-green-600',
        'hover:bg-red-600',
        'hover:bg-yellow-600',
      ],
    },
  },
};