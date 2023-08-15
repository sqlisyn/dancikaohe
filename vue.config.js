module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.96:88',
        changeOrigin:true,
      }
    }
  }
}