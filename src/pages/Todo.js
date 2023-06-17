import axios from 'axios';
import { useState, useEffect } from 'react';
import Todolist from '../component/Todolist';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Todo() {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState([]);
  const apiAddress = `https://www.pre-onboarding-selection-task.shop/todos`;

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin');
    }
  }, []);

  const createContent = () => {
    axios
      .post(
        apiAddress,
        {
          todo: content,
        },
        {
          headers: {
            Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        getContentList();
      })
      .catch(err => {
        console.log(err);
        alert('리스트 생성 실패');
      });
  };

  const getContentList = () => {
    axios
      .get(apiAddress, {
        headers: {
          Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
        },
      })
      .then(res => {
        setSavedContent(res.data);
      })
      .catch(() => {
        alert('리스트 가져오기 실패');
      });
  };

  useEffect(() => getContentList(), []);

  return (
    <TodoWrapper>
      <div className="todo_contents">
        <div className="contents_wrapper">
          <input
            data-testid="new-todo-input"
            onChange={e => setContent(e.target.value)}
            placeholder="할일을 추가해보세요"
          />
          <button data-testid="new-todo-add-button" onClick={createContent}>
            +
          </button>
        </div>

        {savedContent &&
          savedContent.map(el => {
            return (
              <Todolist
                key={el.id}
                todo={el.todo}
                id={el.id}
                content={content}
                setcontent={setContent}
                getContentList={getContentList}
              />
            );
          })}
      </div>
      <button
        className="logout_button"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/signin');
        }}
      >
        로그아웃
      </button>
    </TodoWrapper>
  );
}

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .todo_contents {
    padding: 30px 30px;
    width: 50%;
    .contents_wrapper {
      display: flex;
      justify-content: space-between;
      border: 1px solid gray;
      height: 40px;
      margin-bottom: 20px;
      input {
        border: none;
        width: 100%;
        padding: 0 10px;
        font-size: 20px;
      }
      button {
        width: 7%;
        border: none;
        background: none;
        margin: 10px 0px;
        cursor: pointer;
        font-size: 20px;
      }
    }
  }
  .logout_button {
    font-size: 20px;
    padding: 5px;
  }
`;
