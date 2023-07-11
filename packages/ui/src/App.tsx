import { BrowserRouter, Route, Routes } from "react-router-dom";
import './output.css';
import { HomePage } from "./pages/Homepage";
import { AppContextProvider } from "./context/AppContextProvider";
import { Flags } from "./pages/Flags";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/flags" element={<PrivateRoute><Flags /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
