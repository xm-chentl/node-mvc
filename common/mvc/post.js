import KoaBodyParser from 'koa-bodyparser';
import KoaRouter from 'koa-router';

class Post {
    _apiCache = {};

    constructor(...apis) {
        for (const api of apis) {
            this._apiCache[api.route] = api.instance;
        }
    }

    use(app) {
        if (!app) {
            return;
        }

        const router = new KoaRouter();
        router.post('/:server/:action', async (ctx) => {
            let server = ctx.params.server;
            let action = ctx.params.action;
            let key = `/${server}/${action}`;
            let apiInstance = this._apiCache[key];
            if (!apiInstance) {
                ctx.response.body = {
                    code: 404,
                    data: `${key} api is not exist`,
                };
                return;
            }

            let args = {};
            // 验证参数
            if (apiInstance.args) {
                if (!ctx.request.body) {
                    ctx.response.body = {
                        code: 600,
                        data: 'no arguments passed in',
                    };
                    return;
                }

                let errResp = { code: 0 };
                for (const argName in apiInstance.args) {
                    let argValue = ctx.request.body[argName];
                    if (!argValue) {
                        errResp.code = 601;
                        errResp.data = `arguments name [${argName}] is not exist`;
                        break;
                    }
                    if (!apiInstance.args[argName].verify(argValue)) {
                        errResp.code = 602;
                        errResp.data = `arguments name [${argName}] verify is fail`;
                        break;
                    }
                    args[argName] = argValue;
                }
                if (errResp.code > 0) {
                    ctx.response.body = errResp;
                    return;
                }
            }

            // 响应
            let resp = apiInstance.exec(args);
            ctx.response.body = {
                code: resp.code,
                data: resp.data,
            };
        });
        app.use(KoaBodyParser());
        app.use(router.routes());
    }
}

export { Post };
