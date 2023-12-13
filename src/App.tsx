import React, {useState} from 'react';
import {Button, List, Tag, NavBar, Modal, Input, Form, Selector} from 'antd-mobile'
import {Radio} from 'antd'


const cards = [
  {
    name: 'Phone',
    uid: 'sjsjdks',
    type: 1
  },
  {
    name: 'Blue',
    uid: 'sadasd',
    type: 1
  },
  {
    name: '用户',
    uid: '2wqewqeq',
    type: 2,
  }
]
const App: React.FC = () => (
  <div className="App">
    <NavBar back={null}>卡片列表</NavBar>
    <List>
      {cards.map(card => (
        <List.Item
          clickable={true}
          key={card.name}
          description={card.uid}
          onClick={(e) => {
            Modal.alert({
              title: "修改卡片信息",
              content: <>
                <Form layout='horizontal'>
                  <Form.Item label='uid' name='uid'>
                    <Input defaultValue={card.uid} readOnly disabled/>
                  </Form.Item>
                  <Form.Item label='备注' name='comment'>
                    <Input placeholder='请输入备注' clearable defaultValue={card.name}/>
                  </Form.Item>
                  <Form.Item label="卡片类型" name="type" required={false}>
                    <Radio.Group
                      optionType="button"
                      buttonStyle="solid"
                      defaultValue={card.type.toString()}
                    >
                      <Radio.Button value="2">普通卡</Radio.Button>
                      <Radio.Button value="1">管理卡</Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </>
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
            style={{width: "90%", marginInline: "5%", marginTop: "10%"}}>新增卡片</Button>
  </div>
);

export default App;
