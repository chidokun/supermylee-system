import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from './layout';
import Demo from './pages/Demo';
import Home from './pages/Home';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />

        </Route>
      </Routes>
    </BrowserRouter>

  );
}
