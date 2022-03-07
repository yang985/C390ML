import React, { useState } from 'react';
import { Button, Result, Avatar, Input, Menu, Space, PageHeader, Tag, Statistic, Descriptions, Row } from 'antd';
import { CrownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './index.less';
import style from './index.less'
import { history } from 'umi'


const { Header, Content, Footer } = Layout;

const defaultProps = {
    routes: [
        {
            path: '/homePage',
            name: 'Home',
            icon: <CrownOutlined />,
            component: './Welcome',
        },
        {
            path: '/admin/sub-page2',
            name: 'Projects',
            icon: <UserOutlined />,
            component: './Welcome',
        },
        {
            path: '/admin/sub-page3',
            name: 'Create',
            icon: <SmileOutlined />,
            component: './Welcome',
        },
        {
            path: '/admin/sub-page3',
            name: 'About',
            icon: <SmileOutlined />,
            component: './Welcome',
        },
    ],
};

const homePage = () => {


    return (
        <>
            <Layout className="layout">
                {/* <PageHeader
                    className="site-page-header"
                    title="Title"
                    subTitle="This is a subtitle"
                    extra={[
                        <Input.Search key="2"/>,
                        <Button key="1">Operation</Button>,
                    ]}
                >
                </PageHeader> */}
                <Header className="site-layout-header1" style={{ padding: 0, background: 'white' }}>
                    <Space align='center'>
                        <Button onClick={() => {
                            history.push('/user/login')
                        }}>
                            Login in
                        </Button>
                    </Space>
                </Header>

                <Header className="site-layout-header2" style={{ padding: 0, background: 'white' }}>
                    {/* <div className={style.header_div}>
                        <Space align="center" size={'small'}>
                            <Input.Search
                                key="search"
                                style={{
                                    width: '24px',
                                }}
                            />
                            <Button key="1">Login in</Button>
                        </Space>
                    </div> */}
                    <Menu style={{}} theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        {defaultProps.routes.map((item, index) => {
                            const key = index + 1
                            return (<Menu.Item key={key}>{item.name}</Menu.Item>)
                        })}
                    </Menu>
                </Header>

                <Content style={{ padding: '0 0px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className="site-layout-content">Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </>
    )


}

export default homePage