// import style from './styles.less'
import Siderbar from '../../../esim/siderBar/index';
import ToolsBar from '../../../esim/toolsBar/index';
import CanvasContent from '../../../esim/canvas/index';
import { useEffect, useState } from 'react';
import { history,request } from 'umi';

const Create = (props) => {
    const [componentData, setcomponentData] = useState([]);
    const [operation, setOperation] = useState('');
    const [toolBarVisible, setToolbarVisible] = useState(false)
    const [simStatus, setSimStatus] = useState(false)
    const hideFunctions = props?.hideFunctions ? props.hideFunctions : false

    useEffect(()=>{
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
                    const data = result.content.componentData
                    setcomponentData([...data])
                }
            })
        }
    },[])
    useEffect(() => {
        // console.log(componentData)
    }, [componentData]);

    // console.log('componentData',componentData)

    const changeSwitchStateForallBulb = (boolean) => {
        const newComponentData = componentData.map((item) => {
            if (item.label == 'bulb') {
                item.switch = boolean
            } else {
                // item.switch = false;
            }
            return item
        })
        setcomponentData([...newComponentData])
    }

    const changeComponentSwitchStateByKey = (key, boolean) => {
        const newComponentData = componentData.map((item) => {
            if (item.key == key) {
                item.switch = boolean
            } else {
                // item.switch = false;
            }
            return item
        })
        setcomponentData([...newComponentData])
    }

    const searchComponentByKey = (index) => {
        for (let i = 0; i < componentData.length; i++) {
            if (componentData[i].key == index) {
                return componentData[i]
            }
        }
        return undefined
    }
    // set component data function for other son component
    const setOneNewComponentData = (item) => {
        let tmp = [...componentData, item];
        setcomponentData([...tmp]);
    };

    const setOneNewLineComponent = (item) => {
        // add before any componentdata
        let tmpComponentData = componentData.map((item) => {
            if (item.label !== 'line') {

            }
        })
        let tmp = [item, ...componentData]
        setcomponentData([...tmp])
    }

    const operationSetter = (str) => {
        setOperation(str);
    };

    //change component pos in certain key
    const changeComponentSvgSInKey = (key, x, y) => {
        const tmp = componentData.map((item, index) => {
            if (item.key == key) {
                item.svgStyle = {
                    top: y,
                    left: x,
                };
                return item;
            }
            return item;
        });

        setcomponentData([...tmp]);
    };

    const searchByKeyToChangeLinePos = (key, newOne, Pos) => {
        // console.log(componentData)

        const isContainSelectedOne = false;
        for (let x = 0; x < componentData.length; x++) {
            if (componentData[x].key == key) {
                isContainSelectedOne = true;
            }
        }
        // if exists ,then change the Pos attributes
        if (isContainSelectedOne) {
            // console.log(isContainSelectedOne)
            const tmp = componentData.map((item, index) => {
                if (item.key == key) {
                    item.Pos = Pos;
                    return item;
                }
                return item;
            });
            setcomponentData([...tmp]);
        } else {
            // console.log(isContainSelectedOne)
            // if dont't exist then create new one
            setOneNewComponentData(newOne);
        }
    };

    return (
        <>
            <ToolsBar
                changeSwitchStateForallBulb={changeSwitchStateForallBulb}
                getSimStatus={simStatus}
                getcomponentData ={componentData}
                setcomponentData={setcomponentData}
                setSimStatus={setSimStatus}
                hideFunctions={hideFunctions}
            />
            <Siderbar
                setcomponentData={setcomponentData}
                getOperation={operation}
                setOperation={operationSetter}
            />
            <CanvasContent
                changeComponentSwitchStateByKey={changeComponentSwitchStateByKey}
                getSimStatus={simStatus}
                getComponentData={componentData}
                searchComponentByKey={searchComponentByKey}
                getOperation={operation}
                setOperation={operationSetter}
                setcomponentData={setcomponentData}
                setOneNewComponentData={setOneNewComponentData}
                setOneNewLineComponent={setOneNewLineComponent}
                changeComponentSvgSInKey={changeComponentSvgSInKey}
                searchByKeyToChangeLinePos={searchByKeyToChangeLinePos}
            />
        </>
    );
};

export default Create;
