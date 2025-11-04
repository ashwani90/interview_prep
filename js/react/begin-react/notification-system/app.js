import React from "react";
import { NotificationProvider } from "./context/NotificationContext";
import Home from "./pages/Home";
import "./styles.css";

export default function App() {
  return (
    <NotificationProvider>
      <Home />
    </NotificationProvider>
  );
}
