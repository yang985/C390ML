// import style from './styles.less'
import Siderbar from '../../../esim/siderBar/index';
import ToolsBar from '../../../esim/toolsBar/index';
import CanvasContent from '../../../esim/canvas/index';
import { useEffect, useState } from 'react';

const Create = () => {
  const [componentData, setcomponentData] = useState([]);
  const [operation, setOperation] = useState('');

  useEffect(() => {
    // console.log(componentData)
  }, [componentData]);

  // console.log('componentData',componentData)
  // set component data function for other son component
  const setOneNewComponentData = (item) => {
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

  const searchByKeyToChangeLinePos = (key, newOne, Pos) => {
    // console.log(componentData)

    const isContainSelectedOne = false;
    for (let x = 0; x < componentData.length; x++) {
      if (componentData[x].key == key) {
        isContainSelectedOne = true;
      }
    }
    // if exists ,then change the Pos attributes
    if (isContainSelectedOne) {
      // console.log(isContainSelectedOne)
      const tmp = componentData.map((item, index) => {
        if (item.key == key) {
          item.Pos = Pos;
          return item;
        }
        return item;
      });
      setcomponentData([...tmp]);
    } else {
      // console.log(isContainSelectedOne)
      // if dont't exist then create new one
      setOneNewComponentData(newOne);
    }
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
        setOneNewComponentData={setOneNewComponentData}
        changeComponentPosInKey={changeComponentPosInKey}
        searchByKeyToChangeLinePos={searchByKeyToChangeLinePos}
      />
    </>
  );
};

export default Create;
