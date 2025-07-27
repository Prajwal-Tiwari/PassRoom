import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./component/Main.jsx";
import Vault from "./component/Vault.jsx";
import DashboardLayout from "./component/DashboardLayout.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard layout applied to everything under this route */}
        <Route path="/" element={<DashboardLayout />}>
          {/* Main dashboard landing */}
          <Route index element={<Main />} />

          {/* Subpages */}
          <Route path="vault" element={<Vault />} />
          <Route
            path="password-health"
            element={<div>Password Health Page</div>}
          />
          <Route
            path="passkey-manager"
            element={<div>Passkey Manager Page</div>}
          />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
