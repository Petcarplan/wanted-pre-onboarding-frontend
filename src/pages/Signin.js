import { useState, useEffect, useDebugValue } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin() {
  const [user, setUser] = useState('');
  const [pw, setPw] = useState('');
  const [signedin, setSignedin] = useState(false);

  const [validemail, setValidEmail] = useState(false);
  const [validpw, setValidPw] = useState(false);

  const apiAddress = `https://www.pre-onboarding-selection-task.shop/auth/signin`;
  const navigate = useNavigate();

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
        localStorage.setItem('token', res.access_token);
        setSignedin(true);
      })
      .catch(err => {
        console.log(err);
        alert('로그인 실패');
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
    <>
      <input
        data-testid="email-input"
        onChange={e => {
          setUser(e.target.value);
        }}
      />
      <input
        data-testid="password-input"
        onChange={e => {
          setPw(e.target.value);
        }}
      />
      <button
        data-testid="signin-button"
        onClick={callApi}
        disabled={!validemail || !validpw ? true : false}
      >
        로그인
      </button>
    </>
  );
}
