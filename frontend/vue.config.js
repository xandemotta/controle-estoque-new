const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: '/controle-estoque-new/',  // Caminho base para o seu projeto no GitHub Pages
})
