import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import History from './pages/History/History.jsx';
import { ChatProvider } from './context/ChatContext';
import './App.css';

function App() {
  return (
    <Router>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </ChatProvider>
    </Router>
  );
}

export default App;