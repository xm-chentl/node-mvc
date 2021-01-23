import Koa from 'koa';

class Server {
    constructor(...methods) {
        this._methods = methods;
    }

    listen(port) {
        const app = new Koa();
        for (const method of this._methods) {
            method.use(app);
        }
        app.listen(port, () => {
            console.log(`服务已启动, 端口: ${port}`);
        });
    }
}

export { Server };
