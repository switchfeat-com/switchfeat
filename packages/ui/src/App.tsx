import { BrowserRouter, Route, Routes } from "react-router-dom";
import './output.css';
import { HomePage } from "./pages/Homepage";
import { AppContextProvider } from "./context/AppContextProvider";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard"  element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
