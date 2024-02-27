import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  darkMode: ['selector', '.darkModeActive'],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: colors.indigo[100],
          light: colors.indigo[300],
          DEFAULT: colors.indigo[600],
          dark: colors.indigo[700],
          darker: colors.indigo[900],
        },
        secondary: {
          lighter: colors.slate[100],
          light: colors.slate[300],
          DEFAULT: colors.slate[600],
          dark: colors.slate[700],
          darker: colors.slate[900],
        },
        accent: {
          lighter: colors.teal[100],
          light: colors.teal[300],
          DEFAULT: colors.teal[600],
          dark: colors.teal[700],
          darker: colors.teal[900],
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
}
