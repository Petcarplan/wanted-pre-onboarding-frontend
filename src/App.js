import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styled from 'styled-components';
import Signin from './pages/Signin';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);

  return (
    <AppWrapper>
      <h1>Todo List</h1>
      <Signin />
      <div className="signup_button_wrapper"></div>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    display: flex;
    justify-content: center;
  }
  .signup_button_wrapper {
    display: flex;
    justify-content: center;
    button {
      margin-top: 30px;
      height: 30px;
      width: 30%;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 15px;
    }
  }
`;
export default App;
