module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}', // Agrega esta línea para la biblioteca ShadCN
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'], // Agregamos 'Lobster'
      },
      screens: {
        xs: '450px', // Pantalla personalizada 'xs' para dispositivos pequeños
      },
    },
  },
  plugins: [],
};
