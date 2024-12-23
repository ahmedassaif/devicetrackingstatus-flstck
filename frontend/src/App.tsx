import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Audits from "./features/Audits/";
import AuditDetail from "./features/Audits/components/AuditDetail";
import DataUnits from "./features/DataUnits/";
import DataUnitForm from "./features/DataUnits/components/DataUnitForm";
import TestPage from "./TestPage";
import MainLayout from "./layouts/MainLayout";
import WelcomePage from "./WelcomePage"; // Adjust the path as needed

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/testpage"
          element={<TestPage />}
        />
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/Audits" element={<Audits />} />
                <Route path="/Audit/Details/:auditId" element={<AuditDetail />} />
                <Route path="/DataUnits" element={<DataUnits />} />
                <Route path="/DataUnit/Form" element={<DataUnitForm />} />
                <Route path="/DataUnit/Form/:DataUnitId" element={<DataUnitForm />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
