import React, { Component } from 'react'
import { Card, Table, Button, Icon, message ,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys } from '../../api'
//商品分类路由


export default class Category extends Component {
  state = {
    loading: false,
    categorys: [],//一级分类列表
    subCategorys: [],//二级分类列表
    parentId: '0',//当前需要显示的分类列表的Id
    parentName: ''
  }
  //初始化所有列的数组

  initColumns = () => {
    this.columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',//指定显示对应数据的属性名
      },
      {
        title: '操作',
        width: 300,
        render: (category) => (//返回需要显示的界面标签
          <span>
            <LinkButton>修改分类</LinkButton>
            {/* 如何向事件回调函数传递参数： 先定义一个匿名函数，在函数调用处理的函数并传入数据 */}


            {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}

          </span>
        )

      },
    ];
  }

  getCategorys = async () => {
    //发请求前，显示loading 
    this.setState({ loading: true })
    //发异步ajax获取数据
    const { parentId } = this.state
    const reslut = await reqCategorys(parentId)


    //请求完成后，隐藏loading
    this.setState({ loading: false })
    // console.log('reslut.state'+reslut.state)

    if (reslut.state === 0) {
      //取出分类数组（可能一级也可能二级）
      const categorys = reslut.data

      if (parentId === '0') {
        this.setState({
          categorys: categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }

    } else {
      message.error('获取分类列表失败')
    }
  }


  //显示指定一级分类的二级列表
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    },

      () => {
        //在状态更新且重新render()后执行
        // console.log('parentId',this.state.parentId)
        //获取二级分类列表
        this.reqCategorys()
      })
    //setState()不能立即获取更新的状态；因为setState()是异步更新状态的
    // console.log('parentId',this.state.parentId)//'0'
  }
  //显示指定一级分类列表
  showCategorys = () => {
    //更新为显示一级列表的状态
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //为第一次render()准备数据
  componentWillMount() {
    this.initColumns()
  }
  //发异步ajax请求
  componentDidMount() {
    //获取一级分类列表
    this.getCategorys()

  }

  render() {
    //读取状态数据   更新后一定要记得读取
    const { loading, categorys, subCategorys, parentName, parentId } = this.state

    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary'>
        <Icon type='plus'></Icon>
        <span>添加</span>
      </Button>)
    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey='_id'
          loading={loading}
          dataSource={parentId === '0' ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} />;
            </Card>
    )
  }
}