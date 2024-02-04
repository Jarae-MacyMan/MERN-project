import "./App.css";
import Homescreen from "./components/Homescreen";

import { useApi } from "./hooks/use-api";

function App() {
  const { response } = useApi();

  return (
    // <div className="App bg-blue-500 text-white p-4">
    //   <header className="App-header">
    //     <p>{response}</p>
    //   </header>
    // </div>
    <div className="App">
      <Homescreen />
    </div>
  );
}

export default App;
