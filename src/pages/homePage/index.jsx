import React, { useState } from 'react';
import { Button, Result, Avatar, Input, Menu, Space, PageHeader, Tag, Statistic, Descriptions, Row } from 'antd';
import { CrownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './index.less';
import styles from './index.less'
import { history } from 'umi'
import { Carousel } from 'antd';


const { Header, Content, Footer } = Layout;
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
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
            <Layout className={styles.layout}>
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
                <Header className={styles.site_layout_header1} style={{ padding: 0, background: 'white' }}>
                    <div style={{ float: 'right', height: '48px', lineHeight: '48px', padding: '0 10px' }}>
                        <Button className={styles.site_login_button} onClick={() => {
                            history.push('/user/login')
                        }}>
                            Login in
                        </Button>
                    </div>
                    <div style={{ float: 'right', height: '48px', width: '300px', lineHeight: '43px', padding: '0 10px' }}>
                        <Input.Search
                            key="search"
                            style={{
                                width: '250px',
                                verticalAlign: 'middle',
                            }}
                        />
                    </div>
                </Header>
                <Carousel autoplay>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <Header className={styles.site_layout_header2} style={{ padding: 0, background: 'white' }}>
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

                <Content style={{ padding: '0 0px' ,margin:'20px'}}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div className={styles.site_layout_content}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </>
    )


}

export default homePage