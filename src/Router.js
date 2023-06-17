import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Todo from './pages/Todo';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/todo" Component={Todo} />
          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
