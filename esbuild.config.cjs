// esbuild.config.js
const esbuild = require('esbuild')
esbuild.build({
    entryPoints: ['./src/main.js'],
    bundle: true,
    outfile: 'dist/mTools.min.js',
    format: 'iife', // 立即执行函数表达式，适合浏览器环境
    globalName: '$m', // 全局对象名称
    minify: true, // 是否压缩代码
    sourcemap: false, // 是否生成sourcemap
}).catch(() => process.exit(1));