import React from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils.js'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'


import './login.less'
import logo from '../../assets/images/favicon.ico'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }


    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //   console.log('提交登录的ajax请求 ', values);
                //请求登录

                const { username, password } = values;
                // console.log('用户名，密码'+ password,username)

                const result = await reqLogin(username, password)
                // console.log('请求成功',response.data)
                // const result = response.data //{status:0,data:user} {status:1,msg:'xxx'}
                if (result.status === 0) {
                    message.success('登录成功')
                    //跳转到管理界面
                    const user = result.data //保存user
                    memoryUtils.user = user//保存到内存中
                    storageUtils.saveUser(user)//保存到local中

                    this.props.history.replace('/')//不需要回退，所以不用push()

                } else {
                    message.error(result.msg)
                }

                // reqLogin(usename,password).then(response=>{
                //     console.log('成功了',response.data)
                // }).catch(error=>{
                //     console.log('失败了',error)
                // });


            } else {
                console.log('检验失败')
            }
        });



        // const form = this.props.form
        // //获取表单项的输入数据
        // const values = form.getFieldsValue()

        // console.log('handleSubmit()', values)

    }

    //对密码进行自定义验证
    validdatePWD = (rule, value, callback) => {
        console.log('validatePWD()', rule, value)
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码长度不能小于4位')
        } else if (value.length > 12) {
            callback('密码长度不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是英文，数字或者下划线组成')
        } else {
            callback()//验证通过
        }
    }


    render() {
        //如果已经登录跳转管理界面
        const user = memoryUtils.user
        if (user && user._id) {
            return <Redirect to='/' />
        }


        const form = this.props.form
        const { getFieldDecorator } = form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h2>后台管理系统</h2>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                //申明式验证
                                rules: [
                                    { required: true, whitespace: true, message: '用户名必须输入' },
                                    { min: 4, message: '用户名至少4位' },
                                    { max: 12, message: '用户名最多12位' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文，数字或者下划线组成' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}

                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.validdatePWD
                                    }

                                ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
          </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}


const WrapLogin = Form.create()(Login)
export default WrapLogin



/*
async和await
1.作用
     简化promise对象的使用：不用再使用then()来指定成功/失败的回调函数
     以同步编码（没有回调函数了） 方式实现异步流程
2.哪里写await
    在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3.哪里写async
    await所在函数（最近的）定义的左侧写async
*/
