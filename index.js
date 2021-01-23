import { conf } from '../demo/common/conf/index.js';
import { Login } from './api/admin/login.js';
import { Get } from './common/mvc/get.js';
import { Post } from './common/mvc/post.js';
import { Server } from './common/mvc/server.js';

new Server(
    new Get(conf.static, conf.views),
    new Post({ route: '/admin/login', instance: new Login() })
).listen(conf.port);
