module.exports = function (api) {
    api.cache(true)
  
    return {
      plugins: [
          ['react-native-unistyles/plugin']
      ]
    }
  }