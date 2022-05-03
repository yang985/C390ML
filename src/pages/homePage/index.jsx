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

const { Header, Content, Footer } = Layout;
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const homePage = () => {
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
                        <h3 href={'/project/4'} style={contentStyle}>Chapter 1.1</h3>
                    </div>
                    <div>
                        <h3 href={'/project/5'} style={contentStyle}>Chapter 1.2</h3>
                    </div>
                    <div>
                        <h3 href={'/project/6'} style={contentStyle}>Chapter 1.3</h3>
                    </div>
                    <div>
                        <h3 href={'/project/7'} style={contentStyle}>Chapter 1.4</h3>
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
                        {defaultProps.routes.map((item, index) => {
                            const key = item.name
                            if (item.href) {
                                return (<Menu.Item key={key}><a href={item.href}>{item.name}</a></Menu.Item>)
                            }

                            return (<Menu.Item key={key}>{item.name}</Menu.Item>)
                        })}
                    </Menu>
                </Header>

                <Content style={{ padding: '0 0px', margin: '20px' }}>
                    <div className={styles.site_layout_content}>Content</div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>  </Footer>
            </Layout>
        </>
    )


}

export default homePage