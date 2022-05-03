import bulbOff from '@/esim/ecomponents/icons/light_80px.png';
import bulbOn from '@/esim/ecomponents/icons/lightOn_80px.png';
import React, { Component } from 'react';

export default (props) => {
  //change operations at different state
  //1. change color when hover

  const dropped = props.dropped ? props.dropped : false;
  const mouseOver = props.mouseOver ? props.mouseOver : undefined;
  const mouseOut = props.mouseOut ? props.mouseOut : undefined;
  const hideText = props.hideText ? props.hideText : false;
  /////////////////////
  const svgStyle = {
    width: '80',
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

  return (
    <>
      <svg
        width={svgStyle.width}
        height={svgStyle.height}
        style={props.svgStyle}
        //set postion style otherwize it can't move
        className={props.className}
        key={props.index}
        data-index={props.index}
      >
        <image
          href={props.switch ? bulbOn : bulbOff}
          width={imageStyle.width}
          height={imageStyle.height}
          style={{
            cursor: dropped ? 'grab' : 'default',
            y: offsetCalculator(imageStyle.height, svgStyle.height),
          }}
        />
        <circle
          id="mycircle"
          data-index={props.index}
          data-direction={'head'}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          // onMouseDown={mouseDown}
          cx={0.5 * svgStyle.width}
          cy={offsetCalculator(imageStyle.height, svgStyle.height) + imageStyle.height + 5}
          r="4"
          stroke="#000000"
          strokeWidth="1"
          fill="#ffcc00"
          fillOpacity={'1'}
        />
        <circle
          id="mycircle"
          data-index={props.index}
          data-direction={'tail'}
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          // onMouseDown={mouseDown}
          cx={0.5 * svgStyle.width - 13}
          cy={offsetCalculator(imageStyle.height, svgStyle.height) + imageStyle.height + 5 -18}
          r="4"
          stroke="#000000"
          strokeWidth="1"
          fill="#ffffff"
          fillOpacity={'1'}
        />
        {!hideText ? (
          <text x={'0'} y={0.5 * svgStyle.height} style={{}}>
            Bulb
          </text>
        ) : (
          []
        )}
      </svg>
    </>
  );
};