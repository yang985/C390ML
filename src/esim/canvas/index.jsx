import { createRef, useState } from 'react';
import React, { Component } from 'react';
import Battery from '../ecomponents/battery';
import Line from '../ecomponents/line';
import style from './style.less';

export default (props) => {
  const canvasRef = React.createRef();
  // functions for parent component Create
  const componentData = props.getComponentData;
  const setComponentData = props.setComponentData;
  const changeComponentPosInKey = props.changeComponentPosInKey;

  const getCanvasRef = () => {
    return canvasRef;
  };

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

  const mouseDownForCircles = (e) => {
    console.log('mouseDownForCircles', e);
    //1.record the start coordinate after user click down the mouse
    //2.record the end coordinate after user release the mouse
    //make sure the end coordinate is not the head node!!! return a message for user
    //3.draw the lines

    console.log(e.target.parentElement.parentElement.parentElement.getBoundingClientRect().left);
    //calculate the start point
    const canvasStartPos = {
      x: e.target.parentElement.parentElement.parentElement.getBoundingClientRect().left,
      y: e.target.parentElement.parentElement.parentElement.getBoundingClientRect().top,
    };
    const startPosInClient = {
      x: e.clientX,
      y: e.clientY,
    };
    const startPos = {
      x1: e.clientX - canvasStartPos.x,
      y1: e.clientY - canvasStartPos.y,
    };
    console.log('startPos', startPos);

    const move = (e) => {
      //update the line component for each move
      //get end point for each move
      const endPos = {
        x2: e.clientX - startPosInClient.x,
        y2: e.clientY - startPosInClient.y,
      };
      console.log('endPos', endPos);
      //get div style for each componentData
    };
    const up = (e) => {
      //confirm end pos if this is liable

      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const handleMouseDown = (e) => {
    console.log('mousedown', e);

    // moving component in canvas
    console.log(Number(e.target?.parentNode?.parentNode?.dataset?.index));
    console.log(componentData);
    const selected = componentData[Number(e.target?.parentNode?.parentNode?.dataset?.index)];
    if (!selected) return false;
    console.log(selected);
    const currentX = Number(selected.style.left.replace('px', ''));
    const currentY = Number(selected.style.top.replace('px', ''));
    const global_x = e.clientX;
    const global_y = e.clientY;

    const move = (e) => {
      props.setOperation('move');
      let xAfterMove = e.clientX;
      let yAfterMove = e.clientY;
      let differenceX = global_x - xAfterMove;
      let differenceY = global_y - yAfterMove;

      // console.log(differenceX, differenceY)
      // console.log(currentX, currentY)

      // changeComponentPosInkey(key,x,y)
      changeComponentPosInKey(
        selected.key,
        `${currentX - differenceX}px`,
        `${currentY - differenceY}px`,
      );
    };
    const up = (e) => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const component_list = [
    {
      index: 1,
      component: (
        <Battery
          mouseOver={mouseOverForcircles}
          mouseOut={mouseOutForcircles}
          dropped={true}
          mouseDown={mouseDownForCircles}
          getCanvasRef={getCanvasRef}
          // mouseDownForImage={handleMouseDown}
        />
      ),
      label: 'battery',
      iconStyle: {
        width: '24px',
        height: '41px',
      },
    },
    {
      index: 2,
      component: '',
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
  ];

  // console.log('componentData', componentData)
  // event handlers....
  const handleDrop = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e, item);
    let index = e.dataTransfer.getData('index');

    //get dragged component
    const selected = component_list[index - 1];

    // console.log(canvasRef.current)
    // console.log('canvasRef', canvasRef.current.getBoundingClientRect().left, canvasRef.current.getBoundingClientRect().top)
    selected.style = {
      left: e.clientX - canvasRef.current.getBoundingClientRect().left + 'px',
      top: e.clientY - canvasRef.current.getBoundingClientRect().top + 'px',
    };

    // counting componentData and setting index for each components
    selected.key = componentData.length;

    //addEventListener to this new component before rendering
    //get component first
    // const component = selected.component
    // console.log(component)

    setComponentData(selected);
    console.log(componentData);
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
      // onMouseDown={handleMouseDown}
      ref={canvasRef}
    >
      {/* component needs render */}
      {componentData.map((item, index) => {
        return (
          <div
            className={style.component}
            id={index}
            key={index}
            data-index={index}
            style={item.style}
          >
            {item.component}
          </div>
        );
      })}
    </div>
  );
};
