// 全域帳密型別
export type AuthContextType = {
  globalUsername: string;
  setGlobalUsername: React.Dispatch<React.SetStateAction<string>>;
  globalPassword: string;
  setGlobalPassword: React.Dispatch<React.SetStateAction<string>>;
};

// 單筆訊息型別
export interface Message {
  id: number;
  sender: string;
  content: string;
}

// 用戶型別
export interface User {
  id: number;
  name: string;
  messages: Message[];
}

// 全域用戶訊息型別
export type UserContextType = {
  globalUsers: User[];
  setGlobalUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

// 假用戶資料
export const initialUsers: User[] = [
  {
    id: 1,
    name: 'Alice',
    messages: [
      { id: 1, sender: 'user', content: '你好，我想問這件衣服還有庫存嗎？' },
      { id: 2, sender: 'system', content: '您好，這款目前還有 M 和 L 號。' },
      { id: 3, sender: 'user', content: '那可以幫我留一件 M 嗎？' },
      { id: 4, sender: 'system', content: '好的，建議您直接下單比較保險喔。' },
      { id: 5, sender: 'user', content: '了解，運費多少？' },
      {
        id: 6,
        sender: 'system',
        content: '單筆滿 1000 免運，未滿運費 60 元。',
      },
      { id: 7, sender: 'user', content: '那我等下去結帳，謝謝！' },
      { id: 8, sender: 'system', content: '不客氣，隨時幫您服務。' },
      { id: 9, sender: 'user', content: '出貨時間大概多久？' },
      { id: 10, sender: 'system', content: '正常情況 2~3 個工作天內出貨。' },
    ],
  },
  {
    id: 2,
    name: 'Bob',
    messages: [
      { id: 1, sender: 'user', content: '我昨天訂的包裹可以查詢出貨了嗎？' },
      { id: 2, sender: 'system', content: '請稍等，我幫您查詢。' },
      { id: 3, sender: 'system', content: '目前顯示已經交貨到黑貓物流。' },
      { id: 4, sender: 'user', content: '那大概什麼時候會送到？' },
      { id: 5, sender: 'system', content: '依物流進度，明天或後天會送達。' },
      { id: 6, sender: 'user', content: '好的，我會留意。' },
      {
        id: 7,
        sender: 'system',
        content: '若有需要更改收件地址可以隨時告訴我。',
      },
      { id: 8, sender: 'user', content: '目前地址不用更改，謝謝。' },
      { id: 9, sender: 'system', content: '不客氣，有任何問題再聯繫我們。' },
      { id: 10, sender: 'user', content: '好，辛苦了！' },
    ],
  },
  {
    id: 3,
    name: 'Charlie',
    messages: [
      { id: 1, sender: 'user', content: '請問這個商品可以退貨嗎？' },
      { id: 2, sender: 'system', content: '您好，商品在 7 天內未使用可退貨。' },
      { id: 3, sender: 'user', content: '那要怎麼申請退貨呢？' },
      {
        id: 4,
        sender: 'system',
        content: '請提供訂單編號，我會寄退貨流程給您。',
      },
      { id: 5, sender: 'user', content: '編號是 A123456。' },
      { id: 6, sender: 'system', content: '收到，我稍後寄退貨單給您。' },
      { id: 7, sender: 'user', content: '好的，退貨運費是我出嗎？' },
      {
        id: 8,
        sender: 'system',
        content: '若為商品瑕疵，我們會吸收；若為個人原因需自付。',
      },
      { id: 9, sender: 'user', content: '了解，謝謝說明。' },
      { id: 10, sender: 'system', content: '不客氣，我會再通知您後續進度。' },
    ],
  },
  {
    id: 4,
    name: 'David',
    messages: [
      { id: 1, sender: 'user', content: '我想確認一下付款有沒有成功。' },
      { id: 2, sender: 'system', content: '請問您付款是使用信用卡嗎？' },
      { id: 3, sender: 'user', content: '對，是信用卡。' },
      { id: 4, sender: 'system', content: '查詢後顯示付款已完成。' },
      { id: 5, sender: 'user', content: '太好了，那就等出貨通知。' },
      { id: 6, sender: 'system', content: '沒錯，出貨會再寄簡訊給您。' },
      { id: 7, sender: 'user', content: '請問能指定到貨時間嗎？' },
      { id: 8, sender: 'system', content: '可以，您方便告訴我希望的時段嗎？' },
      { id: 9, sender: 'user', content: '我想要晚上 7 點後收貨。' },
      { id: 10, sender: 'system', content: '好的，我會註記在訂單裡。' },
    ],
  },
  {
    id: 5,
    name: 'Eve',
    messages: [
      { id: 1, sender: 'user', content: '請問這個會員點數怎麼用？' },
      {
        id: 2,
        sender: 'system',
        content: '每 100 點等於 10 元，可以在結帳時折抵。',
      },
      { id: 3, sender: 'user', content: '那我現在有多少點？' },
      { id: 4, sender: 'system', content: '查詢後您目前有 320 點。' },
      { id: 5, sender: 'user', content: '等於可以折抵 30 元對嗎？' },
      { id: 6, sender: 'system', content: '對，超過 20 點即可使用。' },
      { id: 7, sender: 'user', content: '下單時要自己勾選嗎？' },
      { id: 8, sender: 'system', content: '是的，結帳頁會有使用點數的選項。' },
      { id: 9, sender: 'user', content: '了解了，謝謝。' },
      { id: 10, sender: 'system', content: '不客氣，祝您購物愉快！' },
    ],
  },
];
