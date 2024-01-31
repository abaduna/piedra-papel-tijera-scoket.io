import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Multijugador from "../pages/multijugador";
import Sala from "../pages/Salas";
import Home from "../pages/Home";
import Individual from "../pages/Individual";
const RouterPrincipal = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sala" element={<Sala />} />
        <Route path="/room/:roomState" element={<Multijugador />} />
        <Route path="/individual" element={<Individual />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default RouterPrincipal;
