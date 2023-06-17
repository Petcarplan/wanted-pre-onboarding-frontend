import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

export default function Todolist({
  todo,
  id,
  content,
  setcontent,
  getContentList,
}) {
  const [wouldEdit, setwouldEdit] = useState(false);
  const apiAddress = `https://www.pre-onboarding-selection-task.shop/todos/${id}`;

  const editTodo = () => {
    axios
      .put(
        apiAddress,
        {
          todo: content,
          isCompleted: true,
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
      .then(() => {
        setwouldEdit(false);
      })
      .catch(err => {
        console.log(err);
        alert('할일 수정 실패');
      });
  };

  const goEdit = () => {
    setwouldEdit(true);
    setcontent(todo);
  };

  const deleteTodo = () => {
    axios
      .delete(apiAddress, {
        headers: {
          Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
        },
      })
      .then(() => {
        getContentList();
      })
      .catch(err => {
        console.log(err);
        alert('할일 삭제 실패');
      });
  };

  return (
    <Content>
      <label className="content_label">
        <div>
          <input type="checkbox" className="checking" />
          {wouldEdit ? (
            <input
              type="text"
              value={content}
              onChange={e => setcontent(e.target.value)}
              className="edit_content"
            />
          ) : (
            <span>{todo}</span>
          )}
        </div>
        <div>
          {wouldEdit ? (
            <button onClick={editTodo}>제출</button>
          ) : (
            <button onClick={goEdit}>수정</button>
          )}
          <button onClick={deleteTodo}>삭제</button>
        </div>
      </label>
    </Content>
  );
}

const Content = styled.li`
  display: flex;
  list-style: none;
  background-color: lightblue;
  margin: 10px;
  height: 60px;
  align-items: center;
  font-size: 20px;
  padding: 0 10px;
  .content_label {
    padding-right: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    span {
      margin-left: 10px;
      text-align: center;
    }
    .checking {
      width: 20px;
      height: 20px;
    }
    .edit_content {
      margin-left: 10px;
      background: none;
      border: none;
      height: 20px;
      color: red;
      font-size: 20px;
    }
  }
  button {
    font-size: 20px;
    cursor: pointer;
  }
`;
