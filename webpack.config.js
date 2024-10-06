const path = require('path');

module.exports = {
  entry: './src/index.js', // Cambia esto por la entrada de tu proyecto
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Asegúrate de instalar y configurar Babel si usas características modernas de JS
        },
      },
    ],
  },
  mode: 'production', // o 'development' dependiendo del entorno
};
