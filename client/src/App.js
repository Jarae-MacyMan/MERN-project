// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ExamsProvider } from './components/ExamsProvider'; // Import the provider
import Homescreen from "./components/Homescreen";
import ExamDetail from "./components/ExamDetail";
import AddView from "./components/AddView";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ExamsProvider> {/* Wrap routes with ExamsProvider */}
          <Routes>
            <Route path="/" element={<Homescreen />} /> 
            <Route path="/exam/:examId" element={<ExamDetail />} />
            <Route path="/add" element={<div className="p-40"><AddView /></div>} />
          </Routes>
        </ExamsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
