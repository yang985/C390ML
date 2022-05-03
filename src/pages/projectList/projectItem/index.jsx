import React, { useEffect, useState } from "react";
import Create from '@/pages/Admin/Create'
import { PageHeader, Typography,Row } from 'antd';
import { history,request } from "umi";
const projectItem = () => {

    const [hints ,setHints] = useState('')
    useEffect(() => {
        console.log(history.location.pathname)
        const strs = history.location.pathname.split('/')
        if(strs[1]=='project' && Number(strs[2]) ){
            request('/products/getProductById/',{
                method:'POST',
                data:{
                    key:Number(strs[2]),
                }
            }).then((result)=>{
                if(result.status == 'ok'){
                    const hints = result.content.hints
                    setHints(hints)
                }
            })
        }
    }, [])

    const { Paragraph } = Typography;
    const Content = ({ children}) => (
        <Row>
          <div style={{ flex: 1 }}>{children}</div>
        </Row>
      );

    return (
        <>
            <PageHeader
                title="Title"
                className="site-page-header"
            >
                <Content>
                    hints:
                    <Paragraph>
                        {hints? hints:'failed to load'}
                    </Paragraph>
                </Content>
            </PageHeader>
            <div><Create hideFunctions={true}/></div>
        </>
    )


}


export default projectItem