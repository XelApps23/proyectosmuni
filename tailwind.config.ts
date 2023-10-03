import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif']
      }
    },

    colors: {
      fondo: '#ECEFF8',
      skyBlue: '#CCE5FF',
      black1: '#000000',
      black2: '#323338',
      white1: '#FFFFFF',
      white2: '#F3F3F3',
      aprobadoHoverig: '#007038',
      aprobadoDefault: '#00854D',
      blue1: '#1F76C2',
      blue2: '#0073EA',
      errorHoverig: '#B63546',
      errorDefault: '#D83A52',
      gray1: '#606060',
      gray2: '#C3C6D4',
      gray3: '#9D938F',
      prioridadAlta: '#401694',
      prioridadMedia: '#5559DF',
      prioridadBaja: '#579BFC',
      prioridadCritica: '#333333',
      estadoListo: '#00C875',
      estadoEnCurso: '#FDAB3D',
      estadoDetenido: '#E2445C',
      estadoNoIniciado: '#C4C4C4',
      transparent: 'transparent',
      cell: '#eceff8'
    }
  },
  plugins: []
}
export default config