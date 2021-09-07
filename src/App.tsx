import React from "react";
import Login from './pages/Login'
import { AuthProvider } from "./provider/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
