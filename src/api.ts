/**
 * 获取卡片列表
 */
export const getCardList: () => Promise<any> = () => {
  return fetch("/api/get_cards").then((r) => r.json())
}

/**
 * 保存卡片
 */
interface saveCardReq {
  uid: string,
  name: string
  card_type: number
}
export const saveCard = (params:saveCardReq) => {
  return fetch("/api/save_card", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body:`uid=${params.uid}&name=${params.name}&card_type=${params.card_type}`
  }).then((r) => r)
}

/**
 * 删除卡片
 */
interface deleteCardReq {
  uid: string,
}
export const deleteCard = (params:deleteCardReq) => {
  return fetch("/api/delete_card", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body:`uid=${params.uid}`
  }).then((r) => r)
}


