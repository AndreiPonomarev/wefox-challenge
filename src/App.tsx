import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Posts } from './pages/posts-page/Posts';
import ErrorPage from './pages/error-page/ErrorPage';
import { Layout } from './components/layout/Layout';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Posts />} />
          <Route path="posts:{id}" element={<Posts />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

