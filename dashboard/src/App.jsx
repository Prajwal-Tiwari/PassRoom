import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import DashboardLayout from "./component/DashboardLayout.jsx"
import Main from "./pages/Main.jsx"
import Vault from "./pages/Vault.jsx"
import PasswordHealth from "./pages/PasswordHealth.jsx"
import PasswordManager from "./pages/PasswordManager.jsx"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        
        >
          <Route index element={<Main />} />
          <Route path= "vault" element={<Vault />} />
          <Route path= "password-health" element={<PasswordHealth />} />
          <Route path= "password-manager" element={<PasswordManager />} />
          <Route path= "settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
