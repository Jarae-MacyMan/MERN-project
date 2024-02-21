// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamsProvider } from './components/ExamsProvider'; 
import { AdminProvider } from './components/AdminContext'; 
import Homescreen from "./components/Homescreen";
import ExamDetail from "./components/ExamDetail";
import CreateExam from "./components/CreateExam";
import PatientDetail from "./components/PatientDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminProvider>
          <ExamsProvider> {/* Wrap routes with ExamsProvider */}
              <Routes>
                <Route path="/" element={<Homescreen />} /> 
                <Route path="/admin" element={<Homescreen />} />
                <Route path="/exam/:examId" element={<ExamDetail />} />
                <Route path="/exam/:examId/edit" element={<ExamDetail editMode={true} />} />
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
