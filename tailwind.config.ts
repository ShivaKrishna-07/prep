import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        bg2: "var(--bg2)",
        bg3: "var(--bg3)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
      },
      boxShadow: {
        custom: 'var(--shadow-custom)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
