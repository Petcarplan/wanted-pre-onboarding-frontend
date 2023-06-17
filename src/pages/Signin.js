import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Signin() {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [signedin, setSignedin] = useState(false);

  const [validemail, setValidEmail] = useState(false);
  const [validpw, setValidPw] = useState(false);

  const apiAddress = `https://www.pre-onboarding-selection-task.shop/auth/signin`;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);

  const successLogin = () => {
    navigate('/todo');
  };

  const callApi = () => {
    axios
      .post(
        apiAddress,
        {
          email: user,
          password: pw,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then(res => {
        localStorage.setItem('token', res.data.access_token);
        setSignedin(true);
      })
      .catch(err => {
        console.log(err);
        alert('로그인 실패 회원가입을 하십시오');
        navigate('/signup');
      });
  };

  useEffect(() => {
    setValidEmail(user.includes('@'));
  }, [user]);

  useEffect(() => {
    pw.length >= 8 ? setValidPw(true) : setValidPw(false);
  }, [pw]);

  return signedin ? (
    successLogin()
  ) : (
    <LoginContainer>
      <div className="login_wrapper">
        <input
          type="text"
          data-testid="email-input"
          placeholder="@를 반드시 포함"
          onChange={e => {
            setUser(e.target.value);
          }}
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="8자 이상"
          onChange={e => {
            setPw(e.target.value);
          }}
        />
        <button
          style={
            !validemail || !validpw
              ? { background: 'lightgray', color: 'gray' }
              : { background: 'green', color: 'white' }
          }
          data-testid="signin-button"
          onClick={callApi}
          disabled={!validemail || !validpw ? true : false}
        >
          로그인
        </button>
        <button className="signup_button" onClick={() => navigate('/signup')}>
          계정이 없으신가요?
        </button>
      </div>
    </LoginContainer>
  );
}
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .login_wrapper {
    width: 30%;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 20px;
    input {
      margin: 10px 0px;
      height: 30px;
    }
    button {
      margin: 10px 0px;
      height: 30px;
    }
    .signup_button {
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
