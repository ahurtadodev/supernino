/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean-black':  '#040c14',
        'ocean-deep':   '#0d2137',
        'ocean-petrol': '#0f2d4a',
        'ocean-mid':    '#1a3a5c',
        'ocean-light':  '#1a4a6e',
        'warm-amber':   '#c45c00',
        'warm-orange':  '#f07a1a',
        'warm-red':     '#e03000',
        'crisis-red':   '#ff3300',
        'sci-blue':     '#2a6fa8',
        'sci-cyan':     '#4ab8d8',
        'prevention':   '#1a3a6e',
        'text-primary': '#f0f4f8',
        'text-muted':   '#8099b0',
        'text-sci':     '#7ec8e3',
      },
      fontFamily: {
        'display':  ['Bebas Neue', 'sans-serif'],
        'mono':     ['Space Mono', 'monospace'],
        'body':     ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'particle': 'particle 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        particle: {
          '0%':   { transform: 'translateX(-100vw)' },
          '100%': { transform: 'translateX(100vw)' },
        },
      },
    },
  },
  plugins: [],
}
