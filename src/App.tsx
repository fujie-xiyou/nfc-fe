import React, {useEffect, useState} from 'react';
import {Button, List, Tag, NavBar, Modal, Input, Form, Selector, Loading} from 'antd-mobile'
import {message, Radio} from 'antd'
import {deleteCard, getCardList, saveCard} from "./api";


const App: React.FC = () => {
  const [cardList, setCardList] = useState<{ uid: string, name: string, type: number }[] | undefined>()
  const [card, setCard] = useState<{ uid: string, name: string, type: number } | undefined>()
  const [form] = Form.useForm()

  const getCards = () => {
    getCardList().then(res => {
      setCardList(res)
    })
  }

  useEffect(() => {
    getCards()
  }, [])

  return <div className="App">
    <NavBar back={null}>卡片列表</NavBar>
    <List>
      {cardList?.map((card, i) => (
        <List.Item
          clickable={true}
          key={`${card.uid}_${i}`}
          description={card.uid}
          onClick={(e) => {
            form.setFieldsValue({
              ...card, type: card.type.toString()
            })
            Modal.show({
              title: "修改卡片信息",
              showCloseButton: true,
              closeOnAction: true,
              actions: [{
                key: 'save',
                text: '保存',
                primary: true,
                onClick: () => {
                  form.validateFields().then((values) => {
                    saveCard({uid: values.uid, name: values.name, card_type: values.type}).then(() => {
                      message.success('保存成功')
                      getCards()
                    })
                  })

                }
              },
                {
                  key: 'cancel',
                  text: '删除',
                  primary: true,
                  danger: true,
                  onClick: () => {
                    deleteCard({uid: card.uid}).then(() => {
                      message.success('删除成功')
                      getCards()
                    })
                  }
                }],
              content: <><FormContainer form={form}/></>
            })
          }}
        >
          {card.name} &ensp;
          <Tag
            color={card.type === 1 ? 'success' : 'primary'}
            fill='outline'
            style={{'--border-radius': '6px'}}
          >
            {card.type === 1 ? "管理卡" : "普通卡"}
          </Tag>
        </List.Item>
      ))}
    </List>
    <Button block color='primary' size='large' shape='rounded'
            style={{width: "90%", marginInline: "5%", marginTop: "10%"}}
            onClick={() => {
              const host = window.location.host
              const ws = new WebSocket(`ws://${host}/ws/add_card`)
              if (ws.readyState === ws.OPEN) {
                ws.onmessage = (e) => {
                  setCard(e.data)
                  form.setFieldsValue({...e.data, type: e.data.type.toString()})
                }
              }

              Modal.show({
                onClose: () => {
                  ws.close()
                },
                content: (card ? <FormContainer form={form}/> : <Loading/>),
              })
            }}>新增卡片</Button>
  </div>
};

const FormContainer = ({form}: any) => {
  return <Form layout='horizontal' form={form}>
    <Form.Item label='uid' name='uid'>
      <Input readOnly disabled/>
    </Form.Item>
    <Form.Item label='备注' name='name'>
      <Input placeholder='请输入备注' clearable/>
    </Form.Item>
    <Form.Item label="卡片类型" name="type" required={false}>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
      >
        <Radio.Button value="2">普通卡</Radio.Button>
        <Radio.Button value="1">管理卡</Radio.Button>
      </Radio.Group>
    </Form.Item>
  </Form>
}

export default App;
