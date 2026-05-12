import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Marius ProConstruct - Deep Navy + Burnished Copper
        primary: {
          DEFAULT: '#0a1628',
          light: '#152238',
          lighter: '#1f2e45',
        },
        secondary: {
          DEFAULT: '#f8fafc',
          dark: '#f1f5f9',
          alt: '#e2e8f0',
        },
        accent: {
          DEFAULT: '#c97a2e',
          hover: '#b06b1f',
          light: '#d9954d',
          lighter: '#f5e6d3',
          dark: '#8f5419', // WCAG AA compliant for text
        },
        text: {
          DEFAULT: '#1e293b',
          muted: '#64748b',
          light: '#94a3b8',
        },
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1628',
        },
        copper: {
          50: '#f5e6d3',
          100: '#ecd4b3',
          200: '#dec08e',
          300: '#d19e66',
          400: '#c97a2e',
          500: '#b06b1f',
          600: '#9a5c1a',
          700: '#7d4b17',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '2px',
        'DEFAULT': '4px',
        'lg': '8px',
        'xl': '12px',
        '2xl': '16px',
      },
      spacing: {
        'section': '800px',
        'section-sm': '600px',
      },
      boxShadow: {
        'copper': '0 8px 25px rgba(201, 122, 46, 0.35)',
        'copper-lg': '0 12px 40px rgba(201, 122, 46, 0.12)',
        'floating': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left': 'slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'float': 'floatGentle 4s ease-in-out infinite',
        'build': 'buildUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulseSlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        buildUp: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom', opacity: '1' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
