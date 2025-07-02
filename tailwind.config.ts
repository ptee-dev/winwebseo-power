import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',      // navy blue
        text: '#f9fafb',         // white text
        surface: '#0f172a',      // dark background
        accent: '#facc15',       // gold
        muted: '#94a3b8',        // soft gray-blue
        border: '#334155'        // deep blue-gray
      }
    }
  },
  plugins: []
}
export default config
