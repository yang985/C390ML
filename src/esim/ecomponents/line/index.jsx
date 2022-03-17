import React, { Component } from 'react';

export default (props) => {
  const svgStyle = {
    width: '50',
    height: '60',
  };

  const lineStyle = {
    x1: '',
    y1: '',
    x2: '',
    y2: '',
  };

  return (
    <svg width={svgStyle.width} height={svgStyle.height}>
      <line {...lineStyle}></line>
    </svg>
  );
};
