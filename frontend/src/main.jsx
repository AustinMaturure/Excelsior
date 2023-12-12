import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Navbar.jsx';
import Top_Stories from './top.jsx';
import Details from './Details.jsx';
import Category from './Category.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="" element={<Top_Stories />} />
        <Route path="/articles/:slug" element={<Details />} />
        <Route path="/category/:category" element={<Category />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
