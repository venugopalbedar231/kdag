import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogListing from './pages/BlogListing';
import BlogDetail from './pages/BlogDetail';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<BlogListing />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
