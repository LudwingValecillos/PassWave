module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}', // Agrega esta línea
  ],
    theme: {
      extend: {
        fontFamily: {
          lobster: ['Lobster', 'cursive'], // Agregamos 'Lobster'
        },
      },
    },
    plugins: [],
  }
  