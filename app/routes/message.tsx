import { useOutletContext, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { useRef, useState, useEffect } from 'react';
import type {
  AuthContextType,
  UserContextType,
  Message,
  User as TypeUser,
} from '../global';
import { User, Bot, Search, Send, X } from 'lucide-react';

// Global
type globalContext = {
  globalAuth: AuthContextType;
  globalUser: UserContextType;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Line OA - 訊息中心' },
    { name: 'description', content: 'Line OA - 訊息中心' },
  ];
}

const authUsername = import.meta.env.VITE_USERNAME;
const authPassword = import.meta.env.VITE_PASSWORD;

export default function Message() {
  // Global
  const { globalAuth, globalUser } = useOutletContext<globalContext>();

  const chatDataRef = useRef<HTMLDivElement>(null);
  const [allUser, setAllUser] = useState(globalUser.globalUsers);
  const [currentUser, setCurrentUser] = useState<TypeUser | null>(null);
  const [chat, setChat] = useState<Message[]>([]);
  const [newChat, setNewChat] = useState('');
  const [searchBox, setSearchBox] = useState(false);
  const [searchMessageResults, setSearchMessageResults] = useState<Message[]>(
    []
  );

  const navigate = useNavigate();

  const MessageItem = ({ data }: { data: Message }) => {
    if (data.sender === 'user') {
      return (
        <div
          className='message__data-box message__data-box--user'
          id={`chat-msg-${data.id}`}
        >
          <div className='message__data-user'>
            <div className='message__data-thumbnail'>
              <User className='message__data-icon' />
            </div>
            <p className='message__data-chat message__data-chat--user'>
              {data.content}
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        className='message__data-box message__data-box--system'
        id={`chat-msg-${data.id}`}
      >
        <div className='message__data-system'>
          <p className='message__data-chat message__data-chat--system'>
            {data.content}
          </p>
        </div>
      </div>
    );
  };

  const clickUser = (e: React.MouseEvent<HTMLElement>) => {
    const userId = Number(e.currentTarget.getAttribute('data-id'));
    const selectedUser = allUser.find((obj) => obj.id === userId);

    selectedUser ? setCurrentUser(selectedUser) : setCurrentUser(null);
    selectedUser ? setChat(selectedUser.messages) : setChat([]);

    setSearchBox(false);
    setSearchMessageResults([]);
  };

  const newChatType = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNewChat(value);
  };

  const sendNewChat = () => {
    if (!currentUser) return;
    console.log(currentUser);

    const length = currentUser.messages.length;
    const newMessage = {
      id: length + 1,
      sender: 'system',
      content: newChat,
    };

    const updatedUser = {
      ...currentUser,
      messages: [...currentUser.messages, newMessage],
    };
    setCurrentUser(updatedUser);

    setChat((prevChat) =>
      prevChat ? [...prevChat, newMessage] : [newMessage]
    );

    globalUser.setGlobalUsers((prevUsers) => {
      const otherUsers = prevUsers.filter((user) => user.id !== currentUser.id);
      return [updatedUser, ...otherUsers];
    });

    setAllUser((prevUsers) => {
      const otherUsers = prevUsers.filter((user) => user.id !== currentUser.id);
      return [updatedUser, ...otherUsers];
    });

    setNewChat('');
  };

  const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();

    if (!value) {
      // input 為空時恢復全部
      setAllUser(globalUser.globalUsers);
      return;
    }

    setAllUser(
      globalUser.globalUsers.filter((user) =>
        user.name.toLowerCase().includes(value)
      )
    );
  };

  const searchMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) return;

    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      setSearchMessageResults([]);
      return;
    }

    // 從最新訊息開始搜尋
    const results = [...currentUser.messages]
      .reverse()
      .filter((msg) => msg.content.toLowerCase().includes(value));

    setSearchMessageResults(results);
  };

  // 點擊搜尋結果滾動到該訊息
  const scrollToMessage = (id: number) => {
    const el = document.getElementById(`chat-msg-${id}`);
    if (el && chatDataRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setSearchBox(false);
    setSearchMessageResults([]);
  };

  useEffect(() => {
    if (
      globalAuth.globalUsername != authUsername ||
      globalAuth.globalPassword != authPassword
    ) {
      navigate('/');
      alert('請先登入');
    }
  }, []);

  useEffect(() => {
    if (chatDataRef.current) {
      chatDataRef.current.scrollTop = chatDataRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className='message__page'>
      <div className='message__user-block'>
        <div className='message__user-topbar'>
          <div className='message__home' onClick={() => navigate('/')}>
            <p className='message__home-text'>LINE</p>
          </div>
          <input
            className='message__user-search'
            type='text'
            placeholder='搜尋'
            onChange={searchUser}
            autoComplete='off'
          />
        </div>
        <div className='message__user-data'>
          {allUser.map((data) => (
            <div
              className='message__user-box'
              key={data.id}
              data-id={data.id}
              onClick={clickUser}
            >
              <div className='message__user-thumbnail'>
                <User className='message__user-icon' />
              </div>
              <div className='message__user-info'>
                <p className='message__user-name'>{data.name}</p>
                <p className='message__user-chat'>
                  {data.messages[data.messages.length - 1].content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='message__chat-block'>
        <div className='message__chat-topbar'>
          {currentUser && (
            <>
              <div className='message__chat-profile'>
                <div className='message__chat-thumbnail'>
                  <User className='message__chat-icon' />
                </div>
                <div className='message__chat-info'>
                  <p className='message__chat-name'>{currentUser.name}</p>
                </div>
              </div>
              <div
                className='message__search-btn'
                onClick={() => setSearchBox(!searchBox)}
              >
                <Search className='message__search-icon' />
                <p className='message__search-text'>搜尋</p>
              </div>
            </>
          )}

          {searchBox && (
            <div className='message__search-box'>
              <input
                className='message__search-input'
                type='text'
                onChange={searchMessageInput}
                autoComplete='off'
              />
              <X
                className='message__search-close'
                onClick={() => setSearchBox(false)}
              />
              <div className='message__search-content'>
                {searchMessageResults.map((msg) => (
                  <div
                    key={msg.id}
                    className='message__search-row'
                    onClick={() => scrollToMessage(msg.id)}
                  >
                    <div
                      className={`message__search-thumbnail ${
                        msg.sender === 'system'
                          ? 'message__search-thumbnail--system'
                          : ''
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <User className='message__search-photo' />
                      ) : (
                        <Bot className='message__search-photo message__search-photo--system' />
                      )}
                    </div>
                    <div className='message__search-info'>
                      <p className='message__search-chat'>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='message__chat-data' ref={chatDataRef}>
          {chat.map((data) => (
            <MessageItem key={data.id} data={data} />
          ))}
        </div>
        <textarea
          className='message__chat-input'
          value={newChat}
          onChange={newChatType}
          disabled={!currentUser}
          autoComplete='off'
        ></textarea>
        <div className='message__chat-send'>
          <div
            className={
              currentUser
                ? 'message__send-btn'
                : 'message__send-btn message__send-btn--unwork'
            }
            onClick={sendNewChat}
          >
            <p className='message__send-text'>傳送</p>
            <Send className='message__send-icon' />
          </div>
        </div>
      </div>
    </div>
  );
}
