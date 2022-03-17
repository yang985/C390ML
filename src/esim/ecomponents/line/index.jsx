import React, { Component } from 'react';

export default (props) => {
  console.log('lineStyle', props.lineStyle);

  const lineStyle = {
    x1: props.lineStyle?.x1 ? props.lineStyle.x1 : 0,
    y1: props.lineStyle?.y1 ? props.lineStyle.y1 : 0,
    x2: props.lineStyle?.x2 ? props.lineStyle.x2 : 0,
    y2: props.lineStyle?.y2 ? props.lineStyle.y2 : 0,
  };

  const getSvgStyle = (option) => {
    let svgWidth = Math.abs(lineStyle.x1 - lineStyle.x2)
      ? Math.abs(lineStyle.x1 - lineStyle.x2)
      : 5;
    let svgHeight = Math.abs(lineStyle.y1 - lineStyle.y2)
      ? Math.abs(lineStyle.y1 - lineStyle.y2)
      : 5;
    console.log(svgWidth, svgHeight);
    if (option == 'x') {
      return svgWidth;
    } else {
      return svgHeight;
    }
  };
  const svgStyle = {
    width: getSvgStyle('x'),
    height: getSvgStyle('y'),
    // style:props.svgStyle,
  };

  return (
    <svg {...svgStyle}>
      <line {...lineStyle} stroke={'black'} strokeWidth={'2'}></line>
    </svg>
  );
};
