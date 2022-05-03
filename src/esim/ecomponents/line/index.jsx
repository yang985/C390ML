import React, { Component } from 'react';

export default (props) => {

  const lineStyle = {
    x1: props.lineStyle?.x1 ? props.lineStyle.x1 : 0,
    y1: props.lineStyle?.y1 ? props.lineStyle.y1 : 0,
    x2: props.lineStyle?.x2 ? props.lineStyle.x2 : 0,
    y2: props.lineStyle?.y2 ? props.lineStyle.y2 : 0,
  };
  // console.log('line render',lineStyle)

  const getSvgStyle = (option) => {
    let svgWidth = Math.abs(lineStyle.x1 - lineStyle.x2)
      ? Math.abs(lineStyle.x1 - lineStyle.x2)
      : 5;
    let svgHeight = Math.abs(lineStyle.y1 - lineStyle.y2)
      ? Math.abs(lineStyle.y1 - lineStyle.y2)
      : 5;
    // console.log(svgWidth, svgHeight);
    if (option == 'x') {
      return svgWidth;
    } else {
      return svgHeight;
    }
  };

  const svgStyle = {
    width: getSvgStyle('x'),
    height: getSvgStyle('y'),
    style:props.svgStyle,
    className:props.className,
    key:props.index,
  };

  return (
    <svg {...svgStyle} data-index={props.index}>
      <line {...lineStyle} stroke={'black'} strokeWidth={'2'}></line>
    </svg>
  );
};
