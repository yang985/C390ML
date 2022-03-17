import { createRef, useEffect, useState } from 'react';
import React, { Component } from 'react';
import Battery from '../ecomponents/battery';
import Line from '../ecomponents/line';
import style from './style.less';

export default (props) => {
  const canvasRef = React.createRef();
  // functions for parent component Create
  const componentData = props.getComponentData;
  const setOneNewComponentData = props.setOneNewComponentData;
  const changeComponentPosInKey = props.changeComponentPosInKey;
  const searchByKeyToChangeLinePos = props.searchByKeyToChangeLinePos;

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
    // console.log(componentData)
  }, [componentData]);

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

  const handleMouseDown = (e) => {
    if (e.target.nodeName == 'image') {
      // console.log('gotcha')
      // console.log('mousedown', e);
      // moving component in canvas

      // console.log(Number(e.target?.parentNode?.parentNode?.dataset?.index));
      // console.log(componentData);

      //get selected one
      const selected = componentData[Number(e.target?.parentNode?.parentNode?.dataset?.index)];
      if (!selected) return false;
      // console.log(selected);
      const currentX = Number(selected.style.left.replace('px', ''));
      const currentY = Number(selected.style.top.replace('px', ''));

      // //flexible
      const global_x = e.clientX;
      const global_y = e.clientY;
      console.log(global_x, global_y);

      const move = (events) => {
        props.setOperation('move');
        let xAfterMove = events.clientX;
        let yAfterMove = events.clientY;
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
      const up = (events) => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }

    if (e.target.nodeName == 'circle') {
      console.log('mouseDownForCircles', e);
      //1.record the start coordinate after user click down the mouse
      //2.record the end coordinate after user release the mouse
      //make sure the end coordinate is not the head node!!! return a message for user
      //3.draw the lines

      console.log(e.target.parentElement.parentElement.parentElement);
      console.log(e.target.parentElement.parentElement.parentElement.getBoundingClientRect().left);
      //calculate the start point
      const canvasStartPos = {
        x: e.target.parentElement.parentElement.parentElement.getBoundingClientRect().left,
        y: e.target.parentElement.parentElement.parentElement.getBoundingClientRect().top,
      };
      console.log('canvasStartPo', canvasStartPos);

      // const bias_to_circle_center = Number(e.target.getAttribute('r'))

      const startPosInClient = {
        x: e.clientX,
        y: e.clientY,
      };

      const startPos = {
        x1: startPosInClient.x - canvasStartPos.x,
        y1: startPosInClient.y - canvasStartPos.y,
      };
      // console.log('startPos', startPos);

      const move = (event) => {
        //update the line component for each move
        //get end point for each move
        const endPos = {
          x2: event.clientX - canvasStartPos.x,
          y2: event.clientY - canvasStartPos.y,
        };

        //create new line component for this click
        //get line component
        const selected = component_list[1];
        //div style setting
        selected.style = {
          left: startPos.x1 < endPos.x2 ? startPos.x1 : endPos.x2,
          top: startPos.y1 < endPos.y2 ? startPos.y1 : endPos.y2,
        };
        // line pos setting
        selected.pos = LinePosCalculator(startPos.x1, endPos.x2, startPos.y1, endPos.y2);
        // console.log(LinePosCalculator(startPos.x1,endPos.x2,startPos.y1,endPos.y2))
        selected.component = React.cloneElement(selected.component, { lineStyle: selected.pos });

        // console.log('mouseMove',componentData)
        setOneNewComponentData(selected);
      };
      const up = (event) => {
        //confirm end pos if this is liable
        const endPos = {
          x2: event.clientX - canvasStartPos.x,
          y2: event.clientY - canvasStartPos.y,
        };
        console.log('endPos', endPos);
        //get div style for each componentData

        //create new line component for this click
        //get line component
        const selected = component_list[1];
        selected.style = {
          left: startPos.x1 < endPos.x2 ? startPos.x1 : endPos.x2,
          top: startPos.y1 < endPos.y2 ? startPos.y1 : endPos.y2,
        };
        selected.pos = {
          x1: startPos.x1 - selected.style.left,
          y1: startPos.y1 - selected.style.top,
          x2: endPos.x2 - selected.style.left,
          y2: endPos.y2 - selected.style.top,
        };

        // console.log('mouseUp',componentData)
        // console.log('selected', selected)
        selected.pos = LinePosCalculator(startPos.x1, endPos.x2, startPos.y1, endPos.y2);
        // console.log(LinePosCalculator(startPos.x1,endPos.x2,startPos.y1,endPos.y2))
        setOneNewComponentData(selected);

        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    }
  };

  const component_list = [
    {
      index: 1,
      component: (
        <Battery
          mouseOver={mouseOverForcircles}
          mouseOut={mouseOutForcircles}
          // mouseDown={mouseDownForCircles}
          dropped={true}
          hideText={true}
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
      component: <Line />,
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
      ref={canvasRef}
    >
      {/* component needs render */}
      {componentData.map((item, index) => {
        if (item.label == 'line') {
          const comp = item.component;
          // console.log('comp',comp)
        }
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
