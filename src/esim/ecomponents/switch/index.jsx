import switchOff from '@/esim/ecomponents/icons/switch_off_80px.png';
import switchOn from '@/esim/ecomponents/icons/switch_on_80px.png';
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
    height: '70',
  };

  const imageStyle = {
    width: svgStyle.width,
    height: svgStyle.height * 0.6,
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
          href={props.switch ? switchOn : switchOff}
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
          cx={0.5 * svgStyle.width}
          cy={offsetCalculator(imageStyle.height, svgStyle.height) - 5}
          r="4"
          stroke="#000000"
          strokeWidth="1"
          fill="#ffffff"
          fillOpacity={'1'}
        />
        {!hideText ? (
          <text x={'0'} y={0.5 * svgStyle.height} style={{}}>
            Switch
          </text>
        ) : (
          []
        )}
      </svg>
    </>
  );
};
