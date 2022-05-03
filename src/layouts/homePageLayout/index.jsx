import React, { useState } from 'react';
import { Button, Result, Avatar, Input, Menu, Space, PageHeader, Tag, Statistic, Descriptions, Row } from 'antd';
import { CrownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import { Layout, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import './index.less';
import styles from './index.less'
import { history } from 'umi'
import { Carousel } from 'antd';
import AvatarDropdown from '@/components/RightContent/AvatarDropdown';
import { useModel } from 'umi'
import { stringify } from 'querystring';


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
            component: '@/pages/projectList/newProject',
        },
        {
            path: '/homePage/Project',
            name: 'Projects',
            icon: <UserOutlined />,
            component: '@/pages/projectList/allProject',
        },
        {
            path: '/homePage/Create',
            name: (<a href="/project/myProject">Create</a>),
            icon: <SmileOutlined />,
        },
        {
            path: '/homePage/About',
            name: 'About',
            icon: <SmileOutlined />,
            component: '@/pages/projectList/allProject',
        },
    ],
};


const homePageLayout = (props) => {
    console.log(props)
    const { initialState, setInitialState } = useModel('@@initialState');

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
                        {!initialState?.currentUser?.access ?
                            (<Button className={styles.site_login_button} onClick={() => {
                                history.push('/user/login')
                            }}>
                                Login in
                            </Button>) : (<AvatarDropdown />)}
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
                        <h3 style={contentStyle}><a href={'/project/4'}>Chapter 1.1</a></h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}><a href={'/project/5'}>Chapter 1.2</a></h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}><a href={'/project/6'}>Chapter 1.3</a></h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}><a href={'/project/7'}>Chapter 1.4</a></h3>
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
                    <Menu style={{}} theme="light" mode="horizontal" defaultSelectedKeys={['Projects']}>
                        {props.route.routes.map((item, index) => {
                            return item.name ?
                                (<Menu.Item key={item.name} onClick={() => {
                                    // if this route dont have a component to render so it is a link(to back management) !
                                    if (!item.component) {
                                        // const { query = {} } = history.location;
                                        // const pathname = item.path
                                        // const { redirect } = query; // Note: There may be security issues, please note
                                        // if (window.location.pathname !== '/user/login' && !redirect) {
                                        //     console.log('entered', stringify({
                                        //         redirect: pathname,
                                        //     }))
                                        //     history.replace({
                                        //         pathname: '/user/login',
                                        //         search: stringify({
                                        //             redirect: pathname,
                                        //         }),
                                        //     });
                                        // }
                                        history.push(item.path)
                                    } else {
                                        history.push(item.path)
                                        console.log(item)
                                    }

                                }}>
                                    {item.name}
                                </Menu.Item>) : ([])
                        })}
                    </Menu>
                </Header>

                <Content style={{ padding: '0 0px', margin: '0' }}>
                    <div className={styles.site_layout_content}>{props.children}</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </>
    )
};


export default homePageLayout