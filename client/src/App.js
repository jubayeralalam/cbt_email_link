import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import VerifyEmail from "./components/Email/VerifyEmail";
import CreateUser from "./components/CreateUser/CreateUser";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/verifyEmail/:userId" element={<VerifyEmail />} />
          <Route exact path="/" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
