class Login {
    args = {
        user : {
            verify: v => {
                return v.length > 0;
            }
        },
        password: {
            verify: v => {
                return v.length > 10;
            } 
        }
    }

    scope(){
        // 作用域
    }

    exec(args) {
        console.log('参数: ', args);
        // 业务逻辑
        return {
            code: 0,
            data: 'sessionid'
        }
    }
}

export { Login };
