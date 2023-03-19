import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__body">
        <Sidebar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms/:roomId" element={<HomePage1 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
function HomePage() {
  return (
    <>
      <h1>Home Screen</h1>
    </>
  );
}
function HomePage1() {
  return (
    <>
      <Chat />
    </>
  );
}
export default App;
