import React, { Component } from 'react'
import { Card, Table, Button, Icon} from 'antd'
import LinkButton from '../../components/link-button'

//商品分类路由


export default class Category extends Component {
 
    render() {
      const dataSource = [
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160ba",
          "name":"家用电器",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160bb",
          "name":"电脑",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160bc",
          "name":"图书",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160be",
          "name":"服装",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160bf",
          "name":"食品",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160c0",
          "name":"医药",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160c1",
          "name":"汽车产品",
          "__v":"0"
        },
        {
          "parentId":"0",
          "_id":"5ca9d695ef916541160c2",
          "name":"箱包",
          "__v":"0"
        }
      ];
      
      const columns = [
        {
          title: '分类的名称',
          dataIndex: 'name',//指定显示对应数据的属性名
        },
        {
          title: '操作',
          render:()=>(//返回需要显示的界面标签
            <span>
              <LinkButton>修改分类</LinkButton>
              <LinkButton>查看子分类</LinkButton>
            </span>
          )
            
        },
      ];
        const title='一级分类列表'
        const extra =(
        <Button type='primary'>
            <Icon type='plus'></Icon>
            <span>添加</span>
        </Button>)
        return (
            <Card title={title} extra={extra}>
                <Table 
                bordered
                dataSource={dataSource}
                columns={columns} />;
            </Card>
        )
    }
}