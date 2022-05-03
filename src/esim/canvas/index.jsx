import { createRef, useEffect, useState } from 'react';
import React, { Component } from 'react';
import Battery from '../ecomponents/battery';
import Line from '../ecomponents/line';
import style from './style.less';
import { message } from 'antd';
import Switch from '../ecomponents/switch';
import Bulb from '../ecomponents/bulb'
import { ConsoleSqlOutlined } from '@ant-design/icons';

export default (props) => {
    const canvasRef = React.createRef();
    // functions for parent component Create
    const simStatus = props.getSimStatus;
    const componentData = props.getComponentData;
    const setcomponentData = props.setcomponentData
    const setOneNewComponentData = props.setOneNewComponentData;
    const setOneNewLineComponent = props.setOneNewLineComponent
    const changeComponentSvgSInKey = props.changeComponentSvgSInKey;
    const searchByKeyToChangeLinePos = props.searchByKeyToChangeLinePos;
    const searchComponentByKey = props.searchComponentByKey
    const changeComponentSwitchStateByKey = props.changeComponentSwitchStateByKey
    //operations for nodes(circles) at different state (event functions)
    const mouseOverForcircles = (e) => {
        // console.log(e)
        e.target.style.stroke = '#ffffff';
        e.target.style.cursor = 'hand';
    };
    const mouseOutForcircles = (e) => {
        e.target.style.stroke = '#000000';
        e.target.style.cursor = 'default';
    };

    // const mouseDownForCircles = (e) => {

    // };
    useEffect(() => {
        // console.log('change in componentData', componentData)
        if (simStatus) {
            circuitLogicHandler()
        } else {
            // polling the componentData , and switch off all the bulbs
        }

    }, [componentData]);

    const preprocessingData = (componentData) => {
        // componentData.map((item,index)=>{
        //     // 返回一些重要的 数据供分析
        //     return {label:item.label,key:item.key,headToList:item.nodes.head,}
        // })
        var dataAfterProcess = componentData.filter((item) => {
            if (item.label == 'line') {
                return false
            }
            return true
        }).map((item, index) => {
            // 返回一些重要的 数据供分析
            return { label: item.label, key: item.key, headToList: item.nodes.head, switch: item.switch }
        })
        return dataAfterProcess
    }


    const circuitLogicHandler = () => {
        console.log('simulation starts to analyse.... ')
        var data = preprocessingData(componentData)
        var counter = 0
        const searchComponetBykey = (key) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key == key) {
                    return data[i]
                }
            }
        }
        // we assume the first element in searching is and decide to stop
        var isConnected = false
        var mockStart = data[0]
        for (let i = 0; i < data.length; i++) {
            if (data[i].headToList.length == 0) {
            } else {
                mockStart = data[i]
                isConnected = true
                break
            }
        }
        if (!isConnected) {
            return
        }
        const startFrom = mockStart
        var circuitList = []
        function polling(component = startFrom, level = 0, circuitTmp = []) {
            counter += 1
            console.log('polling times', counter)
            if (!component) return
            //get current item
            const crtItem = component
            // console.log(crtItem)
            for (let i = 0; i < component.headToList.length; i++) {
                //is it find (current)
                const nextIndex = Number(crtItem.headToList[i].targetIndex)
                const isNextNodeTheFirst = nextIndex == startFrom.key
                const nextComponent = searchComponetBykey(nextIndex)
                const isNextNodeSwitchAndOff = nextComponent.label == 'switch' && nextComponent.switch == false
                const isNextNodeHaveNextNode = nextComponent.headToList != []
                // console.log('isNextNodeTheFirst', isNextNodeTheFirst)
                // console.log('isNextNodeSwitchAndOff', isNextNodeSwitchAndOff)
                const isEnd = isNextNodeSwitchAndOff || isNextNodeTheFirst || !isNextNodeHaveNextNode
                console.log('isEnd', isEnd)
                if (isEnd) {
                    if (isNextNodeTheFirst) {
                        //print the circuit
                        const nextCircuit = [...circuitTmp, crtItem]
                        circuitList.push(nextCircuit)
                    }
                } else {
                    const nextCircuit = [...circuitTmp, crtItem]
                    polling(nextComponent, level + 1, nextCircuit)
                }
            }
        }
        polling()
        console.log('circuitList', circuitList)
        const analyse = (circuitList) => {
            var bulbOnList = []
            // except all the bulbs needing to turn on (filter out the componentData)
            var bulbOffList = []

            // map all circuits
            for (let i = 0; i < circuitList.length; i++) {
                var haveBattery = false
                var haveBulb = false
                var bulbKey = undefined
                const crtCircuit = circuitList[i]
                // console.log(crtCircuit)
                crtCircuit.map((item, index) => {
                    if (item.label == 'battery') haveBattery = true
                    if (item.label == 'bulb') {
                        haveBulb = true
                        bulbKey = item.key
                    }
                })
                if (!haveBattery || !haveBulb) {
                    //turn off all lights
                    bulbOnList = []
                    break;
                }
                if (haveBattery && haveBulb) {
                    // console.log(bulbKey)
                    bulbOnList.push(bulbKey)
                }
            }

            data.filter((item) => {
                if (item.label == 'bulb') {
                    return true
                } else {
                    return false
                }
            }).map((item) => {
                let inBulbOn = false
                for (let i = 0; i < bulbOnList.length; i++) {
                    if (item.label == 'bulb' && bulbOnList[i] == item.key) {
                        inBulbOn = true
                    }
                }
                if (!inBulbOn) {
                    bulbOffList.push(item.key)
                }
            })
            console.log('bulbOnList', bulbOnList)
            console.log('bulbOffList', bulbOffList)
            for (let i = 0; i < bulbOnList.length; i++) {
                changeComponentSwitchStateByKey(bulbOnList[i], true)
            }
            for (let i = 0; i < bulbOffList.length; i++) {
                changeComponentSwitchStateByKey(bulbOffList[i], false)
            }
        }
        analyse(circuitList)
    }

    const LinePosCalculator = (x1, x2, y1, y2) => {
        if (x2 > x1 && y2 < y1) {
            const LinePos = {
                x1: 0,
                y1: y1 - y2,
                x2: x2 - x1,
                y2: 0,
            };
            return LinePos;
        }
        if (x2 > x1 && y2 > y1) {
            const LinePos = {
                x1: 0,
                y1: 0,
                x2: x2 - x1,
                y2: y2 - y1,
            };
            return LinePos;
        }
        if (x2 < x1 && y2 > y1) {
            const LinePos = {
                x1: 0,
                y1: y2 - y1,
                x2: x1 - x2,
                y2: 0,
            };
            return LinePos;
        }
        if (x2 < x1 && y2 < y1) {
            const LinePos = {
                x1: x1 - x2,
                y1: y1 - y2,
                x2: 0,
                y2: 0,
            };
            return LinePos;
        }

        if (y1 == y2) {
            const LinePos = {
                x1: x1 > x2 ? x1 - x2 : 0,
                y1: 0,
                x2: x1 > x2 ? 0 : x2 - x1,
                y2: 0,
            };
            return LinePos;
        }

        if (x1 == x2) {
            const LinePos = {
                x1: 0,
                y1: y1 > y2 ? y1 - y2 : 0,
                x2: 0,
                y2: y1 > y2 ? 0 : y2 - y1,
            };
            return LinePos;
        }
        return undefined;
    };


    const handledbClick = (e) => {
        if (e.target.nodeName == 'image') {
            // console.log('mousedbclick', e);
            const changeComponentByKey = (index) => {
                for (let i = 0; i < componentData.length; i++) {
                    if (componentData[i].key == index) {
                        // const crtComponentData = componentData
                        if (componentData[i].label == 'bulb') {
                            return
                        }
                        componentData[i].switch = !componentData[i].switch
                        setcomponentData([...componentData])
                    }
                }
                return
            }
            changeComponentByKey(Number(e.target?.parentNode?.dataset?.index));
        }
    }

    const handleMouseDown = (e) => {
        if (e.target.nodeName == 'image') {
            // console.log('mousedown', e);
            // moving component in canvas

            // console.log(Number(e.target?.parentNode?.parentNode?.dataset?.index));
            // console.log(componentData);

            //search by svg index(create when component created) and get selected one
            const getComponentByKey = (index) => {
                for (let i = 0; i < componentData.length; i++) {
                    if (componentData[i].key == index) {
                        return componentData[i]
                    }
                }
                return false
            }
            const selected = getComponentByKey(Number(e.target?.parentNode?.dataset?.index));
            if (!selected) return false;
            var currentX = Number(selected.svgStyle.left);
            var currentY = Number(selected.svgStyle.top);

            // //flexible
            const global_x = e.clientX;
            const global_y = e.clientY;
            // console.log(global_x, global_y);

            const move = (events) => {
                props.setOperation('move');
                let xAfterMove = events.clientX;
                let yAfterMove = events.clientY;
                let differenceX = global_x - xAfterMove;
                let differenceY = global_y - yAfterMove;

                // console.log(differenceX, differenceY)
                // console.log(currentX, currentY)

                // changeComponentPosInkey(key,x,y)
                changeComponentSvgSInKey(
                    selected.key,
                    `${currentX - differenceX}`,
                    `${currentY - differenceY}`,
                );
            };
            const up = (events) => {
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (e.target.nodeName == 'circle') {
            console.log('mouseDownForCircles', e);
            //1.record the start coordinate after user click down the mouse
            //2.record the end coordinate after user release the mouse
            //make sure the end coordinate is not the head node!!! return a message for user
            //3.draw the lines

            //calculate the start point
            const canvasStartPos = {
                x: e.target.parentElement.parentElement.getBoundingClientRect().left,
                y: e.target.parentElement.parentElement.getBoundingClientRect().top,
            };
            //   console.log('canvasStartPo', canvasStartPos);

            // const bias_to_circle_center = Number(e.target.getAttribute('r'))

            const startPos = {
                x1: e.clientX - canvasStartPos.x,
                y1: e.clientY - canvasStartPos.y,
            };
            // console.log('startPos', startPos);

            //store identity info for this node and compare later
            const startCircleDirection = e.target.dataset.direction
            // console.log(startCircleDirection)

            var isEnterCircle = false

            const move = (event) => {
                // console.log(event)
                //update the line component for each move
                //get end point for each move
                const endPos = {
                    x2: event.clientX - canvasStartPos.x,
                    y2: event.clientY - canvasStartPos.y,
                };

                //create new line component for this click
                //get line component
                const selected = componentData_list[1];
                //add personal indentity
                selected.key = componentData.length;
                //div style setting
                selected.svgStyle = {
                    left: startPos.x1 < endPos.x2 ? startPos.x1 : endPos.x2,
                    top: startPos.y1 < endPos.y2 ? startPos.y1 : endPos.y2,
                };
                // line pos setting
                selected.pos = LinePosCalculator(startPos.x1, endPos.x2, startPos.y1, endPos.y2);
                // console.log(LinePosCalculator(startPos.x1, endPos.x2, startPos.y1, endPos.y2))
                selected.lineStyle = selected.pos
                // console.log('mouseMove',componentData)
                setOneNewLineComponent(selected);

                //判断是否为circle 而且是不同的node端
                if (event.target.nodeName == 'circle' && event.target.dataset.direction !== startCircleDirection) {
                    isEnterCircle = true
                    // console.log('already enter a certain circle')
                } else {
                    isEnterCircle = false
                }
            };

            const up = (event) => {
                console.log('mouseUpForCircles', event);
                //confirm end pos if this is liable
                const endPos = {
                    x2: event.clientX - canvasStartPos.x,
                    y2: event.clientY - canvasStartPos.y,
                };
                // console.log('endPos', endPos);
                //get div style for each componentData

                //create new line component for this click
                //get line component
                const selected = componentData_list[1];

                //add personal indentity
                selected.key = componentData.length;

                selected.svgStyle = {
                    left: startPos.x1 < endPos.x2 ? startPos.x1 : endPos.x2,
                    top: startPos.y1 < endPos.y2 ? startPos.y1 : endPos.y2,
                };
                // console.log('mouseUp',componentData)
                // console.log('selected', selected)
                selected.lineStyle = LinePosCalculator(startPos.x1, endPos.x2, startPos.y1, endPos.y2);
                // console.log(LinePosCalculator(startPos.x1,endPos.x2,startPos.y1,endPos.y2))

                if (isEnterCircle) {
                    //record the connected pairs in componentData
                    //get component which start to draw a line
                    const startComponent = searchComponentByKey(e.target.dataset.index)
                    const endComponent = searchComponentByKey(event.target.dataset.index)
                    //head node 

                    const nodesListHandler = (crtComponent, handleoption, startNodeSameToOp) => {
                        if (handleoption == 'head') {
                            if (!crtComponent.nodes.head) {
                                //initialize
                                let tmpNodes = [{
                                    headIndex: startNodeSameToOp ? e.target.dataset.index : event.target.dataset.index,
                                    targetIndex: startNodeSameToOp ? event.target.dataset.index : e.target.dataset.index,
                                    startPos: startPos,
                                    endPos: endPos,
                                }]
                                crtComponent.nodes.head = tmpNodes
                            } else {
                                crtComponent.nodes.head.push({
                                    headIndex: startNodeSameToOp ? e.target.dataset.index : event.target.dataset.index,
                                    targetIndex: startNodeSameToOp ? event.target.dataset.index : e.target.dataset.index,
                                    startPos: startPos,
                                    endPos: endPos,
                                })
                            }
                        }
                        // if ( option == 'tail'){
                        //     if (!crtComponent.nodes.tail) {
                        //         //initialize
                        //         let tmpNodes = [{
                        //             tailIndex: event.target.dataset.index,
                        //             targetIndex: event.target.dataset.index,
                        //             startPos: startPos,
                        //             endPos: endPos,
                        //         }]
                        //         crtComponent.nodes.tail = tmpNodes
                        //     }else{
                        //         crtComponent.nodes.tail.push({
                        //             tailIndex: event.target.dataset.index,
                        //             targetIndex: event.target.dataset.index,
                        //             startPos: startPos,
                        //             endPos: endPos,
                        //         })
                        //     }
                        // }
                    }

                    if (startCircleDirection == 'head') {
                        nodesListHandler(startComponent, 'head', true)
                        console.log("startComponent", startComponent)
                    } else {
                        nodesListHandler(endComponent, 'head', false)
                    }

                    //set node info for this component
                    setOneNewLineComponent(selected);
                } else {
                    message.error('connector should set at different node')
                    setcomponentData(componentData)
                }

                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            };
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);

        }
    };

    const component_list = [
        {
            elementindex: 1,
            component: (
                <Battery
                    mouseOver={mouseOverForcircles}
                    mouseOut={mouseOutForcircles}
                />
            ),
        },
        {
            elementindex: 2,
            component: <Line />,
        },
        {
            elementindex: 3,
            component: (<Switch
                mouseOver={mouseOverForcircles}
                mouseOut={mouseOutForcircles} />),
        },
        {
            elementindex: 4,
            component: (<Bulb
                mouseOver={mouseOverForcircles}
                mouseOut={mouseOutForcircles} />),
        }
    ];

    const componentData_list = [
        {
            elementindex: 1,
            key: undefined,
            label: 'battery',
            iconStyle: {
                width: '24px',
                height: '41px',
            },
            nodes: {
                head:[],
                tail:[]
            },
        },
        {
            elementindex: 2,
            key: undefined,
            label: 'line',
            itemStyle: {
                width: '24px',
                height: '41px',
            },
            pos: {
                x1: '',
                y1: '',
                x2: '',
                y2: '',
            },
        },
        {
            elementindex: 3,
            key: undefined,
            label: 'switch',
            switch: false,
            itemStyle: {
                width: '24px',
                height: '41px',
            },
            nodes: { head: [], tail: [] },
        },
        {
            elementindex: 4,
            key: undefined,
            label: 'bulb',
            switch: false,
            itemStyle: {
                width: '24px',
                height: '41px',
            },
            nodes: { head: [], tail: [] },
        },
    ];

    // console.log('componentData', componentData)
    // event handlers....
    const handleDrop = (e, item) => {
        e.preventDefault();
        e.stopPropagation();

        let index = e.dataTransfer.getData('elementindex');
        //get dragged component
        const selected = componentData_list[index - 1];
        selected.svgStyle = {
            left: e.clientX - canvasRef.current.getBoundingClientRect().left,
            top: e.clientY - canvasRef.current.getBoundingClientRect().top,
        };

        // counting componentData and setting index for each components
        selected.key = componentData.length;
        setOneNewComponentData(selected);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (props.getOperation === 'drag') e.dataTransfer.dropEffect = 'copy';
        if (props.getOperation === 'move') {
            return false;
        }
    };

    // render function
    return (
        // canvas
        <div
            className={style.canvas}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onDoubleClick={handledbClick}
            ref={canvasRef}
        >
            {/* component needs render */}
            {componentData.map((item, index) => {

                const componentAfterUpdate = React.cloneElement(component_list[item.elementindex - 1].component,
                    {
                        className: style.component,
                        index: item.key,
                        svgStyle: item.svgStyle,
                        //options 
                        //1.battery
                        dropped: true,
                        hideText: true,
                        //lines
                        lineStyle: item.lineStyle ? item.lineStyle : undefined,
                        //switch
                        switch: item.switch ? item.switch : false
                    })
                return (
                    <>
                        {componentAfterUpdate}
                    </>
                );
            })}
        </div>
    );
};
