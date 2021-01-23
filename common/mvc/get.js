import KoaRouter from 'koa-router';
import KoaStatic from 'koa-static';
import KoaViews from 'koa-views';

let initRouter = () => {
    const router = new KoaRouter();
    router.get('/', async (ctx) => {
        await ctx.render('default');
    });
    router.get('/:folder/:view', async (ctx) => {
        await ctx.render(`${ctx.params.folder}/${ctx.params.view}`, ctx.query);
    });

    return router.routes();
};

class Get {
    constructor(srcStatic, srcViews) {
        this._static = srcStatic;
        this._views = srcViews;
    }

    use(app) {
        if (!app) {
            return;
        }
        if (this._static) {
            app.use(KoaStatic(this._static));
        }
        if (this._views) {
            app.use(
                KoaViews(this._views, {
                    map: {
                        html: 'underscore',
                    },
                })
            );
        }
        app.use(initRouter());
    }
}

export { Get };
