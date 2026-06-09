import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        code: ['monospace'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'move-left-right': {
          '0%, 100%': { transform: 'translateX(-65px)' },
          '50%': { transform: 'translateX(85px)' },
        },
        'move-up-down': {
            '0%, 100%': { transform: 'translateY(-25px)' },
            '50%': { transform: 'translateY(25px)' },
        },
        'move-diagonal': {
            '0%': { transform: 'translate(0, 0) rotate(0deg)' },
            '25%': { transform: 'translate(180px, -250px) rotate(90deg)' },
            '50%': { transform: 'translate(0, -350px) rotate(180deg)' },
            '75%': { transform: 'translate(-180px, -250px) rotate(270deg)' },
            '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        'planet-1-orbit': {
          '0%, 100%': { transform: 'translateX(-65px)' },
          '50%': { transform: 'translateX(85px)' },
        },
        'planet-2-orbit': {
          '0%, 100%': { transform: 'translateY(-25px)' },
          '50%': { transform: 'translateY(25px)' },
        },
        'planet-3-orbit': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(180px, -250px) rotate(90deg)' },
          '50%': { transform: 'translate(0, -350px) rotate(180deg)' },
          '75%': { transform: 'translate(-180px, -250px) rotate(270deg)' },
          '100%': { transform: 'translate(0, 0) rotate(360deg)' },
        },
        'spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
            from: { transform: 'rotate(360deg)' },
            to: { transform: 'rotate(0deg)' },
        },
        'wobble': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'move-left-right': 'move-left-right 24s ease-in-out infinite',
        'move-up-down': 'move-up-down 24s ease-in-out infinite',
        'move-diagonal': 'move-diagonal 60s ease-in-out infinite',
        'planet-1-orbit': 'planet-1-orbit 24s ease-in-out infinite',
        'planet-2-orbit': 'planet-2-orbit 24s ease-in-out infinite',
        'planet-3-orbit': 'planet-3-orbit 60s ease-in-out infinite',
        'spin': 'spin 25s linear infinite',
        'spin-medium': 'spin 40s linear infinite',
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse': 'spin-reverse 1.67s linear infinite',
        'spin-slow-reverse': 'spin-reverse 60s linear infinite',
        'wobble': 'wobble 8s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
