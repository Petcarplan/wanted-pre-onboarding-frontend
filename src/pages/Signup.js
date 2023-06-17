import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Signup() {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [signedup, setSignedup] = useState(false);

  const [validemail, setValidEmail] = useState(false);
  const [validpw, setValidPw] = useState(false);

  const apiAddress = `https://www.pre-onboarding-selection-task.shop/auth/signup`;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);

  const successSignup = () => {
    navigate('/signin');
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
        console.log(res);
        setSignedup(true);
      })
      .catch(err => {
        console.log(err);
        alert('회원가입 실패');
      });
  };

  useEffect(() => {
    setValidEmail(user.includes('@'));
  }, [user]);

  useEffect(() => {
    pw.length >= 8 ? setValidPw(true) : setValidPw(false);
  }, [pw]);

  return signedup ? (
    successSignup()
  ) : (
    <SignupContainer>
      <div className="signup_wrapper">
        <input
          type="text"
          data-testid="email-input"
          onChange={e => setUser(e.target.value)}
          placeholder="@를 반드시 포함"
        />
        <input
          type="password"
          data-testid="password-input"
          onChange={e => setPw(e.target.value)}
          placeholder="8자 이상"
        />
        <button
          style={
            !validemail || !validpw
              ? { background: 'lightgray', color: 'gray' }
              : { background: 'green', color: 'white' }
          }
          data-testid="signup-button"
          onClick={callApi}
          disabled={!validemail || !validpw ? true : false}
        >
          회원가입
        </button>
        <button className="login_button" onClick={() => navigate('/signin')}>
          이미 계정이 있으신가요?
        </button>
      </div>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .signup_wrapper {
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
    .login_button {
      background: none;
      border: none;
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;
