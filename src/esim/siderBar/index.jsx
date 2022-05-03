import style from './styles.less';
import React, { Component } from 'react';
import Battery from '../ecomponents/battery';
import Switch from '../ecomponents/switch';
import Bulb from '../ecomponents/bulb'
export default (props) => {
  // const handleDrop =(e,item)=>{
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log(e,item)
  // }
  const dragStartHandler = (e, item) => {
    props.setOperation('drag');
    e.dataTransfer.setData('elementindex', e.target.dataset.elementindex);
  };

  return (
    <div className={style.component_list} onDragStart={dragStartHandler}>
      {/* <p>component_list</p> */}

      <div style={{ width: '50px', height: '110px', margin: '0 auto' }} data-elementindex={1} draggable>
        <Battery />
      </div>
      {/* elementindex 2 is line */}
      <div style={{ width: '80px', height: '80px', margin: '0 auto' }} data-elementindex={3} draggable>
        <Switch />
      </div>
      <div style={{ width: '80px', height: '110px', margin: '0 auto' }} data-elementindex={4} draggable>
        <Bulb/>
      </div>
    </div>
  );
};
