import battery from '@/esim/ecomponents/icons/battery_48px.png';
import b from '@/esim/ecomponents/icons/battery.svg';
import React, { Component } from 'react';

export default (props) => {
  //change operations at different state
  //1. change color when hover

  const dropped = props.dropped ? props.dropped : false;
  const mouseOver = props.mouseOver ? props.mouseOver : undefined;
  const mouseOut = props.mouseOut ? props.mouseOut : undefined;
  const mouseDown = props.mouseDown ? props.mouseDown : undefined;
  const mouseDownForImage = props.mouseDownForImage ? props.mouseDownForImage : undefined;
  // console.log(mouseOver, mouseOut)
  /////////////////////
  const svgStyle = {
    width: '50',
    height: '100',
  };

  const imageStyle = {
    width: svgStyle.width,
    height: svgStyle.height * 0.8,
  };
  const offsetCalculator = (currentXY, svgXY) => {
    let offset = 0.5 * svgXY - 0.5 * currentXY;

    return offset;
  };

  const checker = (e) => {
    console.log(e);
  };

  return (
    <>
      <svg
        width={svgStyle.width}
        height={svgStyle.height}
        style={
          {
            // borderStyle: 'solid',
            // borderWidth: ' 1px',
          }
        }
      >
        <image
          href={battery}
          width={imageStyle.width}
          height={imageStyle.height}
          onMouseDown={mouseDownForImage}
          style={{
            cursor: dropped ? 'grab' : 'default',
            y: offsetCalculator(svgStyle.height * 0.8, svgStyle.height),
          }}
        />
        <circle
          id="mycircle"
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          onMouseDown={mouseDown}
          cx={0.5 * svgStyle.width}
          cy={offsetCalculator(svgStyle.height * 0.8, svgStyle.height) - 5}
          r="4"
          stroke="#000000"
          strokeWidth="1"
          fill="#ffcc00"
          fillOpacity={'1'}
        />
        <circle
          id="mycircle"
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          onMouseDown={mouseDown}
          cx={0.5 * svgStyle.width}
          cy={offsetCalculator(svgStyle.height * 0.8, svgStyle.height) + imageStyle.height + 5}
          r="4"
          stroke="#000000"
          strokeWidth="1"
          fill="#ffffff"
          fillOpacity={'1'}
        />
        <text x={'0'} y={0.5 * svgStyle.height} style={{}}>
          Battery
        </text>
      </svg>
    </>
  );
};
