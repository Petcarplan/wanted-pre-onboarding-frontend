import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState();
  const [pw, setPw] = useState();
  const [signedup, setSignedup] = useState(false);

  const apiAddress = `https://www.pre-onboarding-selection-task.shop/auth/signup`;
  const navigate = useNavigate();

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

  return signedup ? (
    successSignup()
  ) : (
    <>
      <input
        data-testid="email-input"
        onChange={e => setUser(e.target.value)}
      />
      <input
        data-testid="password-input"
        onChange={e => setPw(e.target.value)}
      />
      <button data-testid="signup-button" onClick={callApi}>
        회원가입
      </button>
    </>
  );
}
