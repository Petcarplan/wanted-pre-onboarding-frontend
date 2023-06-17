import axios from 'axios';
import { useState, useEffect } from 'react';
import Todolist from '../component/Todolist';

export default function Todo() {
  const [content, setContent] = useState('');
  const [savedContent, setSavedContent] = useState([]);
  const apiAddress = `https://www.pre-onboarding-selection-task.shop/todos`;

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
    <>
      <input
        data-testid="new-todo-input"
        onChange={e => setContent(e.target.value)}
      />
      <button data-testid="new-todo-add-button" onClick={createContent}>
        추가
      </button>
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
    </>
  );
}
