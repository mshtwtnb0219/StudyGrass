import { defineConfig } from 'vite'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  define: {
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_OPTIONS_API__': true,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': true
  }

})
