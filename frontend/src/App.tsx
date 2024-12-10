import { DarkThemeToggle } from "flowbite-react";
import AuditList from "./components/Audits/AuditList";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2 dark:bg-gray-800">
      <script src="http://localhost:8097"></script>
        <h1 className="text-2xl dark:text-white">
          Flowbite React + Create React App
        </h1>
        <DarkThemeToggle />
        <div className="App">
          <div className="container mx-auto p-4">
            <h1 className="mb-8 text-center text-3xl">Audit Logs</h1>
            <AuditList /> {/* Pass baseUrl as a prop */}
          </div>
        </div>
      </main>    
  );
}

export default App;
