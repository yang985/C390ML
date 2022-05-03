import React, { useEffect, useState } from "react";
import { useModel } from 'umi'
import { request, history } from 'umi';
import { createNewProduct } from '@/services/ant-design-pro/api';
import { message, Button, Modal, Steps, Select, Tag, Input, Checkbox, Radio } from "antd";
import styles from './style.less'

export default (props) => {

  const simStatus = props.getSimStatus
  const changeSwitchStateForallBulb = props.changeSwitchStateForallBulb
  const { initialState, setInitialState } = useModel('@@initialState');
  const [modalVisible, setModalVisible] = useState(false)
  const [current, setCurrent] = useState(0);
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [hints, setHints] = useState('')
  const [checkBoxList, setCheckBoxList] = useState([])
  const [radioValue, setRadioValue] = useState('easy')
  const hideFunctions = props?.hideFunctions ? props.hideFunctions : false

  useEffect(() => {
    console.log(simStatus)
    if (simStatus == false) {
      // turn off all the lights
      changeSwitchStateForallBulb(false)
    }
  }, [simStatus])

  const buttonList = [
    {
      key: 0,
      content: 'Clear the canvas',
      hideFunctions: hideFunctions,
      onClick: () => {
        props.setcomponentData ? props.setcomponentData([]) : console.log('unknown')
      }
    },
    {
      key: 1,
      type: simStatus ? 'primary' : 'primary',
      style: {
        float: 'right',
      },
      content: simStatus ? 'Stop simulation' : 'Simulate now',
      onClick: () => {
        props.setcomponentData([...props.getcomponentData])
        props.setSimStatus(!simStatus)
      }
    },
    {
      key: 2,
      hideFunctions: hideFunctions,
      content: 'Export',
    },
    {
      key: 3,
      hideFunctions: hideFunctions,
      content: 'Import',
    },
    {
      key: 4,
      hideFunctions: hideFunctions,
      style: {
        float: 'right',
      },
      content: 'Submit',
      onClick: () => {
        if (simStatus) {
          message.error('Please stop simulation first !!!', 3)
          return
        }
        if (props.getcomponentData.length == 0) {
          message.error('Please drag some conponent and construct a circuit first !!!')
          return
        }
        setModalVisible(true)
      }
    },

  ]

  const options = [
    { label: 'easy', value: 'easy' },
    { label: 'normal', value: 'normal' },
    { label: 'hard', value: 'hard' },
  ];

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const titleOnChange = (e) => {
    // console.log('Change:', e.target.value);
    setTitle(e.target.value)
  }
  const textAreaOnChange = e => {
    // console.log('Change:', e.target.value);
    setDesc(e.target.value)
  };

  const hintsOnChange = e => {
    // console.log('Change:', e.target.value);
    setHints(e.target.value)
  };

  const checkBoxOnChange = checkedValues => {
    // console.log('checkedValues:', checkedValues);
    setCheckBoxList(checkedValues)
  }
  const radioOnChange = e => {
    console.log('radio:', e.target.value);
    setRadioValue(e.target.value)
  }
  const { Step } = Steps;
  const { TextArea } = Input;
  const steps = [
    {
      title: 'Labels',
      content: (

        <div style={{ padding: '100px 10px 20px 10px' }}>

          Select some labels for your product !
          <br /><br />
          <Radio.Group onChange={radioOnChange} value={radioValue}>
            {options.map((item) => {
              return (
                <Radio value={item.value}>{item.label}</Radio>
              )
            })}
          </Radio.Group>
          {/* <Checkbox.Group options={options} defaultValue={['simple']} onChange={checkBoxOnChange} /> */}
        </div>),
    },
    {
      title: 'Description',
      content: (
        <div style={{ padding: '20px 10px 20px 10px' }}>
          <Input prefix={'Title:'} placeholder={'title name for your product'} required onChange={titleOnChange}>

          </Input>
          <br />
          <br />
          <TextArea placeholder={'Description for your product'} required showCount maxLength={200} style={{ height: 200 }} onChange={textAreaOnChange} />
        </div>
      ),
    },
    {
      title: 'Hints',
      content: (
        <div style={{ padding: '20px 10px 20px 10px' }}>
          <TextArea placeholder={'Hints for your product'} required showCount maxLength={500} style={{ height: 400 }} onChange={hintsOnChange} />
        </div>
      ),
    },
  ]
  return (
    <div style={{ width: '100%', padding: '0 0 10px 0' }}>
      <div className={styles.buttonsDiv} >
        {buttonList.map((item, index) => {
          if (item.hideFunctions) {
            return (<></>)
          }

          return (
            <>
              <Button type={item.type} style={{ margin: '0 10px 0 0', ...item.style }} key={item.key} onClick={item.onClick ? item.onClick : undefined}>{item.content}</Button>
            </>
          )
        })}
      </div>
      <Modal
        visible={modalVisible}
        onCancel={handleCancel}
        style={{ minWidth: '1000px' }}
        footer={[
          // <Button type="primary" onClick={handleCancel}>Close</Button>
        ]}
      >
        <Steps style={{ marginTop: '15px' }} current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className={styles.steps_content}>{steps[current].content}</div>
        <div className={styles.steps_action}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => {
              if (!title || !desc || !hints) {
                if (!title) {
                  message.error('please go back and add title name !')
                }
                if (!desc) {
                  message.error('please go back and add description !')
                }
                if (!hints) {
                  message.error('please go back and add hints !')
                }
                return
              }
              const userId = initialState.currentUser.userId
              const userName = initialState.currentUser.username
              createNewProduct({
                userId: userId,
                owner: userName,
                hints: hints,
                title: title,
                desc: desc,
                label:radioValue,
                componentData: props.getcomponentData
              }).then((result) => {
                if (result.status == 'ok') {
                  message.success('successfully submitted !!!')
                  history.push('/project/allProject')
                }
              })
            }}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};
