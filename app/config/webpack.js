import koaWebpack from 'koa-webpack';
/**
 * webpack
 */
export const webpack = async (app) => {
    //如果是生产模式则不加载
    if (app.context.env === 'development') {
        const webpack = require("webpack");
        const webpackConf = require("../../build/webpack.dev.conf");
        const compiler = webpack(webpackConf);
        app.use(koaWebpack({
            compiler: compiler,
            //热加载
            hot: {
                reload: true
            },
            //https://github.com/webpack/webpack-dev-middleware
            dev: {
                lazy: false,
                watchOptions: {
                    aggregateTimeout: 1200,
                    poll: true
                },
                noInfo: true
            }
        }));
    }
}