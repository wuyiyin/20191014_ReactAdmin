 const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    //按需打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,//自动打包相关样式
    }),

    //对源码中的less文件样式 进行覆盖
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },//自定义主题颜色
    }),
);