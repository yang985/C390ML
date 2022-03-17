// import style from './styles.less'
import Siderbar from '../../../esim/siderBar/index';
import ToolsBar from '../../../esim/toolsBar/index';
import CanvasContent from '../../../esim/canvas/index';
import { useState } from 'react';

const Create = () => {
  const [componentData, setcomponentData] = useState([]);
  const [operation, setOperation] = useState('');

  // console.log('componentData',componentData)
  // set component data function for other son component
  const setComponentData = (item) => {
    let tmp = [...componentData, item];
    setcomponentData([...tmp]);
  };

  const operationSetter = (str) => {
    setOperation(str);
  };

  //change component pos in certain key
  const changeComponentPosInKey = (key, x, y) => {
    const tmp = componentData.map((item, index) => {
      if (item.key == key) {
        item.style = {
          top: y,
          left: x,
        };
        return item;
      }
      return item;
    });

    setcomponentData([...tmp]);
  };

  return (
    <>
      <ToolsBar />
      <Siderbar
        setcomponentData={setcomponentData}
        getOperation={operation}
        setOperation={operationSetter}
      />
      <CanvasContent
        getComponentData={componentData}
        getOperation={operation}
        setOperation={operationSetter}
        setComponentData={setComponentData}
        changeComponentPosInKey={changeComponentPosInKey}
      />
    </>
  );
};

export default Create;
