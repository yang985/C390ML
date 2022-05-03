import { useState, useEffect } from "react"
import { request, history } from 'umi'
import { Skeleton, Switch, Card, Avatar, message, Empty, Layout, Badge } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, ImportOutlined, PlayCircleOutlined } from '@ant-design/icons';
import styles from './styles.less'

const allProject = () => {
    const { Meta } = Card;
    const [loading, setLoading] = useState(false)
    const [cards, setCards] = useState([])
    useEffect(() => {
        setLoading(true)
        request('/products/getAllProducts/', {
            method: 'POST'
        }).then((result) => {
            if (result.status == 'ok') {
                setLoading(false)
                setCards([...result.content])
            } else {
                message.error(result.message)
            }
        })
    }, [])
    const getBadgesColors = (label) => {
        if (label == 'easy') {
            return 'green';
        }
        if (label === 'normal') {
            return 'orange';
        }
        if (label === 'hard') {
            return 'red';
        }
        return 'red'
    };

    const getBadgesText = (label) => {
        if (label == 'easy') {
            return 'easy';
        }
        if (label === 'normal') {
            return 'normal';
        }
        if (label === 'hard') {
            return 'hard';
        }
        return 'unknown';
    };

    return (
        <div>
            {cards.length === 0 ? (
                <>
                    <br />
                    <Empty />
                    <br />
                </>
            ) : (
                <>{cards?.map((item) => {
                    console.log(item)
                    return (
                        <Card.Grid className={styles.projectGrid} key={item.pk}>
                            <Badge.Ribbon
                                text={getBadgesText(item.fields.label)}
                                color={true ? getBadgesColors(item.fields.label) : 'red'}
                            >
                                <Card
                                    style={{}}
                                    actions={[
                                        // <SettingOutlined key="setting" />,
                                        // <EditOutlined key="edit" />,
                                        // <EllipsisOutlined key="ellipsis" />,
                                        <PlayCircleOutlined key="enter" onClick={() => {
                                            history.push(`/project/${item.pk}`)
                                        }} />,

                                    ]}
                                >
                                    <Skeleton loading={loading} active>
                                        <Meta
                                            title={item.fields.title ? item.fields.title : "Card title"}
                                            description={item.fields.desc ? item.fields.desc : "This is the description"}
                                        />
                                    </Skeleton>
                                </Card>
                            </Badge.Ribbon>
                        </Card.Grid >
                    )
                })}</>)}

        </div>
    )
}


export default allProject