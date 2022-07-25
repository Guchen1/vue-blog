const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        extract: false
    },

})
module.exports = {
    runtimeCompiler: true,
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.externals = { // 不会被打包的库
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                "element-plus": "ElementPlus",
            }
        }
    },


}