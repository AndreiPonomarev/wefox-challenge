import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from './features/posts/Posts';
import './App.css';
import { Counter } from './features/counter/Counter';
import ErrorPage from './features/error-page/ErrorPage';
import { Layout } from './features/layout/Layout';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Counter />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
