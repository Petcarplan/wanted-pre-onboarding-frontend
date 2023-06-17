import axios from 'axios';
import { useState } from 'react';

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
    <li>
      <label>
        <input type="checkbox" />
        {wouldEdit ? (
          <input type="text" onChange={e => setcontent(e.target.value)} />
        ) : (
          <span>{todo}</span>
        )}
        {wouldEdit ? (
          <button onClick={editTodo}>제출</button>
        ) : (
          <button onClick={() => setwouldEdit(true)}>수정</button>
        )}
        <button onClick={deleteTodo}>삭제</button>
      </label>
    </li>
  );
}
