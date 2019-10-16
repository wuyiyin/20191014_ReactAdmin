// 能发送异步ajax请求的模块
// 封装的axios库
//函数的返回值是promise对象

/*
优化： 统一处理请求异常
    在外层包一个自己创建的promise对象
    在请求出错时，不reject(error),而是显示错误
*/

import axios from 'axios'
import { message } from 'antd'


export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        //执行异步ajax请求
        let promise

        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
        //如果成功了，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        //如果失败了，不调用reject(reason),而是提示异常信息
        }).catch(error => {
            message.error('请求出错了：' + error.message)
        })

    })

}


//请求登录接口
// ajax('/login',{usename:'Tom',password:'12345'},'POST').then()