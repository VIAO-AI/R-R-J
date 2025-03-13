
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Menu from './pages/Menu';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from "@/components/ui/toaster";
import Admin from './pages/Admin';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <div className="App">
      <Router>
        <LanguageProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </LanguageProvider>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
