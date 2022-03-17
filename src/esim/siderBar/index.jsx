import style from './styles.less';
import React, { Component } from 'react';
import Battery from '../ecomponents/battery';

export default (props) => {
  // const handleDrop =(e,item)=>{
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log(e,item)
  // }
  const dragStartHandler = (e, item) => {
    props.setOperation('drag');
    e.dataTransfer.setData('index', e.target.dataset.index);
  };

  return (
    <div className={style.component_list} onDragStart={dragStartHandler}>
      {/* <p>component_list</p> */}

      <div style={{ width: '50px', height: '50px', margin: '0 auto' }} data-index={1} draggable>
        <Battery />
      </div>
    </div>
  );
};
