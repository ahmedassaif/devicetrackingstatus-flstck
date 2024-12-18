import { DarkThemeToggle } from "flowbite-react";
import AuditList from "./components/Audits/AuditList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import AuditDetail from "./components/Audits/AuditDetail";
import TestPage from "./TestPage";

const App: React.FC = () => {
  return (
    <Router>  {/* Wrap your application with BrowserRouter */}
      <Routes>
        <Route path="/Audits" element={<AuditList />} />
        <Route path="/Audit/Details/:auditId" element={<AuditDetail />} />
        <Route path="/testpage" element={<TestPage />} />
      </Routes>
    </Router>
  );
};

export default App;