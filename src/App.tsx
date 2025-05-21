// src/App.tsx
import React from "react";
import AppRouter from "./routes/AppRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Add inside your <App />
<ToastContainer position="top-right" autoClose={3000} />

const App = () => {
  return <AppRouter />;
};

export default App;
