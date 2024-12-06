import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkThemeToggle } from "flowbite-react";
import AuditPagination from "./components/AuditPagination";

function App() {
  return (
    <Router>
      <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <h1 className="text-2xl dark:text-white">
        Flowbite React + Create React App
      </h1>
      <DarkThemeToggle />
    </main>
        <Routes>
          {/* Define the routes for the app */}
          <Route
            path="/"
            element={
              <main>
                <p className="text-lg dark:text-gray-200">
                  Welcome! Navigate to <a href="/audits" className="text-blue-500">/audits</a> to view the audit list.
                </p>
              </main>
            }
          />
          <Route path="/audits" element={<AuditPagination />} />
        </Routes>
    </Router>    
  );
}

export default App;
