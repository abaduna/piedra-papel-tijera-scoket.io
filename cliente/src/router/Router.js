import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Multijugador from "../pages/multijugador";
import Home from "../pages/salas"
const RouterPrincipal = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/room/:roomState" element={<Multijugador />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default RouterPrincipal;
