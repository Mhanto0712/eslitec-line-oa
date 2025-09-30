import { useOutletContext, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { useRef, useState, useEffect } from 'react';
import type { AuthContextType } from '../global';

// Global
type globalContext = {
  globalAuth: AuthContextType;
};

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Line OA' }, { name: 'description', content: 'Line OA' }];
}

const authUsername = import.meta.env.VITE_USERNAME;
const authPassword = import.meta.env.VITE_PASSWORD;

const inputData = {
  username: '',
  password: '',
};

export default function Home() {
  // Global
  const { globalAuth } = useOutletContext<globalContext>();

  const sendBtn = useRef<HTMLButtonElement>(null);
  const [inputValue, setInputValue] = useState(inputData);

  const navigate = useNavigate();

  const onFocusBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const placeholder = input.name == 'username' ? '帳號' : '密碼';
    const label = input.previousElementSibling as HTMLLabelElement;

    input.placeholder = input.placeholder ? '' : placeholder;
    label.style.display = label.style.display == '' ? 'block' : '';
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const onClick = () => {
    globalAuth.setGlobalUsername(inputValue.username);
    globalAuth.setGlobalPassword(inputValue.password);
    navigate('/message');
  };

  useEffect(() => {
    if (!sendBtn.current) return;

    const { username, password } = inputValue;
    const prefix = sendBtn.current.classList[0];

    if (username === authUsername && password === authPassword) {
      sendBtn.current.classList.add(`${prefix}--active`);
    } else {
      sendBtn.current.classList.remove(`${prefix}--active`);
    }
  }, [inputValue]);

  return (
    <div className='login__page'>
      <div className='login__block'>
        <div className='login__message' onClick={() => navigate('/message')}>
          <p className='login__message-text'>訊息中心</p>
        </div>
        <div className='login__title__block'>
          <h1 className='login__title'>LINE</h1>
        </div>
        <form className='login__form'>
          <div className='login__form-box'>
            <label className='login__label' htmlFor='username'>
              帳號
            </label>
            <input
              id='username'
              className='login__input'
              value={inputValue.username}
              type='text'
              name='username'
              placeholder='帳號'
              autoComplete='off'
              required
              onFocus={onFocusBlur}
              onBlur={onFocusBlur}
              onChange={onChange}
            />
          </div>
          <div className='login__form-box'>
            <label className='login__label' htmlFor='password'>
              密碼
            </label>
            <input
              id='password'
              className='login__input'
              value={inputValue.password}
              type='password'
              name='password'
              placeholder='密碼'
              autoComplete='off'
              required
              onFocus={onFocusBlur}
              onBlur={onFocusBlur}
              onChange={onChange}
            />
          </div>
          <button
            ref={sendBtn}
            className='login__send'
            type='button'
            onClick={onClick}
          >
            登入
          </button>
        </form>
      </div>
    </div>
  );
}
