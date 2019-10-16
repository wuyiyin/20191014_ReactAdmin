import React, { Component } from 'react'
import { reqWeather } from '../../api'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Modal} from 'antd'
import LinkButton from '../link-button'
import './header.less'

class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),//当前时间字符串
        dayPictureUrl: '',//图片url
        weather: '',//天气文本
    }
    getTime = () => {
        this.IntervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }


    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('成都')

        this.setState({ dayPictureUrl, weather })
    }

    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => cItem.key===path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title
    }



    logout= ()=>{
        Modal.confirm({
            content: '确定退出吗',
            onOk:()=> {
            //   console.log('OK');
            //删除数据
                storageUtils.removeUser()
                memoryUtils.user={}

            //跳转到Login
            this.props.history.replace('/login')
            }
            
          })
    }
    /*
    第一次render()之后执行一次
    一般在此执行异步操作： 发ajax请求/请求定时器
    */
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    /*当前组件卸载之前调用*/
    componentWillMount(){
        //清除定时器
        clearInterval(this.IntervalId)

    }

    render() {
        const { currentTime, dayPictureUrl, weather } = this.state

        const username = memoryUtils.user.username
        const title =this.getTitle()

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton href="Javascript:;" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-buttom'>
                    <div className='header-buttom-left'>
                        {title}
                </div>
                    <div className='header-buttom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>

            </div>
        )
    }
}
export default withRouter(Header)