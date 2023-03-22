import { useState } from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
function App() {
  const [{user}] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ) : (
        <Router>
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/rooms/:roomId" element={<HomePage1 />} />
            </Routes>
          </div>
        </Router>
      )}
    </div>
  );
}
function HomePage() {
  return (
    <>
    <div className="banner__text">
      <h1>Select a chat or conversation</h1>
    </div>
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
