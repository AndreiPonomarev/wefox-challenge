import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Counter />}>
          <Route index element={<Counter />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<Counter />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
