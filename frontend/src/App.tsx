import { DarkThemeToggle } from "flowbite-react";
import AuditList from "./components/Audits/AuditList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import AuditDetail from "./components/Audits/AuditDetail";

const App: React.FC = () => {
  return (
    <Router>  {/* Wrap your application with BrowserRouter */}
      <Routes>
        <Route path="/Audits" element={<AuditList />} />
        <Route path="/Audits/Details/:auditId" element={<AuditDetail />} />
      </Routes>
    </Router>
  );
};

export default App;