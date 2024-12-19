import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Audits from "./features/Audits/";
import AuditDetail from "./features/Audits/components/AuditDetail";
import TestPage from "./TestPage";
import MainLayout from "./layouts/MainLayout";
import WelcomePage from "./WelcomePage"; // Adjust the path as needed

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/Audits" element={<Audits />} />
          <Route path="/Audit/Details/:auditId" element={<AuditDetail />} />
          <Route path="/testpage" element={<TestPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
