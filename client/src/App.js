// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamsProvider } from './components/ExamsProvider'; 
import { AdminProvider } from './components/AdminContext'; 
import { useState } from 'react'
import Homescreen from "./components/Homescreen";
import ExamDetail from "./components/ExamDetail";
import CreateExam from "./components/CreateExam";
import PatientDetail from "./components/PatientDetail";

function App() {

  const [history, setHistory] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <AdminProvider>
          <ExamsProvider> {/* Wrap routes with ExamsProvider */}
              <Routes>
                <Route path="/" element={<Homescreen history={history} />} /> 
                <Route path="/admin" element={<Homescreen history={history} />} />
                <Route path="/exam/:examId" element={<ExamDetail history={history} setHistory={setHistory} />} />
                <Route path="/exam/:examId/edit" element={<ExamDetail editMode={true} history={history} setHistory={setHistory} />} />
                <Route path="/createExam" element={<CreateExam />} />
                <Route path="/patient/:patientId" element={<PatientDetail />} />
              </Routes>
            </ExamsProvider>
        </AdminProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
