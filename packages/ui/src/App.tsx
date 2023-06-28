import { BrowserRouter, Route, Routes } from "react-router-dom";
import './output.css';
import { HomePage } from "./pages/Homepage";
import { AppContextProvider } from "./context/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
