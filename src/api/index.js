//要求：能根据接口文档定义接口要求
//包含应用中所有请求函数的模块
//每个函数的返回值都是promise

import ajax from './ajax'
import { message } from 'antd'
import jsonp from 'jsonp'

//登录
// export function reqLogin(username,password){
//     return ajax('/Login',{username,password},'POST')
// }


export const reqLogin = (username, password) => ajax('/Login', { username, password }, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/manage/user/add', user, 'POST')

/*
jsonp请求的接口请求函数
*/

export const reqWeather = (city) => {

    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            console.log('json()', err, data)
            //如果成功了
            if (!err && data.status === 'success') {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                //如果失败了
                message.error('获取天气信息失败！')
            }
        })
    })


}
// reqWeather('成都')